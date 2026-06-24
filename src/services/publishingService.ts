import { supabase } from "@/integrations/supabase/client";
import { seoAnalyticsService } from "./seoAnalyticsService";

export const publishingService = {
  // ============================================
  // CONTENT VALIDATION
  // ============================================

  validateBlogPost(post: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!post.title || post.title.trim() === "") {
      errors.push("Title is required");
    }

    if (!post.meta_title || post.meta_title.trim() === "") {
      errors.push("SEO Meta Title is required");
    }

    if (!post.meta_description || post.meta_description.trim() === "") {
      errors.push("SEO Meta Description is required");
    }

    if (!post.slug || post.slug.trim() === "") {
      errors.push("URL Slug is required");
    }

    if (!post.featured_image || post.featured_image.trim() === "") {
      errors.push("Featured Image is required");
    }

    if (!post.content || post.content.trim().length < 500) {
      errors.push("Content must be at least 500 characters");
    }

    if (!post.category_id) {
      errors.push("Category is required");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  async checkSlugUniqueness(slug: string, postId?: string): Promise<boolean> {
    let query = supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug);

    if (postId) {
      query = query.neq("id", postId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return !data || data.length === 0;
  },

  // ============================================
  // PUBLISHING WORKFLOW
  // ============================================

  async publishPost(postId: string, adminEmail: string) {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (fetchError) throw fetchError;
    if (!post) throw new Error("Post not found");

    const validation = this.validateBlogPost(post);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    const isUnique = await this.checkSlugUniqueness(post.slug, postId);
    if (!isUnique) {
      throw new Error("Slug is already in use by another post");
    }

    const { data: published, error: publishError } = await supabase
      .from("blog_posts")
      .update({
        status: "published",
        review_status: "published",
        published_at: new Date().toISOString()
      } as any)
      .eq("id", postId)
      .select()
      .single();

    if (publishError) throw publishError;

    await seoAnalyticsService.logActivity({
      admin_email: adminEmail,
      action_type: "blog_publish",
      action_description: `Published blog post: ${post.title}`,
      entity_type: "blog_post",
      entity_id: postId
    });

    return published;
  },

  async unpublishPost(postId: string, adminEmail: string) {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("title")
      .eq("id", postId)
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        status: "draft",
        review_status: "draft"
      })
      .eq("id", postId)
      .select()
      .single();

    if (error) throw error;

    await seoAnalyticsService.logActivity({
      admin_email: adminEmail,
      action_type: "blog_unpublish",
      action_description: `Unpublished blog post: ${post.title}`,
      entity_type: "blog_post",
      entity_id: postId
    });

    return data;
  },

  async archivePost(postId: string, adminEmail: string) {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("title")
      .eq("id", postId)
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        status: "draft",
        review_status: "archived"
      })
      .eq("id", postId)
      .select()
      .single();

    if (error) throw error;

    await seoAnalyticsService.logActivity({
      admin_email: adminEmail,
      action_type: "blog_archive",
      action_description: `Archived blog post: ${post.title}`,
      entity_type: "blog_post",
      entity_id: postId
    });

    return data;
  },

  async schedulePost(postId: string, publishDate: Date, adminEmail: string) {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (fetchError) throw fetchError;
    if (!post) throw new Error("Post not found");

    const validation = this.validateBlogPost(post);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        review_status: "scheduled",
        scheduled_publish_at: publishDate.toISOString()
      } as any)
      .eq("id", postId)
      .select()
      .single();

    if (error) throw error;

    await seoAnalyticsService.logActivity({
      admin_email: adminEmail,
      action_type: "blog_schedule",
      action_description: `Scheduled blog post: ${post.title} for ${publishDate.toLocaleDateString()}`,
      entity_type: "blog_post",
      entity_id: postId
    });

    return data;
  },

  async moveToReview(postId: string, adminEmail: string) {
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("title")
      .eq("id", postId)
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        review_status: "review"
      })
      .eq("id", postId)
      .select()
      .single();

    if (error) throw error;

    await seoAnalyticsService.logActivity({
      admin_email: adminEmail,
      action_type: "blog_review",
      action_description: `Moved blog post to review: ${post.title}`,
      entity_type: "blog_post",
      entity_id: postId
    });

    return data;
  },

  async validateAndStoreErrors(postId: string) {
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (error) throw error;
    if (!post) return;

    const validation = this.validateBlogPost(post);

    await supabase
      .from("blog_posts")
      .update({
        validation_errors: validation.errors
      } as any)
      .eq("id", postId);

    return validation;
  }
};
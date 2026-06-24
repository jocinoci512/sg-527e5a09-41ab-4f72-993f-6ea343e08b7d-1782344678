import { useState } from "react";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  vimeoId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  autoplay?: boolean;
}

export function VideoEmbed({ vimeoId, title, description, thumbnail, autoplay = false }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=${isPlaying ? 1 : 0}&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;
  const thumbnailUrl = thumbnail || `https://vumbnail.com/${vimeoId}.jpg`;

  return (
    <div className="relative w-full group">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border-2 border-border shadow-lg group-hover:shadow-xl transition-shadow">
        {!isPlaying && (
          <div 
            className="absolute inset-0 cursor-pointer z-10"
            onClick={() => setIsPlaying(true)}
          >
            <img 
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="h-10 w-10 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
        
        {isPlaying && (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        )}
      </div>
      
      {(title || description) && (
        <div className="mt-4">
          {title && <h3 className="font-semibold text-lg mb-2">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
    </div>
  );
}
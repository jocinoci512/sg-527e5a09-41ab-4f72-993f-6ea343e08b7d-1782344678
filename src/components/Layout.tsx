import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SearchModal } from "@/components/SearchModal";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearchClick={() => setSearchOpen(true)} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
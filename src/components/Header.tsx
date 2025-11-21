import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              <Globe className="h-4 w-4" />
              FR
            </Button>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#team" className="text-sm text-foreground hover:text-primary transition-colors">
                Notre équipe
              </a>
              <a href="#contact" className="text-sm text-foreground hover:text-primary transition-colors">
                Nous contacter
              </a>
            </nav>
          </div>
          <Button variant="outline" className="rounded-full">
            Se connecter
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

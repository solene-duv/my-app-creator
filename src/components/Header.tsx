import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Button variant="outline" size="sm" className="gap-2 rounded-full bg-white border-white hover:bg-white/90">
              <Globe className="h-4 w-4" />
              FR
            </Button>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#team" className="text-sm text-primary-foreground hover:text-white transition-colors">
                Notre équipe
              </a>
              <a href="#contact" className="text-sm text-primary-foreground hover:text-white transition-colors">
                Nous contacter
              </a>
            </nav>
          </div>
          <Button variant="outline" className="rounded-full bg-white border-white hover:bg-white/90 text-foreground">
            Se connecter
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

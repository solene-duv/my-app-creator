import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import bnpLogo from "@/assets/bnp-paribas-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-primary/95 backdrop-blur-md shadow-lg z-50">
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
          <img 
            src={bnpLogo} 
            alt="BNP Paribas" 
            className="h-10 md:h-12 object-contain absolute left-1/2 -translate-x-1/2"
          />
          <Button variant="outline" className="rounded-full bg-white border-white hover:bg-white/90 text-foreground">
            Se connecter
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

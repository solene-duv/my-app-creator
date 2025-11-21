import { Button } from "@/components/ui/button";
import { Globe, LogIn } from "lucide-react";
import bnpLogo from "@/assets/bnp-paribas-logo.png";
import { Link } from "react-router-dom";

interface HeaderProps {
  showLoginIcon?: boolean;
}

const Header = ({ showLoginIcon = false }: HeaderProps) => {
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
              <Link to="/team" className="text-sm text-primary-foreground hover:text-white transition-colors">
                Notre équipe
              </Link>
              <a href="#contact" className="text-sm text-primary-foreground hover:text-white transition-colors">
                Nous contacter
              </a>
            </nav>
          </div>
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img 
              src={bnpLogo} 
              alt="BNP Paribas" 
              className="h-10 md:h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="flex items-center gap-3">
            {showLoginIcon ? (
              <Button 
                variant="default"
                size="sm"
                className="rounded-full bg-white text-foreground hover:bg-white/90 px-6 py-2 font-medium transition-colors"
                onClick={() => console.log('Login clicked')}
              >
                Log on
              </Button>
            ) : (
              <Button variant="outline" className="rounded-full bg-white border-white hover:bg-white/90 text-foreground">
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LearningSection = () => {
  const categories = [
    "Produits d'épargne",
    "Produits d'investissement",
    "Produits hybrides"
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center">
            Apprends en plus sur :
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
            {categories.map((category) => {
              const route = category === "Produits d'épargne" ? "/savings-products" : "#";
              
              if (category === "Produits d'épargne") {
                return (
                  <Link key={category} to={route} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-6 rounded-full text-base font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {category}
                    </Button>
                  </Link>
                );
              }
              
              return (
                <Button
                  key={category}
                  variant="outline"
                  className="flex-1 h-auto py-6 rounded-full text-base font-medium border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {category}
                </Button>
              );
            })}
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="text-lg md:text-xl text-destructive text-center font-medium">
              En 5 ans, Paul a réussi à faire son premier achat immobilier et faire fructifier son argent à travers un PEA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full bg-background py-24 md:py-32 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
            Financial Sims
          </h1>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Simule ta vie
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

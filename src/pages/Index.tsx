import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LearningSection from "@/components/LearningSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header showLoginIcon={true} />
      <HeroSection />
      <LearningSection />
    </div>
  );
};

export default Index;

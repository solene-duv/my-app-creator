import Header from "@/components/Header";

const SavingsProducts = () => {
  const products = [
    {
      title: "Livret Jeune",
      description: "Regulated savings account, fixed interest rate, deposit limit, reserved for ages 12–25."
    },
    {
      title: "Livret A",
      description: "Tax-free savings account, variable interest rate, high deposit limit, available anytime."
    },
    {
      title: "Compte à Terme",
      description: "Block a sum of money for a fixed duration (3 months to 5 years) with a guaranteed rate."
    },
    {
      title: "Livret d'Épargne Populaire",
      description: "Taxable savings account, attractive rate, reserved for low-income households."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-24 pt-32">
        <div className="max-w-6xl mx-auto border-2 border-[#008755] rounded-3xl p-8 md:p-12">
          <div className="border-4 border-black border-dashed rounded-3xl p-8 md:p-12 space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-handwritten">
              Produits d'épargne
            </h1>
            
            <div className="space-y-8">
              {products.map((product, index) => (
                <div 
                  key={index} 
                  className="flex flex-col md:flex-row gap-6 items-stretch"
                >
                  <div className="md:w-1/3 border-2 border-black rounded-2xl p-6 flex items-center justify-center bg-white">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center font-handwritten">
                      {product.title}
                    </h2>
                  </div>
                  
                  <div className="md:w-2/3 border-2 border-black border-dashed rounded-2xl p-6 flex items-center bg-white">
                    <p className="text-lg md:text-xl font-handwritten">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavingsProducts;

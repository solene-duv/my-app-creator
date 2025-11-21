const TeamSection = () => {
  const teamMembers = [
    { name: "Christopher Foliard" },
    { name: "Arthur Chambat" },
    { name: "Louis Pires" },
    { name: "Solène Duval" },
    { name: "Paul Le Rhun" },
    { name: "Cassandre d'Arminjon" }
  ];

  return (
    <section id="team" className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border-2 border-[#008755] p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground font-handwritten">
            Notre équipe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-2xl border-2 border-[#008755] bg-white flex items-center justify-center">
                  <span className="text-4xl text-muted-foreground">?</span>
                </div>
                <p className="text-xl font-semibold text-foreground font-handwritten">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

import { useState } from "react";
import { Card } from "@/components/ui/card";

type Profile = "founder" | "owner" | "impactHero";

interface Question {
  id: number;
  question: string;
  answers: {
    text: string;
    profile: Profile;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What do you want right now?",
    answers: [
      { text: "Grow something big", profile: "founder" },
      { text: "Build stability", profile: "owner" },
      { text: "Create impact", profile: "impactHero" },
    ],
  },
  {
    id: 2,
    question: "How do you see your future?",
    answers: [
      { text: "High-stakes journey", profile: "founder" },
      { text: "Balanced and secure", profile: "owner" },
      { text: "Purpose-driven", profile: "impactHero" },
    ],
  },
  {
    id: 3,
    question: "What do you want to unlock?",
    answers: [
      { text: "Big growth strategies", profile: "founder" },
      { text: "Better money systems", profile: "owner" },
      { text: "Impact aligned with money", profile: "impactHero" },
    ],
  },
  {
    id: 4,
    question: "Which experience sounds best?",
    answers: [
      { text: "Strategic simulation", profile: "founder" },
      { text: "Practical tools", profile: "owner" },
      { text: "Values + money alignment", profile: "impactHero" },
    ],
  },
];

interface OnboardingQuizProps {
  onComplete: (profile: Profile) => void;
}

export const OnboardingQuiz = ({ onComplete }: OnboardingQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Profile, number>>({
    founder: 0,
    owner: 0,
    impactHero: 0,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (profile: Profile) => {
    // Update scores
    const newScores = { ...scores, [profile]: scores[profile] + 1 };
    setScores(newScores);

    // Trigger transition
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      } else {
        // Quiz complete - determine winner
        let winner: Profile = "founder";
        let maxScore = newScores.founder;

        if (newScores.impactHero > maxScore) {
          winner = "impactHero";
          maxScore = newScores.impactHero;
        }

        if (newScores.owner > maxScore) {
          winner = "owner";
        }

        onComplete(winner);
      }
    }, 300);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-900 border-primary/20 p-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground font-mono">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex gap-2">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    idx === currentQuestion
                      ? "bg-primary"
                      : idx < currentQuestion
                      ? "bg-accent"
                      : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Question */}
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center leading-tight">
            {currentQ.question}
          </h2>

          {/* Answers - Auto advance on click */}
          <div className="space-y-4">
            {currentQ.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(answer.profile)}
                className="w-full py-6 px-8 text-lg font-medium text-left bg-slate-800 border-2 border-slate-700 hover:border-primary hover:bg-primary/10 text-foreground transition-all rounded-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

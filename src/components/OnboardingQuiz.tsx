import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    question: "What best describes what you're looking for right now?",
    answers: [
      {
        text: "Launching an ambitious project that could grow a lot",
        profile: "founder",
      },
      {
        text: "Building a stable and comfortable situation that supports my life well",
        profile: "owner",
      },
      {
        text: "Finding or developing a project with meaning and positive impact",
        profile: "impactHero",
      },
    ],
  },
  {
    id: 2,
    question: "When you think about your professional or financial future, you see yourself more as",
    answers: [
      {
        text: "The pilot of a big, challenging adventure",
        profile: "founder",
      },
      {
        text: "Someone who manages work and money well to stay free and secure",
        profile: "owner",
      },
      {
        text: "Someone who uses their skills to serve a cause or create impact",
        profile: "impactHero",
      },
    ],
  },
  {
    id: 3,
    question: "What do you mainly want to unlock with this program?",
    answers: [
      {
        text: "Strategies to accelerate fast and aim big",
        profile: "founder",
      },
      {
        text: "Simple systems to earn better, manage better, and stay secure",
        profile: "owner",
      },
      {
        text: "Ways to align personal finances with social or environmental impact",
        profile: "impactHero",
      },
    ],
  },
  {
    id: 4,
    question: "Which experience feels the most exciting to you?",
    answers: [
      {
        text: "A strategy-heavy simulation focused on growth and tough decisions",
        profile: "founder",
      },
      {
        text: "Practical tools that help optimize money and day-to-day life",
        profile: "owner",
      },
      {
        text: "Scenarios showing how to align values, life choices and money",
        profile: "impactHero",
      },
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
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );

  const handleAnswer = (answerIndex: number, profile: Profile) => {
    // Update selected answer
    const newSelectedAnswers = [...selectedAnswers];
    const previousAnswer = newSelectedAnswers[currentQuestion];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    // Update scores
    const newScores = { ...scores };
    
    // Remove previous score if answer was changed
    if (previousAnswer !== null) {
      const previousProfile = questions[currentQuestion].answers[previousAnswer].profile;
      newScores[previousProfile] -= 1;
    }
    
    // Add new score
    newScores[profile] += 1;
    setScores(newScores);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    // Determine winner with tie-breaker priority: founder > impactHero > owner
    let winner: Profile = "founder";
    let maxScore = scores.founder;

    if (scores.impactHero > maxScore) {
      winner = "impactHero";
      maxScore = scores.impactHero;
    }

    if (scores.owner > maxScore) {
      winner = "owner";
    }

    onComplete(winner);
  };

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion] !== null;

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
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
          {currentQ.question}
        </h2>

        {/* Answers */}
        <div className="space-y-4 mb-8">
          {currentQ.answers.map((answer, idx) => (
            <Button
              key={idx}
              onClick={() => handleAnswer(idx, answer.profile)}
              variant="outline"
              className={`w-full h-auto py-6 px-6 text-left justify-start whitespace-normal text-base border-2 transition-all ${
                selectedAnswers[currentQuestion] === idx
                  ? "bg-primary/20 border-primary text-foreground"
                  : "bg-slate-800 border-slate-700 hover:border-primary/50 text-foreground/80 hover:text-foreground"
              }`}
            >
              {answer.text}
            </Button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleBack}
            variant="ghost"
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleFinish}
              disabled={!hasSelectedAnswer}
              className="bg-primary hover:bg-primary/80 text-slate-950 font-semibold px-8"
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!hasSelectedAnswer}
              className="gap-2 bg-primary hover:bg-primary/80 text-slate-950 font-semibold"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

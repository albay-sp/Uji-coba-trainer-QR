export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface ComponentData {
  slug: string;
  name: string;
  category: string;
  imageUrl: string;
  functionDescription: string;
  workingPrinciple: string[]; // Step-by-step
  types: string[];
  youtubeUrl: string; // YouTube embed URL or watch URL
  quiz: QuizQuestion[];
}

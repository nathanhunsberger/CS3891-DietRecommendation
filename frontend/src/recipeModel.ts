export interface Recipe {
    id: number;
    name: string;
    image: string;
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
    instructions?: string,
    description?: string,
    review?: number
  }
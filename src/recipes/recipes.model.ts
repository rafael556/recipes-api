export class Recipe {
  constructor(data?: Partial<Recipe>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  recipeId: string;
  title: string;
  description: string;
  instructions: string;
  prepareTime: number;
  portionsNumber: number;
  difficulty: number;
  creationDate: string;
  updateDate: string;
  isActive: boolean;
  userId: string;
  categories: string[];

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}

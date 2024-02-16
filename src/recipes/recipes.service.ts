import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './createRecipe.dto';
import { RecipeFactory } from './recipe.factory';

@Injectable()
export class RecipesService {
  constructor(private readonly recipeFactory: RecipeFactory) {}
  async createRecipe(recipeDto: CreateRecipeDto): Promise<any> {
    const recipe = this.recipeFactory.createFromDto(recipeDto);

    return recipe;
  }
}


import { Injectable } from '@nestjs/common';
import { UtilsService } from '../../utils/utils.service';
import { CreateRecipeDto } from '../dtos/createRecipe.dto';
import { Recipe } from './recipes.model';

@Injectable()
export class RecipeFactory {
  constructor(private readonly utils: UtilsService) {}
  createFromDto(dto: CreateRecipeDto): Recipe {
    const recipe = new Recipe();

    recipe.title = dto.title;
    recipe.description = dto.description;
    recipe.instructions = dto.instructions;
    recipe.prepareTime = dto.prepareTime;
    recipe.portionsNumber = dto.portionsNumber;
    recipe.difficulty = dto.difficulty;

    recipe.recipeId = this.utils.generateUUID();
    recipe.creationDate = new Date().toISOString();
    recipe.updateDate = recipe.creationDate;
    recipe.isActive = true;

    return recipe;
  }
}

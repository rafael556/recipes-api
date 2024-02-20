import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dtos/createRecipe.dto';
import { RecipeFactory } from '../model/recipe.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '../model/recipes.model';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { RecipeDto } from '../dtos/recipe.dto';
import { UpdateRecipeDto } from '../dtos/updateRecipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeFactory: RecipeFactory,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  async createRecipe(recipeDto: CreateRecipeDto): Promise<any> {
    const recipe = this.recipeFactory.createFromDto(recipeDto);

    const savedRecipe = this.recipeRepository.save(recipe);
    return plainToInstance(RecipeDto, savedRecipe);
  }

  async findOneRecipe(recipeId: string): Promise<RecipeDto> {
    const recipe = await this.recipeRepository.findOneBy({ recipeId });
    if (!recipe) {
      throw new BadRequestException('invalid recipeId');
    } else {
      return plainToInstance(RecipeDto, recipe);
    }
  }

  async listAllRecipes() {
    const recipes = await this.recipeRepository.find();
    const recipesDtos = recipes.map((e) => plainToInstance(RecipeDto, e));
    return recipesDtos;
  }

  async update(recipeId: string, updateRecipeDto:UpdateRecipeDto): Promise<RecipeDto> {
    const recipe = await this.recipeRepository.findOneBy({recipeId});

    if(!recipe) {
      throw new BadRequestException('invalid RecipeId');
    }

    const recipeToUpdate: Recipe = Object.assign(recipe, updateRecipeDto);

    const updatedRecipe = await this.recipeRepository.save(recipeToUpdate);
    return plainToInstance(RecipeDto, updatedRecipe);
  }

  async activate(recipeId: string): Promise<RecipeDto> {
    let recipe = await this.recipeRepository.findOneBy({ recipeId });

    if (!recipe) {
      throw new BadRequestException('Invalid recipeId');
    }

    if (!recipe.isActive) {
      recipe.isActive = true;
      recipe = await this.recipeRepository.save(recipe);
    }

    return plainToInstance(RecipeDto, recipe);
  }

  async deactivate(recipeId: string): Promise<RecipeDto> {
    let recipe = await this.recipeRepository.findOneBy({ recipeId });

    if (!recipe) {
      throw new BadRequestException('Invalid recipeId');
    }

    if (recipe.isActive) {
      recipe.isActive = false;
      recipe = await this.recipeRepository.save(recipe);
    }

    return plainToInstance(RecipeDto, recipe);
  }
}

// recipeId: string;
// title: string;
// description: string;
// instructions: string;
// prepareTime: number;
// portionsNumber: number;
// difficulty: number;
// creationDate: string;
// updateDate: string;
// isActive: boolean;
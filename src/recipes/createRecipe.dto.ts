import { IsArray, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { Recipe } from './recipes.model';
import { plainToInstance } from 'class-transformer';

export class CreateRecipeDto implements Partial<Recipe> {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  instructions: string;

  @IsNumber()
  @Min(0)
  prepareTime: number;

  @Min(0)
  @IsNumber()
  portionsNumber: number;

  @IsNumber()
  difficulty: number;

  @IsArray()
  categories: string[];
}

import { IsBoolean, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { Recipe } from '../model/recipes.model';

export class UpdateRecipeDto implements Partial<Recipe> {
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

  @IsBoolean()
  isActive: boolean;
}

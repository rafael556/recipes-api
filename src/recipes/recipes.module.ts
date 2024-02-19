import { Module } from '@nestjs/common';
import { RecipesService } from './service/recipes.service';
import { UtilsModule } from 'src/utils/utils.module';
import { RecipeFactory } from './model/recipe.factory';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './model/recipes.model';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([Recipe])],
  providers: [RecipesService, RecipeFactory],
  controllers: [RecipesController],
})
export class RecipesModule {}

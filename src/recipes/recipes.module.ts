import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { UtilsModule } from 'src/utils/utils.module';
import { RecipeFactory } from './recipe.factory';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [UtilsModule],
  providers: [RecipesService, RecipeFactory],
  controllers: [RecipesController],
})
export class RecipesModule {}

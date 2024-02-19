import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeDto } from '../dtos/createRecipe.dto';
import { RecipeFactory } from './recipe.factory';
import { Recipe } from './recipes.model';
import { UtilsService } from '../../utils/utils.service';
import { UtilsModule } from '../../utils/utils.module';

describe('Recipe Factory', () => {
  const recipeDto: CreateRecipeDto = {
    title: 'test',
    description: 'test',
    instructions: 'test',
    prepareTime: 2,
    portionsNumber: 0,
    difficulty: 4,
  };

  const recipe = new Recipe(recipeDto);
  recipe.recipeId = '';
  recipe.creationDate = '';
  recipe.updateDate = recipe.creationDate;
  recipe.isActive = true;

  let factory: RecipeFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      providers: [
        RecipeFactory,
        {
          provide: UtilsService,
          useFactory: () => ({
            generateUUID: jest.fn().mockReturnValue('3'),
          }),
        },
      ],
    }).compile();
    factory = module.get<RecipeFactory>(RecipeFactory);
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  it('should create recipe model', () => {
    const result = factory.createFromDto(recipeDto);
    expect(result.title).toBe(recipe.title);
    expect(result.description).toBe(recipe.description);
    expect(result.instructions).toBe(recipe.instructions);
    expect(result.prepareTime).toBe(recipe.prepareTime);
    expect(result.portionsNumber).toBe(recipe.portionsNumber);
    expect(result.difficulty).toBe(recipe.difficulty);
    expect(result.recipeId).toBe('3');
    expect(result.creationDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
    expect(result.updateDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
    expect(result.isActive).toBe(true);
    expect(result).toBeInstanceOf(Recipe);
  });
});

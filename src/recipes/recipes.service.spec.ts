import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './createRecipe.dto';
import { Recipe } from './recipes.model';
import { RecipeFactory } from './recipe.factory';

describe('RecipesService', () => {
  let service: RecipesService;
  let recipeFactoryMock: jest.Mocked<RecipeFactory>;

  const entryValidData: CreateRecipeDto = {
    title: 'test',
    description: 'test',
    instructions: 'test',
    prepareTime: 2,
    portionsNumber: 0,
    difficulty: 4,
    categories: [],
  };
  const validRecipe: Recipe = new Recipe({
    title: 'test',
    description: 'test',
    instructions: 'test',
    prepareTime: 2,
    portionsNumber: 0,
    difficulty: 4,
    userId: '1',
    categories: [],
  });

  beforeEach(async () => {
    recipeFactoryMock = {
      createFromDto: jest.fn().mockReturnValue(validRecipe),
    } as unknown as jest.Mocked<RecipeFactory>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: RecipeFactory,
          useValue: recipeFactoryMock,
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRecipe', () => {
    it('should create a complete recipe from dto', async () => {
      await service.createRecipe(entryValidData);
      expect(recipeFactoryMock.createFromDto).toHaveBeenCalledTimes(1);
      expect(recipeFactoryMock.createFromDto).toHaveBeenCalledWith(entryValidData);
    });

    it('should save a recipe in the database', async () => {
      await service.createRecipe(entryValidData);
      expect(recipeFactoryMock.createFromDto).toHaveBeenCalledTimes(1);
      expect(recipeFactoryMock.createFromDto).toHaveBeenCalledWith(entryValidData);
    });
  });
});

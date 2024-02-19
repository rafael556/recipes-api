import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from '../dtos/createRecipe.dto';
import { Recipe } from '../model/recipes.model';
import { RecipeFactory } from '../model/recipe.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeDto } from '../dtos/recipe.dto';
import { BadRequestException } from '@nestjs/common';

describe('RecipesService', () => {
  let service: RecipesService;
  let recipeFactoryMock: jest.Mocked<RecipeFactory>;
  let mockRepository: jest.Mocked<Repository<Recipe>>;

  const entryValidData: CreateRecipeDto = {
    title: 'test',
    description: 'test',
    instructions: 'test',
    prepareTime: 2,
    portionsNumber: 0,
    difficulty: 4,
  };

  const validRecipe: Recipe = new Recipe({
    title: 'test',
    description: 'test',
    instructions: 'test',
    prepareTime: 2,
    portionsNumber: 0,
    difficulty: 4,
    recipeId: '123456',
    isActive: true,
  });

  const validRecipeDto: RecipeDto = {
    title: 'test',
    description: 'test',
    instructions: 'test',
    prepareTime: 2,
    portionsNumber: 0,
    difficulty: 4,
    recipeId: '123456',
    isActive: true,
  };

  beforeEach(async () => {
    recipeFactoryMock = {
      createFromDto: jest.fn().mockReturnValue(validRecipe),
    } as unknown as jest.Mocked<RecipeFactory>;

    mockRepository = {
      save: jest.fn().mockReturnValue(validRecipe),
      findOneBy: jest.fn().mockReturnValue(validRecipe),
      find: jest.fn().mockReturnValue([validRecipe, validRecipe]),
      update: jest.fn().mockReturnValue(validRecipe),
    } as unknown as jest.Mocked<Repository<Recipe>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: RecipeFactory,
          useValue: recipeFactoryMock,
        },
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockRepository,
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

    it('should call recipe factory', async () => {
      await service.createRecipe(entryValidData);
      expect(recipeFactoryMock.createFromDto).toHaveBeenCalledTimes(1);
      expect(recipeFactoryMock.createFromDto).toHaveBeenCalledWith(entryValidData);
    });

    it('should save a recipe in the database', async () => {
      await service.createRecipe(entryValidData);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return an instance of recipeDto', async () => {
      expect(await service.createRecipe(entryValidData)).toBeInstanceOf(RecipeDto);
    });
  });

  describe('find by id', () => {
    it('should return valid Recipe from repository', async () => {
      const entryValue = '123456';
      await service.findOneRecipe(entryValue);

      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOneBy).toHaveReturned();
    });

    it('should throw when invalid recipeId', async () => {
      const entryValue = '123456';
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOneRecipe(entryValue)).rejects.toThrow(BadRequestException);
    });

    it('should return RecipeDto', async () => {
      const entryValue = '123456';
      const result = await service.findOneRecipe(entryValue);

      expect(result).toBeInstanceOf(RecipeDto);
    });
  });

  describe('find all', () => {
    it('should return a valid answer from repository', async () => {
      await service.listAllRecipes();

      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveReturned();
    });

    it('should return a filled list of RecipeDto when there are recipes', async () => {
      const result = await service.listAllRecipes();
      expect(result).toHaveLength(2);
      expect(result).toEqual([validRecipeDto, validRecipeDto]);
    });
    it('should return an empty list of RecipeDto when there are no recipes', async () => {
      mockRepository.find = jest.fn().mockResolvedValue([]);
      const result = await service.listAllRecipes();
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {});

  describe('activate', () => {
    it('should call find one by', async () => {
      const entryId = '123456';

      await service.activate(entryId);

      expect(mockRepository.findOneBy).toHaveBeenCalled();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ recipeId: entryId });
    });

    it('should throw if no recipe found', async () => {
      const entryId = '123456';
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.activate(entryId)).rejects.toThrow(BadRequestException);
    });

    it('should call save when recipe is inactive', async () => {
      const entryId = '123456';
      const inactiveRecipe = Object.assign({}, validRecipe);
      inactiveRecipe.isActive = false;

      mockRepository.findOneBy.mockResolvedValue(inactiveRecipe);

      const result = await service.activate(entryId);

      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(validRecipe);
      expect(result).toEqual(validRecipeDto);
    });

    it('should not call save when recipe is active', async () => {
      const entryId = '123456';

      mockRepository.findOneBy.mockResolvedValue(validRecipe);

      const result = await service.activate(entryId);

      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(result).toEqual(validRecipeDto);
    });
  });

  describe('deactivate', () => {
    it('should call find one by', async () => {
      const entryId = '123456';

      mockRepository.findOneBy.mockResolvedValue(validRecipe);

      await service.deactivate(entryId);

      expect(mockRepository.findOneBy).toHaveBeenCalled();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ recipeId: entryId });
    });

    it('should throw if no recipe found', async () => {
      const entryId = '123456';
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.deactivate(entryId)).rejects.toThrow(BadRequestException);
    });

    it('should call save when recipe is active', async () => {
      const entryId = '123456';
      validRecipe.isActive = true;
      mockRepository.findOneBy.mockResolvedValue(validRecipe);
      const inactiveRecipe = Object.assign({}, validRecipe);
      inactiveRecipe.isActive = false;

      const invalidRecipeDto = Object.assign({}, validRecipeDto);
      invalidRecipeDto.isActive = false;

      const result = await service.deactivate(entryId);

      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalledWith(inactiveRecipe);
      expect(result).toEqual(invalidRecipeDto);
    });

    it('should not call save when recipe is inactive', async () => {
      const entryId = '123456';
      const inactiveRecipe = validRecipe;
      inactiveRecipe.isActive = false;

      const invalidRecipeDto = validRecipeDto;
      invalidRecipeDto.isActive = false;

      mockRepository.findOneBy.mockResolvedValue(inactiveRecipe);

      const result = await service.deactivate(entryId);

      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(result).toEqual(invalidRecipeDto);
    });
  });

  describe('remove', () => {
    
  });
});

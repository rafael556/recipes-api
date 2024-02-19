import { Recipe } from './recipes.model';

describe('Recipe model', () => {
  let recipe: Recipe = null;
  beforeEach(() => {
    recipe = new Recipe();
  });

  it('should activate recipe', () => {
    recipe.activate();
    expect(recipe.isActive).toBe(true);
  });
  it('should deactivate recipe', () => {
    recipe.deactivate();
    expect(recipe.isActive).toBe(false);
  });
});

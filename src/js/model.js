import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// Handle state and async

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};
export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async query => {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.query = query;
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

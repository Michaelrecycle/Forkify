import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

// Handle state and async

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookMarks: [],
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

    if (state.bookMarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
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
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });

  state.recipe.servings = newServings;
};

export const persistBookmarks = () => {
  localStorage.setItem('bookMarks', JSON.stringify(state.bookMarks));
};

export const addBookmark = recipe => {
  state.bookMarks.push(recipe);

  // Mark current recipe as book mark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = recipe => {
  state.bookMarks = state.bookMarks.filter(rec => rec.id !== recipe.id);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = () => {
  const storedBookMarks = JSON.parse(localStorage.getItem('bookMarks'));
  if (storedBookMarks) state.bookMarks = storedBookMarks;
};

init();

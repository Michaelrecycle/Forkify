import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView';

// Handle events

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Loading recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    // Get search query
    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    // render
  } catch (err) {
    throw err;
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

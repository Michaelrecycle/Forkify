import * as model from './model.js';
import recipeView from './views/recipeView';

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
const init = () => {
  recipeView.addHandlerRender(controlRecipes);
};
init();

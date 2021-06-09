import * as model from './model.js';
import recipeView from './views/recipeView';

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
    alert(err);
  }
};
['hashChange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

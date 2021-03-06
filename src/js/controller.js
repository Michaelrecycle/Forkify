import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import addRecipeView from './views/addRecipeView.js';
import bookMarksView from './views/bookMarksView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView';

// Handle events

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    resultsView.update(model.getSearchResultsPage());

    bookMarksView.update(model.state.bookMarks);
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

    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage(1));

    paginationView.render(model.state.search);

    // render
  } catch (err) {
    throw err;
  }
};

const controlPagination = goToPage => {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  // update the recipe servings
  // update the view

  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); // only update text and attributes in the DOM
};

const controlAddBookmark = () => {
  //add or remove a book mark

  if (model.state.recipe.bookmarked) {
    model.removeBookmark(model.state.recipe);
  } else {
    model.addBookmark(model.state.recipe);
  }

  recipeView.update(model.state.recipe);

  // render bookamrks
  bookMarksView.render(model.state.bookMarks);
};

const controlBookmarks = () => {
  bookMarksView.render(model.state.bookMarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookMarksView.render(model.state.bookMarks);

    // Change id in thw URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = () => {
  bookMarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

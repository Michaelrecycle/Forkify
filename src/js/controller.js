const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async () => {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/v2/recipes/fb78937c-f034-4055-8fe7-45759c506cec'
    );
    const data = await res.json();
    console.log(res, data);
  } catch (err) {
    alert(err);
  }
};

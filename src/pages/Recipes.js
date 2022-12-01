import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/useContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

const cardLimit = 12;

function Recipes() {
  const history = useHistory();
  const {
    recipes,
    fetchRecipes,
    setRecipeType,
    fetchCategories,
    categories,
  } = useContext(Context);
  const { pathname } = history.location;

  useEffect(() => {
    setRecipeType(pathname.replace('/', ''));
    fetchRecipes({}, pathname.replace('/', ''));
    fetchCategories(pathname.replace('/', ''));
  }, [pathname]);

  let pageTitle = 'Meals';
  let idKey = 'idMeal';
  let image = 'strMealThumb';
  let title = 'strMeal';
  if (pathname === '/drinks') {
    pageTitle = 'Drinks';
    idKey = 'idDrink';
    image = 'strDrinkThumb';
    title = 'strDrink';
  }

  return (
    <main>
      <h1>{pageTitle}</h1>
      <div className="categories-container">
        {
          categories.map((cat) => (
            <button
              key={ `k-${cat}` }
              type="button"
              data-testid={ `${cat}-category-filter` }
              onClick={ () => fetchRecipes(
                { ingredient: cat },
                pathname.replace('/', ''),
              ) }
            >
              {cat}
            </button>
          ))
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => fetchRecipes({}, pathname.replace('/', '')) }
        >
          All
        </button>
      </div>
      <section className="recipe-cards-container">
        {
          recipes.slice(0, cardLimit).map((rec, index) => (
            <RecipeCard
              key={ rec[idKey] }
              recipeImage={ rec[image] }
              recipeTitle={ rec[title] }
              index={ index }
            />
          ))
        }
      </section>
      <Footer />
    </main>
  );
}

export default Recipes;

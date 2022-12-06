import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/useContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

const cardLimit = 12;

function Recipes() {
  const history = useHistory();
  const {
    recipes,
    fetchRecipes,
    setRecipeType,
    fetchCategories,
    categories,
    fetchRecipesCat,
  } = useContext(Context);
  const { pathname } = history.location;
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    setRecipeType(pathname.replace('/', ''));
    fetchRecipes({}, pathname.replace('/', ''));
    fetchCategories(pathname.replace('/', ''));
  }, [pathname]);

  let idKey = 'idMeal';
  let image = 'strMealThumb';
  let title = 'strMeal';
  if (pathname === '/drinks') {
    idKey = 'idDrink';
    image = 'strDrinkThumb';
    title = 'strDrink';
  }

  const filterByCategories = (cat) => {
    if (activeFilter === cat) {
      fetchRecipes({}, pathname.replace('/', ''));
      setActiveFilter('');
    } else {
      fetchRecipesCat(
        cat,
        pathname.replace('/', ''),
      );
      setActiveFilter(cat);
    }
  };

  const redirectToDetails = (id) => {
    history.push(`${pathname}/${id}`);
  };

  return (
    <main>
      <Header />
      <div className="categories-container">
        {
          categories.map((cat) => (
            <button
              key={ `k-${cat}` }
              type="button"
              data-testid={ `${cat}-category-filter` }
              onClick={ () => filterByCategories(cat) }
            >
              {cat}
            </button>
          ))
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => {
            fetchRecipes({}, pathname.replace('/', ''));
            setActiveFilter('');
          } }
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
              recipeId={ rec[idKey] }
              redirectToDetails={ redirectToDetails }
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

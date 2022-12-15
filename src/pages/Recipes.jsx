import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/useContext';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Categories, PageTitle } from './CSS/Recipes.styled';

const cardLimit = 12;

const headerRoutes = [
  {
    name: 'meals',
    pageName: 'Meals',
    profile: true,
    search: true,
  },
  {
    name: 'drinks',
    pageName: 'Drinks',
    profile: true,
    search: true,
  },
  {
    name: 'profile',
    pageName: 'Profile',
    profile: true,
    search: false,
  },
  {
    name: 'done-recipes',
    pageName: 'Done Recipes',
    profile: true,
    search: false,
  },
  {
    name: 'favorite-recipes',
    pageName: 'Favorite Recipes',
    profile: true,
    search: false,
  },
];

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
  const rota = headerRoutes.find((route) => route.name === pathname.replace('/', ''));
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
      <Categories>
        <h1>Categories:</h1>
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
      </Categories>
      <PageTitle>
        { rota.pageName }
      </PageTitle>
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

import React from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

// Test Arrays to render RecipeCards, must be removed after fetch logic
const testList = [
  {
    idDrink: '15997',
    strDrink: 'GG',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
  {
    idDrink: '17222',
    strDrink: 'A1',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  },
];
const mealList = [
  {
    idMeal: '52977',
    strMeal: 'Corba',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    idMeal: '53060',
    strMeal: 'Burek',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  },
];

function Recipes() {
  const history = useHistory();
  const { pathname } = history.location;

  let pageTitle = 'Meals';
  let idKey = 'idMeal';
  let image = 'strMealThumb';
  let title = 'strMeal';
  let list = mealList;
  if (pathname === '/drinks') {
    pageTitle = 'Drinks';
    idKey = 'idDrink';
    image = 'strDrinkThumb';
    title = 'strDrink';
    list = testList;
  }

  return (
    <main>
      <h1>{pageTitle}</h1>
      <section className="recipe-cards-container">
        {
          list.map((rec, index) => (
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

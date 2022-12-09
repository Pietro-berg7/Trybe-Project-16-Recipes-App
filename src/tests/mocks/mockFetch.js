import mealCategories from './mealCategories';
import drinkCategories from './drinkCategories';
import meals from './meals';
import drinks from './drinks';
import beefMeals from './beefMeals';
import mealChickenIngredient from './mealChickenIngredient';
import corba from './corba';
import aquamarine from './aquamarine';
import spicyArrabiata from './spicyArrabiata';

export default function mockFetch(url) {
  return Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals);

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return Promise.resolve(drinks);

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);

      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return Promise.resolve(beefMeals);

      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken') return Promise.resolve(mealChickenIngredient);

      if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') return Promise.resolve(corba);

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') return Promise.resolve(aquamarine);

      if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') return Promise.resolve(spicyArrabiata);

      return Promise.reject(new Error('Invalid url'));
    },
  });
}

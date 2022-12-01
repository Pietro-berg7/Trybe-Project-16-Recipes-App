import mealCategories from './mealCategories';
import drinkCategories from './drinkCategories';
import meals from './meals';
import drinks from './drinks';

export default function fetch(url) {
  Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/') return meals;

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return drinks;

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return drinkCategories;

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return mealCategories;

      return Promise.reject(new Error('Invalid url'));
    },
  });
}

import mealCategories from './mealCategories';
import drinkCategories from './drinkCategories';
import meals from './meals';
import drinks from './drinks';

export default function mockFetch(url) {
  console.log(`URL: ${url}`);
  return Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return Promise.resolve(meals);

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/') return Promise.resolve(drinks);

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(drinkCategories);

      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return Promise.resolve(mealCategories);

      return Promise.reject(new Error('Invalid url'));
    },
  });
}

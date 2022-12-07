const addFavorite = (recipe, pathname) => ({
  id: recipe.idMeal || recipe.idDrink,
  type: pathname.split('/')[1].split('s')[0],
  nationality: recipe.strArea || '',
  category: recipe.strCategory || '',
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
});

export default addFavorite;

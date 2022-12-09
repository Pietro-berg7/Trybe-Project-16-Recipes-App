import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function Favorites() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const getFavorites = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
      setFavorite(favoriteRecipes);
    };
    getFavorites();
  }, []);

  return (
    <main>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {} }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => {} }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {} }
        >
          Drinks
        </button>
      </div>

      { favorite.length && (
        <section>
          {
            favorite
              .map((element, index) => (
                <div
                  key={ `${element.id}-${index}` }
                >
                  <div>
                    <img
                      width="50%"
                      data-testid={ `${index}-horizontal-image` }
                      src={ element.image }
                      alt={ `${element.name}` }
                    />
                    <h3
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {element.name}
                    </h3>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {
                        element.type === 'meal'
                          ? `${element.nationality} - ${element.category}`
                          : element.alcoholicOrNot
                      }
                    </p>
                    <div>
                      <button
                        data-testid={ `${index}-horizontal-share-btn` }
                        type="button"
                        src={ shareIcon }
                      >
                        <img src={ shareIcon } alt="shareIcon" />
                      </button>
                    </div>
                    <button
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      type="button"
                      src={ blackHeartIcon }
                    >
                      <img src={ blackHeartIcon } alt="" />
                    </button>
                  </div>
                </div>
              ))
          }
        </section>
      )}
    </main>
  );
}

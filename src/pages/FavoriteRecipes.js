import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function Favorites() {
  const [favorite, setFavorite] = useState([]);
  const [filter, setFilter] = useState('all');
  const [shareRecipe, setShareRecipe] = useState('');

  const handleShare = (element, id) => {
    copy(`http://localhost:3000/${element.type}s/${element.id}`);
    setShareRecipe(id);
  };

  const handleFavorite = (id) => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(newFavorites);
  };

  useEffect(() => {
    const getFavorites = () => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      } else {
        setFavorite(favoriteRecipes);
      }
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
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>

      { favorite.length && (
        <section>
          {
            favorite.filter(({ type }) => filter === 'all' || type === filter)
              .map((element, index) => (
                <div
                  key={ `${element.id}-${index}` }
                >
                  <div>
                    <Link to={ `/${element.type}s/${element.id}` }>
                      <img
                        width="50%"
                        data-testid={ `${index}-horizontal-image` }
                        src={ element.image }
                        alt={ `${element.name}` }
                      />
                    </Link>
                    <Link to={ `/${element.type}s/${element.id}` }>
                      <h3
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {element.name}
                      </h3>
                    </Link>
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
                        onClick={ () => handleShare(element, element.id) }
                      >
                        <img src={ shareIcon } alt="shareIcon" />
                      </button>
                      {shareRecipe === element.id && <span>Link copied!</span>}
                    </div>
                    <button
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      type="button"
                      src={ blackHeartIcon }
                      onClick={ () => handleFavorite(element.id) }
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

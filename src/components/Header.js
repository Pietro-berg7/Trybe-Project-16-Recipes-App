import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [available, setAvailable] = useState(false);
  const loc = useLocation();
  const history = useHistory();
  const rota = loc.pathname;
  const dn = '/done-recipes';
  const fv = '/favorite-recipes';

  const specs = ['/profile', dn, fv];

  let pageName = '';
  let refName = '';

  switch (rota) {
  case '/meals':
    pageName = 'Meals';
    refName = '/meals';
    break;
  case '/drinks':
    pageName = 'Drinks';
    refName = '/drinks';
    break;
  case '/profile':
    pageName = 'Profile';
    refName = '/profile';
    break;
  case '/done-recipes':
    pageName = 'Done Recipes';
    refName = dn;
    break;
  case '/favorite-recipes':
    pageName = 'Favorite Recipes';
    refName = fv;
    break;
  default:
    return null;
  }
  const showSearchBar = () => {
    if (specs.includes(refName)) { return true; }
  };

  return (
    <section className="header">
      <h1 data-testid="page-title">
        { pageName }
      </h1>
      <button
        data-testid="profile-top-btn"
        type="button"
        src={ profileIcon }
        onClick={ history.push('/profile') }
      >
        <img src={ profileIcon } alt="profile" />
      </button>
      { showSearchBar() ? ''
        : (
          <div>
            <h1 data-testid="page-title">
              { pageName }
            </h1>
            <button
              type="button"
              data-testid="search-top-btn"
              src={ searchIcon }
              onClick={ () => setAvailable(true) }
            >
              <img
                src={ searchIcon }
                alt="search"
              />
            </button>
          </div>
        )}
      {available && (
        <input
          data-testid="search-input"
          type="text"
        />
      )}
    </section>
  );
}

export default Header;


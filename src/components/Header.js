import React, { useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [disponivel, setDisponivel] = useState(false);
  const { search, setSearch } = useContext(useContext);
  const loc = useLocation();
  const rota = loc.pathname;
  const notUsed = ['/profile', '/done-recipes', '/fvorite-recipes'];
  let pageName = '';

  switch (rota) {
  case '/meals':
    pageName = 'Meals';
    break;
  case '/drinks':
    pageName = 'Drinks';
    break;
  case '/profile':
    pageName = 'Profile';
    break;
  case '/done-recipes':
    pageName = 'Done Recipes';
    break;
  case '/favorite=recipes':
    pageName = 'Favorite Recipes';
    break;
  default:
    return null;
  }
  return (
    <section>
      {disponivel && <Redirect to="/profile" />}
      <div className="title-header">
        <button type="button" onClick={ () => setDisponivel(true) }>
          <img
            src={ profileIcon }
            alt="Profile icon"
            data-testid="profile-top-btn"
          />
        </button>
        <button type="button" onClick={ () => setSearch(search) }>
          <img
            src={ searchIcon }
            alt="Search icon"
            data-testid="search-top-btn"
          />
        </button>
        <h1>
          { pageName }
        </h1>
      </div>
      {notUsed.includes(pageName) && (
        <button
          type="button"
          src={ profileIcon }
          alt="Profile icon"
          data-testid="search-top-btn"
          onClick={ () => setSearch(!search) }
        >
          <span />
        </button>
      )}
    </section>
  );
}

export default Header;

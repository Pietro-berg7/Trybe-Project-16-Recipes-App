import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { HeaderStyle, ProfileButton } from './CSS/Header.styled';

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

function Header() {
  // const [available, setAvailable] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const rota = headerRoutes.find((route) => route.name === pathname.replace('/', ''));

  return (
    <HeaderStyle className="header">
      { rota.profile && (
        <ProfileButton
          data-testid="profile-top-btn"
          type="button"
          src={ profileIcon }
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="profile" />
        </ProfileButton>
      )}
      <SearchBar />
    </HeaderStyle>
  );
}

export default Header;

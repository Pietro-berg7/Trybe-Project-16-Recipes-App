import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [userMail, setUserMail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { email } = user;
    setUserMail(email);
  }, []);

  const redirectToPage = (page) => {
    history.push(page);
  };

  return (
    <div>
      <Header />
      <main>
        <p data-testid="profile-email">{ userMail }</p>
        <section>
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => redirectToPage('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => redirectToPage('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => {} }
          >
            Logout
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

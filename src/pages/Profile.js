import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const [userMail, setUserMail] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { email } = user;
    setUserMail(email);
  }, []);

  return (
    <div>
      <Header />
      <main>
        <p data-testid="profile-email">{ userMail }</p>
        <section>
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => {} }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => {} }
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

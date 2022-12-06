import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <Header />
      <main>
        <p data-testid="profile-email">email</p>
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

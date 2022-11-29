import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="Drink Icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        type="button"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="Meal Icon" />
      </button>
    </footer>
  );
}

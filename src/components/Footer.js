import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { Section } from './CSS/Footer.styled';
import '../css/Footer.css';

export default function Footer() {
  const history = useHistory();

  const DrinksPage = () => {
    history.push('/drinks');
  };

  const MealsPage = () => {
    history.push('/meals');
  };

  return (
    <footer data-testid="footer" className="footer">
      <Section>
        <button
          data-testid="drinks-bottom-btn"
          type="button"
          src={ drinkIcon }
          onClick={ DrinksPage }
        >
          <img src={ drinkIcon } alt="Drink Icon" />
        </button>
        <button
          data-testid="meals-bottom-btn"
          type="button"
          src={ mealIcon }
          onClick={ MealsPage }
        >
          <img src={ mealIcon } alt="Meal Icon" />
        </button>
      </Section>
    </footer>
  );
}

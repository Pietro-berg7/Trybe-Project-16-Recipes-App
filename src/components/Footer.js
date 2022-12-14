import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { Container, Button } from './CSS/Footer.styled';

export default function Footer() {
  const history = useHistory();

  const DrinksPage = () => {
    history.push('/drinks');
  };

  const MealsPage = () => {
    history.push('/meals');
  };

  return (
    <Container data-testid="footer" className="footer">
      <Button
        data-testid="drinks-bottom-btn"
        type="button"
        src={ drinkIcon }
        onClick={ DrinksPage }
      >
        <img src={ drinkIcon } alt="Drink Icon" />
      </Button>
      <Button
        data-testid="meals-bottom-btn"
        type="button"
        src={ mealIcon }
        onClick={ MealsPage }
      >
        <img src={ mealIcon } alt="Meal Icon" />
      </Button>
    </Container>
  );
}

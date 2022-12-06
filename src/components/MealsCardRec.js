import React from 'react';
import '../css/CardRec.css';
import { array } from 'prop-types';

export default function MealsCardRec({ meals }) {
  // const { meals } = data;
  if (!meals) return null;
  meals.length = 6;
  return (
    <div className="containter">
      <div className="carousel">
        {meals.map((el, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            className="item"
            key={ index }
          >
            <p
              data-testid={ `${index}-recommendation-title` }
              key={ index }
            >
              {el.strMeal}
            </p>
            <img style={ { width: '100px' } } src={ el.strMealThumb } alt="thumb" />
          </div>

        ))}
      </div>

    </div>
  );
}

MealsCardRec.propTypes = {
  drinks: array,
}.isRequired;

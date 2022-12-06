import React from 'react';
import '../css/CardRec.css';
import { array } from 'prop-types';

export default function DrinksCardRec({ drinks }) {
  if (!drinks) return null;
  drinks.length = 6;

  return (
    <div className="containter">
      <div className="carousel">
        {drinks.map((el, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            className="item"
            key={ index }
          >
            <p
              data-testid={ `${index}-recommendation-title` }
              key={ index }
            >
              {el.strDrink}
            </p>
            <img style={ { width: '100px' } } src={ el.strDrinkThumb } alt="thumb" />
          </div>

        ))}
      </div>

    </div>
  );
}

DrinksCardRec.propTypes = {
  drinks: array,
}.isRequired;

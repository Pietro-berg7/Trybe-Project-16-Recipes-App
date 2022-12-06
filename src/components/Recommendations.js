import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/CardRec.css';
import { array } from 'prop-types';
import { Context } from '../context/useContext';

export default function Recommendations() {
  const history = useHistory();
  const { fetchRecipeRecommendations } = useContext(Context);
  const { pathname } = history.location;
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      setData(await fetchRecipeRecommendations(pathname));
    };
    dataFetch();
  }, [fetchRecipeRecommendations, pathname]);

  return (
    <div className="containter">
      <div className="carousel">
        {data.map((el, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            className="item"
            key={ index }
          >
            <p
              data-testid={ `${index}-recommendation-title` }
              key={ index }
            >
              {el.strDrink || el.strMeal}
            </p>
            <img
              style={ { width: '100px' } }
              src={ el.strDrinkThumb || el.strMealThumb }
              alt="thumb"
            />
          </div>

        ))}
      </div>

    </div>
  );
}

Recommendations.propTypes = {
  drinks: array,
}.isRequired;

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/CardRec.css';
import { array } from 'prop-types';
import { Context } from '../context/useContext';

import { Container, Card } from './CSS/Recommendations.styled';

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
    <Container className="carousel">
      {data.map((el, index) => (
        <div
          data-testid={ `${index}-recommendation-card` }
          className="item"
          key={ index }
        >
          <Card>
            <p
              data-testid={ `${index}-recommendation-title` }
              key={ index }
            >
              {el.strDrink || el.strMeal}
            </p>
            <img
              src={ el.strDrinkThumb || el.strMealThumb }
              alt="thumb"
            />
          </Card>
        </div>

      ))}
    </Container>
  );
}

Recommendations.propTypes = {
  drinks: array,
}.isRequired;

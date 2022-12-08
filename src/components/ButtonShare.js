import { func } from 'prop-types';
import React from 'react';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonShare(props) {
  const { handleShare } = props;

  return (
    <button
      data-testid="share-btn"
      type="button"
      onClick={ handleShare }
    >
      <img src={ shareIcon } alt="shareIcon" />
    </button>
  );
}

ButtonShare.propTypes = {
  handleShare: func,
}.isRequired;

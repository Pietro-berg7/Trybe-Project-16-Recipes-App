import { string } from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonShare(props) {
  const { pathname, testid } = props;
  const [shareRecipe, setShareRecipe] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000${pathname.replace('/in-progress', '')}`);
    setShareRecipe(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleShare }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="shareIcon" data-testid={ testid } />
      </button>
      {shareRecipe && <span>Link copied!</span>}
    </div>
  );
}

ButtonShare.propTypes = {
  pathname: string,
  testid: string,
}.isRequired;

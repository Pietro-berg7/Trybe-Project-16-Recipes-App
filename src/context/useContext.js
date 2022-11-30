import React, { createContext } from 'react';
import { node } from 'prop-types';

export const Context = createContext();

export default function Provider({ children }) {
  return (
    <Context.Provider>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

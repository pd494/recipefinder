import React from 'react';
import Card from "./Card"
import recipedata from "../recipes.json"
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import RecipeList from './RecipeList';






export function Submit({ setButClicked }) {
  const handleClick = () => {
    setButClicked(prev => !prev);
  };

  return (
    <div className="RecipeList">
      <button onClick={handleClick} className="btn">Submit Ingredients</button>
    </div>
  );
}

export default Submit;

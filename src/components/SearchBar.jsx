import React, { useState, useEffect } from 'react';
import jsondata from '../data.json'
import Card from './Card'
import { useMemo } from 'react';
import { Input } from "@chakra-ui/react";


const APIKEY = 'ed09dd04ced84a1da9c759f30bc2ecba';

let timeoutId;

function SearchBar() {
  const [data, setData] = useState('');
  const [autoFillIngredients, setAutoFillIngredients] = useState([]);

 

  const updateBar = () => {

    setData(document.getElementById("bar").value)
        
    const autoFillIngredients = jsondata.map(ingredient => {

        return <Card    
                    image={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    name = {ingredient.name} />

      })

      setAutoFillIngredients(autoFillIngredients)
      
    clearTimeout(timeoutId);

    // timeoutId = setTimeout(() => {
    //   const value = document.getElementById('bar').value;

    //   fetch(
    //     `https://api.spoonacular.com/food/ingredients/autocomplete?query=${value}&apiKey=${APIKEY}`
    //   )
    //     .then((response) => response.json())
    //     .then((json) => {
    //         setData(json);
    //         console.log(json)
    //     })
    //     .catch((error) => console.error(error));
    // }, 1000); // Delay the API call by 500ms (adjust as needed)


    
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);


  return (
    <div className="SearchBar">
    <Input
      id="bar"
      onChange={(event) => updateBar(event)}
      type="text"
      placeholder="find ingredients.."
    />
    
    {data !== '' && autoFillIngredients}
  </div>
  
  );
}

export default SearchBar;

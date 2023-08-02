import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Input } from '@chakra-ui/react';
import {ings} from './Card'
import RecipeList from './RecipeList'
import App from '../App'

const APIKEY = '66f5a63a1bcc471f9bfc8702874cbdd0';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';




let timeoutId;


export function SearchBar({setSubmitted}) {
  const [data, setData] = useState('');
  const [autoFillIngredients, setAutoFillIngredients] = useState([]);
   const [submitted, changeSubmit] = useState(false)

  const updateBar = (event) => {
    const value = event.target.value;
    setData(value);
  };

  const handleSubmit = () => {

    // changeSubmit(true);
    setSubmitted(true)
    // <RecipeList submit = {submitted}/>

    
  };
  

  useEffect(() => {
    clearTimeout(timeoutId);

    if (data.trim() !== '') {
      timeoutId = setTimeout(() => {
        fetch(
          `https://api.spoonacular.com/food/ingredients/autocomplete?query=${data}&apiKey=${APIKEY}`
        )
          .then((response) => response.json())
          .then((json) => {
            const autoFillIngredients = json.map((ingredient) => (
              <Card
                key={ingredient.id}
                image={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                name={ingredient.name}
              />
            ));

            setAutoFillIngredients(autoFillIngredients);
          })
          .catch((error) => console.error(error));
      }, 500); // Delay the API call by 500ms (adjust as needed)
    } else {
      // Clear the ingredients if the input is empty
      setAutoFillIngredients([]);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  return (
    <div>
    <div className="SearchBar">
      <Input
        id="bar"
        onChange={updateBar}
        type="text"
        placeholder="find ingredients.."
      />

      {data !== '' && autoFillIngredients}
    </div>

    <button onClick = {handleSubmit} className="btn">Submit Ingredients</button>
    {submitted && <RecipeList submit={submitted} />}



    </div>
  );
}

export default SearchBar;

import React from 'react';
import App from '../App'
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { useMemo } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client';



import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'

let ings = []



export default function Card(props) {


    const [buttonPressed, setButtonPressed] = useState(false);
    const [selected, addSelected] = useState([])
    const [rendered, setRender] = useState(false)
    

    const buttonClicked = (button) => {


      const root = document.getElementById('left');
      const container = document.createElement('div');
      

      if (!buttonPressed) {
        
        const ingredientName = button.textContent || button.innerText;
        ings.push(ingredientName);
        setButtonPressed(true);
        (ingredientName)
          let x = document.getElementById('Ingredients')
          let button2 = button.cloneNode(true)
          button2.color = 'red'
          x.appendChild(button2)


      }
    };
  


      
  return (
    <div className="Card">
      
    <Button
      id="but"
      className="CardButton"
      onClick={(e) => buttonClicked(e.target)}
      variant="unstyled"
      display="flex"
      flexDirection='row'
      alignItems="center"
      size = "lg"
    >
      <img className="CardImage" src={props.image} alt={props.name} />
      {props.name}
    </Button>

  </div>
    
  );
}

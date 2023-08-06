import React from "react";
import App from "../App";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useMemo } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from "@chakra-ui/react";

export let ings = [];


export function clearIngs()
{
  ings = []
  console.log(ings)
}
export default function Card(props) {




  const [buttonPressed, setButtonPressed] = useState(false);
  const [selected, addSelected] = useState([]);
  const [rendered, setRender] = useState(false);

  const buttonClicked = (button, ingredientName) => {
    const root = document.getElementById("left");
    const container = document.createElement("div");

    if (!buttonPressed) {
      ings.push(ingredientName);
      setButtonPressed(true);
      let x = document.getElementById("Ingredients");
      let button2 = button.cloneNode(true);
      button2.color = "red";
      x.appendChild(button2);
    }


  };

  console.log(ings)

  return (
    <div className="Card">
      <Button
        id="but"
        className="CardButton"
        onClick={(e) => buttonClicked(e.target, props.name)}
        variant="unstyled"
        display="flex"
        flexDirection="row"
        alignItems="center"
        size="lg"
      >
        <img className="CardImage" src={props.image} alt={props.name} />
        {props.name}
      </Button>
    </div>
  );
}
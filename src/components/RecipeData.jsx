import React from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box } from '@chakra-ui/react';



const RecipeData = ({ isOpen, onClose, recipe }) => {
  
  console.log(recipe.title)

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{recipe.title}</DrawerHeader>

          <DrawerBody>
            {/* Customize the content of the drawer here */}
            {/* For example, you can add more details about the selected recipe */}
            {/* {recipe.description} */}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default RecipeData;

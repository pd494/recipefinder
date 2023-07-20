import React, { useState } from 'react';
import { Box, Image, Badge, Link, Flex, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons'; // Import the star icon from Chakra UI
import recipes from '../recipes.json';
import RecipeData from './RecipeData';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 



const firebaseConfig = {
  apiKey: "AIzaSyBqyDt1yN9fBKDEZSOemzMkHn8_q90y5S8",
  authDomain: "recipefinder-41321.firebaseapp.com",
  projectId: "recipefinder-41321",
  storageBucket: "recipefinder-41321.appspot.com",
  messagingSenderId: "496080720908",
  appId: "1:496080720908:web:955bb4aabe0a9898d64a29",
  measurementId: "G-DPN740FBK1"
};




function RecipeList() {
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleOpenDrawer = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedRecipe('');
    setIsDrawerOpen(false);
  };

   const handleFavorite = (recipe) => {
    if (favorites.includes(recipe)) {
      const cityRef = doc(db, 'recipes', 'favs');

      // If the recipe is already in favorites, remove it
      setFavorites(favorites.filter((fav) => fav !== recipe));
      deleteDoc(doc(db, "recipes", recipe.title));

      

      
    } 
    else {
      // If the recipe is not in favorites, add it
      const cityRef = doc(db, 'recipes', 'favs');
      setDoc(doc(db,"recipes", recipe.title), {name: recipe.title, id: recipe.id, image: recipe.image}, {merge:true});
      
      setFavorites([...favorites, recipe]);
      
    }
  };

  const isRecipeFavorite = (recipe) => {
    return favorites.includes(recipe);
  };

  const recipeCard = recipes.map((recipe) => {
    const isFavorite = isRecipeFavorite(recipe);

    return (
      <Flex key={recipe.id} flexDirection="row">
        <Link onClick={() => handleOpenDrawer(recipe)}>
          <Box maxW="sm" borderWidth="1px" bg="orange.100" borderRadius="md" overflow="hidden">
            <Image src={recipe.image} alt="recipeimage" />
            <Box p="3">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {recipe.beds} beds &bull; {recipe.baths} baths
                </Box>
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                {recipe.title}
              </Box>
              <Box>
                {recipe.formattedPrice}
                <Box as="span" color="gray.600" fontSize="sm">
                  / wk
                </Box>
              </Box>
              <Box display="flex" mt="2" alignItems="center">
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {recipe.reviewCount} reviews
                </Box>
                <IconButton
                  ml="auto"
                  aria-label="Favorite"
                  icon={<StarIcon color={isFavorite ? 'yellow.400' : 'gray.300'} />}
                  onClick={() => handleFavorite(recipe)}
                />
              </Box>
            </Box>
          </Box>
        </Link>
      </Flex>
    );
  });


  return (
    <div className='RecipeList'>
      {recipeCard}
      <RecipeData isOpen={isDrawerOpen} onClose={handleCloseDrawer} recipe={selectedRecipe} />
    </div>
  );
}

export default RecipeList;

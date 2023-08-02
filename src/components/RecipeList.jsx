import React, { useState, useEffect } from 'react';
import { Box, Image, Badge, Link, Flex, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons'; // Import the star icon from Chakra UI
import recipes from '../recipes.json';
import RecipeData from './RecipeData';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { getAuth, getMultiFactorResolver } from 'firebase/auth';
import { ings } from './Card';

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
  const APIKEY = '66f5a63a1bcc471f9bfc8702874cbdd0';
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [recipecards, setRecipecards] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('');


  useEffect(() => {
    // Inside the useEffect hook, you can safely access user.email
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.email; // Use optional chaining to prevent null pointer exceptions

    if (user) {
      setCurrentUserEmail(user.email);
    }


    // You can also perform any other side effects or initializations here

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup tasks, if needed
    };
  }, []); // The useEffect 

  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [color, setColor]  = useState('')

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
      console.log('its coming');
      setFavorites(favorites.filter((fav) => fav.title !== recipe.title));
      deleteDoc(doc(db, currentUserEmail, recipe.title));
    } else {
      console.log('hllloo');
      setDoc(doc(db, currentUserEmail, recipe.title), { name: recipe.title, id: recipe.id, image: recipe.image }, { merge: true });
      setFavorites([...favorites, recipe]);
    }
  };

  const isRecipeFavorite = async (recipe) => {
    const ref = doc(db, currentUserEmail, recipe.title);
    let docSnap;
    try {
       docSnap = await getDoc(ref);
        return docSnap.exists()      
    } catch (error) {
      return false;
    }
  

  }

  const getColor = (recipe) => {
    console.log('its inside')

    return isRecipeFavorite(recipe)
      .then((x) => {
        console.log(x)
        return x
      })
      .catch((error) => {
        console.log(error)

        // Handle potential errors here
      });
  };
  
  





  useEffect(() => {
    const ingAPI = ings.map((ingredient, index) => {
      if (index === 0) {
        return ingredient + ',';
      } else {
        return '+' + ingredient + ',';
      }
    }).join('');

    var apistring = '';
    const lastCommaIndex = ingAPI.lastIndexOf(',');
    if (lastCommaIndex !== -1) {
      apistring = ingAPI.slice(0, lastCommaIndex) + ingAPI.slice(lastCommaIndex + 1);
    }


    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${apistring}&apiKey=${APIKEY}`
    )
      .then((response) => response.json())
      .then( async (json) => {
        
        const favoritePromises = json.map((recipe) => isRecipeFavorite(recipe));
        const favoritesResults = await Promise.all(favoritePromises);

        // Map the fetched recipes to JSX elements and update the recipecards state
        const mappedRecipes = json.map((recipe, index) => (



            <Link onClick={() => handleOpenDrawer(recipe)}>

              <Box className = "boxes" maxW="sm"  borderWidth="1px" bg="orange.100" borderRadius="md" overflow="hidden">
                <Image src={recipe.image} alt="recipeimage" />
                <Box p="3">
                  <Box>
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
                    <Box as="span" color="gray.600" fontSize="sm">
                      / wk
                    </Box>
                  </Box>
                  <Box  mt="2" >
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {recipe.reviewCount} reviews
                    </Box>
                    <IconButton
                  ml="auto"
                  aria-label="Favorite"
                  icon={<StarIcon color={favoritesResults[index] ? 'yellow.400' : 'gray.400'} />}
                  onClick={() => handleFavorite(recipe) }
                />                  </Box>
                </Box>
              </Box>

            </Link>
        ));
        setRecipecards(mappedRecipes);
      })
      .catch((error) => console.error(error));


  }, []);



  return (
    <div className="RecipeList" >
      {recipecards}
      <RecipeData isOpen={isDrawerOpen} onClose={handleCloseDrawer} recipe={selectedRecipe} />
    </div>
  );
}

export default RecipeList;

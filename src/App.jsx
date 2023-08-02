import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Spacer, Button, Avatar, Link, Text, Stack, HStack, useColorModeValue} from '@chakra-ui/react';
import { Divider, Center } from '@chakra-ui/react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Submit from './components/Submit';
import Registration from './components/Registration';
import Login from './components/Login';
import { getAuth, onAuthStateChanged,  } from "firebase/auth";
import Favorites from './components/Favorites'
import {ings} from './components/Card'


let user2  = null;

const HomePage = () => {
  const [butClicked, setButClicked] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const [submitted, setSubmitted] = useState(false)

  // Initialize Firebase
  // ...

  // Get Firebase Auth instance
  const auth = getAuth();

  useEffect(() => { // Add useEffect to listen for auth state changes
    // Check if the user is already logged in (e.g., through persisted session or token)
    // onAuthStateChanged will listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user); // Store the user data in state
      } else {
        // User is signed out or not logged in
        setUser(null); // Clear the user data from state
      }
    });

    // Unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  // ...

  return (

    <div>
    <Navbar className = 'nav' user = {user} />

    <div className="container">


      <div id="left" className="left">

        <h1 style={{ fontSize: "4.5rem" }}>Recipe Finder</h1>
        <h2>Find a recipe with ingredients you have</h2>
        <SearchBar setSubmitted = {setSubmitted} className="search" />
        <h1>Added Ingredients: </h1>
        <div id="Ingredients" className="Ingredients"></div>
      
      </div>
      
      <Center orientation="vertical">
        <Divider className="line" variant="dashed" orientation="vertical" borderColor="blue" />
      </Center>
      
      <div className = "right" id="right">
         {submitted && <RecipeList/>}
      </div>

    </div>
    </div>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/favorites" 
          element={<Favorites />} />

          {/* Other routes */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}


export function Navbar({user}) {

  const navigate = useNavigate();

  const favoritesClick = () => {
    navigate('/favorites');
  }



    return (
      <Box  bgGradient="linear(to-r, green.500, green.300, green.100)"
    >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>🍳 RecipeFinder</Box> 
          </HStack>
  
          <Flex alignItems={'center'}>
            <HStack spacing={8} alignItems={'center'}>
              <Button onClick = {favoritesClick} variant="ghost">Favorites</Button>
              <Button variant="ghost">Contact</Button> 
              {user && (
                <HStack spacing={3}>
                  <Avatar name={user.email} size="sm" />
                  <Box>{user.email}</Box>  
                </HStack>
              )}
            </HStack>
          </Flex>
        </Flex>
      </Box>
    );
  }
  



export default App;

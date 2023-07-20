import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Spacer, Button, Avatar } from '@chakra-ui/react';
import { Divider, Center } from '@chakra-ui/react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Submit from './components/Submit';
import Registration from './components/Registration';

const HomePage = () =>
{
  const [butClicked, setButClicked] = useState(false);

  return (

        <div className="container">
              <Navbar />


        <div id="left" className="left">
          <h1 style={{ fontSize: "4.5rem" }}>Recipe Finder</h1>
          <h2>Find a recipe with ingredients you have</h2>
          <SearchBar className="search" />
          <h1>Added Ingredients: </h1>
          <div id="Ingredients" className="Ingredients"></div>
      
          <Submit setButClicked={setButClicked} />
        </div>
      
        <Center orientation="vertical">
          <Divider className="line" variant="dashed" orientation="vertical" borderColor="blue" />
        </Center>
      
        <div className="right">
          {butClicked && <RecipeList className="recipelist" />}
        </div>
      </div>
  )
 


}


function App() {

  return (
    <ChakraProvider>
      <Router> {/* Wrap the entire app with Router */}
      <Routes>
       <Route exact path="/" element={<HomePage/>}/>

          <Route path="/register" element={<Registration />} />

        </Routes>

       
      </Router>
    </ChakraProvider>
  );
}


const Navbar = ({ onSignInClick }) => {
  const navigate = useNavigate(); // Move this line inside the Navbar component

  const handleSignInClick = () => {
    navigate('/register'); // Redirect to the sign-up page
  };

  return (
    <Box bg="gray.100" p={6}>
      <Flex alignItems="center" flexDirection="column">
        <Box>
          {/* Logo or Branding */}
          <h1>Recipe Finder</h1>
        </Box>

        <Spacer />

        <Box>
          {/* Sign-in/Sign-out Button */}
          <Button variant="outline" colorScheme="teal" onClick={handleSignInClick}>
            Sign Up
          </Button>
        </Box>

        <Box ml={3}>
          {/* Avatar Icon */}
          <Avatar name="User" size="md" />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;

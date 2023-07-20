import React, { useState } from 'react';
import { Container, Heading, Input, Stack, Button, FormControl, FormLabel, Box } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyBqyDt1yN9fBKDEZSOemzMkHn8_q90y5S8",
  authDomain: "recipefinder-41321.firebaseapp.com",
  projectId: "recipefinder-41321",
  storageBucket: "recipefinder-41321.appspot.com",
  messagingSenderId: "496080720908",
  appId: "1:496080720908:web:955bb4aabe0a9898d64a29",
  measurementId: "G-DPN740FBK1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Clear previous error messages
      setErrorMessage('');

      await createUserWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container maxW="md" centerContent py={8}>
      <Heading mb={6}>Register</Heading>
      <Box bg="white" p={8} borderRadius="md" boxShadow="md">
        <form onSubmit={handleRegistration}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Register
            </Button>
            {errorMessage && <Box color="red.500" textAlign="center">{errorMessage}</Box>}
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default Registration;

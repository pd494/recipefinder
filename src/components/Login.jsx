
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import App from '../App'


import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import {signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook





function Login() {
  const navigate = useNavigate(); // Get the navigate function

    const firebaseConfig = {
        apiKey: "AIzaSyBqyDt1yN9fBKDEZSOemzMkHn8_q90y5S8",
        authDomain: "recipefinder-41321.firebaseapp.com",
        projectId: "recipefinder-41321",
        storageBucket: "recipefinder-41321.appspot.com",
        messagingSenderId: "496080720908",
        appId: "1:496080720908:web:955bb4aabe0a9898d64a29",
        measurementId: "G-DPN740FBK1"
      };
      
      
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // const db = firebase.firestore();
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Use Firebase Auth API to sign in the user
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("helllo")
      navigate("/")
      // Signed in 
      const user = userCredential.user;
      setEmail(user.email)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  };

  return (
    <Box>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;


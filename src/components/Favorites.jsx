import {
    Box,
    Heading, 
    Text,
    Image,
    Button,
    Wrap,
    WrapItem  
  } from '@chakra-ui/react';
  import { getAuth, onAuthStateChanged} from 'firebase/auth';
  import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { useEffect, useState} from 'react';
    import { collection, getDocs } from "firebase/firestore";

    
import Navbar from '../App'

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

  
  
  function Favorites() {

    const auth = getAuth();
    const [user, setUser] = useState(null); // State to store user data
    const [email, setEmail] = useState('')
    const [elements, setElements] = useState([]) 
    const db = getFirestore(app);

  
    useEffect(() => { // Add useEffect to listen for auth state changes
        // Check if the user is already logged in (e.g., through persisted session or token)
        // onAuthStateChanged will listen for changes in the authentication state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            setUser(user); // Store the user data in state

            setEmail(user.email)



          } else {
            // User is signed out or not logged in
            setUser(null); // Clear the user data from state
          }
        });
    
        // Unsubscribe from the auth state listener when the component unmounts
        return () => unsubscribe();
      }, [auth]);
    
    
      useEffect(() => {
        const fetchFavorites = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, email)); // Await the query to get the snapshot
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              const favorite = doc.data();
  
                const element = (
                    <WrapItem key={favorite.id}>
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                    >
                      <Image src={favorite.image} alt={favorite.name} />
                      <Box p={4}>
                        <Heading as="h3" size="md" mb={2}>
                          {favorite.title}
                        </Heading>
                        <Text>{favorite.name}</Text>
                      </Box>
                    </Box>
                  </WrapItem>
                );

  setElements(prev => [...prev, element]);


            });
          } catch (error) {
            console.error("Error fetching favorites:", error);
          }
        };
    
        fetchFavorites();
      }, [email, db]);


      console.log(elements)
    
    return (
    

        <div>
            <h1>Favorites</h1>
            {elements}
        </div>
    )
  }
  
  export default Favorites;
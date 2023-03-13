import { NavigationContainer } from '@react-navigation/native';
import Ionic from 'react-native-vector-icons'

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import auth from '@react-native-firebase/auth';
import AuthStack from '../navigation/AuthStack'
import AppStack from '../navigation/AppStack'


const App = () => {

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  if (initializing) return null;

  return(
      <NavigationContainer>
          { user ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  );
};

export default App;





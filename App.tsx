import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Login from './app/screens/Login';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserProvider } from './app/context/UserContext';
import Register from './app/screens/Register';

const Stack = createNativeStackNavigator();
const auth = getAuth();

export default function App() {
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if(user) {
      const uid = user.uid;
    } else {
      console.log("sem usuario")
    }
  });
  return () => unsubscribe();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Minhas Tarefas" component={List} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
    
  );
}


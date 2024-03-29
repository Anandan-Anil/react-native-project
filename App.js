import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './Components/Register';
import Login from './Components/Login';
// import post from './Components/post';
// import Post from './Components/post';  
import Poste from './Components/Poste';
import Profile from './Components/Profile';
import Content from './Components/Content';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='reg' component={Register}></Stack.Screen>
      <Stack.Screen name="login" component={Login}></Stack.Screen>
      <Stack.Screen name="post" component={Poste}></Stack.Screen>
      <Stack.Screen name="profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Content" component={Content}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

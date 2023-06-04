// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Pages/Login/LoginScreen';
import HomePage from './Pages/Login/HomePage';
import Account from './Pages/Login/Account';
import Info from './Pages/Info';
import Mypred from './Pages/Mypred';
import ML from './Pages/ML';
import Splach from './Pages/Splach';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Splach" component={Splach} />
      <Stack.Screen  options={{headerShown:false}}name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="HomePage" component={HomePage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="Account" component={Account} />
        <Stack.Screen options={{headerShown:false}} name="Info" component={Info} />
        <Stack.Screen options={{headerShown:false}} name="Mypred" component={Mypred} />
        <Stack.Screen options={{headerShown:false}} name="ML" component={ML} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
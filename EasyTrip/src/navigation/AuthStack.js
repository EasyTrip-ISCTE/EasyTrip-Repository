import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PaginaInicial from '../screens/PaginaInicial';
import Login from '../screens/Login';
import Registar from '../screens/Registar';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
       <Stack.Navigator initialRouteName='PaginaInicial'>
            <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
            <Stack.Screen name="Registar" component={Registar} options={{headerStyle:{backgroundColor:'#ffb319'}}}/>
       </Stack.Navigator> 
    );
}

export default AuthStack;
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home'
import { FC } from 'react';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();

const Index:FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'

                screenOptions={{ headerShown: true }}
            >

            <Stack.Screen name="Dictionary" component={Home} />
            <Stack.Screen name="Details" component={Details} />


            </Stack.Navigator>

        </NavigationContainer>
    )
}
export default Index;

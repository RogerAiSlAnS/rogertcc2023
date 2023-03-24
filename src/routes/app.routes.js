import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import Perfil from '../pages/Perfil';
import Perguntas from '../pages/Perguntas';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          backgroundColor: '#202225',
          borderTopWidth: 0,
        },
        activeTintColor: '#FFF',
      }}>
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Feather name="user" color={color} size={size} />;
          },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Perguntas"
        component={Perguntas}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Feather name="list" color={color} size={size} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;

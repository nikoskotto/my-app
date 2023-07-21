import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './context/AuthProvider';
import LoginScreen from './Auth/LoginScreen';
import RegisterScreen from './Auth/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LineaScreen from './screens/LineaScreen';
import Settings from './screens/Settings';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './style/styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
 
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="register" component={RegisterScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} >
        	<Tab.Screen name="Linea" component={LineaScreen} />
        </Tab.Navigator>
    )
}

export default function Root() {
	const { user } = useContext(AuthContext);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if(isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
    return (
      <NavigationContainer>
        {user ? (
            <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        ) : (
            <AuthStackNavigator />
        )}
      </NavigationContainer>
    )
  }


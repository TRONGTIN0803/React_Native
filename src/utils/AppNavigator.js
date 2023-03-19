import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppConText } from './AppConText';
import Profile from '../components/ASM/Profile';
import Login from '../components/ASM/Login';
import DetailScreen from '../components/ASM/DetailScreen';
import Screen2 from '../components/ASM/Screen2';
import HomePage from '../components/ASM/HomePage';
import CreateNews from '../components/ASM/CreateNews';
import MyNews from '../components/ASM/MyNews';



const News = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name='ListNews' component={HomePage} options={{headerShown:false}}/>
      <Stack.Screen name='Detail' component={DetailScreen} options={{headerShown:false}}/>
      <Stack.Screen name='CreateNews' component={CreateNews} options={{headerShown:false}}/>
    </Stack.Navigator>
  )

}



//quan ly list news,deatil,profile...=>tab
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return <Image source={require('../components/ASM/images/homebar.png')} />
        }
        else if (route.name === 'Explore') {
          return <Image source={require('../components/ASM/images/Explore.png')} />
        }
        else if (route.name === 'Bookmark') {
          return <Image source={require('../components/ASM/images/Bookmark.png')} />
        }
        else if (route.name === 'Profile') {
          return <Image source={require('../components/ASM/images/Profile.png')} />
        }

      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>

      <Tab.Screen name="Home" component={News} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmark" component={Screen2} options={{ headerShown: false }} />
      <Tab.Screen name="Explore" component={MyNews} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>

    
  )
}


//Quan ly login, register=>stack
const Stack = createNativeStackNavigator();
const Users = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      {/* <Stack.Screen
          name="HomeP"
          component={HomeP}
          options={{ headerShown: false }}
        /> */}
      {/* <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  const { isLogin } = useContext(AppConText);
  
  return (
    <>
      {
        isLogin == false ? <Users /> : <Main />      
      }
      
    </>
  )
}

export default AppNavigator
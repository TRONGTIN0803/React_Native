import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppNavigator from './src/utils/AppNavigator';
import { AppConTextProvider } from './src/utils/AppConText';
import PickerPicture from './src/components/ASM/PickerPicture';
import * as ImagePicker from 'react-native-image-picker';
import CreateNews from './src/components/ASM/CreateNews';
import Screen2 from './src/components/ASM/Screen2';





const TabView = createMaterialTopTabNavigator();

const App = () => {
  const [pickerResponse, setpickerResponse] = useState(null)
  const [visible, setvisible] = useState(false)

  const chosse = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    // launchImageLibrary(options, setpickerResponse);
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else {
        let source = response.assets[0].uri;
        setpickerResponse(source)
      }
    });
  };


  console.log(pickerResponse)
  return (
    <View style={{ flex: 1 }}>

      <AppConTextProvider>
        <NavigationContainer>
          <AppNavigator/>
        </NavigationContainer>     
      </AppConTextProvider>
      
        
      


    </View>

  )
}

// function HomeP(){
//   return (
//     <Tab.Navigator
//           screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//               if(route.name==='Home'){
//                 return <Image  source={require('./src/components/Lab4/images/homebar.png')}/>
//               }
//               else if(route.name==='Explore'){
//                 return <Image  source={require('./src/components/Lab4/images/Explore.png')}/>
//               }
//               else if(route.name==='Bookmark'){
//                 return <Image  source={require('./src/components/Lab4/images/Bookmark.png')}/>
//               }
//               else if(route.name==='Profile'){
//                 return <Image  source={require('./src/components/Lab4/images/Profile.png')}/>
//               }

//             },
//             tabBarActiveTintColor: 'tomato',
//             tabBarInactiveTintColor: 'gray',
//           })}
//         >
//           <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
//           <Tab.Screen name="Explore" component={DetailScreen} options={{ headerShown: false }} />
//           <Tab.Screen name="Bookmark" component={Screen2} options={{ headerShown: false }}/>
//           <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
//         </Tab.Navigator>


//   );
// }


{/* {pickerResponse==null ? null : (<Image style={{flex: 0.5,
    width: '100%',
    height: 50,
    resizeMode: 'contain',alignItems:'center',justifyContent:'center'}} source={{uri:pickerResponse}}/>)}
     
          <TouchableOpacity onPress={()=>chosse()}>
            <Text>Click</Text>
          </TouchableOpacity> */}

export default App




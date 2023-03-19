import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Screen2 = (props) => {
    const {navigation, route}=props;
    // const {params}=route;

    const Clickne=()=>{
        navigation.navigate('Screen1')
    }
  return (
    <View>
      <Text>Screen2</Text>
      {/* <Text>{params.name}</Text>
      <Text>{params.age}</Text> */}
      <Pressable onPress={Clickne}>
        <Text>Chuyen toi sreen 1</Text>
      </Pressable>
    </View>
  )
}

export default Screen2

const styles = StyleSheet.create({})
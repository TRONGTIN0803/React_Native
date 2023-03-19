import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Screen1 = (props) => {
    const {navigation}=props;
    const Clickne=()=>{
        navigation.navigate('Screen2',{name:'Pham Trong Tin',age:20})
    }
  return (
    <View>
      <Text>Screen1</Text>
      <Pressable onPress={Clickne}>
        <Text>Chuyen toi mman hinh 2</Text>
      </Pressable>
    </View>
  )
}

export default Screen1

const styles = StyleSheet.create({})
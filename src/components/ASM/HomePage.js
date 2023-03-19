import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from 'react-native';

import Data from './Data';
import List from './List';
import { FloatingAction } from "react-native-floating-action";
import AxiosIntance from '../ASM/AxiosIntance';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from './Profile';
import { TextInput } from 'react-native-gesture-handler';


const Tab = createMaterialTopTabNavigator();

const datalist = Data;
const Item = ({ props }) => (



  <View >
    <List style={styles.item} item={props}></List>
  </View>

);

const getNews = async () => {
  const result = await AxiosIntance().get('/articles');
  return result;
}



const App = (props) => {
  const [news, setNews] = useState([]);
  const { navigation } = props;
  const [isLoading, setisLoading] = useState(true)
  const [isreload, setisreload] = useState(false)
  const [isShowSearch, setisShowSearch] = useState(false)
  const [search, setsearch] = useState('')

  const DeleteNews = async (props) => {
    const reponse = await AxiosIntance().delete('/articles/' + props + '/delete')
    if (reponse.error == false) {
      ToastAndroid.show('Xoa thanh cong!', ToastAndroid.SHORT)
      setisreload(!isreload)
      setisLoading(true)
    } else {
      ToastAndroid.show('Xoa that bai!', ToastAndroid.SHORT)
    }

  }

  const createThreeButtonAlert = (props) =>
    Alert.alert('Options News', 'My Alert Msg', [

      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => { DeleteNews(props) },

      },

      {
        text: 'Update',
        onPress: () => { navigation.navigate('CreateNews', { id: props }) }
      },


    ]);

  const ListNews = () => {
    return (
      <>
        {isLoading == false ?
          (<FlatList
            //mang tu API    
            showsVerticalScrollIndicator={false}
            data={news}
            renderItem={({ item }) => (

              <TouchableOpacity onLongPress={() => { createThreeButtonAlert(item._id) }} onPress={() => {

                navigation.navigate('Detail', { id: item._id })
                // console.log(item._id, content: item.content, image: item.image)
              }}>

                <Item props={item} ></Item>

              </TouchableOpacity>


            )}
            keyExtractor={item => item._id}
          />) : <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>Dang loading ne...</Text>
            <ActivityIndicator />
          </View>}
      </>

    )
  }
  const Life = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          haha conga
        </Text>
      </View>
    )

  }

  const SearchNews = async () => {
    setisLoading(true)
    setisShowSearch(false)
    //console.log(search)
    const reponse = await AxiosIntance().get('/articles/search?title='+search)
    if(reponse.error==false){
      setNews(reponse.data);
      setisLoading(false);

    }else{
      ToastAndroid.show("Search ko thanh cong!",ToastAndroid.SHORT)
      console.log(reponse.error)
    }
  }

  useEffect(() => {
    setisLoading(true)
    const loaddata = async () => {
      const res = await getNews();
      //console.log(res.error)
      if (res.error == false)
        //console.log(typeof (res.data))
        setNews(res.data);
      setisLoading(false);
      return () => { }
    };
    loaddata();
    // fetch('https://63e37bf865ae4931770febbf.mockapi.io/user')
    // .then(res=>res.json())
    // .then(news=>{setNews(news);
    // })

  }, [isreload]);
  return (

    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor='white'></StatusBar>
      <View style={styles.top}>
        <TouchableOpacity onPress={()=>{setisreload(!isreload) }}>
          <Image source={require('../ASM/images/home.png')} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { setisShowSearch(true) }}>
            {isShowSearch == false ? (<Image style={{ marginRight: 20 }} source={require('./images/search.png')} />) : null}
          </TouchableOpacity>


          <Image source={require('../ASM/images/notifi.png')} />
        </View>

      </View>
      <>
        {isShowSearch == true ? (<View style={styles.search}>
          <TouchableOpacity onPress={SearchNews} style={{ marginRight: 10, flex: 0.6 }}>
            <Image source={require('./images/search.png')} />
          </TouchableOpacity>

          <TextInput style={styles.inputsearch} onChangeText={setsearch} />
        </View>) : null}
      </>


      <View style={styles.top2}>
        <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>Latest</Text>
        <Text>See all</Text>
      </View>


      <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 10 },
        tabBarItemStyle: { width: 80, height: 40 },
        tabBarStyle: { backgroundColor: '#E5E5E5' },
        tabBarScrollEnabled: true,

      }}>
        <Tab.Screen name="All" component={ListNews} />
        <Tab.Screen name="Sports" component={Life} />
        <Tab.Screen name="Politics" component={Life} />
        <Tab.Screen name="Bussiness" component={Life} />
        <Tab.Screen name="Health" component={Life} />
        <Tab.Screen name="Travel" component={Life} />
        <Tab.Screen name="Science" component={Life} />

      </Tab.Navigator>
      {/* <View style={styles.top2}>   
          

        <Text style={{ color: '#000000' }}>All</Text>
        <Text>Sport</Text>
        <Text>Pollitics</Text>
        <Text>Bussiness</Text>
        <Text>Health</Text>
        <Text>Travel</Text>
        <Text>Science</Text>
      </View> */}
      {/* <Text style={styles.line}>---</Text> */}
      {/* {isLoading == false ?
        (<FlatList
          //mang tu API    
          showsVerticalScrollIndicator={false}
          data={news}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              navigation.navigate('Detail', { id: item._id })
              // console.log(item._id, content: item.content, image: item.image)
            }}>

              <Item props={item} ></Item>

            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        />) : <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text>Dang loading ne...</Text>
          <ActivityIndicator />
        </View>} */}

      <TouchableOpacity style={styles.floating} onPress={() => { navigation.navigate('CreateNews') }}>
        <View >

          <Text style={styles.floatingbtn}>+</Text>
        </View>
      </TouchableOpacity>




    </SafeAreaView>


  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 12,
    position: 'relative'

  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  top2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8
  },
  bottomitem: {
    alignItems: 'center'
  },

  line: {
    color: '#1877F2',
    marginBottom: 10
  },
  floating: {
    flex: 1,
    position: 'absolute',
    padding: 10,

    alignItems: 'center',
    marginTop: 500,
    marginLeft: 270
  },
  floatingbtn: {
    borderRadius: 50,
    backgroundColor: '#1877F2',
    width: 60,
    height: 60,
    color: '#FFFF',

    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 3,
    fontSize: 36
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputsearch: {
    backgroundColor: '#CCCCCC',
    flex: 8,
    borderRadius: 20,
    padding: 10,
    fontSize: 16
  }
});

export default App;
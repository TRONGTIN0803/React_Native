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
import List from './List';
import AxiosIntance from '../ASM/AxiosIntance';

const getNews = async () => {
    const result = await AxiosIntance().get('/articles/my-articles');
    return result;
}
const Item = ({ props }) => (
    <View >
        <List style={styles.item} item={props}></List>
    </View>
);


const MyNews = (props) => {
    const [news, setNews] = useState([]);
    const { navigation } = props;
    const [isLoading, setisLoading] = useState(true)
    const [isreload, setisreload] = useState(false)
    const [isShowSearch, setisShowSearch] = useState(false)
    const [search, setsearch] = useState('')

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

    }, [isreload]);

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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor='white'></StatusBar>
            <View style={styles.top}>
                <TouchableOpacity >
                    <Image source={require('../ASM/images/home.png')} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../ASM/images/notifi.png')} />
                </View>

            </View>
            <View style={{alignItems:'center'}}>
                <Text style={{fontSize:26,color:'black',fontWeight:'bold'}}>Bài Viết Cá Nhân</Text>
            </View>
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
        </SafeAreaView>
    )
}


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

export default MyNews
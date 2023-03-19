import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'react-native-image-picker';
import AxiosIntance from '../ASM/AxiosIntance';

const CreateNews = (props) => {
    const { navigation, route } = props;
    const [pickerResponse, setpickerResponse] = useState('https://static-images.vnncdn.net/files/publish/2023/2/1/bai-bai-32-1149.jpg');
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');
    const [image, setimage] = useState('');
    const { params } = route;
    //const [isLoading, setisLoading] = useState(false)

    //console.log(image)
    if (params != undefined) {

        useEffect(() => {
            const chitiet = async () => {
                const res = await AxiosIntance().get('/articles/' + params.id + '/detail');
                if (res.error == false)
                    //console.log(typeof (res.data))
                    //setNews(res.data);
                    setimage(res.data[0].image)
                settitle(res.data[0].title)
                setcontent(res.data[0].content)
                return () => { }
            };

            chitiet();

            return () => {

            }
        }, [])
    }

    const ChossePicture = async () => {
        const picture = await ImagePicker.launchImageLibrary();

        setpickerResponse(picture.assets[0].uri)
        setimage(picture.assets[0].uri)
        //console.log('click')
        //console.log(picture.assets[0].uri)


    }

    const PostNews = async () => {
        const reponse = await AxiosIntance().post('/articles', {
            title: title,
            content: content,
            image: image,
        })
        if (reponse.error == false) {
            ToastAndroid.show('Dang tin thanh cong!', ToastAndroid.SHORT)

        } else {
            ToastAndroid.show('Dang tin that bai!', ToastAndroid.SHORT)
        }

    }

    const UpLoad = async () => {
        console.log(pickerResponse)
        const formdata = new FormData();
        formdata.append('image', {
            uri: pickerResponse,
            type: 'image/jpeg',
            name: 'tinne.jpeg',
        });
        const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
        //console.log(response.data.path)
        setimage(response.data.path)
        if (response.error == false) {
            ToastAndroid.show('Upload thanh cong!', ToastAndroid.SHORT)
           
        } else {
            ToastAndroid.show('Upload that bai!', ToastAndroid.SHORT)
        }
    }

    const UpdateNews =async()=>{
        const reponse = await AxiosIntance().put('/articles/'+params.id+'/update', {
            title: title,
            content: content,
            image: image,
        })
        if (reponse.error == false) {
            ToastAndroid.show('Update thanh cong!', ToastAndroid.SHORT)
            navigation.navigate('ListNews')
        } else {
            ToastAndroid.show('Update that bai!', ToastAndroid.SHORT)
        }
    }


    return (


        <View style={styles.container}>

            <View style={styles.head}>
                <TouchableOpacity onPress={() => { navigation.goBack(null) }}>
                    <Image source={require('../ASM/images/arrow.png')} />
                </TouchableOpacity>

                <Text style={{ color: 'black' }}>Create News</Text>
                <Image source={require('../ASM/images/mutil.png')} />
            </View>

            {image == '' ?
                (
                    <TouchableOpacity onPress={ChossePicture}>
                       <Image style={styles.imgcamera} source={{ uri: pickerResponse }} />

                    </TouchableOpacity>



                ) :
                (
                    <TouchableOpacity onPress={ChossePicture}>
                        <Image style={styles.imgcamera} source={{ uri: image }} />
                        
                    </TouchableOpacity>
                )}





            <>
                {title == null ?
                    (<TextInput style={styles.createtitle} placeholder='News title' onChangeText={(value) => { settitle(value) }} />) :
                    (
                        <TextInput style={styles.createtitle} placeholder='News title' onChangeText={(value) => { settitle(value) }}>{title}</TextInput>
                    )}
            </>


            <View style={styles.content}>

                <View style={styles.createcontent}>
                    <>
                        {content == null ?
                            (<TextInput placeholder='Content News/Article' onChangeText={(value) => { setcontent(value) }} />) :
                            (
                                <TextInput placeholder='Content News/Article' onChangeText={(value) => { setcontent(value) }}>{content}</TextInput>
                            )}
                    </>

                </View>



                <View style={styles.bottom}>
                    <View style={styles.bottomchild}>
                        <TouchableOpacity onPress={UpLoad}>
                            <Image source={require('./images/A.png')} />
                        </TouchableOpacity>

                        <Image source={require('./images/left.png')} />
                        <Image source={require('./images/img.png')} />
                        <Image source={require('./images/vv.png')} />
                    </View>
                {params!=undefined? 
                (
                    <TouchableOpacity onPress={UpdateNews} style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flex: 3 }} />
                        
                        <Text style={{ flex: 1, backgroundColor: '#1877F2', padding: 8, borderRadius: 6, color: 'white' }}>Publish</Text>
                    </TouchableOpacity>
                ):
                (
                    <TouchableOpacity onPress={PostNews} style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flex: 3 }} />
                        
                        <Text style={{ flex: 1, backgroundColor: '#1877F2', padding: 8, borderRadius: 6, color: 'white' }}>Publish</Text>
                    </TouchableOpacity>
                )}
                    
                </View>
            </View>



        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    hinhanh: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: '#EEF1F4',
        marginTop: 16
    },
    createtitle: {
        padding: 8,
        backgroundColor: '#EEF1F4',
        marginTop: 16

    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    bottomchild: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,

    },
    bottomchild1: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
        marginTop: 8,
        marginBottom: 16
    },
    content: {
        flex: 1
    },
    createcontent: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    imgcamera: {
        height: 200,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
export default CreateNews
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosIntance from './AxiosIntance';
import * as ImagePicker from 'react-native-image-picker';
import { AppConText } from '../../utils/AppConText';

const Profile = (props) => {
    const [name, setname] = useState('')
    const [img, setimg] = useState('')
    const [address, setaddress] = useState('')
    const [numberphone, setnumberphone] = useState('')
    const [dob, setdob] = useState('2000-08-20')
    const [ChosseIMG, setChosseIMG] = useState('')
    const [isReload, setisReload] = useState(false)
    const [Email, setEmail] = useState('')
    const { navigation } = props
    const { setisLogin } = useContext(AppConText);
    const [isShowChangePass, setisShowChangePass] = useState(false)
    const [newPass, setnewPass] = useState('')

    useEffect(() => {
        const loaddata = async () => {
            const emailogin = await AsyncStorage.getItem('email')
            setEmail(emailogin)
            const passwordlogin = await AsyncStorage.getItem('pass')
            try {
                const dn = await AxiosIntance().post('/auth/login', {
                    email: emailogin,
                    password: passwordlogin
                });
                if (dn.error == false) {
                    //await AsyncStorage.setItem('token',dn.data.token);              
                    //console.log("profile thanh cong");     
                    setname(dn.data.user.name)
                    setChosseIMG(dn.data.user.avatar)
                    setimg(dn.data.user.avatar)
                    setaddress(dn.data.user.address)
                    setnumberphone(dn.data.user.phone)
                } else {
                    alert('that bai')
                }
            } catch (e) {
                console.log(email);
                console.log(password);
                console.log("error");

            }
            return () => { }
        };
        loaddata();
    }, [isReload])

    const UpLoad = async () => {
        //console.log(pickerResponse)
        const formdata = new FormData();
        formdata.append('image', {
            uri: ChosseIMG,
            type: 'image/jpeg',
            name: 'tinne.jpeg',
        });
        const response = await AxiosIntance("multipart/form-data").post('/media/upload', formdata);
        //console.log(response.data.path)
        setimg(response.data.path)
        if (response.error == false) {
            ToastAndroid.show('Da xac nhan anh', ToastAndroid.SHORT)

        } else {
            ToastAndroid.show('That bai!', ToastAndroid.SHORT)
        }
    }

    const ChossePicture = async () => {
        const picture = await ImagePicker.launchImageLibrary();

        setChosseIMG(picture.assets[0].uri)
        //console.log(picture.assets[0].uri)


    }

    const UpdateProfile = async () => {
        try {
            const response = await AxiosIntance().post('/users/update-profile', {
                name: name,
                address: address,
                phone: numberphone,
                avatar: img,
                dob: dob,
            });
            if (response.error == false) {
                ToastAndroid.show('Cap Nhat Thanh Cong', ToastAndroid.SHORT)
                setisReload(!isReload)
            } else {
                ToastAndroid.show('Cap Nhat That Bai', ToastAndroid.SHORT)
            }
        } catch (e) {
            console.log("error");
        }

    }
    const createTwoButtonAlert = () =>
        Alert.alert('Dang Xuat', 'Ban co chac muon dang xuat?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: DangXuat },
        ]);

    const DangXuat = async () => {
        const response = await AxiosIntance().get('/auth/logout')
        if (response.error == false) {
            setisLogin(false)
            ToastAndroid.show('Dang xuat thanh cong!', ToastAndroid.SHORT)
        } else {
            ToastAndroid.show('Dang xuat that bai!', ToastAndroid.SHORT)
        }
    }
    const DoiMatKhau = async() => {
        const response=await AxiosIntance().post('/users/change-password',{
            password: newPass
        })
        if(response.error==false){
            ToastAndroid.show('Doi thanh cong', ToastAndroid.SHORT)
            setisShowChangePass(false)
        }else{
            ToastAndroid.show('DOi that bai', ToastAndroid.SHORT)
        }
        //console.log(newPass)

    }
    //console.log(ChosseIMG)

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >

            <View style={styles.content}>
                <View style={styles.head}>
                    <View style={styles.headd}>
                        <TouchableOpacity onPress={createTwoButtonAlert}>
                            <Image source={require('./images/logout.png')} />
                        </TouchableOpacity>
                        <View style={styles.arrow}>
                            <Text style={styles.txt}>Your Profile</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{setisShowChangePass(!isShowChangePass)}}>
                            <Image source={require('./images/password.png')} />
                        </TouchableOpacity>
                    </View>
                    <>
                        {isShowChangePass == true ?
                            (
                               
                                    <View style={{flexDirection: 'row',alignItems: 'center',
                                    justifyContent: 'center',marginTop:10}}>
                                        <TextInput style={styles.inputchange} onChangeText={(value)=>setnewPass(value)} placeholder='Nhap mat khau moi' />
                                        <TouchableOpacity style={styles.txtchange} onPress={DoiMatKhau} >
                                            <Text style={{fontSize:22}}>Ok</Text>
                                        </TouchableOpacity>
                                    </View>

                               
                            ) : null}
                    </>

                    <>
                        {ChosseIMG == '' ?
                            (
                                <TouchableOpacity onPress={ChossePicture} style={styles.hinh} >
                                    <Image style={{ width: 150, height: 150, borderRadius: 100 }} source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }} />
                                </TouchableOpacity>
                            ) :

                            (
                                <TouchableOpacity style={styles.hinh} onPress={ChossePicture}>
                                    <Image style={{ width: 150, height: 150, borderRadius: 100 }} source={{ uri: ChosseIMG }} />
                                </TouchableOpacity>

                            )}
                    </>



                    <TouchableOpacity onPress={UpLoad} style={{ backgroundColor: '#FFFFCC', marginTop: 10, padding: 5, borderRadius: 10 }}>
                        <View>
                            <Text style={{ color: 'red' }}>Xac nhan avatar</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.username}>
                    <View style={styles.label}>
                        <Text>Email Address</Text>
                        {/* <Text style={styles.icon}>*</Text> */}
                    </View>
                    <TextInput editable={false} style={styles.input} >{Email}</TextInput>
                    <View style={styles.label}>
                        <Text>Full Name</Text>
                        {/* <Text style={styles.icon}>*</Text> */}
                    </View>
                    <TextInput style={styles.input} placeholder='Willson Franci' onChangeText={text => setname(text)}>{name}</TextInput>
                    <View style={styles.label}>
                        <Text>Address</Text>
                        <Text style={styles.icon}>*</Text>
                    </View>
                    <TextInput style={styles.input} placeholder='Quan 12' onChangeText={text => setaddress(text)}>{address}</TextInput>
                    <View style={styles.label}>
                        <Text>Phone Number</Text>
                        <Text style={styles.icon}>*</Text>
                    </View>
                    <TextInput style={styles.input} placeholder='+86-987-654-321' onChangeText={text => setnumberphone(text)}>{numberphone}</TextInput>
                </View>
            </View>
            <TouchableOpacity onPress={UpdateProfile} style={styles.button} >
                <Text style={styles.text}>Update</Text>
            </TouchableOpacity>


        </ScrollView>

    )




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    arrow: {
        flexDirection: 'row',
        

    },
    head: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    headd: {
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    hinh: {

        marginTop: 10

    },
    username: {
        marginTop: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#4E4B66',
        borderRadius: 6,
        marginBottom: 10,
        height: 48,
        padding: 8,
        marginTop: 4,
    },
    button: {
        backgroundColor: '#1877F2',
        borderRadius: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5,
        marginTop: 16

    },
    text: {
        color: '#FFFAFA',
        fontWeight: 'bold',

    },
    txt: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        flex: 8,
        textAlign: 'center'
    },
    hinh1: {
        flex: 0.4
    },
    label: {
        flexDirection: 'row'
    },
    icon: {
        color: 'red'
    },
    content: {
        flex: 8
    },
    txtchange:{
        flex:1,
        alignItems: 'center',
        backgroundColor:'#FFCCFF',
        paddingTop:10,
        paddingBottom:10,
        borderBottomEndRadius:10,
        borderTopEndRadius:10,  
    },
    inputchange:{
        backgroundColor:'#CCCCCC',
        flex:4,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        paddingLeft:10,
        color:'black'
    }

})

export default Profile

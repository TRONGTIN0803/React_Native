import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image, StatusBar, ToastAndroid, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect, useContext } from 'react';
import DetailScreen from '../ASM/DetailScreen';
import AxiosIntance from './AxiosIntance';
import CheckBox from '@react-native-community/checkbox';
import { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConText } from '../../utils/AppConText';




const Login = (props) => {

    const [first, setfirst] = useState(true)

    const [change, setChange] = useState(true)
    const { navigation } = props;
    const Clickne = () => {
        navigation.navigate('HomeP')
    }

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const { setisLogin } = useContext(AppConText);

    const DangNhap = async () => {
        if (first) {

            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('pass', password);
        } else {
            AsyncStorage.setItem('email', '');
            AsyncStorage.setItem('pass', '');
        }
        try {
            const dn = await AxiosIntance().post('/auth/login', {
                email: email,
                password: password
            });
            if (dn.data.error != false) {
                await AsyncStorage.setItem('token', dn.data.token);

                ToastAndroid.show('Dang nhap thanh cong', ToastAndroid.SHORT)
                console.log("thanh cong");
                setisLogin(true);
            } else {
                alert('that bai')
            }
        } catch (e) {
            console.log(email);
            console.log(password);
            console.log("error");
        }
    }

    const DangKy = async () => {
        try {
            const dn = await AxiosIntance().post('/users/register', {
                email: email,
                password: password
            });
            if (dn.data.error != false) {
                ToastAndroid.show('Dang ky thanh cong', ToastAndroid.SHORT)
                setChange(true)
            } else {
                ToastAndroid.show('Dang Ky that bai', ToastAndroid.SHORT)
            }
        } catch (e) {
            console.log(email);
            console.log(password);
            console.log("error");

        }
    }
    useEffect(() => {
        const loaddata = async () => {
            const Emailog = await AsyncStorage.getItem('email');
            const Pass = await AsyncStorage.getItem('pass');
            setemail(Emailog);
            setpassword(Pass)
            return () => { }
        };
        loaddata();


    }, []);




    return (

        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor='white'  ></StatusBar>




            {change ? (<Text style={styles.tt}>Hello</Text>) : <Text style={styles.tt1}>Hello!</Text>}
            {change ? (<Text style={styles.tt1}>Again!</Text>) : null}

            {change ? (<Text style={styles.tt2}>Welcome back you've been missed</Text>) : <Text style={styles.tt2}>Signup to get Started</Text>}

            <View style={styles.content}>
                <View style={styles.username}>

                    <View style={styles.label}>
                        <Text>UserName</Text>
                        <Text style={styles.icon}>*</Text>
                    </View>
                    <TextInput style={styles.input} onChangeText={(value) => setemail(value)}>{email}</TextInput>
                </View>

                <View style={styles.password}>
                    <View style={styles.label}>
                        <Text>Password</Text>
                        <Text style={styles.icon}>*</Text>
                    </View>
                    <TextInput style={styles.input} onChangeText={(value) => setpassword(value)}>{password}</TextInput>
                </View>
                <View style={styles.cb}>
                    <CheckBox
                        disabled={false}
                        value={first}
                        onValueChange={(value) => setfirst(value)}>
                    </CheckBox>
                    <Text>Remember Me?</Text>
                    {change ? (<Text style={styles.forgot}>Forgot the password</Text>) : null}


                </View>

                {change ? (<Button title='Login' onPress={DangNhap} ></Button>) : <Button title='DangKy' onPress={DangKy} ></Button>}

                <View style={styles.footer}>
                    <Text style={styles.txt}>or continue with</Text>
                </View>

                <View style={styles.btnlogin}>
                    <TouchableOpacity style={styles.hinh} >
                        <Image source={require('./images/facebook.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.hinh}>
                        <Image source={require('./images/google.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.txt1}> don't have an account ?</Text>
                    <TouchableOpacity onPress={() => setChange(!change)}>
                        <Text style={styles.txt2}>Sign Up</Text>
                    </TouchableOpacity>

                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'black' 
        margin: 10,

    },
    username: {
        //flex: 1,
        marginTop: 48,

    },
    password: {
        // flex: 1,
        marginTop: 16
    },
    cb: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        alignContent: 'center',
        marginBottom: 10,
        alignItems: 'center'
    },

    forgot: {
        marginLeft: 100,
        color: "#5890FF"
    },
    content: {
        flex: 1,
    },
    tt: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    tt1: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#1877F2',
    },
    tt2: {
        fontSize: 20,
        width: '70%',
        marginTop: 10

    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 4,
    },

    btnlogin: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txt2: {
        color: '#1877F2',
        fontWeight: 'bold'

    },
    label: {
        flexDirection: 'row'
    },
    icon: {
        color: 'red'
    },
    hinh: {
        width: '45%',

    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },


})


export default Login
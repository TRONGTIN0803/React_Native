import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AxiosIntance from '../ASM/AxiosIntance';




const DetailScreen = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const [img, setimg] = useState("")
    const [title, settitle] = useState("")
    const [content, setcontent] = useState("")
    const [isLoading, setisLoading] = useState(true)
    //console.log(item._title)
    useEffect(() => {
        const chitiet = async () => {
            const res = await AxiosIntance().get('/articles/' + params.id + '/detail');
            if (res.error == false)
                //console.log(typeof (res.data))
                //setNews(res.data);
                setimg(res.data[0].image)
            settitle(res.data[0].title)
            setcontent(res.data[0].content)
            setisLoading(false)
            return () => { }
        };

        chitiet();

        return () => {

        }
    }, [])

    return (
        <>
            {isLoading == true ? (<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text>Dang load...</Text><ActivityIndicator /></View>) :
                (
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={styles.container}>
                            <View style={styles.head}>
                                <TouchableOpacity onPress={()=>{navigation.goBack(null)}}>
                                    <Image source={require('../ASM/images/arrow.png')} />
                                </TouchableOpacity>

                                <View style={styles.headright}>
                                    <Image style={{ marginRight: 10 }} source={require('../ASM/images/haha.png')} />
                                    <Image source={require('../ASM/images/mutil.png')} />
                                </View>

                            </View>

                            <View style={styles.topcontent}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={styles.imgnxb} source={{ uri: 'https://s3-alpha-sig.figma.com/img/8396/3e30/9b39c9aac314280ca193b7a04c0f2832?Expires=1676246400&Signature=o7fWrEecOGKOSChuvvjdmpyv~VjMDZmZr0vjj7YMc1-UzpdBy~tYU2rJnrExXVEcx7OlhMOuGvLB6SBo-oZyqj9iB65iqtcGOI8YjQH07Iig8YOqMAqq5FbenVv6A7I~iMSo4ZOursqFKJD8E~W-Jmd1R8qNplz0GlolY6tufZENzVvfcY-dD-VJqm8SFXvYt9NdafVcJaC2xBS3CJkzE2s9GCR1CbkSoEEzmijhMOT0AdVPqbVvVVUCY9T22NROLLqkMtd4Eo9xfINWmLgi9eWjZlvsSqXG7U~ET845Pfi1d-VSf9RiPlbwdYB7TbVKOPpcdKy-~8OviV7BWsCaiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }} />
                                    <View style={{ marginLeft: 8 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>BBC News</Text>
                                        <Text>14m ago</Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.fl}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Following</Text>
                                </TouchableOpacity>
                            </View>
                            <Image style={styles.imgmain} source={{ uri: img }} />
                            <Text style={{ marginTop: 8 }}>Europe</Text>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={{ fontSize: 18 }}>{content}</Text>

                            <View style={styles.footer}>
                                <View style={styles.footerchil}>
                                    <View style={styles.tim}>
                                        <Image source={require('../ASM/images/tim.png')} />
                                        <Text style={{ marginLeft: 4 }}>24.5k</Text>
                                    </View>
                                    <View style={styles.cmt}>
                                        <Image source={require('../ASM/images/comment.png')} />
                                        <Text style={{ marginLeft: 4 }}>1K</Text>
                                    </View>
                                </View>


                                <Image style={{ marginEnd: 40 }} source={require('../ASM/images/conga.png')} />
                            </View>
                        </View>
                    </ScrollView>
                )}
        </>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    headright: {
        flexDirection: 'row',
    },
    topcontent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgnxb: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    fl: {
        backgroundColor: '#1877F2',
        padding: 10,
        borderRadius: 6,

    },
    imgmain: {
        width: '100%',
        height: 200,
        marginTop: 10
    },
    title: {
        fontSize: 24,
        color: 'black',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50
    },
    footerchil: {
        flexDirection: 'row',

    },
    tim: {
        flexDirection: 'row',
    }, cmt: {
        flexDirection: 'row',
        marginLeft: 10
    },
})

export default DetailScreen
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'


const List = (props) => {

  const { item } = props;
  //console.log(item)




  return (

    <View style={styles.item}>
      <Image style={styles.img} source={{ uri: item.image }} />
      <View style={styles.content}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.footer}>
          <View style={styles.itemsup}>
            <Image style={styles.imgnxb} source={{ uri: item.imgnxb }} />
            <Text style={styles.nxb}>{item.nxb}</Text>
          </View>
          <View style={styles.itemsup}>
            <Image style={{ marginRight: 4 }} source={require('../ASM/images/lock.png')} />
            <Text style={styles.time}>{item.createdAt}</Text>
          </View>

        </View>

      </View>
    </View>



  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    marginRight: 12,
    marginLeft: 12,
  },
  img: {

    width: 96,
    height: 127,
    borderRadius: 8,
  },
  content: {
    flex: 8,
    padding: 8,
    justifyContent: 'space-between'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  time: {
    fontSize: 13,

  },
  type: {
    fontSize: 13,
  },
  nxb: {
    fontSize: 13,
    color: '##4E4B66',

  },
  itemsup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgnxb: {
    marginRight: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default List
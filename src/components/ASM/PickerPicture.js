import { View, Text, TouchableOpacity, Button, Image } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-picker';

const PickerPicture = () => {
    const [resourcePath, setresourcePath] = useState({})

    const selectFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { 
              name: 'customOptionKey', 
              title: 'Choose file from Custom Option' 
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, res => {
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            setresourcePath(source);
          }
        });
      };

    const imageGalleryLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (res) => {
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(res));
            setresourcePath({
              filePath: res,
              fileData: res.data,
              fileUri: res.uri
            });
          }
        });
      }
    

    return (
        <View style={{flex:1}}>
           <Image style={{ width: 100, height: 100 }} source={{uri:'data:image/jpeg;base64,'+resourcePath.data}}/>
           <Image
            source={{ uri: resourcePath.uri }}
            style={{ width: 200, height: 200 }}
          />
           <Text style={{ alignItems: 'center' }}>
            {resourcePath.uri}
          </Text>
          <TouchableOpacity onPress={imageGalleryLaunch} style={{backgroundColor:'blue'}}  >
              <Text style={{backgroundColor:'red'}}>Select File</Text>
          </TouchableOpacity>   
        </View>
    )
}

export default PickerPicture
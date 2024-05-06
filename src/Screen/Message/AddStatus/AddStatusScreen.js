import React, {useState, useEffect} from 'react';
import {Image, View, Button, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddStatusScreen = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const openMediaPicker = () => {
      const options = {
        mediaType: 'mixed', // Allow both photos and videos
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      Alert.alert(
        'Choose Option',
        'Select from Gallery or Capture using Camera:',
        [
          {
            text: 'Select from Gallery',
            onPress: () => launchImageLibrary(options, handleResponse),
          },
          {
            text: 'Capture using Camera',
            onPress: () => launchCamera(options, handleResponse),
          },
        ],
      );
    };

    openMediaPicker();
  }, []);

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled media picker');
    } else if (response.error) {
      console.log('Media picker error: ', response.error);
    } else {
      if (response.assets?.length > 0) {
        const mediaType = response.assets[0].type;
        if (mediaType === 'image' || mediaType === 'video') {
          setSelectedMedia(response.assets[0].uri);
        }
      } else {
        console.log('No assets returned from media picker');
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {selectedMedia && (
        <>
          {selectedMedia.includes('.mp4') ? (
            <Video
              source={{uri: selectedMedia}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
              controls
            />
          ) : (
            <Image
              source={{uri: selectedMedia}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          )}
        </>
      )}
    </View>
  );
};

export default AddStatusScreen;

import React from 'react';
import { useEffect, useState } from 'react';
import { StorageKeys } from '../Data/StorageKeys';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';

const Second = ({ navigation }) => {

  const [currentUser, setCurrentUser] = useState();


  const getCureentUser = async () => {

    var user = await AsyncStorage.getItem(StorageKeys.CurrentUser);

    if (user != null) {
      setCurrentUser(user);
    }
    else if (user == null){
      console.log('user do not exists')
    }

  }



  useEffect(() => {
    getCureentUser();

  }, [])


  return (
    <View style={{ backgroundColor: '#0f034b', height: '100%', width: '100%' }}>
      <View style={{ borderBottomLeftRadius: 300, overflow: 'hidden', flex: 8 }}>
        <View style={{ width: '100%', height: '100%', alignSelf: 'baseline' }}>
          <Video
            style={{ flex: 1 }}
            source={require('../Images/bg.mp4')} // Can be a URL or a local file.
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            resizeMode="cover" // Set the resizing mode of your video to cover the area
            onError={this.videoError} // Callback when video cannot be loaded
            repeat={true} // Set it to true if you want to repeat the video
            playInBackground={false}
          />
        </View>
      </View>
      <View style={{ flex: .8 }}></View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#ff5400',
            width: '90%',
            borderRadius: 39,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={() => {

            currentUser == undefined ? navigation.replace('Login') : navigation.replace('Home');

          }}>
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Second;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff5400',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
  },
});
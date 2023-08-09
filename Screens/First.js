import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const First = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Second');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.videoContainer}>
        <Video
          source={require('../Images/Front.mp4')} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          resizeMode="contain" // Set the resizing mode of your video
          onError={this.videoError} // Callback when video cannot be loaded
          repeat={true} // Set it to true if you want to repeat the video
          playInBackground={false}
          style={styles.video}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default First;
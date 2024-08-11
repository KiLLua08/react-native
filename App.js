import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './components/ImageViewer.js';
import PressableBut from './components/PressableBut.js';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from 'react';
import CircleButton from './components/CircleButton.js';
import IconButton from './components/IconButton.js';
import EmojiPicker from './components/EmojiPicker.js';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
  const PlaceholderImage = require('./assets/hero.png');
  
  if (status === null) {
    requestPermission();
  }
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 5000);
  }, []);

  const loginWithFacebook = () => {
    console.log('Button pressed');
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // we will implement this later
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
      alert('You selected an image.');
      setShowAppOptions(true);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            ref={imageRef}
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <PressableBut theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <PressableBut
            label="Use this photo" onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdbb2d',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
    padding: 60,
  },
  textContainer: {
    color: '#00008b',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerContainer: {
    justifyContent: 'space-around',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

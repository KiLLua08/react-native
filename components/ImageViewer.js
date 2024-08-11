import React from 'react'
import { Text, View } from 'react-native'
import { Image } from 'react-native'

export default function ImageViewer({placeholderImageSource, selectedImage}) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;
    return (
      <View>
        <Image
        source={imageSource}
        style={{ width: 400, height: 300, margin: 10, borderRadius: 10 }}
        alt='image'
      />
      </View>
    )
  }


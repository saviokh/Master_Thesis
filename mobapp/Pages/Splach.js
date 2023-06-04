import { View, Text, ImageBackground } from 'react-native'
import React ,{useEffect} from 'react'

export default function Splach({navigation}) {
    useEffect(() => {
        const timer = setTimeout(() => {
        navigation.navigate('LoginScreen')
        }, 2000);
    
        // Cleanup function to clear the timer if the component unmounts before the timer finishes
        return () => clearTimeout(timer);
      }, []);
  return (
    <ImageBackground style={{flex:1}} resizeMode='cover' source={require('../assets/splach.jpg')}>
    
    </ImageBackground>
  )
}
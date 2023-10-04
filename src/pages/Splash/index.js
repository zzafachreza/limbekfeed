import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {



  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home')
    }, 1500)
  }, []);


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    }}>


      <Image source={require('../../assets/logo.png')} style={{
        width: windowWidth / 1.2,
        height: windowWidth / 1.2,
        resizeMode: 'contain',
        marginBottom: 10
      }} />

      <ActivityIndicator size="large" color={colors.secondary} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

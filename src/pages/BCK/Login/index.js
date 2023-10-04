import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});





  const masuk = () => {


    if (kirim.email == null && kirim.password == null) {
      Alert.alert(MYAPP, 'email dan Password tidak boleh kosong !');
    } else if (kirim.email == null) {
      Alert.alert(MYAPP, 'email tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }

        });



    }




  }

  useEffect(() => {

    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, [])

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: colors.white
        }}>
          <Image
            source={require('../../assets/logo.png')}
            style={
              {
                width: windowWidth / 1.5,
                height: windowWidth / 1.5,
                resizeMode: 'contain'
              }
            }
          />




        </View>



        <View style={{ padding: 20, flex: 1, backgroundColor: colors.white }}>
          <MyInput textColor={colors.primary} colorIcon={colors.primary} label="Email" onChangeText={val => setKirim({
            ...kirim,
            email: val
          })}
            iconname="mail" placeholder="Masukan email" />
          <MyGap jarak={20} />
          <MyInput textColor={colors.primary} colorIcon={colors.primary}
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Password"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />
          <MyGap jarak={40} />
          {!loading &&


            <MyButton
              onPress={masuk}
              title="Log in"
              warna={colors.primary}
              Icons="log-in-outline"
            />

          }

        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>

      <TouchableOpacity activeOpacity={1} onPress={() => {

        navigation.navigate('Register')
      }} style={{
        padding: 10,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
      }}><Text style={{
        fontSize: windowWidth / 28,
        marginTop: 10,
        fontFamily: fonts.primary[400],
        textAlign: 'center',
        color: colors.primary
      }}>TIdak punya akun ? daftar disini</Text></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});

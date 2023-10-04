import { ActivityIndicator, Alert, Image, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MyHeader } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, apiURL } from '../../utils/localStorage';
import ModelView from 'react-native-gl-model-view';
import { Animated, Easing } from 'react-native';
import { RNCamera } from 'react-native-camera'
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import Slider from '@react-native-community/slider';

export default function MenuAR({ navigation, route }) {

    const [cek, setCek] = useState(300);
    const [cekX, setCekX] = useState(0);
    const [cekY, setCekY] = useState(0);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    useEffect(() => {
        requestCameraPermission();
        axios.post(apiURL + 'get_latihan', {
            nama: route.params.latihan
        }).then(res => {
            console.log(res.data);

            if (res.data.length > 0) {
                setData(res.data);
                setTimeout(() => {
                    setOpen(true);
                }, 1000)
            } else {
                Alert.alert(MYAPP, 'Data AR latihan tidak ditemukan !');
                navigation.goBack()
            }

        })
    }, []);

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    return (
        <View style={{
            flex: 1,
        }}>
            <Text style={{
                padding: 10,
                fontFamily: fonts.secondary[600],
                fontSize: 25,
                textAlign: 'center',
                color: colors.white,
                backgroundColor: colors.primary
            }}>{route.params.latihan}</Text>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}



            {open && <RNCamera

                style={{
                    flex: 1,
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image style={{
                        transform: [
                            { rotateX: cekX + 'deg' },
                            { rotateY: cekY + 'deg' },
                        ],
                        width: cek,
                        height: cek,
                        resizeMode: 'contain'
                    }} source={{
                        uri: data[0].image
                    }} />
                </View>

                {/* <ModelView
                    model={{
                        uri: 'Koltuk.obj',
                    }}
                    texture={{
                        uri: 'Hamburger.png',
                    }}
                    // int={{ r: 1.0, g: 1.0, b: 1.0, a: 1.0 }}
                    onStartShouldSetResponder={() => true}
                    animate={true}
                    scale={1}
                    onResponderRelease={x => {
                        // console.log('end', x)
                    }}
                    onResponderMove={e => {
                        console.log('move', e.nativeEvent.pageX);
                        setCekX(e.nativeEvent.pageY)
                        setCekY(e.nativeEvent.pageX)
                    }}
                    translateZ={-2}
                    rotateZ={0}
                    rotateX={cekX}
                    rotateY={cekY}

                    style={{ flex: 1 }}
                /> */}
                <View style={{
                    // flex: 0.3,
                    padding: 10,
                    backgroundColor: colors.white,
                    opacity: 0.6
                }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <RenderHtml contentWidth={'100%'} source={{
                            html: data[0].penjelasan
                        }} />
                    </ScrollView>
                    <View style={{
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{ color: colors.primary, fontFamily: fonts.secondary[600] }}>Zoom</Text>
                        <Slider
                            onValueChange={x => setCek(x)}
                            style={{ width: '100%', height: 40 }}
                            minimumValue={100}
                            step={20}
                            value={cek}
                            maximumValue={Math.round(windowHeight)}
                            thumbTintColor={colors.secondary}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.primary}
                        />
                    </View>

                    <View style={{
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{ color: colors.primary, fontFamily: fonts.secondary[600] }}>Rotate X</Text>
                        <Slider
                            onValueChange={x => setCekX(x)}
                            style={{ width: '100%', height: 40 }}
                            minimumValue={100}
                            step={20}
                            value={cekX}
                            maximumValue={360}
                            thumbTintColor={colors.secondary}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.primary}
                        />
                    </View>
                    <View style={{
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{ color: colors.primary, fontFamily: fonts.secondary[600] }}>Rotate Y</Text>
                        <Slider
                            onValueChange={x => setCekY(x)}
                            style={{ width: '100%', height: 40 }}
                            minimumValue={100}
                            step={20}
                            value={cekY}
                            maximumValue={360}
                            thumbTintColor={colors.secondary}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.primary}
                        />
                    </View>

                </View>
            </RNCamera>}

        </View>
    )
}

const styles = StyleSheet.create({})

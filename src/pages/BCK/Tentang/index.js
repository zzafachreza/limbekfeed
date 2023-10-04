import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import 'moment/locale/id';
import RenderHtml from 'react-native-render-html';
export default function Tentang({ navigation, route }) {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {

        axios.post(apiURL + 'get_tentang', {
            jenis: route.params.jenis
        }).then(res => {
            console.log(res.data);
            setData(res.data);
            setOpen(true)

        })
    }, [])
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader />

            {open && <View style={{
                flex: 1,
                padding: 20,
            }}>
                <RenderHtml contentWidth={'100%'} source={{
                    html: data[0].keterangan
                }} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({})
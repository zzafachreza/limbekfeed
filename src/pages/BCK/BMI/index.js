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
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';
import Slider from '@react-native-community/slider';
export default function BMI() {
    const [BMI, setBMI] = useState({});
    const [loading, setLoading] = useState(true);
    const KalkulatorBMI = (tinggi, berat) => {

        let hasil = parseFloat(berat / Math.pow(tinggi / 100, 2)).toFixed(2);
        let arr = {};
        if (hasil < 18.5) {
            arr = { 'nilai': hasil, 'index': 'Berat Badan Kurang (Underweight)' }
        } else if (hasil >= 18.5 && hasil < 24.9) {
            arr = { 'nilai': hasil, 'index': 'Berat Badan Normal (Normal Weight)' }
        } else if (hasil >= 25 && hasil < 29.9) {
            arr = { 'nilai': hasil, 'index': 'Berat Badan berlebih (Overweight)' }
        } else if (hasil >= 30) {
            arr = { 'nilai': hasil, 'index': 'Obesitas' }
        }

        setBMI(arr);


    }

    const sendServer = () => {
        console.log(data);
        KalkulatorBMI(data.tinggi_badan, data.berat_badan);
        setLoading(false);
    }

    const [data, setData] = useState({
        berat_badan: 30,
        tinggi_badan: 140
    })

    const MYKategori = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row',
                padding: 5,
            }}>
                <Text style={{
                    flex: 0.3,
                    fontFamily: fonts.secondary[600],
                    fontSize: 14,
                    color: colors.white
                }}>{label}</Text>
                <Text style={{
                    flex: 0.05,
                    fontFamily: fonts.secondary[600],
                    fontSize: 14,
                    color: colors.white
                }}>:</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 14,
                    color: colors.white
                }}>{value}</Text>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader />

            <View style={{
                marginTop: 20,
                padding: 20
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 0,
                    }}>
                    <Icon type="ionicon" name="body" color={colors.primary} size={16} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                            left: 10,
                            fontSize: 12,
                        }}>
                        Tinggi Badan
                    </Text>
                </View>
                <Slider
                    onValueChange={x => setData({
                        ...data,
                        tinggi_badan: x
                    })}
                    style={{ width: '100%', height: 50 }}
                    minimumValue={140}
                    step={1}
                    maximumValue={190}
                    thumbTintColor={colors.secondary}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.primary}
                />
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    color: colors.primary
                }}>{data.tinggi_badan} cm</Text>
            </View>
            <View style={{
                marginTop: 20,
                padding: 20,
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 0,
                    }}>
                    <Icon type="ionicon" name="speedometer-outline" color={colors.primary} size={16} />
                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                            left: 10,
                            fontSize: 12,
                        }}>
                        Berat Badan
                    </Text>
                </View>
                <Slider
                    onValueChange={x => setData({
                        ...data,
                        berat_badan: x
                    })}
                    style={{ width: '100%', height: 50 }}
                    minimumValue={30}
                    step={1}
                    maximumValue={100}
                    thumbTintColor={colors.secondary}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.primary}
                />
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[800],
                    color: colors.primary
                }}>{data.berat_badan} kg</Text>
            </View>
            <View style={{
                padding: 20,
            }}>
                <MyButton onPress={sendServer} title="Hitung BMI" Icons="barbell" />
            </View>

            {!loading && <View style={{
                backgroundColor: colors.secondary,
                padding: 20,
                margin: 20,
                borderRadius: 10,
            }}>
                <MYKategori label="Hasil BMI" value={BMI.nilai} />
                <MYKategori label="Kategori" value={BMI.index} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({})
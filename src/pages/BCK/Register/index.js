import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Slider from '@react-native-community/slider';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [cek, setCek] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const [cedera, setCedera] = useState({
        0: {
            label: 'Punggung',
            pilih: false
        },
        1: {
            label: 'Bahu',
            pilih: false
        },
        2: {
            label: 'Kepala dan Leher',
            pilih: false
        },
        3: {
            label: 'Tangan',
            pilih: false
        },
        4: {
            label: 'Pinggul dan Panggul',
            pilih: false
        },
        5: {
            label: 'Kaki',
            pilih: false
        },
        6: {
            label: 'Dada',
            pilih: false
        },
    })




    const [sama, setSama] = useState(true)

    const [data, setData] = useState({
        api_token: api_token,
        email: '',
        nama_lengkap: '',
        password: '',
        repassword: '',
        jenis_kelamin: 'Pria',
        umur: '18-29 Tahun',
        tinggi_badan: 140,
        berat_badan: 30,
        riwayat_cedera: '',
        goals: 'Menambah Otot',
    });

    const simpan = () => {
        if (
            data.nama_lengkap.length === 0 &&
            data.email.length === 0 &&
            data.jenis_kelamin.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama kamu',
            });
        }

        else if (data.jenis_kelamin.length === 0) {
            showMessage({
                message: 'Masukan jenis kelamin',
            });
        } else if (data.email.length === 0) {
            showMessage({
                message: 'Masukan email',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else {


            setLoading(true);

            var arr = [];


            Object.keys(cedera).map((i, index) => {
                console.log(cedera[index].pilih);
                cedera[index].pilih ? arr.push(index) : ''
            });



            setTimeout(() => {

                const KIRIM = {
                    ...data,
                    riwayat_cedera: JSON.stringify(arr)
                };



                axios
                    .post(apiURL + 'register', KIRIM)
                    .then(res => {
                        console.warn(res.data);
                        setLoading(false);
                        if (res.data.status == 404) {
                            showMessage({
                                type: 'danger',
                                message: res.data.message
                            })
                        } else {
                            Alert.alert(MYAPP, res.data.message);
                            console.log(res.data);

                            storeData('user', res.data.data);
                            navigation.replace('Home')
                            // navigation.goBack();
                        }


                    });



            }, 500)

        }
    };

    const [desa, setDesa] = useState([]);



    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
                position: 'relative'
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: windowWidth / 12,
                        fontFamily: fonts.primary[800],
                        color: colors.black,

                    }}>Data Diri</Text>
                </View>


                <MyInput
                    placeholder="Masukan email"
                    label="email"
                    iconname="at"
                    value={data.email}
                    onChangeText={value =>
                        setData({
                            ...data,
                            email: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan nama lengkap"
                    label="Nama Lengkap"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan buat sandi"
                    label="Buat Sandi"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    borderColor={sama ? colors.border : colors.danger}
                    borderWidth={sama ? 0 : 1}
                    placeholder="Masukan ulang kata sandi"
                    label="Tulis Ulang Kata Sandi"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.repassword}
                    onChangeText={value => {

                        if (value !== data.password) {
                            setSama(false)
                        } else {
                            setSama(true)
                        }

                        setData({
                            ...data,
                            repassword: value,
                        })
                    }

                    }
                />

                <MyGap jarak={10} />


                <View style={{
                    marginVertical: 10,
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 20,
                    borderColor: colors.primary
                }}>
                    <MyPicker label="Jenis Kelamin" onValueChange={x => setData({
                        ...data,
                        jenis_kelamin: x
                    })} value={data.jenis_kelamin} data={[
                        { label: 'Pria', value: 'Pria' },
                        { label: 'Wanita', value: 'Wanita' },
                    ]} iconname="male-female" />

                    <MyGap jarak={10} />

                    <MyPicker label="Umur" onValueChange={x => setData({
                        ...data,
                        umur: x
                    })} value={data.umur} data={[
                        { label: '18-29 Tahun', value: '18-29 Tahun' },
                        { label: '30-39 Tahun', value: '30-39 Tahun' },
                        { label: '40-50 Tahun', value: '40-50 Tahun' },
                    ]} iconname="male-female" />




                    <View style={{
                        marginTop: 20,
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
                </View>

                <View style={{
                    marginVertical: 10,
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 20,
                    borderColor: colors.primary
                }}>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 0,
                            marginBottom: 20,
                        }}>
                        <Icon type="ionicon" name="bandage-outline" color={colors.primary} size={16} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.primary,
                                left: 10,
                                fontSize: 12,
                            }}>
                            Riwayat Cedera
                        </Text>
                    </View>



                    {Object.keys(cedera).map((i, index) => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                                borderBottomColor: colors.zavalabs,
                            }}>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        color: colors.black,
                                        fontSize: 14,
                                    }}>
                                    {cedera[index].label}
                                </Text>
                                <TouchableOpacity onPress={() => {


                                    if (!cedera[index].pilih) {
                                        setCedera({
                                            ...cedera,
                                            [index]: {
                                                label: cedera[index].label,
                                                pilih: true
                                            }
                                        })
                                    } else {
                                        setCedera({
                                            ...cedera,
                                            [index]: {
                                                label: cedera[index].label,
                                                pilih: false
                                            }
                                        })
                                    }


                                }}>
                                    <Icon type='ionicon' name={cedera[index].pilih ? 'checkbox' : 'checkbox-outline'} color={colors.secondary} />
                                </TouchableOpacity>
                            </View>

                        )
                    })}

                </View>



                <View style={{
                    marginVertical: 10,
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 20,
                    borderColor: colors.primary
                }}>

                    <MyPicker label="Goals" onValueChange={x => setData({
                        ...data,
                        goals: x
                    })} value={data.goals} data={[
                        { label: 'Menambah Otot', value: 'Menambah Otot' },
                        { label: 'Membugarkan Tubuh', value: 'Membugarkan Tubuh' },
                        { label: 'Menurunkan Berat', value: 'Menurunkan Berat' },
                    ]} iconname="aperture" />




                    <View style={{
                        marginTop: 20,
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
                </View>





                <View style={{
                    padding: 10,
                    backgroundColor: colors.secondary,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 18,
                        color: colors.white
                    }}>Notes : </Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 18,
                        color: colors.white,
                        textAlign: 'center'
                    }}>Aplikasi ini tidak dianjurkan untuk ibu hamil, pengidap penyakit berat, cacat mental, dan usia 50 tahun ke atas.</Text>
                </View>


                <MyGap jarak={20} />




                {!loading &&

                    <MyButton

                        warna={colors.primary}
                        title="Simpan Data Diri"
                        Icons="log-in"
                        onPress={simpan}
                    />


                }

                <MyGap jarak={10} />
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});

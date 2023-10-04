import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TextInput } from 'react-native'
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

export default function Home({ navigation, route }) {

    const [kolam1, setKolam1] = useState([0, 0, 0, 0, 0]);
    const [kolam2, setKolam2] = useState([0, 0, 0, 0, 0]);
    const [kolam3, setKolam3] = useState([0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(false);

    const PROPERTI = [
        {
            PK: 5,
            NB: 0.45
        },
        {
            PK: 4,
            NB: 0.25
        },
        {
            PK: 3,
            NB: 0.15
        },
        {
            PK: 2,
            NB: 0.1
        },
        {
            PK: 1,
            NB: 0.05
        }
    ]


    const BOBOT = [
        {
            GAP: 0,
            WJ: 6,
        },
        {
            GAP: 1,
            WJ: 5.5,
        },
        {
            GAP: -1,
            WJ: 5,
        },
        {
            GAP: 2,
            WJ: 4.5,
        },
        {
            GAP: -2,
            WJ: 4,
        },
        {
            GAP: 3,
            WJ: 3.5,
        },
        {
            GAP: -3,
            WJ: 3,
        },
        {
            GAP: 4,
            WJ: 2.5,
        },
        {
            GAP: -4,
            WJ: 2,
        },
        ,
        {
            GAP: 5,
            WJ: 1.5,
        },
        {
            GAP: -5,
            WJ: 1,
        }
    ]

    const KRITERIA = [
        'Jumlah Ikan', 'Ukuran Ikan', 'Usia Ikan', 'Kesehatan Ikan', 'Kualitas Ikan'
    ]

    const sendCalculate = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
        }, 1200)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={require('../../assets/logo.png')} style={{
                    width: windowWidth / 4,
                    height: windowWidth / 4,
                    resizeMode: 'contain',
                }} />
            </View>

            {/* header */}
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.danger,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>Kriteria</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>Kolam 1</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.secondary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>Kolam 2</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.tertiary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.white
                    }}>Kolam 3</Text>
                </View>
            </View>


            {/* jumlah ikan */}
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    margin: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>Jumlah Ikan</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
            </View>

            {/* Ukuran ikan */}
            <View style={{
                marginTop: 2,
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    margin: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>Ukuran Ikan</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
            </View>

            {/* Usia ikan */}
            <View style={{
                marginTop: 2,
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    margin: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>Usia Ikan</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
            </View>

            {/* Kesehatan ikan */}
            <View style={{
                marginTop: 2,
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    margin: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>Kesehatan Ikan</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
            </View>

            {/* Kualitas air ikan */}
            <View style={{
                marginTop: 2,
                flexDirection: 'row',
                backgroundColor: colors.primary,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    margin: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>Kualitas Air Kolam</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                }}>
                    <TextInput keyboardType='number-pad' style={{
                        borderWidth: 1,
                        width: '100%',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center'
                    }} />
                </View>
            </View>

            {!loading && <TouchableOpacity onPress={sendCalculate} style={{
                marginVertical: 10,
                marginHorizontal: windowWidth / 6,
                borderRadius: 20,
                padding: 10,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: colors.primary
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: colors.white,
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    flex: 1,
                }}>PROSES</Text>
                <Icon type='ionicon' color={colors.white} name='refresh' />
            </TouchableOpacity>}

            {loading && <View style={{
                marginVertical: 10,
            }}><ActivityIndicator size="large" color={colors.primary} /></View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
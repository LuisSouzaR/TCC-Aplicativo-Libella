import React, { useState } from 'react';

import { StyleSheet, Text, View, Image, Switch, TouchableOpacity, ScrollView } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";


const ConfigScreen = ({ navigation }) => {

    const [isEnabledAtv, setIsEnabledAtv] = useState(false);
    const [isEnabledConsul, setIsEnabledConsul] = useState(false);
    const toggleSwitchAtv = () => setIsEnabledAtv(previousState => !previousState);
    const toggleSwitchConsul = () => setIsEnabledConsul(previousState => !previousState);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerTitleBloco}>
                    <AntIcon name="idcard" size={25} color={"black"} style={styles.icon} />
                    <Text style={styles.TitlePrincipal}>Informações Pessoais</Text>
                </View>



                <TouchableOpacity
                    style={styles.containerConfigBloco}
                    onPress={() => navigation.navigate('AlterarDadosPC')}>
                    <View style={styles.containerInfosBloco}>
                        <Text style={styles.text}>Alterar Dados</Text>
                        <EntypoIcon name="chevron-thin-right" size={20} color={"black"} style={styles.icon} />
                    </View>

                </TouchableOpacity>

                <View style={styles.containerTitleBloco}>
                    <FeatherIcon
                        name="bell" size={23} color={"black"} style={styles.icon}
                    />
                    <Text style={styles.TitlePrincipal}>Notificações</Text>
                </View>

                <View style={styles.containerConfigBloco}>
                    <View style={styles.containerInfosBloco}>
                        <Text style={styles.text}>Próximas Consultas</Text>
                        <View style={styles.containerSwitch}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#acd5ec' }}
                                thumbColor={isEnabledConsul ? '#53a7d7' : '#cacaca'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitchConsul}
                                value={isEnabledConsul}
                            />
                        </View>
                    </View>
                    <View style={styles.containerSubInfosBloco}>
                        <Text style={styles.subText}>Antecedência de:</Text>
                    </View>
                    <View style={styles.containerInfosBloco}>
                        <Text style={styles.text}>Atividades</Text>
                        <View style={styles.containerSwitch}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#acd5ec' }}
                                thumbColor={isEnabledAtv ? '#53a7d7' : '#cacaca'}
                                ios_backgroundColor="#c9c9c9"
                                onValueChange={toggleSwitchAtv}
                                value={isEnabledAtv}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.containerTitleBloco}>
                    <FeatherIcon name='users' size={23} color={'black'} style={styles.icon} />
                    <Text style={styles.TitlePrincipal}>Psicólogo(a)</Text>
                </View>

                <TouchableOpacity
                    style={styles.containerConfigBloco}
                    onPress={() => navigation.navigate('PerfilPS')}>
                    <View style={styles.containerInfosBloco}>
                        <Text style={styles.text}>Ver perfil</Text>
                        <EntypoIcon name="chevron-thin-right" size={20} color={"black"} style={styles.icon} />
                    </View>

                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default ConfigScreen;

const styles = StyleSheet.create({

    // Containers
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: 20,
        gap: 30,
        backgroundColor: '#F2F2F2',
        color: 'white',
        marginBottom: 60,
    },

    containerTitleBloco: {
        width: '80%',
        flexDirection: 'row',
        top: 20,
        gap: 10,
    },

    containerConfigBloco: {
        width: '100%',
        padding: 20,
        paddingLeft: 70,
        paddingRight: 30,
        backgroundColor: 'white',
        gap: 5,
    },

    containerInfosBloco: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    containerSubInfosBloco: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    containerSwitch: {
        alignItems: 'center',
        justifyContent: 'center',
    },


    // Textos
    TitlePrincipal: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 17,
    },

    text: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
    },

    subText: {
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
    },


    // Imagens
    icon: {
        marginTop: 0,
    },
});
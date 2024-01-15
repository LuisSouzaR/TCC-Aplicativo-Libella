import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

import AntIcon from "react-native-vector-icons/AntDesign";

import AsyncStorage_ID from '@react-native-async-storage/async-storage';
import AsyncStorage_Paciente from '@react-native-async-storage/async-storage';

const FichaPacienteScreen = ({ navigation }) => {
    const [idPaciente, setIdPaciente] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [escolaridade, setEscolaridade] = useState('');
    const [ocupacao, setOcupacao] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [imgPaciente, setImgPaciente] = useState('');
    const [comando, setComando] = useState('Procurar por Id Paciente')


    const [timeOut, setTimeOut] = useState(10000);
    const [loading, setLoading] = useState(false);
    const [acess, setAcess] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        async function recuperarId() {
            const value = await AsyncStorage_Paciente.getItem("PacienteSelected")
            setIdPaciente(value)
        }
        recuperarId();
        getInformacoesBD();
    }, [idPaciente]);

    async function getInformacoesBD() {
        setLoading(true)
        var url = 'https://libellatcc.000webhostapp.com/getInformacoes/getPacientes.php';
        var wasServerTimeout = false;
        var timeout = setTimeout(() => {
            wasServerTimeout = true;
            setLoading(false);
            alert('Tempo de espera para busca de informações excedido');
        }, timeOut);

        const resposta = await fetch(url, {
            method: 'POST', //tipo de requisição
            body: JSON.stringify({ IdPaciente: idPaciente, Comando: comando }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                timeout && clearTimeout(timeout);
                if (!wasServerTimeout) {
                    return response.json();
                }
            })
            .then((responseJson) => {
                setNome(responseJson.paciente[0].NomePaciente)
                setEmail(responseJson.paciente[0].EmailPaciente)
                setEndereco(responseJson.paciente[0].EnderecoPaciente)
                setCidade(responseJson.paciente[0].CidadePaciente)
                setEstado(responseJson.paciente[0].EstadoPaciente)
                setTelefone(responseJson.paciente[0].TelefonePaciente)
                setEscolaridade(responseJson.paciente[0].EscolaridadePaciente)
                setOcupacao(responseJson.paciente[0].OcupacaoPaciente)
                setSintomas(responseJson.paciente[0].SintomasPaciente)
                setImgPaciente(responseJson.paciente[0].imagemUserPaciente);
            })

            .catch((error) => {
                timeout && clearTimeout(timeout);
                if (!wasServerTimeout) {
                    //Error logic here
                }
                //  alert('erro'+error)
            });
        setLoading(false)
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerProfile}>
                    <View style={styles.containerUserImg}>
                        <Image
                            style={styles.userImg}
                            source={{ uri: 'https://libellatcc.000webhostapp.com/imagens/' + imgPaciente }}
                        />
                    </View>
                    <View style={styles.containerName}>
                        <Text style={styles.name}>{nome}</Text>
                    </View>

                </View>
                <View style={styles.containerInfPessoais}>
                    <View style={styles.containerIcon}>

                        <AntIcon name="idcard" size={25} color={"black"} style={styles.icons} />

                    </View>
                    <View style={styles.containerInfPessoaisText}>
                        <Text style={styles.InfPessoaisText}>Informações Pessoais</Text>
                    </View>
                </View>
                {loading ? (
                    <View style={styles.containerContent}>
                        <View style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20,
                            gap: 20,
                        }}>
                            <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 22, color: 'black', }}>Aguarde, Carregando</Text>{/*Nome do Psicologo*/}
                            <ActivityIndicator size="large" color="#53A7D7" />
                        </View>
                    </View>
                ) : (
                    <View style={styles.containerContent}>

                        <View style={styles.containerInfBloco}>
                            <Text style={styles.Title}>Nome Completo</Text>
                            <Text style={styles.text}>{nome}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
                        </View>
                        <View style={styles.containerInfBloco}>
                            <Text style={styles.Title}>Email</Text>
                            <Text style={styles.text}>{email}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
                        </View>
                        <View style={styles.containerInfBloco}>
                            <Text style={styles.Title}>Endereço</Text>
                            <Text style={styles.text}>{endereco}, {cidade}, {estado}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
                        </View>
                        <View style={styles.containerInfBloco}>
                            <Text style={styles.Title}>Telefone</Text>
                            <Text style={styles.text}>{telefone}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
                        </View>
                        <View style={styles.containerInfBloco}>
                            <Text style={styles.Title}>Escolaridade</Text>
                            <Text style={styles.text}>{escolaridade}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
                        </View>
                        <View style={styles.containerInfBloco}>
                            <Text style={styles.Title}>Ocupação</Text>
                            <Text style={styles.text}>{ocupacao}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
                        </View>
                        <View style={styles.containerInfBloco}>
                            <Text style={styles.Title}>Sintomas</Text>
                            <Text style={styles.text}>{sintomas}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

export default FichaPacienteScreen;

const styles = StyleSheet.create({

    // Containers
    container: { // Container Principal
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        top: 0,
        backgroundColor: '#F2F2F2',
        color: 'white',
    },

    containerProfile: { //Container de cima do perfil: FOTO + NOME
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        gap: 30,
    },

    containerUserImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerName: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    containerInfPessoais: { // Container Titilo "Informações pessoais"
        width: '90%',
        height: '10%',
        flexDirection: 'row',
    },

    containerIcon: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    containerInfPessoaisText: {
        flex: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    containerContent: {
        width: '90%',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        gap: 15,
        borderRadius: 15,
        marginBottom: 100,
    },

    containerInfBloco: {
        width: '100%',
        gap: 5,
    },




    // Textos
    name: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 22,
        marginTop: 5,
    },

    InfPessoaisText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 15,
        marginTop: 5,
    },

    Title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
    },

    text: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
    },




    // Imagens
    userImg: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#6b6b6b',
    },
},
);
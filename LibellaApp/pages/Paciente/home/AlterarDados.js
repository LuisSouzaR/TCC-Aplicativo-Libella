import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, TextInput } from "react-native";

import AntIcon from "react-native-vector-icons/AntDesign";

import AsyncStorage_ID from '@react-native-async-storage/async-storage';

import { LinearGradient } from 'expo-linear-gradient';

import { TextInputMask } from 'react-native-masked-text';

const AlterarDadosScreen = ({ navigation }) => {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [escolaridade, setEscolaridade] = useState('');
    const [ocupacao, setOcupacao] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [endereco, setEndereco] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [comando, setComando] = useState('Procurar por Id Paciente');

    const [timeOut, setTimeOut] = useState(10000);
    const [loading, setLoading] = useState(false);
    const [acess, setAcess] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        async function recuperarIdPaciente() {
            const value = await AsyncStorage_ID.getItem('IdPaciente')
            setId(value)
        }
        recuperarIdPaciente()
        getInformacoesBD()
    }, [id]);
    async function getInformacoesBD() {
        setLoading(true);
        var url = 'https://libellatcc.000webhostapp.com/getInformacoes/getPacientes.php';
        var wasServerTimeout = false;
        var timeout = setTimeout(() => {
            wasServerTimeout = true;
            alert('Tempo de espera para busca de informações excedido');
        }, timeOut);

        const resposta = fetch(url, {
            method: 'POST', //tipo de requisição
            body: JSON.stringify({ IdPaciente: id, Comando: comando }),
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
                // Recolhendo as informações do banco de dados e salvando nas váriaveis
                setNome(responseJson.paciente[0].NomePaciente)
                setTelefone(responseJson.paciente[0].TelefonePaciente)
                setCpf(responseJson.paciente[0].CpfPaciente)
                setRg(responseJson.paciente[0].RgPaciente)
                setEscolaridade(responseJson.paciente[0].EscolaridadePaciente)
                setOcupacao(responseJson.paciente[0].OcupacaoPaciente)
                setSintomas(responseJson.paciente[0].SintomasPaciente)
                setEstado(responseJson.paciente[0].EstadoPaciente)
                setCidade(responseJson.paciente[0].CidadePaciente)
                setEndereco(responseJson.paciente[0].EnderecoPaciente)
                setEmail(responseJson.paciente[0].EmailPaciente)
                setSenha(responseJson.paciente[0].SenhaPaciente)
            })
            //se ocorrer erro na requisição ou conversão
            .catch((error) => {
                timeout && clearTimeout(timeout);
                if (!wasServerTimeout) {
                    Alert.alert("Alerta!", "Tempo de espera do servidor excedido!");
                }

            });
        setLoading(false);
    }

    // Habilitar edição dos campos com o botão
    const [showNome, setShowNome] = useState(false);
    const [showTelefone, setShowTelefone] = useState(false);
    const [showCpf, setShowCpf] = useState(false);
    const [showRg, setShowRg] = useState(false);
    const [showEscolaridade, setShowEscolaridade] = useState(false);
    const [showOcupacao, setShowOcupacao] = useState(false);
    const [showSintomas, setShowSintomas] = useState(false);
    const [showEndereco, setShowEndereco] = useState(false);
    const [showEstado, setShowEstado] = useState(false);
    const [showCidade, setShowCidade] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showSenha, setShowSenha] = useState(false);

    // Comando para dar toggle nos campos
    const toggleNome = () => {
        setShowNome(!showNome);
    };
    const toggleTelefone = () => {
        setShowTelefone(!showTelefone);
    };
    const toggleCpf = () => {
        setShowCpf(!showCpf);
    };
    const toggleRg = () => {
        setShowRg(!showRg);
    };
    const toggleEscolaridade = () => {
        setShowEscolaridade(!showEscolaridade);
    };
    const toggleOcupacao = () => {
        setShowOcupacao(!showOcupacao);
    };
    const toggleSintomas = () => {
        setShowSintomas(!showSintomas);
    };
    const toggleEndereco = () => {
        setShowEndereco(!showEndereco);
    };
    const toggleCidade = () => {
        setShowCidade(!showCidade);
    };
    const toggleEstado = () => {
        setShowEstado(!showEstado);
    };
    const toggleEmail = () => {
        setShowEmail(!showEmail);
    };
    const toggleSenha = () => {
        setShowSenha(!showSenha);
    };

    // Função para salvar dados alterados
    async function salvar() {
        if (nome == "" || telefone == "" || cpf == "" || rg == "" || escolaridade == "" || ocupacao == "" || sintomas == "" || endereco == "" || email == "" || senha == "" || cidade == "" || estado == "") {
            alert("Erro: Preencha todos os campos!")
        }
        else if (telefone.length < 14) {
            Alert.alert("Alerta de dados incorretos!", "Telefone inserido inválido")
        }
        else if (cpf.length < 14) {
            Alert.alert("Alerta de dados incorretos!", "CPF inserido inválido")
        }
        else if (rg.length < 12) {
            Alert.alert("Alerta de dados incorretos!", "RG inserido inválido")
        }
        else {
            var url = 'https://libellatcc.000webhostapp.com/Funcionalidades/AlterarDados.php';
            var wasServerTimeout = false;
            var timeout = setTimeout(() => {
                wasServerTimeout = true;
                alert('Tempo de espera para busca de informações excedido');
            }, timeOut);

            const resposta = await fetch(url, {
                method: 'POST', //tipo de requisição
                body: JSON.stringify({ IdPaciente: id, NomePaciente: nome, TelefonePaciente: telefone, CpfPaciente: cpf, RgPaciente: rg, EscolaridadePaciente: escolaridade, OcupacaoPaciente: ocupacao, SintomasPaciente: sintomas, CidadePaciente: cidade, EstadoPaciente: estado, EnderecoPaciente: endereco, EmailPaciente: email, SenhaPaciente: senha }),
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
                    var mensagem = responseJson.informacoes[0].msg

                    if (mensagem == "Informações alteradas com sucesso") {
                        Alert.alert("Alteração concluida!", "Alteração realizado com sucesso");
                        setShowNome(false);
                        setShowTelefone(false);
                        setShowCpf(false);
                        setShowRg(false);
                        setShowEscolaridade(false);
                        setShowOcupacao(false);
                        setShowSintomas(false);
                        setShowEndereco(false);
                        setShowCidade(false);
                        setShowEstado(false);
                        setShowEmail(false);
                        setShowSenha(false);
                        navigation.navigate('Configurações')
                    }

                    else {
                        // Aviso de Erro dados inseridos incorretos
                        Alert.alert("Erro!", "Revise os dados inseridos!");
                    }
                })
                //se ocorrer erro na requisição ou conversão
                .catch((error) => {
                    timeout && clearTimeout(timeout);
                    if (!wasServerTimeout) {
                        Alert.alert("Alerta!", "Tempo de espera do servidor excedido!");
                    }

                });
        }
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerInfPessoais}>
                    <View style={styles.containerIcon}>
                        <AntIcon name="idcard" size={25} color={"black"} style={styles.icons} />
                    </View>
                    <View style={styles.containerInfPessoaisText}>
                        <Text style={styles.InfPessoaisText}>Informações Pessoais</Text>
                    </View>
                </View>
                <View style={styles.containerContent}>
                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Nome Completo</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Nome"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setNome(text)}
                                value={nome}
                                editable={showNome}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleNome()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Escolaridade</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Escolaridade"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setEscolaridade(text)}
                                value={escolaridade}
                                editable={showEscolaridade}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleNome()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Ocupação</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Ocupação"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setOcupacao(text)}
                                value={ocupacao}
                                editable={showOcupacao}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleNome()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Sintomas</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Sintomas"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setSintomas(text)}
                                value={sintomas}
                                editable={showSintomas}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleNome()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>CPF</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInputMask
                                style={styles.containerText}
                                placeholder="CPF"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setCpf(text)}
                                value={cpf}
                                keyboardType={'phone-pad'}
                                type={'cpf'}
                                editable={showCpf}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleCpf()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>RG</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInputMask
                                style={styles.containerText}
                                placeholder="RG"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setRg(text)}
                                value={rg}
                                keyboardType={'phone-pad'}
                                type={'custom'}
                                options={{
                                    mask: '99.999.999-9',
                                }}
                                editable={showRg}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleRg()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Email</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Email"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                editable={showEmail}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleEmail()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Senha</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Senha"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setSenha(text)}
                                value={senha}
                                editable={showSenha}
                                secureTextEntry={!showSenha}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleSenha()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Endereço</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Endereço"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setEndereco(text)}
                                value={endereco}
                                editable={showEndereco}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleEndereco()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Cidade</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Cidade"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setCidade(text)}
                                value={cidade}
                                editable={showCidade}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleCidade()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Estado</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInput
                                style={styles.containerText}
                                placeholder="Estado"
                                placeholderTextColor="#616161"
                                onChangeText={(text) => setEstado(text)}
                                value={estado}
                                editable={showEstado}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleEstado()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.containerInfBloco}>
                        <Text style={styles.Title}>Telefone</Text>
                        <View style={styles.containerInfBlocoText}>
                            <TextInputMask
                                style={styles.containerText}
                                placeholder="Telefone"
                                placeholderTextColor="#616161"
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                onChangeText={(text) => setTelefone(text)}
                                value={telefone}
                                keyboardType={'phone-pad'}
                                editable={showTelefone}
                            />
                            <TouchableOpacity style={styles.containerIconText} onPress={() => toggleTelefone()}>
                                <AntIcon name="edit" size={20} color={"black"} style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => salvar()}>
                        <LinearGradient
                            colors={['#764DCC', '#4A2794']}
                            style={styles.button}>
                            <Text style={styles.textButton}>
                                SALVAR
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default AlterarDadosScreen;

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
        height: '15%',
        flexDirection: 'row',
        gap: 30,
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
        marginBottom: 60,
        alignItems: 'center'
    },

    containerInfBloco: {
        width: '100%',
        gap: 5,
    },

    containerText: {
        flexDirection: 'row',
        width: '80%',
    },

    containerIconText: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerInfBlocoText: {
        flexDirection: 'row',
    },


    // Botão
    button: {
        width: 150,
        height: 40,
        borderRadius: 30,
        fontWeight: "bold",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    // Textos
    name: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 22,
        marginTop: 5,
    },

    InfPessoaisText: {
        fontFamily: 'Comfortaa_700Bold',
        fontSize: 19,
        marginBottom: 2,
    },

    Title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 15,
    },

    text: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 13,
    },

    textButton: {
        textAlign: 'center',
        color: '#EBF8F5',
        fontSize: 15,
        lineHeight: 25,
    },
},
);
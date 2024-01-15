import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, Alert, ActivityIndicator, Touchable, TouchableOpacity } from "react-native";

import FeatherIcon from 'react-native-vector-icons/Feather'
import AntIcon from "react-native-vector-icons/AntDesign";

import AsyncStorage_Paciente from '@react-native-async-storage/async-storage';

const PerfilPCScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [crp, setCrp] = useState('');
  const [endereco, setEndereco] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [imgPsicologo, setImgPsicologo] = useState('');
  const [comando, setComando] = useState('Procurar por Id Psicologo');


  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_Paciente.getItem('IdPsicologo')
      setId(value)
    }
    recuperarId()
    getInformacoesBD()
  }, [id]);
  async function getInformacoesBD() {
    setLoading(true);
    var url = 'https://libellatcc.000webhostapp.com/getInformacoes/getPsicologos.php';
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      alert('Tempo de espera para busca de informações excedido');
    }, timeOut);

    const resposta = fetch(url, {
      method: 'POST', //tipo de requisição
      body: JSON.stringify({ IdPsicologo: id, Comando: comando }),
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
        console.log(id)
        console.log(responseJson)
        setNome(responseJson.psicologo[0].NomePsicologo)
        setTelefone(responseJson.psicologo[0].TelefonePsicologo)
        setCpf(responseJson.psicologo[0].CpfPsicologo)
        setRg(responseJson.psicologo[0].RgPsicologo)
        setCrp(responseJson.psicologo[0].CrpPsicologo)
        setEstado(responseJson.psicologo[0].EstadoPsicologo)
        setCidade(responseJson.psicologo[0].CidadePsicologo)
        setEndereco(responseJson.psicologo[0].EnderecoPsicologo)
        setEmail(responseJson.psicologo[0].EmailPsicologo)
        setImgPsicologo(responseJson.psicologo[0].imagemUserPsicologo)
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

  return (
    <View>
      {loading ? (
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
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerProfile}>
              <View style={styles.containerUser}>
                <Image
                  style={styles.userImg}
                  source={{ uri: 'https://libellatcc.000webhostapp.com/imagens/' + imgPsicologo}}
                />
              </View>
              <View style={styles.containerName}>
                <Text style={styles.name}>{nome}</Text>{/*Nome do Psicologo*/}
                <TouchableOpacity onPress={() => navigation.navigate('AlterarDados')}>
                  <FeatherIcon
                    name="edit"
                    size={20}
                    color={"black"}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerInfos}>
              <Text style={styles.TitlePrincipal}>Informações pessoais</Text>


              {/*Container do CRP*/}
              <View style={styles.containerInfosBloco}>
                <Text style={styles.subtitle}>CRP:</Text>
                <Text style={styles.text}>{crp}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
              </View>

              {/*Container do CPF*/}
              <View style={styles.containerInfosBloco}>
                <Text style={styles.subtitle}>CPF:</Text>
                <Text style={styles.text}>{cpf}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
              </View>

              {/*Container do RG*/}
              <View style={styles.containerInfosBloco}>
                <Text style={styles.subtitle}>RG:</Text>
                <Text style={styles.text}>{rg}</Text>{/*Esse texto vai mudar de acordo com o Banco de dados*/}
              </View>
              <Text style={styles.TitlePrincipal}>Contato</Text>
              <View style={styles.containerInfosBloco}>
                <View style={styles.containerIcon}>
                  <FeatherIcon
                    name="mail"
                    size={20}
                    color={"black"}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>{email}</Text>{/*Email do Psicologo*/}
              </View>
              <View style={styles.containerInfosBloco}>
                <View style={styles.containerIcon}>
                  <FeatherIcon
                    name="phone"
                    size={20}
                    color={"black"}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>{telefone}</Text>{/*Telefone do Psicologo*/}
              </View>
              <Text style={styles.TitlePrincipal}>Consultório</Text>
              <View style={styles.containerInfosBloco}>
                <View style={styles.containerIcon}>
                  <FeatherIcon
                    name="map-pin"
                    size={20}
                    color={"black"}
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>{endereco}, {cidade}, {estado}</Text>{/*Endereço do Psicologo*/}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>


  );
}

export default PerfilPCScreen;

const styles = StyleSheet.create({

  // Containers
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    top: 5,
    gap: 20,
    backgroundColor: '#F2F2F2',
    color: 'white',
  },

  containerLoading: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    color: 'white',
  },

  containerProfile: {
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    gap: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: "gray",
    elevation: 3,
  },

  containerUser: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerName: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },

  containerInfos: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    paddingLeft: 30,
    borderRadius: 10,
    gap: 15,
    shadowColor: "gray",
    elevation: 3,
  },

  containerInfosBloco: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 0,
    paddingRight: 50,
  },

  containerIcon: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },




  // Textos
  name: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 22,
    color: 'black',
  },

  TitlePrincipal: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    color: '#6D45C2',
  },

  text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    color: 'black',
    textAlign: 'justify',
  },

  subtitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    color: 'black',
  },



  // Imagens
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#6b6b6b',
  },

  icon: {
    marginBottom: 5,
  },
});
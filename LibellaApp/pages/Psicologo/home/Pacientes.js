import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";

import TabContainer from "../../../components/navigation/Psicologo/BottomTab/TabContainer";

// async storage
import AsyncStorage_ID from '@react-native-async-storage/async-storage';
import AsyncStorage_Paciente from '@react-native-async-storage/async-storage';

function PacientesPage({ navigation }) {
  const [id, setId] = useState('');
  const [idPsicologo, setIdPsicologo] = useState(0);
  const [resposta, setResposta] = useState('');
  const [comando, setComando] = useState('Procurar por Id Psicologo');

  const [listaInfo, setListaInfo] = useState([]);

  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState(10000);
  const [viewLista, setViewLista] = useState(true);

  async function save(key, value) {
    AsyncStorage_Paciente.setItem(key, value)
  }
  
  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_ID.getItem('IdPsicologo')
      setIdPsicologo(value)
    }
    recuperarId()
    getInformacoesBD()
  }, [idPsicologo]); 
  async function getInformacoesBD() {
    setLoading(true)
    var url = 'https://libellatcc.000webhostapp.com/getInformacoes/getPacientes.php';
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      setLoading(false);
      // alert('Tempo de espera para busca de informações excedido');
    }, timeOut);

    const resposta = await fetch(url, {
      method: 'POST', //tipo de requisição
      body: JSON.stringify({ IdPsicologo: idPsicologo, Comando: comando }),
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
        setResposta(responseJson.paciente[0].resposta);
        setListaInfo([]);
        for (var i = 0; i < responseJson.paciente.length; i++) {
          setListaInfo((listaInfo) => {
            const list = [
              ...listaInfo,
              {
                nome: responseJson.paciente[i].NomePaciente,
                id: responseJson.paciente[i].IdPaciente,
                img: responseJson.paciente[i].imagemUserPaciente,
              },
            ];
            return list;
          });
        }
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

  function clickItemFlatList(item) {
    save("PacienteSelected", item.id)
    navigation.navigate('PerfilPaciente')
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerRecarregar}>
        <TouchableOpacity onPress={() => getInformacoesBD()}>
          <Text style={styles.textButton}>Recarregar</Text>
        </TouchableOpacity>
      </View>
      {resposta == 'informação recebida' ? (
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '90%',
        }}>
          <FlatList
            data={listaInfo}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => clickItemFlatList(item)}>
                <View style={styles.pacienteContainer}>
                  <Image
                    style={styles.userImg}
                    source={{ uri: 'https://libellatcc.000webhostapp.com/imagens/' + item.img}}
                  />
                  <Text style={styles.text}> {item.nome} </Text>
                  <EntypoIcon name="chevron-thin-right" size={22} color={"black"} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        null
      )}
    </View>
  );
};

export default PacientesPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "flex-start",
    color: "white",
  },

  pacienteContainer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    alignItems: "center",
    borderRadius: 7,
    paddingVertical: 15,
    paddingHorizontal: 30,
    merginBottom: 30,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 15,
  },

  containerRecarregar: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingRight: 20,
  },

  text: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    marginTop: 5,
  },

  textButton: {
    fontSize: 17,
    fontFamily: 'Comfortaa_500Medium',
    color: '#4A2794',
  },

  textLoading: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    marginTop: 5,
  },

  userImg: {
    width: 52,
    height: 52,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#6b6b6b',
  },

});
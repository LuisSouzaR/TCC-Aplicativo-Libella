import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";

import AsyncStorage_ID from '@react-native-async-storage/async-storage';
import AsyncStorage_Paciente from '@react-native-async-storage/async-storage';
import AsyncStorage_Atividade from '@react-native-async-storage/async-storage';

function AtividadesScreen({ navigation }) {
  const [data, setData] = useState('');

  const [resposta, setResposta] = useState('');

  const [idPaciente, setIdPaciente] = useState('');
  const [idAtvidade, setIdAtividade] = useState('');
  const [tituloAtividade, setTituloAtividade] = useState('');
  const [entregaAtividade, setEntregaAtividade] = useState('');
  const [listaInfo, setListaInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeOut, setTimeOut] = useState(50000);
  const [viewLista, setViewLista] = useState(true);

  async function save(key, value) {
    AsyncStorage_Atividade.setItem(key, value)
  }
  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_Paciente.getItem('PacienteSelected')
      setIdPaciente(value)
    }
    recuperarId()
    getInformacoesBD()
  }, [idPaciente]);

  async function getInformacoesBD() {
    setLoading(true)
    var url = 'https://libellatcc.000webhostapp.com/getInformacoes/getAtividades.php';
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      setLoading(false);
      alert('Tempo de espera para busca de informações excedido');
    }, timeOut);

    const resposta = await fetch(url, {
      method: 'POST', //tipo de requisição
      body: JSON.stringify({ IdPaciente: idPaciente }),
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
        setResposta(responseJson.atividade[0].resposta);
        setListaInfo([]);
        for (var i = 0; i < responseJson.atividade.length; i++) {
          setListaInfo((listaInfo) => {
            const list = [
              ...listaInfo,
              {
                nome: responseJson.atividade[i].TituloAtividade,
                id: responseJson.atividade[i].IdAtividade,
                data: responseJson.atividade[i].EntregaAtividade,
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
    save("AtividadeSelected", item.id)
    navigation.navigate('AtividadeEsp')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={() => listar()}>
        <FeatherIcon name="filter" size={18} color={"black"} opacity={0.4} />
        <Text style={styles.texto}>Recentes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.AddButton} onPress={() => navigation.navigate('AtribuirAtividade')}>
          <Text style={styles.Addtext}>+</Text>
        </TouchableOpacity>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '90%',
      }}>
        {resposta == 'informacao recebida' ? (
          <FlatList
            data={listaInfo}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => clickItemFlatList(item)} style={styles.atividadeContainer}>
                  <View style={{ flexDirection: 'column', gap: 8, }}>
                    <Text style={styles.titulo}>{item.nome}</Text>
                    <Text style={styles.texto}> Entrega no dia: {item.data}</Text>
                  </View>
                  <EntypoIcon name="chevron-thin-right" size={22} color={"black"} />
                </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.containerMsg}>
            <Text style={styles.msg}>Nenhuma atividade atribuida a este paciente</Text>
            <View style={styles.containerImg}>
              <Image
                style={styles.img}
                source={require("../../../assets/img/Home/NoAtividade.png")}
              />
            </View>
            <TouchableOpacity onPress={() => getInformacoesBD()}>
              <Text style={styles.textButton}>Recarregar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/*
      <TouchableOpacity style={styles.AddAtvContainer} onPress={() => navigation.navigate('AtribuirAtividade')}>
        <Text style={styles.AddText}>+</Text>
      </TouchableOpacity>
      */}
    </View>
  );
};

export default AtividadesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 60,
    gap: 27,
    paddingHorizontal: 20,
  },

  atividadeContainer: {
    height: 80,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 95,
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 30,
    merginBottom: 30,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 15,
  },

  containerMsg: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    gap: 20,
  },

  containerImg: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    gap: 30,
    shadowColor: "gray",
    elevation: 5,
    backgroundColor: 'red',
  },

  AddButton: {
    right: 20,
    top: 500,
    height: 70,
    width: 70,
    backgroundColor: '#53A7D7',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },

  Addtext: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Poppins_400Regular',
    marginTop: 8,
  },

  texto: {
    fontSize: 14,
    color: '#3F3E3E',
    opacity: 0.7,
    fontFamily: 'Comfortaa_500Medium',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#313131'
  },

  msg: {
    fontSize: 20,
    paddingHorizontal: 30,
    color: '#191919',
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
  },

  textButton: {
    fontSize: 15,
    fontFamily: 'Comfortaa_500Medium',
    color: '#4A2794',
  },

  //Imagens
  img: {
    width: 233,
    height: 233,
  },
});
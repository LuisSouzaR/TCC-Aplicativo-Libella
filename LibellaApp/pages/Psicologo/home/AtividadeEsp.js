import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";


import EntypoIcon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage_Atividade from '@react-native-async-storage/async-storage';

const AtividadeEspPage = ({ navigation }) => {
  const [idAtividade, setIdAtividade] = useState('');
  const [tituloAtividade, setTituloAtividade] = useState('');
  const [entregaAtividade, setEntregaAtividade] = useState('');
  const [horarioAtividade, setHorarioAtividade] = useState('');
  const [instrucoesAtividade, setInstrucoesAtividade] = useState('');

  const [loading, setLoading] = useState(true);
  const [timeOut, setTimeOut] = useState(50000);
  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_Atividade.getItem('AtividadeSelected')
      setIdAtividade(value)
    }
    recuperarId()
    getInformacoesBD()
  }, [idAtividade]);

  async function getInformacoesBD() {
    setLoading(true);
    var url =
      "https://libellatcc.000webhostapp.com/getInformacoes/getAtividadeEsp.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      setLoading(false);
      alert("Tempo de espera para busca de informações excedido");
    }, timeOut);

    const resposta = await fetch(url, {
      method: "POST", //tipo de requisição
      body: JSON.stringify({ 
        IdAtividade: idAtividade,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          return response.json();
        }
      })
      .then((responseJson) => {
        setTituloAtividade(responseJson.atividade[0].TituloAtividade);
        setEntregaAtividade(responseJson.atividade[0].EntregaAtividade);
        setHorarioAtividade(responseJson.atividade[0].HorarioAtividade);
        setInstrucoesAtividade(responseJson.atividade[0].InstrucoesAtividade);
      })

      .catch((error) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          //Error logic here
        }
        //  alert('erro'+error)
      });
    setLoading(false);
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntIcon name="arrowleft" size={23} color={'white'} style={{marginBottom:25}}/>
        </TouchableOpacity>

        <View style={styles.card}>

        <View style={{gap: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Text style={styles.titulo}>{tituloAtividade}</Text>
                <MaterialCommunityIcon  name="square-edit-outline" size={23} color={'#6D45C2'}/>
            </View>
            <Text style={{color:'#313131', opacity: 0.4}}>Vence dia {entregaAtividade} às {horarioAtividade}</Text>
        </View>
            <View style={{gap: 8}}>
                <Text style={styles.subTitulo}>Instruções</Text>
                <Text style={styles.texto}>{instrucoesAtividade}</Text>

                <View style={styles.imgViewer}>
                <IonIcon  name="image-outline" size={23} color={'#313131'}/>
                <Text>RodaVida.png</Text>
                </View>
            </View>
            
            <View style={{gap: 8, width: '100%'}}>
                <Text style={styles.subTitulo}>Trabalho</Text>
                <Text style={{alignSelf: 'center', color: '#6C4CB0'}}>Ainda não enviado</Text>
            </View>
           
        </View>
    </View>
  );
};

export default AtividadeEspPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#53A7D7",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    gap: 30,
    shadowColor: "gray",
    elevation: 5,
  },
  texto: {
    fontSize: 14,
    color: "#313131",
    textAlign: 'justify'
  },
  subTitulo: {
    fontSize: 14,
    color: "#313131",
    opacity: 0.3,
    fontWeight: '800',
  },
  titulo: {
    fontSize: 20,
    color: "#313131",
  },
  imgViewer: {
    backgroundColor: '#E6E6E6', 
    paddingVertical:7, 
    paddingHorizontal: 14, 
    width: 285, 
    alignSelf: 'center', 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 11,
    borderRadius: 10,
    marginTop: 10,
  },
});
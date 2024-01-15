import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Hr, } from "react-native";

import AsyncStorage_Paciente from '@react-native-async-storage/async-storage';

const PerfilScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [imgPaciente, setImgPaciente] = useState('');
  const [comando, setComando] = useState('Procurar por Id Paciente');


  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_Paciente.getItem('IdPaciente')
      setId(value)
    }
    recuperarId()
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
        setImgPaciente(responseJson.paciente[0].imagemUserPaciente)
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
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.userImg}
          source={{ uri: 'https://libellatcc.000webhostapp.com/imagens/' + imgPaciente}}
        />
        <Text style={styles.text}>{nome}</Text>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProgressoPC")}
        >
          <Text style={styles.textButton}>Progresso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AgendaPC")}
        >
          <Text style={styles.textButton}>Consultas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    top: 0,
    backgroundColor: "#F2F2F2",
    color: "white",
    gap: 30,
  },

  card: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 25,
    gap: 10,
    borderRadius: 10,
    shadowColor: "gray",
    elevation: 5,
  },

  containerUser: {
    width: "100%",
    display: "flex",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  containerName: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    color: "black",
    fontFamily: 'Poppins_500Medium'
  },

  textButton: {
    fontSize: 18,
    color: "white",
    fontFamily: 'Poppins_500Medium'
  },

  containerButtons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
  },

  button: {
    backgroundColor: "#6D45C2",
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    fontWeight: "bold",
    alignItems: 'center'
  },

  userImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#6b6b6b',
  },

  containerProgress: {
    backgroundColor: "white",
    height: "30%",
    width: "100%",
    borderRadius: 10,
    marginTop: 5,
  },

  containerSchedule: {
    backgroundColor: "white",
    height: "30%",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
});

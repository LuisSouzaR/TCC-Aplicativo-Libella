import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

import AsyncStorage_Paciente from "@react-native-async-storage/async-storage";

import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

const RegistroEmocoesScreen = ({ navigation }) => {
  const [idPaciente, setIdPaciente] = useState("");

  const [registros, setRegistros] = useState([]);

  const [loading, setLoading] = useState(true);
  const [timeOut, setTimeOut] = useState(50000);
  const [viewLista, setViewLista] = useState(true);

  const clickItemFlatList = (item) => {};

  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_Paciente.getItem("PacienteSelected");
      setIdPaciente(value);
    }
    recuperarId();
    getRegistros();
  }, [idPaciente]);

  async function getRegistros() {
    setLoading(true);
    var url =
      "https://libellatcc.000webhostapp.com/getInformacoes/getRegistros.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      setLoading(false);
      alert("Tempo de espera para busca de informações excedido");
    }, timeOut);

    const resposta = await fetch(url, {
      method: "POST", //tipo de requisição
      body: JSON.stringify({
        IdPaciente: idPaciente,
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
        setRegistros([]);
        for (var i = 0; i < responseJson.registros.length; i++) {
          setRegistros((listaInfo) => {
            const list = [
              ...listaInfo,
              {
                registro: responseJson.registros[i].Registro,
                data: responseJson.registros[i].Data,
                anotacoes: responseJson.registros[i].Anotacoes,
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
        console.log(error);
      });
    setLoading(false);
  }

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}/${month}`;
  };

  return (
    <View style={{ padding: 11 }}>
      {loading ? (
        <View style={styles.container}>
          <Text style={styles.textLoading}>
            Aguarde, obtendo informações...
          </Text>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.exibitionContainer}>
            <Text style={styles.textExibition}>Registros</Text>
          </View>

          <View style={{ display: "flex" }}>
            <FlatList
              data={registros}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  {item.registro == 1 ? (
                    <Image
                      style={styles.emotionIcon}
                      source={require("../../../assets/icons/IconHorrivel.png")}
                    />
                  ) : item.registro == 2 ? (
                    <Image
                      style={styles.emotionIcon}
                      source={require("../../../assets/icons/IconMal.png")}
                    />
                  ) : item.registro == 3 ? (
                    <Image
                      style={styles.emotionIcon}
                      source={require("../../../assets/icons/IconNeutro.png")}
                    />
                  ) : item.registro == 4 ? (
                    <Image
                      style={styles.emotionIcon}
                      source={require("../../../assets/icons/IconFeliz.png")}
                    />
                  ) : (
                    <Image
                      style={styles.emotionIcon}
                      source={require("../../../assets/icons/IconAnimado.png")}
                    />
                  )}
                  <View style={{ width: 180 }}>
                    <Text style={styles.text}>{item.anotacoes}</Text>
                  </View>
                  <Text style={styles.textData}>{formatDate(item.data)}</Text>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default RegistroEmocoesScreen;

const styles = StyleSheet.create({
  //Containers
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F2F2F2",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },

  exibitionContainer: {
    width: "100%",
    height: 40,
    top: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  containerData: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },

  card: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "gray",
    elevation: 5,
    marginBottom: 20,
  },

  // Textos
  textData: {
    color: "#31313140",
    fontFamily: "Poppins_500Medium",
  },

  text: {
    color: "#313131",
    fontFamily: "Poppins_400Regular",
    textAlign: "justify",
  },

  emotionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },

  textExibition: {
    color: "#6D45C2",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
});

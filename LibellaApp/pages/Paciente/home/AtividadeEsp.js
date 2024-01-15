import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import AsyncStorage_Atividade from "@react-native-async-storage/async-storage";

const AtividadeEspScreen = ({ navigation }) => {
  const [idAtividade, setIdAtividade] = useState("");
  const [tituloAtividade, setTituloAtividade] = useState("");
  const [entregaAtividade, setEntregaAtividade] = useState("");
  const [horarioAtividade, setHorarioAtividade] = useState("");
  const [instrucoesAtividade, setInstrucoesAtividade] = useState("");

  const [loading, setLoading] = useState(true);
  const [timeOut, setTimeOut] = useState(50000);
  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_Atividade.getItem("AtividadeSelected");
      setIdAtividade(value);
    }
    recuperarId();
    getInformacoesBD();
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
        <AntIcon
          name="arrowleft"
          size={23}
          color={"white"}
          style={{ marginBottom: 25 }}
        />
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={{ gap: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={styles.titulo}>{tituloAtividade}</Text>
          </View>
          <Text style={{ color: "#313131", opacity: 0.4 }}>
            Vence dia {entregaAtividade} às {horarioAtividade}
          </Text>
        </View>

        <View style={{ gap: 15 }}>
          <Text style={styles.subTitulo}>Instruções</Text>
          <Text style={styles.texto}>{instrucoesAtividade}</Text>

          <View style={styles.imgViewer}>
            <IonIcon name="image-outline" size={23} color={"#313131"} />
            <Text>RodaVida.png</Text>
          </View>

          <BouncyCheckbox
            size={20}
            fillColor="gray"
            unfillColor="#FFFFFF"
            text="Não irei realizar"
            iconStyle={{ borderColor: "black", borderRadius: 0 }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 0 }}
            textStyle={{
              fontFamily: "Poppins_400Regular",
              textDecorationLine: "none",
            }}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={styles.subTitulo}>Trabalho</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              gap: 5,
              justifyContent: "flex-start",
            }}
          >
            <FontAwesomeIcon name="paperclip" size={23} color={"#53A7D7"} />
            <Text
              style={[styles.texto, { color: "#53A7D7", fontWeight: "bold" }]}
            >
              Anexar
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Entregar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AtividadeEspScreen;

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
    textAlign: "justify",
  },
  subTitulo: {
    fontSize: 14,
    color: "#313131",
    opacity: 0.3,
    fontWeight: "800",
  },
  titulo: {
    fontSize: 20,
    color: "#313131",
  },
  imgViewer: {
    backgroundColor: "#E6E6E6",
    paddingVertical: 7,
    paddingHorizontal: 14,
    width: 285,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6D45C2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    fontWeight: "bold",
    alignSelf: 'center'
  },
});

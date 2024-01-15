import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

import AntIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { format } from "date-fns";

import AsyncStorage_Paciente from '@react-native-async-storage/async-storage';

const TabButton = ({ toggleOpened, opened }) => {
  const animation = React.useRef(new Animated.Value(0)).current;

  const [modalVisible, setModalVisible] = useState(false);

  const [idPaciente, setIdPaciente] = useState(0);

  useEffect(() => {
    async function recuperarIdPaciente() {
      const value = await AsyncStorage_Paciente.getItem("IdPaciente");
      setIdPaciente(value);
    }
    recuperarIdPaciente();
    getInformacoesBD();
  }, [idPaciente]);

  // Text Input
  const [anotacoes, setAnotacoes] = useState();
  const [registro, setRegistro] = useState();
  const [IdPsicologo, setIdPsicologo] = useState();
  const currentDate = format(new Date(), "yyyy-MM-dd");

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  const [botaoSelecionado, setBotaoSelecionado] = useState(null);

  const handlePress = (botao, reg) => {
    setBotaoSelecionado(botao);
    setRegistro(reg)
  };

  const isBotaoSelecionado = (botao) => botao === botaoSelecionado;

  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState(10000);

  async function getInformacoesBD() {
    var url = "https://libellatcc.000webhostapp.com/getInformacoes/getPacientes.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      // alert("Tempo de espera para busca de informações excedido");
    }, timeOut);

    const resposta = await fetch(url, {
      method: "POST", //tipo de requisição
      body: JSON.stringify({ IdPaciente: idPaciente, Comando: "Procurar por Id Paciente" }),
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
        // Recolhendo as informações do banco de dados e salvando nas váriaveis
        setIdPsicologo(responseJson.paciente[0].IdPsicologo);
        setLoading(false);
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

  async function registrar() {
    if (registro == "" || anotacoes == "" ) {
      Alert.alert("Erro", "Preencha todos os campos!");
    } 
    else {
      var url ="https://libellatcc.000webhostapp.com/Funcionalidades/RegistrarEm.php";
      var wasServerTimeout = false;
      var timeout = setTimeout(() => {
        wasServerTimeout = true;
        alert("Tempo de espera para busca de informações excedido");
      }, timeOut);

      const resposta = await fetch(url, {
        method: "POST", //tipo de requisição
        body: JSON.stringify({
          Registro: registro,
          Anotacoes: anotacoes,
          Data: currentDate,
          IdPsicologo: IdPsicologo,
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
          var mensagem = responseJson.informacoes[0].msg;
          if (mensagem == "Informações inseridas com sucesso") {
            Alert.alert("Pronto", "Sentimento Registrado com sucesso!");
          } else {
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
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 15 }}>
                Como você está se sentindo hoje?
              </Text>
              <TouchableWithoutFeedback
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntIcon name="close" size={25} color={"black"} />
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 7,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => handlePress("Feliz", 5)}>
                <View
                  style={[
                    styles.iconButton,
                    isBotaoSelecionado("Feliz") && styles.botaoSelecionado,
                  ]}
                >
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/icons/IconAnimado.png")}
                  />
                  <Text style={styles.iconText}>Feliz</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Bem", 4)}>
                <View style={[
                    styles.iconButton,
                    isBotaoSelecionado("Bem") && styles.botaoSelecionado,
                  ]}>
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/icons/IconFeliz.png")}
                  />
                  <Text style={styles.iconText}>Bem</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Neutro", 3)}>
                <View style={[
                    styles.iconButton,
                    isBotaoSelecionado("Neutro") && styles.botaoSelecionado,
                  ]}>
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/icons/IconNeutro.png")}
                  />
                  <Text style={styles.iconText}>Neutro</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Mal", 2)}>
                <View style={[
                    styles.iconButton,
                    isBotaoSelecionado("Mal") && styles.botaoSelecionado,
                  ]}>
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/icons/IconMal.png")}
                  />
                  <Text style={styles.iconText}>Mal</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePress("Horrivel", 1)}>
                <View style={[
                    styles.iconButton,
                    isBotaoSelecionado("Horrivel") && styles.botaoSelecionado,
                  ]}>
                  <Image
                    style={styles.icon}
                    source={require("../../../../assets/icons/IconHorrivel.png")}
                  />
                  <Text style={styles.iconText}>Horrível</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", gap: 5 }}>
              <Text style={{ fontFamily: "Poppins_500Medium" }}>Anotações</Text>
              <TextInput
                style={styles.input}
                placeholder="Escreva aqui..."
                value={anotacoes}
                onChangeText={(text) => setAnotacoes(text)}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => registrar()}>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Registrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.box}>
        {/*agendar sessão*/}
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -70],
                    }),
                  },
                ],
              },
            ]}
          >
            <FeatherIcon name="edit" size={23} color={"white"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/*botão add, animação*/}
        <TouchableWithoutFeedback
          onPress={toggleOpened}
          style={styles.addButton}
        >
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "45deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <AntIcon name="plus" size={30} color={"white"} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: 0,
  },
  box: {
    position: "relative",
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#53A7D7",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  item: {
    position: "absolute",
    top: 5,
    left: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#53A7D7",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    width: 350,
    alignItems: "center",
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "white",
    color: "black",
    width: "100%",
  },
  inputText: {
    color: "black",
    fontSize: 15,
    fontFamily: " Poppins_400Regular",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  iconText: {
    color: "black",
    fontSize: 15,
    fontFamily: "Poppins_300Light",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 9,
    backgroundColor: "#6D45C2",
    borderRadius: 10,
    alignSelf: "center",
  },
  botaoSelecionado: {
    borderWidth: 2,
    borderColor: '#53A7D7',
    borderRadius: 5,
    padding: 3,
  },
});

export default TabButton;

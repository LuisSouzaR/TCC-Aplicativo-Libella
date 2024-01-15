import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  LogBox
} from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import { LineChart } from "react-native-chart-kit";
import CircularProgress from "react-native-circular-progress-indicator";

import AsyncStorage_ID from "@react-native-async-storage/async-storage";
import AsyncStorage_Paciente from "@react-native-async-storage/async-storage";


LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);

function PerfilPacienteScreen({ navigation }) {
  const [value, setValue] = useState(0);
  const [idPaciente, setIdPaciente] = useState("");
  const [nome, setNome] = useState("");
  const [imgPaciente, setImgPaciente] = useState('');
  const [comando, setComando] = useState("Procurar por Id Paciente");

  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;
  const [registros, setRegistros] = useState([]);

  const [registrosEm, setRegistrosEm] = useState([]);

  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState("");

  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_Paciente.getItem("PacienteSelected");
      setIdPaciente(value);
    }
    recuperarId();
    getInformacoesBD();
    getGraficoEmInfo();
    getGraficoAtvInfo();
    getRegistros();
  }, [idPaciente]);

  async function getInformacoesBD() {
    setLoading(true);
    var url =
      "https://libellatcc.000webhostapp.com/getInformacoes/getPacientes.php";
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
        Comando: comando,
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
        setNome(responseJson.paciente[0].NomePaciente);
        setImgPaciente(responseJson.paciente[0].imagemUserPaciente);
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

  async function getGraficoEmInfo() {
    setLoading(true);
    var url =
      "https://libellatcc.000webhostapp.com/Funcionalidades/GraficoEm.php";
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
        Ano: ano,
        Mes: mes,
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
        const registrosInt = responseJson.Registros.map((value) => {
          return value !== null ? parseInt(value, 10) : null;
        });
        setRegistros(registrosInt);
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

  async function getGraficoAtvInfo() {
    setLoading(true);
    var url =
      "https://libellatcc.000webhostapp.com/Funcionalidades/GraficoAtv.php";
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
        setValue(responseJson.Porcentagem);
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

  async function getRegistros() {
    setLoading(true);
    var url = "https://libellatcc.000webhostapp.com/getInformacoes/getRegistros.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      setLoading(false);
      alert("Tempo de espera para busca de informações excedido");
    }, timeOut);
  
    try {
      const response = await fetch(url, {
        method: "POST", //tipo de requisição
        body: JSON.stringify({
          IdPaciente: idPaciente,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      timeout && clearTimeout(timeout);
  
      if (!wasServerTimeout) {
        const responseJson = await response.json();
  
        if (responseJson.registros && responseJson.registros.length > 0) {
          setResposta(responseJson.registros[0].resposta);
          setRegistrosEm([]);
          
          // Use Math.min para garantir que o loop não ultrapasse o tamanho do array
          for (var i = 0; i < Math.min(2, responseJson.registros.length); i++) {
            setRegistrosEm((listaInfo) => {
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
        } else {
          console.error("Resposta do servidor não contém registros válidos.");
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerUser}>
          <Image
            style={styles.userImg}
            source={{ uri: 'https://libellatcc.000webhostapp.com/imagens/' + imgPaciente}}
          />
          <View style={styles.containerName}>
            <Text style={styles.textName}>{nome}</Text>
            <View style={styles.containerButtons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Atividades")}
              >
                <Text style={{ color: "white", fontSize: 15 }}>Atividades</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("FichaPaciente")}
              >
                <Text style={{ color: "white", fontSize: 15 }}>Ficha</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.titulo}>Gráfico de Humor</Text>
          <LineChart
            data={{
              labels: [1, 5, 9, 13, 17, 21, 25, 29],
              datasets: [
                {
                  data: registros,
                },
              ],
            }}
            width={Dimensions.get("window").width - 65} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity) => `#B9B9B9`,
              labelColor: (opacity = 1) => `black`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "0.5",
                stroke: "#B9B9B9",
              },
              barPercentage: 5,
            }}
            withHorizontalLabels={false}
            withInnerLines={true}
            withShadow={false}
            withOuterLines={false}
            getDotColor={(dataPoint, dataPointIndex) => {
              if (dataPoint == 5) {
                return "#07E437";
              } else if (dataPoint == 4) {
                return "#15A635";
              } else if (dataPoint == 3) {
                return "#2AB2DD";
              } else if (dataPoint == 2) {
                return "#F0880D";
              } else if (dataPoint == 1) {
                return "#F01B0D";
              }
            }}
          />
          <View style={styles.icons}>
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/IconAnimado.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/IconFeliz.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/IconNeutro.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/IconMal.png")}
            />
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/IconHorrivel.png")}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.titulo}>Atividades Realizadas</Text>
          <CircularProgress
            radius={90}
            value={value}
            textColor="#222"
            valueSuffix={"%"}
            activeStrokeColor="#53A7D7"
            inActiveStrokeColor={"gray"}
            inActiveStrokeOpacity={0.2}
            duration={3000}
          />
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegistroEmocoes")}
            style={{
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text style={styles.titulo}>Registro de Emoções</Text>
            <FeatherIcon name="chevron-right" size={20} color={"#6D45C2"} />
          </TouchableOpacity>

            
          {resposta == "informação recebida" ? (
            <FlatList
              data={registrosEm}
              renderItem={({ item }) => (
                <View style={styles.emotionCard}>
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
                  <View style={{ width: 160 }}>
                    <Text style={styles.text}>{item.anotacoes}</Text>
                  </View>
                  <Text style={styles.textData}>{formatDate(item.data)}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.text}>Não há registros!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default PerfilPacienteScreen;

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

  containerUser: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    shadowColor: "gray",
    elevation: 5,
  },

  containerName: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  textName: {
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
    color: "black",
    fontWeight: "bold",
  },

  containerButtons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 25,
  },

  button: {
    backgroundColor: "#6D45C2",
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 15,
    fontWeight: "bold",
  },

  userImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#6b6b6b',
  },

  card: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    gap: 25,
    shadowColor: "gray",
    elevation: 5,
    width: "100%",
  },
  icons: {
    height: 0,
    position: "relative",
    display: "flex",
    gap: 15,
    top: -245,
    left: -135,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "#6D45C2",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  emotionCard: {
    width: "99%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#E6E6E6",
    padding: 15,
    borderRadius: 10,
  },
  emotionIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  text: {
    color: "#313131",
    fontFamily: "Poppins_400Regular",
    textAlign: "justify",
  },
  textData: {
    fontFamily: "Poppins_400Regular",
    alignSelf: "flex-end",
    color: "#A0A0A0",
  },
});

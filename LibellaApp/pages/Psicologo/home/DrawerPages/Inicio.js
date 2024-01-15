import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";

import TabContainer from "../../../../components/navigation/Psicologo/BottomTab/TabContainer";

import AsyncStorage_ID from "@react-native-async-storage/async-storage";
import AsyncStorage_Paciente from '@react-native-async-storage/async-storage';

import "moment/locale/pt-br";

moment.locale("pt-br");

const InicioPage = ({ navigation }) => {
  const [idPsicologo, setIdPsicologo] = useState(0);
  const [nome, setNome] = useState("");
  const [resposta, setResposta] = useState('');
  const [comando, setComando] = useState('Procurar por Id Psicologo');

  const [listaInfo, setListaInfo] = useState([]);

  async function save(key, value) {
    AsyncStorage_Paciente.setItem(key, value)
  }

  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState("");

  let startDate = moment();
  const [meetings, setMeetings] = useState([]);
  const [selectedDay, setSelectedDay] = useState(moment(startDate, 'MM-DD-YYYY').format('YYYY-MM-DD'));

  let currentMetting = [];
  for (let i = 0; i < meetings.length; i++) {
    if (meetings[i].date === selectedDay) {
      currentMetting.push(meetings[i]);
    }
  }

  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_ID.getItem("IdPsicologo");
      setIdPsicologo(value);
    }
    recuperarId();
    getInformacoesBD();
    getConsultasBD();
    getPacientesBD();
  }, [nome]);

  async function getInformacoesBD() {
    var url =
      "https://libellatcc.000webhostapp.com/getInformacoes/getPsicologos.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      alert("Tempo de espera para busca de informações excedido");
    }, timeOut);

    const resposta = await fetch(url, {
      method: "POST", //tipo de requisição
      body: JSON.stringify({ IdPsicologo: idPsicologo }),
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
        setNome(responseJson.psicologo[0].NomePsicologo);
        setLoading(false);
      })
      //se ocorrer erro na requisição ou conversão
      .catch((error) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          // Alert.alert("Alerta!", "Tempo de espera do servidor excedido!");
        }
      });
    setLoading(false);
  }

  async function getConsultasBD() {
    setLoading(true);
    var url =
      "https://libellatcc.000webhostapp.com/getInformacoes/GetConsultas.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      // alert("Tempo de espera para busca de informações excedido");
    }, timeOut);

    const resposta = fetch(url, {
      method: "POST", //tipo de requisição
      body: JSON.stringify({ IdPsicologo: idPsicologo, Comando: 'Consultas Psicologo'}),
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
        setMeetings([]);
        for (var i = 0; i < responseJson.consultas.length; i++) {
          setMeetings((listaInfo) => {
            const list = [
              ...listaInfo,
              {
                // componentes da tabela
                id: responseJson.consultas[i].IdConsulta,
                date: responseJson.consultas[i].Data,
                time: responseJson.consultas[i].Horario,
                name: responseJson.consultas[i].NomePaciente,
              },
            ];
            return list;
          });
        }
      })
      //se ocorrer erro na requisição ou conversão
      .catch((error) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          // Alert.alert("Alerta!", "Tempo de espera do servidor excedido!");
        }
      });
    setLoading(false);
  }

  async function getPacientesBD() {
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
    <TabContainer>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              color: "#4A2794",
              fontFamily: "Comfortaa_700Bold",
            }}
          >
            Olá, {nome}!
          </Text>

          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.subTitulo}>AGENDA</Text>
              <FeatherIcon name="chevron-right" size={18} color={"#6D45C2"} />
            </View>
            <View style={styles.card}>
              <CalendarStrip
                style={{ width: 300 }}
                calendarHeaderStyle={{ color: "#6D45C2" }}
                dateNumberStyle={{ color: "#313131", fontSize: 15 }}
                dateNameStyle={{ color: "#313131", opacity: 0.8, fontSize: 10 }}
                innerStyle={[]}
                showMonth={false}
                highlightDateContainerStyle={{ backgroundColor: "#53A7D7" }}
                highlightDateNumberStyle={{ color: "white" }}
                highlightDateNameStyle={{ color: "white" }}
                dayContainerStyle={{ gap: 3 }}
                selectedDate={startDate}
                onDateSelected={(day) => {
                  setSelectedDay(moment(day, 'MM-DD-YYYY').format('YYYY-MM-DD'));
                }}
              />

              {currentMetting.length > 0 ? (
                currentMetting.map((mettings, i) => {
                  return (
                    <View key={i} style={{ gap: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          backgroundColor: "#EAEEEF",
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                          borderRadius: 5,
                          width: 300,
                        }}
                      >
                        <View style={{ flexDirection: "row", gap: 6 }}>
                          <Image
                            source={require("../../../../assets/icons/VectorAzul.png")}
                          />
                          <Text style={styles.text}>{mettings.name}</Text>
                        </View>
                        <Text style={styles.text}> {mettings.time}</Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={{ textAlign: "center" }}>
                  Não há sessões agendadas.
                </Text>
              )}
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.subTitulo}>PACIENTES</Text>
              <FeatherIcon name="chevron-right" size={18} color={"#6D45C2"} />
            </View>
            <View style={styles.cardpacientes}>
              {resposta == 'informação recebida' ? (
                <FlatList
                  data={listaInfo}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => clickItemFlatList(item)}
                      style={styles.paciente}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 15,
                        }}
                      >
                        <Image
                          style={styles.imgIcon}
                          source={{ uri: 'https://libellatcc.000webhostapp.com/imagens/' + item.img}}
                        />
                        <Text style={styles.text}>{item.nome}</Text>
                      </View>
                      <EntypoIcon
                        name="chevron-thin-right"
                        size={22}
                        color={"black"}
                      />
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text style={styles.text}>Sem Pacientes!</Text>
              )}
            </View>
          </View>
        </View>
      )}
    </TabContainer>
  );
};

export default InicioPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    gap: 40,
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: "space-around",
  },

  card: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    gap: 30,
    shadowColor: "gray",
    elevation: 5,
  },

  cardpacientes: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    gap: 30,
    shadowColor: "gray",
    elevation: 5,
  },
  subTitulo: {
    fontSize: 14,
    color: "#6D45C2",
    fontFamily: "Poppins_500Medium",
  },
  paciente: {
    flexDirection: "row",
    width: 280,
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  imgIcon: {
    width: 45,
    height: 45,
    borderRadius: 400 / 2,
    borderWidth: 0.8,
    borderColor: '#6b6b6b',
  },
  text: {
    fontFamily: "Poppins_400Regular",
  },
});
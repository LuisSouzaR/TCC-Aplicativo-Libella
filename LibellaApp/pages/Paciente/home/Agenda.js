import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";

import TabContainer from "../../../components/navigation/Psicologo/BottomTab/TabContainer";

import AsyncStorage_Paciente from "@react-native-async-storage/async-storage";

import { Calendar, LocaleConfig } from "react-native-calendars";

import { format } from "date-fns";

import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const AgendaScreen = () => {
  const [idPaciente, setIdPaciente] = useState(0);

  const [meetings, setMeetings] = useState([]);

  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function recuperarIdPaciente() {
      const value = await AsyncStorage_Paciente.getItem("IdPaciente");
      setIdPaciente(value);
    }
    recuperarIdPaciente();
    getInformacoesBD();
  }, [idPaciente]);

  async function getInformacoesBD() {
    setLoading(true);
    var url =
      "https://libellatcc.000webhostapp.com/getInformacoes/GetConsultas.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      // alert('Tempo de espera para busca de informações excedido');
    }, timeOut);

    const resposta = fetch(url, {
      method: "POST", //tipo de requisição
      body: JSON.stringify({
        IdPaciente: idPaciente,
        Comando: "Consultas Paciente",
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
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const [selected, setSelected] = useState(currentDate);

  let currentMetting = [];
  for (let i = 0; i < meetings.length; i++) {
    if (meetings[i].date === selected) {
      currentMetting.push(meetings[i]);
    }
  }

  let markedDay = {};

  meetings.map((item) => {
    markedDay[item.date] = {
      marked: true,
      selectedColor: "#53A7D7",
    };
  });

  return (
    <TabContainer>
      <View style={styles.container}>
        <Calendar
          // Customize the appearance of the calendar
          style={{
            width: "100%",
          }}
          // Callback that gets called when the user selects a day
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          // Mark specific dates as marked
          markedDates={markedDay}
        />

        <View style={{ paddingHorizontal: 30, flex: 1, alignItems: "center" }}>
          <View style={{ width: "100%" }}>
            <View style={{ gap: 15 }}>
              <Text style={styles.textDate}>{selected}</Text>
              {currentMetting.length > 0 ? (
                currentMetting.map((mettings, i) => {
                  return (
                    <View key={i} style={{ gap: 10 }}>
                      <View style={styles.card}>
                        <View style={{ flexDirection: "row", gap: 12, alignItems: 'center' }}>
                          <MaterialCommunityIcon
                            name="calendar-clock-outline"
                            size={35}
                            color={"black"}
                          />
                          <Text style={styles.text}>Consulta</Text>
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
        </View>
      </View>
    </TabContainer>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    gap: 27,
  },
  card: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 10,
    gap: 30,
    shadowColor: "gray",
    elevation: 5,
  },
  text: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  textDate: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
});

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabádo",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt-br";

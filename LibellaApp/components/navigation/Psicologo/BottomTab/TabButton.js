import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  TextInput,
  Pressable,
  Platform,
  Alert
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";

import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

import AsyncStorage_ID from '@react-native-async-storage/async-storage'; // instalar

const TabButton = ({ toggleOpened, opened }) => {
  const [id, setId] = useState('');

  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_ID.getItem('IdPsicologo')
      setId(value)
    }
    recuperarId()
    getInformacoesBD()
  }, [id]);

  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);

  const [pacientes, setPacientes] = useState([]);

  async function getInformacoesBD() {
    setLoading(true);
    var url = 'https://libellatcc.000webhostapp.com/getInformacoes/getPacientes.php';
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      // alert('Tempo de espera para busca de informações excedido');
    }, timeOut);

    const resposta = fetch(url, {
      method: 'POST', //tipo de requisição
      body: JSON.stringify({ IdPsicologo: id, Comando: 'Procurar por Id Psicologo'}),
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
        setPacientes([]);
        for (var i = 0; i < responseJson.paciente.length; i++) {
          setPacientes((listaInfo) => {
            const list = [
              ...listaInfo,
              {
                NomePaciente: responseJson.paciente[i].NomePaciente,
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

  async function agendar() {
    if (paciente == "" || dataEvento == "" || timeEvento == "" ) {
      alert("Erro: Preencha todos os campos!")
    }
    else {
      var url = 'https://libellatcc.000webhostapp.com/Funcionalidades/AgendarSessao.php';
      var wasServerTimeout = false;
      var timeout = setTimeout(() => {
        wasServerTimeout = true;
        // alert('Tempo de espera para busca de informações excedido');
      }, timeOut);

      const resposta = await fetch(url, {
        method: 'POST', //tipo de requisição
        body: JSON.stringify({ 
          Data: dataEvento, 
          Horario: timeEvento,
          IdPsicologo: id,
          NomePaciente: paciente
         }),
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
          var mensagem = JSON.stringify(responseJson.informacoes[0].msg)
          if (mensagem == '"Informações inseridas com sucesso"') {
            Alert.alert("Agendado!", "Sessão agendada com sucesso!");
            setModalVisible(false)
          }
          else {
            // Aviso de Erro dados inseridos incorretos
            Alert.alert("Erro!", "Revise os dados inseridos!");
          }
        })
        //se ocorrer erro na requisição ou conversão
        .catch((error) => {
          timeout && clearTimeout(timeout);
          if (!wasServerTimeout) {
            // Alert.alert("Alerta!", "Tempo de espera do servidor excedido!");
          }
          alert(error)
        });
    }
  }
  const navigation = useNavigation();
  const animation = React.useRef(new Animated.Value(0)).current;

  const [modalVisible, setModalVisible] = useState(false);

  const [paciente, setPaciente] = React.useState();

  //Date Picker
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateEvento(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const onChangeTime = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setTime(currentDate);

      if (Platform.OS === "android") {
        toggleTimePicker();
        setTimeEvento(formatTime(currentDate));
      }
    } else {
      toggleTimePicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  const formatTime = (rawDate) => {
    let time = new Date(rawDate);

    let hours = time.getHours();
    let min = time.getMinutes();

    return `${hours}:${min}`;
  };

  // Text Input
  const [dataEvento, setDateEvento] = useState();
  const [timeEvento, setTimeEvento] = useState();

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
                alignItems: "center",
                width: "100%",
                gap: 80,
              }}
            >
              <TouchableWithoutFeedback
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntIcon name="close" size={25} color={"black"} />
              </TouchableWithoutFeedback>
              <Text style={{ fontFamily: "Poppins_500Medium" }}>
                Agendar Sessão
              </Text>
            </View>
            <View style={{ gap: 1 }}>
              <Text style={styles.inputText}> Paciente </Text>
              <SelectDropdown
                data={pacientes}
                onSelect={(selectedItem, index) => {
                  setPaciente(selectedItem.NomePaciente)
                  console.log(paciente)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.NomePaciente;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.NomePaciente;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesomeIcon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
                selectedRowTextStyle={styles.selectedRowTextStyle}
                defaultButtonText={'Selecione o Paciente'}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: -10,
              }}
            >
              <View style={{ gap: 1 }}>
                <Text style={styles.inputText}> Data </Text>
                {!showDatePicker && (
                  <Pressable onPress={toggleDatePicker}>
                    <TextInput
                      style={[
                        styles.input,
                        { textAlign: "center", paddingLeft: 35 },
                      ]}
                      placeholder="18/08/2008"
                      value={dataEvento}
                      onChange={setDateEvento}
                      editable={false}
                    />
                    <AntIcon
                      name="calendar"
                      size={20}
                      color={"gray"}
                      style={{
                        position: "absolute",
                        top: 9,
                        left: 14,
                        opacity: 0.6,
                      }}
                    />
                  </Pressable>
                )}
                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChangeDate}
                  />
                )}
              </View>

              <View style={{ gap: 1 }}>
                <Text style={styles.inputText}> Horário </Text>
                {!showTimePicker && (
                  <Pressable onPress={toggleTimePicker}>
                    <TextInput
                      style={styles.input}
                      placeholder="18:00"
                      value={timeEvento}
                      onChange={setTimeEvento}
                      editable={false}
                    />
                  </Pressable>
                )}
                {showTimePicker && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={time}
                    onChange={onChangeTime}
                  />
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => agendar()}>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Agendar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.box}>
        {/*cadastrar pacientes*/}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("CadastroPaciente")}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <AntIcon name="adduser" size={25} color={"white"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/*atribuir atividade*/}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("AtribuirAtividade")}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                ],
              },
            ]}
          >
            <AntIcon name="addfile" size={25} color={"white"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/*agendar sessão*/}
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <FontAwesomeIcon name="calendar-plus-o" size={25} color={"white"} />
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
    gap: 25,
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
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "white",
    borderColor: '#444',
    borderWidth: 1,
    color: "black",
    textAlign: "center",
  },
  inputText: {
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
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownBtnTxtStyle: { color: '#313131', textAlign: 'left' },
  dropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdownRowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdownRowTxtStyle: { color: '#444', textAlign: 'left' },
  selectedRowTextStyle: {color: '#53A7D7'}
});
export default TabButton;
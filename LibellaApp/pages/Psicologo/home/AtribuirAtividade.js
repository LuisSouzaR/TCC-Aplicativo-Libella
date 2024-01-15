import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
} from "react-native";

import EntypoIcon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import SelectDropdown from "react-native-select-dropdown";

import DateTimePicker from "@react-native-community/datetimepicker";

import { TextInputMask } from "react-native-masked-text"; // instalar

import AsyncStorage_ID from "@react-native-async-storage/async-storage";

const AtribuirAtividadePage = ({ navigation }) => {
  const [id, setId] = useState('');

  const [titulo, setTitulo] = useState("");
  const [instrucoes, setInstrucoes] = useState("");
  const [IdPsicologo, setIdPsicologo] = useState("");

  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState(10000);
  const [viewLista, setViewLista] = useState(true);

  //Date Picker
  const [data, setData] = useState(new Date());
  const [horario, setHorario] = useState(new Date());
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
      setData(currentDate);

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
      setHorario(currentDate);

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

  //DropDown Paciente
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelec, setPacienteSelec] = useState();
  const [IdPaciente, setIdPaciente] = useState();

  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_ID.getItem('IdPsicologo')
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
                IdPaciente: responseJson.paciente[i].IdPaciente,
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

  async function atribuir() {
    if (titulo == "" || horario == "" || data == "" || instrucoes == "" || pacienteSelec == "") {
      Alert.alert("Erro", "Preencha todos os campos!");
    } 
    else {
      var url ="https://libellatcc.000webhostapp.com/Funcionalidades/AtribuirAtividade.php";
      var wasServerTimeout = false;
      var timeout = setTimeout(() => {
        wasServerTimeout = true;
        alert("Tempo de espera para busca de informações excedido");
      }, timeOut);

      const resposta = await fetch(url, {
        method: "POST", //tipo de requisição
        body: JSON.stringify({
          IdPsicologo: id,
          Titulo: titulo,
          Instrucoes: instrucoes,
          DataEntrega: dataEvento,
          Horario: timeEvento,
          IdPaciente: IdPaciente
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
            Alert.alert("Pronto", "Atividade atribuida com sucesso!");
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
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "#6D45C2",
          fontFamily: "Poppins_500Medium",
        }}
      >
        Atribuir Atividade
      </Text>

      <View style={styles.card}>
        <View style={styles.inputItem}>
          <Text style={styles.titulo}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o título"
            onChangeText={(text) => setTitulo(text)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ width: 180, gap: 5 }}>
            <Text style={styles.titulo}>Data de Entrega</Text>
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
                  size={25}
                  color={"gray"}
                  style={{
                    position: "absolute",
                    top: 13,
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
                value={data}
                onChange={onChangeDate}
              />
            )}
          </View>
          <View style={{ width: 75, gap: 5 }}>
            <Text style={styles.titulo}>Horário</Text>
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
                    value={horario}
                    onChange={onChangeTime}
                  />
                )}
          </View>
        </View>

        <View style={styles.inputItem}>
          <Text style={styles.titulo}>Instruções</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira as instruções"
            onChangeText={(text) => setInstrucoes(text)}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
              marginLeft: 5,
              width: 50,
            }}
          >
            <EntypoIcon name="attachment" size={16} color={"#53A7D7"} />
            <Text style={styles.texto}>Anexo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputItem}>
          <Text style={styles.titulo}>Atribuir Para</Text>
          <SelectDropdown
                data={pacientes}
                onSelect={(selectedItem, index) => {
                  setPacienteSelec(selectedItem.NomePaciente)
                  setIdPaciente(selectedItem.IdPaciente)
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
                  return <FontAwesomeIcon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#C3C3C3'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
                selectedRowTextStyle={styles.selectedRowTextStyle}
                defaultButtonText={'Selecione o Paciente'}
              />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => atribuir()}
        >
          <Text style={{ color: "white", fontSize: 18, paddingHorizontal: 12 }}>
            Concluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AtribuirAtividadePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 27,
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
    gap: 24,
    shadowColor: "gray",
    elevation: 5,
  },
  texto: {
    fontSize: 17,
    color: "#53A7D7",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Comfortaa_500Medium",
    color: "#313131",
  },
  input: {
    backgroundColor: "#F1F4F5",
    borderRadius: 8,
    fontSize: 17,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color:'black'
  },
  inputItem: {
    gap: 5,
    width: "100%",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 9,
    backgroundColor: "#6D45C2",
    borderRadius: 15,
    alignSelf: "center",
  },
  dropdownBtnStyle: {
    width: '100%',
    backgroundColor: '#F1F4F5',
    backgroundColor: "#F1F4F5",
    borderRadius: 8,
    fontSize: 17,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownBtnTxtStyle: { color: '#313131', textAlign: 'left' },
  dropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdownRowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdownRowTxtStyle: { color: '#444', textAlign: 'left' },
  selectedRowTextStyle: {color: '#53A7D7'}
});

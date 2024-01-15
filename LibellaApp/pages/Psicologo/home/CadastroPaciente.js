import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";

import { AuthContext } from "../../../components/navigation/Stack/AuthContext";

import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";

import { LinearGradient } from 'expo-linear-gradient';

import SelectDropdown from 'react-native-select-dropdown';
import { TextInputMask } from 'react-native-masked-text';
// async storage
import AsyncStorage_ID from '@react-native-async-storage/async-storage';

const CadastroPacScreen = ({ navigation }) => {
  // declarando os estados do brasil em uma váriavel
  const states = ["Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goías", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraiba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]

  const [idPsicologo, setIdPsicologo] = useState('');
  const [id, setId] = useState(0);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [ocupacao, setOcupacao] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [endereco, setEndereco] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const resgatarId = async (key) => {
    const value = await AsyncStorage_ID.getItem(key)
    setIdPsicologo(value)
  }
  resgatarId('IdPsicologo')
  async function cadastrar() {
    if (nome == "" || telefone == "" || cpf == "" || rg == "" || escolaridade == "" || ocupacao == "" || sintomas == "" || endereco == "" || email == "" || senha == "" || cidade == "" || estado == "") {
      alert("Erro: Preencha todos os campos!")
    }
    else if (telefone.length < 14) {
      Alert.alert("Alerta de dados incorretos!", "Telefone inserido inválido")
    }
    else if (cpf.length < 14) {
      Alert.alert("Alerta de dados incorretos!", "CPF inserido inválido")
    }
    else if (rg.length < 12) {
      Alert.alert("Alerta de dados incorretos!", "RG inserido inválido")
    }
    else {
      var url = 'https://libellatcc.000webhostapp.com/Cadastro/CadastroPaciente.php';
      var wasServerTimeout = false;
      var timeout = setTimeout(() => {
        wasServerTimeout = true;
        alert('Tempo de espera para busca de informações excedido');
      }, timeOut);

      const resposta = await fetch(url, {
        method: 'POST', //tipo de requisição
        body: JSON.stringify({ IdPsicologo: idPsicologo, NomePaciente: nome, TelefonePaciente: telefone, CpfPaciente: cpf, RgPaciente: rg, EscolaridadePaciente: escolaridade, OcupacaoPaciente: ocupacao, SintomasPaciente: sintomas, CidadePaciente: cidade, EstadoPaciente: estado, EnderecoPaciente: endereco, EmailPaciente: email, SenhaPaciente: senha }),
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
          if (mensagem == '"Informações repetidas"') {
            Alert.alert("Informações repetidas!", "Alguma(s) informação(ões) (CPF, Telefone ou email) inserida(s) já existe em nosso aplicativo \nConfira as informações, e caso já tenha um cadastro volte para tela de login e realize-o!");
          }

          else if (mensagem == '"Informações inseridas com sucesso"') {
            Alert.alert("Cadastro realizado com sucesso", "Cadastrado!");
            navigation.navigate('PSNavigator')
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
            Alert.alert("Alerta!", "Tempo de espera do servidor excedido!");
          }
        });
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}> Cadastrar Paciente </Text>

        {/* Input do nome */}
        <Ionicons name="person-outline" size={23} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Nome Completo"
          placeholderTextColor="#313131"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />

        {/* Input do Telefone */}
        <FeatherIcon name="phone" size={23} color={"#313131"} style={styles.icons} />
        <TextInputMask
          style={styles.Input}
          placeholder="Telefone"
          placeholderTextColor="#313131"
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          onChangeText={(text) => setTelefone(text)}
          value={telefone}
          keyboardType={'phone-pad'}
        />

        {/* Input do CPF */}
        <AntIcon name="idcard" size={25} color={"#313131"} style={styles.icons} />
        <TextInputMask
          style={styles.Input}
          placeholder="CPF"
          placeholderTextColor="#313131"
          onChangeText={(text) => setCpf(text)}
          value={cpf}
          keyboardType={'phone-pad'}
          type={'cpf'}
        />

        {/* Input do RG */}
        <AntIcon name="idcard" size={25} color={"#313131"} style={styles.icons} />
        <TextInputMask
          style={styles.Input}
          placeholder="RG"
          placeholderTextColor="#313131"
          onChangeText={(text) => setRg(text)}
          value={rg}
          keyboardType={'phone-pad'}
          type={'custom'}
          options={{
            mask: '99.999.999-9',
          }}
        />

        {/* Input da Escolaridade */}
        <AntIcon name="idcard" size={25} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Escolaridade"
          placeholderTextColor="#313131"
          onChangeText={(text) => setEscolaridade(text)}
          value={escolaridade}
        />

        {/* Input da Sintomas */}
        <AntIcon name="idcard" size={25} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Sintomas"
          placeholderTextColor="#313131"
          onChangeText={(text) => setSintomas(text)}
          value={sintomas}
        />

        {/* Input da Ocupação */}
        <AntIcon name="idcard" size={25} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Ocupação"
          placeholderTextColor="#313131"
          onChangeText={(text) => setOcupacao(text)}
          value={ocupacao}
        />

        {/* Text Input Estado */}
        <Ionicons name="location-outline" size={25} color={"black"} style={styles.icons} />
        <SelectDropdown
          defaultButtonText={"Estado"}
          buttonStyle={styles.DropDownButton}
          buttonTextStyle={styles.DropDownButtonText}
          dropdownStyle={styles.DropDown}
          data={states}
          onSelect={(selectedItem) => setEstado(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />

        {/* Input da Cidade */}
        <Ionicons name="location-outline" size={25} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Cidade"
          placeholderTextColor="#313131"
          onChangeText={(text) => setCidade(text)}
          value={cidade}
        />

        {/* Input do Endereço */}
        <Ionicons name="location-outline" size={25} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Endereço"
          placeholderTextColor="#313131"
          onChangeText={(text) => setEndereco(text)}
          value={endereco}
        />

        {/* Input do Email */}
        <Ionicons name="ios-mail-outline" size={25} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Email"
          placeholderTextColor="#313131"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        {/* Input do Senha */}
        <SimpleLineIcon name="lock" size={25} color={"#313131"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Senha"
          placeholderTextColor="#313131"
          onChangeText={(text) => setSenha(text)}
          value={senha}
          secureTextEntry={!showPassword}
        />

        {/* Olhinho da senha */}
        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={25} color={"#313131"} style={styles.icon} onPress={toggleShowPassword} />
        <TouchableOpacity onPress={() => cadastrar()}>
          <LinearGradient
            colors={['#764DCC', '#4A2794']}
            style={styles.button}>
            <Text style={{
              textAlign: 'center',
              color: '#EBF8F5',
              fontSize: 20,
              lineHeight: 30,
            }}>
              CADASTRAR
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CadastroPacScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },

  icons: {
    left: -130,
    top: 39,
  },

  icon: {
    top: -38,
    left: 130,
  },

  button: {
    width: 310,
    height: 55,
    borderRadius: 30,
    padding: 10,
    fontWeight: "bold",
  },

  Input: {
    color: "#313131",
    paddingLeft: 50,
    paddingRight: 20,
    paddingVertical: 10,
    textAlignVertical: 'bottom',
    borderRadius: 20,
    width: "90%",
    borderColor: "#313131",
    borderWidth: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },

  img: {
    width: 167,
    height: 167,
    resizeMode: 'contain',
  },

  title: {
    color: '#6D45C2',
    fontSize: 25,
    fontFamily: 'Comfortaa_700Bold'
  },

  // DropDownConfigs
  DropDown: {
    padding: 0,
    borderRadius: 5,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
  },

  DropDownButton: {
    color: "#313131",
    paddingLeft: 50,
    paddingVertical: 10,
    textAlignVertical: 'bottom',
    borderRadius: 20,
    width: "90%",
    borderColor: "#313131",
    borderWidth: 1,
    fontSize: 15,
    backgroundColor: "#ffffff00"
  },

  DropDownButtonText: {
    fontFamily: 'Poppins_400Regular',
    color: "#313131",
    paddingLeft: 35,
    fontSize: 15,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    textAlign: "left",
    width: '100%',
  },
});
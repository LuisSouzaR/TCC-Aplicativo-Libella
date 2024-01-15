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

import { LinearGradient } from 'expo-linear-gradient'; /* instalar */

import { TextInputMask } from 'react-native-masked-text'; // instalar
import SelectDropdown from 'react-native-select-dropdown'; // instalar

const CadastroScreen = ({ navigation }) => {
  const states = ["Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goías", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraiba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"]

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [crp, setCrp] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState('');

  const [timeOut, setTimeOut] = useState(100000);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function cadastrar() {
    if (nome == "" || telefone == "" || cpf == "" || rg == "" || crp == "" || endereco == "" || email == "" || senha == "" || cidade == "" || estado == "") {
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
    else if (crp.length < 8) {
      Alert.alert("Alerta de dados incorretos!", "CRP inserido inválido")
    }
    else {
      var url = 'https://libellatcc.000webhostapp.com/Cadastro/CadastroPsicologo.php';
      var wasServerTimeout = false;
      var timeout = setTimeout(() => {
        wasServerTimeout = true;
        alert('Tempo de espera para busca de informações excedido');
      }, timeOut);

      const resposta = await fetch(url, {
        method: 'POST', //tipo de requisição
        body: JSON.stringify({ NomePsicologo: nome, TelefonePsicologo: telefone, CpfPsicologo: cpf, RgPsicologo: rg, CrpPsicologo: crp, CidadePsicologo: cidade, EstadoPsicologo: estado, EnderecoPsicologo: endereco, EmailPsicologo: email, SenhaPsicologo: senha }),
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
          var mensagem = responseJson.informacoes[0].msg
          if (mensagem == "Informações repetidas") {
            Alert.alert("Informações repetidas!", "Alguma(s) informação(ões) (CPF, Telefone, CRP ou email) inserida(s) já existe em nosso aplicativo \nConfira as informações, e caso já tenha um cadastro volte para tela de login e realize-o!");
          }

          else if (mensagem == "Informações inseridas com sucesso") {
            Alert.alert("Cadastro realizado com sucesso", "Faça seu Login!");
            navigation.navigate('LoginPS')
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
  return (
    <ScrollView>
      <View style={styles.container}>

        < Image
          style={styles.img}
          source={require('../../../assets/img/Logos/Logo-roxa.png')}
        />
        <Text style={styles.title}>Cadastro</Text>

        {/* Input do Nome */}
        <Ionicons name="person-outline" size={23} color={"white"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Nome Completo"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />

        {/* Input do Telefone */}
        <FeatherIcon name="phone" size={23} color={"white"} style={styles.icons} />
        <TextInputMask
          style={styles.Input}
          placeholder="Telefone"
          placeholderTextColor="#ffffff"
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
        <AntIcon name="idcard" size={25} color={"white"} style={styles.icons} />
        <TextInputMask
          style={styles.Input}
          placeholder="CPF"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setCpf(text)}
          value={cpf}
          keyboardType={'phone-pad'}
          type={'cpf'}
        />

        {/* Input do CRP */}
        <AntIcon name="idcard" size={25} color={"white"} style={styles.icons} />
        <TextInputMask
          style={styles.Input}
          placeholder="CRP"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setCrp(text)}
          value={crp}
          type={'custom'}
          options={{
            mask: '99/99999'
          }}
        />

        {/* Input do RG */}
        <AntIcon name="idcard" size={25} color={"white"} style={styles.icons} />
        <TextInputMask
          style={styles.Input}
          placeholder="RG"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setRg(text)}
          value={rg}
          keyboardType={'phone-pad'}
          type={'custom'}
          options={{
            mask: '99.999.999-9',
          }}
        />

        {/* Text Input Estado */}
        <Ionicons name="location-outline" size={25} color={"white"} style={styles.icons}/>
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

        {/* Input da cidade */}
        <Ionicons name="location-outline" size={25} color={"white"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Cidade"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setCidade(text)}
          value={cidade}
        />

        {/* Input do Endereço */}
        <Ionicons name="location-outline" size={25} color={"white"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Endereço"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setEndereco(text)}
          value={endereco}
        />

        {/* Input do Email */}
        <Ionicons name="ios-mail-outline" size={25} color={"white"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Email"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        {/* Input do Senha */}
        <SimpleLineIcon name="lock" size={25} color={"white"} style={styles.icons} />
        <TextInput
          style={styles.Input}
          placeholder="Senha"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setSenha(text)}
          value={senha}
          secureTextEntry={!showPassword}
        />

        {/* Input do Olho de visualizar senha */}
        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={25} color={"white"} style={styles.icon} onPress={toggleShowPassword} />

        {/* Input do Botão de cadastrar */}
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

export default CadastroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#53A7D7",
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
    fontSize: 20,
    color: "white",
    paddingLeft: 50,
    paddingVertical: 10,
    textAlign: "left",
    borderRadius: 20,
    width: "90%",
    borderColor: "#ffffff",
    borderWidth: 1,
    paddingTop: 15,
  },

  img: {
    width: 167,
    height: 167,
    resizeMode: 'contain',
  },

  title: {
    color: 'white',
    fontSize: 36,
  },


  // DropDownConfigs
  DropDown: {
    padding: 0,
    borderRadius: 5,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
  },

  DropDownButton: {
    paddingLeft: 50,
    paddingVertical: 10,
    textAlignVertical: 'bottom',
    borderRadius: 20,
    width: "90%",
    borderColor: "white",
    borderWidth: 1,
    fontSize: 22,
    backgroundColor: "#ffffff00",
  },

  DropDownButtonText: {
    color: "white",
    paddingLeft: 35,
    fontSize: 22,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    textAlign: "left",
    width: '100%',
  },
});
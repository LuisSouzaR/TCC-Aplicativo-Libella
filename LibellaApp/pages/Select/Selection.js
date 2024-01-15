import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { useAuth } from "../../components/navigation/Stack/AuthContext";

const SelectionScreen = ({ navigation }) => {
  const { setUserType } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Organize suas atividades</Text>
      </View>
      <View style={styles.containerImgTop}>
        <TouchableOpacity onPress={() => setUserType('Psicologo')}>
          <Image
            style={styles.img}
            source={require('../../assets/img/Auth/ChoicePsicologo.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>ou</Text>
      </View>
      <View style={styles.containerImgBottom}>
        <TouchableOpacity onPress={() => setUserType('Paciente')}>
          <Image
            style={styles.img}
            source={require('../../assets/img/Auth/ChoicePaciente.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectionScreen;

const styles = StyleSheet.create({

  // Container
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#53A7D7",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  containerTitle: {
    height: '20%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },

  containerImgTop: {
    height: '35%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  containerImgBottom: {
    height: '35%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  containerText: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },




  // Imagens
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 350,
  },




  // Textos
  title: {
    fontFamily: 'Comfortaa_500Medium',
    fontSize: 35,
    top: 10,
    textAlign: 'center',
    color: "white",
    lineHeight: 40
  },

  text: {
    fontFamily: 'Comfortaa_500Medium',
    color: "#FFFFFF",
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },

});
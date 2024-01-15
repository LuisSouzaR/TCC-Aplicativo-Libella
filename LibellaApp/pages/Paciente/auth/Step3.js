import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Step3Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerSkip} onPress={() => navigation.navigate('LoginPC')}>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: -3 }}>
          <Text style={styles.LinkButton}>Pular &#62;</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Progresso Pessoal</Text>
      </View>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require('../../../assets/img/Auth/Introduction-3.png')}
        />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Veja seu progresso ao longo do tempo</Text>
      </View>
      <View style={styles.containerCarrousel}>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "flex-end", gap: -3 }} onPress={() => navigation.goBack()}>
          <Text style={styles.LinkButton}>&#60; Voltar</Text>
        </TouchableOpacity>
        <View style={styles.CarrousselCircle}></View>
        <View style={styles.CarrousselCircle}></View>
        <View style={styles.CarrousselCircleActivated}></View>
        <View style={styles.CarrousselCircle}></View>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "flex-end" }} onPress={() => navigation.navigate('Step4PC')}>
          <Text style={styles.LinkButton}>Continuar &#62;</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={"white"} style="auto" />
    </View>
  );
}

export default Step3Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#53A7D7",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  containerSkip: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: 20,
  },

  containerTitle: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },

  containerImg: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerText: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerCarrousel: {
    height: '15%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    padding: 40,
  },

  CarrousselCircle: {
    backgroundColor: '#FFFFFF',
    height: 10,
    width: 10,
    borderRadius: 100,
  },

  CarrousselCircleActivated: {
    backgroundColor: '#6D45C2',
    height: 10,
    width: 10,
    borderRadius: 100,
  },




  // Imagens
  img: {
    width: 333,
    height: 333,
  },



  // Textos
  title: {
    fontFamily: 'Comfortaa_500Medium',
    fontSize: 35,
    top: 10,
    textAlign: "center",
    color: "white",
    lineHeight: 40
  },

  text: {
    fontFamily: 'Comfortaa_500Medium',
    color: "#FFFFFF",
    fontWeight: '400',
    fontSize: 18,
    textAlign: 'center',
    width: '80%',
  },

  LinkButton: {
    fontFamily: 'Poppins_500Medium',
    color: "#6D45C2",
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },

});
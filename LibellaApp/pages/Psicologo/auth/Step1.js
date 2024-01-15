import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Step1Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerSkip}
        onPress={() => navigation.navigate("LoginPS")}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: -3 }}>
          <Text style={styles.LinkButton}>Pular &#62;</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Organize suas atividades</Text>
      </View>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={require("../../../assets/img/Auth/Introduction-1.png")}
        />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Atribua atividades aos seus pacientes</Text>
      </View>
      <View style={styles.containerCarrousel}>
        <View style={styles.containerCircles}>
          <View style={styles.CarrousselCircleActivated}></View>
          <View style={styles.CarrousselCircle}></View>
          <View style={styles.CarrousselCircle}></View>
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "flex-end" }}
          onPress={() => navigation.navigate("Step2PS")}
        >
          <Text style={styles.LinkButton}>Continuar &#62;</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={"white"} style="auto" />
    </View>
  );
};

export default Step1Screen;

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

  containerSkip: {
    height: "10%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    right: 20,
  },
  containerTitle: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  containerImg: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  containerText: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  containerCarrousel: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
    padding: 40,
  },

  containerCircles: {
    height: "15%",
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
    gap: 20,
    padding: 40,
  },

  // Elementos
  CarrousselCircle: {
    backgroundColor: "#FFFFFF",
    height: 10,
    width: 10,
    borderRadius: 100,
  },

  CarrousselCircleActivated: {
    backgroundColor: "#6D45C2",
    height: 10,
    width: 10,
    borderRadius: 100,
  },

  //Imagens
  img: {
    width: 333,
    height: 333,
  },

  // Textos
  title: {
    fontFamily: "Comfortaa_500Medium",
    fontSize: 35,
    top: 10,
    textAlign: "center",
    color: "white",
    lineHeight: 40,
  },

  text: {
    fontFamily: "Comfortaa_500Medium",
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 19,
    textAlign: "center",
    width: "80%",
  },

  LinkButton: {
    color: "#6D45C2",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 30,
    fontFamily: "Poppins_500Medium",
  },
});
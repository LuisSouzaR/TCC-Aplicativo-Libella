import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Stack/AuthContext";

const CustomDrawer = (props) => {
  const { loggedOut, logout } = useAuth();

  const handleLogout = () => {
    logout();
    loggedOut();
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#F2F2F2" }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginLeft: 15,
            marginTop: 8,
          }}
        >
          <Image
            style={{
              width: 40,
              height: 45,
              resizeMode: "contain",
            }}
            source={require("../../../../assets/img/Logos/Logo-azul-libella.png")}
          />
          <Text style={{ fontSize: 24, color: "#53A7D7" }}>Libella</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
      >
        <TouchableOpacity
          onPress={handleLogout}
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
        >
          <FeatherIcon name="log-out" size={30} color={"#EC4646"} />
          <Text style={{ fontSize: 20, color: "#EC4646" }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
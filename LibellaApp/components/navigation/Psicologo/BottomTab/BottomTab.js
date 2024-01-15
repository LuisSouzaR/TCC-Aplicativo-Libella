import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Pacientes, Agenda, Inicio, Notificacoes } from "../../../../pages";

import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";

import TabButton from "./TabButton";
import { useTabMenu } from "./TabContext";


const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { opened, toggleOpened } = useTabMenu();
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingBottom: 5,
          padddingTop: 5,
        },
        tabBarItemStyle: { gap: -5 },
      }}
    >
      {/* ícone inicio */}
      <Tab.Screen
        name={"Inicio"}
        component={Inicio}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonIcon
              name="home-outline"
              size={30}
              color={focused ? "#53A7D7" : "#ABABAB"}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      {/* ícone da agenda */}
      <Tab.Screen
        name={"Agenda"}
        component={Agenda}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntIcon
              name="calendar"
              size={30}
              color={focused ? "#53A7D7" : "#ABABAB"}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      {/* Botão post */}
      <Tab.Screen
        name={"Add"}
        component={Inicio}
        options={{
          tabBarButton: () => (
            <TabButton opened={opened} toggleOpened={toggleOpened} />
          ),
          tabBarItemStyle: {
            height: 0,
          },
        }}
      ></Tab.Screen>

      {/* ícone da tela de pacientes */}
      <Tab.Screen
        name={"Pacientes"}
        component={Pacientes}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonIcon
              name="people-outline"
              size={30}
              color={focused ? "#53A7D7" : "#ABABAB"}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      {/* ícone da tela de pacientes */}
      <Tab.Screen
        name={"Notificações"}
        component={Notificacoes}
        options={{
          tabBarIcon: ({ focused }) => (
            <IonIcon
              name="notifications-outline"
              size={30}
              color={focused ? "#53A7D7" : "#ABABAB"}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
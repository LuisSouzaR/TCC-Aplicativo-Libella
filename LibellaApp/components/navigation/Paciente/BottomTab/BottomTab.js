import * as React from "react";
import {
  StyleSheet,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProgressoPC, AgendaPC, AtividadesPC, InicioPC } from "../../../../pages";

import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import OcticonsIcon from "react-native-vector-icons/Octicons";

import TabButton from "./TabButton";
import { useTabMenu } from "./TabContext";


const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { opened, toggleOpened } = useTabMenu();
  return (
    <Tab.Navigator
    initialRouteName="InicioPC"
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
        name={"InicioPC"}
        component={InicioPC}
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

      {/* ícone da tela de pacientes */}
      <Tab.Screen
        name={"AtividadesPC"}
        component={AtividadesPC}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcon
              name="clipboard-text-outline"
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
        component={InicioPC}
        options={{
          tabBarButton: () => (
            <TabButton opened={opened} toggleOpened={toggleOpened} />
          ),
          tabBarItemStyle: {
            height: 0,
          },
        }}
      ></Tab.Screen>

      {/* ícone da agenda */}
      <Tab.Screen
        name={"Agenda"}
        component={AgendaPC}
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

      {/* ícone inicio */}
      <Tab.Screen
        name={"ProgressoPC"}
        component={ProgressoPC}
        options={{
          tabBarIcon: ({ focused }) => (
            <OcticonsIcon
              name="graph"
              size={23}
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
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  AgendaPC,
  AlterarDadosPC,
  AtividadeEspPC,
  PerfilPS,
  RegistroEmocoesPC
} from "../../../pages";

import DrawerNavigator from "../Paciente/Drawer/DrawerNavigator"
import { TabContextProvider } from "../Paciente/BottomTab/TabContext";

const PacStack = createNativeStackNavigator();

const PCNavigator = () => {
  return (
    <TabContextProvider>
      <PacStack.Navigator screenOptions={{ headerShown: false }}>
        <PacStack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <PacStack.Screen
          name="AtividadeEsp"
          component={AtividadeEspPC}
        />
        <PacStack.Screen
          name="PerfilPS"
          component={PerfilPS}
        />
        <PacStack.Screen
          name="AlterarDadosPC"
          component={AlterarDadosPC}
        />
        <PacStack.Screen
          name="RegistroEmocoesPC"
          component={RegistroEmocoesPC}
        />
        <PacStack.Screen
          name="AgendaPC"
          component={AgendaPC}
        />
      </PacStack.Navigator>
    </TabContextProvider>
  );
};

export default PCNavigator;
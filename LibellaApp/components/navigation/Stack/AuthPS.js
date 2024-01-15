import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  LoginPS,
  CadastroPS,
  Step1PS,
  Step2PS,
  Step3PS,
} from "../../../pages";

import PSNavigator from "./PSNavigator";

const AuthStack = createNativeStackNavigator();

const AuthPS = () => {
  return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Step1PS" component={Step1PS} />
        <AuthStack.Screen name="Step2PS" component={Step2PS} />
        <AuthStack.Screen name="Step3PS" component={Step3PS} />
        <AuthStack.Screen name="LoginPS" component={LoginPS} />
        <AuthStack.Screen name="CadastroPS" component={CadastroPS} />
        <AuthStack.Screen
          name="PSNavigator"
          component={PSNavigator}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
  );
};

export default AuthPS;
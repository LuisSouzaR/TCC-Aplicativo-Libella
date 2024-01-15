import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  LoginPC,
  Step1PC,
  Step2PC,
  Step3PC,
  Step4PC
} from "../../../pages";

import PCNavigator from '../Stack/PCNavigator'

const AuthStack = createNativeStackNavigator();

const AuthPC = () => {
  return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Step1PC" component={Step1PC} />
        <AuthStack.Screen name="Step2PC" component={Step2PC} />
        <AuthStack.Screen name="Step3PC" component={Step3PC} />
        <AuthStack.Screen name="Step4PC" component={Step4PC} />
        <AuthStack.Screen name="LoginPC" component={LoginPC} />
        <AuthStack.Screen
          name="PCNavigator"
          component={PCNavigator}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
  );
};

export default AuthPC;
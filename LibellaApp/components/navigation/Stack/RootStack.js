import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome, Selection } from "../../../pages";

import SelectNavigator from "./SelectNavigator";
import AuthPC from "./AuthPC";
import AuthPS from "./AuthPS";
import PCNavigator from "./PCNavigator";
import PSNavigator from "./PSNavigator";

import { useAuth } from "./AuthContext";

const RootStack = () => {
  const { isLogged } = useAuth();
  const { userType } = useAuth();

  return userType ? (
    userType === "Paciente" ? (
      isLogged ? (
        <PCNavigator />
      ) : (
        <AuthPC/>
      )
    ) : userType === "Psicologo" ? (
      isLogged ? (
        <PSNavigator />
      ) : (
        <AuthPS />
      )
    ) : (
      <SelectNavigator />  
    )
  ) : (
    <SelectNavigator />
  );
};

export default RootStack;

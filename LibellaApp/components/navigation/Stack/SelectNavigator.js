import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Welcome,
  Selection,
} from "../../../pages";


import AuthPS from "./AuthPS";
import AuthPC from "./AuthPC";
import { authContext } from "./AuthContext";

const SelectStack = createNativeStackNavigator();

const SelectNavigator = () => {
  return (
    <SelectStack.Navigator screenOptions={{ headerShown: false }}>
      <SelectStack.Screen name="Welcome" component={Welcome} />
      <SelectStack.Screen name="Selection" component={Selection} />
        <SelectStack.Screen
          name="AuthPS"
          component={AuthPS}
        />
        <SelectStack.Screen
          name="AuthPC"
          component={AuthPC}
        />
    </SelectStack.Navigator>
  );
};

export default SelectNavigator;
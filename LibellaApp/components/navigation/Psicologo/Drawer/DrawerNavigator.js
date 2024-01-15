import React from "react";

import { createDrawerNavigator } from '@react-navigation/drawer'

import { Perfil, Config, Chat, Ajuda, Termos, Inicio} from '../../../../pages'

import CustomDrawer from './CustomDrawer'
import BottomTab from "../BottomTab/BottomTab";

import Ionicons from 'react-native-vector-icons/Ionicons'

const Drawer = createDrawerNavigator();

function DrawerNavigator(){
    return (
        <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: "#53A7D7",
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: '#313131',
          drawerLabelStyle: {
            fontSize: 20,
            marginLeft: -15,
          },
          headerStyle:{
            backgroundColor: '#53A7D7'
          },
          headerTintColor: 'white',
        }}>
          <Drawer.Screen
            name="Início" 
            component={BottomTab}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='home-outline' size={35} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Perfil" 
            component={Perfil}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='person-outline' size={35} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Configurações" 
            component={Config}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='settings-outline' size={35} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Ajuda" 
            component={Ajuda}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='md-help-circle-outline' size={35} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Termos e Condições" 
            component={Termos}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='document-text-outline' size={35} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
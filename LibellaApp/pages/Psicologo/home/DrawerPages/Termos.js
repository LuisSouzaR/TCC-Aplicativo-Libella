import * as React from 'react';

import { StyleSheet, Text, View, ScrollView } from "react-native";

const TermosScreen = ({ navigation }) => {
    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.containerText}>

                    <Text style={styles.text}>Essa aplicação e seu conteúdo("Libella") são controlados pelo próprio Libella.
                        Todos os direitos reservados. </Text>

                    <Text style={styles.text}>Estes termos de uso têm por objeto definir as regras a serem seguidas para a
                        utilização do Libella ("Termos de Uso"), sem prejuízo da aplicação da legislação vigente.</Text>

                    <Text style={styles.text}>Ao utilizar Libella, você automaticamente concorda com estes termos de uso, responsabilizando-se
                        integralmente por todos e quaisquer atos praticados por você no Libella ou em serviços a ele relacionados. Caso você não
                        concorde com qualquer dos termos e condições estabelecidos você não deve utilizar o Libella. </Text>

                </View>

            </View>
        </ScrollView>
    );
}

export default TermosScreen;

const styles = StyleSheet.create({

    // Container
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F2F2F2',
    },


    containerText: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        marginTop: 5,
        padding: 20,
    },


    // Textos
    text: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        color: 'black',
        margin: 8,
        textAlign: 'justify'
    },

},
);
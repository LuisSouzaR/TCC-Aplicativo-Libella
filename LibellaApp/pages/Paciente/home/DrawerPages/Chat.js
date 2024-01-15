import { StyleSheet, Text, View, Image, TextInput } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";

const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <FeatherIcon
                    name="search"
                    size={20}
                    color={"#00000030"}
                    style={styles.icon}
                />

                <TextInput
                    style={styles.Input}
                    placeholder="Pesquisar contatos"
                    placeholderTextColor="#00000030"
                />
            </View>
            <View style={styles.pacienteContainer}>
                <View style={styles.containerUserImg}>
                    <Image
                        style={styles.userImg}
                        source={require('../../../../assets/img/Pessoas/Andreia.jpg')}
                    />
                </View>
                <View style={styles.containerTexts}>
                    <View style={styles.containerTopTexts}>
                        <Text style={styles.title}>Andreia Ramos</Text>
                    </View>
                    <View style={styles.containerBottomTexts}>
                        <Text style={styles.text}>Como devo realizar a...</Text>
                    </View>
                </View>
                <View style={styles.containerDataNotification}>
                    <View style={styles.containerData}>
                        <Text style={styles.textData}>data</Text>
                    </View>
                    <View style={styles.containerNotification}>
                        <Text style={styles.number}>2</Text>
                    </View>
                </View>
            </View>

            {/*Para colocar mais pacientes basta repetir todo o "pacienteContainer" PS: Com scrollView ficar bugado deixei sem por enquanto*/}
        </View>
    );
}

export default ChatScreen;

const styles = StyleSheet.create({
    //Containers 
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#F2F2F2',
        color: 'white',
        top: 10,
        gap: 20,
    },

    searchContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        paddingLeft: 20,
    },

    pacienteContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 30,
    },

    containerTexts: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerTopTexts: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginTop: 5,
    },

    containerBottomTexts: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    containerUserImg: {
        height: '100%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerDataNotification: {
        height: '90%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    containerData: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    containerNotification: {
        height: '90%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6D45C2',
        borderRadius: 100,
    },





    // Textos
    textData: {
        color: '#31313140',
        fontFamily: 'Poppins_500Medium',
        fontSize: 18,
    },

    number: {
        color: 'white',
        fontFamily: 'Poppins_500Medium',
        fontSize: 12,
        marginTop: 3,
    },

    text: {
        color: '#313131',
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
    },

    title: {
        color: 'black',
        fontFamily: 'Poppins_700Bold',
        fontSize: 17,
    },




    // Imagens
    userImg: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },

    icon: {
        maringBottom: 5,
    },




    // Elementos
    Input: {
        width: '100%',
        fontSize: 15,
        fontFamily: 'Poppins_500Medium',
        textAlign: 'left',
        marginTop: 5,
    },


});
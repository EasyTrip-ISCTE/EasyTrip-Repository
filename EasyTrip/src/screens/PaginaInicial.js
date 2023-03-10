import { ImageBackground, StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';

function PaginaInicial ({navigation}){
    return (
        <ImageBackground style={styles.background} source={require("../assets/comboio1.png")}>
            
                <Image style={styles.image} source={require("../assets/LogoEasyTrip-02.png")}></Image>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.loginButao} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registoButao} onPress={() => navigation.navigate('Registar')}>
                            <Text style={styles.text}>Registar</Text>
                        </TouchableOpacity>
                    </View>       
        </ImageBackground>
    );
}


const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: "flex-end"
    },
    buttonView: {
        width:"100%",
        alignContent: "center",
        justifyContent:"center",
        
    },
    loginButao: {
        backgroundColor: "#ffb319",
        width: "100%",
        alignItems: "center",
        padding: 18,
        shadowOpacity: 1
       
    },
    registoButao: {
        backgroundColor: "#a7cedf",
        width: "100%",
        alignItems: "center",
        padding: 18,
        
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },
    image: {
        resizeMode: "center",
        position: "relative",
        top: -230,
        width: "80%",
        left: -16
        
    }
})

export default PaginaInicial;


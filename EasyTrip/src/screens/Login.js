import React, { useEffect, useState, createContext } from 'react';
import { View, Text, Button, Image, ImageBackground, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import auth from "@react-native-firebase/auth";


// export const AuthContext = createContext();

function Login( {navigation} ) {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

/*    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(auth, (user) => {
            if (user){
                navigation.navigate("Login")
            }
        })

        return unsubscribe;
    }, []) 
*/
    // referencia da coleção
    //const docRef = doc(db, "users", auth.currentUser.uid);

    // da me o nome do utilizador (não está a funcionar)
    /* getDoc(docRef)
        .then((snapshot) => {
            const nome = snapshot.data()['PrimeiroNome'];
            console.log(nome);
        })
    */    

    //Fazer o logout (guarda sempre o ultimo login)
    

    const handleLogin = () => {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            //const nomeCompleto = getDoc(doc(db, "users", auth.currentUser.uid));
            navigation.navigate("Perfil")
            console.log("Logged in with:" , user.email);
        })
        .catch(error => alert(error.message))
    }

    

    return (
        
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.imageView}>
                <Image resizeMode='center' source={require("../assets/LogoEasyTrip.png")}></Image>
            </View>
            <View style={styles.inputView}>
                
                <TextInput 
                    placeholder='Email' 
                    value={email} 
                    onChangeText={text => setEmail(text)} 
                    style={styles.input}
                />
                <TextInput 
                    placeholder='Password' 
                    value={password} 
                    onChangeText={text => setPassword(text)} 
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={ handleLogin } style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Login;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",

    },
    imageView: {
        height: "42%",
        alignItems: "center",
        justifyContent: "center"
    },
    inputView:{
        width: "80%",
    },
    input:{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5

    },
    buttonView:{
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40
    },
    button:{
        backgroundColor: "#a7cedf",
        width: "100%",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        borderColor: "#a7cedf",
        borderWidth: 2,
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 16
    }

});

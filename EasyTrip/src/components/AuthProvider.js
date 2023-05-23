import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {    
                    try{
                        if(!email || !password){
                            Alert.alert("Erro no Login","Email ou palavra-passe incorretos")
                        }
                        else {
                            await auth().signInWithEmailAndPassword(email, password);   
                        }
                        
                    }catch (e) {
                            console.log(e);
                    }
                },
                register: async (email, password) => {
                    let correuBem = false;
                    try{
                        if(!email || !password){
                            Alert.alert("Erro no Registo","Insira email e palavra-passe válidos")
                        }
                        else {
                            await auth().createUserWithEmailAndPassword(email, password).then(() => {
                                console.log('User account created & signed in!');
                                correuBem = true;
                                return correuBem;
                            })
                            .catch(error => {
                                if (error.code === 'auth/email-already-in-use') {
                                    Alert.alert("Erro no Registo", "Este email já foi utilizado")
                                }
                                if (error.code === 'auth/invalid-email') {
                                    Alert.alert("Erro no Registo", "Este email não é válido")
                                }
                                if (error.code === 'auth/weak-password') {
                                    Alert.alert("Erro no Registo", "Palavra-passe pouco segura, insira pelo menos 6 caracteres")
                                }
                            });
                        }

                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try{
                        await auth().signOut();
                    } catch (e) {
                        console.log(e);
                    }
                }
            }}
          
        >
            {children}
        </AuthContext.Provider>
    );
};
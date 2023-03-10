import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet,TouchableOpacity, FontAwesome, FlatList} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { collection, getDocs, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';


function Bilhetes({navigation}) {

    const [localidades, setLocalidades] = useState([]);
    const [selected, setSelected] = useState("");
    const [isPasse, setIsPasse] = useState(false);
    
    const [origem, setOrigem]=useState("");
    const [destino, setDestino]=useState("");


    const [idOrigem, setIdOrigem] = useState("");
    const [idDestino, setIdDestino] = useState("");

    const [valorOrigem, setValorOrigem] = useState("");
    const [valorDestino, setValorDestino] = useState("");
    const [valor, setValor] = useState("");
    const [preco, setPreco] = useState("");

    const collectionZonas = collection(db, "zonas");

    const [bilhete, setBilhete] = useState([
        {
            Origem: "",
            Destino: "",
            Valor: ""
        }
    ]);

    useEffect(() => {
        let listaLocalidades = [];
        onSnapshot(collection(db, 'localidades'), 
        (snapshot1) => {
                snapshot1.docs.forEach((doc) => {
                    listaLocalidades.push({...doc.data(), id:doc.id});
                })
            setLocalidades(listaLocalidades.map(item => {return {key: item.id, value: item.Nome}}));
            
        })
    },[])
   

    function obterBilhete(){

        const idZonaOrigem = query(collection(db,"localidades"), where ("Nome", "==", origem));
        const idZonaDestino = query(collection(db,"localidades"), where ("Nome", "==", destino));
        console.log("Origem:",origem, "---->","Destino:",destino);
        let valorOrigemAux = 0;
        let valorDestinoAux = 0;

        //Origem   
        getDocs(idZonaOrigem).then(query => {
            query.forEach(element => {
                setIdOrigem(element.data()["idZona"]);
                console.log("IdOrigem:",element.data()["idZona"]);
                console.log("STOP 1");
        
                const refOrigem = doc(collectionZonas, element.data()["idZona"]);
                console.log("STOP 2");

                getDoc(refOrigem).then(element1 =>{
                    setValorOrigem(element1.data()["Valor"])
                    valorOrigemAux = element1.data()["Valor"];
                })
            })
        }).then(() => {
        
            //Destino
            getDocs(idZonaDestino).then(query => {
                query.forEach(element => {
                    setIdDestino(element.data()["idZona"]);
                    console.log("IdDestino:",element.data()["idZona"]);
                    console.log("STOP 3")
        
                    const refDestino = doc(collectionZonas, element.data()["idZona"]);
                    //console.log(refDestino);
                    console.log("STOP 4")
        
                    getDoc(refDestino).then(element1 =>{
                        setValorDestino(element1.data()["Valor"])
                        valorDestinoAux = element1.data()["Valor"];
                        console.log("AQUIIIII",valorDestinoAux);
                    }).then(() => {
                        console.log("AAAAAAAA" ,valorOrigemAux);
                        console.log("AAAAAAAA" ,valorDestinoAux);

                        console.log(valorOrigemAux,"----->",valorDestinoAux)
                        let valoraux = 0;
                        if(parseInt(valorOrigemAux) >= parseInt(valorDestinoAux)){
                            setValor(parseInt(valorOrigemAux)-parseInt(valorDestinoAux));
                            valoraux = parseInt(valorOrigemAux)-parseInt(valorDestinoAux);
                        }
                        else{
                            setValor(parseInt(valorDestinoAux)-parseInt(valorOrigemAux));
                            valoraux = parseInt(valorDestinoAux)-parseInt(valorOrigemAux)
                        }
            
                        console.log("Valor:",valoraux);
                        console.log("STOP 5")

                        //Preço 
                        const refZonasPreco = doc(db,"zonas_preco", valoraux.toString());
            
                        console.log("STOP 6")

                        let precoaux = 0;
                        getDoc(refZonasPreco).then(element3 =>{
                            setPreco(element3.data()["Preco"]);
                            precoaux = element3.data()["Preco"];
                            console.log(element3.data());
            
                            console.log("Preço:",precoaux)

                            console.log({
                                Origem: origem,
                                Destino: destino,
                                Valor: precoaux
                            });

                            navigation.navigate("Pagamento", {titulo:{Origem: origem,Destino: destino,Valor: precoaux},IsPasse: isPasse});
                        })
                    })
                })

            })
    
        });
        
        //Valor
        
        
        //getDocs(queryBilhete).then(query => {
        //    query.forEach((doc) => {
        //        listaBilhete.push({...doc.data(), id:doc.id});
        //        console.log("Bilhete",doc.data());
        //    })
        //    setBilhete(listaBilhete[0]);
            /*console.log(origem);
            if(origem == undefined || destino == undefined){
                {Popup.show({
                    type: 'warning',
                    title: 'Erro na compra do bilhete',
                    textBody: 'Verifique se os campos foram selecionados corretamente',
                    buttonText: 'Fechar',
                    okButtonStyle:{ backgroundColor: '#ffb319'},
                    callback: () => Popup.hide()
                })}
            }
            else{*/
                 
                 
            //}
           
        //})
    }

    return (
        <View  style={styles.container}>
            <Text style={styles.title}>Origem:</Text>

            <SelectList
                setSelected={setOrigem}
                data={localidades}
                save="value"

                boxStyles={{ backgroundColor:"#a7cedf", borderRadius: 10 }}
                inputStyles={{fontSize: 18, fontWeight: 'bold'}}
                dropdownStyles={{ borderRadius: 5, borderWidth:4, borderColor:"#ffb319"}}
                dropdownTextStyles={{fontSize: 18, fontWeight: 'bold'}}
                placeholder="Selecione uma estação"
                searchPlaceholder='Selecione uma estação'
            />

            <Text>{'\n'}{'\n'}{'\n'}</Text>
            <Text style={styles.title}>Destino:</Text>
            
            <SelectList
                setSelected={setDestino}
                data={localidades}
                save="value"

                placeholder="Selecione uma estação"
                boxStyles={{ backgroundColor:"#a7cedf", borderRadius: 10}}
                inputStyles={{fontSize: 18, fontWeight: 'bold'}}
                dropdownStyles={{ borderRadius: 5, borderWidth:4, borderColor:"#ffb319"}}
                dropdownTextStyles={{fontSize: 18, fontWeight: 'bold'}}
                SearchPlaceholder='Selecione uma estação'
            />
            
        

            <TouchableOpacity style={styles.buttonSearch} 
                onPress={() => obterBilhete() }>
                <Text style={styles.buttonText}>Comprar</Text>
            </TouchableOpacity>
        </View> 
       
    );
}

export default Bilhetes;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop:100,
        margin: 30,
    },

    title:{
        textAlign:'center',
        textAlignVertical:'center',
        fontWeight: 'bold',
        fontSize: 30,
    },

    list:{
        marginLeft: 14,
        marginRight: 14,
        marginTop: 14
    },

    buttonSearch:{
        backgroundColor: "#ffb319",
        alignItems: "center",
        alignSelf:'center',
        borderRadius: 10,
        width:120,
        height:40,
        marginTop:100
    },

    buttonText:{
        textAlign:'center',
        textAlignVertical:'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:5,
    },

})
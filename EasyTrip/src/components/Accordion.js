import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={"gray"} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text>{this.props.data}</Text>    
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: "black",
    },
    row:{
        flexDirection: 'row',
        width:"100%",
        justifyContent:'space-between',
        height:56,
        paddingLeft:18,
        paddingRight:32,
        alignItems:'center',
        backgroundColor: "white",
    },
    parentHr:{
        height:1,
        color: "white",
        width:'100%'
    },
    child:{
        backgroundColor: "light-grey",
        padding:16,
    }
    
});
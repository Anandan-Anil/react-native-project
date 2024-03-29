import { StyleSheet, Text, TextInput, View,TouchableOpacity,ImageBackground, ScrollView, } from 'react-native'
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../firebase";

const Login = ({navigation}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const add=() => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      navigation.navigate('post')
    })
    .catch((error) => {
      console.error('wrong email and password', error);
      alert('wrong email and password');
    })
   

  }
  return (
    <ScrollView>
    <View style={styles.l}>
    <ImageBackground
     source={require('./to1.jpg')}
      style={{ resizeMode: 'cover'}} >
      <View style={styles.l1}>
        <TextInput 
        value={email}
        onChangeText={(text)=> setEmail(text)}
        style={styles.l2}
        placeholder='Email' 
        placeholderTextColor="black"/>
        <TextInput 
        value={password}
        onChangeText={(text)=> setPassword(text)}
        style={styles.l3}
        placeholder='Password'
        placeholderTextColor="black" />
        <TouchableOpacity>
        <Text style={styles.l4}>forgot_password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>add()} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      <View>

      </View>
      </ImageBackground>
    </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
    l:{
      alignContent:'center',
      flex:1,
    },
    
    l1:{
        backgroundColor:"transparent",
        height:350,
        width:400,
        paddingTop:-50,
        alignItems:"center",
        marginTop:400,
    },
    l2:{
      borderColor: "black",
    backgroundColor:'transparent',
    opacity:1,
    borderWidth: 3,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginLeft:10,
    alignItems: "center",
    color: 'blue',
    padding:10,
    fontWeight:'bold',
    marginTop:70,
    },
    l3:{
      borderColor: "black",
    backgroundColor:'transparent',
    borderWidth: 3,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginLeft:10,
    alignItems: "center",
    color: 'blue',
    padding:10,
    marginTop:50,
    fontWeight:'bold',
    },
    l4:{
      color:"red",
      marginTop:20,
      marginRight:150,
    },
    loginBtn:{
      backgroundColor:"gold",
      width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        // marginTop:0,
        marginBottom:70,
        marginLeft:50,
    },
    loginText:{
      fontWeight:"bold",
        fontSize:20,
    },
    
})
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ScrollView,
  } from "react-native";
import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth,getFirestore,addDoc, collection} from "../firebase";


const Register = ({navigation}) => {
  const[name,setName] = useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const add=() => {
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredentials) => {
   const user=userCredentials.user;
   const userid=user.uid;
   
   const Company = {
    name:name,
    email:email,
    id:userid,
   };
   const db= getFirestore();
   addDoc(collection(db,"users"),Company )
   .then(()=> {
     console.log("success"  )
   })
   Alert.alert("ffhjgjg")
  })
  .catch(error =>{
    console.log("error",error);
  })
 navigation.navigate('login')
}
  return (

   <ScrollView>
    <View>
            <ImageBackground
      source={require('./bj.jpg')}
    >
         <View style={styles.n1}>
            <TextInput 
            value={name}
            onChangeText={(text)=> setName(text)}
            style={styles.n2}
             placeholder="Name."
             placeholderTextColor="#ADD8E6"
             />
              <TextInput 
              value={email}
              onChangeText={(text)=> setEmail(text)}
              style={styles.n3}
             placeholder="Email."
             placeholderTextColor="#ADD8E6"
             />
              <TextInput 
              value={password}
              onChangeText={(text)=> setPassword(text)}
              style={styles.n3}
             placeholder="password"
             placeholderTextColor="#ADD8E6"
             />
             <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>


         </View>
         <View>
         <TouchableOpacity onPress={()=>add()} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
         </View>
         </ImageBackground>
    </View>
    </ScrollView>
  );
}
export default Register

const styles = StyleSheet.create({
    n1:{
        height:400,
        width:400,
        backgroundColor:"transparent",
        marginTop:350,
    },
    n2:{
    borderColor: "#ADD8E6",
    backgroundColor:'transparent',
    borderWidth: 3,
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginLeft:50,
    alignItems: "center",
    color: 'white',
    padding:10,
    marginTop:50,
    },
    n3:{
        borderColor: "#ADD8E6",
        backgroundColor:'transparent',
        borderWidth: 3,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginLeft:50,
        alignItems: "center",
        color: 'white',
        padding:10,
        marginTop:50,
        },
    forgot_button:{
    backgroundColor:'transparent',
    height: 50,
    paddingLeft:50,
    marginTop:30,
    color:"#FFFACD",
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop:50,
        marginBottom:30,
        backgroundColor:'#ADD8E6',
        marginLeft:30,
      },
      loginText:{
        fontWeight:"bold",
        fontSize:20,
      }
})
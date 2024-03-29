import { StyleSheet, Text, TouchableOpacity, View,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {auth, collection,getDocs, query, where,addDoc,db,doc} from "../firebase";
const Profile = ({navigation}) => {
  const pro=() => {
    navigation.navigate('Content')
  }
  const [data ,setData]=useState([])

const fetchdata = async () => {
  try{
         const user=auth.currentUser;
         console.log("Sucess",user);

         if(user){

           const userid = user.uid
           console.log("id:",userid);
           const usersRef= collection(db,'users');
           const q =query(usersRef,where('id' ,'==' , userid));
           const querySnapshot = await getDocs(q);
           console.log("hghhghjgkjkjk:",querySnapshot);

           if(querySnapshot.empty){
            console.log("No Documents");
            return;
           }

           const fetcheddata =querySnapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data(),
            
           }))
           setData(fetcheddata)
         }

 }
  catch(error){
console.error("Error fetching",error);
  }
}

useEffect(() => {
  fetchdata();

},[] );
  return (
    <View style={styles.p}>
        
            
        <TouchableOpacity>
        
      <View style={styles.p1}>
      </View>
      </TouchableOpacity>
      {data.map((post) => (
      <Text style={styles.t1}>{post.name}</Text>
      ))}
      <TouchableOpacity>
        <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:20,color:'#EEE0C9'}}>edit profile</Text>
      </TouchableOpacity>
      <View style={styles.p2}>
        
      <TouchableOpacity onPress={()=>pro()}>
        <Ionicons style={styles.ic1} name='duplicate' size={70}  />
        <Text style={{alignSelf:'center',color:'#EEE0C9',fontWeight:'bold'}} >Add post</Text>
        </TouchableOpacity>
        <View style={styles.p3}>

        </View>
        <View style={styles.foot}>

        </View>
        
        <View style={styles.foot1}>
          
        <TouchableOpacity>
        <Text style={{alignSelf:'center',fontSize:20,marginTop:10,color:'green',fontWeight:'bold',fontFamily:'serif'}}>Terms and Condition</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
    
  )
}

export default Profile

const styles = StyleSheet.create({
    p:{
        flex:1,
        backgroundColor:'#5C5470',
    },
    p1:{
        backgroundColor:'#EEE0C9',
        height:100,
        width:100,
        marginLeft:150,
        marginTop:50,
        borderRadius:30,
        borderWidth:3,
        borderColor:"lightgreen",
    },
    p2:{ 
        backgroundColor:'transparent',
        height:400,
        width:400,
        marginTop:10,
        alignItems:'center',
       
    },
    ic1:{
        marginTop:100,
        color:'#EEE0C9',
    },
    t1:{
      alignSelf:'center',
      marginTop:20,
      fontSize:20,
      color:'#EEE0C9'
    },
    p3:{
      backgroundColor:'transparent',
      height:50,
      width:400,
      position: 'absolute',  top:0,
    },
    foot:{
      height:250,
      width:370,
      marginLeft:-30,
      marginTop:20,
      backgroundColor:'transparent',
      borderRadius:10,
    },
    foot1:{
      width:380,
      height:50,
      backgroundColor:'white',
      position: 'fixed',
      marginTop:120,
      borderRadius:50,
    }
      
})
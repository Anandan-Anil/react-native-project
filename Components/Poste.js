import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View,RefreshControl } from 'react-native'
import React, { useEffect, useState,} from 'react'
import { Ionicons } from '@expo/vector-icons';
import {auth, collection,getDocs, query, where,addDoc,db,doc,deleteDoc,} from "../firebase";

const Poste = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  
  // const deletePost = async (userid) => {
  //   try 
  //     await deleteDoc(doc(db, 'post', userid));
  //     fetchdata();
  //   } catch (error) {
  //     console.error("Error deleting post", error);
  //   }
  // };

  const pri=() => {
    navigation.navigate('Content')
  }
  const pro=() => {
    navigation.navigate('profile')
  }
  
  const [data ,setData]=useState([]);

const fetchdata = async () => {
  try{
         const user=auth.currentUser;
         console.log("Sucess",user)

         if(user){

           const userid = user.uid
           console.log("id:",userid);
           const usersRef= collection(db,'post');
           const q =query(usersRef);
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

const deleteCollection = async () => {
  try {
    const userRef = collection(db, 'post');
    const querySnapshot = await getDocs(userRef);

    const deletePromises = [];
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);

    console.log('Collection "post" successfully deleted!');
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};
 

useEffect(() => {
  
  fetchdata()

},[]);

  return (
    <View style={styles.p}>
      
      <View style={styles.p1}>
      <Ionicons style={styles.ic1}  name="ellipsis-vertical" size={40} />
      <TouchableOpacity onPress={()=>pro()}>
      <Ionicons style={styles.ic} name="person-circle-outline" size={40} />
      </TouchableOpacity>
     </View>
     
<ScrollView style={styles.fg} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {
            onRefresh();
            fetchdata();}} />
        }>


{data.map((post) => (
     <View style={styles.p2}>
      
     <TouchableOpacity>
        <View style={styles.p3}>
             
        </View>
        
       
    <View><Text  style={{ fontSize: 20, marginLeft: 70, color: "black",marginTop:-40,fontWeight:'bold',fontFamily:'serif' }}>
      {post.name}
    </Text> 
    <TouchableOpacity onPress={()=>deleteCollection()}>
    <Ionicons style={styles.ic3}  name="close" size={40} />
    </TouchableOpacity>
    </View>
    </TouchableOpacity>
    <View style={styles.p4}>
    <Text  style={{ fontSize: 20, color: "#61677A",marginTop:40,fontFamily: "monospace",fontWeight:'bold',fontSize:30 }}>
      {post.Content}
    </Text>
    </View>
     </View> 
 
 ))}

    
     </ScrollView>
     <View style={styles.foot1}>
        
        <TouchableOpacity onPress={()=>pri()}>
        <Ionicons style={{marginLeft:100,marginTop:0}}  name="add-circle" size={40} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Ionicons style={{marginTop:-40, marginLeft:280}}  name="heart" size={40} />
        </TouchableOpacity>
        </View>
         </View>
  )
}

export default Poste

const styles = StyleSheet.create({
  p:{
    backgroundColor:'black',
    flex:1
  },
  
  p1:{
    height:100,
    width:390,
    backgroundColor:'#EEEDED',
    marginTop:40,
    opacity:.6,
    borderRadius:40,
    flexDirection:'row', 
    
  },
  ic:{
    paddingTop:25,
    marginLeft:250,
    color:'black',
  },
  ic1:{
    paddingTop:25,
    marginLeft:20,
    color:'black',
  },
  p2:{
    marginTop:20,
    height:400,
    width:375,
    marginLeft:10,
    backgroundColor:'#EEE0C9',
    borderRadius:10,
  },
  p3:{
    height:40,
    width:40,
    borderRadius:60,
    backgroundColor:'black',
    marginLeft:10,
    marginTop:10,
    flexDirection:'row',
  },
  p4:{
    backgroundColor:'transparent',
    marginTop:100,
    alignItems:'center',
  },
  foot1:{
    width:400,
    height:40,
    backgroundColor:'white',
  },
  fg:{
    marginBottom:10,
    
  },
  ic3:{
    marginLeft:320,
    marginTop:-30,
  }
})
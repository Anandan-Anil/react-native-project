import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { auth, storage, ref, uploadBytes, getDownloadURL, getFirestore, addDoc, collection,db} from '../firebase';
import { Ionicons } from '@expo/vector-icons';
const Content = ({navigation}) => {

    const[name,setName] = useState("");
    const[content,setContent]=useState('');
    const[pic,setPic] = useState('');

    const add=async () => {
        const user=auth.currentUser;
        const newCollectionRef = collection(db, 'post');
        try {
            const userid = user.name
            console.log("id:",userid);
            await addDoc(newCollectionRef, {
              name: name,
              id: 'userid',
             Content:content,
             imageURL: pic,
            });
      
            console.log('Document added successfully.');
          } catch (error) {
            console.error('Error adding document:', error);
          }
          navigation.navigate('post')
        };
        


        const uploadImage = async () => {
          try {
            const { assets } = await ImagePicker.launchImageLibraryAsync();
      
            if (assets && assets.length > 0) {
              const selectedAsset = assets[0];
              console.log("ii",selectedAsset.uri);
              const response = await fetch(selectedAsset.uri);
              console.log("hi",response);
              const blob = await response.blob();
      
              console.log("selected", selectedAsset);
      
              const storageRef = ref(storage, `photos/${selectedAsset.assetId}`);
              await uploadBytes(storageRef, blob);
      
              // Get the public URL of the uploaded image
              const imageURL = await getDownloadURL(storageRef);
      
              console.log('Image uploaded successfully:', imageURL);
      
              // Update the state with the uploaded image URL
              setPic(imageURL);
            }
          } catch (error) {
            console.log('Error uploading image:', error);
          }
        };
      




  return (
    <View>
      <Text style={styles.c1}>POST ANY CONTENT </Text>
      <View style={styles.c2}>
       <TextInput style={styles.c3}
       value={content}
       onChangeText={(text)=> setContent(text)}
        placeholder='type a content to display' 
        placeholderTextColor="black">

       </TextInput>
       <TextInput style={styles.c3}
       value={name}
       onChangeText={(text)=> setName(text)}
        placeholder='type your name' 
        placeholderTextColor="black">

       </TextInput>

       <TouchableOpacity onPress={()=>uploadImage()}>
       <Ionicons style={styles.ic1} name='duplicate-outline' size={50}  />
       <Text style={{fontWeight:'bold',marginLeft:130}}>Add an image</Text>
        </TouchableOpacity>
        {pic && <Image source={{ uri: pic }} style={styles.image} />}

      </View>
      <View>
      <TouchableOpacity onPress={()=>add()} style={styles.postBtn}>
        <Text style={styles.posttext}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  }

export default Content

const styles = StyleSheet.create({
    c1:{
        alignSelf:'center',
        marginTop:80,
        fontSize:30,
        fontWeight:'300',
        textShadowColor: 'rgba(0, 0, 0, 0.9)', 
        textShadowOffset: { width: 2, height: 3 },
        textShadowRadius: 4,
        color:'brown',
    },
    // c2:{
    //    backgroundColor:'lightblue',
    //    height:100,
    //    width:400,
    // },
    c3:{
    marginTop:50,
    height:50,
    borderColor:'black',
    borderWidth:2,
    borderRadius:10,
    paddingLeft:20,
    fontWeight:'900'
    },
    postBtn:{
        backgroundColor:"black",
      width: 150,
        borderRadius: 25,
        height: 50,
         marginTop:50,
        
        marginLeft:100,
    },
    posttext:{
        fontWeight:"bold",
          fontSize:20,
          color:'white',
          paddingLeft:50,
          paddingTop:10,
      },
      ic1:{
        marginTop:30,
        marginLeft:150,
      }
})
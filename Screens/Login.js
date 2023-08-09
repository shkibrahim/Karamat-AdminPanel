import React from 'react';
import { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import Video from 'react-native-video';
import {
  View,
  Text,
  TouchableOpacity,KeyboardAvoidingView ,
  StyleSheet,ActivityIndicator,
  Pressable,
  ScrollView,Image,
  ImageBackground,
  TextInput

} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { StorageKeys } from '../Data/StorageKeys';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Loginpass, setLoginpass] = useState();
  const [Loginid, setLoginid] = useState();
    const [isChecked, setChecked] = useState(false);
  
    const handleToggleCheckbox = () => {
      setChecked(!isChecked);
    };
  








    const [isChecked1, setChecked1] = useState(false);
  
const handleToggleCheckbox1 = () => {
  setChecked1(!isChecked1);
  if (isChecked1) {
    setclr({ bgcolor: '#0f034b' ,img: require('../Images/mainlogodark.png') });
  } else {
    setclr({ bgcolor: '#333333', borderclr: 'white' , img: require('../Images/mainlogo.png')});
  }
};

    var Login = () => {
      console.log('gg')
      if(Loginid== null || Loginpass == null){
        alert ('Fill the ID and password')
      }
      else{
        setIsLoading(true);
        firestore()
          .collection('Users')
          .where('UserID', '==', Loginid)
          .where('Password', '==', Loginpass)
          .get()
          .then((querySnapshot) => {
            if(querySnapshot.empty){
              alert('Incorrect ID or password!')  
            }

            if(isChecked==true){
              // Login successful
                querySnapshot.forEach((documentSnapshot) => {
                const user = documentSnapshot.data();
  
                AsyncStorage.setItem(StorageKeys.CurrentUser, JSON.stringify(user))
                .then(() => {
                  console.log('User Stored Successfully')
                })
                .catch((error) => console.log(error));
                navigation.replace("Home")
              });
            }
           if(isChecked==false){
              // Login successful
                querySnapshot.forEach((documentSnapshot) => {
               
                navigation.replace("Home")
              });
            }
          })
          .catch((error) => {
            alert('Error: ' + error);
          });
      }
    }
    const [modalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
    const [clr, setclr] = useState ({bgcolor:'#0f034b' , boxcolor: "white", borderclr:'white', img: require('../Images/mainlogo.png')});




  return (
    <View style={{ backgroundColor:'white', height:'100%', }}>
           <Modal
        visible={modalVisible}
        // animationInTiming= '400'
        // animationType="slide"
    
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        animationInTiming={2000}
        animationOutTiming={2000}
        // animationIn= "slideInUp"
        // animationOut="slideOutDown"
        transparent={true}
        onRequestClose={toggleModal}
     style={{ width:'100%',marginTop:0, marginLeft:0 }} >
        <TouchableOpacity
          style={styles.modalBackground}
          // activeOpacity={1}
          onPressOut={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={{flexDirection:'row', justifyContent:"space-between"}}>

              <View></View>
          <Image
          source={require('../Images/mainlogo.png')}
          style={{height: 20, width: '30%',  marginTop:'4%',marginLeft:'10%'}}
        />
            <View style={{ height:35, width:35, borderRadius:20,borderColor:"gray", borderWidth:0.5 ,marginTop:'2%',marginRight:'2%', justifyContent:'center', alignItems:'center'}}>
            <Image
            source={require('../Images/close.png')}
            style={{height: '100%', width: '100%'}}
          />
            </View>

            </View>


            <View style={{justifyContent:'space-evenly', marginTop:'8%', flexDirection:'row'}}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
            <TouchableOpacity style={{ height:35, width:35, borderRadius:20,borderColor:"gray", borderWidth:0.5 , justifyContent:'center', alignItems:'center', marginBottom:'9%'}}>
            <Image
            source={require('../Images/home.png')}
            style={{height: '44%', width: '44%'}}
          />

            </TouchableOpacity>
            <Text style={{color:'black', fontSize:12}}>Home</Text>
            </View>

<View style={{flexDirection:'column', alignItems:'center'}}>
            <TouchableOpacity style={{ height:35, width:35, borderRadius:20,borderColor:"gray", borderWidth:0.5 , justifyContent:'center', alignItems:'center',marginBottom:'6%'}}  onPress={handleToggleCheckbox1}>
            <View style={[styles.checkbox1, isChecked1 ? styles.checked : null]}  >

      <Image source={require("../Images/tick2.png")} style={{height:'70%', width:'70%'}}/>
        {/* <Text>h</Text> */}
      </View>
            </TouchableOpacity>
            <Text style={{color:'black', fontSize:12}}>DarkTheme</Text>
            </View>
            <View style={{flexDirection:'column', alignItems:'center'}}>
            <TouchableOpacity style={{ height:35, width:35, borderRadius:20,borderColor:"gray", borderWidth:0.5 , justifyContent:'center', alignItems:'center',marginBottom:'9%'}}>
            <Image
            source={require('../Images/profile.png')}
            style={{height: '44%', width: '44%'}}
          />
            </TouchableOpacity>
            <Text style={{color:'black', fontSize:12}}>Profile</Text>
            </View>

            <View style={{flexDirection:'column', alignItems:'center'}}>
            <TouchableOpacity style={{ height:35, width:35, borderRadius:20,borderColor:"gray", borderWidth:0.5 , justifyContent:'center', alignItems:'center',marginBottom:'9%'}}
           >
            <Image
            source={require('../Images/logout.png')}
            style={{height: '44%', width: '44%'}}
          />
            </TouchableOpacity>
            <Text style={{color:'black', fontSize:12}}>Logout</Text>
            </View>

            </View>
            {/* <Text style={styles.modalText}>Hello!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Hide modal</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </Modal>
        {/* <View style={{}}></View> */}
        <View style={{  justifyContent:"space-between", flexDirection:'row' , alignItems:'center', marginTop:16,marginRight:10,marginBottom:20 ,}}>
     
     <Image source={clr.img} style={{height:20, width:100}}/>
     <TouchableOpacity style={{backgroundColor: '#ff5400', width:35, height:35, borderRadius:30 , alignContent:'center', 
     marginLeft:50,justifyContent:"center", alignItems:'center'}}
     onPress={toggleModal}>

<Image source={require("../Images/drawer.png")} style={{height:'40%', width:'30%'}}/>
</TouchableOpacity>
    
    
    
    
    
    
    
    
     </View>
     <ScrollView>
       <View style={{  borderRadius:10, width:"95%" , alignSelf:'center' ,alignItems:"center" ,paddingTop:6,}}>

       <Image source={require("../Images/esperanzalogo.png")} style={{height:140, width:'100%', marginBottom:120}}/>
       </View>
       {/* <Text style={{color: '#ff5400', fontSize:14, alignSelf:"center"}}> Enter your credentials provided by the Company  </Text> */}
    
     
      <View style={{  backgroundColor:'#0f034b',borderTopRightRadius:70, borderTopLeftRadius:70,height:470  }}>

        <Text style={{fontSize:26 , paddingTop:20,marginLeft:20, color:"white", marginBottom:40}} > Welcome </Text>
        <Text style={{color: '#ff5400', fontSize:12, alignSelf:"flex-start",marginLeft:29,}}>Enter Details to Login  </Text>


   
      <View>
        <TextInput style={{   height: 40,width:'85%',
        alignSelf:'center',
    // borderColor: 'gray',
    color:'white',
    // borderWidth: 1,
    marginBottom:20,
    borderColor:'gray',
    borderBottomWidth:1,
   
    paddingHorizontal: 10,}}  
    
   value={Loginid}
   onChangeText={setLoginid}
    placeholder='Enter User ID'
    placeholderTextColor= 'gray'/>
      </View>
    {/* </KeyboardAvoidingView> */}


        {/* <Text style={{marginLeft:40,color:"white",fontWeight:"bold"}}>Password </Text> */}

      <View>
        <TextInput 
      style={{   height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    borderColor:'gray',
    color:'white',
    width:'85%',
    alignSelf:'center',
    borderBottomWidth:1,
   
   }} 

   value={Loginpass}
   onChangeText={setLoginpass}
   password={true}
   secureTextEntry={true}
    placeholder='Enter Password'
    placeholderTextColor= 'gray' />
    
      </View>
    {/* </KeyboardAvoidingView> */}

    <View style={{flexDirection:'row', marginBottom:100}}>
    <Text style={{marginLeft:30,fontSize:12,marginTop:12, color:"gray"}}>Remember me</Text>
    <TouchableOpacity style={styles.checkboxContainer} onPress={handleToggleCheckbox}>


      <View style={[styles.checkbox, isChecked ? styles.checked : null]}  >

      <Image source={require("../Images/tick1.png")} style={{height:'120%', width:'120%'}}/>
        {/* <Text>h</Text> */}
      </View>
      {/* <Text style={styles.label}>Check me</Text> */}
    </TouchableOpacity>
    </View>
    
    {/* </ScrollView> */}
    
    <TouchableOpacity
          style={{
            backgroundColor: '#ff5400',
            width: '60%',
            borderRadius: 39,
            height: 55,
            marginBottom:32,
            
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf:'center'
            
          }}
          onPress={Login}
        >
          {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
         
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Login</Text>
            )}
          </TouchableOpacity>

      </View>
      </ScrollView>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
   
    // backgroundColor: '#ff5400',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop:12,
    marginLeft:10,
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '24%',
    backgroundColor: '#fff',
borderRadius:20
  },
  modalBackground: {
    flex: 1,
    width:'100%',
    // height:180,
    borderRadius:20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  checkbox1: {
    width: 35,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    height: 35,
  borderWidth:1,
    borderColor: 'grey',
    backgroundColor:"blue",
    borderRadius: 24,
    // marginRight: 10,
  },
  checkbox: {
    width: 20,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    height: 20,
   
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 4,
    // marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checked: {
    backgroundColor: 'white'},

    
});

import React from 'react';
import { useEffect, useState,useRef } from 'react';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {settings-applications} from 'react-native-vector-icons/MaterialIcons';
import { StorageKeys } from '../Data/StorageKeys';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
// import {fa-regular fa-house-blank} from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,Animated ,Button,
  Pressable,Dimensions,
  ScrollView,Keyboard,
  Image,                                  
  ImageBackground,
} from 'react-native';
import AddProducts from './AddProducts';
// import {  TextInput} from 'react-native-paper';
// import { TextInput } from 'react-native-material-ui';
const Home = ({ navigation }) => {

  const Logout = () => {
    AsyncStorage.removeItem(StorageKeys.CurrentUser);
    navigation.replace('Login');
  }

  const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: FontAwesome;
  }`;
  state = {
    visibleModal: null,
  };
  const windowHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const delay = 5000; // Delay between stopping at each component (in milliseconds)
    const scrollDuration = 9000; // Duration for a complete scroll (in milliseconds)
    const componentWidth = 10000; // Width of each component

    let timeoutId;

    const startScrollAnimation = () => {
      const scrollX = scrollViewRef.current?.contentOffset?.x || 0;
      const componentIndex = Math.floor(scrollX / componentWidth);
      const targetOffset = (componentIndex + 10) * componentWidth;

      scrollViewRef.current?.scrollTo({ x: targetOffset, animated: true });

      timeoutId = setTimeout(() => {
        startScrollAnimation();
      }, scrollDuration + delay);
    };
  

    startScrollAnimation(); // Start the initial animation

    // Clean up the timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleScrollEnd = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const contentOffsetX = contentOffset.x;
    const contentWidth = contentSize.width;
    const containerWidth = layoutMeasurement.width;
  
    if (contentOffsetX + containerWidth >= contentWidth) {
      // Reached the end of ScrollView, scroll back to the beginning
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  };

 


    const [isKeyboardActive, setIsKeyboardActive] = useState(false);

    // useEffect(() => {
    //   const keyboardDidShowListener = Keyboard.addListener(
    //     'keyboardDidShow',
    //     () => setIsKeyboardActive(true),
    //   );
    //   const keyboardDidHideListener = Keyboard.addListener(
    //     'keyboardDidHide',
    //     () => setIsKeyboardActive(false),
    //   );
  
    //   return () => {
    //     keyboardDidShowListener.remove();
    //     keyboardDidHideListener.remove();
    //   };
    // }, []);





    const [Quantity, setQuantity] = useState();
    const [Price, setPrice] = useState();
    const [Name, setName] = useState();
    const [ProductCode, setProductCode] = useState();
    const [productlist, setproductlist] = useState([]);
    const [edit,setEdit]=useState(null);

    const Add = () => {
     
        if (Quantity == null || Price== null ||  ProductCode == null || Name== null){
            
alert("Fill the details")
        }
    else {
        console.log('hll')
        const AddProduct = {
            key: Math.random().toString(),
            Quantity: Quantity,
            Price:Price,
            Name:Name,
            ProductCode:ProductCode,
        
        }
        setproductlist((oldList) => [...oldList, AddProduct])
        setQuantity('')
        setName('')
        setPrice('')
        setProductCode('')
     
    }
}
const sortedData = productlist.sort((a, b) => a - b);
const [isChecked, setChecked] = useState(false);
  
const handleToggleCheckbox = () => {
  setChecked(!isChecked);
  if (isChecked) {
    setclr({ bgcolor: '#0f034b' ,img: require('../Images/mainlogodark.png') });
  } else {
    setclr({ bgcolor: '#333333', borderclr: 'white' , img: require('../Images/mainlogodark.png')});
  }
};

const [clr, setclr] = useState ({bgcolor:'#0f034b' , boxcolor: "white", borderclr:'white', img: require('../Images/mainlogodark.png')});



  return (
    <View style={{ backgroundColor:clr.bgcolor, height:'100%', position:'absolute', width:'100%',}}>
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
            <TouchableOpacity style={{ height:35, width:35, borderRadius:20,borderColor:"gray", borderWidth:0.5 , justifyContent:'center', alignItems:'center',marginBottom:'6%'}}  onPress={handleToggleCheckbox}>
            <View style={[styles.checkbox, isChecked ? styles.checked : null]}  >

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
            onPress={Logout}>
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
   
        {/*Header*/}
    <View style={{  justifyContent:"space-between", flexDirection:'row' , alignItems:'center', marginTop:16,marginRight:10,marginBottom:20 ,}}>
     
      <Image source={clr.img} style={{height:20, width:100}}/>
      <TouchableOpacity style={{backgroundColor: '#ff5400', width:35, height:35, borderRadius:30 , alignContent:'center', 
      marginLeft:50,justifyContent:"center", alignItems:'center'}}
      onPress={toggleModal}>

<Image source={require("../Images/drawer.png")} style={{height:'40%', width:'30%'}}/>
</TouchableOpacity>
     
     
     
     
     
     
     
     
      </View>

  <ScrollView style={{height:'100%'}}> 
      <View style={{backgroundColor:'white', width:'90%', alignSelf:'center', borderRadius:13, height:60, flexDirection:'row', padding:12, marginBottom:20, borderColor:clr.borderclr, borderWidth:2}}>

        <View style={{alignItems:"center", justifyContent:"center"}}>
<View style={{width:49,height:49, borderRadius:40, backgroundColor:'gray', alignSelf:"center", alignItems:'baseline' , justifyContent:'flex-end' }}>
<View style={{width:19,height:19, borderRadius:20, backgroundColor:'red', alignSelf:"flex-end", }}>


</View>
</View>

        {/* <Text>Ali</Text> */}
      </View>

<View style={{flexDirection:'column',}}>
    <Text style={{color:'black', fontSize:18, marginLeft:12,}}>Esperanza Owner</Text>
    <Text style={{color:'blue', fontSize:10, marginLeft:12}}>Ibrahim Sheikh</Text>
</View>

      </View>

      <View style={{backgroundColor:'white', width:'95%', alignSelf:'center', borderRadius:13, height:110, flexDirection:'column', paddingTop:12, paddingBottom:18, marginBottom:20}}>

<View style={{flexDirection:'row',}}>
    <Text style={{color:'black', fontSize:15,fontWeight:'bold',marginLeft:12,marginBottom:12}}> Orders</Text>

    {/* <Image source={require("../Images/arrow.png")} style={{height:32, width:32,alignSelf:'center',marginTop:0}}/> */}

</View>
<View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
<View style={{flexDirection:'column', alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
    <TouchableOpacity>
     <Text style={{color:'blue'}}>Pending</Text>
     </TouchableOpacity>
     </View>

    
     <View style={{flexDirection:'column', alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <TouchableOpacity>
     <Text style={{color:'blue'}}>To Ship</Text>
     </TouchableOpacity>
     </View>
   

     <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <TouchableOpacity>
     <Text style={{color:'blue'}}>Shipped</Text>
     </TouchableOpacity>
     </View>
    
     <View style={{flexDirection:'column', alignItems:'center', }}>
     <Text style={{color:'#18A6DA'}}>0</Text>
     <TouchableOpacity>
     <Text style={{color:'blue'}}>Returned</Text>
     </TouchableOpacity>
     </View>
     </View>











</View>










<View style={{backgroundColor:'white', width:'95%', alignSelf:'center', borderRadius:13, height:170, flexDirection:'column', paddingTop:12, paddingBottom:18, marginBottom:20}}>

<View style={{flexDirection:'row',}}>
    <Text style={{color:'black', fontSize:15,fontWeight:'bold',marginLeft:12,marginBottom:12}}> Products</Text>

    {/* <Image source={require("../Images/arrow.png")} style={{height:32, width:32,alignSelf:'center',marginTop:0}}/> */}

</View>
<TouchableOpacity style={{height:50,backgroundColor: '#fbeee8', width:'90%' ,alignSelf:'center', borderWidth:2,borderColor:'#ff5400',alignItems:'center',marginBottom:12,justifyContent:'center', borderRadius:10, borderStyle:'dotted', flexDirection:'row'}}
   onPress={() => navigation.navigate('AddProducts')}>
<Text style={{color:'#ff5400', fontSize:16, fontWeight:'bold'}}>+   </Text>
<Text style={{color:'#ff5400', fontSize:16}}>Add Product</Text>
</TouchableOpacity>

<View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
<View style={{flexDirection:'column', alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <Text style={{color:'gray'}}>Shawls</Text>
     </View>

     <View style={{backgroundColor:'gray', height:30, width:1, alignSelf:"center", marginLeft:12, marginRight:12}}></View>
     <View style={{flexDirection:'column', marginLeft:12, alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <Text style={{color:'gray'}}>Stollers</Text>
     </View>
   
     <View style={{backgroundColor:'gray', height:30, width:1, alignSelf:"center", marginLeft:12, marginRight:12}}></View>
     <View style={{flexDirection:'column', marginLeft:12, alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <Text style={{color:'gray'}}>Duppata</Text>
     </View>
     <View style={{backgroundColor:'gray', height:30, width:1, alignSelf:"center", marginLeft:12, marginRight:12}}></View>
     <View style={{flexDirection:'column', marginLeft:12, alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>April</Text>
     <Text style={{color:'gray'}}>Abaya</Text>
     </View>
     </View>











</View>

      <View style={{backgroundColor:'white', width:'95%', alignSelf:'center', borderRadius:13, height:110, flexDirection:'column', paddingTop:12, paddingBottom:18}}>

<View style={{flexDirection:'row', justifyContent:'space-between', }}>
    <Text style={{color:'black', fontSize:15,fontWeight:'bold',marginLeft:12,marginTop:0}}> Store Performance</Text>

    <Image source={require("../Images/arrow.png")} style={{height:32, width:32,alignSelf:'center',marginTop:0}}/>

</View>
<View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
<View style={{flexDirection:'column', alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <Text style={{color:'gray'}}>Total Sales</Text>
     </View>

     <View style={{backgroundColor:'gray', height:30, width:1, alignSelf:"center", marginLeft:12, marginRight:12}}></View>
     <View style={{flexDirection:'column', marginLeft:12, alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <Text style={{color:'gray'}}>Revenue</Text>
     </View>
   
     <View style={{backgroundColor:'gray', height:30, width:1, alignSelf:"center", marginLeft:12, marginRight:12}}></View>
     <View style={{flexDirection:'column', marginLeft:12, alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>1000</Text>
     <Text style={{color:'gray'}}>Profit</Text>
     </View>
     <View style={{backgroundColor:'gray', height:30, width:1, alignSelf:"center", marginLeft:12, marginRight:12}}></View>
     <View style={{flexDirection:'column', marginLeft:12, alignItems:'center'}}>
     <Text style={{color:'#18A6DA'}}>April</Text>
     <Text style={{color:'gray'}}>Month</Text>
     </View>
     </View>











</View>



</ScrollView>
<View style={{ height:60, width:'99%', backgroundColor:'white' ,alignSelf:'center', justifyContent:'center', borderTopStartRadius:30, borderTopEndRadius:30}}> 
<View style={{flexDirection:'row', justifyContent:'space-around'}}>

  <TouchableOpacity style={styles.bottom}>
<Icon name="home" color="#ff5400"  size={30} light/>
<Text style={{color:'#ff5400'}}>Home</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.bottom}     onPress={() => navigation.replace('AddProducts')}>
<Icon name="shopping-bag" color="grey"  size={30} light/>
<Text style={{color:'grey'}}>Add Products</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.bottom}>
<Icon name="settings" color="grey"  size={30} light/>
<Text style={{color:'grey'}}>Settings</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.bottom}>

<Icon name="admin-panel-settings" color="grey"  size={30} light/>

<Text style={{color:'grey'}}>Profile</Text>
</TouchableOpacity>
</View >


{/* <FontAwesomeIcon icon="fa-regular fa-font-awesome" size={30} color="#900"/> */}
{/* <Icon name="fa-regular fa-basket-shopping" size={30} color="#900" /> */}

</View>
   
    </View>

  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ff5400',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop:12,
    marginLeft:10,
    alignItems: 'center',
  },
  bottom:{
    alignItems:'center'
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
  button: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    // backgroundColor: '#ff5400',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    // marginBottom: 20,
  },
  button: {
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 40,
  },

  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    width:'100%',
    // height:180,
    borderRadius:20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  modalContainer: {
    width: '100%',
    height: '24%',
    backgroundColor: '#fff',
borderRadius:20
  },
  modalText: {
    fontSize: 16,
    // marginBottom: 10,
  },
  closeButton: {
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkbox: {
    height:35, width:35, borderRadius:20,borderColor:"gray", borderWidth:0.5 , justifyContent:'center', alignItems:'center',marginBottom:'6%'
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
    backgroundColor: '#0079DE'},

});

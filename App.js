import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreLogs([{ level: 'error' }]);
LogBox.ignoreAllLogs();
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Second from './Screens/Second';
import First from './Screens/First';
import Home from './Screens/Home';
import Login from './Screens/Login';
import AddProducts from './Screens/AddProducts';
// import AddBills from './Screens/AddBills';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
function App() {
  
  return (
    
   
    <NavigationContainer>
     
      <Stack.Navigator
        initialRouteName="First"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Test" component={Test} /> */}
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="Second" component={Second} />
        <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddProducts" component={AddProducts} /> 
        {/* <Stack.Screen name="CustomDrawer" component={CustomDrawer} /> */}
      </Stack.Navigator>
     
      {/* <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="PM" component={PM}  />
      
      </Drawer.Navigator>
    </NavigationContainer> */}
    </NavigationContainer>
  );
}

export default App;


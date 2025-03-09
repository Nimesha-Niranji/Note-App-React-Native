import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NoteScreen from './screens/NoteScreen';
import EditScreen from './screens/EditScreen';
import AddScreen from './screens/AddScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterDoneScreen from './screens/RegisterDoneScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#D8BFD8' },
        headerTitleStyle: { color: 'black', fontSize: 18, fontWeight: 'bold' },
      }}
      >
        <Stack.Screen name="Login Page" component={LoginScreen} />
        <Stack.Screen name="Note List" component={NoteScreen} />
        <Stack.Screen name="Edit Notes" component={EditScreen} />
        <Stack.Screen name="Add Notes" component={AddScreen} />
        <Stack.Screen name="Note Details" component={NoteDetailScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='RegisterDone' component={RegisterDoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
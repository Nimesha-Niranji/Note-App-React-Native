import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { database } from '../firebase';

const AddScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addNote = () => {
    if (title && content) {
      const newRef = database.ref('/notes').push();
      const createdAt = new Date().toISOString();  // current date & time

      newRef
        .set({ title, content, createdAt })
        .then(() => {
          Alert.alert('Success', 'Notes added successfully');
          setTitle('');
          setContent('');
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert('Error', 'Failed to add note: ' + error.message);
        });
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Enter Title" 
        value={title} 
        onChangeText={setTitle} 
        placeholderTextColor="gray" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter Content" 
        value={content} 
        onChangeText={setContent}  
        placeholderTextColor="gray" 
      />

      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.txtBtn}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    padding: 16,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: 350,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFC5CB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  txtBtn: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
});

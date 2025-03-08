import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { database } from '../firebase';

const EditScreen = ({ route, navigation }) => {
  
  const note = route.params?.note;

  if (!note) {
    Alert.alert('Error', 'No note data found.');
    navigation.goBack(); // when no note is found
    return null;
  }

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const updateNote = () => {
    database.ref(`/notes/${note.id}`)
      .update({ title, content })
      .then(() => {
        Alert.alert('Success', 'Note updated successfully!');
        navigation.navigate('Note List', { note: { id: note.id, title, content } });
      })
      .catch(error => Alert.alert('Error', error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} value={content} onChangeText={setContent} />

      <TouchableOpacity style={styles.button} onPress={updateNote}>
        <Text style={styles.txtBtn}>Update Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6A0DAD',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#FFC5CB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  txtBtn: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditScreen;

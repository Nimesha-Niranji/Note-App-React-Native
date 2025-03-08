import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { database } from '../firebase';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

const NoteDetailScreen = ({ route, navigation }) => {
  
  console.log('Route Params:', route.params);

  const { note } = route.params || {};

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Note data is missing!</Text>
      </View>
    );
  }

  const deleteNote = () => {
    database.ref(`notes/${note.id}`).remove()
      .then(() => {
        alert("Note deleted successfully!");
        navigation.goBack();
      })
      .catch((error) => {
        alert("Error deleting note: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Note Details</Text>

      <View style={styles.noteContainer}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{note.title}</Text>

        <Text style={styles.label}>Content:</Text>
        <Text style={styles.value}>{note.content || 'No content provided'}</Text>

        <Text style={styles.label}>Created At:</Text>
        <Text style={styles.value}>{new Date(note.createdAt).toLocaleString()}</Text>
      </View>

      <View style={styles.actionButtons}>
        {/* Edit Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'blue' }]}
          onPress={() => navigation.navigate('Edit Notes', { note })}
        >
          <Icon name="edit-2" size={20} color="white" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={deleteNote}
        >
          <Icon name="trash-2" size={20} color="white" />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noteContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

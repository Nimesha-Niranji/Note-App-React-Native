import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { database } from '../firebase';
import Icon from 'react-native-vector-icons/Feather';

const NoteScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    const reference = database.ref('/notes');
    reference.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const noteArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNotes(noteArray);
      } else {
        setNotes([]);
      }
    });
    return () => reference.off();
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [])
  );

  const deleteNote = (id) => {
    database.ref(`/notes/${id}`).remove()
      .then(() => {
        setNotes(notes.filter(notes => notes.id !== id));
      })
      .catch((error) => {
        alert("Error deleting note: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000080" />

      {/* Add Note Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Notes')}>
        <Text style={styles.txtBtn}>Add New Note</Text>
      </TouchableOpacity>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Note Details', { note: item })}
          >
            <View style={styles.noteContent}>
              {/* Title */}
              <Text style={styles.noteTitle}>{item.title}</Text>
              
              {/* Date */}
              <Text style={styles.noteText}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>

            {/* Delete Button */}
            <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.iconButton}>
              <Icon name="trash-2" size={22} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    padding: 16,
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFC5CB',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  txtBtn: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  noteContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  noteText: {
    fontSize: 14,
    color: '#555',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

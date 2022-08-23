import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, ImageBackground } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = (props, navigation) => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const goBack1 = () => {
    props.navigation.goBack();
  }

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };


  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.container1}>
        <View style={styles.header}>
          <Text style={styles.headertxt}>
            NOTE DETAILS
          </Text>
        </View>
        <View>
          <ScrollView
            contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
          >
            <Text style={styles.time}>
              {note.isUpdated
                ? `Updated At ${formatDate(note.time)}`
                : `Created At ${formatDate(note.time)}`}
            </Text>
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.desc}>{note.desc}</Text>
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <RoundIconBtn
            antIconName='trash'
            style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
            onPress={displayDeleteAlert}
          />
          <RoundIconBtn antIconName='edit'
            style={{ marginBottom: 15 }}
            onPress={openEditModal} />
          <RoundIconBtn
            antIconName='backward'
            onPress={goBack1}
            style={{backgroundColor: 'orange'}}
          />
        </View>
        <NoteInputModal
          isEdit={isEdit}
          note={note}
          onClose={handleOnClose}
          onSubmit={handleUpdate}
          visible={showModal}
        />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    alignItems: 'center',
  },
  container1: {
    flex: 1,
  },
  headertxt: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black'
  },
  container: {
    // flex: 1,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  title: {
    marginTop: 5,
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.5,
    color: 'black',
    paddingHorizontal: 20,
    marginTop: 5
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;

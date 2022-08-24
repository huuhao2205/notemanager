import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Note from '../components/Note';
import NoteInputModal from '../components/NoteInputModal';
import NotFound from '../components/NotFound';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { useNotes } from '../contexts/NoteProvider';
import colors from '../misc/colors';

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const { notes, setNotes, findNotes } = useNotes();

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const openNote = note => {
    navigation.navigate('NoteDetail', { note });
  };
  const openTutorial = () => {
    navigation.navigate('Tutorial');
  }

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.container1}>
        <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>{`Good ${greet} `}</Text>
            <View style={styles.headerview}>
              <Text style={styles.header1}>MY NOTES</Text>
            </View>
            {notes.length ? (
              <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                containerStyle={{ marginVertical: 15 }}
                onClear={handleOnClear}
              />

            ) : null}

            {resultNotFound ? (
              <NotFound />
            ) : (
              <FlatList
                data={reverseNotes}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <Note onPress={() => openNote(item)} item={item} />
                )}
              />
            )}

            {!notes.length ? (
              <View
                style={[
                  styles.emptyHeaderContainer,
                ]}
              >
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.emptyHeader}>no note now</Text>
                </View>
                <TouchableOpacity
                  onPress={openTutorial}
                  style={styles.btn}>
                  <Text style={styles.textbtn}>Tutorial</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.btn}>
                  <Text style={styles.textbtn}>Add New Note</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName='plus'
          style={styles.addBtn}
        />
        <NoteInputModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleOnSubmit}
        />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  header1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    elevation: 8,
    backgroundColor: "#dbb2ff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    width: 200,
  },
  textbtn: {
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
    marginTop: 15,
  },
  container1: {
    flex: 1,
  },
  headerview: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  emptyHeaderContainer: {
    alignItems: 'center',
    position: 'relative',
    bottom: 350,

  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export default NoteScreen;

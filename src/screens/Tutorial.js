import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  PixelRatio,
  Dimensions,
  StatusBar,
  SafeAreaView
} from "react-native";

export default function Tutorial() {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      <View style={styles.header1}>
        <Text style={styles.headertxt}>Tutorial</Text>
      </View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height, alignItems: 'center', marginTop: 5 }}>
            <Image source={require('../../assets/start.png')}
              style={styles.imageStyle} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Welcome</Text>
              <Text style={styles.paragraph}>Let Start</Text>
            </View>
          </View>
          <View style={{ width, height, alignItems: 'center', marginTop: 5 }}>
            <Image
              source={require('../../assets/name.png')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Enter Your Name</Text>
              <Text style={styles.paragraph}>At the first time, you must enter your name to continue</Text>
            </View>
          </View>
          <View style={{ width, height, alignItems: 'center', marginTop: 5 }}>
            <Image
              source={require('../../assets/create.png')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Create A Note</Text>
              <Text style={styles.paragraph}>Create a note or learn how to use in Tutorial</Text>
            </View>
          </View>
          <View style={{ width, height, alignItems: 'center', marginTop: 5 }}>
            <Image
              source={require('../../assets/note.png')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Description your note</Text>
              <Text style={styles.paragraph}>Write title and description your note</Text>
            </View>
          </View>
          <View style={{ width, height, alignItems: 'center', marginTop: 5 }}>
            <Image
              source={require('../../assets/des.png')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Create</Text>
              <Text style={styles.paragraph}>Press "Check" button to save, "Minus" to out</Text>
            </View>
          </View>
          <View style={{ width, height, alignItems: 'center', marginTop: 5 }}>
            <Image
              source={require('../../assets/choose.png')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Change, Delete or Out</Text>
              <Text style={styles.paragraph}>In Note Details Screen, you can choose Delete, Edit or Out</Text>
            </View>
          </View>
          <View style={{ width, height, alignItems: 'center', marginTop: 5 }}>
            <Image
              source={require('../../assets/thank.jpg')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Done</Text>
              <Text style={styles.paragraph}>Thank you for using our App</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(7).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header1: {
    alignItems: 'center',
    paddingTop: 25
  },
  headertxt: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(125),
    width: '80%',
    borderRadius: 5,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 35,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
});

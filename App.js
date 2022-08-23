import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Intro from './src/screens/Intro';
import NoteScreen from './src/screens/NoteScreen';
import NoteDetail from './src/components/NoteDetail';
import NoteProvider from './src/contexts/NoteProvider';
import Tutorial from './src/screens/Tutorial';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Splash from './src/screens/Splash';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderNoteScreen = props => <NoteScreen {...props} user={user} />;
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === 'NoteScreen') {
                iconName = 'clipboard-list';
                size = focused ? 25 : 20;
              } else if (route.name === 'Tutorial') {
                iconName = 'book';
                size = focused ? 25 : 20;
              }
              return (
                <FontAwesome5
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }
          })
        }
        tabBaroptions={{
          activeTintColor: '#dbb2ff',
          inactiveTintColor: '#777777',
          labelStyle: { fontSize: 15, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name={'NoteScreen'} component={RenderNoteScreen} options={{ header: () => null }} />
        <Tab.Screen name={'Tutorial'} component={Tutorial} options={{ header: () => null }} />
      </Tab.Navigator>
    );
  }


  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          initialRouteName='Splash'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen component={Splash} name='Splash' />
          <Stack.Screen component={HomeTabs} name='HomeTabs' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
          <Stack.Screen component={Tutorial} name='Tutorial' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

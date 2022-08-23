import React, { useEffect, useRef } from "react";
import { View, Text, StatusBar, Dimensions, StyleSheet, Animated, SafeAreaView } from 'react-native';

export default function Splash({ navigation }) {
    const moveAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            duration: 2000,
            toValue: 1,
            delay: 1000,
            useNativeDriver: false
        }).start()
        Animated.sequence([
            Animated.timing(moveAnim, {
                duration: 2000,
                toValue: windowW / 3,
                delay: 0,
                useNativeDriver: false,
            }),
            Animated.timing(moveAnim, {
                duration: 2000,
                toValue: -6,
                delay: 0,
                useNativeDriver: false,
            }),
        ]).start(() => {
            navigation.replace('HomeTabs');
        })
    }, [moveAnim, fadeAnim]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
            <View
                style={{ ...styles.container, width: windowW, height: windowH }}
            >
                <View style={styles.contentContainer}>
                    <Animated.Image source={require("../../assets/ic.jpg")}
                        style={{ width: windowW * 0.65, height: windowH * 0.5, marginBottom: 20, opacity: fadeAnim, borderRadius: 150, overflow: "hidden", }} resizeMode="contain">
                    </Animated.Image>
                </View>
                <Animated.View style={{ ...styles.logoContainer, alignItems: "center", marginLeft: moveAnim }}>
                    <Text style={{ ...styles.logoText, fontSize: 20 }}> NOTES </Text>
                    <Animated.Text style={{ ...styles.logoText, color: "#295A8A", opacity: fadeAnim, paddingTop: 4 }}>MANAGER</Animated.Text>
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    contentContainer: {
        alignItems: "center",
        flexDirection: 'column'
    },

    logoText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "BLUE",
    },
    logoContainer: {
        flexDirection: "row"
    }
})
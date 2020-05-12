import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Colors from '../../constants/Colors/Colors';
import TitleText from '../TitleText/TitleText';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS == 'android' ? Colors.primary : 'white',
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Platform.OS == 'ios' ? '#ccc' : 'black',
    borderBottomWidth: 3
  }
});

export default Header;

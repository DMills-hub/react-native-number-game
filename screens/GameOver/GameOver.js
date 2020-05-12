import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ScrollView,
} from "react-native";
import TitleText from "../../components/TitleText/TitleText";
import BodyText from "../../components/BodyText/BodyText";
import Colors from "../../constants/Colors/Colors";
import Card from "../../components/Card/Card";
import MainButton from "../../components/MainButton/MainButton";

const GameOver = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/success.png")}
        />
      </View>
      <Card style={styles.card}>
        <BodyText>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.guesses}</Text> round(s) to
          guess the number.
        </BodyText>
        <BodyText>
          Your Number was:{" "}
          <Text style={styles.highlight}>{props.userNumber}.</Text>
        </BodyText>
      </Card>
      <MainButton onButtonPress={props.newGame}>NEW GAME</MainButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height < 400 ? 14 : 18,
  },
  card: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default GameOver;

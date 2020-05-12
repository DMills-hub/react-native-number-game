import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../../components/NumberContainer/NumberContainer";
import Card from "../../components/Card/Card";
import TitleText from "../../components/TitleText/TitleText";
import MainButton from "../../components/MainButton/MainButton";
import BodyText from "../../components/BodyText/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) generateRandomBetween(min, max, exclude);
  return randomNumber;
};

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurentGuess] = useState(initialGuess);
  const [deviceHeight, setDeviceheight] = useState(Dimensions.get('window').height);

  const [rounds, setRounds] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setDeviceheight(Dimensions.get('window').height);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  useEffect(() => {
    if (currentGuess === userChoice) onGameOver(rounds.length);
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert(`Don't lie!`, `You know that this is wrong...`, [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurentGuess(nextNumber);
    setRounds((currentRounds) => [nextNumber, ...currentRounds]);
  };

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.controls}>
          <MainButton onButtonPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons size={24} color="white" name="md-remove" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onButtonPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons size={24} color="white" name="md-add" />
          </MainButton>
        </View>
        <ScrollView>
          {rounds.map((guess, index) => (
            <Card style={styles.numberContainer} key={guess}>
              <TitleText>#{rounds.length - index} </TitleText>
              <TitleText>Guess: {guess}</TitleText>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onButtonPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons size={24} color="white" name="md-remove" />
        </MainButton>
        <MainButton onButtonPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons size={24} color="white" name="md-add" />
        </MainButton>
      </Card>
      <ScrollView>
        {rounds.map((guess, index) => (
          <Card style={styles.numberContainer} key={guess}>
            <TitleText>#{rounds.length - index} </TitleText>
            <TitleText>Guess: {guess}</TitleText>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 350,
    maxWidth: "90%",
  },
  numberContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  }
});

export default GameScreen;

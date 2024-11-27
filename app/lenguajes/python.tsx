import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PythonPage = ({ navigation, updateDays }) => {
  const initialExercises = [
    { question: "Escribe un código para imprimir 'Hola, Mundo!'.", answer: "print('Hola, Mundo!')" },
    { question: "Define una lista en Python con los números del 1 al 5.", answer: "[1, 2, 3, 4, 5]" },
    { question: "Escribe un bucle que imprima los números del 1 al 10.", answer: "for i in range(1, 11): print(i)" },
  ];

  const moreExercises = [
    { question: "Escribe una función para sumar dos números.", answer: "def sumar(a, b): return a + b" },
    { question: "Declara un diccionario con las claves 'nombre', 'edad'.", answer: "{'nombre': 'Juan', 'edad': 25}" },
    { question: "Usa una condición if para verificar si un número es par.", answer: "if x % 2 == 0: print('Es par')" },
  ];

  const [exercises, setExercises] = useState(initialExercises);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleCheckAnswer = (index, userAnswer) => {
    const correct = userAnswer.trim() === exercises[index].answer;
    setAnswers((prev) => ({ ...prev, [index]: correct }));
  };

  const handleShowAnswer = (index) => {
    setCurrentAnswer(exercises[index].answer);
  };

  const handleComplete = () => {
    const allCorrect = Object.values(answers).length === exercises.length &&
      Object.values(answers).every((value) => value === true);

    if (allCorrect) {
      updateDays();
      setCompleted(true);
    } else {
      alert("Debes completar todos los ejercicios correctamente.");
    }
  };

  const handleLearnMore = () => {
    setExercises((prev) => [...prev, ...moreExercises]);
    setCompleted(false);
    setAnswers({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Python: Ejercicios</Text>
      {completed ? (
        <View style={styles.congratulationsContainer}>
          <MaterialIcons name="emoji-events" size={50} color="#FFD700" />
          <Text style={styles.congratulationsText}>¡Felicidades!</Text>
          <Text style={styles.congratulationsText}>Has ganado un día en Python.</Text>
          <Button title="Aprender más" onPress={handleLearnMore} />
          <Button title="Ir al Perfil" onPress={() => navigation.navigate("Profile")} />
        </View>
      ) : (
        exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseContainer}>
            <Text style={styles.text}>{exercise.question}</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu respuesta"
              onSubmitEditing={(e) => handleCheckAnswer(index, e.nativeEvent.text)}
            />
            {answers[index] !== undefined && (
              <Text style={styles.feedback}>
                {answers[index] ? "¡Correcto!" : "Incorrecto. Intenta nuevamente."}
              </Text>
            )}
            <TouchableOpacity onPress={() => handleShowAnswer(index)}>
              <Text style={styles.showAnswer}>Mostrar respuesta</Text>
            </TouchableOpacity>
            {currentAnswer === exercise.answer && (
              <Text style={styles.answer}>{exercise.answer}</Text>
            )}
          </View>
        ))
      )}
      {!completed && (
        <Button
          title="Enviar"
          onPress={handleComplete}
          style={styles.button}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#306998",
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  feedback: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#306998",
  },
  showAnswer: {
    marginTop: 10,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  answer: {
    marginTop: 10,
    color: "#FFD43B",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#306998",
  },
  congratulationsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  congratulationsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD43B",
    marginVertical: 10,
  },
});

export default PythonPage;

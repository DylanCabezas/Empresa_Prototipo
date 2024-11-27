import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CPlusPlusPage = ({ navigation, updateDays }) => {
  const initialExercises = [
    {
      question: "Escribe un programa para imprimir 'Hola, Mundo!' en C++.",
      answer: "#include <iostream>\nusing namespace std;\nint main() {\n  cout << \"Hola, Mundo!\";\n  return 0;\n}",
    },
    {
      question: "Declara un arreglo de enteros con los valores 1, 2, 3, 4, 5.",
      answer: "int arr[] = {1, 2, 3, 4, 5};",
    },
    {
      question: "Escribe un bucle `for` que imprima los números del 1 al 10.",
      answer: "for (int i = 1; i <= 10; i++) {\n  cout << i << endl;\n}",
    },
  ];

  const moreExercises = [
    { question: "Escribe una función que sume dos números.", answer: "int sumar(int a, int b) {\n  return a + b;\n}" },
    { question: "Declara una clase con un método 'saludar'.", answer: "class Persona {\npublic:\n  void saludar() {\n    cout << \"Hola!\";\n  }\n};" },
    { question: "Escribe un programa para calcular el factorial de un número.", answer: "int factorial(int n) {\n  return (n == 0) ? 1 : n * factorial(n - 1);\n}" },
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
      <Text style={styles.title}>C++: Ejercicios</Text>
      {completed ? (
        <View style={styles.congratulationsContainer}>
          <MaterialIcons name="emoji-events" size={50} color="#00599C" />
          <Text style={styles.congratulationsText}>¡Felicidades!</Text>
          <Text style={styles.congratulationsText}>Has ganado un día en C++.</Text>
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
    color: "#00599C",
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
    color: "#00599C",
  },
  showAnswer: {
    marginTop: 10,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  answer: {
    marginTop: 10,
    color: "#FFD700",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#00599C",
  },
  congratulationsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  congratulationsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    marginVertical: 10,
  },
});

export default CPlusPlusPage;

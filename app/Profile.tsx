import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Button, TextInput, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface ProfileProps {
  navigation: any;
  days: { python: number; cpp: number };
}

const Profile: React.FC<ProfileProps> = ({ navigation, days }) => {
  const [username, setUsername] = useState("Estudiante");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [streakDates, setStreakDates] = useState({
    "2024-11-26": { selected: true, marked: true, selectedColor: "#FFD700" },
  });

  // Función para seleccionar una imagen desde la galería
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Se necesita permiso para acceder a la galería. Por favor, habilítalo desde la configuración."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {/* Imagen de perfil */}
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <MaterialIcons name="account-circle" size={100} color="#ccc" />
        )}
        <View style={styles.imageButtons}>
          <Button title="Elige una foto de tu galería" onPress={pickImage} />
        </View>
      </View>

      {/* Nombre de usuario */}
      <Text style={styles.subtitle}>Nombre de usuario:</Text>
      <TextInput
        style={styles.usernameInput}
        value={username}
        onChangeText={setUsername}
        placeholder="Escribe tu nombre..."
      />

      {/* Días completados */}
      <View style={styles.coinContainer}>
        <FontAwesome name="circle" size={24} color="#FFD700" />
        <Text style={styles.coinText}>Días en Python: {days.python}</Text>
      </View>
      <View style={styles.coinContainer}>
        <FontAwesome name="circle" size={24} color="#00599C" />
        <Text style={styles.coinText}>Días en C++: {days.cpp}</Text>
      </View>

      {/* Calendario */}
      <Text style={styles.subtitle}>Racha de Ejercicios:</Text>
      <Calendar
        markedDates={streakDates}
        theme={{
          selectedDayBackgroundColor: "#FFD700",
          todayTextColor: "#00adf5",
          arrowColor: "#00599C",
        }}
      />

      {/* Botones para ir a Python y C++ */}
      <Text style={styles.subtitle}>Ir a:</Text>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "#FFD700" }]}
          onPress={() => navigation.navigate("Python")}
        >
          <Text style={styles.navButtonText}>Python</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "#00599C" }]}
          onPress={() => navigation.navigate("C++")}
        >
          <Text style={styles.navButtonText}>C++</Text>
        </TouchableOpacity>
      </View>
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
    color: "#315D75",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  usernameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#315D75",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  coinText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterPage from "./app/RegisterPage";
import Profile from "./app/Profile";
import PythonPage from "./app/lenguajes/python";
import CPlusPlusPage from "./app/lenguajes/cmasmas";

const Stack = createStackNavigator();

const App = () => {
  // Estado global para las monedas (días completados)
  const [days, setDays] = useState({ python: 0, cpp: 0 });

  // Función para actualizar los días en el perfil desde las páginas de Python o C++
  const updateDays = (language) => {
    setDays((prev) => ({ ...prev, [language]: prev[language] + 1 }));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile">
          {(props) => <Profile {...props} days={days} />}
        </Stack.Screen>
        <Stack.Screen name="Python">
          {(props) => <PythonPage {...props} updateDays={() => updateDays("python")} />}
        </Stack.Screen>
        <Stack.Screen name="C++">
          {(props) => <CPlusPlusPage {...props} updateDays={() => updateDays("cpp")} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import { Alert } from "react-native";

export const handleShowError = (error) =>
  Alert.alert("Error", error, [
    {
      text: "Aceptar",
      style: "destructive",
    },
  ]);
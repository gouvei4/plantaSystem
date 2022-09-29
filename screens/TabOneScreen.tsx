import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Appearance,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import * as ImagePicker from 'expo-image-picker';
import useColorScheme from "../hooks/useColorScheme";
import { imageCompress } from "../utils/compress";

export interface IUsers {
  id: string;
  name: string;
  code: string;
  image: string;
}


export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const INIT_FORM_OBJ = {
    id: String(Math.random() * 100),
    name: "",
    code: "",
    image: "",
  };
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INIT_FORM_OBJ);
  const colorScheme = Appearance.getColorScheme()

  const handleSubmit = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const oldStorage = await AsyncStorage.getItem("@to-do:form");
      const formToSave = [form];

      if (oldStorage) {
        const oldJson = JSON.parse(oldStorage);
        formToSave.push(...oldJson);
      }

      await AsyncStorage.setItem("@to-do:form", JSON.stringify(formToSave));

      resetForm();

      Alert.alert("Sucesso", "Registro salvo com sucesso.");
    } catch (err) {
      console.log("submit error =>", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(INIT_FORM_OBJ);
    setImage("")
  }

  const handlePickImageGalery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      const { uri: newUri } = await imageCompress(result.uri)

      setImage(newUri);
      setForm({ ...form, image: newUri });
    }
  };

  const handlePickImageCamera = async () => {
    // No permissions request is necessary for launching the image library

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Você não permitiu o aplicativo acessar sua câmera.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {

      const { uri: newUri } = await imageCompress(result.uri)

      setImage(newUri);
      setForm({ ...form, image: newUri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de códigos</Text>
      <View style={styles.formGroup}>
        <Text style={styles.subtitle}>Nome do Produto:</Text>
        <TextInput
          placeholder="Digite aqui"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={[
            styles.inputStyle,
            {
              color: colorScheme === 'dark' ? '#fff' : 'black',
            }
          ]}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.subtitle}>Código:</Text>
        <TextInput
          placeholder="Digite aqui"
          value={form.code}
          onChangeText={(text) => setForm({ ...form, code: text })}
          style={[
            styles.inputStyle,
            {
              color: colorScheme === 'dark' ? '#fff' : 'black',
            }
          ]}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={handlePickImageGalery}
            style={styles.buttonImg}
          >
            <FontAwesome name="image" size={20} color="#7934AD" />
            <Text style={styles.buttonTextImg}>Galeria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePickImageCamera}
            style={[
              styles.buttonImg,
              {
                marginLeft: 8
              }
            ]}
          >
            <FontAwesome name="camera" size={20} color="#7934AD" />
            <Text style={styles.buttonTextImg}>Tirar uma foto</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: 'center' }}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100, marginTop: 8 }} />}
        </View>
      </View>
      <View style={styles.formButton}>
        <TouchableOpacity
          disabled={loading  || form.name === "" || form.code === ""}
          onPress={handleSubmit}
          style={loading  || form.name === "" || form.code === "" ? styles.buttonContainerDisabled : styles.buttonContainer}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formButton: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginTop: 18,
  },
  buttonContainerDisabled: {
    backgroundColor: "#cecece",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    borderRadius: 8,
  },
  buttonContainer: {
    backgroundColor: "#7934AD",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    borderRadius: 8,
  },
  formGroup: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 14,
    color: "#ffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    paddingBottom: 4,
    color: "#6E6D72",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#969494",
    borderRadius: 8,
    minWidth: 200,
    height: 40,
    padding: 8,
  },

  buttonImg: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 163,
    flexDirection: "row",
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7934AD',
  },

  buttonTextImg: {
    color: '#7934AD',
    marginLeft: 4
  },
});
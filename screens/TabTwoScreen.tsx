import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AsyncStorage, FlatList, StyleSheet, TouchableOpacity, Image, Alert, TextInput, Appearance } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { IUsers } from "./TabOneScreen";


export default function TabTwoScreen({ navigation }: RootTabScreenProps<"TabTwo">) {

  const INIT_FORM_OBJ = {
    id: String(Math.random() * 100),
    name: "",
    code: "",
    image: "",
  };

  const focused = useIsFocused();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUsers[]>([]);
  const colorScheme = Appearance.getColorScheme()

  const getUsers = async () => {
    setLoading(true);
    const userList = await AsyncStorage.getItem("@to-do:form");
    if (userList) {
      const jsonList = JSON.parse(userList);
      setUsers(jsonList);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Atenção", "Tem certeza que deseja excluir ?", [
      {
        text: "Confirmar",
        onPress: async () => {
          const newUserList = users.filter(obj => obj.id !== id)
          await AsyncStorage.setItem("@to-do:form", JSON.stringify(newUserList));
          setUsers(oldList => oldList.filter(obj => obj.id !== id))
        }
      },
      {
        text: "Cancelar",
        style: "destructive",
        onPress: () => { }
      }
    ]);
  }

  useEffect(() => {
    getUsers();
  }, [focused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Códigos</Text>
      <View style={styles.inputStyle}>
        <TextInput
          placeholder="Pesquise aqui"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={{
            color: colorScheme === 'dark' ? '#fff' : 'black',
            width: "90%"
          }}
        />
        <FontAwesome name="search" size={20} color="#cecece" />
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={users.filter(obj => obj.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(obj) => obj.id}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <View style={{ width: 60 }}>
                  {item.image && <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.code}</Text>
                </View>
              </View>
              <TouchableOpacity style={{ width: 25 }} onPress={() => handleDelete(item.id)}>
                <FontAwesome name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 8,
    height: 58,
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 8,
  },
  cardInfo: {
    marginLeft: 18
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6E6D72",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6E6D72",
  },
  inputStyle: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#969494",
    borderRadius: 8,
    height: 40,
    padding: 8,
  },
});

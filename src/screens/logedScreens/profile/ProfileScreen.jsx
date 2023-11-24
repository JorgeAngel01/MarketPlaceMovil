import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Button, Card, Divider, Icon, IconButton, Text } from "react-native-paper";
import ProfileButton from "../../../components/atoms/ProfileButton";


const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { handleLogout } = useAuthContext();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.topBar]}>
        <IconButton
          icon="arrow-left"
          color={theme.colors.text}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[styles.topContainer]}>
        <ProfileButton
          imageUrl="https://xsgames.co/randomusers/avatar.php?g=female"
          size={90}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text variant="displayMedium" style>
          Giovanna
        </Text>
        <Text variant="titleLarge" style>
          Welcome back
        </Text>
        <Button
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ marginTop: 10 }}
        >
          Edit Profile
        </Button>
        <View style={styles.options}>
          <Divider />
          <View style={styles.cardRow}>
            <Card style={[styles.card, { aspectRatio: 1 }]}>
              <TouchableOpacity>
                <Card.Content
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Icon source="book-account" size={50} />
                  <Text variant="titleSmall">My Orders</Text>
                </Card.Content>
              </TouchableOpacity>
            </Card>

            <Card style={[styles.card, { aspectRatio: 1 }]}>
              <TouchableOpacity>
                <Card.Content
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Icon source="message-draw" size={50} />
                  <Text variant="titleSmall">My Reviews</Text>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardRow}>
            <Card style={[styles.card, { aspectRatio: 1 }]}>
              <TouchableOpacity>
              <Card.Content
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Icon source="information" size={50} />
                  <Text variant="titleSmall">About</Text>
                </Card.Content>
              </TouchableOpacity>
            </Card>
            <Card style={[styles.card, { aspectRatio: 1 }]}>
              <TouchableOpacity
                onPress={() => {
                  handleLogout();
                }}
              >
                <Card.Content
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Icon source="logout" size={50} />
                  <Text variant="titleSmall">Log out</Text>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "1%",
  },
  topContainer: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    height: "85%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  options: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
    height: "100%",
    padding: 20,
  },
  card: {
    width: "45%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    color: "black",
  },
});

export default ProfileScreen;

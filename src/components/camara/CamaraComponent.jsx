import { Camera, CameraType } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
// import * as ImagePicker from "expo-image-picker";

export default function Camara() {
  const [shared, setShared] = useState([]);
  // setShared(true)
  const [type, setType] = useState(CameraType.back);
  const [permissionResponse, requestPermissionMedia] =
    MediaLibrary.usePermissions();
  // const [libraryPermission, requestLibraryPerm] =
  //   ImagePicker.useMediaLibraryPermissions();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [photo, setPhoto] = useState(null);
  let camera = useRef();

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    let newPhoto = await camera.takePictureAsync(options);
    setPhoto(newPhoto.uri);
    save(newPhoto.uri);
    setShared([...shared, newPhoto.uri]);
    share(newPhoto.uri);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  const share = (uri) => {
    Sharing.shareAsync(uri);
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission Camera" />
        <Button
          onPress={requestPermissionMedia}
          title="grant permission Files"
        />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const save = async (uri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Expo", asset, false);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let { status } = await requestPermissionMedia(); //Parametro writeOnly
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access files was denied");
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash ? "torch" : "off"}
        focusDepth={1}
        ratio="4:3"
        quality={0}
        zoom={0}
        whiteBalance="auto"
        onCameraReady={() => console.log("ready")}
        onMountError={(error) => console.log("error", error)}
        imageType={"png"}
        ref={(r) => (camera = r)}
      >
        <View style={styles.buttonContainer}>
          {/* Voltear camara */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <View style={styles.circulo}>
              <AntDesign name="reload1" size={24} color="white" />
            </View>
          </TouchableOpacity>
          {/* Tomar foto  */}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <View style={styles.circulo}>
              <Feather name="camera" size={24} color="white" />
            </View>
          </TouchableOpacity>

          {/* Flash */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFlash(!flash)}
          >
            <View style={styles.circulo}>
              {/* <Entypo name='flashlight' size={24} color='white' /> */}
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={24}
                color={flash ? "yellow" : "white"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      {/* <View style={{ flex: 1 }}>
        {photo && <Text>{photo}</Text>}
        {photo && <Image source={{ uri: photo }} style={{ flex: 1 }} />}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  circulo: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: "gray",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
});
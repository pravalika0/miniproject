import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { launchCamera } from "react-native-image-picker";
import TextRecognition from "react-native-text-recognition";

const Scan = () => {
  const [imageUri, setImageUri] = useState(null);
  const [text, setText] = useState(null);

  const handleImageCapture = async () => {
    try {
      const options = {
        mediaType: "photo",
        quality: 1,
      };
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image capture");
        } else if (response.error) {
          console.error("Error launching camera:", response.error);
        } else {
          setImageUri(response.uri);
          processImage(response.uri);
        }
      });
    } catch (error) {
      console.error("Error launching camera:", error);
    }
  };

  const processImage = async (uri) => {
    try {
      const result = await TextRecognition.recognize(uri);
      console.log(result);
      setText(result);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Scan</Text>

      <TouchableOpacity style={styles.button} onPress={handleImageCapture}>
        <Text style={styles.buttonText}>Capture Image</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {text && <Text>{text}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Scan;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const TVRemote = () => {
  const [text, setText] = useState("");

  const sendCommand = async (command) => {
    try {
      const response = await fetch("https://node.serveo.net/tv-command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Failed to send command:", error);
    }
  };

  const handleOpenNetflix = () => {
    const https = "https://www.";
    const url = https.concat(text);
    const command = `open -a Safari ${url}`;
    console.log(command);
    if (text) {
      sendCommand(command);
    } else {
      Alert.alert("Error", "Please enter a URL.");
    }
  };

  const buttons = [
    {
      label: "Play",
      command:
        'osascript -e \'tell application "Safari" to tell front window to do JavaScript "document.querySelector("video").pause();" in current tab\'',
    },
    { label: "Pause", command: "pause_command" },
    { label: "Stop", command: "stop_command" },
    { label: "Next", command: "next_command" },
    { label: "Previous", command: "previous_command" },
    { label: "Login", command: "cliclick t:'username'" },
    { label: "Open Website", command: "cliclick t:'username'" },
    {
      label: "Open Netflix",
      command: "open -a Safari https://www.netflix.com/watch",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TV Remote</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter URL or command"
        value={text}
        onChangeText={setText}
      />
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              if (button.label === "Open Website") {
                handleOpenNetflix();
              } else {
                sendCommand(button.command);
              }
            }}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
});

export default TVRemote;

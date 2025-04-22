import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';

// Replace with your backend server URL
const socket = io('http://192.168.130.84:3001'); 

export default function App() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Listen for all messages on connect
    socket.on('all_messages', (allMessages) => {
      setMessages(allMessages);
    });

    // Listen for new message and update the state
    socket.on('new_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Switch off connections
    return () => {
      socket.off('all_messages');
      socket.off('new_message');
    };
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      setLoggedIn(true);
      socket.emit('login', username); // Notify backend that a user has logged in
    }
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        sender: username,
        time: new Date().toLocaleTimeString(), // Add timestamp
      };
      socket.emit('send_message', message); // Emit message to the server
      setNewMessage(''); // Clear the input field
    }
  };

  if (!loggedIn) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Welcome to the Chat</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello, {username}!</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

Basic Chat App with Socket.IO
This is a simple real-time chat application built with React Native (Expo) on the frontend and Node.js + Socket.IO on the backend. It allows users to log in with a username and chat in real time with others connected to the app.

Features
Real-time messaging with Socket.IO

Simple login with username

Message history for all users

Mobile-friendly UI using React Native

Expo-based development for easy testing on physical devices

 Tech Stack
Frontend:
React Native (Expo)

Socket.IO client

Backend:
Node.js

Express.js

Socket.IO

🔧 Setup Instructions:
 1.Clone the Repository  

 git clone https://github.com/santuguddu/chat-app.git

2.Start the Backend Server : 
 cd backend
npm install
node server.js

3.Set up the Frontend
Change the IP address in the frontend code to point to your local server. Use your system's local IP address, which can be found by typing ipconfig in Command Prompt.

// App.js
const socket = io('http://192.168.X.X:3001'); // Replace with your actual IP

Then, install Expo CLI if you haven’t already: 

npm install -g expo-cli

4.Start the frontend: cd frontend
npm install
npx expo start

###  Testing on Mobile
Ensure both your phone and computer are on the same Wi-Fi network.

Replace localhost with your local IP address in the frontend code.

Scan the QR code using Expo Go.


// // import {useRoute} from '@react-navigation/native';
// // import React, {Component} from 'react';
// // import {View, Text, StyleSheet} from 'react-native';

// // const ChatScreen = () => {
// //   const res = useRoute().params;
// //   console.log('res :>> ', res);
// //   return (
// //     <View style={styles.container}>
// //       <Text>ChatScreen</Text>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// // export default ChatScreen;

// // ChatScreen.js

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';

// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const ChatScreen = ({route}) => {
//   const {userId, userName, userDpUri} = route.params;
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     // Generate a unique conversation ID using userId and current user's ID
//     const conversationId = generateConversationId(
//       auth().currentUser.uid,
//       userId,
//     );

//     // Fetch chat history for the generated conversation ID
//     const messagesRef = firestore().collection('messages').doc(conversationId);

//     messagesRef.onSnapshot(snapshot => {
//       const messageData = snapshot.data();
//       if (messageData) {
//         const messageList = Object.values(messageData);
//         setMessages(messageList);
//       }
//     });

//     // Cleanup the snapshot listener when the component unmounts
//     return () => messagesRef();
//   }, [userId]);

//   console.log('messages :>> ', messages);

//   // Function to generate a unique conversation ID
//   const generateConversationId = (userId1, userId2) => {
//     const sortedUserIds = [userId1, userId2].sort();
//     const conversationId = sortedUserIds.join('-');
//     return conversationId;
//   };

//   // Function to send a new message
//   const sendMessage = () => {
//     if (newMessage.trim() === '') {
//       return; // Don't send empty messages
//     }

//     const conversationId = generateConversationId(
//       auth().currentUser.uid,
//       userId,
//     );
//     const messageRef = firestore().collection('messages').doc(conversationId);

//     // Add the new message to the conversation
//     messageRef.set({
//       [new Date().toISOString()]: {
//         text: newMessage,
//         sender: auth().currentUser.uid,
//         timestamp: new Date().toISOString(),
//       },
//     });

//     // Clear the input field after sending the message
//     setNewMessage('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Chat with {userName}</Text>
//       <FlatList
//         data={messages}
//         keyExtractor={item => item.timestamp}
//         renderItem={({item}) => (
//           <View style={styles.messageContainer}>
//             <Text style={styles.messageText}>
//               {item.sender}: {item.text}
//             </Text>
//           </View>
//         )}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type a message..."
//           value={newMessage}
//           onChangeText={text => setNewMessage(text)}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   messageContainer: {
//     marginBottom: 8,
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginRight: 8,
//     paddingHorizontal: 8,
//   },
//   sendButton: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   sendButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default ChatScreen;

//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ChatScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default ChatScreen;

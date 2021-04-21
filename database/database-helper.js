import database from '@react-native-firebase/database';

export const CHATTING_CHATS = 'Chatting/Chats';
export const CHATTING_MESSAGES = 'Chatting/Messages';
export const CHATTING_MEMBERS = 'Chatting/Members';

export const USERS = 'Users';
export const FOLLOWS = 'Follows';

// Return member in chat room with id (Search in Members table)
export const lookUpMembersInChatRoomWithId = async (id) => {
  let value;
  await database()
    .ref(CHATTING_MEMBERS + `/${id}`)
    .once('value', (snapshot) => {
      value = snapshot.val();
    });
  return value;
};

// Create and return id of chat room with 2 users: uid1 and uid2 (Create instance in Members table)
export const createChatRoomWithUserIds = async (uid1, uid2) => {
  const newReference = database().ref(CHATTING_MEMBERS).push();
  await newReference.set({
    uid1: uid1,
    uid2: uid2,
  });
  //   console.log(
  //     `createChatRoom for 2 users ${uid1} ${uid2} with id: ${newReference.key}`,
  //   );
  return newReference.key;
};

// Create chat room with id and init title for chatroom (Create instance in Chats table)
export const createChatRoom = async (id, sellerId) => {
  await database()
    .ref(CHATTING_CHATS + `/${id}`)
    .set({
      sellerId: sellerId,
    });
  //   console.log(`Created chatRoom: ${id} ${chatRoom}`);
};

// Delete chat room with id and init title for chatroom (Delete instance in Chats table)
export const deleteChatRoom = async (id) => {
  await database()
    .ref(CHATTING_CHATS + `/${id}`)
    .remove();
  console.log(`Remove chatRoom: ${id}`);
};

// Return id of chat room of 2 users: uid1 and uid2 (Search in Members table)
export const lookUpChatRoomWithUserIds = async (uid1, uid2) => {
  let value = null;
  await database()
    .ref(CHATTING_MEMBERS)
    .once('value', async (snapshot) => {
      snapshot.forEach((item) => {
        const val = item.val();
        if (
          (val.uid1 === uid1 && val.uid2 === uid2) ||
          (val.uid1 === uid2 && val.uid2 === uid1)
        )
          value = item.key;
      });
    });
  if (!value) {
    value = await createChatRoomWithUserIds(uid1, uid2); //Create instance of chat room in Members table
    await createChatRoom(value, uid2); //Create instance of chat room in Chats table
  }
  return value;
};

// Return chat room with id (Search in Chats table)
export const lookUpChatRoomFromId = async (id) => {
  let value;
  await database()
    .ref(CHATTING_CHATS + `/${id}`)
    .once('value', (snapshot) => {
      value = snapshot.val();
    });
  return value;
};

// Return chat room with id (Search in Users table)
export const lookUpUserFromUserId = async (userId) => {
  let value = null;
  await database()
    .ref(USERS)
    .orderByChild('uid')
    .equalTo(userId)
    .once('value', (snapshot) => {
      snapshot.forEach((item) => {
        value = item.val();
      });
    });
  return value;
};

// Return product with id (Search in Products table)
export const lookUpProductFromId = async (id) => {
  let value = null;
  await database()
    .ref(`Products/${id}`)
    .once('value', (item) => {
      value = item.val();
    });
  return value;
};

// Create and return id of new user with uid (Create instance in Users table)
export const createUserIfNeccessary = async (user) => {
  const userInfo = await lookUpUserFromUserId(user.uid);
  if (!userInfo) {
    const newReference = database().ref(USERS).push();
    await newReference.set({
      uid: user.uid,
      name: user.name,
      photoUrl: user.photoUrl,
      email: user.email,
      phone: user.phone,
    });
    return newReference.key;
  }
};

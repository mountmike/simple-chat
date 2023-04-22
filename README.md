# Simple Chat

A simple chat application made using React and Firebase, future details will be updated at a later time.



# Wireframe

![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/wireframe1.png)

# Data Model

![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/datamodel1.png)

# Psuedocode for managin multiple conversations with different people

1. On signup => add user to users collection in db and create them a 'conversations' array
2. On login => make a query to users collection and populate conversationList state with conversations which passes down to the <Aside> component
3. Then, in <Aside> make a db call with the list of conversation IDs and store an array of objects in a state that contains the metainfo for each convo
4. Add to UI a feature that clicking on a <ChatCard> sets the currentChatId to the target.value and then the <ChatBox> should re-render with that convo
5. Create function for "new chat" button that pushes a new chatID to the db > users > [conversations] and sets currentChatId to that value.
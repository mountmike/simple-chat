# unsafeChat

a simple chat client with zero end to end encryption powered by a few GA students.

**Stack:** React.js and Firebase



# Planning process

The biggest challenge for building this app was the data structure. None of us had used Firebase/Firestore before and we were all more familiar with SQL databases. Consequently it took as a few refactors to get a data structure that worked for us.

## Wireframe for UI
![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/wireframe1.png)

## Colour pallet for UI
![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/colours.png)

## Data Model

![Screenshot](https://github.com/mountmike/simple-chat/blob/main/public/datamodel1.png)


### Messages collection
````   
messages: {
    CHAT_ID: {
        chat_name: "The Mega Chat",
        group_chat: true,
        last_message: "hi everyone",
        last_message_date: 23 April 2023 at 20:13:35
        members: [
            "Mike",
            "Amal",
            "Simon
        ],
        message_list: COLLECTION (see below)
    }
}

````
### Message_list collection (nested inside each chat document)
````   
message_list: {
    MESSAGE_ID: {
        avatar: "https://avatar-url.png",
        createdAt: 23 April 2023 at 21:13:35,
        name: "Mike",
        uid: "Yr48LUY1a1N3M4F2JIDnVVVmrt32",
        test: "hi everyone"
    }
}

````

### Users collection
````   
users: {
    USER_ID: {
        avatar: "https://avatar-url.png",
        email: "mike@email.com",
        name: "Mike Tharratt",
        userName: "Mike",
        conversation_list: COLLECTION (see below)
    }
}
````
### Conversation_list collection (nested inside each user document)
````   
conversation_list: {
    CHAT_ID: {
        avatar: "https://avatar-url.png",
        createdAt: 23 April 2023 at 21:13:35,
        name: "Mike",
        uid: "Yr48LUY1a1N3M4F2JIDnVVVmrt32",
        test: "hi everyone"
    }
}

````

## Planing Pt.2

The inital version of the app created a single group chat that anyone could join but we wanted something a little more sophisticated so after returning to the drawing board with the data structure we started building again. Below is the initial psuedocode for managin multiple conversations with different people:

1. On signup => add user to users collection in db and create them a 'conversations' array
2. On login => make a query to users collection and populate conversationList state with conversations which passes down to the <Aside> component
3. Then, in <Aside> make a db call with the list of conversation IDs and store an array of objects in a state that contains the metainfo for each convo
4. Add to UI a feature that clicking on a <ChatCard> sets the currentChatId to the target.value and then the <ChatBox> should re-render with that convo
5. Create function for "new chat" button that pushes a new chatID to the db > users > [conversations] and sets currentChatId to that value.

  
## Additional features were then added:
- Ability to delete messages once they are sent.
- Ability to delete conversations once they are created.
- Displaying the date/time a message was sent in a reasonable fashion.
- Updating the conversation document with metadata for every message sent so the "last_message" & "last_message_date" fields would populate and fill in the conversation cards.

## Planing Pt.3
**Coming features:**
- ability to group chat
- editing user profile
- Set chat cards in `<aside>` to refresh and order based on most recent conversation when a new message is received or a new chat is created.
- Search function in `<aside>` for filtering conversations.
- Add notifications type functionality to make it clear when a new message is recieved.
- managing contacts/friends list
- sending images/emojis

## Members on this project:

- Simon: https://github.com/Squshedfrog
- Mike: https://github.com/mountmike
- Amal: https://github.com/ggsnipes
import './SendMessage.css'

export default function SendMessage() {
    return (
        <form className="SendMessage">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
      />
      <button type="submit">Send</button>
    </form>
    )
}
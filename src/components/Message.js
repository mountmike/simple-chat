import "./Message.css"

export default function Message({message}) {
    console.log(message);
    return (
        <div className="Message">
            <section className="left">
                <span className="message-name">{message.name}</span>
                <span>{message.text}</span>
            </section>
            <section className="right">
               <span className="time-sent">{message.createdAt.seconds}</span>
            </section>
        </div>
    )
}
import "./Message.css"

export default function Message({message}) {
    return (
        <div className="Message">
            <section className="User">
                {message.name}
            </section>
            <section className="Messages">
                {message.text}
            </section>
        </div>
    )
}
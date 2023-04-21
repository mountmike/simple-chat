export default function Message({message}) {
    return (
        <div>
            <section className="User">
                {message.name}
            </section>
            <section className="Messages">
                {message.text}
            </section>
        </div>
    )
}
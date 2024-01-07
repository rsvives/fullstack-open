const Contact = ({ name, number, handleRemove }) => {
  return (
    <li>
      {name}: {number} <button onClick={handleRemove}>❌ remove</button>
    </li>
  )
}

const ContactsList = ({ persons, handleRemove }) => {
  return (
    <>
      <h2>Contacts</h2>
      <ul>
        {persons.map((p) => (
          <Contact
            key={p.id}
            name={p.name}
            number={p.number}
            handleRemove={() => {
              handleRemove(p.id)
            }}
          ></Contact>
        ))}
      </ul>
    </>
  )
}
export default ContactsList

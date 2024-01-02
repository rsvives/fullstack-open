const Contact = ({ name, number }) => {
  return (
    <li>
      {name}: {number}
    </li>
  )
}

const ContactsList = ({ persons }) => {
  return (
    <>
      <h2>Contacts</h2>
      <ul>
        {persons.map((p) => (
          <Contact key={p.id} name={p.name} number={p.number}></Contact>
        ))}
      </ul>
    </>
  )
}
export default ContactsList

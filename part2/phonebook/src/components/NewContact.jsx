const NewContact = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addNewPerson
}) => {
  return (
    <>
      <h2>Add new</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={newName}
            onChange={handleNameChange}
            placeholder="Asturio"
          />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <br />
          <input
            type="phone"
            id="number"
            name="number"
            value={newNumber}
            onChange={handleNumberChange}
            // pattern="[0-9]{9}"
            placeholder="123-12345"
          />
        </div>
        <button type="submit" onClick={addNewPerson}>
          add
        </button>
      </form>
    </>
  )
}
export default NewContact

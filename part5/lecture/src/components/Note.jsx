const Note = ({ content, toggleImportance, important }) => {
  return (
    <li>
      {content} <label> | Important:</label>
      <input
        type="checkbox"
        checked={important}
        onChange={toggleImportance}
      />{' '}
    </li>
  )
}
export default Note

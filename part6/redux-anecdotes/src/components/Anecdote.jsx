const Anecdote = ({ anecdote, handleVote }) => {
  const { content, votes } = anecdote
  return (
        <div className="anecdote">
            <p>
                {content}
            </p>
            <div> has {votes} <button onClick={handleVote}>vote</button></div>
        </div>
  )
}
export default Anecdote

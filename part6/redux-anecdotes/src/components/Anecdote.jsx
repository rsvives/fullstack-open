const Anecdote = ({ anecdote, handleVote }) => {
  const { content, votes } = anecdote
  return (
        <div className="anecdote">
            <div>
                {content}
            </div>
            <div> has {votes} <button onClick={handleVote}>vote</button></div>
        </div>
  )
}
export default Anecdote

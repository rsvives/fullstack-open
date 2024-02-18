import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { commentOnBlog } from '../reducers/blogsReducer'

const CommentsSection = ({ blog }) => {
  const { comments } = blog
  const newComment = useField('text')
  const dispatch = useDispatch()
  const addNewComment = (event) => {
    event.preventDefault()
    dispatch(commentOnBlog({ content: newComment.value, blog }))
    console.log(newComment.value)
    // newComment.value = ''
  }
  return (
    <section>
      <h4>Comments:</h4>
      <form onSubmit={addNewComment}>
        <input {...newComment} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.length === 0 ? (
          <p>no comments yet...</p>
        ) : (
          comments.map((c) => <li key={c.id}>{c.content}</li>)
        )}
      </ul>
    </section>
  )
}

export default CommentsSection

import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { commentOnBlog } from '../reducers/blogsReducer'

const CommentsSection = ({ blog }) => {
  const { comments } = blog
  const newComment = useField('text')
  const dispatch = useDispatch()
  const addNewComment = async (event) => {
    event.preventDefault()
    await dispatch(commentOnBlog({ content: newComment.input.value, blog }))
    // console.log(newComment.value)
    newComment.clear()
  }
  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold">Comments:</h3>
      <form onSubmit={addNewComment}>
        <input className="input mr-2" {...newComment.input} required />
        <button className="btn btn-primary" type="submit">
          add comment
        </button>
      </form>
      <ul>
        {comments.length === 0 ? (
          <p className="text-body">no comments yet...</p>
        ) : (
          comments.map((c) => <li key={c.id}>{c.content}</li>)
        )}
      </ul>
    </section>
  )
}

export default CommentsSection

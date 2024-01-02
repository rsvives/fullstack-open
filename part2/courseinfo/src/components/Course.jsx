import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ name, parts }) => {
  const exercises = parts.map((el) => el.exercises)
  //   console.log(exercises)
  const sum = exercises.reduce((accum, current) => current + accum)
  //   console.log(sum)
  return (
    <div>
      <Header courseName={name} />
      <Content parts={parts} />
      <Total total={sum} />
    </div>
  )
}
export default Course

const Total = (props) => {
  console.log("Footer props", props);
  return (
    <p>
      Total of exercises{" "}
      {props.courseParts[0].exercises +
        props.courseParts[1].exercises +
        props.courseParts[2].exercises}
    </p>
  );
};
export default Total;

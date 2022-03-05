/* eslint-disable react/destructuring-assignment */
export default function Form(props) {
  return (
    <div>
      <form>
        <input type="number" min="0" max="5" />
        <input type="text" />
        <input type="submit" />
        <h1>{props.test}</h1>
      </form>
    </div>
  );
}

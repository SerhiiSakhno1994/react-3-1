import './Todo.css';

function Toto({ text, completed, onToggleCompleted, onDelete }) {
  return (
    <>
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={completed}
        onChange={onToggleCompleted}
      />
      <p className="TodoList__text">{text}</p>
      <button onClick={onDelete}>Удалить</button>
    </>
  );
}
export default Toto;

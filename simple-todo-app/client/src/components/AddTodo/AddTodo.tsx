import React, { useState } from 'react';
import { todo } from '../../interfaces/todo';
import './AddTodo.scss';
import { postTodo } from '../../api/todos';

export function AddTodo(props: { taskListUpdate: () => void }) {
  const username = String(localStorage.getItem('username'));
  const newTodo: todo = { title: '', description: '', username };
  const [data, setData] = useState<todo>(newTodo);
  const { taskListUpdate } = props;

  const addTodoHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (data.title && data.description && data.username) {
      try {
        const result = await postTodo(data);
        if (result) {
          taskListUpdate();
          alert('New todo Added.');
        } else {
          alert('Add todo Failed.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="add-todo-container">
      <form className="add-todo-form" onSubmit={addTodoHandler}>
        <label className="title-label" htmlFor="title-textfield">
          Title
          <input
            id="title-textfield"
            className="title-textfield"
            data-testid="title-textfield"
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </label>
        <label className="description-label" htmlFor="description-textfield">
          Desciption
          <textarea
            id="description-textfield"
            className="description-textfield"
            data-testid="description-textfield"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </label>
        <div className="add-button-container">
          <button className="add-button" data-testid="add-button" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
export default AddTodo;

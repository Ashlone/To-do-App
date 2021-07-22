import React, { useState } from "react";
import {
  Button,
  InputLabel,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import "./app.css";

//Todo List Component
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      <List>
        <ListItem>
          <ListItemText primary={todo.text} />
        </ListItem>
      </List>

      <div className="TodoButtons">
        <Button
          onClick={() => completeTodo(index)}
          variant="contained"
          color="primary"
        >
          Complete
        </Button>

        <button className="deletebutton" onClick={() => removeTodo(index)}>
          x
        </button>
      </div>
    </div>
  );
}
//end of Todo Component

//Form Component
function AddToForm({ addTodo }) {
  const [input, setInput] = useState([""]);

  const handleSubmit = (e) => {
    if (!input) return;
    addTodo(input);
    setInput("");
    e.preventDefault(); //stoppingthe refresh
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Write a to do</InputLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
      </FormControl>

      <Button
        disabled={!input}
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        Add To Do
      </Button>
    </div>
  );
}

//End of form component

function App() {
  const [todo, setTodo] = useState([
    { text: "Check my emails", isCompleted: false },
    { text: "Attend a meeting", isCompleted: false },
    { text: "Study for my exam", isCompleted: false },
  ]);
  //creating a to do and adding to the list
  const addingTOdo = (text) => {
    const newTodos = [...todo, { text }];
    setTodo(newTodos);
  };

  //mark complete
  const completeTodo = (index) => {
    const newTodos = [...todo];
    newTodos[index].isCompleted = true;
    setTodo(newTodos);
  };

  //remove to do
  const removeTodo = (index) => {
    const newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };

  return (
    <div className="Main_Container">
      <h1>Ashlone's To Do App</h1>
      <AddToForm addTodo={addingTOdo} />
      <ul>
        {todo.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}
export default App;

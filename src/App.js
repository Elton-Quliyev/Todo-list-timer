import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { validate } from "./helpers";

function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState({
    text: "",
    completed: false,
    id: 0,
    timeLeft: 30, // Başlangıçta 30 dakika (30 * 60)
  });
  const [errors, setErrors] = useState({
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));

    const error = validate(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.text.trim()) {
      alert("SEF AXTARIRSAAAN QAQA?");
    } else if (errors.text.trim() !== "") {
      alert("SEF AXTARIRSAAAN QAQA?");
    } else {
      setList((prevList) => [
        ...prevList,
        {
          ...todo,
          id: uniqid(),
        },
      ]);

      setTodo({
        text: "",
        completed: false,
        timeLeft: 30
      });

      setErrors({
        text: "",
      });
    }
  };

  function toggle(id) {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setList((prevList) => {
        const updatedList = prevList.map((item) => ({
          ...item,
          timeLeft: item.timeLeft - 1,
        }));
        return updatedList.filter((item) => item.timeLeft > 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">TEXT DAXIL ET: </label>
        <input
          name="text"
          value={todo.text}
          onChange={handleChange}
        />
        {errors.text && <p style={{ color: "red" }}>{errors.text}</p>}
      </div>

      <button type="submit">Submit</button>

      {list.map((item) => (
        <div
          onClick={() => toggle(item.id)}
          style={{
            textDecoration: item.completed ? "line-through" : "none",
            opacity: item.completed ? 0.7 : 1,
          }}
          key={item.id}
        >
          {item.text} (
          {Math.floor(item.timeLeft / 60)}:
          {(item.timeLeft % 60).toString().padStart(2, "0")})
        </div>
      ))}
    </form>
  );
}

export default App;

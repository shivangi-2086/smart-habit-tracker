import { useState } from "react";
import HabitItem from "./components/HabitItem";
import "./index.css";

function App() {
  // state for habits list
  const [habits, setHabits] = useState([
    { name: "DSA Practice", done: false },
    { name: "React Learning", done: false }
  ]);

  // state for input field
  const [newHabit, setNewHabit] = useState("");

  function addHabit() {
    if (newHabit.trim() === "") return;

    setHabits([...habits, { name: newHabit, done: false }]);
    setNewHabit("");
  }

  function toggleHabit(index) {
    const updatedHabits = [...habits];
    updatedHabits[index].done = !updatedHabits[index].done;
    setHabits(updatedHabits);
  }

  const completedCount = habits.filter(h => h.done).length;
  const progress =
  habits.length === 0 ? 0 : (completedCount / habits.length) * 100;


  return (
    <div className="container">
      <h1>Smart Habit Tracker</h1>
      <p>Completed: {completedCount} / {habits.length}</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <input
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
        placeholder="New habit"
      />
      <button onClick={addHabit}>Add</button>

      {habits.map((habit, index) => (
        <HabitItem
          key={index}
          habit={habit}
          toggleHabit={() => toggleHabit(index)}
        />
      ))}
    </div>
  );
}

export default App;


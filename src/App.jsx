import { useState } from "react";
import HabitItem from "./components/HabitItem";
import Confetti from "./components/Confetti";
import "./index.css";

function App() {
  // state for habits list (start empty so the user adds their own habits)
  const [habits, setHabits] = useState([]);

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

      {habits.length === 0 ? (
        <p className="empty">No habits yet — add one using the input below.</p>
      ) : (
        <>
          <p>Completed: {completedCount} / {habits.length}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}

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

      {/* Show confetti briefly when all habits are completed */}
      {habits.length > 0 && completedCount === habits.length && (
        <Confetti duration={3000} particleCount={140} />
      )}
    </div>
  );
}

export default App;


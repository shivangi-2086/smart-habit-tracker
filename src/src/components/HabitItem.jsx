function HabitItem({ habit, toggleHabit }) {
  return (
    <div className={`habit ${habit.done ? "done" : ""}`}>

      <span
        style={{
          textDecoration: habit.done ? "line-through" : "none",
        }}
      >
        {habit.name}
      </span>

      <button onClick={toggleHabit}>{habit.done ? "Undo" : "Done"}</button>
    </div>
  );
}

export default HabitItem;

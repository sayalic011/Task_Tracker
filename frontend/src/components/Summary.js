export default function Summary({ tasks }) {
  const today = new Date().toDateString();

  const todayCompleted = tasks.filter(
    (t) =>
      t.status === "DONE" &&
      new Date(t.updated_at).toDateString() === today
  ).length;

  const weekCompleted = tasks.filter((t) => {
    if (t.status !== "DONE") return false;
    const diff =
      (new Date() - new Date(t.updated_at)) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <div className="summary">
      <div>📌 Total Tasks: {tasks.length}</div>
      <div>✅ Completed Today: {todayCompleted}</div>
      <div>📊 Completed This Week: {weekCompleted}</div>
    </div>
  );
}

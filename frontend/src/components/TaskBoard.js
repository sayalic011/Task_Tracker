import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "./TaskBoard.css";

const columns = ["TODO", "DONE"];

export default function TaskBoard({ tasks, onDrag }) {
  return (
    <DragDropContext onDragEnd={onDrag}>
      <div className="taskboard-wrapper">
        
        {/* 🌟 Attractive Header Image */}
        <div className="board-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
            alt="Task Board"
          />
          <h2>Track your work </h2>
        </div>

        <div className="board">
          {columns.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{col === "TODO" ? "To Do" : "Completed"}</h3>

                  {tasks.filter((t) => t.status === col).length === 0 && (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
                      alt="No tasks"
                      className="empty-img"
                    />
                  )}

                  {tasks
                    .filter((t) => t.status === col)
                    .map((task, i) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={i}
                      >
                        {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

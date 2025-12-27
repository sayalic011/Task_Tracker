import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const columns = ["TODO", "DONE"];

export default function TaskBoard({ tasks, onDrag }) {
  return (
    <DragDropContext onDragEnd={onDrag}>
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
    </DragDropContext>
  );
}

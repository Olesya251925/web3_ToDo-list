import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import AdditionTask from '../addition_task/addition_task';

const TaskList = ({ tasks, expandedTaskId, onToggleExpand, onDelete, onEdit, onShare }) => (
    <Droppable droppableId="tasks">
        {(provided) => (
            <div
                className="task-message-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
            >
                {tasks.length === 0 ? (
                    <div className="task-message">
                        <hr className="task-line" />
                        <span>No tasks</span>
                        <hr className="task-line" />
                    </div>
                ) : (
                    tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided) => (
                                <div
                                    className="task-container"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <AdditionTask
                                        taskTitle={task.title}
                                        taskAbout={
                                            expandedTaskId === task.id
                                                ? task.about
                                                : task.about.length > 50
                                                    ? task.about.slice(0, 50) + '...'
                                                    : task.about
                                        }
                                        onToggleExpand={() => onToggleExpand(task.id)}
                                        onDelete={() => onDelete(task.id)}
                                        onEdit={() => onEdit(task)}
                                        onShare={() => onShare(task)}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))
                )}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default TaskList;

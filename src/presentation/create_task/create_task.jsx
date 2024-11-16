import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskList from './task_list';
import TaskInputForm from './task_input_form';
import DeleteModal from '../delete_button/delete';
import EditModal from '../edit/edit';
import ShareModal from '../share/share_task';

const CreateTask = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToShare, setTaskToShare] = useState(null);
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    const saveTasks = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleAddClick = () => {
        if (title.trim() === "" || about.trim() === "") {
            alert("Пожалуйста, заполните все поля!");
            return;
        }
        const newTask = { id: Date.now() + Math.random(), title, about };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setTitle('');
        setAbout('');
    };

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setIsDeleteModalOpen(false);
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updatedTask) => {
        const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setIsEditModalOpen(false);
    };

    const handleShareClick = (task) => {
        setTaskToShare(task);
        setIsShareModalOpen(true);
    };

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedTasks = [...tasks];
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);
        setTasks(reorderedTasks);
        saveTasks(reorderedTasks);
    };

    const handleToggleExpand = (taskId) => {
        setExpandedTaskId(prevId => (prevId === taskId ? null : taskId));
    };

    return (
        <div className="container">
            <TaskInputForm
                title={title}
                setTitle={setTitle}
                about={about}
                setAbout={setAbout}
                onAddClick={handleAddClick}
            />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <TaskList
                    tasks={tasks}
                    expandedTaskId={expandedTaskId}
                    onToggleExpand={handleToggleExpand}
                    onDelete={handleDeleteClick}
                    onEdit={handleEditTask}
                    onShare={handleShareClick}
                />
            </DragDropContext>
            {isDeleteModalOpen && (
                <DeleteModal
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}
            {isEditModalOpen && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    task={taskToEdit}
                    onSave={handleSaveEdit}
                />
            )}
            {isShareModalOpen && (
                <ShareModal
                    title={taskToShare?.title}
                    about={taskToShare?.about}
                    onClose={() => setIsShareModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CreateTask;

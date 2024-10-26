import React, { useEffect, useState } from 'react';
import plusIcon from '../../icons/plus.png';
import DeleteModal from "../delete_button/delete";
import AdditionTask from '../addition_task/addition_task';
import EditModal from '../edit/edit';
import ShareModal from '../share/share_task';

const CreateTask = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToShare, setTaskToShare] = useState(null);

    // Добавляем состояние для управления отображением полного текста
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAddClick = () => {
        if (title.trim() === "" || about.trim() === "") {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        const taskId = Date.now() + Math.random();
        const newTask = { id: taskId, title, about };

        setTasks((prevTasks) => [...prevTasks, newTask]);
        saveTasks([...tasks, newTask]);
        setTitle('');
        setAbout('');
    };

    const saveTasks = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    };

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete) {
            const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
            setTaskToDelete(null);
        }
        setIsDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
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

    const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
        setTaskToShare(null);
    };

    // Обработчик клика по задаче для отображения полного текста
    const handleToggleExpand = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    };

    return (
        <div className="container">
            <div className="input-container-wrapper">
                <div className="input-container">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="About..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </div>
                <button className="add-button" onClick={handleAddClick}>
                    <img src={plusIcon} alt="Add" className="add-icon" />
                </button>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="task-message-container">
                {tasks.length === 0 ? (
                    <div className="task-message">
                        <hr className="task-line" />
                        <span>No tasks</span>
                        <hr className="task-line" />
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="task-container">
                            <AdditionTask
                                taskTitle={task.title}
                                taskAbout={
                                    expandedTaskId === task.id
                                        ? task.about
                                        : task.about.length > 50
                                            ? task.about.slice(0, 50) + '...'
                                            : task.about
                                }
                                onToggleExpand={() => handleToggleExpand(task.id)} // Передаем обработчик клика
                                onDelete={() => handleDeleteClick(task.id)}
                                onEdit={() => handleEditTask(task)}
                                onShare={handleShareClick}
                            />
                        </div>
                    ))
                )}
            </div>

            {isDeleteModalOpen && (
                <DeleteModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {isEditModalOpen && taskToEdit && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    task={taskToEdit}
                    onSave={handleSaveEdit}
                />
            )}

            {isShareModalOpen && taskToShare && (
                <ShareModal
                    title={taskToShare.title}
                    about={taskToShare.about}
                    onClose={handleCloseShareModal}
                />
            )}
        </div>
    );
};

export default CreateTask;

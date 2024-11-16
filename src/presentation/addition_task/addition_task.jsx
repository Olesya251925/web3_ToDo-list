import React, { useState } from 'react';
import './addition_task.scss';
import shareIcon from '../../icons/sharee.png';
import editIcon from '../../icons/edit.png';
import infoIcon from '../../icons/info.png';
import deleteIcon from '../../icons/cross.png';

const AdditionTask = ({ taskTitle, taskAbout, onToggleExpand, onDelete, onEdit, onShare }) => {
    const [showIcons, setShowIcons] = useState(false);

    const handleShareClick = () => {
        onShare({ title: taskTitle, about: taskAbout });
    };

    const handleEditClick = () => {
        onEdit({ title: taskTitle, about: taskAbout });
    };

    const handleInfoClick = () => {
    };

    return (
        <div
            className="custom-task-container"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
        >
            <div className="task-content">
                <h3 className="task-title">{taskTitle}</h3>
                <p onClick={onToggleExpand} className="task-about">
                    {taskAbout}
                </p>
            </div>

            {showIcons && (
                <div className="icons-container">
                    <button className="action-button" onClick={handleShareClick}>
                        <img src={shareIcon} alt="Share" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleEditClick}>
                        <img src={editIcon} alt="Edit" className="action-icon" />
                    </button>
                    <button className="action-button" onClick={handleInfoClick}>
                        <img src={infoIcon} alt="Info" className="action-icon" />
                    </button>
                </div>
            )}

            <button className="action-button delete-button" onClick={onDelete}>
                <img src={deleteIcon} alt="Delete" className="action-icon" />
            </button>
        </div>
    );
};

export default AdditionTask;

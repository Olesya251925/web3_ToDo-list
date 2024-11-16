import React from 'react';
import './edit.scss';

export default function EditModal({ isOpen, onClose, task, onSave }) {
    const [title, setTitle] = React.useState(task.title);
    const [about, setAbout] = React.useState(task.about);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        if (!title || !about) {
            setErrorMessage('Please fill in all fields!');
            return;
        }

        onSave({ ...task, title, about });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Mini Input"
                    className="modal-input"
                />
                <textarea
                    value={about}
                    onChange={(e) => {
                        setAbout(e.target.value);
                        if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Max Input"
                    className="modal-textarea"
                />
                <div className="modal-buttons">
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
                {errorMessage && (
                    <div id="error-message" className="error-container">
                        {errorMessage}
                    </div>
                )} {/* Сообщение об ошибке */}
            </div>
        </div>
    );
}

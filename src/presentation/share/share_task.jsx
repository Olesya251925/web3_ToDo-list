import React from 'react';
import './share_task.scss';

const ShareModal = ({ title, about, onClose }) => {
    const handleCopyClick = () => {
        const textToCopy = `${title}\n${about}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Текст скопирован в буфер обмена');
            onClose();
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-share" onClick={(e) => e.stopPropagation()}>
                <div className="modal-share-content">
                    <button className="share-button" onClick={handleCopyClick}>
                        <img src="src/icons/copy.png" alt="Copy" />
                    </button>
                    <button className="share-button">
                        <img src="src/icons/vk.png" alt="Share VK" />
                    </button>
                    <button className="share-button">
                        <img src="src/icons/telegram.png" alt="Share Telegram" />
                    </button>
                    <button className="share-button">
                        <img src="src/icons/whatsapp.png" alt="Share WhatsApp" />
                    </button>
                    <button className="share-button">
                        <img src="src/icons/facebook.png" alt="Share Facebook" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
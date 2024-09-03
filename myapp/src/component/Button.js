import React from 'react';

// Button component
function Button({ label, onClick, onHover, onLeave, type = 'button', style, disabled = false }) {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            style={{ ...styles.button, ...style }} 
            disabled={disabled}
            onMouseOver={onHover}
            onMouseLeave={onLeave}
        >
            {label}
        </button>
    );
}

// Default styles for the button
const styles = {
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    },
};

export default Button;

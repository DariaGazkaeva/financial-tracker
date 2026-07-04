import './app-button.css';

function AppButton({
    text,
    onClick,
    theme = 'primary',
    disabled = false,
    type = 'button',
}) {
    const baseClass = 'app-button--' + theme;

    return (
        <button
            className={`app-button ${baseClass}`}
            onClick={ onClick }
            disabled={disabled}
            type={ type }
        >
            { text }
        </button>
    )
}

export default AppButton;

import './app-button.css';

function AppButton({
    text,
    onClick,
    theme = 'primary',
    disabled = false,
}) {
    const baseClass = 'app-button--' + theme;

    return (
        <button
            className={`app-button ${baseClass}`}
            disabled={disabled}
        >
            { text }
        </button>
    )
}

export default AppButton;
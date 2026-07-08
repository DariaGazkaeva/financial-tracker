import './app-button.css';

interface IAppButtonProps {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    theme?: 'primary' | 'secondary';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

function AppButton({
    text,
    onClick,
    theme = 'primary',
    disabled = false,
    type = 'button',
}: IAppButtonProps) {
    const baseClass = `app-button--${theme}`;

    return (
        <button
            className={`app-button ${baseClass}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            { text }
        </button>
    );
}

export default AppButton;

import './app-button.css';

interface AppButtonProps {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
}: AppButtonProps) {
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

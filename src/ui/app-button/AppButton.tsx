import './app-button.css';

interface IAppButtonProps {
    text?: string,
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    theme?: 'primary' | 'secondary',
    disabled?: boolean,
    type?: 'button' | 'submit' | 'reset',
    className?: string,
    title?: string,
}

function AppButton({
    text,
    children,
    onClick,
    theme = 'primary',
    disabled = false,
    type = 'button',
    className = '',
    title,
}: IAppButtonProps) {
    const baseClass = `app-button--${theme}`;

    return (
        <button
            className={`app-button ${baseClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            title={title}
        >
            { text ?? children }
        </button>
    );
}

export default AppButton;

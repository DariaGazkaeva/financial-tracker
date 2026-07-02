import './app-input.css';
import clsx from 'clsx';

function AppInput({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    register,
    className = '',
}) {
    return (
        <div className='app-input'>
            {label && (
                <label
                    htmlFor={ name }
                    className="app-input__label"
                >
                    { label }
                </label>
            )}
            <input
                id={ name }
                name={ name }
                className={clsx(
                    'app-input__field',
                    error && 'app-input__field--error',
                    disabled && 'app-input__field--disabled',
                    className,
                )}
                type={ type }
                placeholder={ placeholder }
                value={ value }
                onChange={ onChange }
                disabled={ disabled }
            />
            {error && (
                <span className="app-input__error">
                    { error }
                </span>
            )}
        </div>
    )
}

export default AppInput

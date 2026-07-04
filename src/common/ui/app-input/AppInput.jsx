import clsx from 'clsx';

import './app-input.css';

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
    theme = 'vertical',
}) {
    return (
        <div className={`app-input app-input--${theme}`}>
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
                {...(register ? register(name) : {})}
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

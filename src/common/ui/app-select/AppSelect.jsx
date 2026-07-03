import clsx from 'clsx';

import './app-select.css';

function AppSelect({
    label,
    name,
    value,
    options = [],
    disabled = false,
    error,
    onChange,
    className = '',
}) {
    const fieldClasses = clsx(
        'app-select__field',
        error && 'app-select__field--error',
        disabled && 'app-select__field--disabled',
        className,
    );

    return (
        <div className='app-select'>
            <label
                htmlFor={ name }
                className='app-select__label'
            >
                { label }
            </label>
            <select
                name={ name }
                id={ name }
                value={ value }
                onChange={ onChange }
                className={ fieldClasses }
                disabled={ disabled }
            >
                {options.map((option) => (
                    <option
                        key={ option.id }
                        value={ option.id }
                    >
                        { option.label }
                    </option>
                ))}
            </select>
            {error && (
                <span
                    className='app-select__error'
                >
                    { error }
                </span>
            )}
        </div>
    );
}

export default AppSelect;
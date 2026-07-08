import clsx from 'clsx';
import type { Path, UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form';

import './app-select.css';

interface IAppSelectOption {
    id: number,
    label: string,
}

interface IAppSelectProps<TFieldValues extends FieldValues> {
    label: string,
    name: Path<TFieldValues>,
    value?: string | number,
    options?: IAppSelectOption[],
    disabled?: boolean,
    error?: string,
    onChange?: React.ChangeEventHandler<HTMLSelectElement>,
    className?: string,
    placeholder?: string,
    register?: UseFormRegister<TFieldValues>,
    rules?: RegisterOptions<TFieldValues>,
}

function AppSelect<TFieldValues extends FieldValues = FieldValues>({
    label,
    name,
    value,
    options = [],
    disabled = false,
    error,
    onChange,
    className = '',
    placeholder = 'Выберите...',
    register,
    rules,
}: IAppSelectProps<TFieldValues>) {
    const fieldClasses = clsx(
        'app-select__field',
        error && 'app-select__field--error',
        disabled && 'app-select__field--disabled',
        className,
    );

    return (
        <div className='app-select'>
            <label
                htmlFor={name}
                className='app-select__label'
            >
                { label }
            </label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={fieldClasses}
                disabled={disabled}
                {...(register ? register(name, rules) : {})}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        { placeholder }
                    </option>
                )}
                {options.map((option) => (
                    <option
                        key={option.id}
                        value={option.id}
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

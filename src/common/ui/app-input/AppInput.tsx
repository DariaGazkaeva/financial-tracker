import clsx from 'clsx';
import type { Path, UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form';

import './app-input.css';

interface IAppInputProps<TFieldValues extends FieldValues = FieldValues> {
    label?: string;
    name: Path<TFieldValues>;
    type?: 'text' | 'password' | 'number' | 'date';
    placeholder?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
    disabled?: boolean;
    register?: UseFormRegister<TFieldValues>;
    rules?: RegisterOptions<TFieldValues>;
    className?: string;
    theme?: 'vertical' | 'horizontal';
}

function AppInput<TFieldValues extends FieldValues = FieldValues>({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    register,
    rules,
    className = '',
    theme = 'vertical',
}: IAppInputProps<TFieldValues>) {
    return (
        <div className={`app-input app-input--${theme}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="app-input__label"
                >
                    { label }
                </label>
            )}
            <input
                id={name}
                name={name}
                className={clsx(
                    'app-input__field',
                    error && 'app-input__field--error',
                    disabled && 'app-input__field--disabled',
                    className,
                )}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...(register ? register(name, rules) : {})}
            />
            {error && (
                <span className="app-input__error">
                    { error }
                </span>
            )}
        </div>
    );
}

export default AppInput;

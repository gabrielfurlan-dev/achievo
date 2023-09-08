import React from 'react';

interface TextInputProps {
    label: string;
    name: string;
    register: any;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    error: string | undefined;
}

export function InputValidation({ label,
    name,
    register,
    value,
    onChange,
    placeholder,
    error, }: TextInputProps) {
    return (
        <div className="flex flex-col">

            <div className="flex gap-2 items-center">
                <label className="text-LIGHT_TEXT dark:text-DARK_TEXT" htmlFor={name} children={label} />
                <span className="text-SECONDARY text-xs">{error != undefined && `*${error}`}</span>
            </div>

            <input
                {...register(name)}
                name={name}
                type="text"
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder={placeholder}
                className="bg-LIGHT_BACKGROUND_SECONDARY
                   dark:bg-DARK_BACKGROUND_SECONDARY
                   text-LIGHT_TEXT
                   dark:text-DARK_TEXT
                   rounded-lg
                   py-2 px-3"
            />

        </div>
    );
};

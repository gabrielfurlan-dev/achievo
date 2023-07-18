import React from 'react';
import AutosizeInput from 'react-input-autosize';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const AutoSizeInput: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <div id="relative-parent">
            <span id="size-calibration"></span>
            <AutosizeInput
                id="autosized-input"
                inputClassName="autosized-input"
                style={{ fontSize: '16px' }}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
            />
        </div>
    );
};

export default AutoSizeInput;

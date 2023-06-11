import React from 'react';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';

const StyledAutosizeInput = styled(AutosizeInput)`
  background-color: transparent;
  /* Outros estilos personalizados podem ser adicionados aqui */
`;

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const AutoSizeInput: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <div id="relative-parent">
      <span id="size-calibration"></span>
      <StyledAutosizeInput
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

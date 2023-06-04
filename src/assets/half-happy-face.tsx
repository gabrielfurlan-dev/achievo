import React from 'react';
import { EHumourStatus } from '../enums/EHumourStatus';
import { FacesProps } from '../Interfaces/FaceProps';
import SvgWrapper from './SvgWrapper';

const HalfHappyFace = ({ width, height, humour: humour, strokeColor }: FacesProps) => {
    return (
        <SvgWrapper
            faceProps={{ width, height, humour, strokeColor }}
            humourValue={EHumourStatus.HalfHappy}
        >
            <path
                d="M14.8898 13.2H11.6898M24.4898 13.2H21.2898M25.2898 22C25.2898 22 22.8898 25.2 18.0898 25.2C13.2898 25.2 10.8898 22 10.8898 22M2.08984 18C2.08984 26.8368 9.25304 34 18.0898 34C26.9266 34 34.0898 26.8368 34.0898 18C34.0898 9.1632 26.9266 2 18.0898 2C9.25304 2 2.08984 9.1632 2.08984 18Z"
                stroke={strokeColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </SvgWrapper>
    );
}

export default HalfHappyFace;

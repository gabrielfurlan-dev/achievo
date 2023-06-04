import React from 'react';
import { EHumourStatus } from '../enums/EHumourStatus';
import { FacesProps } from '../Interfaces/FaceProps';
import SvgWrapper from './SvgWrapper';

const EmotionlessFace: React.FC<FacesProps> = ({ width, height, humour: humour, strokeColor }) => {
    return (
        <SvgWrapper
            faceProps={{ width, height, humour, strokeColor }}
            humourValue={EHumourStatus.Emotionless}
        >
            <>
                <path
                    d="M13.2898 22.8H22.8898M34.0898 18C34.0898 26.8368 26.9266 34 18.0898 34C9.25304 34 2.08984 26.8368 2.08984 18C2.08984 9.1632 9.25304 2 18.0898 2C26.9266 2 34.0898 9.1632 34.0898 18Z"
                    stroke={strokeColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle cx="12.5898" cy="12.5" r="2.5" fill={strokeColor} />
                <circle cx="23.5898" cy="12.5" r="2.5" fill={strokeColor} />'
            </>
        </SvgWrapper>
    );
}

export default EmotionlessFace;

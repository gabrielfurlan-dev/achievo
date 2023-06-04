import React from 'react';
import { FacesProps } from '../Interfaces/FaceProps';
import SvgWrapper from './SvgWrapper';
import { EHumourStatus } from '@/enums/EHumourStatus';

const SadFace: React.FC<FacesProps> = ({ width, height, humour: humour, strokeColor }) => {

    return (
        <SvgWrapper
            humourValue={EHumourStatus.Sad}
            faceProps={{ width, height, humour, strokeColor }}
        >
            <>
                <path
                    d="M10.8898 23.6C10.8898 23.6 13.2898 20.4 18.0898 20.4C22.8898 20.4 25.2898 23.6 25.2898 23.6M12.4898 13.2C12.2777 13.2 12.0742 13.1157 11.9242 12.9657C11.7741 12.8157 11.6898 12.6122 11.6898 12.4C11.6898 12.1878 11.7741 11.9843 11.9242 11.8343C12.0742 11.6843 12.2777 11.6 12.4898 11.6C12.702 11.6 12.9055 11.6843 13.0555 11.8343C13.2056 11.9843 13.2898 12.1878 13.2898 12.4C13.2898 12.6122 13.2056 12.8157 13.0555 12.9657C12.9055 13.1157 12.702 13.2 12.4898 13.2ZM23.6898 13.2C23.4777 13.2 23.2742 13.1157 23.1242 12.9657C22.9741 12.8157 22.8898 12.6122 22.8898 12.4C22.8898 12.1878 22.9741 11.9843 23.1242 11.8343C23.2742 11.6843 23.4777 11.6 23.6898 11.6C23.902 11.6 24.1055 11.6843 24.2555 11.8343C24.4056 11.9843 24.4898 12.1878 24.4898 12.4C24.4898 12.6122 24.4056 12.8157 24.2555 12.9657C24.1055 13.1157 23.902 13.2 23.6898 13.2ZM18.0898 34C26.9266 34 34.0898 26.8368 34.0898 18C34.0898 9.1632 26.9266 2 18.0898 2C9.25304 2 2.08984 9.1632 2.08984 18C2.08984 26.8368 9.25304 34 18.0898 34Z"
                    stroke={strokeColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle cx="12.5898" cy="12.5" r="2.5" fill={strokeColor} />
                <circle cx="23.5898" cy="12.5" r="2.5" fill={strokeColor} />
            </>

        </SvgWrapper>
    );
}

export default SadFace;

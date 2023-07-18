import React from 'react'

interface ButtonProps {
    title: string;
}

const PrincipalButton: React.FC<ButtonProps> = ({ title }) => {
    return (
        <div>
            <button
                type="button"
                className="bg-LIGHT_BLUE
                            p-2
                            text-base
                            font-semibold
                          text-WHITE
                            rounded-lg
                            w-24 h-8
                            text-center"
            >
                {title}
            </button>
        </div>
    )
}

export default PrincipalButton;

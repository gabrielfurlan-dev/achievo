import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'phosphor-react';
import { InputValidation } from '../Inputs/InputValidation';
import { InputField } from '../Inputs/InputField';
import { useEffect, useState } from 'react';
import { getAll } from '@/services/colors/get-all';

export function CreateNewTag() {
    const [nameTag, setNameTag] = useState<string>()
    const [selectedColor, setSelectedColor] = useState<string>()
    const [colors, setColors] = useState<string[]>([])

    useEffect(() => {
        async function fetch() {
            setColors((await getAll()).data)
        }
        fetch()
    }, [])

    return (
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                New Tag
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                Fill in the fields below
            </Dialog.Description>

            <InputField onChange={setNameTag} value={nameTag} />

            <ul className='flex flex-col gap-2 pt-5'>
                {colors.map(color => (
                    <li className="flex rounded-lg py-2 px-2 w-3 h-3 text-white gap-2 justify-between"
                        style={{ backgroundColor: `#${color}` }}
                        onClick={() => setSelectedColor(color)}>
                        {color == selectedColor && <Check />}
                    </li>
                ))}
            </ul>

            <Dialog.Close asChild>
                <button
                    className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                >
                    <X />
                </button>
            </Dialog.Close>
        </Dialog.Content>
    );
}

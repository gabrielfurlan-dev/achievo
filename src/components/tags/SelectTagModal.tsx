import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Book, Plus, X } from 'phosphor-react';
import { SearchInput } from '../Inputs/SearchInput';
import { ITag } from '@/interfaces/tags/ITag';
import { toast } from 'sonner'
import { generateInvalidUniqueID } from '@/helpers/uniqueIdHelper';

interface selectTagModalProps {
    goalId: number,
    tags: ITag[]
    setTags: Dispatch<SetStateAction<ITag[]>>
}

export function SelectTagModal({goalId, tags, setTags}:selectTagModalProps) {
    const [filterName, setFilterName] = useState<string>();
    const [defaultTags, setDefaultTags] = useState<ITag[]>([])
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setDefaultTags([
            {
                id: 1,
                hexColor: "#2D6B6F",
                icon: "Body",
                title: "Physicus"
            },
            {
                id: 2,
                hexColor: "#5CA4E5",
                icon: "Run",
                title: "Run"
            }
        ])
    }, [])

    async function setTag(selectedTag: ITag){

        // const newTag = {
        //     id: generateInvalidUniqueID(),
        //     hexColor: "",
        //     icon: "",
        //     title: ""
        // } as ITag

        if (tags == null ||tags == undefined ){
            setTags([selectedTag])
        }else{
            setTags([...tags, selectedTag])
        }
        toast.success("Tag added by succesful")
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className="w-4 h-4 border-1">
                    <Plus />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Select Tag
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Chose the tags to your goals
                    </Dialog.Description>

                    <SearchInput onChange={(e) => setFilterName(e.target.value)} value={filterName} />

                    <ul className='flex flex-col gap-2 pt-5'>
                        {defaultTags.map(x => (
                            <li className='flex items-center gap-2 py-3 px-4 rounded-lg text-NEUTRAL_GRAY_0' style={{backgroundColor: x.hexColor}}
                            onClick={() => setTag(x)}>
                                <Book size={24}/>
                                <p>{x.title}</p>
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
            </Dialog.Portal>
        </Dialog.Root>
    );
}

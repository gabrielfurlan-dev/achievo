import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ITag } from '@/interfaces/tags/ITag';
// import { generateInvalidUniqueID } from '@/helpers/uniqueI dHelper';
import { CreateNewTag } from './CreateNewTag';
import { SelectTag } from './SelectTag';
import { Book, Check, Plus, X } from 'phosphor-react';
import { ConfirmButton } from '../Buttons/ConfirmButton';
import { getAll } from '@/services/tags/getAll';
import { SearchInput } from '../Inputs/SearchInput';

interface selectTagModalProps {
    userId: string,
    goalId: number,
    goalTags: ITag[]
    setGoalTag: Dispatch<SetStateAction<ITag[]>>
}

export function SelectTagModal({ userId, goalId, goalTags, setGoalTag }: selectTagModalProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [isAddingNewTag, setIsAddingNewTag] = useState<boolean>(false);

    const [filterName, setFilterName] = useState<string>();
    const [defaultTags, setDefaultTags] = useState<ITag[]>([])
    const [tagIds, setTagIds] = useState<number[]>([])

    useEffect(() => {
        async function fetchData() {
            const tags = (await getAll(userId)).data;
            setDefaultTags(tags as ITag[])
            setTagIds(goalTags.map(x => x.id));
        }
        fetchData()
    }, [])

    useEffect(() => {
        setTagIds(goalTags.map(x => x.id));
    }, [goalTags])

    async function handleTag(selectedTag: ITag) {

        const tagAlreadyAdded = tagIds.find(x => x == selectedTag.id) != null

        if (tagAlreadyAdded) {
            removeTag(selectedTag);
        } else {
            AddTag(selectedTag);
        }
    }

    function removeTag(selectedTag: ITag) {
        setGoalTag(goalTags.filter((tag) => tag.id !== selectedTag.id));
    }

    function AddTag(selectedTag: ITag) {

        if (goalTags == null || goalTags == undefined) {
            setGoalTag([selectedTag]);
        } else {
            setGoalTag([...goalTags, selectedTag]);
        }
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
                {
                    isAddingNewTag ? (
                        <CreateNewTag />
                    ) : (
                        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

                            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                Select Tag asdfasdfasdfas
                            </Dialog.Title>
                            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                                Chose the tags to your goals
                            </Dialog.Description>

                            <SearchInput onChange={(e) => setFilterName(e.target.value)} value={filterName} />

                            <ul className='flex flex-col gap-2 pt-5'>
                                {defaultTags.map(tag => (
                                    <li className="flex rounded-lg py-1 px-2 text-white gap-2 justify-between"
                                        style={{ backgroundColor: `#${tag.colorHexCode}` }}
                                        onClick={() => handleTag(tag)}>
                                        <div className='flex'>
                                            <Book size={24} />
                                            <p>{tag.title}</p>
                                        </div>
                                        {tagIds.find(x => x == tag.id) != null ? <Check /> : <X />}
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

                            <div>
                                <ConfirmButton />
                                <button>
                                    <p>Add</p>
                                    <Plus />
                                </button>
                            </div>
                        </Dialog.Content>
                    )
                }
            </Dialog.Portal>
        </Dialog.Root>
    );
}

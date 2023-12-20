import * as Dialog from '@radix-ui/react-dialog';
import { SearchInput } from '../Inputs/SearchInput';
import { ITag } from '@/interfaces/tags/ITag';
import { Book, Check, X } from 'phosphor-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getAll } from '@/services/tags/getAll';

type selectTagProps = {
    setGoalTag: Dispatch<SetStateAction<ITag[]>>,
    goalTags: ITag[],
    userId: string
}

export function SelectTag({setGoalTag, goalTags, userId}:selectTagProps) {

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
        <div>
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Select Tag
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
        </div>
    );
}

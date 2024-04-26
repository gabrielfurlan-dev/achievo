/* eslint-disable */
import { NotificationItem, NotificationProps } from '@/components/NotificationItem';
import { INotification } from '@/interfaces/notifications/iNotification';
import { ArrowRight } from 'phosphor-react';
import { useState } from 'react';
import { getCreatedTimeElapsed } from './elapsedTime';
import { string } from 'zod';

const ITEMS_PER_PAGE = 2;

export function Paginate({ notifications }: { notifications: Array<INotification> }) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPageItems = notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div>
            {currentPageItems.map(notification => (
                <div className="pb-4">
                    <NotificationItem
                        wikiURL={notification.wikiURL}
                        id={notification.id}
                        title={notification.title}
                        message={notification.message}
                        key={notification.id}
                        isUnred={!notification.isRead}
                        updatedTime={getCreatedTimeElapsed(String(notification.createdDate), "")}
                    />
                </div>
            ))}
            <span className="text-white">Página {currentPage} de {totalPages}</span>
            <div className="flex flex-row justify-evenly pt-2">
                <div>
                    <button className={ currentPage == 1 ? "bg-neutral-100 text-[#868E96] py-2 rounded-md flex items-center justify-center w-20 text-sm font-normal underline dark:bg-DARK_BACKGROUND_SECONDARY dark:text-white opacity-10" : "bg-neutral-200 text-black py-2 rounded-md flex items-center justify-center w-20 text-sm font-normal underline dark:text-neutral-200 dark:bg-DARK_BACKGROUND_TERTIARY"}
                        onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                </div>
                <div>
                    <button
                        className={currentPage != totalPages ? "bg-[#C3E5D5] p-2 rounded-md flex items-center justify-between w-20 text-sm text-[#212529] font-normal dark:bg-DARK_PRINCIPAL_SECONDARY dark:text-white hover:bg-PRINCIPAL hover:dark:bg-PRINCIPAL hover:text-white" : "bg-neutral-100 p-2 rounded-md flex items-center justify-between w-20 text-sm text-[#868E96] font-normal dark:bg-DARK_PRINCIPAL_SECONDARY dark:text-white opacity-50"}
                        onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>

    )
}

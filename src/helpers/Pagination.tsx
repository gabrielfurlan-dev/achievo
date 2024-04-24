/* eslint-disable */
import { NotificationItem, NotificationProps } from '@/components/NotificationItem';
import { INotification } from '@/interfaces/notifications/iNotification';
import { ArrowRight } from 'phosphor-react';
import { useState } from 'react';

const ITEMS_PER_PAGE = 2;


export function Paginate({ notifications }: { notifications: Array<INotification> }) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

    // Cálculo para itens na página atual
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
                        isUnred
                        updatedTime="1h"
                    />
                </div>
            ))}
             <span>Página {currentPage} de {totalPages}</span>
            <div className="flex flex-row justify-evenly pt-2">
                <div>
                    <button className="bg-[#F8F9FA] text-[#868E96] p-2 rounded-md flex items-center justify-between w-20 text-sm font-normal underline hover:text-black dark:bg-DARK_BACKGROUND_SECONDARY"
                        onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                </div>
                <div>
                    <button
                        className="bg-[#C3E5D5] p-2 rounded-md flex items-center justify-between w-20 text-sm text-[#212529] font-normal dark:bg-DARK_PRINCIPAL_SECONDARY dark:text-white hover:bg-PRINCIPAL hover:dark:bg-PRINCIPAL hover:text-white"
                        onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>

    )
}

import { INotification } from "@/interfaces/notifications/iNotification";
import { ArrowRight } from "phosphor-react";
import { useState } from "react";
import { getTimeElapsed } from "@/helpers/elapsedTime";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { tv } from "tailwind-variants";

const ITEMS_PER_PAGE = 2;

export function NotificationPage({ notifications }: { notifications: Array<INotification> }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPageItems = notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const previousPageButtonStyle = tv({
        base: "text-black py-2 rounded-md flex items-center justify-center w-20 text-sm font-normal underline",
        variants: {
            enabled: {
                true: "bg-neutral-100 dark:bg-DARK_BACKGROUND_SECONDARY dark:text-white opacity-25",
                false: "bg-neutral-200 dark:bg-DARK_BACKGROUND_TERTIARY dark:text-neutral-200"
            }
        },
    })

    const nextPageButtonStyle = tv({
        base: "rounded-md flex items-center justify-between w-20 text-sm font-normal p-2 ",
        variants: {
            enabled: {
                true: "bg-LIGHT_PRINCIPAL_SECONDARY text-[#212529] dark:bg-DARK_PRINCIPAL_SECONDARY dark:text-white hover:bg-PRINCIPAL hover:dark:bg-PRINCIPAL hover:text-white",
                false: "bg-neutral-100 text-[#868E96]  dark:bg-DARK_PRINCIPAL_SECONDARY dark:text-white opacity-50"
            }
        },
    })

    return (
        <div>
            {
                currentPageItems &&
                currentPageItems
                    .map(notification => (
                        <div className="pb-4">
                            <NotificationItem
                                wikiURL={notification.wikiURL}
                                id={notification.id}
                                title={notification.title}
                                message={notification.message}
                                key={notification.id}
                                isUnread={!notification.isRead}
                                timeElasped={getTimeElapsed(String(notification.createdDate))}
                            />
                        </div>
                    ))
            }
            {
                currentPageItems.length ?
                    (<span className="dark:text-white">Page {currentPage} of {totalPages}</span>) :
                    (<span className="dark:text-white">Without notifications</span>)
            }

            <div className="flex flex-row justify-evenly pt-2">
                <div>
                    <button className={previousPageButtonStyle({ enabled: currentPage == 1 })}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </div>
                <div>
                    <button
                        className={nextPageButtonStyle({ enabled: currentPage < totalPages })}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div >
    );
}

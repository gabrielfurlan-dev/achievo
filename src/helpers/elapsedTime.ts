function getTimeElapsed(dataAtualizacao: string): string {
    const now = new Date();
    const updateDate = new Date(dataAtualizacao);
    const differenceMilliseconds = now.getTime() - updateDate.getTime();
    const seconds = Math.floor(differenceMilliseconds / 1000);

    if (seconds < 60) {
        return seconds < 5
            ? `just now`
            : `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months !== 1 ? "s" : ""} ago`;
    }

    const anos = Math.floor(months / 12);
    return `${anos} year${anos !== 1 ? "s" : ""} ago`;
}

export function getCreatedTimeElapsed(createdDate: string): string {
    return `Created ${getTimeElapsed(createdDate)}`;
}

export function getUpdatedTimeElapsed(updatedDate: string): string {
    return `Updated ${getTimeElapsed(updatedDate)}`;
}

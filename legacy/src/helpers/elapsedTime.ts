function getTimeElapsed(dataAtualizacao: string, typeDate: string): string {
    const now = new Date();
    const updateDate = new Date(dataAtualizacao);
    const differenceMilliseconds = now.getTime() - updateDate.getTime();
    const seconds = Math.floor(differenceMilliseconds / 1000);

    if (seconds < 60) {
        return seconds < 5
            ? `${typeDate} just now`
            : `${typeDate} ${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${typeDate} ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${typeDate} ${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${typeDate} ${days} day${days !== 1 ? 's' : ''} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${typeDate} ${months} month${months !== 1 ? 's' : ''} ago`;
    }

    const anos = Math.floor(months / 12);
    return `${typeDate} ${anos} year${anos !== 1 ? 's' : ''} ago`;
}



export function getCreatedTimeElapsed(dataAtualizacao: string): string {
    return getTimeElapsed(dataAtualizacao, "Created");
}


export function getUpdatedTimeElapsed(dataAtualizacao: string): string {
    return getTimeElapsed(dataAtualizacao, "Updated");
}

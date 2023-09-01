function getTimeElapsed(dataAtualizacao: string, typeDate: string): string {
    const now = new Date();
    const updateDate = new Date(dataAtualizacao);
    const differenceMilliseconds = now.getTime() - updateDate.getTime();
    const seconds = Math.floor(differenceMilliseconds / 1000);

    if (seconds < 60) {
        return seconds < 5
            ? `${typeDate} agora mesmo`
            : `${typeDate} há ${seconds} segundo${seconds !== 1 ? 's' : ''} atrás`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${typeDate} há ${minutes} minuto${minutes !== 1 ? 's' : ''} atrás`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${typeDate} há ${hours} hora${hours !== 1 ? 's' : ''} atrás`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${typeDate} há ${days} dia${days !== 1 ? 's' : ''} atrás`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${typeDate} há ${months} mês${months !== 1 ? 'es' : ''} atrás`;
    }

    const anos = Math.floor(months / 12);
    return `${typeDate} há ${anos} ano${anos !== 1 ? 's' : ''} atrás`;
}



export function getCreatedTimeElapsed(dataAtualizacao: string): string {
    return getTimeElapsed(dataAtualizacao, "Criado");
}


export function getUpdatedTimeElapsed(dataAtualizacao: string): string {
    return getTimeElapsed(dataAtualizacao, "Atualizado");
}
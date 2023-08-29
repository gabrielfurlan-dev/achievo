export function elapsedTime(dataAtualizacao: string): string {
    const now = new Date();
    const updateDate = new Date(dataAtualizacao);
    const  differenceMilliseconds = now.getTime() - updateDate.getTime();
    const seconds = Math.floor( differenceMilliseconds / 1000);

    
    if (seconds < 60) {
        return seconds < 5
            ? 'Atualizado agora mesmo'
            : `Atualizado há ${seconds} segundo${seconds !== 1 ? 's' : ''} atrás`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `Atualizado há ${minutes} minuto${minutes !== 1 ? 's' : ''} atrás`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `Atualizado há ${hours} hora${hours !== 1 ? 's' : ''} atrás`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `Atualizado há ${days} dia${days !== 1 ? 's' : ''} atrás`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `Atualizado há ${months} mês${months !== 1 ? 'es' : ''} atrás`;
    }

    const anos = Math.floor(months / 12);
    return `Atualizado há ${anos} ano${anos !== 1 ? 's' : ''} atrás`;
}

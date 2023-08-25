export function elapsedTime(dataAtualizacao: string): string {
    const agora = new Date();
    const dataAtualizacaoObj = new Date(dataAtualizacao);


    const diferencaMilissegundos = agora.getTime() - dataAtualizacaoObj.getTime();
    const segundos = Math.floor(diferencaMilissegundos / 1000);

    if (isNaN(segundos)) {
        return 'Criado agora';
    }

    if (segundos < 60) {
        return `Atualizado há ${segundos} segundo${segundos !== 1 ? 's' : ''} atrás`;
    }

    const minutos = Math.floor(segundos / 60);
    if (minutos < 60) {
        return `Atualizado há ${minutos} minuto${minutos !== 1 ? 's' : ''} atrás`;
    }

    const horas = Math.floor(minutos / 60);
    if (horas < 24) {
        return `Atualizado há ${horas} hora${horas !== 1 ? 's' : ''} atrás`;
    }

    const dias = Math.floor(horas / 24);
    return `Atualizado há ${dias} dia${dias !== 1 ? 's' : ''} atrás`;
}



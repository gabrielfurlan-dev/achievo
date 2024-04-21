
export function getRandomMotivationalPhrase() {

    const motivationalPhrases = [
        "Você está um passo mais perto de alcançar seus objetivos.",
        "Acredite em você mesmo. Você é mais capaz do que pensa.",
        "Cada pequeno progresso é um passo em direção ao seu objetivo.",
        "Mantenha o foco e continue avançando.",
        "Grandes coisas nunca vêm de conforto.",
        "Você é mais forte do que imagina.",
        "Não desista. A vitória está próxima.",
        "Sucesso é a soma de pequenos esforços repetidos dia após dia.",
        "As dificuldades preparam pessoas comuns para destinos extraordinários.",
        "Seja persistente. Grandes coisas levam tempo.",
        "Nunca subestime o poder de definir metas e alcançá-las.",
        "Cada novo dia é uma oportunidade para progredir em direção aos seus objetivos.",
        "Você é capaz de superar qualquer desafio.",
        "A jornada de mil milhas começa com um único passo.",
        "Lembre-se: o progresso é mais importante do que a perfeição.",
        "Se você pode sonhar, você pode realizar.",
        "Nada é impossível para aquele que acredita.",
        "A motivação é o que te faz começar. O hábito é o que te faz continuar.",
        "Seja a pessoa que você sempre quis ser.",
        "Acredite no processo. Os resultados virão.",
        "A jornada pode ser difícil, mas a recompensa é incrível.",
        "Mantenha seus olhos no prêmio e siga em frente.",
        "Seja determinado. Seja implacável. Alcance seus objetivos.",
        "Cada obstáculo é uma oportunidade para crescer e aprender.",
        "Nunca é tarde demais para seguir seus sonhos.",
        "Você é o autor da sua própria história. Escreva um final incrível."
    ];

    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[randomIndex];
}

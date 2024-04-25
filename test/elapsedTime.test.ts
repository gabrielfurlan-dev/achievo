import {
    getCreatedTimeElapsed,
    getUpdatedTimeElapsed,
} from "../src/helpers/elapsedTime";

test("Should return updated elapsed time", () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 3);

    let result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 3 dias atrás`);

    currentDate = new Date();
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Atualizado agora mesmo`);

    currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 2 horas atrás`);

    currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 30);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 30 minutos atrás`);

    currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 15);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 15 segundos atrás`);

    currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 6 mêses atrás`);

    currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 1 ano atrás`);
});

test("Should return created elapsed time", () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 3);

    let result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Criado há 3 dias atrás`);

    currentDate = new Date();
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Criado agora mesmo`);

    currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Criado há 2 horas atrás`);

    currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 30);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Criado há 30 minutos atrás`);

    currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 15);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Criado há 15 segundos atrás`);

    currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Criado há 6 mêses atrás`);

    currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Criado há 1 ano atrás`);
});

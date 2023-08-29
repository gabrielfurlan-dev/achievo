import { elapsedTime } from "../src/helpers/elapsedTime";

test('Should return updated elapsed time in days', () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 3);

    let result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 3 dias atrás`);

    currentDate = new Date();
    result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado agora mesmo`);
    
    currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);
    result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 2 horas atrás`);

    currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 30);
    result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 30 minutos atrás`);

    currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 15);
    result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 15 segundos atrás`);
    
    currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 6 mêses atrás`);

    currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 1 ano atrás`);
});

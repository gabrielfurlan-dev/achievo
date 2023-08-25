import { elapsedTime } from "../src/helpers/elapsedTime";

test('Should return updated elapsed time in days', () => {
    const updatedDate = new Date();
    updatedDate.setDate(updatedDate.getDate() - 3);

    let result = elapsedTime(updatedDate.toISOString());
    expect(result).toBe(`Atualizado há 3 dias atrás`);

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);
    result = elapsedTime(currentDate.toISOString());
    expect(result).toBe(`Atualizado há 2 horas atrás`);

    const currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes() - 30);
    result = elapsedTime(currentDateTime.toISOString());
    expect(result).toBe(`Atualizado há 30 minutos atrás`);

    const currentTimestamp = new Date();
    currentTimestamp.setSeconds(currentTimestamp.getSeconds() - 15);
    result = elapsedTime(currentTimestamp.toISOString());
    expect(result).toBe(`Atualizado há 15 segundos atrás`);

    const currentYear = new Date();
    currentYear.setFullYear(currentYear.getFullYear() - 1);
    result = elapsedTime(currentYear.toISOString());
    expect(result).toBe(`Atualizado há 1 ano atrás`);

    const currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth() - 6);
    result = elapsedTime(currentMonth.toISOString());
    expect(result).toBe(`Atualizado há 6 mêses atrás`);
});

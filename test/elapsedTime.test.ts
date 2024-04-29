import {
    getCreatedTimeElapsed,
    getUpdatedTimeElapsed,
} from "../src/helpers/elapsedTime";

test("Should return updated elapsed time", () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 3);

    let result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Updated 3 days ago`);

    currentDate = new Date();
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Updated just now`);

    currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Updated 2 hours ago`);

    currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 30);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Updated 30 minutes ago`);

    currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 15);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Updated 15 seconds ago`);

    currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Updated 6 months ago`);

    currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    result = getUpdatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Updated 1 year ago`);
});

test("Should return created elapsed time", () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 3);

    let result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Created 3 days ago`);

    currentDate = new Date();
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Created just now`);

    currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Created 2 hours ago`);

    currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 30);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Created 30 minutes ago`);

    currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 15);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Created 15 seconds ago`);

    currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Created 6 months ago`);

    currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    result = getCreatedTimeElapsed(currentDate.toISOString());
    expect(result).toBe(`Created 1 year ago`);
});

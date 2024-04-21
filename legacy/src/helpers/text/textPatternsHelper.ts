
export function toSnakeCase(text: string) {
    return text.normalize('NFD')
        .replaceAll(" ", "-")
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
};

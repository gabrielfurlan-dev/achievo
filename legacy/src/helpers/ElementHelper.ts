export function getElementStyle(id: string): CSSStyleDeclaration | null {
    const elemento = document.getElementById(id);
    if (!elemento) return null;
    return window.getComputedStyle(elemento);
}

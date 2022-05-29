export function persistObject<T>(key: string, obj: T) {
    localStorage.setItem(key, JSON.stringify(obj));
}

export function readObject<T>(key: string): T {
    const value = localStorage.getItem(key);
    console.log(value);
    return value ? JSON.parse(value) : null;
}
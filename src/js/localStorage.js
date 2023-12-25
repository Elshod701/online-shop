export function saveData(key, value) {
    if (key) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
export function getData(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return data;
    } catch (error) {
        return undefined;
    }
}
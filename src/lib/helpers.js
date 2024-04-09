export function generateID() {
    return Math.random().toString(36).substr(2, 9);
}

export function insertWithoutMutation(arr, element, index) {
    return arr.slice(0, index).concat(element).concat(arr.slice(index));
}

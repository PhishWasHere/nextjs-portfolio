export function nameVali(name: string) {
    if (name.length >= 2) {
        return true;
    } 
    return false;
}

export function emailVali(email: string) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

export function msgVali(message: string) {
    if (message.length >= 5) {
        return true;
    } 
    return false;
}

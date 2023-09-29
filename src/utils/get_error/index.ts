
const getError = (err: unknown): string => { // func to return err as string
    let msg;

    if (err instanceof Error) {
        msg = err.message;
    } else if (err && typeof err === 'object' && 'message' in err) {
        msg = String(err.message);
    } else if (typeof err === 'string') {
        msg = err;
    } msg = 'Unknown error';

    return msg;
};

export default getError;
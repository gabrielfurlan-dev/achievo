/**
 * Generate a negative(**non registered**) unique ID
 * @returns
 * Invalid UID: `-16920674732908692`
 */

export function generateInvalidUniqueID() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return parseInt(`${timestamp}${random}`) * -1;
}

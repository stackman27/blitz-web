// gets the current logged in user
const getUser = JSON.parse(localStorage.getItem('user'));
export const vendorUid = getUser?.uid;

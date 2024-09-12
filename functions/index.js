const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.grantAdminRole = functions.https.onCall(async (data, context) => {
    const uid = data.uid;
    try {
        await admin.auth().setCustomUserClaims(uid, { admin: true });
        return { message: `Admin role granted to user with UID: ${uid}` };
    } catch (error) {
        throw new functions.https.HttpsError('failed-precondition', 'Error granting admin role', error.message);
    }
});

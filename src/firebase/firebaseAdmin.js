const admin = require("firebase-admin");

// Replace with the path to your downloaded service account key
const serviceAccount = require("./medical-mind-9b44a-firebase-adminsdk-558se-e96918e280.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://medical-mind-9b44a.firebaseio.com",
});

async function grantAdminRole(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Admin role granted to user with UID: ${uid}`);
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
}

grantAdminRole('sjL27NnGocccq7vfjBCehiJLSa73');
 
//amirahmadi011
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseServiceAccount from '../credentials/firebase-service-account.json' with { type: 'json' };


initializeApp({
    credential: cert(firebaseServiceAccount)
});

const db = getFirestore();

export default db;
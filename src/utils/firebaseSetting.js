import { initializeApp, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { collection } from 'firebase/firestore';

const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com"
};

try {
    getApp();
} catch (error) {
    initializeApp({
        credential: cert(serviceAccount)
    });
}

const db = getFirestore();

export const save = async (collection, id, data) => {
    const docRef = await db.collection(collection).doc(id.toString()).set(data);
    return docRef;
}

export const update = async (collection, id, data) => {
    const docRef = db.collection(collection).doc(id);
    if ((await docRef.get()).exists) {
        await docRef.update(data);
        return docRef;
    }
    return null;
}

export const read = async (collection, id) => {
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();
    if (doc.exists) {
        const data = doc.data();
        return data;
    } else {
        return null;
    }
}
export const readAll = async (collection) => {
    const querySnapshot = await db.collection(collection).get();
    const docs = [];
    querySnapshot.forEach((doc) => {
        docs.push(doc.data());
    });
    return docs;
}

export const getRef = async (collection) => {
    return db.collection(collection);
}

export const filter = async (collection, position, pubDate, location, company, page, size) => {
    let query = db.collection(collection);
    const conditions = [
        position ? ["position", "==", (position).toLowerCase()] : null,
        pubDate ? ["publicationDate", ">=", new Date(pubDate)] : null,
        location ? ["locationIdx", "array-contains", (location).toLowerCase()] : null,
        company ? ["companyIdx", "array-contains", (company).toLowerCase()] : null,
    ].filter(Boolean);

    if (conditions.length > 0) {
        query = query.where(...conditions);
    }
    const totalData = (await query.count().get()).data().count;
    const totalPage = Math.floor(totalData / size);
    const cursor = (page-1) * size + 1;
    console.log(cursor);
    query = query
        .orderBy(
            "publicationDate"
        ).limit(
            parseInt(size)
        ).startAfter(cursor);
    const snapshot = await query.get();
    const docs = snapshot.docs.map(doc => doc.data());
    return [docs, totalData, totalPage];
}

export const deleteData = async (collection, id) => {
    const docRef = db.collection(collection).doc(id);
    if ((await docRef.get()).exists) {
        await docRef.delete();
        return
    }
    return null;
}
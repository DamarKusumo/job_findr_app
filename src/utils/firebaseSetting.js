import { initializeApp, cert, getApp } from 'firebase-admin/app';
import { getFirestore, Filter } from 'firebase-admin/firestore';

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

export const filterData = async (collection, position, pubDate, location, company, page, size) => {
    let query = db.collection(collection);

    let conditions = [
        pubDate ? ["publicationDate", ">", new Date(pubDate)] : null,
        location ? ["location", "==", location] : null,
        company ? ["companyIdx", "array-contains", (company).toLowerCase()] : null,
    ].filter(Boolean);

    if (conditions.length > 0) {
        for (let i = 0; i < conditions.length; i++) {
            query = query.where(conditions[i][0], conditions[i][1], conditions[i][2]);
        }
    }
    if (position) {
        let conditions = [];

        for (let i = 0; i < position.length; i++) {
            conditions.push(Filter.where("position", "==", position[i]));
        }

        query = query.where(
            Filter.or(...conditions)
        );
    }

    const totalData = (await query.count().get()).data().count;
    const totalPage = totalData < size ? 1 : Math.floor(totalData / size);
    const currentPage = totalData < size ? 1 : page;

    query = query
        .orderBy(
            "publicationDate",
        )
        .limit(
            parseInt(page * size) + 1
        )
    const snapshot = await query.get();
    const lastData = snapshot.docs.slice(size * -1).map(doc => doc.data());
    return [lastData, totalData, totalPage, currentPage];
}

export const deleteData = async (collection, id) => {
    const docRef = db.collection(collection).doc(id);
    if ((await docRef.get()).exists) {
        await docRef.delete();
        return
    }
    return null;
}
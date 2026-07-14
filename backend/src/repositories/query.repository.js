import dataHelper from "../helpers/data.helper.js";
import responseHelper from "../helpers/response.helper.js";

const queryRepository = {
    getAll: async (collection, page, limit, search = {}, sortBy = 'asc') => {
        let query = collection.where('deleted_at', '==', null);

        Object.entries(search).forEach(([field, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                value !== '' &&
                value !== 'null' &&
                value !== 'undefined'
            ) {
                query = query.where(field, '==', value);
            }
        });

        const snap = await query.get();
        let data = dataHelper.convertFirestoreSnapshot(snap);

        // Sort in JavaScript memory to avoid composite index requirement in Firestore
        data.sort((a, b) => {
            const getMs = (date) => {
                if (!date) return 0;
                if (typeof date.toDate === 'function') {
                    return date.toDate().getTime();
                }
                if (date._seconds !== undefined) {
                    return date._seconds * 1000 + Math.floor((date._nanoseconds || 0) / 1000000);
                }
                if (date.seconds !== undefined) {
                    return date.seconds * 1000 + Math.floor((date.nanoseconds || 0) / 1000000);
                }
                return new Date(date).getTime();
            };
            const timeA = getMs(a.created_at);
            const timeB = getMs(b.created_at);
            return sortBy === 'asc' ? timeA - timeB : timeB - timeA;
        });

        const totalItems = data.length;

        if (page && limit) {
            const startIndex = (parseInt(page) - 1) * parseInt(limit);
            const endIndex = startIndex + parseInt(limit);
            data = data.slice(startIndex, endIndex);
        }

        return {
            meta: responseHelper.setMeta(totalItems, Number(page), Number(limit)),
            data: data
        }
    },
    getById: async (collection, id) => {
        const doc = await collection.doc(id).get();

        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...doc.data()
        };
    },
    getByField: async (collection, field, value, sortBy = 'asc') => {
        const snap = await collection.where(field, '==', value).where('deleted_at', '==', null).get()
        if (snap.empty) {
            return null
        }
        const data = dataHelper.convertFirestoreSnapshot(snap);
        
        // Sort in memory to avoid composite index requirement
        data.sort((a, b) => {
            const getMs = (date) => {
                if (!date) return 0;
                if (typeof date.toDate === 'function') {
                    return date.toDate().getTime();
                }
                if (date._seconds !== undefined) {
                    return date._seconds * 1000 + Math.floor((date._nanoseconds || 0) / 1000000);
                }
                if (date.seconds !== undefined) {
                    return date.seconds * 1000 + Math.floor((date.nanoseconds || 0) / 1000000);
                }
                return new Date(date).getTime();
            };
            const timeA = getMs(a.created_at);
            const timeB = getMs(b.created_at);
            return sortBy === 'asc' ? timeA - timeB : timeB - timeA;
        });
        
        return data;
    },
    getByFieldFirst: async (collection, field, value) => {
        const snap = await collection.where(field, '==', value).where('deleted_at', '==', null).get()
        if (snap.empty) {
            return null
        }
        return dataHelper.convertFirestoreSnapshot(snap)[0]
    },

    store: async (collection, data) => {
        const payload = {
            ...data,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }
        const result = await collection.add(payload)
        return { id: result.id, ...payload }
    },
    update: async (collection, data, id) => {
        const payload = {
            ...data,
            updated_at: new Date(),
            deleted_at: null,
        }
        await collection.doc(id).update(payload)
        return { id, ...payload }
    },
    destroy: async (collection, id) => {
        await collection.doc(id).delete()
        return { id }
    },
    softDeletes: async (collection, id) => {
        await collection.doc(id).update({
            deleted_at: new Date(),
        })

        return { id }
    },
}


export default queryRepository; 
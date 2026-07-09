import dataHelper from "../helpers/data.helper.js";
import responseHelper from "../helpers/response.helper.js";

const queryRepository = {
    getAll: async (collection, page, limit, search = {}, sortBy = 'asc') => {
        let query = collection.where('deleted_at', '==', null).orderBy('created_at', sortBy);

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

        let countQuery = collection.where('deleted_at', '==', null);
        Object.entries(search).forEach(([field, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                value !== '' &&
                value !== 'null' &&
                value !== 'undefined'
            ) {
                countQuery = countQuery.where(field, '==', value);
            }
        });
        const countSnap = await countQuery.count().get();
        const totalItems = countSnap.data().count;

        if (page && limit) {
            query = dataHelper.setPaginateData(query, parseInt(page), parseInt(limit));
        }

        const snap = await query.get()
        return {
            meta: responseHelper.setMeta(totalItems, Number(page), Number(limit)),
            data: dataHelper.convertFirestoreSnapshot(snap)
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
        const snap = await collection.where(field, '==', value).where('deleted_at', '==', null).orderBy('created_at', sortBy).get()
        if (snap.empty) {
            return null
        }
        return dataHelper.convertFirestoreSnapshot(snap)
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
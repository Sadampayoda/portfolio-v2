import dataHelper from "../helpers/data.helper.js";

const queryRepository = {
    getAll: async (collection, page, limit) => {
        let query = collection.where('deleted_at', '==', null);

        if (page && limit) {
            query = dataHelper.setPaginateData(query, parseInt(page), parseInt(limit));
        }

        const snap = await query.get()
        return dataHelper.convertFirestoreSnapshot(snap)
    },
    getById: async (collection, id) => {
        const snap = await collection.doc(id).where('deleted_at', '==', null).get()
        return { id: snap.id, ...snap.data() }
    },
    getByField: async (collection, field, value) => {
        const snap = await collection.where(field, '==', value).where('deleted_at', '==', null).get()
        if (snap.empty) {
            return null
        }
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        return data[0]
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
    }
}


export default queryRepository; 
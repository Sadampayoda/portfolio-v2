import dataHelper from "../helpers/data.helper.js";

const queryRepository = {
    getAll: async (collection) => {
        const snap = await collection.where('deleted_at', '==', null).get()
        return dataHelper.convertFirestoreSnapshot(snap)
    },
    getById: async (collection, id) => {
        const snap = await collection.doc(id).where('deleted_at', '==', null).get()
        return { id: snap.id, ...snap.data() }
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
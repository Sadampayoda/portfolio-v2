import response from "../utils/response.js";

const dataHelper = {
    convertFirestoreSnapshot: (snapshot) => {
        if (snapshot.empty) {
            return [];
        }
        const data = []
        snapshot.forEach(doc => {
            data.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return data
    },
    validateFindData: async (collection, res, id) => {
        if (!id) {
            return response.badRequest(res, 'Failed to find data', 'Id is required')
        }

        const docRef = collection.doc(id);
        const snap = await docRef.get();
        if (!snap.exists) {
            return response.notFound(res, 'Data not found')
        }

        return { error: null, snap }
    }

}


export default dataHelper;

const responseHelper = {
    setMeta: (totalCount, page, limit) => {
        const totalItems = totalCount;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            page: Number(page),
            limit: Number(limit),
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    }
}



export default responseHelper

const segregateQueryParams = (query) => {
    const filters = {...query};
    const pagination = {};

    // Remove pagination parameters from filters
    if ('orderBy' in filters) {
        pagination.orderBy = String(filters.orderBy);
        delete filters.orderBy;
    }

    if ('asc' in filters) {
        pagination.asc = Boolean(filters.asc);
        delete filters.asc;
    }

    if ('cursor' in filters) {
        pagination.cursor = Number(filters.cursor);
        delete filters.cursor;
    }

    if ('limit' in filters) {
        pagination.limit = Number(filters.limit);
        delete filters.limit;
    }
    return { filters, pagination };
}

module.exports = segregateQueryParams;
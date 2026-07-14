export async function get(endpoint, baseURL = null, page = 1, limit = 10, search = {}) {
    const apiUrl = import.meta.env.VITE_URL_API;
    const prefixApi = import.meta.env.VITE_URL_API_PREFIX
    const baseUrl = baseURL ? `${baseURL}${endpoint}` : `${apiUrl}${prefixApi}${endpoint}`

    const user = await create(
        "/auth/login",
        {
            name: import.meta.env.VITE_ADMIN_NAME,
            email: import.meta.env.VITE_ADMIN_EMAIL,
            password: import.meta.env.VITE_ADMIN_PASS,
        },
        null,
    )

    const params = new URLSearchParams({
        page,
        limit,
        ...search
    });

    const url = `${baseUrl}?${params.toString()}`

    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.token}`,
            'x-api-key': user.user.api_key
        },
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const response = await res.json()
    console.log(response)
    return {
        data: response.data,
        meta: response.meta
    }
}


export async function create(endpoint, data, baseURL = null, headers = {}) {
    const apiUrl = import.meta.env.VITE_URL_API;
    const prefixApi = import.meta.env.VITE_URL_API_PREFIX
    const baseUrl = baseURL ? `${baseURL}${endpoint}` : `${apiUrl}${prefixApi}${endpoint}`

    const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const response = await res.json()

    return response
}

export async function destroy(endpoint, baseURL = null, search = {}) {
    const apiUrl = import.meta.env.VITE_URL_API;
    const prefixApi = import.meta.env.VITE_URL_API_PREFIX
    const baseUrl = baseURL ? `${baseURL}${endpoint}` : `${apiUrl}${prefixApi}${endpoint}`

    const params = new URLSearchParams(search);
    const url = `${baseUrl}?${params.toString()}`

    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const response = await res.json()
    console.log(response)
    return response;
}



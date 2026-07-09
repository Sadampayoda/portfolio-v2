import { useState, useEffect } from "react";
import { getAll } from "@/utils/api";
import endpoint from "@/api/endpoint";

export function useProjects(
    page = 1,
    limit = 10,
    search = {},
) {

    const [projects, setProjects] = useState({ data: [], meta: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchKey = JSON.stringify(search);

    useEffect(() => {
    const fetchProjects = async () => {
            try {
                const data = await getAll(endpoint.projects, null, page, limit, search);
                setProjects(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [page, limit, searchKey]);

    return { projects, loading, error };
}
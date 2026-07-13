import { useState, useEffect } from "react";
import { get } from "@/utils/api";
import endpoint from "@/api/endpoint";

export function useMoments() {
    const [moments, setMoments] = useState({ data: [], meta: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMoments = async () => {
            try {
                setLoading(true);
                const data = await get(endpoint.moments);
                setMoments(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMoments();
    }, []);

    return { moments, loading, error };
}

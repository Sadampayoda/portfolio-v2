import { useState, useEffect } from "react";
import { create } from "@/utils/api";
import endpoint from "@/api/endpoint";

export function useMessage() {

    const [message, setMessage] = useState({ data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const data = await create(endpoint.geminiAi, {
                    name: name,
                    content: content
                });
                setMessage(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessage();
    }, [name, content]);

    return { message, loading, error };
}
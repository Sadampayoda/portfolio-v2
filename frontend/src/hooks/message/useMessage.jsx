import { useState, useEffect } from "react";
import { create, get, destroy } from "@/utils/api";
import endpoint from "@/api/endpoint";

export function useMessage(name) {

    const [data, setData] = useState({ data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const sendMessage = async (name, content) => {
        try {
            setLoading(true);
            setError(null);
            await create(endpoint.geminiAi.post , {
                name: name,
                content: content
            });

            await fetchMessage();
            return true;
        } catch (error) {
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    const fetchMessage = async () => {
        try {
            const data = await get(endpoint.geminiAi.get, null, null, null, {
                name: name
            });
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    
    const clearConversation = async () => {
        try {
            setLoading(true);
            await destroy(endpoint.geminiAi.get, null, {
                name: name
            });
            setData({ data: { message: [] } });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessage();
    }, [name]);


    return { sendMessage, data, clearConversation, loading, error };
}
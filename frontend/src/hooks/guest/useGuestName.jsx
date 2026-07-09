import { useState, useEffect } from "react";
import { generateGuestName } from "../../utils/guestName";

const STORAGE_KEY = "guest_chat_name";

export function useGuestName() {
    const [guestName, setGuestName] = useState("");

    useEffect(() => {
        let name = localStorage.getItem(STORAGE_KEY);

        if (!name) {
            name = generateGuestName();
            localStorage.setItem(STORAGE_KEY, name);
        }

        setGuestName(name);
    }, []);

    return { guestName };
}
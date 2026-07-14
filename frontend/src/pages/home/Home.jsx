import { use, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import background from "@/assets/images/background.png"
import backgroundDark from "@/assets/images/background-dark.png"
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { SendHorizontal, Trash2 } from "lucide-react";
import Message from "@/components/message/Message";
import RoleType from "@/constants/roleEnum";
import { useMessage } from "../../hooks/message/useMessage";
import { useGuestName } from "../../hooks/guest/useGuestName";


export default function Home(
    {
        isDarkMode,
        setIsDarkMode
    }) {

    const [content, setContent] = useState("");
    const [chats, setChats] = useState([
        {
            content: "",
            role: ""
        }
    ]);
    const { guestName } = useGuestName()
    const { sendMessage, data, clearConversation, loading, isSending } = useMessage(guestName)
    const [isError, setIsError] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const shouldAnimateRef = useRef(false);

    const isInteractionDisabled = loading || isSending || isTyping;

    const handleClearConversation = (e) => {
        e.preventDefault();
        if (isInteractionDisabled) return;
        if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat percakapan?")) {
            clearConversation();
        }
    }

    const chatContainerRef = useRef(null);

    // Scroll to bottom of chat when chats change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [chats]);

    useEffect(() => {
        const messagesHistory = data?.data?.message || [];
        const payload = messagesHistory.map((item) => ({
            content: item.content,
            role: item.role
        }));

        if (shouldAnimateRef.current && payload.length > 0) {
            shouldAnimateRef.current = false;
            const lastMessage = payload[payload.length - 1];

            if (lastMessage.role !== RoleType.USER) {
                const targetText = lastMessage.content;
                setIsTyping(true);

                // Set chats with the last message content as empty to start typing animation
                setChats((prev) => {
                    const nextChats = [...payload];
                    nextChats[nextChats.length - 1] = {
                        ...lastMessage,
                        content: ""
                    };
                    return nextChats;
                });

                let currentText = "";
                let index = 0;
                const speed = 15; // ms per character

                const interval = setInterval(() => {
                    if (index < targetText.length) {
                        currentText += targetText.charAt(index);
                        index++;
                        setChats((prev) => {
                            const nextChats = [...prev];
                            if (nextChats.length > 0) {
                                nextChats[nextChats.length - 1] = {
                                    ...nextChats[nextChats.length - 1],
                                    content: currentText
                                };
                            }
                            return nextChats;
                        });
                    } else {
                        clearInterval(interval);
                        setIsTyping(false);
                    }
                }, speed);

                return () => {
                    clearInterval(interval);
                    setIsTyping(false);
                };
            } else {
                setChats(payload);
            }
        } else {
            setChats(payload);
        }
    }, [data]);

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!content.trim() || isInteractionDisabled) return;

        const originalContent = content;
        setIsError(false);
        setContent("");
        shouldAnimateRef.current = true;

        // Optimistically add user chat bubble
        setChats((chat) => [...chat, {
            role: RoleType.USER,
            content: originalContent
        }]);

        const success = await sendMessage(guestName, originalContent);
        if (!success) {
            setIsError(true);
            setContent(originalContent);
            shouldAnimateRef.current = false;
            // Remove the optimistic user chat bubble that failed
            setChats((chat) => chat.filter((c, idx) => !(idx === chat.length - 1 && c.content === originalContent)));
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage(e);
        }
    }


    return (
        <>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            {/* Container Welcome */}
            <div className="flex flex-col mt-20">
                <div className="relative min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-0 overflow-hidden">
                    {/* Light Background Layer */}
                    <div
                        className="absolute inset-0 bg-cover bg-[position:75%_center] transition-opacity duration-700 ease-in-out"
                        style={{
                            backgroundImage: `url(${background})`,
                            opacity: isDarkMode ? 0 : 1,
                            zIndex: 1
                        }}
                    />
                    {/* Dark Background Layer */}
                    <div
                        className="absolute inset-0 bg-cover bg-[position:75%_center] transition-opacity duration-700 ease-in-out"
                        style={{
                            backgroundImage: `url(${backgroundDark})`,
                            opacity: isDarkMode ? 1 : 0,
                            zIndex: 2
                        }}
                    />

                    {/* Gradient Overlay to blend bottom edge into page background */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none z-10 transition-colors duration-700" />

                    {/* Content Container */}
                    <div className="relative max-w-2xl px-6 sm:px-12 md:ml-12 lg:ml-20 w-full z-20">

                        {/* Label */}
                        <div className="text-xs sm:text-sm tracking-widest text-[var(--color-text-muted)] mb-4 border px-3 py-1 inline-block rounded-full">
                            PENGEMBANG WEB
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[var(--color-text-active)]">
                            Membangun Sistem <br className="hidden sm:inline" />
                            <span className="text-gray-400">
                                Web Skalabel &
                            </span><br className="hidden sm:inline" />
                            Pengalaman Digital.
                        </h1>

                        {/* Description */}
                        <p className="mt-6 text-[var(--color-text)] max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base leading-relaxed">
                            Fokus pada arsitektur bersih, performa, dan kode yang mudah dipelihara.
                            Mengubah ide-ide kompleks menjadi aplikasi web yang cepat, andal, dan ramah pengguna.
                        </p>

                        {/* Scroll */}
                        <div className="mt-8 sm:mt-10 flex items-center gap-4 text-xs tracking-widest text-[var(--color-text-muted)]">
                            <div className="w-10 h-[1px] bg-[var(--color-text-muted)]"></div>
                            GULIR UNTUK MENJELAJAHI
                        </div>

                    </div>
                </div>

                {/* Container AI */}
                <div id="ai-chat" className="min-h-screen md:h-screen bg-[var(--color-bg)] p-4 sm:p-6 md:p-10 flex flex-col transition-colors duration-700">

                    {/* Title */}
                    <div className="flex justify-center py-6 md:py-10">
                        <p className="text-[var(--color-text-active)] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center px-4">
                            Tanya Apa Saja <span className="text-gray-400">Tentang Sadam.</span>
                        </p>
                    </div>

                    {/* Input */}
                    <div className="flex justify-center px-4 w-full">

                        <div className={`
                            flex items-center
                            rounded-2xl
                            px-3
                            shadow-lg
                            border
                            ${isError 
                                ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500' 
                                : 'border-[var(--color-border)] focus-within:border-[var(--color-text-active)]'}
                            bg-[var(--color-card)]
                            focus-within:shadow-xl
                            transition-all
                            duration-700
                            w-full
                            max-w-[700px]
                        `}>

                            <input
                                type="text"
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                    if (isError) setIsError(false);
                                }}
                                onKeyDown={handleKeyDown}
                                disabled={isInteractionDisabled}
                                placeholder={
                                    isSending 
                                        ? "AI sedang mencari jawaban..." 
                                        : isTyping 
                                            ? "AI sedang mengetik..." 
                                            : "Penasaran tentang Sadam? Yuk ngobrol 👋"
                                }
                                className="
                                    h-14
                                    flex-1
                                    p-2
                                    bg-transparent
                                    outline-none
                                    text-[var(--color-text)]
                                    placeholder:text-[var(--color-text-muted)]
                                    text-sm sm:text-base
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            />


                            <button
                                onClick={handleSendMessage}
                                disabled={isInteractionDisabled || !content.trim()}
                                className="
                                    flex items-center justify-center
                                    bg-[var(--color-button)]
                                    text-[var(--color-text-button)]
                                    cursor-pointer
                                    rounded-xl
                                    w-11 h-11
                                    hover:bg-[var(--color-button-hover)]
                                    hover:scale-105
                                    transition-all
                                    duration-700
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:hover:scale-100
                                "
                            >
                                <SendHorizontal size={18} />
                            </button>

                            <button
                                onClick={handleClearConversation}
                                disabled={isInteractionDisabled}
                                className="
                                    flex items-center justify-center
                                    bg-red-50 hover:bg-red-100 text-red-500
                                    dark:bg-red-950/30 dark:hover:bg-red-950/50 dark:text-red-400
                                    cursor-pointer
                                    rounded-xl
                                    w-11 h-11
                                    ml-2
                                    hover:scale-105
                                    transition-all
                                    duration-700
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:hover:scale-100
                                "
                                title="Hapus Percakapan"
                            >
                                <Trash2 size={18} />
                            </button>

                        </div>

                    </div>

                    {/* Chat Box History */}
                    <div className="flex justify-center mt-6 md:mt-8 flex-1 overflow-hidden px-4">

                        <div
                            ref={chatContainerRef}
                            className="
                                w-full
                                max-w-[750px]
                                rounded-3xl
                                bg-[var(--color-card)]
                                p-4 sm:p-6
                                overflow-y-auto
                                custom-scrollbar
                                shadow-sm
                                border border-[var(--color-border)]
                                min-h-[700px]
                                md:h-0
                                transition-all
                                duration-700
                            "
                        >
                            <Message
                                content="Halo 👋 Saya AI yang siap membantu menjelaskan tentang Sadam, pengalaman, project, dan teknologi yang digunakan."
                                role="start"
                            />
                            {chats.map((chat, index) => {
                                if (!chat.content) return null;
                                return (
                                    <Message
                                        key={index}
                                        content={chat.content}
                                        role={chat.role == RoleType.USER ? 'end' : 'start'}
                                    />
                                )
                            })}
                            {isSending && (
                                <Message
                                    content=""
                                    role="start"
                                    isLoading={true}
                                />
                            )}
                            {/* Spacer to give breathing room at the bottom of the chat list */}
                            <div className="h-40 w-full" />
                        </div>

                    </div>

                </div>

                <Footer />

            </div>
        </>
    );
}
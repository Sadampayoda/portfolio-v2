
function parseInlineMarkdown(text) {
    if (!text) return "";
    
    // Split by bold (**text**) and italic (*text*) markers
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="font-bold text-[var(--color-text-active)]">
                    {part.slice(2, -2)}
                </strong>
            );
        } else if (part.startsWith('*') && part.endsWith('*')) {
            return (
                <em key={index} className="italic text-[var(--color-text-active)]">
                    {part.slice(1, -1)}
                </em>
            );
        }
        return part;
    });
}

function renderFormattedContent(text) {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let listType = null; // 'ul' or 'ol'
    
    const flushList = (key) => {
        if (currentList.length > 0) {
            if (listType === 'ul') {
                elements.push(
                    <ul key={`ul-${key}`} className="list-disc pl-5 mb-3 space-y-1">
                        {currentList}
                    </ul>
                );
            } else if (listType === 'ol') {
                elements.push(
                    <ol key={`ol-${key}`} className="list-decimal pl-5 mb-3 space-y-1">
                        {currentList}
                    </ol>
                );
            }
            currentList = [];
            listType = null;
        }
    };
    
    lines.forEach((line, index) => {
        const trimmed = line.trim();
        
        // Match bullet list (* or -)
        const bulletMatch = trimmed.match(/^[\*\-]\s+(.*)/);
        // Match ordered list (1. or 2. etc)
        const orderMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        
        if (bulletMatch) {
            if (listType !== 'ul') {
                flushList(index);
                listType = 'ul';
            }
            currentList.push(
                <li key={`li-${index}`} className="leading-relaxed">
                    {parseInlineMarkdown(bulletMatch[1])}
                </li>
            );
        } else if (orderMatch) {
            if (listType !== 'ol') {
                flushList(index);
                listType = 'ol';
            }
            currentList.push(
                <li key={`li-${index}`} className="leading-relaxed">
                    {parseInlineMarkdown(orderMatch[2])}
                </li>
            );
        } else {
            flushList(index);
            if (trimmed === '') {
                elements.push(<div key={`spacer-${index}`} className="h-2" />);
            } else {
                elements.push(
                    <p key={`p-${index}`} className="mb-2 last:mb-0 leading-relaxed">
                        {parseInlineMarkdown(line)}
                    </p>
                );
            }
        }
    });
    
    flushList(lines.length);
    return elements;
}

export default function Message({
    content,
    role = 'end',
    isLoading = false
}) {
    return (
        <div className={`flex mb-4 ${role === 'start' ? 'justify-start' : 'justify-end'}`}>
            <div className="
                bg-[var(--color-bg-secondary)]
                text-[var(--color-text)]
                px-4 py-3
                shadow-sm
                rounded-2xl
                max-w-[85%]
                text-sm sm:text-base
                transition-all
                duration-700
            ">
                {isLoading ? (
                    <div className="flex items-center gap-1 py-1 px-1.5">
                        <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-chat-bounce [animation-delay:-0.32s]"></span>
                        <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-chat-bounce [animation-delay:-0.16s]"></span>
                        <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-chat-bounce"></span>
                    </div>
                ) : (
                    renderFormattedContent(content)
                )}
            </div>
        </div>
    );
}
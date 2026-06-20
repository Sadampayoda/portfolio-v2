

export default function Button({
    link = null,
    children
}) {
    const onClickRedirect = () => {
        if (link) {
            window.location.href = link;
        }
    }; 

    return (
        <>
            <button onClick={onClickRedirect}  className="
                bg-[var(--color-button)]
                text-[var(--color-text-button)]
                uppercase 
                text-sm
                tracking-widest 
                px-7 py-2 
                cursor-pointer
                hover:bg-[var(--color-button-hover)] 
                transition
                ">
                {children}
            </button>
        </>
    )
}



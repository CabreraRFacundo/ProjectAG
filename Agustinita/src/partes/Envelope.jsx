import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Notes from "./Notes";

export default function Envelope() {
    const upPaperRef = useRef(null);
    const stickerRef = useRef(null);

    const [stickerClicked, setStickerClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Animación del sticker
    useEffect(() => {
        if (!stickerClicked) return;
        const stickerEl = stickerRef.current;
        if (!stickerEl) return;

        gsap.to(stickerEl, { x: "-350%", duration: 0.5 });

        const upPaper = upPaperRef.current;
        if (upPaper) upPaper.classList.add("cursor");
    }, [stickerClicked]);

    // Abrir el sobre (solo abrir, sin cerrar)
    useEffect(() => {
        if (!isOpen) return;
        const upPaper = upPaperRef.current;
        if (!upPaper) return;

        gsap.to(upPaper, {
            bottom: "1%",
            duration: 0.25,
            onComplete: () => {
                gsap.set(upPaper, {
                    bottom: "97%",
                    rotation: 180,
                    zIndex: 200,
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 61%)",
                });
            },
        });
    }, [isOpen]);

    return (
        <div className={`envelop ${isOpen ? "open" : ""}`}>
            <div className="envelop__front-paper"></div>
            <div className="envelop__back-paper"></div>

            <div
                className="envelop__sticker"
                ref={stickerRef}
                onClick={() => setStickerClicked(true)}
            ></div>

            <div
                className="envelop__up-paper"
                ref={upPaperRef}
                onClick={() => stickerClicked && !isOpen && setIsOpen(true)}
            ></div>
            
            <Notes isOpen={isOpen} />

        </div>
    );
}
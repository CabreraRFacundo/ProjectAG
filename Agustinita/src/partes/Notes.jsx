import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMediaQuery } from "./useMediaQuery";

const notesData = [
    {
        letter: "Te",
        text: "Me cuesta mucho decirte las cosas que siento sin que se me haga un nudo en la garganta por la emoción. Sigo sin saber bien cómo hacer una carta, y también siento que no sé expresar mis sentimientos muy bien, así que voy a escribir lo que me salga: 'Sos hermosa y te amo mucho'. Podría repetir eso por mil páginas y seguro me quedo corto."
    },
    {
        letter: "Amo",
        text: "Odio la distancia, pero saber que me esperas lo hace más llevadero. Haces que los días no sean tan malos, pensar en vos siempre me alegra, y hablar con vos todavía más; muchos días no tengo energía para hablar, y aun así me sacás charla hasta que me cargas la pila con tu voz."
    },
    {
        letter: "Mucho",
        text: "Siempre tuve una vida muy monótona y tranquila, solo pensaba en lo mío y los pequeños logros no significaban tanto para mí. Ahora me emociona cualquier cosa porque sé que te lo puedo contar y sé que me vas a escuchar con atención. Capaz que en cierto sentido me devolviste la vida, así que gracias por interesarte, por quererme, por escucharme."
    },
    {
        letter: "Mi Agu",
        text: "La primera semana te extranie bastante y se me hizo complicado pensar que no iba a poder abrazarte, pero también confío en que esto nos va a hacer querernos más y valorar el tiempo que pasemos juntos. Escribir esto me dio varios nudos en la garganta, pero no lloré, supongo que vuelvo a ser un insensible o capaz me estoy acostumbrando para no hacerte preocupar. Obviamente te extraño mucho y obvio que te amo muchísimo más (y más que vos)."
    },

];

export default function Notes({ isOpen }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const notesRef = useRef([]);

    const isMobile = useMediaQuery("(max-width: 400px)");
    const isTablet = useMediaQuery("(min-width: 400px) and (max-width: 600px)");


    const getHeight = (i) => {
        if (activeIndex === i) {
            return isMobile ? "95%" : isTablet ? "90%" : "85%";
        }
        return "55%";
    };

    const getY = (i) => {
        if (activeIndex === i) {
            return -120 - (i * 10);
        }
        return -20 * i;
    };

    
    useEffect(() => {
        notesRef.current.forEach((noteEl, i) => {
            if (!noteEl) return;

            const isActive = activeIndex === i;

            gsap.to(noteEl, {
                y: getY(i),
                duration: 0.4,
                ease: "power2.out"
            });

            if (isActive) {
                gsap.fromTo(
                    noteEl,
                    { height: noteEl.offsetHeight },
                    {
                        height: noteEl.scrollHeight,
                        duration: 0.4,
                        ease: "power2.out"
                    }
                );
            } else {
                gsap.to(noteEl, {
                    height: "60%",
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
    }, [activeIndex, isMobile, isTablet]);


    useEffect(() => {
        if (!isOpen) return;

        notesRef.current.forEach((noteEl, i) => {
            if (!noteEl) return;

            gsap.fromTo(
                noteEl,
                { y: 0, height: "55%" },
                {
                    y: -20 - (i * 35),
                    height: "55%",
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: "power2.out"
                }
            );
        });
    }, [isOpen]);

    return (
        <div className="love-notes">
            {notesData.map((note, i) => (
                <div
                    key={i}
                    ref={(el) => (notesRef.current[i] = el)}
                    className={`note ${activeIndex === i ? "active" : ""}`}
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                >
                    <div className="note__text">
                        <p>{note.letter}</p>
                        <p>{note.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
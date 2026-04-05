import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMediaQuery } from "./useMediaQuery";

const notesData = [
    {
        letter: "Carta 1",
        text: "me cuesta mucho decirte las cosas que siento sin que se me haga un nudo en la garganta por la emocion. sigo sin saber bien como hacer una carta, y tambien siento que no se expresar mis sentimientos muy bien, asi que voy a escribir lo que me salga: 'sos hermosa y te amo mucho' podria repetir eso por mil paginas y seguro me quedo corto."
    },
    {
        letter: "Carta 2",
        text: "odio la distancia, pero saber que me esperas, lo hace mas llevadero. haces que los dias no sean tan malos, pensar en vos siempre me alegra, y hablar con vos todavia mas; muchos dias no tengo energia para hablar, y aun asi me sacar charla hasta que me cargas la pila con tu voz."
    },
    {
        letter: "Carta 3",
        text: "siempre tuve una vida muy monotona, y tranquila, solo pensaba en lo mio y los pequenios logros, no significaban tanto para mi, ahora me emociona cualquier cosa porque se que te lo puedo contar y se que me vas a escuchar con atencion. capaz que en cierto sentido me devolviste la vida asi que gracias por interesarte, por quererme y por escucharme."
    },
    {
        letter: "Carta 4",
        text: "la primera semana te extranie bastante y se me hizo complicado pensar que no iba a poder abrazarte pero tambien confio en que esto nos va a hacer querernos mas y valorar el tiempo que pasemos juntos. escribir esto me dio varios nudos en la garganta, pero no llore, supongo que vuelvo a ser un insensible o capaz me estoy acostumbrando para no hacerte preocupar, obviamente te extrano mucho y obvio que te amo muchisimo mas (y mas que vos)."
    }
];

export default function Notes({ isOpen }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const notesRef = useRef([]);

    const isMobile = useMediaQuery("(max-width: 400px)");
    const isTablet = useMediaQuery("(min-width: 400px) and (max-width: 600px)");

    // Función para calcular altura según tipo de dispositivo y posición
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
    // Animación al cambiar la nota activa (clic del usuario)
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

    // Animación al abrir el sobre
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
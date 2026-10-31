import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import { initEarth } from "./world.js";
import spideyall from "./assets/spideyall.jpg";
import gwen from "./assets/gwen.jpg";
import perfectspidey from './assets/perfectspidey.jpg';
import spideriron from './assets/spideriron.jpg';
import spidervideo from './assets/spidervideo.mp4';
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import WarpText from "./WarpText";
import SplashCursor from "./SplashCursor";
import spideyupside2 from './assets/spideyupside2.png'
import noir from './assets/noir.jpeg'
import spiderman from './assets/spiderman.jpeg'
import miguel from './assets/miguel.jpeg'
import miles from './assets/miles.jpeg'
import spiderpunk from './assets/spiderpunk.jpeg'
import gwenstacy from './assets/gwenstacy.jpeg'
import pavitr from './assets/pavitr.jpeg'
import peterB from './assets/peterB.jpeg'


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

const images = [spideyall, perfectspidey, spideriron, spiderpunk, gwenstacy, pavitr, peterB, noir, miles, miguel, spiderman, gwen];

function App() {
    const earthContainerRef = useRef(null);
    const dragdropContainerRef = useRef(null);
    const dragdropImagesRef = useRef([]);

    useEffect(() => {
        if (earthContainerRef.current) {
            const cleanup = initEarth(earthContainerRef.current);
            return () => cleanup();
        }
    }, []);

    // Runs once when the component mounts (on page load)
    useGSAP(() => {
        // Hide boxes initially so they only appear on button click
        gsap.set(".box", { opacity: 0 });

        const tl = gsap.timeline();

        // Target hero elements cleanly
        tl.from(".home .title", {
            y: -50,
            opacity: 0,
            duration: 0.8,
        })
            .from(".home .subtitle", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.3,
            });

        // ScrollTrigger Scale & Zoom into 'V' on Scroll
        gsap.set(".home .title", { transformOrigin: "center center" });

        const title = gsap.timeline({
            scrollTrigger: {
                trigger: ".home",
                start: "top top",
                end: "+=1200",
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // Step 1: Subtitles & button fade away at start of scroll
        title.fromTo(".home .subtitle",
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: 30,
                duration: 0.3,
                ease: "power1.out"
            },
            0
        );

        // Step 2: Title zooms smoothly into the middle letter 'V' (scale 1 -> 22)
        title.fromTo(".home .title",
            { scale: 1, opacity: 1 },
            {
                scale: 22,
                opacity: 1,
                duration: 0.8,
                ease: "power1.in"
            },
            0
        );

        // Step 3: Fade out at the very end after 'V' engulfs the viewport
        title.to(".home .title", {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out"
        }, 0.8);

        // Section 1 handled by WarpText WebGL component

        // ScrollTrigger Word-by-Word Color Reveal with PINNING & Upside-Down Spidey Drop for Section 2
        const s2Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section2",
                start: "top top",
                end: "+=2000", // Scroll 2000px distance while pinned
                pin: true,     // Locks section2 in place on screen!
                scrub: 1       // Smoothly sync animations with scroll
            }
        });

        // 1. Spidey cutout slides down in front of the text
        s2Tl.fromTo(".spidey-upside-img",
            { yPercent: -100, scale: 1.08 },
            { yPercent: -5, scale: 1, ease: "none", duration: 1 },
            0
        );

        // 2. Parallax effect: Quote text behind Spidey drifts upward
        s2Tl.fromTo(".section2 h2",
            { y: 70, scale: 0.96 },
            { y: -30, scale: 1.04, ease: "none", duration: 1 },
            0
        );

        // 3. Word-by-word text color reveal synced on scroll
        s2Tl.to(".section2 .word", {
            color: "#ffffff",
            stagger: 0.05,
            ease: "none",
            duration: 1
        }, 0);

        // ScrollTrigger Image Expand + Hold / Pause for Section 3
        const s3Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section3",
                start: "top top",
                end: "+=1500", // Total scroll distance while pinned
                pin: true,     // Hold Section 3 pinned on screen!
                scrub: 1,      // Smoothly sync with scrollbar
            }
        });

        // 1. Expand image from 40% size to 100% full screen
        s3Tl.fromTo(".section3-img",
            {
                scale: 0.4,
                borderRadius: "30px",
            },
            {
                scale: 1,
                borderRadius: "0px",
                ease: "none",
                duration: 1
            }
        );

        // 2. Animate words on top of the image as it expands
        s3Tl.fromTo(".section-3-h2",
            { opacity: 0, y: 40, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, ease: "none", duration: 0.8 },
            0.4
        );

        // Horizontal Scroll for Section 4
        const track = document.querySelector(".horizontal-track");
        if (track) {
            gsap.to(".horizontal-track", {
                x: () => -(track.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".section4",
                    start: "top top",
                    end: () => "+=" + (track.scrollWidth - window.innerWidth + 1000),
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });
        }
        const earthTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".earth-rendering",
                start: "top top",
                end: "+=1500", // Duration of the pin/scroll animation
                pin: true,
                scrub: 1
            }
        });
        earthTl.fromTo(".earth-canvas-container", {
            x: 0,
            y: 0,
            scale: 2
        }, {
            x: 350,
            y: 0,
            scale: 1,
            duration: 1
        }, 0);
        earthTl.fromTo(".earth-text",
            { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, delay: 0.5 }, 0);

        //drag drop
        const cards = gsap.utils.toArray(".dd-container");
        if (cards && cards.length > 0) {
            cards.forEach((card, index) => {
                gsap.set(card, {
                    rotation: (index - cards.length / 2) * 4,
                    zIndex: index,
                    scale: 0
                });
            });

            gsap.to(cards, {
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: {
                    each: 0.15,
                    from: "start"
                },
                scrollTrigger: {
                    trigger: ".dragdrop",
                    start: "top 75%"
                }
            });

            let zIndexCounter = cards.length;

            cards.forEach((card) => {
                Draggable.create(card, {
                    type: "x,y",
                    bounds: dragdropContainerRef.current || ".dragdrop-container",
                    inertia: true,
                    edgeResistance: 0.65,
                    onPress() {
                        zIndexCounter++;
                        gsap.to(card, { scale: 1.05, duration: 0.2 });
                        gsap.set(card, {
                            zIndex: zIndexCounter
                        });
                    },
                    onDrag() {
                        const rotation = this.x / 10;
                        gsap.to(card, { rotation: rotation, duration: 0.1, ease: "power1.out" });
                    },
                    onRelease() {
                        const velocityX = this.getVelocity("x");
                        const velocityY = this.getVelocity("y");
                        if (Math.abs(velocityX) >= 500 || Math.abs(velocityY) >= 500) {
                            const direction = this.x > 0 ? 1 : -1;
                            gsap.to(card, {
                                x: 600 * direction,
                                y: 600 * direction,
                                duration: 1,
                                ease: "power3.out",
                                zIndex: 0,
                                onComplete: () => {
                                    gsap.set(card, {
                                        x: 0, y: 0,
                                        rotation: (Math.random() - 0.5) * 10,
                                        scale: 1,
                                        zIndex: 0,
                                    });
                                }
                            });
                        } else {
                            gsap.to(card, {
                                x: 0,
                                y: 0,
                                duration: 0.5,
                                ease: "elastic.out(1,0.5)",
                                onComplete: () => {
                                    gsap.set(card, {
                                        zIndex: 0
                                    });
                                }
                            });
                        }
                    }
                });
            });
        }
    });

    const moveBox = () => {
        const boxes = gsap.utils.toArray(".box");
        const tl = gsap.timeline();

        // Box 1: Starts at Top-Left (0,0) -> Bottom-Middle (500, 400) -> Top-Right (1000, 0)
        tl.fromTo(boxes[0], { x: 0, y: 0, opacity: 0 }, { x: 500, y: 620, opacity: 1, duration: 1, ease: "power1.in" })
            .to(boxes[0], { x: 1100, y: 0, duration: 1, ease: "power1.out" })

            // Box 2: Starts 0.6s after Box 1
            .fromTo(boxes[1], { x: 0, y: 0, opacity: 0 }, { x: 500, y: 620, opacity: 1, duration: 1, ease: "power1.in" }, "-=0.6")
            .to(boxes[1], { x: 1100, y: 200, duration: 1, ease: "power1.out" })

            // Box 3: Starts 0.6s after Box 2
            .fromTo(boxes[2], { x: 0, y: 0, opacity: 0 }, { x: 500, y: 620, opacity: 1, duration: 1, ease: "power1.in" }, "-=0.6")
            .to(boxes[2], { x: 1100, y: 400, duration: 1, ease: "power1.out" });
    };

    return (
        <>
            <section className="home">
                <video src={spidervideo} autoPlay loop muted playsInline className="home-video-bg"></video>
                <video src={spidervideo} autoPlay loop muted playsInline className="home-video"></video>
                <div className="subtitle sub-top">I AM</div>
                <div className="title">VINISH</div>
                <div className="subtitle sub-bottom">FULL STACK DEVELOPER</div>
            </section>
            <section className="section1">
                <SplashCursor COLOR="#e21b24" />
                <WarpText
                    text="VINISH"
                    color="#e21b24"
                    warpStrength={0.12}
                    warpScale={1.8}
                    speed={0.6}
                    pointerInfluence={0.45}
                    pointerStrength={0.8}
                    refraction={0.02}
                    ripple={true}
                    fontSize="clamp(8rem, 25vw, 24rem)"
                    fontWeight={900}
                    fontFamily="'Bebas Neue', 'sans-serif'"
                    letterSpacing="0.05em"
                    style={{ height: '600px', width: '100%' }}
                />
            </section>
            <section className="section2">
                <img src={spideyupside2} alt="Spider-Man Upside Down" className="spidey-upside-img" />
                <h2>
                    {"I'm your friendly neighbourhood Spiderman.".split(" ").map((word, index) => (
                        <span key={`line1-${index}`} className="word">
                            {word}{" "}
                        </span>
                    ))}
                    <br />
                    {"With great power comes great responsibility".split(" ").map((word, index) => (
                        <span key={`line2-${index}`} className="word">
                            {word}{" "}
                        </span>
                    ))}
                </h2>
            </section>
            <section className="section3">
                <img
                    src={perfectspidey}
                    alt="Spider-Man"
                    className="section3-img"
                />
                <h2 className="section3-title">
                    {"Shh... VINISH and SPIDER-MAN are friends".split(" ").map((word, index) => (
                        <span key={`line1-${index}`} className="section-3-h2">
                            {word}{" "}
                        </span>
                    ))}
                </h2>
            </section>
            <section className="section4">
                <div className="horizontal-track">
                    <div className="panel panel1">
                        <img src={spiderman} alt="img2" className="panel-img" />
                    </div>
                    <div className="panel panel2">
                        <img src={gwenstacy} alt="img1" className="panel-img" />
                    </div>
                    <div className="panel panel3">
                        <img src={miles} alt="img3" className="panel-img" />
                    </div>
                    <div className="panel panel4">
                        <img src={miguel} alt="img4" className="panel-img" />
                    </div>
                    <div className="panel panel5">
                        <img src={pavitr} alt="img5" className="panel-img" />
                    </div>
                    <div className="panel panel6">
                        <img src={spiderpunk} alt="img6" className="panel-img" />
                    </div>
                    <div className="panel panel7">
                        <img src={peterB} alt="img7" className="panel-img" />
                    </div>
                    <div className="panel panel8">
                        <img src={noir} alt="img8" className="panel-img" />
                    </div>
                </div>
            </section>

            <section className="earth-rendering" >
                <div className="earth-canvas-container" ref={earthContainerRef}></div>
                <div className="earth-text">
                    <h2>EARTH</h2>
                    <p>Hola Amigos , this is the planet I live in , in this planet I was born, and I will die in this planet.</p>
                </div>
            </section>

            <section className="dragdrop" ref={dragdropContainerRef} >
                <div className="dragdrop-container">
                    <h2>Gallery</h2>
                    <p style={{ color: "white", fontSize: "24px", textAlign: "center" }}>Drag & Drop images anywhere</p>
                    {images.map((image, index) => (
                        <div key={index} ref={(el) => (dragdropImagesRef.current[index] = el)} className="dd-container">
                            <img src={image} alt={`drag-card-${index}`} className="ddImg" />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default App;
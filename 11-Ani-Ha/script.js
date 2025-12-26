const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
});

gsap.from(".nlink", {
    stagger: 0.2,
    y: 10,
    duration: 2,
    ease: "power2.out",
    opacity: 0,
});

// Shery js

Shery.textAnimate("#headings h1", {
    style: 2,
    y: 10,
    delay: 0.1,
    duration: 2,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 0.1,
});

gsap.from(".anim2", {
    y: 50,
    stagger: 0.3,
    opacity: 0,
    ease: "expo.out",
    duration: 1,
});

Shery.imageEffect(".imgfff img", {
    style: 3,
    config: {
        uFrequencyX: { value: 30.53, range: [0, 100] },
        uFrequencyY: { value: 31.3, range: [0, 100] },
        uFrequencyZ: { value: 12.21, range: [0, 100] },
        geoVertex: { range: [1, 64], value: 64 },
        zindex: { value: -9996999, range: [-9999999, 9999999] },
        aspect: { value: 0.75 },
        ignoreShapeAspect: { value: true },
        shapePosition: { value: { x: 0, y: 0 } },
        shapeScale: { value: { x: 0.5, y: 0.5 } },
        shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
        shapeRadius: { value: 0, range: [0, 2] },
        currentScroll: { value: 0 },
        scrollLerp: { value: 0.07 },
        gooey: { value: false },
        infiniteGooey: { value: false },
        growSize: { value: 4, range: [1, 15] },
        durationOut: { value: 1, range: [0.1, 5] },
        durationIn: { value: 1.5, range: [0.1, 5] },
        displaceAmount: { value: 0.5 },
        masker: { value: false },
        maskVal: { value: 1, range: [1, 5] },
        scrollType: { value: 0 },
        noEffectGooey: { value: true },
        onMouse: { value: 1 },
        noise_speed: { value: 0.2, range: [0, 10] },
        metaball: { value: 0.2, range: [0, 2] },
        discard_threshold: { value: 0.5, range: [0, 1] },
        antialias_threshold: { value: 0.002, range: [0, 0.1] },
        noise_height: { value: 0.5, range: [0, 2] },
        noise_scale: { value: 10, range: [0, 100] },
    },
    preset: "./presets/wigglewobble.json",
});
Shery.imageEffect("#susimagewrapper img", {
    style: 4,

    config: {
        uColor: { value: false },
        uSpeed: { value: 1, range: [0.1, 1], rangep: [1, 10] },
        uAmplitude: { value: 0.42, range: [0, 5] },
        uFrequency: { value: 0.15, range: [0, 10] },
        geoVertex: { range: [1, 64], value: 27.93 },
        zindex: { value: -9996999, range: [-9999999, 9999999] },
        aspect: { value: 0.6666666666666666 },
        ignoreShapeAspect: { value: true },
        shapePosition: { value: { x: 0, y: 0 } },
        shapeScale: { value: { x: 0.5, y: 0.5 } },
        shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
        shapeRadius: { value: 0, range: [0, 2] },
        currentScroll: { value: 0 },
        scrollLerp: { value: 0.07 },
        gooey: { value: false },
        infiniteGooey: { value: false },
        growSize: { value: 4, range: [1, 15] },
        durationOut: { value: 1, range: [0.1, 5] },
        durationIn: { value: 1.5, range: [0.1, 5] },
        displaceAmount: { value: 0.5 },
        masker: { value: true },
        maskVal: { value: 1.24, range: [1, 5] },
        scrollType: { value: 0 },
        noEffectGooey: { value: true },
        onMouse: { value: 1 },
        noise_speed: { value: 0.2, range: [0, 10] },
        metaball: { value: 0.2, range: [0, 2] },
        discard_threshold: { value: 0.5, range: [0, 1] },
        antialias_threshold: { value: 0.002, range: [0, 0.1] },
        noise_height: { value: 0.5, range: [0, 2] },
        noise_scale: { value: 10, range: [0, 100] },
    },
});

gsap.to("#img-text img", {
    y: 70,
    opacity: 0,
    duration: 2,
    ease: "power1.inOut",
});

Shery.imageEffect("#bimg", {
    style: 6,
    gooey: true,
});

document
    .querySelector("footer #ftext button")
    .addEventListener("mouseover", () => {
        gsap.to("footer video", {
            opacity: 1,
            duration: .2,
            ease: Power2,
        });
    });
document
    .querySelector("footer #ftext button")
    .addEventListener("mouseleave", () => {
        gsap.to("footer video", {
            opacity: 0,
            duration: .2,
            ease: Power2,
        });
    });

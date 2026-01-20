const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    exposure: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%",
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg",
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px",
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    opacity: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
};

const filtersContainer = document.querySelector(".right .filters");
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const CanvasCtx = imageCanvas.getContext("2d");
const imgPlaceholder = document.querySelector('.placeholder');
let file = null;
let image = null;

const createFilterElement = (name, value, min, max, unit = "%") => {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener('input',(event)=>{
        console.log(input.value)
    })

    return div;
};

Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
        key,
        filters[key].value,
        filters[key].min,
        filters[key].max,
        filters[key].unit,
    );

    filtersContainer.appendChild(filterElement);
});

imageInput.addEventListener("change", (event) => {
     file = event.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    imageCanvas.style.display='block'

    imgPlaceholder.style.display='none'

    img.onload = () => {
        image=img;

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        CanvasCtx.drawImage(img, 0, 0);
    };
});

const applyBlur = ()=>{
    CanvasCtx.filter=`brightness(175%)`
    CanvasCtx.drawImage(image,0,0)
}

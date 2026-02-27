let filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    HueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit:"deg"
    },
    Blur: {
        value: 0,
        min: 0,
        max: 20,
        unit:"px"

    },
    GrayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const presets = {
    Normal: {
        Brightness: 100,
        Contrast: 100,
        Saturation: 100,
        HueRotation: 0,
        Blur: 0,
        GrayScale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },
    Vintage: {
        Brightness: 110,
        Contrast: 90,
        Saturation: 120,
        HueRotation: 10,
        Blur: 0,
        GrayScale: 0,
        Sepia: 40,
        Opacity: 100,
        Invert: 0
    },
    BlackWhite: {
        Brightness: 100,
        Contrast: 120,
        Saturation: 0,
        HueRotation: 0,
        Blur: 0,
        GrayScale: 100,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },
    Cool: {
        Brightness: 105,
        Contrast: 105,
        Saturation: 110,
        HueRotation: 200,
        Blur: 0,
        GrayScale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },
    Warm: {
        Brightness: 110,
        Contrast: 105,
        Saturation: 120,
        HueRotation: 30,
        Blur: 0,
        GrayScale: 0,
        Sepia: 20,
        Opacity: 100,
        Invert: 0
    }
};


const imageCanvas = document.querySelector('#image-canvas');
const imgInput = document.querySelector('#image-input');
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector('#reset-btn');
const downloadBtn = document.querySelector('#download-btn');

let file = null;
let image = null;


const filtersContainer = document.querySelector('.filters');

const presetsContainer = document.querySelector(".presets");

function createPresets() {
    Object.keys(presets).forEach(presetName => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.innerText = presetName;

        btn.addEventListener("click", () => {
            applyPreset(presetName);
        });

        presetsContainer.appendChild(btn);
    });
}

function applyPreset(name) {
    const preset = presets[name];

    Object.keys(preset).forEach(filterName => {
        filters[filterName].value = preset[filterName];

        // Update slider UI
        const slider = document.getElementById(filterName);
        if (slider) slider.value = preset[filterName];
    });

    applyFilters();
}

createPresets();



function createFilterElement(name, unit = "%", value, min, max){

    const div = document.createElement("div");
    div.classList.add("filter")

    const input = document.createElement("input");
    input.type = "range"
    input.value =  value
    input.min = min
    input.max = max
    input.id = name

    const p = document.createElement("p");
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[name].value = input.value;
        applyFilters()

    })


    return div

}

function createFilters(){ 

    Object.keys(filters).forEach(key => {
    
    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)

    filtersContainer.appendChild(filterElement)

    })
}

createFilters()

imgInput.addEventListener("change",(event) => {
    file = event.target.files[0];

    const imagePlaceHolder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    imagePlaceHolder.style.display = "none";

    const img = new Image();
    img.src = URL.createObjectURL(file)

    img.onload = () => { 

        image = img;

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        canvasCtx.drawImage(img,0,0)
    }
})

function applyFilters() {
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.Brightness.value}${filters.Brightness.unit})
        contrast(${filters.Contrast.value}${filters.Contrast.unit})
        saturate(${filters.Saturation.value}${filters.Saturation.unit})
        hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
        blur(${filters.Blur.value}${filters.Blur.unit})
        grayscale(${filters.GrayScale.value}${filters.GrayScale.unit})
        sepia(${filters.Sepia.value}${filters.Sepia.unit})
        opacity(${filters.Opacity.value}${filters.Opacity.unit})
        invert(${filters.Invert.value}${filters.Invert.unit})
    `;

    canvasCtx.drawImage(image, 0, 0);
}


resetBtn.addEventListener('click', () =>{

    filters = {
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    HueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit:"deg"
    },
    Blur: {
        value: 0,
        min: 0,
        max: 20,
        unit:"px"

    },
    GrayScale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    }
    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
})

downloadBtn.addEventListener("click", ()=>{
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
})
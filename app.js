    const colorPicker = document.getElementById('colorPicker');
    const colorBtn = document.getElementById('colorBtn');
    const rainbowBtn = document.getElementById('rainbowBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    const grid = document.getElementById('grid');

    let currentColor = 'black';
    let currentMode = 'color';
    let currentSize = 16;

    function setCurrentColor(newColor) {
    currentColor = newColor;
    }

    function setCurrentMode(newMode) {
    changeMode(newMode);
    currentMode = newMode;
    }

    function setCurrentSize(newSize) {
    currentSize = newSize;
    }

    colorPicker.oninput = (e) => setCurrentColor(e.target.value);
    colorBtn.onclick = () => setCurrentMode('color');
    rainbowBtn.onclick = () => setCurrentMode('rainbow');
    eraserBtn.onclick = () => setCurrentMode('eraser');
    clearBtn.onclick = () => reloadGrid();
    sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
    sizeSlider.onchange = (e) => changeSize(e.target.value);

    let mouseDown = false;
    document.body.onmousedown = () => (mouseDown = true);
    document.body.onmouseup = () => (mouseDown = false);

    function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
    }

    function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
    }

    function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
    }

    function clearGrid() {
    grid.innerHTML = '';
    }

    function createBoard(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let value = size * size;
    for (let i = 0; i < value; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', draw);
        gridElement.addEventListener('mousedown', draw);
        grid.appendChild(gridElement);
    }
    }

    function draw(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
    }

    function changeMode(newMode) {
        if ( currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
        } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
        } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
        }
        if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
        } else if (newMode === 'color') {
        colorBtn.classList.add('active')
        } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
        }
        currentMode = newMode;
    }
  

        window.onload = () => {
            createBoard(currentSize)
            activateButton(currentMode)
        }
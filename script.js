const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvasBtn = document.getElementById('clearCanvas');

// Set initial canvas size based on device width
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8; // 80% of the window width
    canvas.height = window.innerHeight * 0.6; // 60% of the window height
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas on resize
}

// Call resize function on load and resize events
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Initial brush settings
let drawing = false;
let brushColor = colorPicker.value;
let lineWidth = brushSize.value;

// Update brush color and size based on inputs
colorPicker.addEventListener('change', () => {
    brushColor = colorPicker.value;
});

brushSize.addEventListener('change', () => {
    lineWidth = brushSize.value;
});

// Start drawing when mouse or touch is pressed
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);

// Stop drawing when mouse or touch is released
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchend', stopDrawing);

// Draw on the canvas
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', drawTouch);

function startDrawing(e) {
    drawing = true;
    draw(e); // Draw the initial point
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Reset path
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Handle touch drawing (for mobile devices)
function drawTouch(e) {
    if (!drawing) return;
    e.preventDefault();

    const touch = e.touches[0];
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
}

// Clear the canvas
clearCanvasBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

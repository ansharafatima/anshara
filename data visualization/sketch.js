let table;
const canvasWidth = 475;
const canvasHeight = 325;
const textOffset = 50;
const barWidth = 40;
const barMaxHeight = 150; // Reduced bar height

function preload() {
    table = loadTable("TEMP-CHART.csv", "csv");
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(240); // Light gray background
    noStroke();
    textFont('Arial'); // Change the font to Arial
    textSize(14);
    textAlign(CENTER);
}

function draw() {
    if (!table) {
        console.log("Table not loaded.");
        return;
    }

    push();
    textSize(18);
    textStyle(BOLD);
    fill(0); // Black text color
    text('Temperature Of UAE This Week', canvasWidth / 2, textOffset);
    textSize(14);
    textStyle(NORMAL);
    translate(0, canvasHeight - textOffset);

    for (let i = 0; i < table.getColumnCount(); i++) {
        let data = table.getRow(1).arr;
        let temperature = data[i];
        let rectHeight = map(temperature, 28, 29, 0, barMaxHeight);
        let isHighTemperature = temperature > 28.5; // Adjust the threshold as needed
        let barColor = isHighTemperature ? color(255, 100, 100) : color(100, 255, 100); // Red for high, green for normal

        push();
        translate(i * (barWidth + 10) + textOffset, 0);

        // Add gradient fill
        let from = color(220);
        let to = color(200);
        fill(from);
        rect(0, 0, barWidth, -rectHeight, 10); // Draw the background rectangle

        for (let y = 0; y < rectHeight; y++) {
            let inter = map(y, 0, rectHeight, 0, 1);
            let c = lerpColor(from, to, inter);
            stroke(c);
            line(0, -y, barWidth, -y);
        }

        fill(barColor);
        rect(0, 0, barWidth, -rectHeight, 10); // Draw the actual temperature bar

        fill(0); // Black text color
        text(temperature, barWidth / 2, -rectHeight - 10);
        text(table.getRow(0).arr[i], barWidth / 2, 20);
        pop();
    }
    pop();
}

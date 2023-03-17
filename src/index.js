/** The simplest use of uibuilder client library
 * See the docs if the client doesn't start on its own.
 */
// Listen for incoming messages from Node-RED and action
uibuilder.onChange('msg', (msg) => {
    console.log(msg)
    DrawPlot(msg)
});

function compareByX(a, b) {
    if (a.x < b.x) {
        return -1;
    }
    if (a.x === b.x) {
        return 0;
    }
    if (a.x > b.x) {
        return 1;
    }
}

function getTrace(rawData){
    rawData[0].sort(compareByX);

    let x = [];
    let y = [];

    for (let record of rawData[0]) {
        x.push(timestampToDate(record.x));
        y.push(record.y);
    }

    return {
        x: x,
        y: y,
        type: 'scatter',
        name: rawData[1],
        marker: rawData[2],
        line:{shape: 'spline'}
    };
}

function timestampToDate(timestamp){
    let date = new Date(timestamp);
    let options = { day: "2-digit", month: "2-digit", year: "numeric" };

    return date.toLocaleDateString("en-US", options);
}

function DrawPlot(msg){
    let rawJSON = msg.payload;

    let maxTemps = [rawJSON.data[1], "Max", {color: 'rgb(255, 0, 0)', size: 8}];
    let minTemps = [rawJSON.data[0], "Min", {color: 'rgb(0, 0, 255)', size: 8}];

    let chartData = [getTrace(maxTemps), getTrace(minTemps)];
    let chartLayout = {title: "Historia temperatury 2023", yaxis: {title: "*C"}};

    let TESTER = document.getElementById('weather-chart');

    Plotly.plot(TESTER,
        chartData,
        chartLayout
    );

}

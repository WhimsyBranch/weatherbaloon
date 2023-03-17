let rawFromJSON = "27.01.2022 18:40:00";

function RawToTimestamp(raw){
    let timedata = []; //day, month, year, hours, minutes, seconds
    timedata.push(parseInt(raw.substring(0,2)));
    timedata.push(parseInt(raw.substring(3,5)));
    timedata.push(parseInt(raw.substring(6,10)));
    timedata.push(parseInt(raw.substring(11,13)));
    timedata.push(parseInt(raw.substring(14,16)));
    timedata.push(parseInt(raw.substring(17,19)));
    console.log(timedata);

    let date = new Date(timedata[2], timedata[1] - 1, timedata[0], timedata[3], timedata[4], timedata[5], 0);
    console.log(date);
}

RawToTimestamp(rawFromJSON);
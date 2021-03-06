let /* boolean */ highPrecision;
let /* int */ maxIterations, jobNumber, workerNumber;

//let url = "http://localhost:8080/v1/mandelbrot/compute";
//let url = "https://mandelbrot.stagek8s.gsk.com/v1/mandelbrot/compute";
let url = "v1/mandelbrot/compute";
let retryLimit = 5;

function doIterationCounts(coords, url, retryCount) {
    let iterationCounts;
    let error = "";

    try {
        let client = new XMLHttpRequest();
        client.open("POST", url, false);
        client.setRequestHeader("Content-Type", "application/json");
        client.setRequestHeader("Accept", "application/json");
        if (highPrecision) {
            coords.ymax = array_from(coords.ymax);
            coords.xmin = array_from(coords.xmin);
            coords.dx = array_from(coords.dx);
        }
        client.send(JSON.stringify(coords));

        if (client.status == 200) {
            iterationCounts =  JSON.parse(client.response);
        } else {
            error = "XMLHttpRequest status: " + client.status;
        }
    } catch(err) {
        error = err;
    }

    if (error !== "") {
        if (retryCount < retryLimit) {
            retryCount++;
            console.log("XMLHttpRequest failure, retrying " + retryCount + " of " + retryLimit + "...\n" + error);
            setTimeout(function() {
                    doIterationCounts(coords, url, retryCount);
                },
                retryCount*1000);
            return;
        } else {
            console.log("XMLHttpRequest failure, retry limit exceeded!\n" + error);
            iterationCounts = [array_fill(new Array(coords.columns), -1)];
        }
    }

    let returnData = [ jobNumber, coords.firstRow, iterationCounts, workerNumber, coords.rows ];
    postMessage(returnData);
}

onmessage = function(msg) {
    let data = msg.data;
    if ( data[0] == "setup" ) {
        jobNumber = data[1];
        maxIterations = data[2];
        highPrecision = data[3];
        workerNumber = data[4];
    } else if ( data[0] == "task" ) {
        let firstRow = data[1];
        let columns = data[2];
        let xmin = data[3];
        let dx = data[4];
        let ymax = data[5];
        let dy = data[6];
        let nrows = data[7];
        //console.log(workerNumber,xmin,dx,columns,ymax,dy,maxIterations,highPrecision);

        doIterationCounts({
                xmin: xmin, dx: dx, columns: columns, ymax: ymax, dy: dy, firstRow: firstRow, rows: nrows, maxIterations: maxIterations
            },
            highPrecision ? url + "HP" : url,
            0);
    }
}

function array_from(a) {
    let len = a.length;
    let r = Array(len);
    for (let i = 0; i < len; i++)
        r[i] = a[i];
    return r;
}

function array_fill(a, f) {
    let len = a.length;
    for (let i = 0; i < len; i++)
        a[i] = f;
    return a;
}

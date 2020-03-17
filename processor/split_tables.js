var fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');
var readline = require('readline');
var stream = require('stream');

var tables = {
    'author': fs.createWriteStream("./data/" + "author" + ".tsv", { flags: 'a' }),
    'edition': fs.createWriteStream("./data/" + "edition" + ".tsv", { flags: 'a' }),
    'page': fs.createWriteStream("./data/" + "page" + ".tsv", { flags: 'a' }),
    'subject': fs.createWriteStream("./data/" + "subject" + ".tsv", { flags: 'a' }),
    'work': fs.createWriteStream("./data/" + "work" + ".tsv", { flags: 'a' })
};

function writeAll(files, writeCallback) {
    var file = 'ol_dump_2020-02-29.txt';
    var counts = new Object();
    var instream = fs.createReadStream(file);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);

    var t0 = performance.now();
    rl.on('line', function(line) {
        var split = line.split('\t');
        var table = split[0].replace('/type/', '');
        var writer = tables[table];
        if (writer != null) {
            writer.write(line + "\n");
        }
    });

    rl.on('close', function() {
        var t1 = performance.now();
        for var table in tables {
            tables[table].end();
        });
        console.log("Call to write table data " + table + " took " + (t1 - t0) + " milliseconds.");
        writeCallback(count);
    });
}

writeAll(tables);

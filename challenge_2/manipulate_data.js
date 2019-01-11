

function getColumns(obj) {
    var container = [];
    for (key in obj) {
        if (key !== 'children')
        container.push(key);
    }
    return container;
}

function getData(messageObj) {
    var container = [];
    
    function recurGetData(obj) {

        if (!obj.children) {
            return;
        }

        var hold = [];
        for (var key in obj) {
            if (key !== 'children') {
                hold.push(obj[key])
            }
        }
        container.push(hold);

        if (obj.children) {
            for (let i = 0; i < obj.children.length; i++) {
                recurGetData(obj.children[i]);
            }
        }
    }

    recurGetData(messageObj);
    return container;          
};

function buildAnswer(col, row) {
    var result = ''
    result += col.join(',') + '\n';
    
    for (let i = 0; i < row.length; i++) {
        var currentRow = `<div>${row[i].join(',')}</div>`
        result += currentRow;
    }

    return result;

}

function buildAnswer2 (col, row) {
    var result = ''
    result += col.join(',') + '\n';
    
    for (let i = 0; i < row.length; i++) {
        var currentRow = row[i].join(',') + '\n';
        result += currentRow;
    }

    return result;
}

exports.getColumns = getColumns;
exports.getData = getData;
exports.buildAnswer = buildAnswer;
exports.buildAnswer2 = buildAnswer2
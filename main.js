document.addEventListener("DOMContentLoaded", (function() {
    let table = document.getElementById("table");
    let tableBody = document.getElementById("table-body");
    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            const data = json;
            for(let location in Object.keys(data)) {
                let newRow = document.createElement("tr");
                for(let key in data[location]) {
                    let rowData = document.createElement("td");
                    let text = document.createTextNode(data[location][key]);
                    console.log(data[location][key]);
                    rowData.appendChild(text);
                    newRow.appendChild(rowData);
                }
                tableBody.appendChild(newRow);
            }
            table.appendChild(tableBody);
        });
    })
);

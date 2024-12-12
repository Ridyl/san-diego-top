document.addEventListener("DOMContentLoaded", (function() {
    let table = document.getElementById("table");
    let tableBody = document.getElementById("table-body");
    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            // assigns data to json value.
            const data = json;
            // iterates through each location in data array
            for(let location in Object.keys(data)) {
                // creates a new row for each location --- data[index]
                let newRow = document.createElement("tr");
                // iterates through each value within each location object that is in the data array --- data[index][key]
                for(let key in data[location]) {
                    // creates a new cell for each item within object
                    let rowData = document.createElement("td");
                    // creates text from extracted key values --- "name" "description" "location" values
                    let text = document.createTextNode(data[location][key]);

                    // appends text to rd
                    rowData.appendChild(text);
                    // appends rd to whole row
                    newRow.appendChild(rowData);
                }
                // appends all created rows with appropriate ammount of cells and text
                tableBody.appendChild(newRow);
            }
            // appends table body to the table
            table.appendChild(tableBody);
        });
    })
);

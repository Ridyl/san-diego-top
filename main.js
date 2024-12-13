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
                newRow.setAttribute("id", "data-row");
                // iterates through each value within each location object that is in the data array --- data[index][key]                
                for(let key in data[location]) {
                    // creates a new cell for each item within object
                    let rowData = document.createElement("td");
                    // checks if value from object is an array (coordinates) to asign a button for that cell
                    if(Array.isArray(data[location][key])) {                        
                        // creates button in link section with "Open Map", sets id for accessing and styling
                        let text = document.createElement("button");
                        text.setAttribute("id", "map-button");
                        text.setAttribute("class", data[location][key])
                        text.textContent = "Open Map";
                        // appends text to rd
                        rowData.appendChild(text);
                    } else {
                        // creates text from extracted key values --- "name" "description" "location" values
                        let text = document.createTextNode(data[location][key]);
                        // appends text to rd
                        rowData.appendChild(text);
                    }
                    // appends rd to whole row
                    newRow.appendChild(rowData);
                }
                // appends all created rows with appropriate ammount of cells and text
                tableBody.appendChild(newRow);
            }
            // appends table body to the table
            table.appendChild(tableBody);

            loadScript('maps.js')
            function loadScript(url) {    
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                head.appendChild(script);
            }
        });
    })
);
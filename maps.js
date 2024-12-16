// selects all added buttons added from main.js
let buttons = document.querySelectorAll("#map-button");
// current state of a map on the page. Set false until first button click
let click = 0;
let lastCoords = [];

// leafletjs icon creation
let blueIcon = L.icon({
    iconUrl: 'images/blue-pin.png',

    iconSize:     [26, 40], // size of the icon
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        // sets closer value to current click value to keep value of previous maps id = "#"
        let closer = click;
        let old = document.getElementById(`${closer}`);
        click++;

        // access row of button press
        let parentRow = this.parentNode.parentNode;

        // create new table row and set id
        let mapRow = document.createElement("tr");
        mapRow.setAttribute("id", click);

        // access pressed buttons class name where location data is stored and returns the string as a split array
        let coords = this.className.split(',');

        // creates table data with proper attributes
        let mapData = document.createElement("td");
        mapData.colSpan = "3";
        mapData.setAttribute("id", "map");

        // adds data to created row then adds row after existing
        mapRow.appendChild(mapData);
        parentRow.after(mapRow);

        // if the first button is pressed
        if (click == 1) {
            let map = L.map('map').setView(coords, 15);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        
            L.marker(coords, {icon: blueIcon}).addTo(map);

        // if the same button is pressed
        } else if (coords.toString() == lastCoords.toString()) {
            // if old has not been removed yet
            if (old != null) {
                while (old.firstChild) {
                    old.removeChild(old.lastChild);
                }
                old.remove();
                mapRow.remove(); 

                // resets lastCoords so on next button press comparisons don't end up back here
                lastCoords = [];
            // else redraw map of previously closed map
            } else {
                let map = L.map('map').setView(coords, 15);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            
                L.marker(coords, {icon: blueIcon}).addTo(map); 
            }
        
        // if not first press and button is different than previous
        } else if (click > 1) {

            // if the button that was pressed is not the same as previous AND previous has not been removed
            if(coords.toString() != lastCoords.toString() && old != null) {
                // removes all children of last created row and then removes itself
                while (old.firstChild) {
                    old.removeChild(old.lastChild);
                }
                old.remove();
            }
        
            let map = L.map('map').setView(coords, 15);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        
            L.marker(coords, {icon: blueIcon}).addTo(map); 
        }
        // saves coords for closing
        lastCoords = coords;
    });
});
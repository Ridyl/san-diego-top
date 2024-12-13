// selects all added buttons added from main.js
let buttons = document.querySelectorAll("#map-button");
// current state of a map on the page. Set false until first button click
let open = false;

buttons.forEach(button => {
    button.addEventListener("click", function(event) {
        // if there are no maps open one will open
        if(open == false) {
            let mapRow = document.createElement("div");
            // access row of button press
            let parentRow = this.parentNode.parentNode.parentNode;
            console.log(parentRow);
            parentRow.appendChild(mapRow);
            // console.log(this.className);
            // console.log("a map has been opened");
        // if there is an open map it will be closed and selected one will be opened
        } else if (open == true) {
            // console.log("a map has been closed");
            // console.log(this.className);
            // console.log("a new map has been opened");
        }
        open = true;
    });
});

// need to find a way to access table to draw a new table row under the row that the button was pressed on.
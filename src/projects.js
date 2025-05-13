// This file will borrow from the "careers.js" file, which means I should
// move some of the functionality to a separate file and import as needed.
function createDiv(className, appendTo) {
    var div = document.createElement("div")
    div.className = className
    if (appendTo !== undefined) {
        appendTo.appendChild(div)
    }
    return div
}

function createProjectDiv() {
    // Top level div, which will hold all information.
    var projectDiv = createDiv("projectDiv")

    // Div for project description, which will be on the left
    createDiv("descr", projectDiv)

    // Right div, which will hold link and technologies used
    var infoDiv = createDiv("info", projectDiv)

    // Div for technologies used
    createDiv("techs", infoDiv)

    // Div for link
    createDiv("projLink", infoDiv)

    return projectDiv
}

// Our "main" function
fetch("../src/data/project/project_data.json")
    .then(data => data.json())
    .then((data) => {
        // These lines should be wrapped into one or more functions.
        for (var i = 0; i < data.length; i++) {
            var projectDiv = createProjectDiv();
            // We only have 1 div with class "careers", hence the [0]
            document.getElementsByClassName("projects")[0].appendChild(projectDiv)
            // Add a H3 to create a visible break between jobs
            var h3 = document.createElement("h3")
            document.getElementsByClassName("projects")[0].appendChild(h3)
        }
        // We'll loop through all divs that will hold project information and
        // add the relevant data to them.
        var projectDivs = document.getElementsByClassName("projectDiv")
        for (var i = 0; i < projectDivs.length; i++) {
            var projectObject = data[i];
            Object.keys(projectObject).forEach(k => {
                var elems = projectDivs[i].getElementsByClassName(k)
                if (k === "descr") {
                // Read text object: https://stackoverflow.com/a/14446538
                fetch(projectObject["descr"])
                    .then((res) => res.text())
                    // Replace newlines with br: https://stackoverflow.com/a/73785138
                    .then((text) => text.replaceAll(/(\r\n|\r|\n)/g, '<br/>'))
                    .then((text) => elems.item(elems.length - 1).innerHTML = text)
                }
                else if (k === "techs") {
                    var text = "<p><strong>Technologies used:</strong></p><br/>"
                    var techs = Object.keys(projectObject[k])
                    text += "<ul>"
                    for (var tech of techs) {
                        text += "<li>" + tech + "</li>"
                        if (projectObject[k][tech].length > 0) {
                            text += "<ul>"
                            for (var subtech of projectObject[k][tech]) {
                                text += "<li>" + subtech + "</li>"
                            }
                            text += "</ul>"
                        }
                    }
                    text += "</ul>"
                    elems.item(elems.length - 1).innerHTML = text
                }
                else {
                    var text = "Click <a href='" + projectObject[k] + "' target='_blank' rel='noopener noreferrer'>here</a> for more!"
                    elems.item(elems.length - 1).innerHTML = text
                }
            })
    }})
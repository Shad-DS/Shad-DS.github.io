// Since I am going to need to create many divs for this section
// best to wrap the functionality into functions

// We'll make a function to create a div and assign a class name to it
// and append to an element if provided. This can also be expanded to
// create any element and attach it to anny other element.
function createDiv(className, appendTo) {
    var div = document.createElement("div")
    div.className = className
    if (appendTo !== undefined) {
        appendTo.appendChild(div)
    }
    return div
}

function createCareerDiv() {
    // Top level div, which will hold all information.
    var careerDiv = createDiv("careerDiv")

    // Div for photo
    createDiv("photo", careerDiv)

    // Div for career description
    var jobDiv = createDiv("descr", careerDiv)

    // The description Div should have 2 divs: a section
    // for job information and one for prosaic description
    var topLine = createDiv("topLine", jobDiv)
    createDiv("descr", jobDiv)

    topLine.append(createTable())
    return careerDiv
}

// Need to also create a table for the top of each career div
function createTable() {
    const TABLE_ROWS = ["company", "job_title", "date_from", "date_to"]
    var table = document.createElement("table")
    var tr = document.createElement("tr")
    for (i = 0; i < TABLE_ROWS.length; i++) {
        var td = document.createElement("td")
        td.className = TABLE_ROWS[i]
        tr.appendChild(td)
    }
    table.appendChild(tr)
    return table
}

// Loading career data as a JSON. I don't really like the fetch API...
fetch("../src/data/career/career_data.json") // read data from file
        .then((data) => data.json()) // convert data to JSON objects
        .then((data) => {
            // These lines should be wrapped into one or more functions.
            for (var i = 0; i < data.length; i++) {
                var careerDiv = createCareerDiv();
                // We only have 1 div with class "careers", hence the [0]
                document.getElementsByClassName("careers")[0].appendChild(careerDiv)
                // Add a H3 to create a visible break between jobs
                var h3 = document.createElement("h3")
                document.getElementsByClassName("careers")[0].appendChild(h3)
            }
            // We'll loop through all divs that will hold career information and
            // add the relevant data to them.
            var careerDivs = document.getElementsByClassName("careerDiv")
            for (var i = 0; i < careerDivs.length; i++) {
                var careerObject = data[i];
                Object.keys(careerObject).forEach(k => {
                    var elems = careerDivs[i].getElementsByClassName(k)
                    if (elems.length > 0) {
                        if (k === "photo") {
                            var img = document.createElement("img")
                            img.setAttribute("src", careerObject[k])
                            elems.item(elems.length - 1).appendChild(img)
                            elems.item(elems.length - 1).className = "photo"
                        }
                        else if (k === "company") {
                            var a = document.createElement("a")
                            a.href = careerObject["companyLink"]
                            a.innerHTML = careerObject[k]
                            elems.item(elems.length - 1).appendChild(a)
                        }
                        else if (k === "descr") {
                            // Read text object: https://stackoverflow.com/a/14446538
                            fetch(careerObject["descr"])
                            .then((res) => res.text())
                            // Replace newlines with br: https://stackoverflow.com/a/73785138
                            .then((text) => text.replaceAll(/(\r\n|\r|\n)/g, '<br>'))
                            .then((text) => elems.item(elems.length - 1).innerHTML = text)
                        }
                        else {
                            elems.item(elems.length - 1).innerHTML = careerObject[k]
                        }
                    }
                })
            }
        })
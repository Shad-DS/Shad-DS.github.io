// Bar properties
const BAR_PROPS = {
    "maxWidth": 300,
    "barHeight": 30,
    "xOffset": 10,
    "yOffset": 10,
}

function createCard(className) {
    var div = document.createElement("div")
    div.className = className
    return div
}

function showContent(id) {
    // Grab the display div
    const div = document.getElementsByClassName("courseDiv")[0];

    // If it is not empty, empty it
    if (div.innerHTML !== undefined) {
        div.innerHTML = ""
    }

    // Load data from relevant file
    fetch("../src/data/certs/certs_data.json")
        .then(data => data.json()) // load data, convert to JSON
        .then(data => data[id]) // isolate just the clicked button's entry
        .then(data => data.forEach(
            (d, idx) => {
                var percentage = 100 * (d["complete_modules"] / d["total_modules"])
                // Make a div and add course information
                var courseCard = createCard("courseCard")

                var h4 = document.createElement("h4")
                // check if there is an anchor tag
                if (d["link"]) {
                    h4.innerHTML = `<a href=${d["link"]}>${d["title"]}</a>`
                } else {
                    h4.innerHTML = d["title"]
                }
                courseCard.append(h4)

                // Add a description div
                var descrDiv = createCard("courseDescr")
                descrDiv.innerHTML = d["descr"]
                courseCard.append(descrDiv)
                div.append(courseCard)

                var chartDiv = createCard("progress-container")
                var barDiv = document.createElement("div")
                barDiv.className = "progress-bar"
                barDiv.setAttribute("id", `bar${idx}`)
                chartDiv.append(barDiv)

                var labelDiv = document.createElement("div")
                labelDiv.className = "label"
                labelDiv.setAttribute("id", `label${idx}`)
                chartDiv.append(labelDiv)
                courseCard.append(chartDiv)

                const bar = document.getElementById(`bar${idx}`);
                const label = document.getElementById(`label${idx}`);

                // Set the width of the bar
                setTimeout(() => {
                    bar.style.width = percentage + "%";
                    label.innerHTML = "<h4 data-aos='fade-up'>" + percentage + "%" + "<h4/>";
                }, 100); // slight delay to trigger CSS transition
            }
        )
    )
}
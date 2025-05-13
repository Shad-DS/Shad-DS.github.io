const DATA_PERIOD = 1000;
const ROTATING_TEXT = [
    "a Python Programmer",
    "an Amateur Scrum Master",
    "an Avid Boardgamer",
    "a Games Master",
    "a Storyteller "
];

class TextRotate {
    // This is the equivalent of an __init__ in Python
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.numLoop = 0;
        this.period = parseInt(period, 10) || DATA_PERIOD;
        this.txt = ""
        this.tick()
        this.isDeleting = false;
    }

    // And these are methods
    tick() {
        let i = this.numLoop % this.toRotate.length;
        let fullText = this.toRotate[i];

        // If the text is in the process of being deleted, then we remove
        // one character at a time.
        // Managed to convert these lines into a ternary operator
        this.txt = this.isDeleting ? 
            fullText.substring(0, this.txt.length - 1) : 
            fullText.substring(0, this.txt.length + 1)

        // Update the HTML with the changing text
        this.el.innerHTML = this.txt

        // Not sure what these do...
        let that = this;

        let delta = 100 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        // If the full text is on screen, then we set it to slowly delete itself
        if (!this.isDeleting && this.txt === fullText) {
            delta = this.period;
            this.isDeleting = true
        }
        // If the text is completely gone, then we move on to the next string to display
        else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.numLoop++;
            delta = 500;
        }

        // We run the tick function AFTER a set time
        setTimeout(() => that.tick(), delta)
    }
}

window.onload = function() {
    let spanElement = document.getElementById("txt-rotate");
    new TextRotate(spanElement, ROTATING_TEXT, DATA_PERIOD)
}
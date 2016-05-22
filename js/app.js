/* This is a mini-project for the JavaScript Design Patterns unit. 
 * It revises the previous app by using the Knockout JS library. 
 * Each function and variable is connected to a data binding in the 
 * HTML document. The binding adds or returns the data to the DOM.
 */

// Wait for document to finish loading before running enclosed functions
$(function(){

    /* This is the model. It is an array of cat names, initial scores, images, 
     * credits, and nicknames. This is all the data in the Cat Clicker app.
    */

    var allCats = [
        {
            name: 'Tiny',
            score: 0,
            imgSrc: 'images/cat1.jpg',
            imgAttribution: 'https://www.flickr.com/photos/poplinre/625069434/in/photostream',
            nicknames: ['Teeny', 'Tootie', 'Tootles']
        },
        {
            name: 'Blue',
            score: 0,
            imgSrc: 'images/cat2.jpg',
            imgAttribution: 'https://www.flickr.com/photos/chewie/2290467335',
            nicknames: ['Blue Eyes', 'Bluey', 'Blue-boo']
        },
        {
            name: 'Twins',
            score: 0,
            imgSrc: 'images/cat3.jpg',
            imgAttribution: 'https://www.flickr.com/photos/jetske/5828169497',
            nicknames: ['Two-fer', 'Double Trouble', 'Twinset']
        },
        {
            name: 'Scaredy',
            score: 0,
            imgSrc: 'images/cat4.jpg',
            imgAttribution: 'https://www.instagram.com/worried_cat_aka_bum/',
            nicknames: ['Bum', 'Worried Cat', 'Ono']
        },
        {
            name: 'Aristo',
            score: 0,
            imgSrc: 'images/cat5.jpg',
            imgAttribution: 'http://favim.com/image/570127/',
            nicknames: ['Marie', 'Mademoiselle', 'Mignonne']

        },
        {
            name: 'Cutie',
            score: 0,
            imgSrc: 'images/cat6.jpg',
            imgAttribution: 'http://www.bureaublad-achtergronden.nl/2014/12/hd-katten-achtergronden-en-fotos.html',
            nicknames: ['Meowie', 'Teddy Bear', 'Purrkins']
        }
    ];

    /* This corresponds to the view. It is what the user initially sees 
     * on the page. This function constructs all cats, enabling them to 
     * inherit the necessary properties. For all cats, the displayed title 
     * depends on the number of clicks collected from user interaction.
    */

    var Cat = function(cats) {

        // Define properties of Cat as Knockout observables
        this.name = ko.observable(cats.name);
        this.score = ko.observable(cats.score);
        this.imgSrc = ko.observable(cats.imgSrc);
        this.imgAttribution = ko.observable(cats.imgAttribution);
        this.nicknames = ko.observableArray(cats.nicknames);

        // Define title as IIFE that computes score and changes itself
        this.title = ko.computed(function() {
            var clicks = this.score();
            var title;
            if (clicks < 3) {
                title = 'Newborn';
            } else if (clicks < 6) {
                title = 'Infant';
            } else if (clicks < 11) {
                title = 'Child';
            } else if (clicks < 16) {
                title = 'Teen';
            } else if (clicks < 21) {
                title = 'Cute No More';
            } else if (clicks < 25) {
                title = 'Don\’t you have something else to do?';
            } else if (clicks < 28) {
                title = 'Reset!';
            } else {
                this.score(0);
            }
            return title;
        }, this);
    };

    /* This controller communicates between the model and the view, and 
     * shows the results of user interactions on the screen. It populates 
     * the cat list using data from the model. It updates the displayed 
     * image and other data by telling the Cat constructor to create a new 
     * instance of itself. For every cat on display, it increments the  
     * score with each user click. The ViewModel is also a constructor.
    */

    var ViewModel = function() {

        // Make 'this' keyword in nested functions always refer to ViewModel
        var self = this;

        // Define catList as an observable array
        this.catList = ko.observableArray([]);

        // Loop over allCats array and run enclosed function on each item
        allCats.forEach(function(catItem) {

            // Push item into array to make it available as a new instance of Cat
            self.catList.push(new Cat(catItem));
        });

        // Create default chosenCat from the first item in catList
        this.chosenCat = ko.observable(this.catList()[0]);
        
        // Define updateCat as recursive function that acts on clickedCat
        this.updateCat = function(clickedCat) {
            self.chosenCat(clickedCat);
        };
        // Count every click and add 1 each time
        this.incrementScore = function() {
            self.chosenCat().score(self.chosenCat().score() + 1);
        };
    };

    // Activate Knockout on a new instance of ViewModel on page load
    ko.applyBindings(new ViewModel());

});
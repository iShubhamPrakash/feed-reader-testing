/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined(); //checks if it is defined
            expect(allFeeds.length).not.toBe(0); //Checks if it is not an empty string
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL defined', function() {

            // Loop through every item in allFeeds
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined(); //checks if it is defined
                expect(feed.url.length).not.toBe(0); //Checks if it is not an empty string
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name defined', function () {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined(); //checks if it is defined
                expect(feed.name.length).not.toBe(0); //Checks if it is not an empty string
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function () {

        const body = document.getElementsByTagName('body')[0];
        const menuIcon = document.getElementsByClassName('menu-icon-link')[0];


        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element is hidden by default', function () {
            //checks for the class menu-hidden in the body tag
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });


        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility on click', function () {
            //checks for the class menu-hidden in the body tag
            expect(body.classList.contains('menu-hidden')).toBe(true);

            menuIcon.click(); //Simulates click on the menu icon

            //checks for the class menu-hidden is removed from body tag after the click
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click(); //Again simulates click on the menu icon

            //Again checks for the class menu-hidden is added back to body tag after the another click
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it("has at least 1 entry after loadFeed function is called", function (done) {
            var entry = document.querySelector('.feed .entry');
            expect(entry.length).toBeGreaterThan(0);
            done();
        });
    });


    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeed;
        beforeEach(function (done) {
            loadFeed(0, function() {
                // storing old feed content
                oldFeed = document.querySelector(".feed").innerHTML;
                // load new feed
                loadFeed(1, function () {
                    done();
                });
            });
        });

        it("changes its loaded content", function(done) {
            // store new feed content
            var newFeed = document.querySelector(".feed").innerHTML;
            expect(oldFeed).not.toBe(newFeed);  // Compare old content with new one to check if the feed changes
            done();
        });
    });

}());

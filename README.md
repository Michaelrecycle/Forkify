# Forkify

Javascript 2021 Mastery Udemy course

This is an udemy course project taught by Jonas Schmedtmann (https://www.udemy.com/course/the-complete-javascript-course/), which I highly recommend to anyone who wants to advance in Javascript.

## The main concepts utilized in this project are:

1. The MVC pattern JS implementation (using the JS classes, private & protected fields, inheritence, methods etc.)
   - Model -> contains state and side effects
   - Controller -> handles events (gets the data, calls renders, publishes events)
   - View -> generates markups, listens to events
2. The async fetching (handling async code with await/async, handling success and error)
3. Event publisher/subscriber pattern (to allow event handling in the controller and the views)
4. Configuration and helper functions files in the project structure
5. DOM updating algorithm which renders things conditionally to prevent needless markup updates (like rendering images again if only text has changed) by creating virtual dom and comparing it to the current one.
6. Parcel to run and build the app

## Other cool stuff

- Using the closest() function which is similar to querySelector except it's top down (parent),
- Using attribute data-something in the html elements to extract the information in js.
- Quick way to convert a number using the unary operator + before an object (ie +"2").
- Chaining with .? which will prevent errors if the reference is null or undefined

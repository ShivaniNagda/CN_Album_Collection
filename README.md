# To start the project
- npm i 
- npm start

# External libraries used
1) react-toastify: for showing notifications, whenever there is an error 
2) react-spinners: for the modal, whenever there is interaction with the server, the loading modal is shown
3) react-redux: for useDispatch and useSelector and other hooks
4) reduxjs toolkit: for state management
5) axios: for ease of fetching/writing the albums and older browswer support


# Pages
There is only a single page Home.js

# App structure

1) App
    ---child components are---
    1a) Navbar
    1b) Home
        ---child components are---
        1b-I) Albums
            --child components are---
            1b-I-a) Album



# Approach

1) Write down all the pages that our application would have
2) Since there is only one page needed, draw a rough sketch of it and list out all the components in the page
3) List out all the fucntionalities of the page
4) Functionalities:
    4a) When the home page loads, the data is to be fetched from the given api, and since this is an asynchronous call, a loader modal will be shown as the data is being fetched
    4b) There are options for adding an album or editing an album, which opens a form to be submitted after adding or editing
    4c) There should be a delete button on every album, and when clicked, a dummy api call is made and the album is deleted from the local state
const express = require('express');
const app = express();
const {projects} = require('./data.json');


app.set('view engine', 'pug')


// Create static server and route assets in public folder to static folder
app.use('/static', express.static('public'));


// Set routes for different pages
app.get('/', (request, response) => {
    response.render('index', { projects });
});

app.get('/about', (request, response) => {
    response.render('about');
});
  

app.get('/project/:id', (request, response) => {
    response.render('project', { project: projects[request.params.id] });
});





// error handler for page not found
app.use((request, response, next) => {
    const err = new Error('404 - Page not found');
    err.status = 404;
    next(err);
});




app.use((error, request, response) => {
    error.message = error.message || "You have encountered a server error";
    response.status(error.status || 500);
    console.log(`${error.status} error `);
    response.send(`Error Code: ${response.status} - ${error.message}`);
  });


// set local server and its port to 3000
app.listen(3000);
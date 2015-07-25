# To-Don't

Demo AngularJS to-do app. Made for a blog post about unit testing Angular apps (coming soon).

## Running the app

### Client: 

The client is a static AngularJS app. It can be deployed locally:

* In one terminal window, run `grunt dev`    
* In another window, run `grunt serve`

The app will now be hosted at http://localhost:8000

### Server:

The backend is a quick and dirty PHP script. To run locally:

```
cd lib/
php -S localhost:7999
```

The API is now accessible at http://localhost:7999/todont.php

## Running unit tests

JavaScript unit tests are run as part of the build process (`grunt dev`). They can also be run manually using `grunt test`. 

Code coverage reports are generated after running the unit tests. They are available at http://localhost:8000/coverage

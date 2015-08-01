# To-Don't

Demo AngularJS to-do app. Made for a blog post about unit testing Angular apps (coming soon).

## Installation

Don't forget to install all dependencies before running the app:

```shell
npm install
npm install -g grunt grunt-cli
```

### Configuration:

Create a file `config.json` with the following structure:

```json
{
	"API_BASE_URL": "'http://localhost:7999/todont/lib/todont.php'"
}
```

Replace the URL with the full path (including port #) to where you'll be running the backend service (a PHP script).

## Running the app

### Client: 

The client is a static AngularJS app. It can be deployed locally:

* In one terminal window, run `grunt dev`    
* In another window, run `grunt serve`

The app will now be hosted at http://localhost:8000

### Server:

The backend is a quick and dirty PHP script. To run locally:

```shell
cd lib/
php -S localhost:7999
```

The API is now accessible at http://localhost:7999/todont.php

### Running in Apache, MAMP, WAMP, etc.

If you're running the project inside of a complete (local) web server with PHP, you can skip the `grunt serve` task and `php -S localhost:7999` command. Just run `grunt dev` to build and watch the files and open the project in a browser.

## Running unit tests

JavaScript unit tests are run as part of the build process (`grunt dev`). They can also be run manually using `grunt test`. 

Code coverage reports are generated after running the unit tests. They are available at http://localhost:8000/coverage

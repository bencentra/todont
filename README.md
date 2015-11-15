# To-Don't

Demo AngularJS to-do app. Made for a blog post about unit testing Angular apps (coming soon).

## Installation

* Fork and clone this repo and enter the project directory
* Install dependencies: `npm install && npm install -g grunt grunt-cli`

### Configuration:

Create a file `config.json` with the following structure:

```json
{
	"port": 8080,
	"API_BASE_URL": "'http://localhost:8080/todos/'"
}
```

`port` is the port number the app should run on. `API_BASE_URL` is the full address of the server, to be replaced (via Grunt) in the JavaScript source files.

### Running the app

* Build the client application: `grunt build`
* Run the server: `node index.js`

Check the console output for the URL of the app, and navigate to it in your browser.

## Development

To watch for all changes to files and rebuild/run unit tests, run `grunt dev`. You can also manually build the project with `grunt build` and run the unit tests with `grunt test`.

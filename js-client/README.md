# mandelbrot

Mandelbrot - JavaScript client for mandelbrot
Does Mandelbrot computation
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: V1.0
- Package version: V1.0
- Build package: io.swagger.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install mandelbrot --save
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing 
into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

Finally, switch to the directory you want to use your mandelbrot from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

You should now be able to `require('mandelbrot')` in javascript files from the directory you ran the last 
command above from.

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/YOUR_USERNAME/mandelbrot
then install it via:

```shell
    npm install YOUR_USERNAME/mandelbrot --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file, that's to say your javascript file where you actually 
use this library):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var Mandelbrot = require('mandelbrot');

var api = new Mandelbrot.MandelbrotApi()

var mandelbrotCoords = new Mandelbrot.MandelbrotCoords(); // {MandelbrotCoords} Mandelbrot coordinates to compute

api.computeMandelbrot(mandelbrotCoords).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});


```

## Documentation for API Endpoints

All URIs are relative to *http://localhost:8080/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*Mandelbrot.MandelbrotApi* | [**computeMandelbrot**](docs/MandelbrotApi.md#computeMandelbrot) | **POST** /mandelbrot/compute | Iterate over pixels to determine if each is in the Mandelbrot set


## Documentation for Models

 - [Mandelbrot.ApiFailureResponse](docs/ApiFailureResponse.md)
 - [Mandelbrot.MandelbrotCoords](docs/MandelbrotCoords.md)
 - [Mandelbrot.MandelbrotResults](docs/MandelbrotResults.md)


## Documentation for Authorization

 All endpoints do not require authorization.

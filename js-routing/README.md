# js-routing
Easy client-side routing for vanilla JS sites

When you're building a single-page website without a frontend framework such as React, this small package can help you implement routing with a single function invocation.

Intended to be used when you have several anchors linking to different sections of your website, identified by an id. Only the section whose link is clicked should be visible, while the rest should be hidden.
Also ensures that the section displayed is in sync with the url, so that the browser routing (forward and back arrows) work as expected.

**Installation**

Run npm i js-routing in your terminal.
Include import navigate from 'js-routing' in your JS file (if using webpack) or import navigate from '/node_modules/js-routing/index.js' if using es6 modules without webpack.

**Usage**

Exports a single function which takes 3 parameters - 1 mandatory and 2 optional.

Parameter 1: A string array that contains the ids of the elements that you want to navigate between. These ids should also be the hrefs of anchors that link to those sections. Ids should be passed without the #.

Parameter 2: Optional. The id of the section that should be displayed by default. (Before any links are clicked.) If this parameter is not present, it will default to the first id in the list. Pass null if none of the sections should be displayed before any links are clicked.

Parameter 3: Optional. An array of callback functions. Pass in up to one callback for each id, which will be invoked any time that page is navigated to. Each callback should be in the same array index as its corresponding id. If a callback array is passed but some ids do not have callbacks, the empty spots should be populated with null.

**Important Notes**
1. When an element is navigated to, it will be displayed while the other elements whose ids were passed will be hidden. Any element whose id is not in the list (and is not a child of elements whose ids are in the list) will not be hidden by the navigation. This allows a common header, footer, etc. to be shared among all of the pages.
2. Callbacks will be invoked every time their respective page is navigated to. Callbacks will be invoked exactly as they are passed in with no additional parameters.
3. The navigate function can be invoked more than once for the same website with a second set of ids, for instance if one page has several links inside of it. See Example 2 for how this works and how it can be useful.

**Code Samples:**

Example 1:

_JS file_

![example1Js](https://user-images.githubusercontent.com/83898488/158090464-4e2ab4eb-0414-4ee2-8f47-229fd4e09d1c.jpg)

_Supporting html_

![example1Html](https://user-images.githubusercontent.com/83898488/158072892-436227d4-9369-4219-8f9b-2e301cf393f6.jpg)

Example 2:

_JS file_

![example2Js](https://user-images.githubusercontent.com/83898488/158090478-449f9c1d-59f9-47cd-98ce-aeebbf9822da.jpg)

_Supporting html_

![example2Html](https://user-images.githubusercontent.com/83898488/158085176-5ae6e059-df69-4a23-ad2d-ac25a60e8a01.jpg)

## Overview
*URL Introspector* is a Chrome browser extension that replaces 'raw' web URLs with human readable hyperlinks using text contained within the URL itself and a few simple rules.

This works best on web sites that follow a convention for page naming (as many do) whereby a description of the page content is used to create the page name (or breadcrumb path) together with additional characters such as spaces or underscores to delineate words.

*URL Introspector* allows you (using basic syntax) to define what parts of the URL you want to use in your hyperlink text and to control some of the formatting such as capitalisation and token replacement in the displayed link text.

Configuration settings are saved to browser storage so your preferences will remain until you change them.

## Configuration
See the Options page for configuration information. The only part you should need to change is the text template. This defines placeholders for different parts of the URL you wish to use and is quite intuitive after you spend a minute testing out how it works. 

## Usage
To use the extension you need an editable field such as an email body or a rich text editor that can handle HTML.
The context menu option (URL Introspector) will not show unless you are in an editable field.

To use it, there are 2 modes:
- Existing linked URL 
    - Right click (control-click on Mac) and there should be an option to change the link to a human readble form
- Plain text URL (no link)
    - Select the whole URL and choose the corresponding option in the context menu. If the selected text is not a valid URL you will see an error message.

## Building
The extension itself is written in TypeScript. To run it in Chrome, this needs to be compiled into JavaScript.
The steps to do this are as follows:
- Install Node.js on your PC - this is required for the build process
- Check out the GitHub project from https://github.com/ardev462/url_introspector.git
- cd to root directory
- run the following commands in a terminal 
  - npm install
  - npm run build

The build process should be OS agnostic. The resulting dist/ folder will contain the chrome extension in exploded form. This can be run as an 'unpacked' extension in Chrome if you turn on developer mode and point it at this folder.
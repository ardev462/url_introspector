## Overview
*URL Introspector* is a Chrome browser extension that replaces 'raw' web URLs with human readable hyperlinks using text contained within the URL itself and a few simple rules.

This works best on web sites that follow a convention for page naming (as many do) whereby a description of the page content is used to create the page name (or breadcrumb path) together with additional characters such as spaces or underscores to delineate words.

*URL Introspector* allows you (using basic syntax) to define what parts of the URL you want to use in your hyperlink text and to control some of the formatting such as capitalisation and token replacement in the displayed link text.

Configuration settings are saved to browser storage so your preferences will remain until you change them.

## Configuration
See the Options page for configuration information. The text template defines placeholders for different parts of the URL you wish to use for hyperlink text. The syntax is simplistic and is quite intuitive after you spend a minute testing out how it works. 

## Usage
To use the extension you need an editable field such as an email body or a rich text editor that can handle HTML.
The context menu option (URL Introspector) will not show unless you are in an editable field.

To use it, there are 2 modes:
- Existing linked URL 
    - Right click (control-click on Mac) and there should be an option to change the link to a human readble form
![Existing link](screenshots/url_introspector_Link.png "Existing link")

- Plain text URL (no link)
    - Select the whole URL and choose the corresponding option in the context menu. If the selected text is not a valid URL you will see an error message.
![Selected text](screenshots/url_introspector_SelectedText.png "Selected text")

## Demo
Below is an animated GIF illustrating basic usage in both of the above modes of operation

![Demo](screenshots/url_introspector_usage.gif "Demo")


## Licensing
*URL Introspector* has been released as open source under the terms of the MIT license.
The source code has been uploaded to GitHub and is available here: https://github.com/ardev462/url_introspector

## Building the extension
*URL Introspector* is available via the Chrome web store so there is no explicit need to build anything unless you wish to tinker.

The extension itself is written in TypeScript. To run it in Chrome, this needs to be compiled into JavaScript.
The steps to do this are as follows:
- Install *Node.js* on your PC - this is required for the build process
- Check out the GitHub project from https://github.com/ardev462/url_introspector.git
- cd to the root directory
- run the following commands in a terminal 
  - npm install
  - npm run build

The build process should work in any operating system. The resulting dist/ folder will contain the chrome extension in exploded form. This can be run as an 'unpacked' extension in Chrome if you turn on developer mode and point it at the dist/ folder.
import { textFromLink } from "./shared.js";

// Listen for for context menu clicks
chrome.contextMenus.onClicked.addListener(handleContextClick);

/**
 * Handler for context menu clicks. 
 * @param info chrom click data
 * @param tab chrome tab data if defined
 * @returns void
 */
function handleContextClick(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) : void{

  let url: URL;
  //console.log(info);

  try {
    if (info.menuItemId == 'configure') {
      console.log('showing config...')
      chrome.runtime.openOptionsPage();
    } else if (info.menuItemId == 'transform-sel' && info.selectionText) {
      // Use selected text as URL
      url = new URL(info.selectionText);
    } else if (info.menuItemId == 'transform-link' && info.linkUrl) {
      // Existing URL - use the link target
      url = new URL(info.linkUrl as string);
    }
  }
  catch (err) {
    // Show an error if the selected text is not a true URL
    console.log('Invalid URL', err);
    chrome.notifications.create('', {
        type: 'basic',
        iconUrl: 'assets/images/error.png',
        title: 'Error',
        message: 'Selection is not a valid URL',
        priority: 2
    });
    return;
  }
 
  if (tab && tab.id) { // need these to execute script

    // get template and options from storage
    chrome.storage.sync.get(
      { template: '1', substitution: true, titleCase: true }, // some defaults
      (config) => {
        // Apply the transform
        const textToShow = textFromLink(url, config.template, config.titleCase, config.substitution);
        if (textToShow) {
          // Add or replace the HTML anchor on the page
          chrome.scripting.executeScript({
            target: { tabId: tab.id as number},
            func: addAnchorToPage,
            args: [textToShow, url.href]
          });
        }
      }
    );
  }
}


/**
 * Add a hyperlink anchor to the document replacing selected text or changing the link
 * text of any existing hyperlink. 
 * To debug: this code gets run in the target page rather than within the extension itself
             In chrome, F12 > Sources > CTL-Shift-F and search for 'addAnchorToPage'
 * @param text Text to display in the anchor
 * @param url URL target for the anchor
 */
function addAnchorToPage(text: string, url: string) {
  
  // Find the correct document to use...
  let contentDocument: Document;
  if ((<HTMLElement>document.activeElement).tagName == 'IFRAME') {
    // Use the iFrame document
    contentDocument = (<HTMLIFrameElement>document.activeElement).contentDocument as Document;
  } else {
    // Use the default document
    contentDocument = document;
  }

  // Get the current selection so we can find where to make changes
  let selection = contentDocument.getSelection();

  let foundLink = false;
  if (selection) {
    let anchor : HTMLElement;
    if (selection.anchorNode?.parentElement?.tagName == 'A') {
      // This is already a hyperlink - use the existing anchor and just change the text
      anchor = selection.anchorNode.parentElement;
      foundLink = true;
    } else {
      // Make a new anchor
      anchor = document.createElement('a');
      anchor.setAttribute('href', url);
      anchor.setAttribute('target', '_blank'); // open in a new tab
    }
    // Either way, set the link text
    anchor.innerText = text;
  
    // If this is selected text then get the range and insert the new anchor
    if (!foundLink && selection.rangeCount) {
      let range = selection.getRangeAt(0);
      range.deleteContents(); // clear the existing text
      range.insertNode(anchor); // add the link
      selection.empty() // deselect text
    }
  }
}


// Create context menu items in a 2-tier hierarchy
chrome.runtime.onInstalled.addListener(() => {
  let parent = chrome.contextMenus.create({
    title: 'URL Introspector',
    id: 'parent',
    contexts: ['editable'], // Must be editable
    
  });
  chrome.contextMenus.create({
    title: 'Create hyperlink from selected text',
    contexts: ['selection'],
    parentId: parent,
    id: 'transform-sel'
  });
  chrome.contextMenus.create({
    title: 'Change to human readable hyperlink',
    contexts: ['link'],
    parentId: parent,
    id: 'transform-link'
  });
  chrome.contextMenus.create({
    title: 'Configure template and options',
    contexts: ['editable','selection','link'],
    parentId: parent,
    id: 'configure'
  });
});


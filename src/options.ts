import { textFromLink } from './shared.js';

/**
 *  Saves template to chrome storage
 */
const saveOptions = () => {
    const template =(<HTMLInputElement>document.getElementById('template'));
    const titleCase = (<HTMLInputElement>document.getElementById('titleCase'));
    const substitution = (<HTMLInputElement>document.getElementById('substitution'));
   
    chrome.storage.sync.set(
      { template: template.value, titleCase: titleCase.checked, substitution: substitution.checked},
      () => {
        // Update status to let user know options were saved.
        const status = (<HTMLInputElement>document.getElementById('status'));
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  /**
   *  Loads template and relevant options from storage. Updates the example.
   */
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { template: '3 : 2 > 1 (filename)', substitution: 'checked', titleCase : 'checked'},
      (items) => {
        (<HTMLInputElement>document.getElementById('template')).value = items.template;
        (<HTMLInputElement>document.getElementById('substitution')).checked = items.substitution;
        (<HTMLInputElement>document.getElementById('titleCase')).checked = items.titleCase;
        updateExample();
      }
    );
  };
  
  /**
   * Change the example hyperlink to illustrate what the result would look like with the current settings.
   */
  function updateExample() {
  
    // Get the current settings
    const template =  (<HTMLInputElement>document.getElementById('template')).value;
    const titleCase =  (<HTMLInputElement>document.getElementById('titleCase')).checked;  
    const substitution =  (<HTMLInputElement>document.getElementById('substitution')).checked;  
  
    // Get the URL
    const urlText = (<HTMLDivElement>document.getElementById('url')).textContent;
    const url = new URL(urlText as string);
    
    // Apply the transform
    const result = textFromLink(url, template, titleCase, substitution);
    
    // Set the result
    const anchor = (<HTMLAnchorElement>document.getElementById('result'));
    anchor.textContent = result;
    anchor.href = urlText as string;
  }

  // Load options from storage when page loads
  document.addEventListener('DOMContentLoaded', restoreOptions);

  // Add some event listeners to update the example if anything changes
  (<HTMLButtonElement>document.getElementById('save')).addEventListener('click', saveOptions); 
  (<HTMLAnchorElement>document.getElementById('template')).addEventListener('keyup', updateExample); 
  (<HTMLAnchorElement>document.getElementById('titleCase')).addEventListener('change', updateExample);
  (<HTMLAnchorElement>document.getElementById('substitution')).addEventListener('change', updateExample);

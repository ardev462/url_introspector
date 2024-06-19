/**
 * Update the saved configuration template based on the choices in the quick-config dialog 
 * @param buttonId Id of the button pushed in the dialog
 */
const saveQuickConfig = (buttonId: string) => {
  let template = buttonId.replace('b', '');
  const titleCase = true;
  const substitution = true;
  let separator = (<HTMLInputElement>document.getElementById('separator')).value;
  if (separator) {
    template = template.replace(/\|/g, separator);
  } else {
    separator = ' > '; // need a default before we save
  }
  console.log('Quick config:  updating template', template);
  chrome.storage.sync.set(
    { template: template, titleCase: titleCase, substitution: substitution, separator: separator },
    () => {
      close();
    }
  );
};

/**
 * Handle clicks from the quick-config dialog
 * @param e clck event
 * @returns false to prevent event propagation
 */
document.onclick = function (e: Event) {
  const element = (<HTMLElement>e.target);
  if (element && element.tagName == 'A') {
    console.log('Opening options page');
    chrome.runtime.openOptionsPage();
    close();
  } else if (element && element.tagName == 'BUTTON') {
    saveQuickConfig(element.id);
  }
  return false; // prevent default action and stop event propagation        
};

// On loading, get the saved separator from storage and load it into the separator field
document.addEventListener('DOMContentLoaded', () =>{
  chrome.storage.sync.get(
    { separator: ' > ' },
    (items) => {
      console.log('Loading separator from config...', items);
      (<HTMLInputElement>document.getElementById('separator')).value = items.separator;
    }
  );  
});
  


/**
 * 
 * @param url URL to introspect
 * @param template substitution template to use to generate the text shown in the resulting hyperlink (anchor) 
 * @param titleCase whether to capitalise the first letter of all words in the text
 * @param substitution whether to substitute certain non-word characters (currently limited to -_+) with spaces
 * @returns text to display in hyperlink (anchor) or empty string if none
 */
export function textFromLink(url : URL, template : string, titleCase : boolean, substitution :boolean) : string{
    let transformed;
    if (url) {
   
      // Remove leading and trailing slashes from the path before processing
      let path = url.pathname.replace(/(^\/|\/$)/g, '');
      
      // Parse any file name if there is one
      let filename = url.pathname.replace(/.+\/(([\w-]+)\.\w+)$/, '$2');
      
      // Remove any filename from the end of the path
      path = path.replace(/\/[\w-]+\.\w+$/, '');
  
      // Split the path at slashes to get the 'words' to use
      const pathElements = path.split('/');

      // Start replacing variables in the template

      // Replace the 'filename' variable (if present)
      transformed = template.replace('filename', filename);

      // Now do the positional parameters
      for (let i = 1; i <= pathElements.length; i++) {
        // index in reverse array order
        let element = pathElements[pathElements.length - i];
        
        if(substitution) { // from config options
          // replace dashes,uderscores and pluses with spaces
          // characters should probably be configurable but there aren't many others I can think of 
           element = element.replace(/[-\+_]/g,' ');
        }

        if(titleCase){ // from config options
          // Upper case the first letter of each word
          element = element.replace(/\b\w/g, s => s.toUpperCase());
        }
        transformed = transformed.replace('' + i, element);
      }
    }
    // Return result 
    return transformed ? transformed : '';
  }
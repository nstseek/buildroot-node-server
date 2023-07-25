export function normalizeToAscii(inputString: string) {
    // Normalize the string to handle accented characters
    const normalizedString = inputString.normalize("NFD");
    
    // Use a regular expression to remove non-ASCII characters
    const asciiString = normalizedString.replace(/[^\x00-\x7F]/g, "");
  
    return asciiString;
  }
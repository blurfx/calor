export const escapeHTML = (text: string) => {
  return text.replace(/[&<>]/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      default:
        return match;
    }
  });
};

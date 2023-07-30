/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepCopy = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  let copy: any;

  if (obj instanceof RegExp) {
    copy = new RegExp(obj);
  } else if (obj instanceof Date) {
    copy = new Date(obj);
  } else if (Array.isArray(obj)) {
    copy = [];

    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i]);
    }
  } else {
    copy = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
  }

  return copy;
};

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

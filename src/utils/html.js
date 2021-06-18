export const cleanUpHtmlTag = htmlString => {
  const pattern = /(<)([a-z]*)[-|:][^">]*"/gm;
  const temp = htmlString.replace(pattern, '$1$2');
  const attrPattern = /([a-z]*)="([^"]*)"/gm;
  return temp.replace(attrPattern, '');
};

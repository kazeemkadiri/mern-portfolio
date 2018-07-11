const extractImageSrc = (imageHtmlMarkup) => {

   if( imageHtmlMarkup.indexOf('src="') === -1 ) return '';

   return (imageHtmlMarkup.split('src="')[1]).split('"')[0]

}

export { extractImageSrc }
<% if (jQuery || imgProgress || velocity) { %>window.$ = require('jquery')<% } %>
<% if (imgProgress) { %>require('imgprogress')<% } %>
<% if (velocity) { %>require('velocity')<% } %>
console.log("'Allo, 'Allo!");

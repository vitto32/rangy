/**
 * Selection save and restore module for Rangy.
 * Saves and restores user selections using marker invisible elements in the DOM.
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: wd
 * Build date: 2 August 2014
 */
!function(e,n){"function"==typeof define&&define.amd?define(["rangy"],e):e(n.rangy)}(function(e){e.createModule("SaveRestore",["WrappedRange"],function(e,n){function r(e,n){return(n||document).getElementById(e)}function t(e,n){var r,t="selectionBoundary_"+ +new Date+"_"+(""+Math.random()).slice(2),a=m.getDocument(e.startContainer),o=e.cloneRange();return o.collapse(n),r=a.createElement("span"),r.id=t,r.style.lineHeight="0",r.style.display="none",r.className="rangySelectionBoundary",r.appendChild(a.createTextNode(v)),o.insertNode(r),r}function a(e,t,a,o){var s=r(a,e);s?(t[o?"setStartBefore":"setEndBefore"](s),s.parentNode.removeChild(s)):n.warn("Marker element has been removed. Cannot restore selection.")}function o(e,n){return n.compareBoundaryPoints(e.START_TO_START,e)}function s(n,r){var a,o,s=e.DomRange.getRangeDocument(n),d=n.toString();return n.collapsed?(o=t(n,!1),{document:s,markerId:o.id,collapsed:!0}):(o=t(n,!1),a=t(n,!0),{document:s,startMarkerId:a.id,endMarkerId:o.id,collapsed:!1,backward:r,toString:function(){return"original text: '"+d+"', new text: '"+n.toString()+"'"}})}function d(t,o){var s=t.document;"undefined"==typeof o&&(o=!0);var d=e.createRange(s);if(t.collapsed){var l=r(t.markerId,s);if(l){l.style.display="inline";var i=l.previousSibling;i&&3==i.nodeType?(l.parentNode.removeChild(l),d.collapseToPoint(i,i.length)):(d.collapseBefore(l),l.parentNode.removeChild(l))}else n.warn("Marker element has been removed. Cannot restore selection.")}else a(s,d,t.startMarkerId,!0),a(s,d,t.endMarkerId,!1);return o&&d.normalizeBoundaries(),d}function l(n,t){var a,d,l=[];n=n.slice(0),n.sort(o);for(var i=0,c=n.length;c>i;++i)l[i]=s(n[i],t);for(i=c-1;i>=0;--i)a=n[i],d=e.DomRange.getRangeDocument(a),a.collapsed?a.collapseAfter(r(l[i].markerId,d)):(a.setEndBefore(r(l[i].endMarkerId,d)),a.setStartAfter(r(l[i].startMarkerId,d)));return l}function i(r){if(!e.isSelectionValid(r))return n.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus."),null;var t=e.getSelection(r),a=t.getAllRanges(),o=1==a.length&&t.isBackward(),s=l(a,o);return o?t.setSingleRange(a[0],"backward"):t.setRanges(a),{win:r,rangeInfos:s,restored:!1}}function c(e){for(var n=[],r=e.length,t=r-1;t>=0;t--)n[t]=d(e[t],!0);return n}function u(n,r){if(!n.restored){var t=n.rangeInfos,a=e.getSelection(n.win),o=c(t),s=t.length;1==s&&r&&e.features.selectionHasExtend&&t[0].backward?(a.removeAllRanges(),a.addRange(o[0],!0)):a.setRanges(o),n.restored=!0}}function g(e,n){var t=r(n,e);t&&t.parentNode.removeChild(t)}function f(e){for(var n,r=e.rangeInfos,t=0,a=r.length;a>t;++t)n=r[t],n.collapsed?g(e.doc,n.markerId):(g(e.doc,n.startMarkerId),g(e.doc,n.endMarkerId))}var m=e.dom,v="﻿";e.util.extend(e,{saveRange:s,restoreRange:d,saveRanges:l,restoreRanges:c,saveSelection:i,restoreSelection:u,removeMarkerElement:g,removeMarkers:f})})});
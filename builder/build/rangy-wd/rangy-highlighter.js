/**
 * Highlighter module for Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core, TextRange and CssClassApplier modules.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: wd
 * Build date: 2 August 2014
 */
!function(t,e){"function"==typeof define&&define.amd?define(["rangy"],t):t(e.rangy)}(function(t){t.createModule("Highlighter",["ClassApplier"],function(t){function e(t,e){return t.characterRange.start-e.characterRange.start}function n(t,e){this.type=t,this.converterCreator=e}function r(t,e){p[t]=new n(t,e)}function i(t){var e=p[t];if(e instanceof n)return e.create();throw new Error("Highlighter type '"+t+"' is not valid")}function a(t,e){this.start=t,this.end=e}function s(t,e,n,r,i,a){i?(this.id=i,u=Math.max(u,i+1)):this.id=u++,this.characterRange=e,this.doc=t,this.classApplier=n,this.converter=r,this.containerElementId=a||null,this.applied=!1}function h(t,e){e=e||"textContent",this.doc=t||document,this.classAppliers={},this.highlights=[],this.converter=i(e)}var o=t.dom,c=o.arrayContains,g=o.getBody,l=[].forEach?function(t,e){t.forEach(e)}:function(t,e){for(var n=0,r=t.length;r>n;++n)e(t[n])},u=1,p={};n.prototype.create=function(){var t=this.converterCreator();return t.type=this.type,t},t.registerHighlighterType=r,a.prototype={intersects:function(t){return this.start<t.end&&this.end>t.start},union:function(t){return new a(Math.min(this.start,t.start),Math.max(this.end,t.end))},intersection:function(t){return new a(Math.max(this.start,t.start),Math.min(this.end,t.end))},complements:function(t){var e=[];if(this.start>=t.start){if(this.end<=t.end)return[];e.push(new a(t.end,this.end))}else e.push(new a(this.start,Math.min(this.end,t.start))),this.end>t.end&&e.push(new a(t.end,this.end));return e},toString:function(){return"[CharacterRange("+this.start+", "+this.end+")]"}},a.fromCharacterRange=function(t){return new a(t.start,t.end)};var f={rangeToCharacterRange:function(t,e){var n=t.getBookmark(e);return new a(n.start,n.end)},characterRangeToRange:function(e,n,r){var i=t.createRange(e);return i.moveToBookmark({start:n.start,end:n.end,containerNode:r}),i},serializeSelection:function(t,e){for(var n=t.getAllRanges(),r=n.length,i=[],a=1==r&&t.isBackward(),s=0,h=n.length;h>s;++s)i[s]={characterRange:this.rangeToCharacterRange(n[s],e),backward:a};return i},restoreSelection:function(t,e,n){t.removeAllRanges();for(var r,i,a,s=t.win.document,h=0,o=e.length;o>h;++h)i=e[h],a=i.characterRange,r=this.characterRangeToRange(s,i.characterRange,n),t.addRange(r,i.backward)}};r("textContent",function(){return f}),r("TextRange",function(){var e;return function(){if(!e){var n=t.modules.TextRange;if(!n)throw new Error("TextRange module is missing.");if(!n.supported)throw new Error("TextRange module is present but not supported.");e={rangeToCharacterRange:function(t,e){return a.fromCharacterRange(t.toCharacterRange(e))},characterRangeToRange:function(e,n,r){var i=t.createRange(e);return i.selectCharacters(r,n.start,n.end),i},serializeSelection:function(t,e){return t.saveCharacterRanges(e)},restoreSelection:function(t,e,n){t.restoreCharacterRanges(n,e)}}}return e}}()),s.prototype={getContainerElement:function(){return this.containerElementId?this.doc.getElementById(this.containerElementId):g(this.doc)},getRange:function(){return this.converter.characterRangeToRange(this.doc,this.characterRange,this.getContainerElement())},fromRange:function(t){this.characterRange=this.converter.rangeToCharacterRange(t,this.getContainerElement())},getText:function(){return this.getRange().toString()},containsElement:function(t){return this.getRange().containsNodeContents(t.firstChild)},unapply:function(){this.classApplier.undoToRange(this.getRange()),this.applied=!1},apply:function(){this.classApplier.applyToRange(this.getRange()),this.applied=!0},getHighlightElements:function(){return this.classApplier.getElementsWithClassIntersectingRange(this.getRange())},toString:function(){return"[Highlight(ID: "+this.id+", class: "+this.classApplier.cssClass+", character range: "+this.characterRange.start+" - "+this.characterRange.end+")]"}},h.prototype={addClassApplier:function(t){this.classAppliers[t.cssClass]=t},getHighlightForElement:function(t){for(var e=this.highlights,n=0,r=e.length;r>n;++n)if(e[n].containsElement(t))return e[n];return null},removeHighlights:function(t){for(var e,n=0,r=this.highlights.length;r>n;++n)e=this.highlights[n],c(t,e)&&(e.unapply(),this.highlights.splice(n--,1))},removeAllHighlights:function(){this.removeHighlights(this.highlights)},getIntersectingHighlights:function(t){{var e=[],n=this.highlights;this.converter}return l(t,function(t){l(n,function(n){t.intersectsRange(n.getRange())&&!c(e,n)&&e.push(n)})}),e},highlightCharacterRanges:function(e,n,r,i){var h,o,c,g=this.highlights,u=this.converter,p=this.doc,f=[],d=e?this.classAppliers[e]:!1;r=r||null,i=i||!1;var R,v,m;r&&(R=this.doc.getElementById(r),R&&(v=t.createRange(this.doc),v.selectNodeContents(R),m=new a(0,v.toString().length)));var C,w,y,E,T,A;for(h=0,o=n.length;o>h;++h)if(C=n[h],T=[],m&&(C=C.intersection(m)),C.start!=C.end){for(c=0;c<g.length;++c)y=!1,r==g[c].containerElementId&&(w=g[c].characterRange,E=d==g[c].classApplier,A=!E&&i,w.intersects(C)&&(E||A)&&(A&&l(w.complements(C),function(t){T.push(new s(p,t,g[c].classApplier,u,null,r))}),y=!0,E&&(C=w.union(C)))),y?(f.push(g[c]),g[c]=new s(p,w.union(C),d,u,null,r)):T.push(g[c]);d&&T.push(new s(p,C,d,u,null,r)),this.highlights=g=T}l(f,function(t){t.unapply()});var H=[];return l(g,function(t){t.applied||(t.apply(),H.push(t))}),H},highlightRanges:function(e,n,r,i){var a,s=[],h=this.converter,o=r?r.id:null;return r&&(a=t.createRange(r),a.selectNodeContents(r)),l(n,function(t){var e=r?a.intersection(t):t;s.push(h.rangeToCharacterRange(e,r||g(t.getDocument())))}),this.highlightCharacterRanges(e,s,o,i)},highlightSelection:function(e,n,r,i){var s=this.converter;n=n||t.getSelection();var h=e?this.classAppliers[e]:!1,o=n.win.document,c=r?o.getElementById(r):g(o);if(!h&&e!==!1)throw new Error("No class applier found for class '"+e+"'");var u=s.serializeSelection(n,c),p=[];l(u,function(t){p.push(a.fromCharacterRange(t.characterRange))});var f=this.highlightCharacterRanges(e,p,r,i);return s.restoreSelection(n,u,c),f},unhighlightSelection:function(e){e=e||t.getSelection();var n=this.getIntersectingHighlights(e.getAllRanges());return this.removeHighlights(n),e.removeAllRanges(),n},getHighlightsInSelection:function(e){return e=e||t.getSelection(),this.getIntersectingHighlights(e.getAllRanges())},selectionOverlapsHighlight:function(t){return this.getHighlightsInSelection(t).length>0},serialize:function(t){var n=this.highlights;n.sort(e);var r=["type:"+this.converter.type];return l(n,function(e){var n=e.characterRange,i=[n.start,n.end,e.id,e.classApplier.cssClass,e.containerElementId];t&&t.serializeHighlightText&&i.push(e.getText()),r.push(i.join("$"))}),r.join("|")},deserialize:function(t){var e,n,r,h=t.split("|"),o=[],c=h[0],l=!1;if(!c||!(e=/^type:(\w+)$/.exec(c)))throw new Error("Serialized highlights are invalid.");n=e[1],n!=this.converter.type&&(r=i(n),l=!0),h.shift();for(var u,p,f,d,R,v,m=h.length;m-->0;){if(v=h[m].split("$"),f=new a(+v[0],+v[1]),d=v[4]||null,R=d?this.doc.getElementById(d):g(this.doc),l&&(f=this.converter.rangeToCharacterRange(r.characterRangeToRange(this.doc,f,R),R)),u=this.classAppliers[v[3]],!u)throw new Error("No class applier found for class '"+v[3]+"'");p=new s(this.doc,f,u,this.converter,parseInt(v[2]),d),p.apply(),o.push(p)}this.highlights=o}},t.Highlighter=h,t.createHighlighter=function(t,e){return new h(t,e)}})});
import{g as e}from"./@ctrl-Bh76T9q4.js";var t="top",n="bottom",r="right",o="left",i="auto",a=[t,n,r,o],s="start",f="end",c="clippingParents",p="viewport",u="popper",l="reference",d=a.reduce((function(e,t){return e.concat([t+"-"+s,t+"-"+f])}),[]),m=[].concat(a,[i]).reduce((function(e,t){return e.concat([t,t+"-"+s,t+"-"+f])}),[]),h="beforeRead",v="read",g="afterRead",y="beforeMain",b="main",w="afterMain",x="beforeWrite",O="write",j="afterWrite",E=[h,v,g,y,b,w,x,O,j];function D(e){return e?(e.nodeName||"").toLowerCase():null}function A(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function P(e){return e instanceof A(e).Element||e instanceof Element}function L(e){return e instanceof A(e).HTMLElement||e instanceof HTMLElement}function M(e){return"undefined"!=typeof ShadowRoot&&(e instanceof A(e).ShadowRoot||e instanceof ShadowRoot)}var k={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];!L(o)||!D(o)||(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});!L(r)||!D(r)||(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]};function W(e){return e.split("-")[0]}var B=Math.max,R=Math.min,H=Math.round;function S(e,t){void 0===t&&(t=!1);var n=e.getBoundingClientRect(),r=1,o=1;if(L(e)&&t){var i=e.offsetHeight,a=e.offsetWidth;a>0&&(r=H(n.width)/a||1),i>0&&(o=H(n.height)/i||1)}return{width:n.width/r,height:n.height/o,top:n.top/o,right:n.right/r,bottom:n.bottom/o,left:n.left/r,x:n.left/r,y:n.top/o}}function T(e){var t=S(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function C(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&M(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function q(e){return A(e).getComputedStyle(e)}function V(e){return["table","td","th"].indexOf(D(e))>=0}function N(e){return((P(e)?e.ownerDocument:e.document)||window.document).documentElement}function _(e){return"html"===D(e)?e:e.assignedSlot||e.parentNode||(M(e)?e.host:null)||N(e)}function I(e){return L(e)&&"fixed"!==q(e).position?e.offsetParent:null}function z(e){for(var t=A(e),n=I(e);n&&V(n)&&"static"===q(n).position;)n=I(n);return n&&("html"===D(n)||"body"===D(n)&&"static"===q(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&L(e)&&"fixed"===q(e).position)return null;var n=_(e);for(M(n)&&(n=n.host);L(n)&&["html","body"].indexOf(D(n))<0;){var r=q(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}function F(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function U(e,t,n){return B(e,R(t,n))}function X(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function Y(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var G={name:"arrow",enabled:!0,phase:"main",fn:function(e){var i,s=e.state,f=e.name,c=e.options,p=s.elements.arrow,u=s.modifiersData.popperOffsets,l=W(s.placement),d=F(l),m=[o,r].indexOf(l)>=0?"height":"width";if(p&&u){var h=function(e,t){return X("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:Y(e,a))}(c.padding,s),v=T(p),g="y"===d?t:o,y="y"===d?n:r,b=s.rects.reference[m]+s.rects.reference[d]-u[d]-s.rects.popper[m],w=u[d]-s.rects.reference[d],x=z(p),O=x?"y"===d?x.clientHeight||0:x.clientWidth||0:0,j=b/2-w/2,E=h[g],D=O-v[m]-h[y],A=O/2-v[m]/2+j,P=U(E,A,D),L=d;s.modifiersData[f]=((i={})[L]=P,i.centerOffset=P-A,i)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"==typeof r&&!(r=t.elements.popper.querySelector(r))||!C(t.elements.popper,r)||(t.elements.arrow=r))},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function J(e){return e.split("-")[1]}var K={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Q(e){var i,a=e.popper,s=e.popperRect,c=e.placement,p=e.variation,u=e.offsets,l=e.position,d=e.gpuAcceleration,m=e.adaptive,h=e.roundOffsets,v=e.isFixed,g=u.x,y=void 0===g?0:g,b=u.y,w=void 0===b?0:b,x="function"==typeof h?h({x:y,y:w}):{x:y,y:w};y=x.x,w=x.y;var O=u.hasOwnProperty("x"),j=u.hasOwnProperty("y"),E=o,D=t,P=window;if(m){var L=z(a),M="clientHeight",k="clientWidth";if(L===A(a)&&("static"!==q(L=N(a)).position&&"absolute"===l&&(M="scrollHeight",k="scrollWidth")),c===t||(c===o||c===r)&&p===f)D=n,w-=(v&&L===P&&P.visualViewport?P.visualViewport.height:L[M])-s.height,w*=d?1:-1;if(c===o||(c===t||c===n)&&p===f)E=r,y-=(v&&L===P&&P.visualViewport?P.visualViewport.width:L[k])-s.width,y*=d?1:-1}var W,B=Object.assign({position:l},m&&K),R=!0===h?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:H(t*r)/r||0,y:H(n*r)/r||0}}({x:y,y:w}):{x:y,y:w};return y=R.x,w=R.y,d?Object.assign({},B,((W={})[D]=j?"0":"",W[E]=O?"0":"",W.transform=(P.devicePixelRatio||1)<=1?"translate("+y+"px, "+w+"px)":"translate3d("+y+"px, "+w+"px, 0)",W)):Object.assign({},B,((i={})[D]=j?w+"px":"",i[E]=O?y+"px":"",i.transform="",i))}var Z={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:W(t.placement),variation:J(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Q(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Q(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},$={passive:!0};var ee={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,s=void 0===a||a,f=A(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach((function(e){e.addEventListener("scroll",n.update,$)})),s&&f.addEventListener("resize",n.update,$),function(){i&&c.forEach((function(e){e.removeEventListener("scroll",n.update,$)})),s&&f.removeEventListener("resize",n.update,$)}},data:{}},te={left:"right",right:"left",bottom:"top",top:"bottom"};function ne(e){return e.replace(/left|right|bottom|top/g,(function(e){return te[e]}))}var re={start:"end",end:"start"};function oe(e){return e.replace(/start|end/g,(function(e){return re[e]}))}function ie(e){var t=A(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function ae(e){return S(N(e)).left+ie(e).scrollLeft}function se(e){var t=q(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function fe(e){return["html","body","#document"].indexOf(D(e))>=0?e.ownerDocument.body:L(e)&&se(e)?e:fe(_(e))}function ce(e,t){var n;void 0===t&&(t=[]);var r=fe(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=A(r),a=o?[i].concat(i.visualViewport||[],se(r)?r:[]):r,s=t.concat(a);return o?s:s.concat(ce(_(a)))}function pe(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ue(e,t){return t===p?pe(function(e){var t=A(e),n=N(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,a=0,s=0;return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(a=r.offsetLeft,s=r.offsetTop)),{width:o,height:i,x:a+ae(e),y:s}}(e)):P(t)?function(e){var t=S(e);return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):pe(function(e){var t,n=N(e),r=ie(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=B(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=B(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-r.scrollLeft+ae(e),f=-r.scrollTop;return"rtl"===q(o||n).direction&&(s+=B(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:s,y:f}}(N(e)))}function le(e,t,n){var r="clippingParents"===t?function(e){var t=ce(_(e)),n=["absolute","fixed"].indexOf(q(e).position)>=0&&L(e)?z(e):e;return P(n)?t.filter((function(e){return P(e)&&C(e,n)&&"body"!==D(e)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],a=o.reduce((function(t,n){var r=ue(e,n);return t.top=B(r.top,t.top),t.right=R(r.right,t.right),t.bottom=R(r.bottom,t.bottom),t.left=B(r.left,t.left),t}),ue(e,i));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function de(e){var i,a=e.reference,c=e.element,p=e.placement,u=p?W(p):null,l=p?J(p):null,d=a.x+a.width/2-c.width/2,m=a.y+a.height/2-c.height/2;switch(u){case t:i={x:d,y:a.y-c.height};break;case n:i={x:d,y:a.y+a.height};break;case r:i={x:a.x+a.width,y:m};break;case o:i={x:a.x-c.width,y:m};break;default:i={x:a.x,y:a.y}}var h=u?F(u):null;if(null!=h){var v="y"===h?"height":"width";switch(l){case s:i[h]=i[h]-(a[v]/2-c[v]/2);break;case f:i[h]=i[h]+(a[v]/2-c[v]/2)}}return i}function me(e,o){void 0===o&&(o={});var i=o,s=i.placement,f=void 0===s?e.placement:s,d=i.boundary,m=void 0===d?c:d,h=i.rootBoundary,v=void 0===h?p:h,g=i.elementContext,y=void 0===g?u:g,b=i.altBoundary,w=void 0!==b&&b,x=i.padding,O=void 0===x?0:x,j=X("number"!=typeof O?O:Y(O,a)),E=y===u?l:u,D=e.rects.popper,A=e.elements[w?E:y],L=le(P(A)?A:A.contextElement||N(e.elements.popper),m,v),M=S(e.elements.reference),k=de({reference:M,element:D,strategy:"absolute",placement:f}),W=pe(Object.assign({},D,k)),B=y===u?W:M,R={top:L.top-B.top+j.top,bottom:B.bottom-L.bottom+j.bottom,left:L.left-B.left+j.left,right:B.right-L.right+j.right},H=e.modifiersData.offset;if(y===u&&H){var T=H[f];Object.keys(R).forEach((function(e){var o=[r,n].indexOf(e)>=0?1:-1,i=[t,n].indexOf(e)>=0?"y":"x";R[e]+=T[i]*o}))}return R}var he={name:"flip",enabled:!0,phase:"main",fn:function(e){var f=e.state,c=e.options,p=e.name;if(!f.modifiersData[p]._skip){for(var u=c.mainAxis,l=void 0===u||u,h=c.altAxis,v=void 0===h||h,g=c.fallbackPlacements,y=c.padding,b=c.boundary,w=c.rootBoundary,x=c.altBoundary,O=c.flipVariations,j=void 0===O||O,E=c.allowedAutoPlacements,D=f.options.placement,A=W(D),P=g||(A===D||!j?[ne(D)]:function(e){if(W(e)===i)return[];var t=ne(e);return[oe(e),t,oe(t)]}(D)),L=[D].concat(P).reduce((function(e,t){return e.concat(W(t)===i?function(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,s=n.padding,f=n.flipVariations,c=n.allowedAutoPlacements,p=void 0===c?m:c,u=J(r),l=u?f?d:d.filter((function(e){return J(e)===u})):a,h=l.filter((function(e){return p.indexOf(e)>=0}));0===h.length&&(h=l);var v=h.reduce((function(t,n){return t[n]=me(e,{placement:n,boundary:o,rootBoundary:i,padding:s})[W(n)],t}),{});return Object.keys(v).sort((function(e,t){return v[e]-v[t]}))}(f,{placement:t,boundary:b,rootBoundary:w,padding:y,flipVariations:j,allowedAutoPlacements:E}):t)}),[]),M=f.rects.reference,k=f.rects.popper,B=new Map,R=!0,H=L[0],S=0;S<L.length;S++){var T=L[S],C=W(T),q=J(T)===s,V=[t,n].indexOf(C)>=0,N=V?"width":"height",_=me(f,{placement:T,boundary:b,rootBoundary:w,altBoundary:x,padding:y}),I=V?q?r:o:q?n:t;M[N]>k[N]&&(I=ne(I));var z=ne(I),F=[];if(l&&F.push(_[C]<=0),v&&F.push(_[I]<=0,_[z]<=0),F.every((function(e){return e}))){H=T,R=!1;break}B.set(T,F)}if(R)for(var U=function(e){var t=L.find((function(t){var n=B.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return H=t,"break"},X=j?3:1;X>0;X--){if("break"===U(X))break}f.placement!==H&&(f.modifiersData[p]._skip=!0,f.placement=H,f.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function ve(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ge(e){return[t,r,n,o].some((function(t){return e[t]>=0}))}var ye={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=me(t,{elementContext:"reference"}),s=me(t,{altBoundary:!0}),f=ve(a,r),c=ve(s,o,i),p=ge(f),u=ge(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}};var be={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var n=e.state,i=e.options,a=e.name,s=i.offset,f=void 0===s?[0,0]:s,c=m.reduce((function(e,i){return e[i]=function(e,n,i){var a=W(e),s=[o,t].indexOf(a)>=0?-1:1,f="function"==typeof i?i(Object.assign({},n,{placement:e})):i,c=f[0],p=f[1];return c=c||0,p=(p||0)*s,[o,r].indexOf(a)>=0?{x:p,y:c}:{x:c,y:p}}(i,n.rects,f),e}),{}),p=c[n.placement],u=p.x,l=p.y;null!=n.modifiersData.popperOffsets&&(n.modifiersData.popperOffsets.x+=u,n.modifiersData.popperOffsets.y+=l),n.modifiersData[a]=c}};var we={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=de({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}};var xe={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var i=e.state,a=e.options,f=e.name,c=a.mainAxis,p=void 0===c||c,u=a.altAxis,l=void 0!==u&&u,d=a.boundary,m=a.rootBoundary,h=a.altBoundary,v=a.padding,g=a.tether,y=void 0===g||g,b=a.tetherOffset,w=void 0===b?0:b,x=me(i,{boundary:d,rootBoundary:m,padding:v,altBoundary:h}),O=W(i.placement),j=J(i.placement),E=!j,D=F(O),A=function(e){return"x"===e?"y":"x"}(D),P=i.modifiersData.popperOffsets,L=i.rects.reference,M=i.rects.popper,k="function"==typeof w?w(Object.assign({},i.rects,{placement:i.placement})):w,H="number"==typeof k?{mainAxis:k,altAxis:k}:Object.assign({mainAxis:0,altAxis:0},k),S=i.modifiersData.offset?i.modifiersData.offset[i.placement]:null,C={x:0,y:0};if(P){if(p){var q,V="y"===D?t:o,N="y"===D?n:r,_="y"===D?"height":"width",I=P[D],X=I+x[V],Y=I-x[N],G=y?-M[_]/2:0,K=j===s?L[_]:M[_],Q=j===s?-M[_]:-L[_],Z=i.elements.arrow,$=y&&Z?T(Z):{width:0,height:0},ee=i.modifiersData["arrow#persistent"]?i.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[V],ne=ee[N],re=U(0,L[_],$[_]),oe=E?L[_]/2-G-re-te-H.mainAxis:K-re-te-H.mainAxis,ie=E?-L[_]/2+G+re+ne+H.mainAxis:Q+re+ne+H.mainAxis,ae=i.elements.arrow&&z(i.elements.arrow),se=ae?"y"===D?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==S?void 0:S[D])?q:0,ce=I+ie-fe,pe=U(y?R(X,I+oe-fe-se):X,I,y?B(Y,ce):Y);P[D]=pe,C[D]=pe-I}if(l){var ue,le="x"===D?t:o,de="x"===D?n:r,he=P[A],ve="y"===A?"height":"width",ge=he+x[le],ye=he-x[de],be=-1!==[t,o].indexOf(O),we=null!=(ue=null==S?void 0:S[A])?ue:0,xe=be?ge:he-L[ve]-M[ve]-we+H.altAxis,Oe=be?he+L[ve]+M[ve]-we-H.altAxis:ye,je=y&&be?function(e,t,n){var r=U(e,t,n);return r>n?n:r}(xe,he,Oe):U(y?xe:ge,he,y?Oe:ye);P[A]=je,C[A]=je-he}i.modifiersData[f]=C}},requiresIfExists:["offset"]};function Oe(e,t,n){void 0===n&&(n=!1);var r=L(t),o=L(t)&&function(e){var t=e.getBoundingClientRect(),n=H(t.width)/e.offsetWidth||1,r=H(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(t),i=N(t),a=S(e,o),s={scrollLeft:0,scrollTop:0},f={x:0,y:0};return(r||!r&&!n)&&(("body"!==D(t)||se(i))&&(s=function(e){return e!==A(e)&&L(e)?function(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}(e):ie(e)}(t)),L(t)?((f=S(t,!0)).x+=t.clientLeft,f.y+=t.clientTop):i&&(f.x=ae(i))),{x:a.left+s.scrollLeft-f.x,y:a.top+s.scrollTop-f.y,width:a.width,height:a.height}}function je(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function Ee(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var De={placement:"bottom",modifiers:[],strategy:"absolute"};function Ae(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Pe(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?De:o;return function(e,t,n){void 0===n&&(n=i);var o={placement:"bottom",orderedModifiers:[],options:Object.assign({},De,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],s=!1,f={state:o,setOptions:function(n){var s="function"==typeof n?n(o.options):n;c(),o.options=Object.assign({},i,o.options,s),o.scrollParents={reference:P(e)?ce(e):e.contextElement?ce(e.contextElement):[],popper:ce(t)};var p=function(e){var t=je(e);return E.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,o.options.modifiers)));return o.orderedModifiers=p.filter((function(e){return e.enabled})),o.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,i=e.effect;if("function"==typeof i){var s=i({state:o,name:t,instance:f,options:r}),c=function(){};a.push(s||c)}})),f.update()},forceUpdate:function(){if(!s){var e=o.elements,t=e.reference,n=e.popper;if(Ae(t,n)){o.rects={reference:Oe(t,z(n),"fixed"===o.options.strategy),popper:T(n)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach((function(e){return o.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<o.orderedModifiers.length;r++)if(!0!==o.reset){var i=o.orderedModifiers[r],a=i.fn,c=i.options,p=void 0===c?{}:c,u=i.name;"function"==typeof a&&(o=a({state:o,options:p,name:u,instance:f})||o)}else o.reset=!1,r=-1}}},update:Ee((function(){return new Promise((function(e){f.forceUpdate(),e(o)}))})),destroy:function(){c(),s=!0}};if(!Ae(e,t))return f;function c(){a.forEach((function(e){return e()})),a=[]}return f.setOptions(n).then((function(e){!s&&n.onFirstUpdate&&n.onFirstUpdate(e)})),f}}var Le=Pe(),Me=Pe({defaultModifiers:[ee,we,Z,k]}),ke=Pe({defaultModifiers:[ee,we,Z,k,be,he,xe,G,ye]});const We=e(Object.freeze(Object.defineProperty({__proto__:null,afterMain:w,afterRead:g,afterWrite:j,applyStyles:k,arrow:G,auto:i,basePlacements:a,beforeMain:y,beforeRead:h,beforeWrite:x,bottom:n,clippingParents:c,computeStyles:Z,createPopper:ke,createPopperBase:Le,createPopperLite:Me,detectOverflow:me,end:f,eventListeners:ee,flip:he,hide:ye,left:o,main:b,modifierPhases:E,offset:be,placements:m,popper:u,popperGenerator:Pe,popperOffsets:we,preventOverflow:xe,read:v,reference:l,right:r,start:s,top:t,variationPlacements:d,viewport:p,write:O},Symbol.toStringTag,{value:"Module"})));export{m as E,We as r,ke as y};

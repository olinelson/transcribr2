(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"0mN4":function(e,t,a){"use strict";a("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"9eSz":function(e,t,a){"use strict";a("rGqo"),a("yt8O"),a("Btvt"),a("XfO3"),a("EK0E"),a("INYr"),a("0mN4");var r=a("TqRt");t.__esModule=!0,t.default=void 0;var i,n=r(a("PJYZ")),s=r(a("VbXa")),d=r(a("8OQS")),o=r(a("pVnL")),l=r(a("q1tI")),c=r(a("17x9")),u=function(e){var t=(0,o.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(S&&!!window.matchMedia(t).matches)},g=function(e){var t=e.fluid,a=e.fixed;return p(t||a).src},p=function(e){if(S&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t]}return e[0]},h=Object.create({}),m=function(e){var t=u(e),a=g(t);return h[a]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,S="undefined"!=typeof window,v=S&&window.IntersectionObserver,y=new WeakMap;function w(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return l.default.createElement(l.default.Fragment,{key:t},r&&l.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:n}),l.default.createElement("source",{media:i,srcSet:a,sizes:n}))}))}function E(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function V(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return l.default.createElement("source",{key:t,media:a,srcSet:r})}))}function I(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return l.default.createElement("source",{key:t,media:a,srcSet:r})}))}function A(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var L=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver((function(e){e.forEach((function(e){if(y.has(e.target)){var t=y.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),y.delete(e.target),t())}}))}),{rootMargin:"200px"})),i);return a&&(a.observe(e),y.set(e,t)),function(){a.unobserve(e),y.delete(e)}},R=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",d=e.height?'height="'+e.height+'" ':"",o=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",l=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?A(e,!0):"")+A(e)})).join("")+"<img "+l+s+d+a+r+t+n+i+o+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},O=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,i=e.spreadProps,n=e.ariaHidden,s=l.default.createElement(C,(0,o.default)({src:t},i,{ariaHidden:n}));return a.length>1?l.default.createElement("picture",null,r(a),s):s},C=l.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,s=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,g=e.ariaHidden,p=(0,d.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return l.default.createElement("img",(0,o.default)({"aria-hidden":g,sizes:a,srcSet:r,src:i},p,{onLoad:s,onError:c,ref:t,loading:u,draggable:f,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));C.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var T=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=S&&m(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!b&&v&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||S&&(b||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=l.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)(a)),a.handleRef=a.handleRef.bind((0,n.default)(a)),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:m(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=L(e,(function(){var e=m(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=g(t),h[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.imgStyle,d=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,g=e.placeholderClassName,h=e.fluid,m=e.fixed,b=e.backgroundColor,S=e.durationFadeIn,v=e.Tag,y=e.itemProp,E=e.loading,A=e.draggable,L=!1===this.state.fadeIn||this.state.imgLoaded,T=!0===this.state.fadeIn&&!this.state.imgCached,N=(0,o.default)({opacity:L?1:0,transition:T?"opacity "+S+"ms":"none"},d),j="boolean"==typeof b?"lightgray":b,x={transitionDelay:S+"ms"},z=(0,o.default)({opacity:this.state.imgLoaded?0:1},T&&x,{},d,{},f),G={title:t,alt:this.state.isVisible?"":a,style:z,className:g,itemProp:y};if(h){var k=h,B=p(h);return l.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(B.srcSet)},l.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/B.aspectRatio+"%"}}),j&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:j,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},T&&x)}),B.base64&&l.default.createElement(O,{ariaHidden:!0,src:B.base64,spreadProps:G,imageVariants:k,generateSources:I}),B.tracedSVG&&l.default.createElement(O,{ariaHidden:!0,src:B.tracedSVG,spreadProps:G,imageVariants:k,generateSources:V}),this.state.isVisible&&l.default.createElement("picture",null,w(k),l.default.createElement(C,{alt:a,title:t,sizes:B.sizes,src:B.src,crossOrigin:this.props.crossOrigin,srcSet:B.srcSet,style:N,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y,loading:E,draggable:A})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:R((0,o.default)({alt:a,title:t,loading:E},B,{imageVariants:k}))}}))}if(m){var M=m,U=p(m),q=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:U.width,height:U.height},n);return"inherit"===n.display&&delete q.display,l.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:q,ref:this.handleRef,key:"fixed-"+JSON.stringify(U.srcSet)},j&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:j,width:U.width,opacity:this.state.imgLoaded?0:1,height:U.height},T&&x)}),U.base64&&l.default.createElement(O,{ariaHidden:!0,src:U.base64,spreadProps:G,imageVariants:M,generateSources:I}),U.tracedSVG&&l.default.createElement(O,{ariaHidden:!0,src:U.tracedSVG,spreadProps:G,imageVariants:M,generateSources:V}),this.state.isVisible&&l.default.createElement("picture",null,w(M),l.default.createElement(C,{alt:a,title:t,width:U.width,height:U.height,sizes:U.sizes,src:U.src,crossOrigin:this.props.crossOrigin,srcSet:U.srcSet,style:N,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:y,loading:E,draggable:A})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:R((0,o.default)({alt:a,title:t,loading:E},U,{imageVariants:M}))}}))}return null},t}(l.default.Component);T.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var N=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),j=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});T.propTypes={resolutions:N,sizes:j,fixed:c.default.oneOfType([N,c.default.arrayOf(N)]),fluid:c.default.oneOfType([j,c.default.arrayOf(j)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var x=T;t.default=x},OGtf:function(e,t,a){var r=a("XKFU"),i=a("eeVq"),n=a("vhPU"),s=/"/g,d=function(e,t,a,r){var i=String(n(e)),d="<"+t;return""!==a&&(d+=" "+a+'="'+String(r).replace(s,"&quot;")+'"'),d+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(d),r(r.P+r.F*i((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",a)}},RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var r=a("cjvj"),i=a("q1tI"),n=a.n(i),s=a("Wbzz"),d=a("9eSz"),o=a.n(d),l=a("Bl7J"),c=a("PArb"),u=a("a/Iw");function f(){var e=r.data;return n.a.createElement(l.a,null,n.a.createElement("div",{style:{gridColumn:"1/-1",gridRow:"2",display:"grid",alignSelf:"center",justifyContent:"center",justifyItems:"center",justifySelf:"center"}},n.a.createElement(o.a,{style:{width:"90vw",maxWidth:"40rem",height:"auto"},fluid:e.file.childImageSharp.fluid,alt:"Transcribr Logo"}),n.a.createElement("h1",{style:{color:"#1890FF",textAlign:"center",fontSize:"10vw",marginBottom:"none"}},"transcribr",n.a.createElement("span",{style:{color:"orange"}},".")),Object(u.g)()?null:n.a.createElement("div",null,n.a.createElement(s.Link,{style:{color:"#1890FF"},to:"/login"},"Login"),n.a.createElement(c.a,{type:"vertical",style:{background:"orange"}}),n.a.createElement(s.Link,{style:{color:"#1890FF"},to:"/signup"},"Signup"))))}},cjvj:function(e){e.exports=JSON.parse('{"data":{"file":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAADaElEQVQ4y4VUWUwTURR9DbhS7XTWgvphTIxRP/RD/UFD1EiiIkRiTASUNVToRiuU0qKsRRZRwViBGGjEJcaIW6LGBUWNKCKCiEuUuO+g4hI0xvHMTFs/NHGSyZu8d++559x73hCCR5t5ntCGVumTaOK8ZHK7SP73iKJIqLTj8jeVdIjQWdeUA236SaLbpgAw1g6VP2FseMYoNu/+DOxFckUvF/FlHyJ492C4NvPcXHVUuc4fR6UelXNo02XC2HsJ4UsH5AM27558MHJa5Ag2tzcKybVc0audQvVPM1f8OpnJ6S7nyz5m0Vnt9bT5SjGAFtDGi2NkUvpTCiHbDaUKEnzrGzVYxQJcL2z5sYsvH0qkTZcaoKKVdT4o5Dd/cqGQC0WauMIXcSiyVKs/TSsM2xQwNv+RvIYsySdgtIjN77eAhR3Jdbrt4jrGer2NSj58gdv0NAdALbx7IF0qxhU8T6MtV51ox1Ipf0qfCMk9AMztVehuuCnwJW9NAErlNj42oB87Gfttu65GrBOqhj3YM4GVjXU9LEGcB+tGkEmHTBuT3TVRxrDfVoHVS7l3XMGzmVJ1BBpoS3s9v3nIzubeKcLqhcwKbWZrDXrXMC66qg0K9mCq1aF1YhxjvVYBoNmK2n4VESq/yYB8+edZkJRCpZ3YpVl3oENXKxr50vd5YFUWtltMUS8r/ape7h4O9YhmxCbDGTGa+Gavdv2ZAtbRx8vDyTirwpTfyZLDGsVgJqdnIbOhMwNDKQEbByo7wNgDwHh4tRHMjgEoTtj6K5pKOeIcv7r+EOu4GxMkTCeqEJYgVhkMAhVTr2lSU4kHTfCaCcwtkFqJoFjI88KHbt0O0YkWWGjzZTOU7ANYwoS94ihZrqNPAQut95k6p0eWPvWVGEwbLkh22If+2oSq73oU6YbBJV8aYCs7BpENG61EsRFSzoRmBQM9B6v4Zrx7YMrOwPVjsm+twH4D3J+OFqRiPwMNT0SBxbDGPPSK89+UMK8CNgtXEU7wXbMIK+EKn/uYdk/iNj1JgjXiYZ2okCWukf+6y9Lt8LdKqPhCNAl7/xximvIKz43DIFZBbvT4VZ6p/vPRcxICMSiswrkK3gvIDAwjAOgeVCpt+R6kWbs/OPCDmG9USZdearj0SpJoY5uvLV2ESmn5i/lvIgJ3g1iExa4AAAAASUVORK5CYII=","aspectRatio":1.3333333333333333,"src":"/static/dc80e348f95f3955be983f3b5dc7e7b5/42dad/wordcloudBlue.png","srcSet":"/static/dc80e348f95f3955be983f3b5dc7e7b5/d639b/wordcloudBlue.png 200w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/8a174/wordcloudBlue.png 400w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/42dad/wordcloudBlue.png 800w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/8e5e6/wordcloudBlue.png 1200w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/35c2d/wordcloudBlue.png 1600w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/49742/wordcloudBlue.png 4096w","sizes":"(max-width: 800px) 100vw, 800px"}}}}}')}}]);
//# sourceMappingURL=component---src-pages-index-js-24f9c048d7735173da42.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"0mN4":function(e,t,a){"use strict";a("OGtf")("fixed",(function(e){return function(){return e(this,"tt","","")}}))},"9eSz":function(e,t,a){"use strict";a("rGqo"),a("yt8O"),a("Btvt"),a("XfO3"),a("EK0E"),a("INYr"),a("0mN4");var r=a("TqRt");t.__esModule=!0,t.default=void 0;var i,n=r(a("PJYZ")),s=r(a("VbXa")),d=r(a("8OQS")),o=r(a("pVnL")),l=r(a("q1tI")),c=r(a("17x9")),u=function(e){var t=(0,o.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(S&&!!window.matchMedia(t).matches)},g=function(e){var t=e.fluid,a=e.fixed;return p(t||a).src},p=function(e){if(S&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t]}return e[0]},h=Object.create({}),m=function(e){var t=u(e),a=g(t);return h[a]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,S="undefined"!=typeof window,v=S&&window.IntersectionObserver,w=new WeakMap;function y(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return l.default.createElement(l.default.Fragment,{key:t},r&&l.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:n}),l.default.createElement("source",{media:i,srcSet:a,sizes:n}))}))}function E(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function V(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return l.default.createElement("source",{key:t,media:a,srcSet:r})}))}function I(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return l.default.createElement("source",{key:t,media:a,srcSet:r})}))}function A(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var R=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver((function(e){e.forEach((function(e){if(w.has(e.target)){var t=w.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),w.delete(e.target),t())}}))}),{rootMargin:"200px"})),i);return a&&(a.observe(e),w.set(e,t)),function(){a.unobserve(e),w.delete(e)}},L=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",d=e.height?'height="'+e.height+'" ':"",o=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",l=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?A(e,!0):"")+A(e)})).join("")+"<img "+l+s+d+a+r+t+n+i+o+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},O=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,i=e.spreadProps,n=e.ariaHidden,s=l.default.createElement(C,(0,o.default)({src:t},i,{ariaHidden:n}));return a.length>1?l.default.createElement("picture",null,r(a),s):s},C=l.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,s=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,g=e.ariaHidden,p=(0,d.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return l.default.createElement("img",(0,o.default)({"aria-hidden":g,sizes:a,srcSet:r,src:i},p,{onLoad:s,onError:c,ref:t,loading:u,draggable:f,style:(0,o.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));C.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var x=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=S&&m(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!b&&v&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||S&&(b||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=l.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)(a)),a.handleRef=a.handleRef.bind((0,n.default)(a)),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:m(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=R(e,(function(){var e=m(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=g(t),h[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.imgStyle,d=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,g=e.placeholderClassName,h=e.fluid,m=e.fixed,b=e.backgroundColor,S=e.durationFadeIn,v=e.Tag,w=e.itemProp,E=e.loading,A=e.draggable,R=!1===this.state.fadeIn||this.state.imgLoaded,x=!0===this.state.fadeIn&&!this.state.imgCached,T=(0,o.default)({opacity:R?1:0,transition:x?"opacity "+S+"ms":"none"},d),N="boolean"==typeof b?"lightgray":b,z={transitionDelay:S+"ms"},G=(0,o.default)({opacity:this.state.imgLoaded?0:1},x&&z,{},d,{},f),j={title:t,alt:this.state.isVisible?"":a,style:G,className:g,itemProp:w};if(h){var B=h,M=p(h);return l.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:(0,o.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(M.srcSet)},l.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/M.aspectRatio+"%"}}),N&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:N,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},x&&z)}),M.base64&&l.default.createElement(O,{ariaHidden:!0,src:M.base64,spreadProps:j,imageVariants:B,generateSources:I}),M.tracedSVG&&l.default.createElement(O,{ariaHidden:!0,src:M.tracedSVG,spreadProps:j,imageVariants:B,generateSources:V}),this.state.isVisible&&l.default.createElement("picture",null,y(B),l.default.createElement(C,{alt:a,title:t,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:E,draggable:A})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,o.default)({alt:a,title:t,loading:E},M,{imageVariants:B}))}}))}if(m){var U=m,k=p(m),q=(0,o.default)({position:"relative",overflow:"hidden",display:"inline-block",width:k.width,height:k.height},n);return"inherit"===n.display&&delete q.display,l.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:q,ref:this.handleRef,key:"fixed-"+JSON.stringify(k.srcSet)},N&&l.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,o.default)({backgroundColor:N,width:k.width,opacity:this.state.imgLoaded?0:1,height:k.height},x&&z)}),k.base64&&l.default.createElement(O,{ariaHidden:!0,src:k.base64,spreadProps:j,imageVariants:U,generateSources:I}),k.tracedSVG&&l.default.createElement(O,{ariaHidden:!0,src:k.tracedSVG,spreadProps:j,imageVariants:U,generateSources:V}),this.state.isVisible&&l.default.createElement("picture",null,y(U),l.default.createElement(C,{alt:a,title:t,width:k.width,height:k.height,sizes:k.sizes,src:k.src,crossOrigin:this.props.crossOrigin,srcSet:k.srcSet,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w,loading:E,draggable:A})),this.addNoScript&&l.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,o.default)({alt:a,title:t,loading:E},k,{imageVariants:U}))}}))}return null},t}(l.default.Component);x.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var T=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),N=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});x.propTypes={resolutions:T,sizes:N,fixed:c.default.oneOfType([T,c.default.arrayOf(T)]),fluid:c.default.oneOfType([N,c.default.arrayOf(N)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var z=x;t.default=z},OGtf:function(e,t,a){var r=a("XKFU"),i=a("eeVq"),n=a("vhPU"),s=/"/g,d=function(e,t,a,r){var i=String(n(e)),d="<"+t;return""!==a&&(d+=" "+a+'="'+String(r).replace(s,"&quot;")+'"'),d+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(d),r(r.P+r.F*i((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3})),"String",a)}},RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return l}));var r=a("cjvj"),i=a("q1tI"),n=a.n(i),s=(a("Wbzz"),a("a/Iw"),a("9eSz")),d=a.n(s),o=a("Bl7J");function l(){var e=r.data;return n.a.createElement(o.a,null,n.a.createElement("div",{style:{minHeight:"50vh",justifySelf:"center",alignSelf:"center",maxWidth:"40rem",textAlign:"center",width:"100%"}},n.a.createElement(d.a,{fluid:e.file.childImageSharp.fluid,alt:"Gatsby Docs are awesome",style:{maxWidth:"100vw"}}),n.a.createElement("h1",{style:{color:"#1890FF",textAlign:"center",fontSize:"10vw"}},"transcribr",n.a.createElement("span",{style:{color:"orange"}},"."))))}},cjvj:function(e){e.exports=JSON.parse('{"data":{"file":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAADaElEQVQ4y4VUWUwTURR9DbhS7XTWgvphTIxRP/RD/UFD1EiiIkRiTASUNVToRiuU0qKsRRZRwViBGGjEJcaIW6LGBUWNKCKCiEuUuO+g4hI0xvHMTFs/NHGSyZu8d++559x73hCCR5t5ntCGVumTaOK8ZHK7SP73iKJIqLTj8jeVdIjQWdeUA236SaLbpgAw1g6VP2FseMYoNu/+DOxFckUvF/FlHyJ492C4NvPcXHVUuc4fR6UelXNo02XC2HsJ4UsH5AM27558MHJa5Ag2tzcKybVc0audQvVPM1f8OpnJ6S7nyz5m0Vnt9bT5SjGAFtDGi2NkUvpTCiHbDaUKEnzrGzVYxQJcL2z5sYsvH0qkTZcaoKKVdT4o5Dd/cqGQC0WauMIXcSiyVKs/TSsM2xQwNv+RvIYsySdgtIjN77eAhR3Jdbrt4jrGer2NSj58gdv0NAdALbx7IF0qxhU8T6MtV51ox1Ipf0qfCMk9AMztVehuuCnwJW9NAErlNj42oB87Gfttu65GrBOqhj3YM4GVjXU9LEGcB+tGkEmHTBuT3TVRxrDfVoHVS7l3XMGzmVJ1BBpoS3s9v3nIzubeKcLqhcwKbWZrDXrXMC66qg0K9mCq1aF1YhxjvVYBoNmK2n4VESq/yYB8+edZkJRCpZ3YpVl3oENXKxr50vd5YFUWtltMUS8r/ape7h4O9YhmxCbDGTGa+Gavdv2ZAtbRx8vDyTirwpTfyZLDGsVgJqdnIbOhMwNDKQEbByo7wNgDwHh4tRHMjgEoTtj6K5pKOeIcv7r+EOu4GxMkTCeqEJYgVhkMAhVTr2lSU4kHTfCaCcwtkFqJoFjI88KHbt0O0YkWWGjzZTOU7ANYwoS94ihZrqNPAQut95k6p0eWPvWVGEwbLkh22If+2oSq73oU6YbBJV8aYCs7BpENG61EsRFSzoRmBQM9B6v4Zrx7YMrOwPVjsm+twH4D3J+OFqRiPwMNT0SBxbDGPPSK89+UMK8CNgtXEU7wXbMIK+EKn/uYdk/iNj1JgjXiYZ2okCWukf+6y9Lt8LdKqPhCNAl7/xximvIKz43DIFZBbvT4VZ6p/vPRcxICMSiswrkK3gvIDAwjAOgeVCpt+R6kWbs/OPCDmG9USZdearj0SpJoY5uvLV2ESmn5i/lvIgJ3g1iExa4AAAAASUVORK5CYII=","aspectRatio":1.3333333333333333,"src":"/static/dc80e348f95f3955be983f3b5dc7e7b5/42dad/wordcloudBlue.png","srcSet":"/static/dc80e348f95f3955be983f3b5dc7e7b5/d639b/wordcloudBlue.png 200w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/8a174/wordcloudBlue.png 400w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/42dad/wordcloudBlue.png 800w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/8e5e6/wordcloudBlue.png 1200w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/35c2d/wordcloudBlue.png 1600w,\\n/static/dc80e348f95f3955be983f3b5dc7e7b5/49742/wordcloudBlue.png 4096w","sizes":"(max-width: 800px) 100vw, 800px"}}}}}')}}]);
//# sourceMappingURL=component---src-pages-index-js-38225ba6cb7f987c0f2a.js.map
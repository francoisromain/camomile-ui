'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var Vuex = require('vuex');
var Vuex__default = _interopDefault(Vuex);
var Camomile = _interopDefault(require('camomile-client'));
var popupAnnotationLabel = _interopDefault(require('~/components/popup/annotation-label.vue'));

function styleInject(css, ref) {
  if ( ref === void 0 ) { ref = {}; }
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* Settings        ------------------------------- */\n\n/* system.css / settings\n-------------------------------\nhttp://francoisromain.github.io/postcss-structure\n*/\n\n:root {\n  /* Colors        ------------------------------- */\n  --color-text: #666;\n  --color-bg: white;\n  --color-transparent: rgba(248, 247, 243, 0);\n  --color-inverse: #3d3d35;\n  --color-neutral: #bcb9af;\n  --color-alt: #f8f7f3;\n  --color-highlight: #f50;\n  --color-brand: rgb(0, 162, 255);\n  --color-error: #e82239;\n  --color-warning: #ff891c;\n  --color-info: #5798aa;\n  --color-success: #6ea040;\n\n  /* Base units    ------------------------------- */\n\n  /* font-size: 1rem = 16 px */\n  --base-font-size: 16px;\n  --base-font-size: 1rem;\n\n  /* base: 1.5rem = 24 px */\n  --unit: 24px;\n  --unit: 1.5rem;\n\n  /* line: 0.0625rem = 1px */\n  --unit-line: 1px;\n  --unit-line: 0.0625rem;\n  --unit-line: calc(var(--unit) / 24);\n\n  /* xxs: 0.1875rem = 3px */\n  --unit-xxs: 3px;\n  --unit-xxs: 0.1875rem;\n  --unit-xxs: calc(var(--unit) / 8);\n\n  /* xs: 0.375rem = 6px */\n  --unit-xs: 6px;\n  --unit-xs: 0.375rem;\n  --unit-xs: calc(var(--unit) / 4);\n\n  /* s: 0.75rem = 12px */\n  --unit-s: 12px;\n  --unit-s: 0.75rem;\n  --unit-s: calc(var(--unit) / 2);\n\n  /* m: 1.125rem = 18px */\n  --unit-m: 18px;\n  --unit-m: 1.125rem;\n  --unit-m: calc(var(--unit) * 3 / 4);\n\n  /* l: 2.25rem = 36 px */\n  --unit-l: 36px;\n  --unit-l: 2.25rem;\n  --unit-l: calc(var(--unit) * 3 / 2);\n\n  /* xl: 3rem = 48px */\n  --unit-xl: 48px;\n  --unit-xl: 3rem;\n  --unit-xl: calc(var(--unit) * 2);\n\n  /* xxl: 3.75rem = 60 px */\n  --unit-xxl: 60px;\n  --unit-xxl: 3.75rem;\n  --unit-xxl: calc(var(--unit) * 2.5);\n\n  /*  */\n  --unit-infinity: 9999px;\n\n  /* Lists         ------------------------------- */\n  --list-postfix: ',';\n  --list-prefix: '―';\n\n  /* Grid          ------------------------------- */\n\n  /*\n  postcss-grid-system configuration\n  https://github.com/francoisromain/postcss-grid-system#configuration\n  */\n\n  /* width of a single bloc in rem */\n  --col-width: 328px;\n  --col-width: 20.5rem;\n\n  /* width of the gutter in rem */\n  --gutter: 24px;\n  --gutter: 1.5rem;\n  --gutter: var(--unit);\n\n  /* padding of the main container in rem */\n  --container-padding: 24px;\n  --container-padding: 1.5rem;\n  --container-padding: var(--unit);\n\n  /* transition */\n  --transition: opacity 0.5s, background-color 0.5s, border 0.5s,\n    box-shadow 0.5s, fill 0.5s;\n\n  /* hr */\n  --border-style: solid;\n  --border-color: #bcb9af;\n  --border-color: var(--color-neutral);\n}\n\n/* media queries: x * col-width + gutter */\n\n/* Reset           ------------------------------- */\n\n/*\n    Print\n-------------------------------\n\nFrom HTML5 Boilerplate\nhttps://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css\n\nBlack prints faster: http://www.sanbeiji.com/archives/953\n*/\n\n@media print {\n  *,\n  *:before,\n  *:after,\n  *:first-letter,\n  *:first-line {\n    background: transparent !important;\n    color: #000 !important;\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]:after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n  Don't show links that are fragment identifiers,\n  or use the `javascript:` pseudo protocol\n  */\n  a[href^='#']:after,\n  a[href^='javascript:']:after {\n    content: '';\n  }\n}\n\n/*\n    Reset\n-------------------------------\n*/\n\n/*\n  css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice\n  paulirish.com/2012/box-sizing-border-box-ftw\n*/\n\nhtml,\n* {\n  box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\nhtml {\n  overflow-y: scroll;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  background-color: white;\n  background-color: var(--color-bg);\n  color: #666;\n  color: var(--color-text);\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue;\n  font-size: 16px;\n  font-size: 1rem;\n  font-size: calc(1 * var(--base-font-size));\n  line-height: 24px;\n  line-height: 1.5rem;\n  line-height: calc(1 * var(--unit));\n}\n\nbody,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\ndl,\ndd,\nol,\nul,\nform,\nfieldset,\nlegend,\nfigure,\ntable,\nth,\ntd,\ncaption,\nhr {\n  margin: 0;\n  padding: 0;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: normal;\n  font-style: normal;\n  text-decoration: none;\n}\n\nabbr[title],\ndfn[title] {\n  cursor: help;\n}\n\nbutton,\ninput,\ntextarea,\nselect,\noptgroup {\n  font: inherit;\n  font-size: 16px;\n  font-size: 1rem;\n  font-size: calc(1 * var(--base-font-size));\n  line-height: 24px;\n  line-height: 1.5rem;\n  line-height: calc(1 * var(--unit));\n  text-align: left;\n}\n\nfieldset {\n  border: 0 none transparent;\n}\n\n*:focus,\ntextarea:focus,\ninput:focus {\n  outline: none;\n  outline: 0;\n}\n\nlabel {\n  cursor: pointer;\n  display: block;\n}\n\nu,\nins {\n  text-decoration: none;\n}\n\nins {\n  border-bottom: 1px solid;\n}\n\nimg, video {\n  max-width: 100%;\n  font-style: italic;\n  vertical-align: middle;\n  height: auto;\n  outline: 0;\n}\n\n/* remove yellow bg on automplete in chrome */\n\ninput:-webkit-autofill,\nselect:-webkit-autofill {\n  -webkit-box-shadow: 0 0 0 1000px white inset;\n}\n\n/* remove round corner on iOs */\n\ninput:not([type='radio']):not([type='checkbox']):not(.rnd),\nselect {\n  -webkit-appearance: none;\n  border-radius: 0;\n}\n\n/* https://github.com/necolas/normalize.css/pull/697/commits/c3762f068feca8e218e69f54daf397cd0f33176d */\n\nbutton,\nhtml [type='button'],\n[type='reset'],\n[type='submit'] {\n  border-radius: 0;\n}\n\n/* Elements        ------------------------------- */\n\n/*\n    Typography\n-------------------------------\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nul,\nol,\ndl,\nblockquote,\np,\naddress,\ntable,\nfieldset,\nfigure,\npre {\n  margin-bottom: 24px;\n  margin-bottom: 1.5rem;\n  margin-bottom: var(--unit);\n}\n\n.h0 {\n  font-size: 95.367px;\n  font-size: 5.96046rem;\n  font-size: calc(5.96046 * var(--base-font-size));\n  line-height: 144px;\n  line-height: 9rem;\n  line-height: calc(6 * var(--unit));\n}\n\nh1,\n.h1 {\n  font-size: 16px;\n  font-size: 1rem;\n  font-size: calc(1 * var(--base-font-size));\n  line-height: 48px;\n  line-height: 3rem;\n  line-height: calc(2 * var(--unit));\n}\n\nh2,\n.h2 {\n  font-size: 16px;\n  font-size: 1rem;\n  font-size: calc(1 * var(--base-font-size));\n  line-height: 24px;\n  line-height: 1.5rem;\n  line-height: calc(1 * var(--unit));\n}\n\nh3,\nh4,\nh5,\n.h5 {\n  font-weight: 700;\n}\n\nh3,\n.h3 {\n  font-size: 16px;\n  font-size: 1rem;\n  font-size: calc(1 * var(--base-font-size));\n  line-height: 24px;\n  line-height: 1.5rem;\n  line-height: calc(1 * var(--unit));\n  border-bottom: 1px solid #bcb9af;\n  border-bottom: 0.0625rem solid #bcb9af;\n  border-bottom: var(--unit-line) var(--border-style) var(--border-color);\n  padding-bottom: 12px;\n  padding-bottom: 0.75rem;\n  padding-bottom: var(--unit-s);\n  margin-bottom: 23px;\n  margin-bottom: 1.4375rem;\n  margin-bottom: calc(var(--unit) - var(--unit-line));\n}\n\nh4,\n.h4 {\n  font-size: 16px;\n  font-size: 1rem;\n  font-size: calc(1 * var(--base-font-size));\n  line-height: 24px;\n  line-height: 1.5rem;\n  line-height: calc(1 * var(--unit));\n}\n\nh5,\n.h5 {\n  font-size: 12.8px;\n  font-size: 0.8rem;\n  font-size: calc(0.8 * var(--base-font-size));\n  line-height: 24px;\n  line-height: 1.5rem;\n  line-height: calc(1 * var(--unit));\n}\n\nh6,\n.h6,\nsmall {\n  font-size: 11.448px;\n  font-size: 0.71554rem;\n  font-size: calc(0.71554 * var(--base-font-size));\n  line-height: 12px;\n  line-height: 0.75rem;\n  line-height: calc(0.5 * var(--unit));\n}\n\nlabel,\nh6 {\n  margin-bottom: 12px;\n  margin-bottom: 0.75rem;\n  margin-bottom: var(--unit-s);\n}\n\nh1,\nh2,\nh5 {\n  font-weight: 700;\n}\n\nblockquote {\n  font-size: 17.888px;\n  font-size: 1.11803rem;\n  font-size: calc(1.11803 * var(--base-font-size));\n  line-height: 36px;\n  line-height: 2.25rem;\n  line-height: calc(1.5 * var(--unit));\n  font-style: italic;\n  background: #f8f7f3;\n  background: var(--color-alt);\n  padding: 24px;\n  padding: 1.5rem;\n  padding: var(--unit);\n  border-left: 1px solid #bcb9af;\n  border-left: 0.0625rem solid #bcb9af;\n  border-left: var(--unit-line) var(--border-style) var(--border-color);\n}\n\nblockquote :last-child {\n  margin-bottom: 0;\n}\n\nhr {\n  border: 0;\n  height: 0;\n  border-top: 1px solid #bcb9af;\n  border-top: 0.0625rem solid #bcb9af;\n  border-top: var(--unit-line) var(--border-style) var(--border-color);\n  margin-bottom: 23px;\n  margin-bottom: 1.4375rem;\n  margin-bottom: calc(var(--unit) - var(--unit-line));\n  clear: both;\n}\n\na {\n  text-decoration: none;\n  color: #f50;\n  color: var(--color-highlight)\n}\n\na:visited {\n  color: #f50;\n  color: var(--color-highlight);\n}\n\na:hover,\n  a:active,\n  a:focus {\n  color: #f50;\n  color: var(--color-highlight);\n}\n\nb,\nstrong,\n.strong,\n.bold {\n  font-weight: 700;\n}\n\ni,\n.italic {\n  font-style: italic;\n}\n\n.cap {\n  text-transform: capitalize;\n}\n\n.caps {\n  text-transform: uppercase;\n  letter-spacing: 0.25em;\n}\n\n.line-through {\n  color: #bcb9af;\n  color: var(--color-neutral);\n  text-decoration: line-through;\n}\n\n.underline {\n  border-bottom: 1px solid;\n}\n\n.nowrap {\n  white-space: nowrap;\n}\n\n.truncate {\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-left {\n  text-align: right;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.mono {\n  font-family: 'Lucida Sans Typewriter', monaco, 'Lucida Console', monospace;\n  font-weight: bold;\n}\n\n/*\n      Lists\n-------------------------------\n\n*/\n\nul,\nol,\ndd {\n  list-style-position: inside;\n\n  /* overflow: auto; */\n}\n\nul > li > ul,\nul > li > ol,\nol > li > ul,\nol > li > ol {\n  margin-left: 36px;\n  margin-left: 2.25rem;\n  margin-left: var(--unit-l);\n}\n\nol {\n  list-style-type: decimal;\n}\n\nli > ul,\n  li > ol {\n  margin-bottom: 0;\n}\n\n.list-sans {\n  padding: 0;\n  list-style: none;\n}\n\n.list-inline {\n  padding: 0;\n  list-style: none;\n  margin-bottom: 18px;\n  margin-bottom: 1.125rem;\n  margin-bottom: calc(var(--unit) - var(--unit-xs))\n}\n\n.list-inline > li:not(.right) {\n  margin-bottom: 6px;\n  margin-bottom: 0.375rem;\n  margin-bottom: var(--unit-xs);\n  margin-right: 6px;\n  margin-right: 0.375rem;\n  margin-right: var(--unit-xs);\n  float: left;\n}\n\n.list-inline > li.right {\n  margin-bottom: 6px;\n  margin-bottom: 0.375rem;\n  margin-bottom: var(--unit-xs);\n  margin-left: 6px;\n  margin-left: 0.375rem;\n  margin-left: var(--unit-xs);\n  float: right;\n}\n\n.list-prefix {\n  list-style: none\n}\n\n.list-prefix > li:before {\n  content: '―';\n  content: var(--list-prefix);\n  margin-right: 6px;\n  margin-right: 0.375rem;\n  margin-right: var(--unit-xs);\n  color: #bcb9af;\n  color: var(--color-neutral);\n}\n\n.list-postfix {\n  list-style: none\n}\n\n.list-postfix > li:after {\n  content: ',';\n  content: var(--list-postfix);\n}\n\n.list-inline.list-postfix li:last-child:after {\n  content: none;\n}\n\n/*\n    Table\n-------------------------------\n*/\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  border: none;\n}\n\nth {\n  text-align: left;\n  font-weight: 700;\n  font-size: 12.8px;\n  font-size: 0.8rem;\n  font-size: calc(0.8 * var(--base-font-size));\n  line-height: 12px;\n  line-height: 0.75rem;\n  line-height: calc(0.5 * var(--unit));\n}\n\ntr {\n  border-bottom: 1px solid #bcb9af;\n  border-bottom: 0.0625rem solid #bcb9af;\n  border-bottom: var(--unit-line) var(--border-style) var(--border-color);\n}\n\ntd,\nth {\n  vertical-align: top;\n  word-wrap: break-word;\n  padding-bottom: 12px;\n  padding-bottom: 0.75rem;\n  padding-bottom: var(--unit-s);\n  padding-top: 11px;\n  padding-top: 0.6875rem;\n  padding-top: calc(var(--unit-s) - var(--unit-line));\n}\n\n.table-xs td,\n.table-xs th {\n  padding-top: 6px;\n  padding-top: 0.375rem;\n  padding-top: var(--unit-xs);\n  padding-bottom: 5px;\n  padding-bottom: 0.3125rem;\n  padding-bottom: calc(var(--unit-xs) - var(--unit-line));\n}\n\n.table-xxs td,\n.table-xxs th {\n  padding-top: 3px;\n  padding-top: 0.1875rem;\n  padding-top: var(--unit-xxs);\n  padding-bottom: 2px;\n  padding-bottom: 0.125rem;\n  padding-bottom: calc(var(--unit-xxs) - var(--unit-line));\n}\n\n.table-fixed {\n  display: table;\n  table-layout: fixed;\n}\n\n/*\n      Buttons\n-------------------------------\n*/\n\n.btn,.btn:visited {\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  display: inline-block;\n  color: var(--color-text);\n  background-color: var(--color-alt);\n  font-weight: 700;\n  border-radius: 0.1875rem;\n  border-radius: var(--unit-xxs);\n}\n\n.btn:active,.btn.active {\n  color: var(--color-inverse);\n  background-color: var(--color-alt);\n}\n\n.btn:hover,.btn.active:hover {\n  color: var(--color-bg);\n  background-color: var(--color-highlight);\n}\n\n.btn:disabled,.btn:disabled:active,.btn:disabled:hover,.btn.disabled,.btn.disabled:active,.btn.disabled:hover {\n  opacity: 0.25;\n  cursor: default;\n  color: var(--color-text);\n  background-color: var(--color-alt);\n  box-shadow: inset 0 0 0 0 grey;\n}\n\n.btn-border,.btn-border:visited {\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  display: inline-block;\n  color: var(--color-text);\n  background-color: var(--color-alt);\n  box-shadow: inset 0 0 0 var(--unit-line) var(--color-neutral);\n}\n\n.btn-border:active,.btn-border.active {\n  color: var(--color-inverse);\n  background-color: var(--color-bg);\n  box-shadow: inset 0 0 0 var(--unit-line) var(--color-highlight);\n}\n\n.btn-border:hover,.btn-border.active:hover {\n  color: var(--color-inverse);\n  background-color: var(--color-bg);\n  box-shadow: inset 0 0 0 var(--unit-line) var(--color-highlight);\n}\n\n.btn-border:disabled,.btn-border:disabled:active,.btn-border:disabled:hover,.btn-border.disabled,.btn-border.disabled:active,.btn-border.disabled:hover {\n  opacity: 0.25;\n  cursor: default;\n  color: var(--color-text);\n  background-color: var(--color-alt);\n  box-shadow: inset 0 0 0 var(--unit-line) var(--color-neutral);\n}\n\n.tag .btn,.tag:visited .btn,\n.btn-alt,.btn-alt:visited {\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  display: inline-block;\n  color: var(--color-bg);\n  background-color: var(--color-neutral);\n  font-weight: 700;\n}\n\n.tag:active .btn,.tag.active .btn, .btn-alt:active,.btn-alt.active {\n  color: var(--color-bg);\n  background-color: var(--color-inverse);\n}\n\n.tag:hover .btn,.tag.active:hover .btn, .btn-alt:hover,.btn-alt.active:hover {\n  color: var(--color-bg);\n  background-color: var(--color-highlight);\n}\n\n.tag:disabled .btn,.tag:disabled:active .btn,.tag:disabled:hover .btn,.tag.disabled .btn,.tag.disabled:active .btn,.tag.disabled:hover .btn, .btn-alt:disabled,.btn-alt:disabled:active,.btn-alt:disabled:hover,.btn-alt.disabled,.btn-alt.disabled:active,.btn-alt.disabled:hover {\n  opacity: 0.25;\n  cursor: default;\n  color: var(--color-bg);\n  background-color: var(--color-neutral);\n  box-shadow: inset 0 0 0 0 grey;\n}\n\n.btn,\n.btn-alt,\n.btn-border,\n.btn-transparent {\n  transition: opacity 0.5s, background-color 0.5s, border 0.5s,\n    box-shadow 0.5s, fill 0.5s;\n  transition: var(--transition);\n}\n\n.btn-icon {\n  line-height: 16px;\n  line-height: 1rem;\n}\n\n/*\n      Forms\n-------------------------------\n*/\n\ninput[type='text'],\ninput[type='email'],\ninput[type='search'],\ninput[type='password'],\ninput[type='tel'],\nselect,\ntextarea {\n  width: 100%;\n  padding: 12px;\n  padding: 0.75rem;\n  padding: var(--unit-s);\n  border: 0 none;\n  background-color: #f8f7f3;\n  background-color: var(--color-alt);\n  height: auto;\n  color: inherit;\n}\n\nselect {\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%233d3d35' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Cpath d='M22 9L12 19 2 9'/%3E %3C/svg%3E\"\n  );\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='var(--color-inverse)' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Cpath d='M22 9L12 19 2 9'/%3E %3C/svg%3E\"\n  );\n  background-position: right 12px center;\n  background-position: right 0.75rem center;\n  background-position: right var(--unit-s) center;\n  background-repeat: no-repeat;\n\n  /* for FF: http://stackoverflow.com/a/18317228/2112538 */\n  -moz-appearance: none;\n  text-indent: 0.01px;\n  text-overflow: ellipsis;\n}\n\ntextarea {\n  /* http://stackoverflow.com/a/5196591/2112538 */\n  vertical-align: top;\n  resize: vertical;\n}\n\ntextarea:focus,\ninput:focus,\nselect:focus {\n  border-right: 12px solid #f50;\n  border-right: 0.75rem solid #f50;\n  border-right: var(--unit-s) solid var(--color-highlight);\n}\n\ninput[type='text'].input-alt,\ninput[type='email'].input-alt,\ninput[type='search'].input-alt,\ninput[type='password'].input-alt,\ninput[type='tel'].input-alt,\nselect.select-alt,\ntextarea.textarea-alt {\n  background-color: white;\n  background-color: var(--color-bg);\n}\n\ninput.success {\n  border-right: 12px solid #6ea040;\n  border-right: 0.75rem solid #6ea040;\n  border-right: var(--unit-s) solid var(--color-success);\n}\n\ninput.error {\n  border-right: 12px solid #e82239;\n  border-right: 0.75rem solid #e82239;\n  border-right: var(--unit-s) solid var(--color-error);\n}\n\ninput:disabled,\ntextarea:disabled,\nselect:disabled {\n  background-color: rgba(248, 247, 243, 0.5);\n  background-color: rgba(248, 247, 243, 0.5);\n}\n\ninput.input-alt:disabled,\ntextarea.textarea-alt:disabled,\nselect.select-alt:disabled {\n  background-color: rgba(255, 255, 255, 0.5);\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n*::-webkit-input-placeholder {\n  /* WebKit, Blink, Edge */\n  color: #bcb9af;\n  color: var(--color-neutral);\n}\n\n*:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #bcb9af;\n  color: var(--color-neutral);\n  opacity: 1;\n}\n\n*::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #bcb9af;\n  color: var(--color-neutral);\n  opacity: 1;\n}\n\n*:-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: #bcb9af;\n  color: var(--color-neutral);\n}\n\n*::-ms-input-placeholder {\n  /* Microsoft Edge */\n  color: #bcb9af;\n  color: var(--color-neutral);\n}\n\n/* Layout          ------------------------------- */\n\n/* @import 'system/grid-system.css'; */\n\n/*\n      postcss-grid-fluid\n-------------------------------\n\nhttps://github.com/francoisromain/postcss-grid-fluid\n*/\n\n.bloc-code,\n.blob-1,\n.blob-1-2,\n.blob-1-3,\n.blob-2-3,\n.blob-1-4,\n.blob-3-4,\n.blob-btn,\n.blob-3-4-btn {\n  margin-bottom: 24px;\n  margin-bottom: 1.5rem;\n  margin-bottom: var(--unit);\n}\n\n.blobs-default {\n  clear: both;\n  margin-right: calc(-1 * var(--gutter));\n  display: flex;\n  flex-flow: row wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n}\n\n.blobs-default::after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n.blob-default {\n  margin-right: 24px;\n  margin-right: 1.5rem;\n  margin-right: var(--gutter);\n  flex: 0 1 0;\n}\n\n@media (min-width: 42.5em) {\n  .blobs {\n    clear: both;\n    margin-right: calc(-1 * var(--gutter));\n    display: flex;\n    flex-flow: row wrap;\n    align-items: flex-start;\n    align-content: flex-start;\n  }\n  .blobs::after {\n    content: \"\";\n    display: table;\n    clear: both;\n  }\n\n  .blob {\n    margin-right: 1.5rem;\n    margin-right: var(--gutter);\n    margin-bottom: 1.5rem;\n    margin-bottom: var(--gutter);\n    flex: 0 1 0;\n  }\n\n  .blob-auto {\n    margin-right: 1.5rem;\n    margin-right: var(--gutter);\n    margin-bottom: 1.5rem;\n    margin-bottom: var(--gutter);\n    flex: 0 1 auto;\n  }\n\n  .blob-1 {\n    margin-right: var(--gutter);\n    margin-bottom: var(--gutter);\n    flex: 0 1 calc(100% - var(--gutter));\n  }\n\n  .blob-code,\n  .blob-1-2 {\n    margin-right: var(--gutter);\n    margin-bottom: var(--gutter);\n    flex: 0 1 calc(50% - var(--gutter));\n  }\n\n  .blob-1-3 {\n    margin-right: var(--gutter);\n    margin-bottom: var(--gutter);\n    flex: 0 1 calc(33.333333333333336% - var(--gutter));\n  }\n\n  .blob-2-3 {\n    margin-right: var(--gutter);\n    margin-bottom: var(--gutter);\n    flex: 0 1 calc(66.66666666666667% - var(--gutter));\n  }\n\n  .blob-1-4 {\n    margin-right: var(--gutter);\n    margin-bottom: var(--gutter);\n    flex: 0 1 calc(25% - var(--gutter));\n  }\n\n  .blob-3-4 {\n    margin-right: var(--gutter);\n    margin-bottom: var(--gutter);\n    flex: 0 1 calc(75% - var(--gutter));\n  }\n\n  .blob-btn {\n    margin-right: 1.5rem;\n    margin-right: var(--gutter);\n    margin-bottom: 1.5rem;\n    margin-bottom: var(--gutter);\n    flex: 0 1 3rem;\n  }\n\n  .blob-3-4-btn {\n    margin-right: 1.5rem;\n    margin-right: var(--gutter);\n    margin-bottom: 1.5rem;\n    margin-bottom: var(--gutter);\n    flex: 0 1 calc(75% - 6rem);\n    flex: 0 1 calc(75% - var(--gutter) - 3rem - var(--gutter));\n  }\n}\n\n/*\n    Utils\n-------------------------------\n*/\n\n/*\nhttp://cssmojo.com/the-very-latest-clearfix-reloaded/\n*/\n\n.clearfix:before,\n.clearfix:after {\n  content: '';\n  display: block;\n  clear: both;\n}\n\n.hide {\n  display: none;\n  visibility: hidden;\n}\n\n.pointer {\n  cursor: pointer;\n}\n\n.pointer-none {\n  pointer-events: none;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.inline-block {\n  display: inline-block;\n}\n\n.flex {\n  display: flex;\n}\n\n.flex-start {\n  align-items: flex-start;\n}\n\n.flex-direction-column {\n  flex-direction: column;\n}\n\n.left {\n  float: left;\n}\n\n.right {\n  float: right;\n}\n\n.flex-right {\n  margin-left: auto;\n}\n\n.relative {\n  position: relative;\n}\n\n.fixed {\n  position: fixed;\n}\n\n.absolute {\n  position: absolute;\n}\n\n.center {\n  left: 50%;\n  transform: translate(-50%, 0);\n}\n\n.full {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.full-x {\n  width: 100%;\n}\n\n.full-y {\n  height: 100%;\n}\n\n/*\n      Margins\n-------------------------------\n\n*/\n\n.m {\n  margin: 24px;\n  margin: 1.5rem;\n  margin: var(--unit);\n}\n\n.m-xxs {\n  margin: 3px;\n  margin: 0.1875rem;\n  margin: var(--unit-xxs);\n}\n\n.m-xs {\n  margin: 6px;\n  margin: 0.375rem;\n  margin: var(--unit-xs);\n}\n\n.m-s {\n  margin: 12px;\n  margin: 0.75rem;\n  margin: var(--unit-s);\n}\n\n.m-m {\n  margin: 18px;\n  margin: 1.125rem;\n  margin: var(--unit-m);\n}\n\n.m-l {\n  margin: 36px;\n  margin: 2.25rem;\n  margin: var(--unit-l);\n}\n\n.m-xl {\n  margin: 48px;\n  margin: 3rem;\n  margin: var(--unit-xl);\n}\n\n.m-0 {\n  margin: 0;\n}\n\n.mr {\n  margin-right: 24px;\n  margin-right: 1.5rem;\n  margin-right: var(--unit);\n}\n\n.mr-xxs {\n  margin-right: 3px;\n  margin-right: 0.1875rem;\n  margin-right: var(--unit-xxs);\n}\n\n.mr-xs {\n  margin-right: 6px;\n  margin-right: 0.375rem;\n  margin-right: var(--unit-xs);\n}\n\n.mr-s {\n  margin-right: 12px;\n  margin-right: 0.75rem;\n  margin-right: var(--unit-s);\n}\n\n.mr-m {\n  margin-right: 18px;\n  margin-right: 1.125rem;\n  margin-right: var(--unit-m);\n}\n\n.mr-l {\n  margin-right: 36px;\n  margin-right: 2.25rem;\n  margin-right: var(--unit-l);\n}\n\n.mr-xl {\n  margin-right: 48px;\n  margin-right: 3rem;\n  margin-right: var(--unit-xl);\n}\n\n.mr-0 {\n  margin-right: 0;\n}\n\n.ml {\n  margin-left: 24px;\n  margin-left: 1.5rem;\n  margin-left: var(--unit);\n}\n\n.ml-xxs {\n  margin-left: 3px;\n  margin-left: 0.1875rem;\n  margin-left: var(--unit-xxs);\n}\n\n.ml-xs {\n  margin-left: 6px;\n  margin-left: 0.375rem;\n  margin-left: var(--unit-xs);\n}\n\n.ml-s {\n  margin-left: 12px;\n  margin-left: 0.75rem;\n  margin-left: var(--unit-s);\n}\n\n.ml-m {\n  margin-left: 18px;\n  margin-left: 1.125rem;\n  margin-left: var(--unit-m);\n}\n\n.ml-l {\n  margin-left: 36px;\n  margin-left: 2.25rem;\n  margin-left: var(--unit-l);\n}\n\n.ml-xl {\n  margin-left: 48px;\n  margin-left: 3rem;\n  margin-left: var(--unit-xl);\n}\n\n.ml-0 {\n  margin-left: 0;\n}\n\n.mt {\n  margin-top: 24px;\n  margin-top: 1.5rem;\n  margin-top: var(--unit);\n}\n\n.mt-xxs {\n  margin-top: 3px;\n  margin-top: 0.1875rem;\n  margin-top: var(--unit-xxs);\n}\n\n.mt-xs {\n  margin-top: 6px;\n  margin-top: 0.375rem;\n  margin-top: var(--unit-xs);\n}\n\n.mt-s {\n  margin-top: 12px;\n  margin-top: 0.75rem;\n  margin-top: var(--unit-s);\n}\n\n.mt-m {\n  margin-top: 18px;\n  margin-top: 1.125rem;\n  margin-top: var(--unit-m);\n}\n\n.mt-l {\n  margin-top: 36px;\n  margin-top: 2.25rem;\n  margin-top: var(--unit-l);\n}\n\n.mt-xl {\n  margin-top: 48px;\n  margin-top: 3rem;\n  margin-top: var(--unit-xl);\n}\n\n.mt-xxl {\n  margin-top: 60px;\n  margin-top: 3.75rem;\n  margin-top: var(--unit-xxl);\n}\n\n.mt-0 {\n  margin-top: 0;\n}\n\n.mb {\n  margin-bottom: 24px;\n  margin-bottom: 1.5rem;\n  margin-bottom: var(--unit);\n}\n\n.mb-xxs {\n  margin-bottom: 3px;\n  margin-bottom: 0.1875rem;\n  margin-bottom: var(--unit-xxs);\n}\n\n.mb-xs {\n  margin-bottom: 6px;\n  margin-bottom: 0.375rem;\n  margin-bottom: var(--unit-xs);\n}\n\n.mb-s {\n  margin-bottom: 12px;\n  margin-bottom: 0.75rem;\n  margin-bottom: var(--unit-s);\n}\n\n.mb-m {\n  margin-bottom: 18px;\n  margin-bottom: 1.125rem;\n  margin-bottom: var(--unit-m);\n}\n\n.mb-l {\n  margin-bottom: 36px;\n  margin-bottom: 2.25rem;\n  margin-bottom: var(--unit-l);\n}\n\n.mb-xl {\n  margin-bottom: 48px;\n  margin-bottom: 3rem;\n  margin-bottom: var(--unit-xl);\n}\n\n.mb-xxl {\n  margin-bottom: 60px;\n  margin-bottom: 3.75rem;\n  margin-bottom: var(--unit-xxl);\n}\n\n.mb-0 {\n  margin-bottom: 0;\n}\n\n.mx {\n  margin-right: 24px;\n  margin-right: 1.5rem;\n  margin-right: var(--unit);\n  margin-left: 24px;\n  margin-left: 1.5rem;\n  margin-left: var(--unit);\n}\n\n.mx-xxs {\n  margin-right: 3px;\n  margin-right: 0.1875rem;\n  margin-right: var(--unit-xxs);\n  margin-left: 3px;\n  margin-left: 0.1875rem;\n  margin-left: var(--unit-xxs);\n}\n\n.mx-xs {\n  margin-right: 6px;\n  margin-right: 0.375rem;\n  margin-right: var(--unit-xs);\n  margin-left: 6px;\n  margin-left: 0.375rem;\n  margin-left: var(--unit-xs);\n}\n\n.mx-s {\n  margin-right: 12px;\n  margin-right: 0.75rem;\n  margin-right: var(--unit-s);\n  margin-left: 12px;\n  margin-left: 0.75rem;\n  margin-left: var(--unit-s);\n}\n\n.mx-m {\n  margin-right: 18px;\n  margin-right: 1.125rem;\n  margin-right: var(--unit-m);\n  margin-left: 18px;\n  margin-left: 1.125rem;\n  margin-left: var(--unit-m);\n}\n\n.mx-l {\n  margin-right: 36px;\n  margin-right: 2.25rem;\n  margin-right: var(--unit-l);\n  margin-left: 36px;\n  margin-left: 2.25rem;\n  margin-left: var(--unit-l);\n}\n\n.mx-xl {\n  margin-right: 48px;\n  margin-right: 3rem;\n  margin-right: var(--unit-xl);\n  margin-left: 48px;\n  margin-left: 3rem;\n  margin-left: var(--unit-xl);\n}\n\n.mx-xxl {\n  margin-right: 60px;\n  margin-right: 3.75rem;\n  margin-right: var(--unit-xxl);\n  margin-left: 60px;\n  margin-left: 3.75rem;\n  margin-left: var(--unit-xxl);\n}\n\n.mx-0 {\n  margin-right: 0;\n  margin-left: 0;\n}\n\n.my {\n  margin-top: 24px;\n  margin-top: 1.5rem;\n  margin-top: var(--unit);\n  margin-bottom: 24px;\n  margin-bottom: 1.5rem;\n  margin-bottom: var(--unit);\n}\n\n.my-xxs {\n  margin-top: 3px;\n  margin-top: 0.1875rem;\n  margin-top: var(--unit-xxs);\n  margin-bottom: 3px;\n  margin-bottom: 0.1875rem;\n  margin-bottom: var(--unit-xxs);\n}\n\n.my-xs {\n  margin-top: 6px;\n  margin-top: 0.375rem;\n  margin-top: var(--unit-xs);\n  margin-bottom: 6px;\n  margin-bottom: 0.375rem;\n  margin-bottom: var(--unit-xs);\n}\n\n.my-s {\n  margin-top: 12px;\n  margin-top: 0.75rem;\n  margin-top: var(--unit-s);\n  margin-bottom: 12px;\n  margin-bottom: 0.75rem;\n  margin-bottom: var(--unit-s);\n}\n\n.my-m {\n  margin-top: 18px;\n  margin-top: 1.125rem;\n  margin-top: var(--unit-m);\n  margin-bottom: 18px;\n  margin-bottom: 1.125rem;\n  margin-bottom: var(--unit-m);\n}\n\n.my-l {\n  margin-top: 36px;\n  margin-top: 2.25rem;\n  margin-top: var(--unit-l);\n  margin-bottom: 36px;\n  margin-bottom: 2.25rem;\n  margin-bottom: var(--unit-l);\n}\n\n.my-xl {\n  margin-top: 48px;\n  margin-top: 3rem;\n  margin-top: var(--unit-xl);\n  margin-bottom: 48px;\n  margin-bottom: 3rem;\n  margin-bottom: var(--unit-xl);\n}\n\n.my-0 {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.mt--m {\n  margin-top: -18px;\n  margin-top: -1.125rem;\n  margin-top: calc(var(--unit-m) * -1);\n}\n\n.my--s {\n  margin-top: -12px;\n  margin-top: -0.75rem;\n  margin-top: calc(var(--unit-s) * -1);\n  margin-bottom: -12px;\n  margin-bottom: -0.75rem;\n  margin-bottom: calc(var(--unit-s) * -1);\n}\n\n.my--xs {\n  margin-top: -6px;\n  margin-top: -0.375rem;\n  margin-top: calc(var(--unit-xs) * -1);\n  margin-bottom: -6px;\n  margin-bottom: -0.375rem;\n  margin-bottom: calc(var(--unit-xs) * -1);\n}\n\n/*\n    Padding\n-------------------------------\n*/\n\n.p {\n  padding: 24px;\n  padding: 1.5rem;\n  padding: var(--unit);\n}\n\n.p-xxs {\n  padding: 3px;\n  padding: 0.1875rem;\n  padding: var(--unit-xxs);\n}\n\n.p-xs {\n  padding: 6px;\n  padding: 0.375rem;\n  padding: var(--unit-xs);\n}\n\n.p-s {\n  padding: 12px;\n  padding: 0.75rem;\n  padding: var(--unit-s);\n}\n\n.p-m {\n  padding: 18px;\n  padding: 1.125rem;\n  padding: var(--unit-m);\n}\n\n.p-l {\n  padding: 36px;\n  padding: 2.25rem;\n  padding: var(--unit-l);\n}\n\n.p-xl {\n  padding: 48px;\n  padding: 3rem;\n  padding: var(--unit-xl);\n}\n\n.p-xxl {\n  padding: 60px;\n  padding: 3.75rem;\n  padding: var(--unit-xxl);\n}\n\n.px {\n  padding-left: 24px;\n  padding-left: 1.5rem;\n  padding-left: var(--unit);\n  padding-right: 24px;\n  padding-right: 1.5rem;\n  padding-right: var(--unit);\n}\n\n.px-xxs {\n  padding-left: 3px;\n  padding-left: 0.1875rem;\n  padding-left: var(--unit-xxs);\n  padding-right: 3px;\n  padding-right: 0.1875rem;\n  padding-right: var(--unit-xxs);\n}\n\n.px-xs {\n  padding-left: 6px;\n  padding-left: 0.375rem;\n  padding-left: var(--unit-xs);\n  padding-right: 6px;\n  padding-right: 0.375rem;\n  padding-right: var(--unit-xs);\n}\n\n.px-s {\n  padding-left: 12px;\n  padding-left: 0.75rem;\n  padding-left: var(--unit-s);\n  padding-right: 12px;\n  padding-right: 0.75rem;\n  padding-right: var(--unit-s);\n}\n\n.px-m {\n  padding-left: 18px;\n  padding-left: 1.125rem;\n  padding-left: var(--unit-m);\n  padding-right: 18px;\n  padding-right: 1.125rem;\n  padding-right: var(--unit-m);\n}\n\n.px-l {\n  padding-left: 36px;\n  padding-left: 2.25rem;\n  padding-left: var(--unit-l);\n  padding-right: 36px;\n  padding-right: 2.25rem;\n  padding-right: var(--unit-l);\n}\n\n.px-xl {\n  padding-left: 48px;\n  padding-left: 3rem;\n  padding-left: var(--unit-xl);\n  padding-right: 48px;\n  padding-right: 3rem;\n  padding-right: var(--unit-xl);\n}\n\n.px-xxl {\n  padding-left: 60px;\n  padding-left: 3.75rem;\n  padding-left: var(--unit-xxl);\n  padding-right: 60px;\n  padding-right: 3.75rem;\n  padding-right: var(--unit-xxl);\n}\n\n.py {\n  padding-top: 24px;\n  padding-top: 1.5rem;\n  padding-top: var(--unit);\n  padding-bottom: 24px;\n  padding-bottom: 1.5rem;\n  padding-bottom: var(--unit);\n}\n\n.py-xxs {\n  padding-top: 3px;\n  padding-top: 0.1875rem;\n  padding-top: var(--unit-xxs);\n  padding-bottom: 3px;\n  padding-bottom: 0.1875rem;\n  padding-bottom: var(--unit-xxs);\n}\n\n.py-xs {\n  padding-top: 6px;\n  padding-top: 0.375rem;\n  padding-top: var(--unit-xs);\n  padding-bottom: 6px;\n  padding-bottom: 0.375rem;\n  padding-bottom: var(--unit-xs);\n}\n\n.py-s {\n  padding-top: 12px;\n  padding-top: 0.75rem;\n  padding-top: var(--unit-s);\n  padding-bottom: 12px;\n  padding-bottom: 0.75rem;\n  padding-bottom: var(--unit-s);\n}\n\n.py-m {\n  padding-top: 18px;\n  padding-top: 1.125rem;\n  padding-top: var(--unit-m);\n  padding-bottom: 18px;\n  padding-bottom: 1.125rem;\n  padding-bottom: var(--unit-m);\n}\n\n.py-l {\n  padding-top: 36px;\n  padding-top: 2.25rem;\n  padding-top: var(--unit-l);\n  padding-bottom: 36px;\n  padding-bottom: 2.25rem;\n  padding-bottom: var(--unit-l);\n}\n\n.py-xl {\n  padding-top: 48px;\n  padding-top: 3rem;\n  padding-top: var(--unit-xl);\n  padding-bottom: 48px;\n  padding-bottom: 3rem;\n  padding-bottom: var(--unit-xl);\n}\n\n.py-xxl {\n  padding-top: 60px;\n  padding-top: 3.75rem;\n  padding-top: var(--unit-xxl);\n  padding-bottom: 60px;\n  padding-bottom: 3.75rem;\n  padding-bottom: var(--unit-xxl);\n}\n\n.pt {\n  padding-top: 24px;\n  padding-top: 1.5rem;\n  padding-top: var(--unit);\n}\n\n.pt-xxs {\n  padding-top: 3px;\n  padding-top: 0.1875rem;\n  padding-top: var(--unit-xxs);\n}\n\n.pt-xs {\n  padding-top: 6px;\n  padding-top: 0.375rem;\n  padding-top: var(--unit-xs);\n}\n\n.pt-s {\n  padding-top: 12px;\n  padding-top: 0.75rem;\n  padding-top: var(--unit-s);\n}\n\n.pt-m {\n  padding-top: 18px;\n  padding-top: 1.125rem;\n  padding-top: var(--unit-m);\n}\n\n.pt-l {\n  padding-top: 36px;\n  padding-top: 2.25rem;\n  padding-top: var(--unit-l);\n}\n\n.pt-xl {\n  padding-top: 48px;\n  padding-top: 3rem;\n  padding-top: var(--unit-xl);\n}\n\n.pt-xxl {\n  padding-top: 60px;\n  padding-top: 3.75rem;\n  padding-top: var(--unit-xxl);\n}\n\n.pb {\n  padding-bottom: 24px;\n  padding-bottom: 1.5rem;\n  padding-bottom: var(--unit);\n}\n\n.pb-xxs {\n  padding-bottom: 3px;\n  padding-bottom: 0.1875rem;\n  padding-bottom: var(--unit-xxs);\n}\n\n.pb-xs {\n  padding-bottom: 6px;\n  padding-bottom: 0.375rem;\n  padding-bottom: var(--unit-xs);\n}\n\n.pb-s {\n  padding-bottom: 12px;\n  padding-bottom: 0.75rem;\n  padding-bottom: var(--unit-s);\n}\n\n.pb-m {\n  padding-bottom: 18px;\n  padding-bottom: 1.125rem;\n  padding-bottom: var(--unit-m);\n}\n\n.pb-l {\n  padding-bottom: 36px;\n  padding-bottom: 2.25rem;\n  padding-bottom: var(--unit-l);\n}\n\n.pb-xl {\n  padding-bottom: 48px;\n  padding-bottom: 3rem;\n  padding-bottom: var(--unit-xl);\n}\n\n.pb-xxl {\n  padding-bottom: 60px;\n  padding-bottom: 3.75rem;\n  padding-bottom: var(--unit-xxl);\n}\n\n/* Ui             ------------------------------- */\n\n/*\n    Colors\n-------------------------------\n*/\n\n.color-bg {\n  color: white;\n  color: var(--color-bg);\n}\n\n.color-highlight {\n  color: #f50;\n  color: var(--color-highlight);\n}\n\n.color-alt {\n  color: #f8f7f3;\n  color: var(--color-alt);\n}\n\n.color-neutral {\n  color: #bcb9af;\n  color: var(--color-neutral);\n}\n\n.color-inverse {\n  color: #3d3d35;\n  color: var(--color-inverse);\n}\n\n.bg-bg {\n  background-color: white;\n  background-color: var(--color-bg);\n}\n\n.bg-highlight {\n  background-color: #f50;\n  background-color: var(--color-highlight);\n}\n\n.bg-alt {\n  background-color: #f8f7f3;\n  background-color: var(--color-alt);\n}\n\n.bg-neutral {\n  background-color: #bcb9af;\n  background-color: var(--color-neutral);\n}\n\n.bg-inverse {\n  background-color: #3d3d35;\n  background-color: var(--color-inverse);\n}\n\n.bg-info {\n  background: #5798aa;\n  background: var(--color-info);\n}\n\n.bg-error {\n  background: #e82239;\n  background: var(--color-error);\n}\n\n.bg-warning {\n  background: #ff891c;\n  background: var(--color-warning);\n}\n\n.bg-success {\n  background: #6ea040;\n  background: var(--color-success);\n}\n\n.bg-bg-alpha {\n  background-color: rgba(255, 255, 255, 0.5);\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n.bg-alt-alpha {\n  background-color: rgba(248, 247, 243, 0.5);\n  background-color: rgba(248, 247, 243, 0.5);\n}\n\n.border-bg {\n  border-color: white;\n  border-color: var(--color-bg);\n}\n\n/*\n    UI elements\n-------------------------------\n*/\n\n.pill {\n  border-radius: 9999px;\n  border-radius: var(--unit-infinity);\n}\n\n.rnd {\n  border-radius: 0.375rem;\n  border-radius: var(--unit-xs);\n}\n\n.border-bottom {\n  border-bottom: 1px solid;\n  border-bottom: 0.0625rem solid;\n  border-bottom: var(--unit-line) var(--border-style);\n  margin-bottom: 23px;\n  margin-bottom: 1.4375rem;\n  margin-bottom: calc(var(--unit) - var(--unit-line));\n  border-color: #bcb9af;\n  border-color: var(--border-color);\n}\n\n.border {\n  border: 1px solid;\n  border: 0.0625rem solid;\n  border: var(--unit-line) var(--border-style);\n  border-color: #bcb9af;\n  border-color: var(--border-color);\n  padding: 23px\n    23px 24px;\n  padding: 1.4375rem\n    1.4375rem 1.5rem;\n  padding: calc(var(--unit) - var(--unit-line))\n    calc(var(--unit) - var(--unit-line)) var(--unit);\n  margin-bottom: 23px;\n  margin-bottom: 1.4375rem;\n  margin-bottom: calc(var(--unit) - var(--unit-line));\n}\n\n.tooltip {\n  position: relative;\n}\n\n.tooltip span {\n  position: absolute;\n  color: #f8f7f3;\n  color: var(--color-alt);\n  background: #bcb9af;\n  background: var(--color-neutral);\n  text-align: center;\n  border-radius: 0.375rem;\n  border-radius: var(--unit-xs);\n  top: -48px;\n  top: -3rem;\n  top: calc(var(--unit-xl) * -1);\n  right: 0;\n  padding: 6px;\n  padding: 0.375rem;\n  padding: var(--unit-xs);\n  z-index: 999;\n}\n\n.tooltip span:after {\n  content: '';\n  position: absolute;\n  top: 100%;\n  right: 24px;\n  right: 1.5rem;\n  right: var(--unit);\n  border-top: 6px solid #bcb9af;\n  border-top: 0.375rem solid #bcb9af;\n  border-top: var(--unit-xs) solid var(--color-neutral);\n  border-right: 6px solid transparent;\n  border-right: 0.375rem solid transparent;\n  border-right: var(--unit-xs) solid transparent;\n  border-left: 6px solid transparent;\n  border-left: 0.375rem solid transparent;\n  border-left: var(--unit-xs) solid transparent;\n}\n\npre code {\n  display: block;\n}\n\ncode {\n  background-color: #f8f7f3;\n  background-color: var(--color-alt);\n  padding: 6px 12px;\n  padding: 0.375rem 0.75rem;\n  padding: var(--unit-xs) var(--unit-s);\n  border-radius: 0.375rem;\n  border-radius: var(--unit-xs);\n  white-space: pre;\n  -webkit-hyphens: none;\n      -ms-hyphens: none;\n          hyphens: none;\n  word-wrap: break-word;\n}\n\n.icon {\n  width: 100%;\n  height: 100%;\n  display: inline-block;\n  vertical-align: middle;\n  background-size: cover;\n}\n\n.icon-8 {\n  width: 8px;\n  width: 0.5rem;\n  width: calc(var(--base-font-size) / 2);\n  height: 8px;\n  height: 0.5rem;\n  height: calc(var(--base-font-size) / 2);\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.icon-24 {\n  width: 24px;\n  width: 1.5rem;\n  width: var(--unit);\n  height: 24px;\n  height: 1.5rem;\n  height: var(--unit);\n  display: inline-block;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n}\n\n.icon-48 {\n  width: 48px;\n  width: 3rem;\n  width: var(--unit-xl);\n  height: 48px;\n  height: 3rem;\n  height: var(--unit-xl);\n  display: inline-block;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n}\n\n.icon-24-close {\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Cpath class='st0' d='M2 2l20 20m0-20L2 22'/%3E %3C/svg%3E\"\n  );\n}\n\n.btn:hover .icon-24-close {\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Cpath class='st0' d='M2 2l20 20m0-20L2 22'/%3E %3C/svg%3E\"\n  );\n}\n\n.icon-24-plus {\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Cpath class='st0' d='M1.5 11.5h20m-10 10v-20'/%3E %3C/svg%3E\"\n  );\n}\n\n.btn-alt .icon-24-plus,\n.btn-alt:hover .icon-24-plus,\n.btn:hover .icon-24-plus {\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Cpath class='st0' d='M1.5 11.5h20m-10 10v-20'/%3E %3C/svg%3E\"\n  );\n}\n\n.btn-alt .icon-24-minus,\n.btn-alt:hover .icon-24-minus {\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Cpath d='M1.5 11.5h20'/%3E %3C/svg%3E\"\n  );\n}\n\n.btn-menubar .icon-24-dot {\n  background-image: url(\n    \"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='1px'%3E %3Ccircle cx='11.5' cy='11.5' r='6'/%3E %3C/svg%3E\"\n  );\n}\n\n.icon-24-dot.blink {\n  animation: blinker 0.2s ease infinite;\n}\n\n@keyframes blinker {\n  50% {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='white'%3E %3Ccircle cx='11.5' cy='11.5' r='6'/%3E %3C/svg%3E\");\n  }\n}\n\n/* .icon-48-close {\n  background-image: svg-load(\n    './icons/48-close.svg',\n    fill=none,\n    stroke=var(--color-highlight),\n    stroke-linecap=round,\n    stroke-linejoin=round,\n    stroke-miterlimit=10,\n    stroke-width=1px\n  );\n}\n\n.btn-icon:hover .icon-48-close {\n  background-image: svg-load(\n    './icons/48-close.svg',\n    stroke=var(--color-bg),\n    stroke-linecap=round,\n    stroke-linejoin=round,\n    stroke-miterlimit=10,\n    stroke-width=1px\n  );\n} */\n\n/* Tools          ------------------------------- */\n\n/* Debug trick -------------------------------\nhttp://qr.ae/ROqymT */\n\n.debug {\n  background-color: rgba(255, 0, 0, 0.2);\n}\n\n.debug * {\n  background-color: rgba(0, 255, 0, 0.2);\n}\n\n.debug * * {\n  background-color: rgba(0, 0, 255, 0.2);\n}\n\n.debug * * * {\n  background-color: rgba(255, 0, 255, 0.2);\n}\n\n.debug * * * * {\n  background-color: rgba(0, 255, 255, 0.2);\n}\n\n.debug * * * * * {\n  background-color: rgba(255, 255, 0, 0.2);\n}\n\n.debug * * * * * * {\n  background-color: rgba(255, 255, 0, 0.2);\n}\n\n.grid {\n  background-size: 20.5rem 0.75rem;\n  background-size: var(--col-width) calc(var(--unit) / 2);\n  background-position: center top;\n  background-image: linear-gradient(\n    rgba(0, 0, 0, 0.05) 0.01rem,\n    transparent 0.09rem\n  ),\n    linear-gradient(90deg, rgba(255, 0, 0, 0.25) 0, transparent 0.25%),\n    linear-gradient(\n    90deg,\n    transparent 50%,\n    rgba(255, 0, 0, 0.25) 50%,\n    transparent 50.25%\n  );\n}\n\n/* Theme          ------------------------------- */\n\n/*\n    Sticky footer\n-------------------------------\nhttp://mystrd.at/modern-clean-css-sticky-footer/\n*/\n\n:root {\n  --footer-height: 0;\n}\n\nhtml {\n  position: relative;\n  height: 100%;\n}\n\nbody {\n  margin: 0 0 0;\n  margin: 0 0 var(--footer-height);\n  height: 100%;\n}\n\nfooter {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  height: 0;\n  height: var(--footer-height);\n  width: 100%;\n}\n\n#loader-app {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n\n#loader-bar {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  background-color: white;\n  background-color: var(--color-bg);\n}\n\n#app {\n  overflow: hidden;\n}\n\n/*\n    Theme\n-------------------------------\n*/\n\n:root {\n  --header-height: 48px;\n  --header-height: 3rem;\n  --header-height: calc(var(--unit) * 2);\n}\n\n[v-cloak] {\n  display: none;\n}\n\n.container {\n  padding-left: 24px;\n  padding-left: 1.5rem;\n  padding-left: var(--container-padding);\n  padding-right: 24px;\n  padding-right: 1.5rem;\n  padding-right: var(--container-padding);\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.header {\n  box-shadow: rgba(61, 61, 53, 0.25) 4px 4px 16px;\n  box-shadow: rgba(61, 61, 53, 0.25) 4px 4px 16px;\n}\n\n.menubar-infos {\n  padding-top: 0;\n  padding-bottom: 12px;\n  padding-bottom: 0.75rem;\n  padding-bottom: var(--unit-s);\n}\n\n.btn-menubar,.btn-menubar:visited {\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  display: inline-block;\n  color: var(--color-bg);\n  background-color: var(--color-transparent);\n  font-weight: 700;\n  height: 48px;\n  height: 3rem;\n}\n\n.btn-menubar:active,.btn-menubar.active {\n  color: var(--color-inverse);\n  background-color: var(--color-alt);\n}\n\n.btn-menubar:hover,.btn-menubar.active:hover {\n  color: var(--color-bg);\n  background-color: var(--color-highlight);\n}\n\n.btn-menubar:disabled,.btn-menubar:disabled:active,.btn-menubar:disabled:hover,.btn-menubar.disabled,.btn-menubar.disabled:active,.btn-menubar.disabled:hover {\n  opacity: 0.25;\n  cursor: default;\n  color: var(--color-bg);\n  background-color: var(--color-transparent);\n  box-shadow: inset 0 0 0 0 grey;\n}\n\n.page {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n\n.main {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n}\n\n.content {\n  overflow-y: scroll;\n  flex: 1 1 auto;\n}\n\n.messages {\n  bottom: 0;\n}\n\nhr.border-bg {\n  border-top: 3px solid white;\n  border-top: 0.1875rem solid white;\n  border-top: var(--unit-xxs) solid var(--color-bg);\n  margin-bottom: 21px;\n  margin-bottom: 1.3125rem;\n  margin-bottom: calc(var(--unit) - var(--unit-xxs));\n  clear: both;\n  margin-left: -36px;\n  margin-left: -2.25rem;\n  margin-left: calc(var(--unit-l) * -1);\n  margin-right: -36px;\n  margin-right: -2.25rem;\n  margin-right: calc(var(--unit-l) * -1);\n}\n\n.dropdown {\n  margin-bottom: 24px;\n  margin-bottom: 1.5rem;\n  margin-bottom: var(--unit);\n  background-color: #f8f7f3;\n  background-color: var(--color-alt);\n}\n\n.menubar-infos {\n  margin-top: 12px;\n  margin-top: 0.75rem;\n  margin-top: var(--unit-s);\n}\n\n.annotation {\n  background-color: rgba(255, 0, 0, 0.5);\n}\n\n.handle {\n  width: 32px;\n  background-color: yellow;\n  cursor: ew-resize;\n}\n\n.handle-right {\n  right: -32px;\n  top: 0;\n  bottom: 0;\n}\n\n.handle-left {\n  left: -32px;\n  top: 0;\n  bottom: 0;\n}\n\n.handle-topleft {\n  top: 0;\n  left: 0;\n  height: 32px;\n}\n\n.handle-bottomright {\n  bottom: 0;\n  right: 0;\n  height: 32px;\n}\n\n.timeline-cursor {\n  left: 50%;\n  transform: translateX(-50%);\n  width: 1px;\n  width: 0.0625rem;\n  width: var(--unit-line);\n  background-color: rgb(0, 162, 255);\n  background-color: var(--color-brand);\n  top: 0;\n  bottom: 0;\n}\n\n@media (min-width: 42.5em) {\n  --header-height: 3rem;\n  --header-height: calc(var(--unit) * 2);\n\n  .container {\n    width: 42.5rem;\n    width: calc(2 * var(--col-width) + var(--gutter));\n  }\n\n  .menubar-infos {\n    padding-top: 1.125rem;\n    padding-top: var(--unit-m);\n    margin-top: 0;\n  }\n\n  .pophover {\n    width: 39.5rem;\n    width: calc(2 * var(--col-width) - var(--gutter));\n    transform: translate(-50%, 0);\n    top: 3rem;\n    top: var(--header-height);\n    left: 50%;\n    right: auto;\n    bottom: auto;\n    z-index: 2;\n    box-shadow: rgba(61, 61, 53, 0.25) 4px 4px 16px;\n    box-shadow: rgba(61, 61, 53, 0.25) 4px 4px 16px;\n  }\n\n  .messages {\n    width: 39.5rem;\n    width: calc(2 * var(--col-width) - var(--gutter));\n  }\n\n  .dropdown {\n    position: absolute;\n    right: 1.5rem;\n    right: var(--gutter);\n    top: 0;\n  }\n}\n\n@media (min-width: 63em) {\n  .container {\n    width: 63rem;\n    width: calc(3 * var(--col-width) + var(--gutter));\n  }\n}\n\n.truncate-demo {\n  height: 48px;\n  height: 3rem;\n  height: var(--unit-xl);\n}\n\n.transition-bottom-enter-active,\n.transition-bottom-leave-active,\n.transition-fade-enter-active,\n.transition-fade-leave-active,\n.transition-top-enter-active,\n.transition-top-leave-active,\n.transition-top-enter-active .pophover,\n.transition-top-leave-active .pophover {\n  transition: all 0.5s;\n}\n\n.transition-bottom-enter,\n.transition-bottom-leave-to {\n  opacity: 0;\n  margin-bottom: -60px;\n  margin-bottom: -3.75rem;\n  margin-bottom: calc(var(--unit-xxl) * -1);\n}\n\n.transition-fade-enter,\n.transition-fade-leave-to {\n  opacity: 0;\n}\n\n.transition-top-enter,\n.transition-top-leave-to {\n  opacity: 0;\n}\n\n.transition-top-enter .pophover,\n.transition-top-leave-to .pophover {\n  margin-top: -60px;\n  margin-top: -3.75rem;\n  margin-top: calc(var(--unit-xxl) * -1);\n}\n\n/* from https://github.com/PrismJS/prism/blob/gh-pages/themes/prism.css */\n\n:not(pre) > code[class*='language-'] {\n  padding: 0.1em;\n  white-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: #bcb9af;\n  color: var(--color-neutral);\n}\n\n.token.punctuation {\n  color: #bcb9af;\n  color: var(--color-neutral);\n}\n\n.namespace {\n  opacity: 0.7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: rgba(212, 67, 74, 1);\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: rgba(57, 119, 191, 1);\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: hsla(0, 0%, 100%, 0.5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: rgba(105, 134, 46, 1);\n}\n\n.token.function {\n  color: #dd4a68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\n.spinner {\n  margin: 25% auto;\n  width: 160px;\n  width: 10rem;\n  text-align: center;\n}\n\n.spinner > div {\n  width: 24px;\n  width: 1.5rem;\n  width: var(--unit);\n  height: 24px;\n  height: 1.5rem;\n  height: var(--unit);\n  background-color: #3d3d35;\n  background-color: var(--color-inverse);\n  border-radius: 100%;\n  display: inline-block;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n\n.spinner .bounce1 {\n  animation-delay: -0.32s;\n}\n\n.spinner .bounce2 {\n  animation-delay: -0.16s;\n}\n\n@keyframes sk-bouncedelay {\n  0%,\n  80%,\n  100% {\n    transform: scale(0);\n  }\n\n  50% {\n    transform: scale(1);\n  }\n}\n\n.mediacontroller {\n  transition: all 0.3s;\n}\n\n.mediacontroller-button {\n  height: 36px;\n  height: 2.25rem;\n  height: var(--unit-l);\n  width: 48px;\n  width: 3rem;\n  width: var(--unit-xl);\n  padding: 0;\n  line-height: 1;\n  text-align: center;\n  float: left;\n}\n\n.mediacontroller-counter {\n  height: 36px;\n  height: 2.25rem;\n  height: var(--unit-l);\n  padding: 6px 12px;\n  padding: 0.375rem 0.75rem;\n  padding: var(--unit-xs) var(--unit-s);\n  float: left;\n}\n\n.mediacontroller-progress {\n  position: relative;\n  height: 24px;\n  height: 1.5rem;\n  height: var(--unit);\n  background-color: rgba(248, 247, 243, 0.5);\n  background-color: rgba(248, 247, 243, 0.5);\n}\n\n.mediacontroller-progress.loaded {\n  background-color: #f8f7f3;\n  background-color: var(--color-alt);\n  cursor: ew-resize;\n}\n\n.mediacontroller-progress-bar {\n  background: #f50;\n  background: var(--color-highlight);\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  top: 0;\n\n  /*transition: width 1s;*/\n}\n";
styleInject(css);

var log = {
  simple: function simple (key, value) {
    console.log(
      ("%c| " + key + ": %c" + value), // eslint-disable-line camelcase
      'padding:8px 0; color:#666; line-height:24px;',
      'padding:8px 32px 8px 0; color:#f40; line-height:24px;'
    );
  },
  button: function button (key, value) {
    console.log(
      ("%c" + key + " %c" + value),
      'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 24px; line-height:96px; margin-left: 4px; border-radius: 8px 0 0 8px; color:#333; background:linear-gradient(to bottom, #E5E4E5, #CFCFCF); text-shadow: -1px -1px 1px #ccc,  1px 1px 3px #fff;',
      'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 12px; line-height:96px; text-decoration: none; color:#fff; background:linear-gradient(to bottom, #f62, #f30); text-shadow: -1px -1px 1px #a50,  1px 1px 3px #fa0; border-radius: 0 8px 8px 0; '
    );
  }
}

var state = {
  name: '',
  width: 0,
  height: 0,
  svg: {
    height: 0,
    width: 0,
    scale: 1
  },
  animate: false
};

var actions = {
  set: function set(ref) {
    var state = ref.state;
    var commit = ref.commit;

    var width = window.innerWidth;
    var height = window.innerHeight;
    var name;
    var animate;
    if (window.matchMedia('(min-width: 83.5em)').matches) {
      name = 'large';
      animate = true;
    } else if (window.matchMedia('(min-width: 63em)').matches) {
      name = 'desktop';
      animate = true;
    } else if (window.matchMedia('(min-width: 42.5em)').matches) {
      name = 'tablet';
      animate = false;
    } else if (window.matchMedia('(min-width: 22em)').matches) {
      name = 'mobile';
      animate = false;
    } else {
      log.simple('Viewport', 'Default');
      name = 'default';
      animate = false;
    }
    commit('set', { name: name, animate: animate, width: width, height: height });
  }
};

var mutations = {
  set: function set(state, ref) {
    var animate = ref.animate;
    var name = ref.name;
    var width = ref.width;
    var height = ref.height;

    state.name = name;
    state.animate = animate;
    state.width = width;
    state.height = height;
    log.simple('Viewport', name);
  }
};

var viewport = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}

var state$1 = {
  list: []
};

var actions$1 = {
  all: function all(ref) {
    var dispatch = ref.dispatch;

    dispatch("cml/set", {}, { root: true }).then(function (r) {
      dispatch('cml/messages/success', 'Synced with server', { root: true });
    });
  },

  start: function start(ref, name) {
    var state = ref.state;

    state.list.push(name);
  },

  stop: function stop(ref, name) {
    var state = ref.state;

    state.list = state.list.filter(function (n) { return n !== name; });
  }
};

var getters = {
  active: function (state) {
    return state.list.length
  }
};

var sync = {
  namespaced: true,
  state: state$1,
  actions: actions$1,
  getters: getters
}

var state$2 = {
  visible: false,
  config: {},
  element: {}
};

var mutations$1 = {
  open: function open(state, ref) {
    var config = ref.config;
    var element = ref.element;

    state.visible = true;
    state.config = config;
    state.element = JSON.parse(JSON.stringify(element));
  },

  close: function close(state) {
    state.visible = false;
    state.config = {};
  },

  fieldUpdate: function fieldUpdate(state, ref) {
    var name = ref.name;
    var value = ref.value;

    Vue.set(state.element, name, value);
  }
};

var popup = {
  namespaced: true,
  state: state$2,
  mutations: mutations$1
}

var state$3 = {
  visible: false,
  config: {}
};

var mutations$2 = {
  close: function close(state) {
    state.visible = false;
    state.config = {};
  },

  open: function open(state, config) {
    state.visible = true;
    state.config = config;
  }
};

var dropdown = {
  namespaced: true,
  state: state$3,
  mutations: mutations$2
}

function userFormat (user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description || {},
    role: user.role
  }
}

function groupFormat (group) {
  return {
    name: group.name,
    id: group._id,
    description: group.description || {},
    userIds: group.users
  }
}

function mediaFormat (media) {
  return {
    name: media.name,
    id: media._id,
    url: media.url,
    corpuId: media.id_corpus,
    description: media.description || {}
  }
}

function dateCurrent () {
  return new Date().valueOf()
}

// export function observerClean (obj) {
//   return Object.keys(obj).reduce(
//     (res, e) => Object.assign(res, { [e]: obj[e] }),
//     {}
//   )
// }

var state$4 = {
  list: []
};

var actions$2 = {
  success: function success(ref, content) {
    var commit = ref.commit;

    commit('add', { content: content, type: 'success', id: dateCurrent() });
    setTimeout(function (_) {
      commit('remove');
    }, 2000);
  },

  error: function error(ref, content) {
    var commit = ref.commit;

    commit('add', { content: content, type: 'error', id: dateCurrent() });
    setTimeout(function (_) {
      commit('remove');
    }, 2000);
  }
};

var mutations$3 = {
  remove: function remove(state) {
    state.list.shift();
  },

  add: function add(state, message) {
    state.list.push(message);
  }
};

var messages = {
  namespaced: true,
  state: state$4,
  actions: actions$2,
  mutations: mutations$3
}

// Current user

/* Example

{
  id: 'user-id-hash',
  name: 'user-name-string',
  role: 'admin', // user or admin
  isLogged: false,
  isAdmin: false,
  isRoot: false
  description: { … },
  groupIds: [
    'group-id-hash-1',
    'group-id-hash-2'
  ]
}
*/

var state$5 = {
  id: '',
  name: '',
  role: '',
  description: {},
  groupIds: [],
  isLogged: false,
  isAdmin: false,
  isRoot: false
};

var actions$3 = {
  // user login
  login: function login(ref, config) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;

    dispatch('cml/sync/start', 'userLogin', { root: true });
    return rootState.cml.api
      .login(config.user.name, config.user.password)
      .then(function (r) {
        dispatch('cml/sync/stop', 'userLogin', { root: true });
        commit('cml/popup/close', null, { root: true });

        // Get the user properties
        dispatch('set');

        return r.message
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'userLogin', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw e
      })
  },

  // Get the user properties
  set: function set(ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;

    dispatch('cml/sync/start', 'userSet', { root: true });
    return rootState.cml.api
      .me()
      .then(function (r) {
        // Format server response
        var user = {
          id: r.data._id,
          name: r.data.username,
          role: r.data.role,
          description: r.data.description || {},
          groupIds: r.data.groups || []
        };
        dispatch('cml/sync/stop', 'userSet', { root: true });
        // Commit user
        commit('set', user);

        // Bootstrap app from index.js / set
        dispatch('cml/set', null, { root: true });

        return user
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'userSet', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw e
      })
  },

  // User logout
  logout: function logout(ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;

    dispatch('cml/sync/start', 'userLogout', { root: true });
    return rootState.cml.api
      .logout()
      .then(function (r) {
        dispatch('cml/sync/stop', 'userLogout', { root: true });

        // Reset the app from index.js / reset
        dispatch('cml/reset', null, { root: true });
        commit('cml/popup/close', null, { root: true });
        commit('cml/dropdown/close', null, { root: true });

        return r.message
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'userLogout', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw e
      })
  }
};

var getters$1 = {
  // Get if the user is admin or belongs to an admin group
  isAdmin: function (state) { return function (ref) {
    var users = ref.users; if ( users === void 0 ) users = {};
    var groups = ref.groups; if ( groups === void 0 ) groups = {};

    var isAdmin = users[state.id] === 3;

    // Loop over the groups
    var isInAdminGroup = Object.keys(groups).reduce(function (result, id) {
      // Check if the group is admin
      var groupIsAdmin = groups[id] === 3;

      // Check if the group
      var userIsInGroup = state.groupIds.reduce(function (isIn, groupId) {
        return isIn || groupId === id
      }, false);

      return result || (groupIsAdmin && userIsInGroup)
    }, false);

    // Return true if the user is admin or is in an admin group
    return isAdmin || isInAdminGroup
  }; },

  // Check if a user id is the current user
  isCurrentUser: function (state) { return function (userId) {
    return state.id === userId
  }; },

  // Check if the current user is a group
  isInGroup: function (state) { return function (groupId) {
    return state.groupIds.indexOf(groupId) !== -1
  }; },

  // Check the permission level for the current user on a permission object
  permission: function (state) { return function (ref) {
    var users = ref.users; if ( users === void 0 ) users = {};
    var groups = ref.groups; if ( groups === void 0 ) groups = {};

    var permissionUser =
      (Object.keys(users).find(function (userId) { return userId === state.id; }) &&
        users[state.id]) ||
      0;

    var permissionGroup = Object.keys(groups).reduce(
      function (permission, groupId) { return Math.max(
          permission,
          state.groupIds.indexOf(groupId) !== -1 && groups[groupId]
        ); },
      0
    );

    var permissionRoot = state.isRoot ? 3 : 0;

    return Math.max(permissionUser, permissionGroup, permissionRoot)
  }; }
};

var mutations$4 = {
  // Set the current user properties (on log-in)
  set: function set(state, user) {
    state.isLogged = true;
    state.isAdmin = user.role === 'admin';
    state.isRoot = user.name === 'root';
    state.id = user.id;
    state.name = user.name;
    state.role = user.role;
    state.description = user.description;
    state.groupIds = user.groupIds;
  },

  // Reset the current user properties (on log-out)
  reset: function reset(state) {
    state.isLogged = false;
    state.isAdmin = false;
    state.isRoot = false;
    state.id = '';
    state.name = '';
    state.role = '';
    state.description = {};
    state.groupIds = [];
  },

  // Add the current user to a group
  groupAdd: function groupAdd(state, groupId) {
    state.groupIds.push(groupId);
  },

  // Remove the current user from a group
  groupRemove: function groupRemove(state, groupId) {
    state.groupIds = state.groupIds.filter(function (id) { return id !== groupId; });
  }
};

var user = {
  namespaced: true,
  state: state$5,
  actions: actions$3,
  getters: getters$1,
  mutations: mutations$4
}

/* Example

list: [{
  id: 'user-id-hash-1',
  name: 'user-name-string',
  role: 'user', // user or admin
  description: {
    …
  },
  {
    …
  }
}]

*/

var state$6 = {
  list: []
};

var actions$4 = {
  // Add a new user
  add: function add(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'usersAdd', { root: true });
    return rootState.cml.api
      .createUser(
        element.name,
        element.password,
        element.description,
        element.role
      )
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersAdd', { root: true });
        var user = userFormat(r.data);
        commit('add', user);

        // Add the new user to every corpus and layers
        commit('cml/corpus/userAdd', user.id, { root: true });
        commit('cml/layers/userAdd', user.id, { root: true });
        dispatch('cml/messages/success', 'User added', { root: true });

        return user
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersAdd', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Update a user
  update: function update(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'usersUpdate', { root: true });
    return rootState.cml.api
      .updateUser(element.id, {
        password: element.password,
        role: element.role,
        description: element.description
      })
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true });
        var user = userFormat(r.data);
        commit('update', user);

        // If the user is the current user (logged-in)
        if (user.name === rootState.cml.user.name) {
          // Update the current user
          commit('cml/user/set', user, { root: true });
        }
        dispatch('cml/messages/success', 'User updated', { root: true });

        return user
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove a user
  remove: function remove(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var id = ref$1.id;

    dispatch('cml/sync/start', 'usersRemove', { root: true });
    return rootState.cml.api
      .deleteUser(id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersRemove', { root: true });
        commit('remove', id);

        // Remove the user from every corpus and layers
        commit('cml/corpus/userRemove', id, { root: true });
        commit('cml/layers/userRemove', id, { root: true });
        dispatch('cml/messages/success', 'User removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersRemove', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // List all users
  list: function list(ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;

    dispatch('cml/sync/start', 'usersList', { root: true });
    return rootState.cml.api
      .getUsers()
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersList', { root: true });
        var users = r.data.map(function (user) { return userFormat(user); });
        commit('list', users);

        return users
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersList', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  }
};

var getters$2 = {
  // Get the permissions for every users from a permissions object
  permissions: function (state) { return function (permissions) {
    return state.list.reduce(
      function (p, user) {
          var obj;

          return Object.assign(p, ( obj = {}, obj[user.id] = permissions && permissions[user.id] ? permissions[user.id] : 0, obj));
    },
      {}
    )
  }; }
};

var mutations$5 = {
  // Reset users (on log-out)
  reset: function reset(state) {
    Vue.set(state, 'list', []);
  },

  // Add a new user
  add: function add(state, user) {
    state.list.push(user);
  },

  // Update a user in the list
  update: function update(state, user) {
    var index = state.list.findIndex(function (u) { return u.id === user.id; });
    Vue.set(state.list, index, user);
  },

  // Remove a user from the list
  remove: function remove(state, userId) {
    var index = state.list.findIndex(function (u) { return u.id === userId; });
    Vue.delete(state.list, index);
  },

  // Set the user list
  list: function list(state, users) {
    Vue.set(state, 'list', users);
  }
};

var users = {
  namespaced: true,
  state: state$6,
  actions: actions$4,
  getters: getters$2,
  mutations: mutations$5
}

// list contains the groups

/* Example

{
  list: [{
    id: 'group-id-hash-1',
    name: 'group-name-1',
    description: { … },
    userIds: [
      'user-id-hash-1',
      'user-id-hash-2'
  },
  { …
  }]
}

*/

var state$7 = {
  list: []
};

var actions$5 = {
  // Add a new group
  add: function add(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'groupsAdd', { root: true });
    return rootState.cml.api
      .createGroup(element.name, element.description)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsAdd', { root: true });
        var group = groupFormat(r.data);
        commit('add', group);

        // Add the new group to every corpus and layers
        commit('cml/corpus/groupAdd', group.id, { root: true });
        commit('cml/layers/groupAdd', group.id, { root: true });
        dispatch('cml/messages/success', 'Group added', { root: true });

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsAdd', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove a group
  remove: function remove(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var id = ref$1.id;

    dispatch('cml/sync/start', 'groupsRemove', { root: true });
    return rootState.cml.api
      .deleteGroup(id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsRemove', { root: true });
        commit('remove', id);
        // Add the group from every corpus and layers
        commit('cml/corpus/groupRemove', id, { root: true });
        commit('cml/layers/groupRemove', id, { root: true });
        dispatch('cml/messages/success', 'Group removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsRemove', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Update a group
  update: function update(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'groupsUpdate', { root: true });
    return rootState.cml.api
      .updateGroup(element.id, { description: element.description })
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsUpdate', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'Group updated', { root: true });

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsUpdate', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // List groups
  list: function list(ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;

    dispatch('cml/sync/start', 'groupsList', { root: true });
    return rootState.cml.api
      .getGroups()
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsList', { root: true });
        var groups = r.data.map(function (group) { return groupFormat(group); });
        commit('list', groups);

        return groups
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsList', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Add a user to a group
  userAdd: function userAdd(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var userId = ref$1.userId;
    var group = ref$1.group;

    dispatch('cml/sync/start', 'groupsUserAdd', { root: true });
    return rootState.cml.api
      .addUserToGroup(userId, group.id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsUserAdd', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'User added to group', {
          root: true
        });
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupAdd', group.id, { root: true });
          dispatch('cml/corpus/listAll', null, {
            root: true
          });
        }

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsUserAdd', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // remove a user from a group
  userRemove: function userRemove(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var userId = ref$1.userId;
    var group = ref$1.group;

    dispatch('cml/sync/start', 'groupsUserRemove', { root: true });
    return rootState.cml.api
      .removeUserFromGroup(userId, group.id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsUserRemove', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'User removed from group', {
          root: true
        });
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupRemove', group.id, { root: true });
          dispatch('cml/corpus/listAll', null, {
            root: true
          });
        }

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsUserRemove', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  }
};

var getters$3 = {
  // Get the permissions for every groups
  // { 'group-id-hash-1': 0, 'group-id-hash-2': 3, … }
  permissions: function (state) { return function (permissions) {
    return state.list.reduce(
      function (p, group) {
          var obj;

          return Object.assign(p, ( obj = {}, obj[group.id] = permissions && permissions[group.id] ? permissions[group.id] : 0, obj));
    },
      {}
    )
  }; }
};

var mutations$6 = {
  // Reset list (on log-out)
  reset: function reset(state) {
    Vue.set(state, 'list', []);
  },

  // Add a group to the list
  add: function add(state, group) {
    state.list.push(group);
  },

  // Update a group
  update: function update(state, group) {
    var index = state.list.findIndex(function (g) { return g.id === group.id; });
    Vue.set(state.list, index, group);
  },

  // Remove a group
  remove: function remove(state, groupId) {
    var index = state.list.findIndex(function (g) { return g.id === groupId; });
    Vue.delete(state.list, index);
  },

  // Set the group list
  list: function list(state, groups) {
    Vue.set(state, 'list', groups);
  }
};

var groups = {
  namespaced: true,
  state: state$7,
  actions: actions$5,
  getters: getters$3,
  mutations: mutations$6
}

// The latin word should be corpus (singular) / corpora (plural), but…
// For consistency with other sections (users, groups, medias, layers, annotations),
// I use corpu (singular) / corpus (plural)

// Lists contains the corpu data
// Actives contains the active corpu for each uid

/* Example:

{
  lists: {
    'corpu-uid-string-1': [{
      id: 'corpu-id-hash',
      name: 'corpu-name-string'
      permission: 3,
      permissions: {
        groups: {
          'group-id-hash-1': 2,
          'group-id-hash-2': …
        },
        users: {
          'user-id-hash-1': 1,
          'user-id-hash-2': …
        }
      }
    },
    { …
    }],
    'corpu-uid-string-2': [ … 
    ]
  },
  actives: {
    'corpu-uid-string-1': 'corpu-id-hash-1',
    'corpu-uid-string-2': …
  }
}
*/

var state$8 = {
  lists: {},
  actives: {}
};

var actions$6 = {
  // Add a new corpu
  add: function add(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var element = ref$1.element;

    dispatch('cml/sync/start', "corpusAdd", { root: true });
    return rootState.cml.api
      .createCorpus(element.name, element.description, {})
      .then(function (r) {
        dispatch('cml/sync/stop', "corpusAdd", { root: true });

        // Format server response
        var corpu = {
          name: r.data.name,
          id: r.data._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.data.description || {}
        };

        // Set the permissions for the current user
        corpu.permissions.users[rootState.cml.user.id] = 3;

        // Commit the corpu
        commit('add', { corpu: corpu });
        dispatch('cml/messages/success', 'Corpus added', { root: true });

        return corpu
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "corpusAdd", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove a corpu
  remove: function remove(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var id = ref$1.id;

    dispatch('cml/sync/start', "corpusRemove", { root: true });
    return rootState.cml.api
      .deleteCorpus(id)
      .then(function (r) {
        dispatch('cml/sync/stop', "corpusRemove", { root: true });
        commit('remove', { id: id });
        dispatch('cml/messages/success', 'Corpus removed', { root: true });

        // For every uid,
        // If the removed corpus was active
        // Set a new one
        dispatch('setAll', { id: id });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "corpusRemove", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Update a corpu
  update: function update(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', "corpusUpdate", { root: true });
    return rootState.cml.api
      .updateCorpus(element.id, {
        name: element.name,
        description: element.description
      })
      .then(function (r) {
        dispatch('cml/sync/stop', "corpusUpdate", { root: true });

        // Format server response
        // The server does not send back the permissions,
        // To keep them, we copy the original element
        // Then overwrite the name and description
        var corpu = Object.assign({}, element);
        corpu.name = r.data.name;
        corpu.description = r.data.description || {};
        commit('update', { corpu: corpu });
        dispatch('cml/messages/success', 'Corpus updated', { root: true });

        return corpu
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "corpusUpdate", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Set the permission for a group on a corpu
  groupPermissionSet: function groupPermissionSet(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var rootState = ref.rootState;
    var id = ref$1.id;
    var groupId = ref$1.groupId;
    var permission = ref$1.permission;

    dispatch('cml/sync/start', "corpusGroupPermissionSet", {
      root: true
    });
    return rootState.cml.api
      .setCorpusPermissionsForGroup(id, groupId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "corpusGroupPermissionSet", {
          root: true
        });

        // Commit server response
        commit('permissionsUpdate', {
          id: id,
          typeId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          type: 'groups'
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the corpus in every uid
          dispatch('listAll');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "corpusGroupPermissionSet", {
          root: true
        });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove a permission for a group on a corpu
  groupPermissionRemove: function groupPermissionRemove(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var rootState = ref.rootState;
    var id = ref$1.id;
    var groupId = ref$1.groupId;

    dispatch('cml/sync/start', "corpusGroupPermissionRemove", {
      root: true
    });
    return rootState.cml.api
      .removeCorpusPermissionsForGroup(id, groupId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "corpusGroupPermissionRemove", {
          root: true
        });
        commit('permissionsUpdate', {
          id: id,
          typeId: groupId,
          permission: 0,
          type: 'groups'
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the corpus in every uid
          dispatch('listAll');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "corpusGroupPermissionRemove", {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Set the permission for a user on a corpu
  userPermissionSet: function userPermissionSet(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var rootState = ref.rootState;
    var id = ref$1.id;
    var userId = ref$1.userId;
    var permission = ref$1.permission;

    dispatch('cml/sync/start', "corpusUserPermissionSet", { root: true });
    return rootState.cml.api
      .setCorpusPermissionsForUser(id, userId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "corpusUserPermissionSet", {
          root: true
        });
        commit('permissionsUpdate', {
          id: id,
          typeId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          type: 'users'
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        // If the current user is the updated user
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the corpus in every uid
          dispatch('listAll');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "corpusUserPermissionSet", {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove the permission for a user on a corpu
  userPermissionRemove: function userPermissionRemove(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var rootState = ref.rootState;
    var id = ref$1.id;
    var userId = ref$1.userId;

    dispatch('cml/sync/start', "corpusUserPermissionRemove", {
      root: true
    });
    return rootState.cml.api
      .removeCorpusPermissionsForUser(id, userId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "corpusUserPermissionRemove", {
          root: true
        });
        commit('permissionsUpdate', {
          id: id,
          typeId: userId,
          permission: 0,
          type: 'users'
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        // If the current user is the updated user
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('listAll');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "corpusUserPermissionRemove", {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  listAll: function listAll(ref) {
    var state = ref.state;
    var dispatch = ref.dispatch;

    // Loop over the corpu lists
    Object.keys(state.lists).forEach(function (uid) {
      // List the corpus for this uid
      dispatch('list', uid);
    });
  },

  // List the corpus for a uid
  list: function list(ref, uid) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var rootState = ref.rootState;

    dispatch('cml/sync/start', ("corpusList-" + uid), { root: true });
    return rootState.cml.api
      .getCorpora()
      .then(function (r) {
        dispatch('cml/sync/stop', ("corpusList-" + uid), { root: true });

        // Format server response
        var corpus = r.data.map(function (c) { return ({
          name: c.name,
          id: c._id,
          description: c.description || {},
          // Get permission for the current user
          permission: rootGetters['cml/user/permission'](c.permissions || {}),
          // Get permissions for every users and groups
          permissions: {
            users: rootGetters['cml/users/permissions'](
              (c.permissions && c.permissions.users) || {}
            ),
            groups: rootGetters['cml/groups/permissions'](
              (c.permissions && c.permissions.groups) || {}
            )
          }
        }); });

        // Commit the update corpu list
        commit('list', { corpus: corpus, uid: uid });

        // Set the active corpu for this list
        dispatch('set', { uid: uid });

        return corpus
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusList-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // For every uid,
  // If the corpus id was active
  // And set a new one
  setAll: function setAll(ref, ref$1) {
    var state = ref.state;
    var dispatch = ref.dispatch;
    var id = ref$1.id;

    Object.keys(state.actives).forEach(function (uid) {
      if (state.actives[uid] === id) {
        dispatch('set', { uid: uid });
      }
    });
  },

  // Set the active corpus for a uid
  set: function set(ref, ref$1) {
    var state = ref.state;
    var getters = ref.getters;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var id = ref$1.id;
    var uid = ref$1.uid;

    // Set the active corpus
    // If the id is note defined, get one
    commit('set', { id: id || getters.id(uid), uid: uid });

    // If the corpu active is set
    // - list the medias
    // - list the layers
    if (state.actives[uid]) {
      dispatch(
        'cml/medias/list',
        { corpuId: state.actives[uid], corpuUid: uid },
        { root: true }
      );
      dispatch(
        'cml/layers/list',
        { corpuId: state.actives[uid], corpuUid: uid },
        { root: true }
      );
    }
  },

  // Register a corpu uid
  register: function register(ref, uid) {
    var state = ref.state;
    var commit = ref.commit;

    commit('register', uid);
  }
};

var getters$4 = {
  // Get the id of the active corpu
  // If, for this uid, active is set and its id is still in the list
  // If not, get the first corpu of the list
  id: function (state) { return function (uid) { return (state.actives[uid] &&
      state.lists[uid].find(function (c) { return c.id === state.actives[uid]; }).id) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null; }; },

  // Get the permission level for the active corpu
  permission: function (state) { return function (uid) {
    var corpu =
      state.lists[uid] &&
      state.lists[uid].find(function (c) { return c.id === state.actives[uid]; });
    return corpu ? corpu.permission : 0
  }; }
};

var mutations$7 = {
  // Register a new uid
  // - lists is an empty array
  // - actives is null
  register: function register(state, uid) {
    Vue.set(state.lists, uid, []);
    Vue.set(state.actives, uid, null);
  },

  // Reset all (on log-out)
  resetAll: function resetAll(state) {
    Vue.set(state, 'lists', {});
    Vue.set(state, 'actives', {});
  },

  // Add a new corpu in every uids
  add: function add(state, ref) {
    var corpu = ref.corpu;

    Object.keys(state.lists).forEach(function (uid) {
      var index = state.lists[uid].length;
      Vue.set(state.lists[uid], index, corpu);
    });
  },

  // Update a corpu in every uids
  update: function update(state, ref) {
    var corpu = ref.corpu;

    Object.keys(state.lists).forEach(function (uid) {
      var index = state.lists[uid].findIndex(function (m) { return m.id === corpu.id; });
      if (index !== -1) {
        Vue.set(state.lists[uid], index, corpu);
      }
    });
  },

  // Remove a corpu in every uids
  remove: function remove(state, ref) {
    var id = ref.id;

    Object.keys(state.lists).forEach(function (uid) {
      var index = state.lists[uid].findIndex(function (c) { return c.id === id; });
      if (index !== -1) {
        Vue.delete(state.lists[uid], index);
      }
    });
  },

  // Add a new group to every corpus
  groupAdd: function groupAdd(state, groupId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.set(c.permissions.groups, groupId, 0);
      });
    });
  },

  // Remove a group from every corpus
  groupRemove: function groupRemove(state, groupId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.delete(c.permissions.groups, groupId);
      });
    });
  },

  // Add a user to every corpus
  userAdd: function userAdd(state, userId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.set(c.permissions.users, userId, 0);
      });
    });
  },

  // Remove a user from every corpus
  userRemove: function userRemove(state, userId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.delete(c.permissions.users, userId);
      });
    });
  },

  // Update permissions on a corpu
  permissionsUpdate: function permissionsUpdate(state, ref) {
    var id = ref.id;
    var typeId = ref.typeId;
    var permission = ref.permission;
    var type = ref.type;

    // Loop over the corpus lists
    // If the current corpu is in the list, update the permissions
    Object.keys(state.lists).forEach(function (uid) {
      var index = state.lists[uid].findIndex(function (m) { return m.id === id; });
      if (index !== -1) {
        Vue.set(state.lists[uid][index].permissions[type], typeId, permission);
      }
    });
  },

  // Set the corpu list for a uid
  list: function list(state, ref) {
    var corpus = ref.corpus;
    var uid = ref.uid;

    Vue.set(state.lists, uid, corpus);
  },

  // Set the active corpus for a uid
  set: function set(state, ref) {
    var id = ref.id;
    var uid = ref.uid;

    Vue.set(state.actives, uid, id);
  }
};

var corpus = {
  namespaced: true,
  state: state$8,
  actions: actions$6,
  getters: getters$4,
  mutations: mutations$7
}

// Lists contains, for each corpuUid, an array of media objects
// Actives contains, for each mediaUid, a media id and a reference to the corpuUid
// Properties contains, for each mediaUid, the properties of the current media

/* Example

{
  lists {
    'corpu-uid-string-1': [{
      id: 'media-id-hash-1',
      name: 'media-name-string',
      url: 'http://media-string.url',
      corpuId: 'corpu-id-hash-1',
      description: {
        type: 'media-type-string',
        …
      }
    }, {
      …
    }],
    'corpu-uid-string-2: [
      …
    ]
  },
  actives: {
    'media-uid-string-1': {
      id: 'media-id-hash-1',
      corpuUid: 'corpu-uid-string'
    },
    'media-uid-string-2': {
      …
    }
  },
  porperties: {
    'media-uid-string-1': {
      isLoaded: boolean,
      isPlaying: boolean,
      timecurrent: Number,
      timeTotal: number,
      seek: {
        seeking: Boolean
      }
    }, 
    'media-uid-string-2': {
      …
    }
  }
}
*/

var state$9 = {
  lists: {},
  actives: {},
  properties: {}
};

var actions$7 = {
  // Add a new media
  add: function add(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var element = ref$1.element;

    dispatch('cml/sync/start', "mediasAdd", { root: true });
    return rootState.cml.api
      .createMedium(
        element.corpuId,
        element.name,
        element.url,
        element.description
      )
      .then(function (r) {
        dispatch('cml/sync/stop', "mediasAdd", { root: true });
        var media = mediaFormat(r.data);

        // Loop over the media-lists to add the new media
        Object.keys(state.lists).forEach(function (corpuUid) {
          // If the new media belongs to the same corpus as the current media-list
          if (rootGetters['cml/corpus/id'](corpuUid) === element.corpuId) {
            // Add the new media to the media-list
            commit('add', { media: media, corpuUid: corpuUid });
            // Loop over the active medias
            Object.keys(state.actives).forEach(function (uid) {
              // If the active media belongs to the same corpus Uid as the current media-list
              if (state.actives[uid].corpuUid === corpuUid) {
                // Activate the new media
                dispatch('set', { id: media.id, corpuUid: corpuUid, uid: uid });
              }
            });
          }
        });
        dispatch('cml/messages/success', 'Medium added', { root: true });

        return media
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "mediasAdd", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove a media
  remove: function remove(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var id = ref$1.id;

    dispatch('cml/sync/start', "mediasRemove", { root: true });
    return rootState.cml.api
      .deleteMedium(id)
      .then(function (r) {
        dispatch('cml/sync/stop', "mediasRemove", { root: true });

        // Loop over the corpuUid
        Object.keys(state.lists).forEach(function (corpuUid) {
          // If the media belongs to this corpuuid
          var listIndex = state.lists[corpuUid].findIndex(function (m) { return m.id === id; });
          if (listIndex !== -1) {
            // Remove the media from the list
            commit('remove', { listIndex: listIndex, corpuUid: corpuUid });
          }
        });

        // Re-set a new media in every mediaUid where it is active
        dispatch('unsetAll', { id: id });
        dispatch('cml/messages/success', 'Medium removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "mediasRemove", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Update a media
  update: function update(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var element = ref$1.element;

    dispatch('cml/sync/start', "mediasUpdate", { root: true });
    return rootState.cml.api
      .updateMedium(element.id, {
        name: element.name,
        description: element.description,
        url: element.url
      })
      .then(function (r) {
        dispatch('cml/sync/stop', "mediasUpdate", { root: true });
        var media = Object.assign({}, element);
        media.name = r.data.name;
        media.url = r.data.url;
        media.description = r.data.description || {};

        // Loop over the corpuUid
        Object.keys(state.lists).forEach(function (corpuUid) {
          // If the corpu active in this corpuUid equals the media's corpuUid
          if (rootGetters['cml/corpus/id'](corpuUid) === element.corpuId) {
            // update the media
            commit('update', { media: media, corpuUid: corpuUid });
          }
        });
        dispatch('cml/messages/success', 'Medium updated', { root: true });

        return media
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "mediasUpdate", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // List the medias
  list: function list(ref, ref$1) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var rootState = ref.rootState;
    var corpuId = ref$1.corpuId;
    var corpuUid = ref$1.corpuUid;

    dispatch('cml/sync/start', ("mediasList-" + corpuUid), { root: true });
    return rootState.cml.api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(function (r) {
        dispatch('cml/sync/stop', ("mediasList-" + corpuUid), { root: true });
        // Format the server response
        var medias = r.data.map(function (media) {
          return mediaFormat(media)
        });

        // Commit media list
        commit('list', { medias: medias, corpuUid: corpuUid });

        // Loop over the active medias
        Object.keys(state$9.actives).forEach(function (uid) {
          // If the active media belongs to the same corpus Uid as the current media-list
          if (state$9.actives[uid].corpuUid === corpuUid) {
            // Activate a media
            dispatch('set', { corpuUid: corpuUid, uid: uid });
          }
        });

        return medias
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("mediasList-" + corpuUid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Register a mediaUid in a corpuUid
  register: function register(ref, ref$1) {
    var commit = ref.commit;
    var uid = ref$1.uid;
    var corpuUid = ref$1.corpuUid;

    commit('register', { uid: uid, corpuUid: corpuUid });
  },

  // Re-set a new media in every mediaUid where it is active
  unsetAll: function unsetAll(ref, ref$1) {
    var state = ref.state;
    var dispatch = ref.dispatch;
    var id = ref$1.id;

    // loop over the mediaUids
    Object.keys(state.actives).forEach(function (uid) {
      // If the media is active in this mediaUid
      if (state.actives[uid].id === id) {
        // Set a new active media
        dispatch('set', { corpuUid: state.actives[uid].corpuUid, uid: uid });
      }
    });
  },

  // Set the active media for a uid
  set: function set(ref, ref$1) {
    var state = ref.state;
    var getters = ref.getters;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var id = ref$1.id;
    var corpuUid = ref$1.corpuUid;
    var uid = ref$1.uid;

    // Before, stop the media if playing
    if (state.properties[uid] && state.properties[uid].isPlaying) {
      dispatch('pause', { uid: uid });
    }

    // Set the active media for this uid
    // If the media id is not defined, get one
    commit('set', { id: id || getters.id({ corpuUid: corpuUid, uid: uid }), corpuUid: corpuUid, uid: uid });
    dispatch(
      'cml/annotations/mediaSet',
      {
        mediaId: state.actives[uid].id,
        mediaUid: uid
      },
      { root: true }
    );
  },

  // Play the media in a mediaUid
  play: function play(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var uid = ref$1.uid;

    var timeStart = Date.now();
    var timeCurrent = state.properties[uid].timeCurrent;
    state.properties[uid].interval = setInterval(function () {
      var timeEllapsed = Date.now() - timeStart;
      // commit('timeCurrent', { time: timeCurrent + timeEllapsed, uid })
      Vue.set(state.properties[uid], 'timeCurrent', timeCurrent + timeEllapsed);
    }, 0);
    commit('play', { uid: uid });
  },

  // Pause a media in a mediaUid
  pause: function pause(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var uid = ref$1.uid;

    clearInterval(state.properties[uid].interval);
    commit('pause', { uid: uid });
  },

  // Wait the media while buffering, in a mediaUid
  buffering: function buffering(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var uid = ref$1.uid;

    clearInterval(state.properties[uid].interval);
  },

  // Stop a media in a mediaUid
  stop: function stop(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var uid = ref$1.uid;

    clearInterval(state.properties[uid].interval);
    commit('pause', { uid: uid });
    dispatch('seek', {
      ratio: 0,
      serverRequest: true,
      uid: uid
    });
  },

  // Seek a media in a mediaUid
  seek: function seek(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var ratio = ref$1.ratio;
    var serverRequest = ref$1.serverRequest;
    var uid = ref$1.uid;

    if (state.properties[uid].isPlaying) {
      clearInterval(state.properties[uid].interval);
    }
    // commit('timeCurrent', {
    //   time: ratio * state.properties[uid].timeTotal,
    //   uid
    // })

    Vue.set(
      state.properties[uid],
      'timeCurrent',
      ratio * state.properties[uid].timeTotal
    );
    commit('seek', { options: { seeking: true, serverRequest: serverRequest }, uid: uid });
  }
};

var getters$5 = {
  // Get the id of the active media
  // or the id of the first media in the list
  id: function (state) { return function (ref) {
      var corpuUid = ref.corpuUid;
      var uid = ref.uid;

      return (state.actives[uid] &&
      state.lists[corpuUid].find(function (c) { return c.id === state.actives[uid].id; }) &&
      state.actives[uid].id) ||
    // Else, get the first id of the media-list
    (state.lists[corpuUid][0] && state.lists[corpuUid][0].id) ||
    null;
 }    },

  // Get the prpoerties of the active media
  properties: function (state, getters) { return function (uid, filter) {
    return getters.active(uid, filter) ? state.properties[uid] : {}
  }; },

  // Get the active media
  active: function (state) { return function (uid, filter) {
    var active = state.actives[uid];
    filter =
      filter ||
      function(m) {
        return m
      };
    return active && state.lists[active.corpuUid]
      ? filter(state.lists[active.corpuUid].find(function (m) { return m.id === active.id; }))
      : null
  }; }
};

var mutations$8 = {
  // Register a mediaUid in a corpuUid
  register: function register(state, ref) {
    var uid = ref.uid;
    var corpuUid = ref.corpuUid;

    Vue.set(state.actives, uid, { corpuUid: corpuUid });
    Vue.set(state.properties, uid, null);
  },

  // Reset all (on log-out)
  resetAll: function resetAll(state) {
    Vue.set(state, 'lists', {});
    Vue.set(state, 'actives', {});
    Vue.set(state, 'properties', {});
  },

  // Add a new media in a corpuuid
  add: function add(state, ref) {
    var media = ref.media;
    var corpuUid = ref.corpuUid;

    var index = state.lists[corpuUid].length;
    Vue.set(state.lists[corpuUid], index, media);
  },

  // Update a media in a corpuuid
  update: function update(state, ref) {
    var media = ref.media;
    var corpuUid = ref.corpuUid;

    var index = state.lists[corpuUid].findIndex(function (m) { return m.id === media.id; });
    Vue.set(state.lists[corpuUid], index, media);
  },

  // Remove a media from a corpuUid
  remove: function remove(state, ref) {
    var listIndex = ref.listIndex;
    var corpuUid = ref.corpuUid;

    Vue.delete(state.lists[corpuUid], listIndex);
  },

  // List medias in a corpuUid
  list: function list(state, ref) {
    var medias = ref.medias;
    var corpuUid = ref.corpuUid;

    Vue.set(state.lists, corpuUid, medias);
  },

  // Set the active media in a mediaUid
  set: function set(state, ref) {
    var id = ref.id;
    var corpuUid = ref.corpuUid;
    var uid = ref.uid;

    Vue.set(state.actives, uid, { corpuUid: corpuUid, id: id });
    Vue.set(state.properties, uid, {
      timeTotal: 0,
      timeCurrent: 0,
      isPlaying: false,
      isLoaded: false,
      seek: { seeking: false }
    });
  },

  // Set the isLoaded property for a mediaUid
  loaded: function loaded(state, ref) {
    var isLoaded = ref.isLoaded;
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'isLoaded', isLoaded);
  },

  // Set the isplaying property to true in a mediauid
  play: function play(state, ref) {
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'isPlaying', true);
  },

  // Set the isplaying property to false in a mediauid
  pause: function pause(state, ref) {
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'isPlaying', false);
  },

  // Set the timetotal property in a mediaUid
  timeTotal: function timeTotal(state, ref) {
    var time = ref.time;
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'timeTotal', time);
  },

  // Set the seek property in a mediauid
  seek: function seek(state, ref) {
    var options = ref.options;
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'seek', options);
  }
};

var medias = {
  namespaced: true,
  state: state$9,
  actions: actions$7,
  getters: getters$5,
  mutations: mutations$8
}

// Lists contains, for each corpuUid, an array of layers
// Actives contains, for each layersUid, a reference to the corpuUid and a list of layer Ids

/* Example 

{
  lists: {
    'corpu-uid-string-1': [{
      id: 'layer-id-hash-1',
      name: 'layer-two',
      permission: 3,
      permissions: {
        groups: {
          'group-id-hash-1': 0,
          …
        },
        users: {
          'user-id-hash-1': 0,
          …
        }
      },
      description: { … },
      fragmentType: { … },
      metadataType: { … }
    }],
    'corpu-uid-string-2': [ 
      …
    ]
  },
  actives: {
    'layers-uid-string-1': {
      corpuUid: 'corpu-uid-string-1',
      ids: [
        'layer-id-hash-1',
        'layer-id-hash-2',
        …
      ]
    },
    'layers-uid-string-2': {
      …
    }
  }
}
*/

var state$10 = {
  lists: {},
  actives: {}
};

var actions$8 = {
  // Add a new layer
  add: function add(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var element = ref$1.element;

    dispatch('cml/sync/start', "layersAdd", { root: true });
    return rootState.cml.api
      .createLayer(
        element.corpuId,
        element.name,
        element.description,
        element.fragmentType,
        element.metadataType,
        element.annotations
      )
      .then(function (r) {
        dispatch('cml/sync/stop', "layersAdd", { root: true });

        // Format server response
        var layer = {
          name: r.data.name,
          id: r.data._id,
          // The current user who created the layer has max permission level (3)
          permission: 3,
          // Init permissions for groups and users
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.data.description || {},
          fragmentType: r.data.fragment_type || {},
          metadataType: r.data.data_type || {},
          annotations: r.data.annotations
        };

        // Set permissions for the current user
        layer.permissions.users[rootState.cml.user.id] = 3;

        // Loop over the corpu Uids
        Object.keys(state.lists).forEach(function (corpuUid) {
          // If the new layer belongs to the active corpu in this Uid
          if (rootGetters['cml/corpus/id'](corpuUid) === element.corpuId) {
            // Add the layer to the corpus
            commit('add', { layer: layer, corpuUid: corpuUid });
          }

          // Loop over the layers uids
          Object.keys(state.actives).forEach(function (uid) {
            // If this layers uid's belongs to the current corpuUid
            if (state.actives[uid].corpuUid === corpuUid) {
              // Activate the new layer
              dispatch('set', { uid: uid, id: layer.id });
            }
          });
        });
        dispatch('cml/messages/success', 'Layer added', { root: true });

        return layer
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "layersAdd", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove a layer
  remove: function remove(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var id = ref$1.id;

    dispatch('cml/sync/start', "layersRemove", { root: true });
    return rootState.cml.api
      .deleteLayer(id)
      .then(function (r) {
        dispatch('cml/sync/stop', "layersRemove", { root: true });

        // Loop over the corpuUids
        // If the layer belongs to this corpuUid, remove the layer
        Object.keys(state.lists).forEach(function (corpuUid) {
          var listIndex = state.lists[corpuUid].findIndex(function (e) { return e.id === id; });
          if (listIndex !== -1) {
            commit('remove', { listIndex: listIndex, corpuUid: corpuUid });
          }
        });

        // Loop over the layers uids
        // If the layer is active, unset it
        Object.keys(state.actives).forEach(function (uid) {
          if (state.actives[uid].ids.findIndex(function (l) { return l.id === id; }) !== -1) {
            dispatch('unset', { id: id, uid: uid });
          }
        });

        dispatch('cml/messages/success', 'Layer removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "layersRemove", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Update a layer
  update: function update(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var element = ref$1.element;

    dispatch('cml/sync/start', "layersUpdate", { root: true });
    return rootState.cml.api
      .updateLayer(element.id, {
        name: element.name,
        description: element.description,
        fragment_type: element.fragmentType,
        data_type: element.metadataType
      })
      .then(function (r) {
        dispatch('cml/sync/stop', "layersUpdate", { root: true });

        // The server response does not contain the permissions
        // Copy the original element to keep the permissions
        // Overwrite properties with the server response
        var layer = Object.assign({}, element);
        layer.description = r.data.description || {};
        layer.fragmentType = r.data.fragment_type || {};
        layer.metadataType = r.data.data_type || {};

        // Loop over the corpuUid
        Object.keys(state.lists).forEach(function (corpuUid) {
          // If the element's corpuUid equals this corpuuid
          if (rootGetters['cml/corpus/id'](corpuUid) === element.corpuId) {
            // Update the layer
            commit('update', { layer: layer, corpuUid: corpuUid });
          }
        });
        dispatch('cml/messages/success', 'Layer updated', { root: true });

        return layer
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "layersUpdate", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Set the permission for a group on a layer
  groupPermissionSet: function groupPermissionSet(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var id = ref$1.id;
    var groupId = ref$1.groupId;
    var permission = ref$1.permission;

    dispatch('cml/sync/start', "layersGroupPermissionSet", {
      root: true
    });
    return rootState.cml.api
      .setLayerPermissionsForGroup(id, groupId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "layersGroupPermissionSet", {
          root: true
        });
        commit('permissionsUpdate', {
          id: id,
          typeId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          type: 'groups'
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll');
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "layersGroupPermissionSet", {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove permission for a group on a layer
  groupPermissionRemove: function groupPermissionRemove(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var id = ref$1.id;
    var groupId = ref$1.groupId;

    dispatch('cml/sync/start', "layersGroupPermissionRemove", {
      root: true
    });
    return rootState.cml.api
      .removeLayerPermissionsForGroup(id, groupId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "layersGroupPermissionRemove", {
          root: true
        });
        commit('permissionsUpdate', {
          id: id,
          typeId: groupId,
          permission: 0,
          type: 'groups'
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        // If the current user is in the updated group
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll');
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "layersGroupPermissionRemove", {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Set the permission for a user on a layer
  userPermissionSet: function userPermissionSet(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var id = ref$1.id;
    var userId = ref$1.userId;
    var permission = ref$1.permission;

    dispatch('cml/sync/start', "layersUserPermissionSet", { root: true });
    return rootState.cml.api
      .setLayerPermissionsForUser(id, userId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "layersUserPermissionSet", {
          root: true
        });
        commit('permissionsUpdate', {
          id: id,
          typeId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          type: 'users'
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        // If the current user was updated
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll');
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "layersUserPermissionSet", {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove the permission for a user on a layer
  userPermissionRemove: function userPermissionRemove(
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var id = ref$1.id;
    var userId = ref$1.userId;

    dispatch('cml/sync/start', "layersUserPermissionRemove", {
      root: true
    });
    return rootState.cml.api
      .removeLayerPermissionsForUser(id, userId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', "layersUserPermissionRemove", {
          root: true
        });
        commit('permissionsUpdate', {
          id: id,
          typeId: userId,
          permission: 0,
          type: 'users'
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        // If the current user was updated
        // And if the current user is not an admin
        // => the permissions for the current user have changed
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          // Re-list the layers in every corpuUids
          dispatch('listAll');
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "layersUserPermissionRemove", {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // List the layers for every corpuUids
  listAll: function listAll(ref) {
    var state = ref.state;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;

    Object.keys(state.lists).forEach(function (corpuUid) {
      dispatch('list', {
        corpuId: rootState.cml.corpus.actives[corpuUid],
        corpuUid: corpuUid
      });
    });
  },

  // List the layers for a corpuUid
  list: function list(ref, ref$1) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var corpuUid = ref$1.corpuUid;

    dispatch('cml/sync/start', ("layersList-" + corpuUid), { root: true });
    return rootState.cml.api
      .getLayers({ filter: { id_corpus: corpuId } })
      .then(function (r) {
        dispatch('cml/sync/stop', ("layersList-" + corpuUid), { root: true });

        // Format server response
        var layers = r.data.map(function (l) { return ({
          name: l.name,
          id: l._id,
          description: l.description || {},
          permission: rootGetters['cml/user/permission'](l.permissions),
          permissions: {
            users: rootGetters['cml/users/permissions'](
              (l.permissions && l.permissions.users) || {}
            ),
            groups: rootGetters['cml/groups/permissions'](
              (l.permissions && l.permissions.groups) || {}
            )
          },
          fragmentType: l.fragment_type || {},
          metadataType: l.data_type || {},
          annotations: l.annotations || []
        }); });

        // Commit list to a corpuUid
        commit('list', { layers: layers, corpuUid: corpuUid });

        // Activate every layers in the list
        dispatch('setAll', { corpuUid: corpuUid });

        return layers
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersList-" + corpuUid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Activate every layers in a corpuUid
  setAll: function setAll(ref, ref$1) {
    var state = ref.state;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var corpuUid = ref$1.corpuUid;

    // Loop over every layers uids
    Object.keys(state.actives).forEach(function (uid) {
      // Loop over every layers in a corpuUid
      state.lists[corpuUid].forEach(function (l) {
        // Activate the layer
        dispatch('set', { id: l.id, corpuUid: corpuUid, uid: uid });
      });
    });
  },

  // Activate a layer in a layers uid
  set: function set(ref, ref$1) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var id = ref$1.id;
    var uid = ref$1.uid;

    commit('set', { id: id, uid: uid });
    dispatch(
      'cml/annotations/layerSet',
      { layersUid: uid, layerId: id },
      { root: true }
    );
  },

  // Deactivate a layer in a layers uid
  unset: function unset(ref, ref$1) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var id = ref$1.id;
    var uid = ref$1.uid;

    commit('unset', { id: id, uid: uid });
    dispatch(
      'cml/annotations/layerUnset',
      { layersUid: uid, layerId: id },
      { root: true }
    );
  },

  // Register a layers uid
  register: function register(ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var uid = ref$1.uid;
    var corpuUid = ref$1.corpuUid;

    commit('register', { uid: uid, corpuUid: corpuUid });
  }
};

var getters$6 = {
  // Get the active layer ids
  activeIds: function (state) { return function (uid) {
    return (state.actives[uid] && state.actives[uid].ids) || []
  }; },

  // Get the active layer objects
  actives: function (state) { return function (uid) {
    var actives = state.actives[uid];
    var layers = state.lists[actives.corpuUid];
    return actives && layers
      ? layers.filter(function (l) { return actives.ids.indexOf(l.id) !== -1; })
      : {}
  }; }
};

var mutations$9 = {
  // register a layers uid
  register: function register(state, ref) {
    var uid = ref.uid;
    var corpuUid = ref.corpuUid;

    Vue.set(state.actives, uid, { corpuUid: corpuUid, ids: [] });
  },

  // Reset all layers (on log-out)
  resetAll: function resetAll(state) {
    Vue.set(state, 'lists', {});
    Vue.set(state, 'actives', {});
  },

  // Add a layer in a corpuUid
  add: function add(state, ref) {
    var layer = ref.layer;
    var corpuUid = ref.corpuUid;

    var index = state.lists[corpuUid].length;
    Vue.set(state.lists[corpuUid], index, layer);
  },

  // Remove a layer in a corpuUid
  remove: function remove(state, ref) {
    var listIndex = ref.listIndex;
    var corpuUid = ref.corpuUid;

    Vue.delete(state.lists[corpuUid], listIndex);
  },

  // Update a layer in a corpuUid
  update: function update(state, ref) {
    var layer = ref.layer;
    var corpuUid = ref.corpuUid;

    var index = state.lists[corpuUid].findIndex(function (l) { return l.id === layer.id; });
    Vue.set(state.lists[corpuUid], index, layer);
  },

  // Add a group to every layers in every corpuUid
  groupAdd: function groupAdd(state, groupId) {
    Object.keys(state.lists).forEach(function (corpuUid) {
      state.lists[corpuUid].forEach(function (e) {
        Vue.set(e.permissions.groups, groupId, 0);
      });
    });
  },

  // Remove a group from every layers in every corpuUid
  groupRemove: function groupRemove(state, groupId) {
    Object.keys(state.lists).forEach(function (corpuUid) {
      state.lists[corpuUid].forEach(function (e) {
        Vue.delete(e.permissions.groups, groupId);
      });
    });
  },

  // Add a user to every layers in every corpuUid
  userAdd: function userAdd(state, userId) {
    Object.keys(state.lists).forEach(function (corpuUid) {
      state.lists[corpuUid].forEach(function (e) {
        Vue.set(e.permissions.users, userId, 0);
      });
    });
  },

  // Remove a user from every layers in every corpuUid
  userRemove: function userRemove(state, userId) {
    Object.keys(state.lists).forEach(function (corpuUid) {
      state.lists[corpuUid].forEach(function (e) {
        Vue.delete(e.permissions.users, userId);
      });
    });
  },

  // Update permissions on a layer in every corpuUid
  permissionsUpdate: function permissionsUpdate(state, ref) {
    var id = ref.id;
    var typeId = ref.typeId;
    var permission = ref.permission;
    var type = ref.type;

    Object.keys(state.lists).forEach(function (corpuUid) {
      var index = state.lists[corpuUid].findIndex(function (e) { return e.id === id; });
      if (index !== -1) {
        Vue.set(
          state.lists[corpuUid][index].permissions[type],
          typeId,
          permission
        );
      }
    });
  },

  list: function list(state, ref) {
    var layers = ref.layers;
    var corpuUid = ref.corpuUid;

    Vue.set(state.lists, corpuUid, layers);
  },

  set: function set(state, ref) {
    var id = ref.id;
    var uid = ref.uid;

    Vue.set(state.actives[uid].ids, state.actives[uid].ids.length, id);
  },

  unset: function unset(state, ref) {
    var id = ref.id;
    var uid = ref.uid;

    var index = state.actives[uid].ids.findIndex(function (layerId) { return layerId === id; });
    if (index !== -1) {
      Vue.delete(state.actives[uid].ids, index);
    }
  }
};

var layers = {
  namespaced: true,
  state: state$10,
  actions: actions$8,
  getters: getters$6,
  mutations: mutations$9
}

// Lists contains the annotations data
// Actives contains the currently activated annotations

/* 
Example: 

{
  lists: {
    'annotations-uid-string-1': {
      layerUid: 'layer-uid-string',
      mediaUid: 'media-uid-string',
      // The lists of annotations organised by layers
      layers: {
        'layer-id-hash-1': [{
          id: 'annotation-id-hash',
          layerId: 'layer-id-hash',
          mediaId: 'media-id-hash',
          fragment: {
            positions: [ … ],
            time: { … }
          },
          metadata: {
            label: 'lulu'
          }
        },
        { …
        }],
        'layer-id-hash-2': [ …
        ]
      }
    },
    'annotations-uid-string-2': { …
    }
  },
  actives: {
    'annotations-uid-string-1': 'annotation-id-hash',
    'annotations-uid-string-2': null // no annotation is activated for this uid
  }
}
*/
var state$11 = {
  lists: {},
  actives: {}
};

var actions$9 = {
  // Add a new annotation
  add: function add(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', "annotationsAdd", { root: true });
    return rootState.cml.api
      .createAnnotation(
        element.layerId,
        element.mediaId || null,
        element.fragment,
        element.metadata
      )
      .then(function (r) {
        dispatch('cml/sync/stop', "annotationsAdd", { root: true });

        // Format server response
        var annotation = {
          id: r.data._id,
          fragment: r.data.fragment || {},
          metadata: r.data.data || {},
          layerId: r.data.id_layer,
          mediaId: r.data.id_medium || null
        };

        // Commit response
        commit('add', { annotation: annotation, layerId: element.layerId });
        dispatch('cml/messages/success', 'Annotation added', { root: true });

        return annotation
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "annotationsAdd", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Remove an annotation
  remove: function remove(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var id = ref$1.id;

    dispatch('cml/sync/start', "annotationsRemove", { root: true });
    return rootState.cml.api
      .deleteAnnotation(id)
      .then(function (r) {
        dispatch('cml/sync/stop', "annotationsRemove", { root: true });
        commit('remove', { id: id });
        dispatch('cml/messages/success', 'Annotation removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "annotationsRemove", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Update an annotation
  update: function update(ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', "annotationsUpdate", { root: true });
    return rootState.cml.api
      .updateAnnotation(element.id, {
        fragment: element.fragment,
        data: element.metadata
      })
      .then(function (r) {
        dispatch('cml/sync/stop', "annotationsUpdate", { root: true });

        // Format server response
        var annotation = Object.assign({}, element);
        annotation.fragment = r.data.fragment || {};
        annotation.metadata = r.data.data || {};

        // Commit response
        commit('update', { annotation: annotation, layerId: element.layerId });
        dispatch('cml/messages/success', 'Annotation updated', { root: true });

        return annotation
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', "annotationsUpdate", { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  // Activate the annotations for a layerId in a layersUid group
  layerSet: function layerSet(ref, ref$1) {
    var state = ref.state;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var layersUid = ref$1.layersUid;
    var layerId = ref$1.layerId;

    // Loop over the annotation lists
    Object.keys(state.lists).forEach(function (uid) {
      var mediaUid = state.lists[uid].mediaUid;

      // If the current list's layersUid equals layersUid
      // And if the current list's mediaUid is active
      if (
        state.lists[uid].layersUid === layersUid &&
        rootState.cml.medias.actives[mediaUid]
      ) {
        // Get the annotation list
        dispatch('list', {
          uid: uid,
          layerId: layerId,
          layersUid: layersUid,
          mediaId: rootState.cml.medias.actives[mediaUid].id
        });
      }
    });
  },

  // When a layer is deactivated,
  // deactivate the annotations for this layerId in this layersUid group
  layerUnset: function layerUnset(ref, ref$1) {
    var commit = ref.commit;
    var layersUid = ref$1.layersUid;
    var layerId = ref$1.layerId;

    commit('reset', { layersUid: layersUid, layerId: layerId });
  },

  // When the active media changes,
  // display the related annotations
  mediaSet: function mediaSet(ref, ref$1) {
    var state = ref.state;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var mediaUid = ref$1.mediaUid;
    var mediaId = ref$1.mediaId;

    // Loop over the annotation lists
    Object.keys(state.lists).forEach(function (uid) {
      var list = state.lists[uid];

      // If the current list's mediaUid equals mediaUid
      // And if the current list's LayersUid is active
      if (
        list.mediaUid === mediaUid &&
        rootState.cml.layers.actives[list.layersUid]
      ) {
        // Loop over the layers
        Object.keys(list.layers).forEach(function (layerId) {
          // Get the annotation list
          dispatch('list', {
            uid: uid,
            layerId: layerId,
            layersUid: list.layersUid,
            mediaId: mediaId
          });
        });
      }
    });
  },

  // List the annotations
  list: function list(
    ref,
    ref$1
  ) {
    var state = ref.state;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var rootState = ref.rootState;
    var uid = ref$1.uid;
    var layerId = ref$1.layerId;
    var layersUid = ref$1.layersUid;
    var mediaId = ref$1.mediaId;

    dispatch('cml/sync/start', ("annotationsList-" + uid), { root: true });
    return rootState.cml.api
      .getAnnotations({
        filter: {
          id_layer: layerId,
          id_medium: mediaId
        }
      })
      .then(function (r) {
        dispatch('cml/sync/stop', ("annotationsList-" + uid), {
          root: true
        });

        // Format server response
        var annotations = r.data.map(function (a) { return ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }); });

        // Commit response
        commit('list', { annotations: annotations, uid: uid, layerId: layerId, layersUid: layersUid });

        return annotations
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("annotationsList-" + layersUid), {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  register: function register(ref, ref$1) {
    var commit = ref.commit;
    var uid = ref$1.uid;
    var mediaUid = ref$1.mediaUid;
    var layersUid = ref$1.layersUid;

    commit('register', { uid: uid, mediaUid: mediaUid, layersUid: layersUid });
  }
};

var getters$7 = {
  // Get the lists of annotations
  lists: function (state) { return function (uid) { return (state.lists[uid] && state.lists[uid].layers) || {}; }; },

  // Get the lists of annotations, filtered
  filter: function (state) { return function (uid, filter) { return state.lists[uid] &&
    Object.keys(state.lists[uid].layers).reduce(
      function (res, layer) {
          var obj;

          return Object.assign(res, ( obj = {}, obj[layer] = state.lists[uid].layers[layer].filter(function (a) { return filter(a); }), obj));
      },
      {}
    ); }; }
};

var mutations$10 = {
  // Register an annotation list by uid
  register: function register(state, ref) {
    var uid = ref.uid;
    var mediaUid = ref.mediaUid;
    var layersUid = ref.layersUid;

    // Create an uid entry in state.actives
    Vue.set(state.actives, uid, null);

    // Create an uid entry in state.lists,
    // with value { mediaUid, LayersUid, layers: {}}
    Vue.set(state.lists, uid, { mediaUid: mediaUid, layersUid: layersUid, layers: {} });
  },

  // Reset all (on log-out)
  resetAll: function resetAll(state) {
    Vue.set(state, 'lists', {});
    Vue.set(state, 'actives', {});
  },

  // Reset a list (if a layer is deactivated for example)
  reset: function reset(state, ref) {
    var layersUid = ref.layersUid;
    var layerId = ref.layerId;

    // Loop over the annotation lists
    Object.keys(state.lists).forEach(function (uid) {
      var list = state.lists[uid];

      // If current list's layersUid equals layersUid
      // - delete the list
      // - set the active annotation to null
      if (list.layersUid === layersUid) {
        Vue.delete(list, layerId);
        Vue.set(state.actives, uid, null);
      }
    });
  },

  // Add an annotation to a layer
  add: function add(state, ref) {
    var annotation = ref.annotation;
    var layerId = ref.layerId;

    // Loop over the annotation lists
    // If a list contains a layer which id's equals to layerId,
    // Prepend the new annotation to the list
    Object.keys(state.lists).forEach(function (uid) {
      var list = state.lists[uid].layers[layerId];
      if (list) {
        Vue.set(list, list.length, annotation);
      }
    });
  },

  // Update an annotation
  update: function update(state, ref) {
    var annotation = ref.annotation;
    var layerId = ref.layerId;

    // Loop over the annotation lists
    Object.keys(state.lists).forEach(function (uid) {
      // If a list contains a layer which id's equals to layerId
      var list = state.lists[uid].layers[layerId];
      if (list) {
        // Find the annotation index in the list and update
        var index = list.findIndex(function (a) { return a.id === annotation.id; });
        Vue.set(list, index, annotation);
      }
    });
  },

  // Remove an annotation by id
  remove: function remove(state, ref) {
    var id = ref.id;

    // Loop over the annotation lists
    Object.keys(state.lists).forEach(function (uid) {
      // Loop over the the layers in each list
      Object.keys(state.lists[uid].layers).forEach(function (layerId) {
        // If the list contains the annotation
        // - delete the annotation
        // - if the annotation was active, unset it
        var list = state.lists[uid].layers[layerId];
        var listsIndex = list.findIndex(function (a) { return a.id === id; });
        if (listsIndex !== -1) {
          Vue.delete(list, listsIndex);
          if (state.actives[uid] === id) {
            Vue.set(state.actives, uid, null);
          }
        }
      });
    });
  },

  // Set the list of annotation
  list: function list(state, ref) {
    var annotations = ref.annotations;
    var uid = ref.uid;
    var layerId = ref.layerId;
    var layersUid = ref.layersUid;

    Vue.set(state.lists[uid].layers, layerId, annotations);
  },

  // Set the active annotation
  set: function set(state, ref) {
    var id = ref.id;
    var uid = ref.uid;

    Vue.set(state.actives, uid, id);
  },

  // Unset an active annotation
  unset: function unset(state, ref) {
    var id = ref.id;
    var uid = ref.uid;

    Vue.set(state.actives, uid, null);
  }
};

var annotations = {
  namespaced: true,
  state: state$11,
  actions: actions$9,
  getters: getters$7,
  mutations: mutations$10
}

// Vuex Store main entry point

var modules = {
  viewport: viewport,
  sync: sync,
  popup: popup,
  dropdown: dropdown,
  messages: messages,
  user: user,
  users: users,
  groups: groups,
  corpus: corpus,
  medias: medias,
  layers: layers,
  annotations: annotations
};

var actions$10 = {
  // Bootstrap the application (on log-in)
  set: function set(ref) {
    var dispatch = ref.dispatch;

    // First get the users and groups
    // to get permissions…
    Promise.all([].concat( ['users', 'groups'].map(function (type) { return dispatch(("cml/" + type + "/list"), {}, { root: true })
          .then(function (r) { return r; })
          .catch(function (e) { return e; }); }
      ) )).then(function (res) {
      // …then list the corpus
      dispatch('cml/corpus/listAll', null, { root: true });
    });
  },

  // Reset (on log-out)
  reset: function reset(ref) {
    var commit = ref.commit;

    commit('cml/user/reset', null, { root: true });
    commit('cml/users/reset', null, { root: true });
    commit('cml/groups/reset', null, { root: true });
    commit('cml/corpus/resetAll', null, { root: true });
    commit('cml/medias/resetAll', null, { root: true });
    commit('cml/layers/resetAll', null, { root: true });
    commit('cml/annotations/resetAll', null, { root: true });
  }
};

var mutations$11 = {
  // Register the app, to connect to the api
  register: function register(state$$1, ref) {
    var url = ref.url;
    var title = ref.title;
    var user$$1 = ref.user;

    state$$1.config = {
      url: url,
      title: title,
      user: user$$1
    };
    state$$1.api = new Camomile(url);
  }
};

Vue.use(Vuex__default);

var store = new Vuex__default.Store({
  modules: {
    cml: {
      namespaced: true,
      actions: actions$10,
      mutations: mutations$11,
      modules: modules
    }
  }
})

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css="/* system.css / settings ------------------------------- http://francoisromain.github.io/postcss-structure */ :root { /* Colors ------------------------------- */ --color-text: #666; --color-bg: white; --color-transparent: rgba(248, 247, 243, 0); --color-inverse: #3d3d35; --color-neutral: #bcb9af; --color-alt: #f8f7f3; --color-highlight: #f50; --color-brand: rgb(0, 162, 255); --color-error: #e82239; --color-warning: #ff891c; --color-info: #5798aa; --color-success: #6ea040; /* Base units ------------------------------- */ /* font-size: 1rem = 16 px */ --base-font-size: 16px; --base-font-size: 1rem; /* base: 1.5rem = 24 px */ --unit: 24px; --unit: 1.5rem; /* line: 0.0625rem = 1px */ --unit-line: 1px; --unit-line: 0.0625rem; --unit-line: calc(var(--unit) / 24); /* xxs: 0.1875rem = 3px */ --unit-xxs: 3px; --unit-xxs: 0.1875rem; --unit-xxs: calc(var(--unit) / 8); /* xs: 0.375rem = 6px */ --unit-xs: 6px; --unit-xs: 0.375rem; --unit-xs: calc(var(--unit) / 4); /* s: 0.75rem = 12px */ --unit-s: 12px; --unit-s: 0.75rem; --unit-s: calc(var(--unit) / 2); /* m: 1.125rem = 18px */ --unit-m: 18px; --unit-m: 1.125rem; --unit-m: calc(var(--unit) * 3 / 4); /* l: 2.25rem = 36 px */ --unit-l: 36px; --unit-l: 2.25rem; --unit-l: calc(var(--unit) * 3 / 2); /* xl: 3rem = 48px */ --unit-xl: 48px; --unit-xl: 3rem; --unit-xl: calc(var(--unit) * 2); /* xxl: 3.75rem = 60 px */ --unit-xxl: 60px; --unit-xxl: 3.75rem; --unit-xxl: calc(var(--unit) * 2.5); /* */ --unit-infinity: 9999px; /* Lists ------------------------------- */ --list-postfix: ','; --list-prefix: '―'; /* Grid ------------------------------- */ /* postcss-grid-system configuration https://github.com/francoisromain/postcss-grid-system#configuration */ /* width of a single bloc in rem */ --col-width: 328px; --col-width: 20.5rem; /* width of the gutter in rem */ --gutter: 24px; --gutter: 1.5rem; --gutter: var(--unit); /* padding of the main container in rem */ --container-padding: 24px; --container-padding: 1.5rem; --container-padding: var(--unit); /* transition */ --transition: opacity 0.5s, background-color 0.5s, border 0.5s, box-shadow 0.5s, fill 0.5s; /* hr */ --border-style: solid; --border-color: #bcb9af; --border-color: var(--color-neutral); } /* media queries: x * col-width + gutter */ @media (min-width: 63em) { .home[data-v-24d69054] { background-color: #f50; background-color: var(--color-highlight); } } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




var viewport$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')},staticRenderFns: [],_scopeId: 'data-v-24d69054',
  name: 'CamomileUtilsViewport',

  mounted: function mounted () {
    window.addEventListener('resize', this.resize);
    this.resize();
  },

  methods: {
    resize: function resize () {
      return this.$store.dispatch('cml/viewport/set')
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();













var cmlDropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"transition-top"}},[(_vm.dropdown.visible)?_c('div',{staticClass:"absolute full bg-alpha",on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.close($event);}}},[_c('div',{staticClass:"container relative"},[_c(_vm.dropdown.config.component,{tag:"component"})],1)]):_vm._e()])},staticRenderFns: [],
  name: 'CamomileUtilsDropdown',

  computed: {
    dropdown: function dropdown () {
      return this.$store.state.cml.dropdown
    }
  },

  methods: {
    close: function close () {
      this.$store.commit('cml/dropdown/close');
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();



















var cmlPopup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"absolute full bg-alpha",on:{"click":_vm.close}}),_vm._v(" "),_c('div',{staticClass:"pophover absolute full bg-alt p-l pb-s"},[_c('div',{staticClass:"flex flex-start"},[_c('h2',[_vm._v(_vm._s(_vm.config.title))]),_vm._v(" "),(_vm.config.closeBtn)?_c('button',{staticClass:"flex-right btn p-s mt--m",on:{"click":_vm.close}},[_c('i',{staticClass:"icon-24 icon-24-close"})]):_vm._e()]),_vm._v(" "),_c('hr',{staticClass:"border-bg"}),_vm._v(" "),_c(_vm.config.component,{tag:"component"})],1)])},staticRenderFns: [],
  name: 'CamomilePopup',

  computed: {
    config: function config () {
      return this.$store.state.cml.popup.config
    }
  },

  created: function created () {
    if (this.config.closeBtn) {
      document.addEventListener('keyup', this.keyup);
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (this.config.closeBtn) {
      document.removeEventListener('keyup', this.keyup);
    }
  },

  methods: {
    close: function close () {
      if (this.config.closeBtn) {
        this.$store.commit('cml/popup/close');
      }
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.close();
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
















var cmlMessages = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messages absolute center"},[_c('transition-group',{attrs:{"name":"transition-bottom","tag":"div"}},_vm._l((_vm.messages),function(message){return (message.content)?_c('div',{key:message.id,staticClass:"px-m py-s mb color-bg b",class:("bg-" + (message.type))},[_vm._v(_vm._s(message.content)+" ")]):_vm._e()}))],1)},staticRenderFns: [],
  name: 'CamomileUtilsMessages',

  computed: {
    messages: function messages () {
      return this.$store.state.cml.messages.list
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




var cmlTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',{staticClass:"mb-0"},[_vm._v(_vm._s(_vm.title))])},staticRenderFns: [],
  name: 'CamomileHeaderTitle',

  computed: {
    title: function title () {
      return this.$store.state.cml.config.title
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




var cmlInfos = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h6',{staticClass:"menubar-infos mb-0"},[_vm._v(_vm._s(_vm.url))])},staticRenderFns: [],
  name: 'CamomileHeaderInfos',

  computed: {
    url: function url () {
      return this.$store.state.cml.config.url
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();















var objectField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',{staticClass:"pt-s"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.fields),expression:"fields"}],ref:"field",staticClass:"textarea-alt",domProps:{"value":(_vm.fields)},on:{"keyup":_vm.resize,"input":function($event){if($event.target.composing){ return; }_vm.fields=$event.target.value;}}})])])])},staticRenderFns: [],
  name: 'CamomilePopupEditJson',

  props: {
    name: {
      type: String,
      default: 'default'
    },
    title: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    fields: {
      get: function get () {
        return JSON.stringify(
          this.$store.state.cml.popup.element[this.name],
          undefined,
          2
        )
      },
      set: function set (value) {
        if (this.jsonCheck(value)) {
          this.$store.commit('cml/popup/fieldUpdate', {
            name: this.name,
            value: JSON.parse(value)
          });
        }
      }
    }
  },

  mounted: function mounted () {
    var el = this.$refs.field;
    el.style.height = (el.scrollHeight) + "px";
  },

  methods: {
    jsonCheck: function jsonCheck (str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false
      }
      return true
    },
    resize: function resize (e) {
      var el = e.target;
      el.style.height = (el.scrollHeight) + "px";
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var popupEdit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.type !== 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.name),expression:"element.name"}],ref:"name",staticClass:"input-alt",attrs:{"disabled":_vm.element.id && (_vm.type === 'users' || _vm.type === 'groups'),"type":"text","placeholder":"Name"},domProps:{"value":(_vm.element.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "name", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'users')?_c('div',{staticClass:"blobs"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.role),expression:"element.role"}],staticClass:"select-alt",attrs:{"disabled":!_vm.rolesPermission,"type":"text"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.element, "role", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},_vm._l((_vm.roles),function(role){return _c('option',{key:role,domProps:{"value":role}},[_vm._v(" "+_vm._s(role)+" ")])}))])]):_vm._e(),_vm._v(" "),(_vm.type === 'users')?_c('div',{staticClass:"blobs"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.password),expression:"element.password"}],staticClass:"input-alt",attrs:{"type":"password","placeholder":"••••••••"},domProps:{"value":(_vm.element.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "password", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'medias')?_c('div',{staticClass:"blobs"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.url),expression:"element.url"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"http://…"},domProps:{"value":(_vm.element.url)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "url", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('object-field',{attrs:{"name":'fragment',"title":'Fragment'}}):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('object-field',{attrs:{"name":'metadata',"title":'Meta-data'}}):_vm._e(),_vm._v(" "),(_vm.type === 'layers')?_c('object-field',{attrs:{"name":'fragmentType',"title":'Fragment type'}}):_vm._e(),_vm._v(" "),(_vm.type === 'layers')?_c('object-field',{attrs:{"name":'metadataType',"title":'Meta-data type'}}):_vm._e(),_vm._v(" "),(_vm.type !== 'annotations')?_c('object-field',{attrs:{"name":'description',"title":'Description'}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",attrs:{"disabled":!_vm.element.name && _vm.type !== 'annotations'},on:{"click":_vm.save,"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.save($event);}}},[_vm._v("Save")])])])],1)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Role")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Password")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Url")])])}],
  name: 'CamomilePopupEdit',

  components: {
    objectField: objectField
  },

  data: function data () {
    return {
      roles: ['admin', 'user']
    }
  },

  computed: Object.assign({}, Vuex.mapState({
      element: function (state) { return state.cml.popup.element; },
      type: function (state) { return state.cml.popup.config.type; },
      rolesPermission: function (state) { return state.cml.user.id !== state.cml.popup.element.id; }
    })),

  created: function created () {
    document.addEventListener('keyup', this.keyup);
  },

  mounted: function mounted () {
    if (this.type !== 'annotations') {
      this.$refs.name.focus();
    }
  },

  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keyup', this.keyup);
  },

  methods: {
    save: function save () {
      if (this.element.id) {
        this.$store.dispatch(("cml/" + (this.type) + "/update"), {
          element: this.element
        });
      } else {
        this.$store.dispatch(("cml/" + (this.type) + "/add"), { element: this.element });
      }
      this.$store.commit('cml/popup/close');
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save();
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var userbuttonDropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown"},[(_vm.isAdmin)?_c('div',[_c('button',{staticClass:"btn px-m py-s full-x",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: _vm.user });}}},[_vm._v("Settings…")])]):_vm._e(),_vm._v(" "),_c('div',[_c('button',{staticClass:"btn px-m py-s full-x mr home",on:{"click":_vm.logout}},[_vm._v("Logout")])])])},staticRenderFns: [],
  name: 'CamomileHeaderUserbuttonDropdown',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
        component: popupEdit
      }
    }
  },

  computed: {
    user: function user () {
      return this.$store.state.cml.user
    },
    isAdmin: function isAdmin () {
      return this.$store.state.cml.user.isAdmin
    }
  },

  methods: {
    close: function close () {
      this.$store.commit('cml/dropdown/close');
    },
    logout: function logout () {
      return this.$store.dispatch('cml/user/logout')
    },
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      this.$store.commit('cml/popup/open', { config: config, element: element });
      this.close();
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var cmlUserbutton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn-menubar px-m py-s full-x",class:{ active: _vm.visible },on:{"click":_vm.dropdownToggle}},[_vm._v(_vm._s(_vm.user.name))])},staticRenderFns: [],
  name: 'CamomileHeaderUserbutton',
  computed: Object.assign({}, Vuex.mapState({
      user: function (state) { return state.cml.user; },
      visible: function (state) { return state.cml.dropdown.visible; }
    })),
  methods: {
    dropdownToggle: function dropdownToggle () {
      if (this.visible) {
        this.$store.commit('cml/dropdown/close');
      } else {
        this.$store.commit('cml/dropdown/open', {
          component: userbuttonDropdown
        });
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();










var cmlSync = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn-menubar px-m py-s full-x",on:{"click":_vm.sync}},[_c('i',{staticClass:"icon-24 icon-24-dot",class:{ blink: _vm.active }})])},staticRenderFns: [],
  name: 'CamomileHeaderSyncbutton',

  computed: {
    active: function active () {
      return this.$store.getters['cml/sync/active']
    }
  },

  methods: {
    sync: function sync () {
      this.$store.dispatch('cml/sync/all');
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var cmlHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"bg-inverse color-bg header"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4 mb-0"},[_c('cml-title')],1),_vm._v(" "),(_vm.isLogged)?_c('div',{staticClass:"blob-1-2 mb-0"},[_c('div',{staticClass:"blobs-default"},[_c('div',{staticClass:"blob-default"},[_c('cml-sync',{staticClass:"mb-0 left"})],1),_vm._v(" "),_c('div',{staticClass:"blob-auto mb-0"},[_c('cml-infos')],1)])]):_vm._e(),_vm._v(" "),(_vm.isLogged)?_c('div',{staticClass:"blob mb-0 flex-right"},[_c('cml-userbutton')],1):_vm._e()])])])},staticRenderFns: [],
  name: 'CamomileHeader',

  components: {
    cmlTitle: cmlTitle,
    cmlInfos: cmlInfos,
    cmlUserbutton: cmlUserbutton,
    cmlSync: cmlSync
  },

  computed: {
    isLogged: function isLogged () {
      return this.$store.state.cml.user.isLogged
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




































var popupLogin = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.user.name),expression:"config.user.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name"},domProps:{"value":(_vm.config.user.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config.user, "name", $event.target.value);}}})]),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.user.password),expression:"config.user.password"}],staticClass:"input-alt",attrs:{"type":"password","placeholder":"Password"},domProps:{"value":(_vm.config.user.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config.user, "password", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",on:{"click":function($event){_vm.login(_vm.config);}}},[_vm._v("Login")])])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Password")])])}],
  name: 'CamomileLoginPopup',

  computed: {
    config: function config () {
      return this.$store.state.cml.config
    }
  },

  created: function created () {
    document.addEventListener('keyup', this.keyup);
  },

  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keyup', this.keyup);
  },

  methods: {
    login: function login (config) {
      return this.$store.dispatch('cml/user/login', config)
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.login(this.config);
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var cmlLogin = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')},staticRenderFns: [],
  name: 'CamomileLogin',

  created: function created () {
    this.$store.commit('cml/popup/open', {
      config: {
        title: 'Login',
        closeBtn: false,
        component: popupLogin
      },
      element: {}
    });
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var app = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page"},[_c('cml-header'),_vm._v(" "),_c('main',{staticClass:"main relative"},[_c('div',{staticClass:"content"},[(_vm.isLogged)?_vm._t("default"):_c('cml-login')],2),_vm._v(" "),_c('div',{staticClass:"overlay"},[_c('transition',{attrs:{"name":"transition-top"}},[(_vm.popup.visible)?_c('cml-popup'):_vm._e()],1),_vm._v(" "),_c('cml-messages'),_vm._v(" "),_c('cml-dropdown'),_vm._v(" "),_c('viewport')],1)])],1)},staticRenderFns: [],
  store: store,

  name: 'Camomile',

  components: {
    viewport: viewport$1,
    cmlHeader: cmlHeader,
    cmlLogin: cmlLogin,
    cmlPopup: cmlPopup,
    cmlMessages: cmlMessages,
    cmlDropdown: cmlDropdown
  },

  props: {
    userName: {
      type: String,
      default: ''
    },
    userPassword: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: 'http://localhost:3000'
    },
    title: {
      type: String,
      default: 'Camomile UI'
    }
  },

  computed: Object.assign({}, Vuex.mapState({
      isLogged: function (state) { return state.cml.user.isLogged; },
      popup: function (state) { return state.cml.popup; },
      media: function (state) { return state.cml.medias.list.find(function (m) { return m.id === state.cml.medias.id; }); }
    })),

  created: function created () {
    this.$store.commit('cml/register', {
      url: this.url,
      title: this.title,
      user: {
        name: this.userName,
        password: this.userPassword
      }
    });
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var popupRemove = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.type !== 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.name),expression:"element.name"}],staticClass:"input-alt",attrs:{"disabled":_vm.element.id,"type":"text","placeholder":"Name"},domProps:{"value":(_vm.element.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "name", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.id),expression:"element.id"}],staticClass:"input-alt",attrs:{"disabled":_vm.element.id,"type":"text","placeholder":"Name"},domProps:{"value":(_vm.element.id)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "id", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",on:{"click":_vm.remove,"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.remove($event);}}},[_vm._v("Remove")])])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Id")])])}],
  name: 'CamomilePopupRemove',

  computed: Object.assign({}, Vuex.mapState({
      element: function (state) { return state.cml.popup.element; },
      type: function (state) { return state.cml.popup.config.type; }
    })),

  created: function created () {
    document.addEventListener('keyup', this.keyup);
  },

  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keyup', this.keyup);
  },

  methods: {
    remove: function remove () {
      this.$store.dispatch(("cml/" + (this.type) + "/remove"), { id: this.element.id });
      this.$store.commit("cml/popup/close");
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.remove();
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();


































var popupGroups = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.name),expression:"user.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.user.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "name", $event.target.value);}}})])]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('h3',{staticClass:"mb-s"},[_vm._v("Groups")]),_vm._v(" "),_c('ul',{staticClass:"list-inline clearfix"},_vm._l((_vm.groups),function(group){return _c('li',{key:group.id,staticClass:"tag",class:{ active: _vm.groupActive(group.id) }},[_c('button',{staticClass:"btn px-m py-xs h5 pill",on:{"click":function($event){_vm.groupToggle(group);}}},[_vm._v(_vm._s(group.name))])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])}],
  name: 'CamomilePopupGroups',

  computed: {
    groups: function groups () {
      return this.$store.state.cml.groups.list
    },
    user: function user () {
      var this$1 = this;

      return this.$store.state.cml.users.list.find(
        function (u) { return u.id === this$1.$store.state.cml.popup.element.id; }
      )
    }
  },

  methods: {
    groupToggle: function groupToggle (group) {
      if (this.groupActive(group.id)) {
        this.$store.dispatch('cml/groups/userRemove', {
          userId: this.user.id,
          group: group
        });
      } else {
        this.$store.dispatch('cml/groups/userAdd', {
          userId: this.user.id,
          group: group
        });
      }
    },
    groupActive: function groupActive (groupId) {
      return (
        this.groups
          .find(function (group) { return group.id === groupId; })
          .userIds.indexOf(this.user.id) !== -1
      )
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var users$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isAdmin)?_c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Users")]),_vm._v(" "),_c('button',{staticClass:"btn p-s flex-right",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { description: {}, role: 'user' } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})])]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.users),function(user){return _c('tr',{key:user.id},[_c('td',[_vm._v(_vm._s(user.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(user.role))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupGroupsConfig, element: user });}}},[_vm._v("Groups")]),_vm._v(" "),_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: user });}}},[_vm._v("Edit")]),_vm._v(" "),(user.id !== _vm.userId)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: user });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])]):_vm._e()},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Name")]),_c('th',[_vm._v("Role")]),_c('th')])}],
  name: 'camomile-users',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Add user',
        component: popupEdit
      },
      popupGroupsConfig: {
        closeBtn: true,
        title: 'User groups',
        component: popupGroups
      },
      popupRemoveConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Remove user',
        component: popupRemove
      }
    }
  },

  computed: Object.assign({}, Vuex.mapState({
      isAdmin: function (state) { return state.cml.user.isAdmin; },
      users: function (state) { return state.cml.users.list; },
      userId: function (state) { return state.cml.user.id; }
    })),

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();


































var popupUsers = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.group.name),expression:"group.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.group.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.group, "name", $event.target.value);}}})])]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('h3',{staticClass:"pt-s mb-s"},[_vm._v("Users")]),_vm._v(" "),_c('ul',{staticClass:"list-inline"},_vm._l((_vm.users),function(user){return _c('li',{key:user.id,staticClass:"tag",class:{ active: _vm.userActive(user.id) }},[_c('button',{staticClass:"btn px-m py-xs h5 pill",on:{"click":function($event){_vm.userToggle(user.id);}}},[_vm._v(_vm._s(user.name))])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])}],
  name: 'CamomilePopupUsers',

  computed: {
    users: function users () {
      return this.$store.state.cml.users.list
    },
    group: function group () {
      var this$1 = this;

      return this.$store.state.cml.groups.list.find(
        function (g) { return g.id === this$1.$store.state.cml.popup.element.id; }
      )
    }
  },

  methods: {
    userToggle: function userToggle (userId) {
      if (this.userActive(userId)) {
        this.$store.dispatch('cml/groups/userRemove', {
          userId: userId,
          group: this.group
        });
      } else {
        this.$store.dispatch('cml/groups/userAdd', {
          userId: userId,
          group: this.group
        });
      }
    },

    userActive: function userActive (userId) {
      return this.group.userIds.indexOf(userId) > -1
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var groups$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isAdmin)?_c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Groups")]),_vm._v(" "),_c('button',{staticClass:"btn p-s flex-right",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})])]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.groups),function(group){return _c('tr',{key:group.id},[_c('td',[_vm._v(_vm._s(group.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(group.userIds.length))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_c('button',{staticClass:"btn p-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupUsersConfig, element: group });}}},[_vm._v("Users")]),_vm._v(" "),_c('button',{staticClass:"btn p-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: group });}}},[_vm._v("Edit")]),_vm._v(" "),(_vm.isRoot)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: group });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])]):_vm._e()},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Name")]),_c('th',[_vm._v("Users")]),_c('th')])}],
  name: 'CamomileGroups',

  data: function data () {
    return {
      popupRemoveConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Remove group',
        component: popupRemove
      },
      popupEditConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Edit group',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Add group',
        component: popupEdit
      },
      popupUsersConfig: {
        closeBtn: true,
        title: 'Group users',
        component: popupUsers
      }
    }
  },

  computed: Object.assign({}, Vuex.mapState({
      isAdmin: function (state) { return state.cml.user.isAdmin; },
      groups: function (state) { return state.cml.groups.list; },
      isRoot: function (state) { return state.cml.user.isRoot; }
    })),

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    refresh: function refresh () {
      return this.$store.dispatch('cml/groups/list')
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();


























var permissionsEdit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"list-inline"},[_c('li',{staticClass:"tag",class:{ active: _vm.isActive(1) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(1);}}},[_vm._v("R")])]),_vm._v(" "),_c('li',{staticClass:"tag",class:{ active: _vm.isActive(2) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(2);}}},[_vm._v("W")])]),_vm._v(" "),_c('li',{staticClass:"tag",class:{ active: _vm.isActive(3) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(3);}}},[_vm._v("A")])])])},staticRenderFns: [],
  name: 'CamomilePopupPermissionsEdit',

  props: {
    element: {
      type: Object,
      default: function () { return ({}); }
    },
    type: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    id: function id () {
      return this.$store.state.cml.popup.element.id
    },
    uid: function uid () {
      return this.$store.state.cml.popup.config.uid
    },
    permission: function permission () {
      var this$1 = this;

      return this.$store.state.cml[((this.type) + "s")].lists[this.uid].find(
        function (r) { return r.id === this$1.id; }
      ).permissions[((this.element.type) + "s")][this.element.id]
    }
  },

  methods: {
    toggle: function toggle (permission) {
      var obj, obj$1;

      if (this.isActive(permission)) {
        this.$store.dispatch(
          ("cml/" + (this.type) + "s/" + (this.element.type) + "PermissionRemove"),
          ( obj = {
            id: this.id
          }, obj[((this.element.type) + "Id")] = this.element.id, obj)
        );
      } else {
        this.$store.dispatch(
          ("cml/" + (this.type) + "s/" + (this.element.type) + "PermissionSet"),
          ( obj$1 = {
            id: this.id
          }, obj$1[((this.element.type) + "Id")] = this.element.id, obj$1.permission = permission, obj$1)
        );
      }
    },
    isActive: function isActive (permission) {
      return this.permission === permission
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var popupPermissions = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.resource.name),expression:"resource.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.resource.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.resource, "name", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"blob-1-2"},[_c('h3',{staticClass:"pt-s"},[_vm._v("Users")]),_vm._v(" "),_c('ul',{staticClass:"list-sans"},_vm._l((_vm.users),function(user){return _c('li',{key:user.id},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-2 mb-s"},[_vm._v(" "+_vm._s(user.name)+" ")]),_vm._v(" "),_c('div',{staticClass:"blob-1-2 mb-s"},[_c('permissions-edit',{attrs:{"type":_vm.type.slice(0, -1),"element":{ id: user.id, type: 'user' }}})],1)])])}))]),_vm._v(" "),_c('div',{staticClass:"blob-1-2"},[_c('h3',{staticClass:"pt-s"},[_vm._v("Groups")]),_vm._v(" "),_c('ul',{staticClass:"list-sans"},_vm._l((_vm.groups),function(group){return _c('li',{key:group.id},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-2 mb-s"},[_vm._v(" "+_vm._s(group.name)+" ")]),_vm._v(" "),_c('div',{staticClass:"blob-1-2 mb-s"},[_c('permissions-edit',{attrs:{"type":_vm.type.slice(0, -1),"element":{ id: group.id, type: 'group'}}})],1)])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s"},[_vm._v("Name")])])}],
  name: 'CamomilePermissions',

  components: {
    permissionsEdit: permissionsEdit
  },

  computed: Object.assign({}, Vuex.mapState({
      resource: function (state) { return state.cml.popup.element; },
      users: function (state) { return state.cml.users.list; },
      groups: function (state) { return state.cml.groups.list; },
      type: function (state) { return state.cml.popup.config.type; }
    }))
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var corpus$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s mb-s"},[_vm._v("Corpora")]),_vm._v(" "),(_vm.isAdmin)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),(_vm.corpus && _vm.corpus.length > 0)?_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.corpus),function(corpu){return _c('tr',{key:corpu.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":corpu.id,"checked":corpu.id === _vm.corpuId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(corpu.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupPermissionsConfig, element: corpu });}}},[_vm._v("Permissions")]):_vm._e(),_vm._v(" "),(corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: corpu });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.isAdmin && corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: corpu });}}},[_vm._v("Remove")]):_vm._e()])])})],2)]):_vm._e()])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'CamomileCorpus',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Edit corpus',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Add corpus',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Remove corpus',
        component: popupRemove
      },
      popupPermissionsConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Corpus permissions',
        component: popupPermissions,
        uid: this.uid
      }
    }
  },

  computed: {
    corpus: function corpus () {
      return this.$store.state.cml.corpus.lists[this.uid]
    },
    corpuId: function corpuId () {
      return this.$store.state.cml.corpus.actives[this.uid]
    },
    isAdmin: function isAdmin () {
      return this.$store.state.cml.user.isAdmin
    }
  },

  created: function created () {
    this.$store.dispatch('cml/corpus/register', this.uid);
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      this.$store.commit('cml/popup/open', { config: config, element: element });
    },
    set: function set (e) {
      this.$store.dispatch('cml/corpus/set', {
        id: e.target.value,
        uid: this.uid
      });
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var medias$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s mb-s"},[_vm._v("Media")]),_vm._v(" "),(_vm.corpuPermission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, corpuId: _vm.corpuId, description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),(_vm.medias && _vm.medias.length > 0)?_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.medias),function(media){return _c('tr',{key:media.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":media.id,"checked":media.id === _vm.mediaId},on:{"change":_vm.setEvent}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(media.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(_vm.corpuPermission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: media });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.corpuPermission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: media });}}},[_vm._v("Remove")]):_vm._e()])])})],2)]):_vm._e()])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'CamomileMedias',

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    corpusUid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Edit medium',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Add medium',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Remove medium',
        component: popupRemove
      }
    }
  },

  computed: {
    corpuId: function corpuId () {
      return this.$store.state.cml.corpus.actives[this.corpusUid]
    },
    mediaId: function mediaId () {
      return this.$store.state.cml.medias.actives[this.uid].id
    },
    medias: function medias () {
      return this.$store.state.cml.medias.lists[this.corpusUid]
    },
    corpuPermission: function corpuPermission () {
      return this.$store.getters['cml/corpus/permission'](this.corpusUid)
    }
  },

  created: function created () {
    this.$store.dispatch('cml/medias/register', { uid: this.uid, corpuUid: this.corpusUid });
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    setEvent: function setEvent (e) {
      this.set(e.target.value);
    },
    set: function set (id) {
      this.$store.dispatch('cml/medias/set', {
        id: id,
        corpuUid: this.corpusUid,
        uid: this.uid
      });
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var layers$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s mb-s"},[_vm._v("Layers")]),_vm._v(" "),(_vm.corpuPermission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, corpuId: _vm.corpuId, description: {}, metadataType: {}, fragmentType: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),(_vm.layers && _vm.layers.length > 0)?_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.layers),function(layer){return _c('tr',{key:layer.id},[_c('td',[_c('input',{attrs:{"type":"checkbox"},domProps:{"value":layer.id,"checked":_vm.activeIds.indexOf(layer.id) !== -1},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(layer.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupPermissionsConfig, element: layer });}}},[_vm._v("Permissions")]):_vm._e(),_vm._v(" "),(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: layer });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: layer });}}},[_vm._v("Remove")]):_vm._e()])])})],2)]):_vm._e()])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'CamomileLayers',

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    corpusUid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Remove layer',
        component: popupRemove
      },
      popupPermissionsConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Layer permissions',
        component: popupPermissions,
        uid: this.corpusUid
      }
    }
  },

  computed: {
    layers: function layers () {
      return this.$store.state.cml.layers.lists[this.corpusUid]
    },
    activeIds: function activeIds () {
      return this.$store.getters['cml/layers/activeIds'](this.uid)
    },
    corpus: function corpus () {
      return this.$store.state.cml.corpus.lists[this.corpusUid]
    },
    corpuId: function corpuId () {
      return this.$store.state.cml.corpus.actives[this.corpusUid]
    },
    corpuPermission: function corpuPermission () {
      return this.$store.getters['cml/corpus/permission'](this.corpusUid)
    }
  },

  created: function created () {
    this.$store.dispatch('cml/layers/register', {
      uid: this.uid,
      corpuUid: this.corpusUid
    });
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e) {
      if (e.target.checked) {
        this.$store.dispatch('cml/layers/set', {
          id: e.target.value,
          uid: this.uid
        });
      } else {
        this.$store.dispatch('cml/layers/unset', {
          id: e.target.value,
          uid: this.uid
        });
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var annotationsLayerDetail = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":_vm.annotation.id,"checked":_vm.activeId && _vm.activeId === _vm.annotation.id},on:{"change":function($event){_vm.set($event);}}})]),_vm._v(" "),_c('td',[_c('span',{staticClass:"h6 bold bg-neutral color-bg py-xxs px-xs rnd"},[_vm._v("…"+_vm._s(_vm._f("stringEnd")(_vm.annotation.id)))])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.mediaName))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(_vm.layerPermission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: _vm.annotation });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.layerPermission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: _vm.annotation });}}},[_vm._v("Remove")]):_vm._e()])])},staticRenderFns: [],
  name: 'CamomileAnnotations',

  filters: {
    stringEnd: function stringEnd (value) {
      return value ? value.substr(value.length - 6) : ''
    }
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    annotation: {
      type: Object,
      default: function () { return ({}); }
    },
    layerPermission: {
      type: Number,
      default: 0
    },
    mediaName: {
      type: String,
      default: 'hash'
    },
    mediaId: {
      type: String,
      default: 'hash'
    },
    activeId: {
      type: String,
      default: 'hash'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Edit annotation',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Remove annotation',
        component: popupRemove
      }
    }
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e) {
      if (e.target.checked) {
        this.$store.commit('cml/annotations/set', {
          id: e.target.value,
          uid: this.uid
        });
      } else {
        this.$store.commit('cml/annotations/unset', {
          id: e.target.value,
          uid: this.uid
        });
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var annotationsLayer = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v(_vm._s(_vm.layer.name))]),_vm._v(" "),(_vm.layer.permission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, layerId: _vm.layer.id, mediaId: _vm.mediaId, fragment: _vm.layer.fragmentType, metadata: _vm.layer.metadataType } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.annotations),function(annotation){return _c('annotations-layer-detail',{key:annotation.id,attrs:{"annotation":annotation,"uid":_vm.uid,"layer-permission":_vm.layer.permission,"media-name":_vm.mediaName,"media-id":_vm.mediaId,"active-id":_vm.activeId}})})],2)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Id")]),_c('th',[_vm._v("Medium")]),_c('th')])}],
  name: 'CamomileLayers',

  components: {
    annotationsLayerDetail: annotationsLayerDetail
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layer: {
      type: Object,
      default: function () { return ({}); }
    },
    annotations: {
      type: Array,
      default: function () { return []; }
    },
    activeId: {
      type: String,
      default: 'hash'
    },
    mediaId: {
      type: String,
      default: 'hash'
    },
    mediaName: {
      type: String,
      default: 'hash'
    }
  },

  data: function data () {
    return {
      popupAddConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupEdit
      }
    }
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e, layerId) {
      if (e.target.checked) {
        this.$store.commit('cml/annotations/set', {
          id: e.target.value,
          uid: this.uid
        });
      } else {
        this.$store.commit('cml/annotations/unset', {
          id: e.target.value,
          uid: this.uid
        });
      }
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var annotations$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._m(0),_vm._v(" "),_vm._l((_vm.layers),function(layer){return (_vm.annotations[layer.id])?_c('annotations-layer',{key:layer.id,staticClass:"mt",attrs:{"layer":layer,"annotations":_vm.annotations[layer.id],"active-id":_vm.activeId,"media-id":_vm.mediaId,"media-name":_vm.mediaName}}):_vm._e()})],2)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s mb-s"},[_vm._v("Annotations")])])}],
  name: 'CamomileAnnotations',

  components: {
    annotationsLayer: annotationsLayer
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    annotations: function annotations () {
      return this.$store.getters['cml/annotations/lists'](this.uid)
    },
    activeId: function activeId () {
      return this.$store.state.cml.annotations.actives[this.uid] || null
    },
    layers: function layers () {
      return this.$store.getters['cml/layers/actives'](this.layersUid)
    },
    mediaId: function mediaId () {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    mediaName: function mediaName () {
      var media = this.$store.getters['cml/medias/active'](this.mediaUid);
      return media ? media.name : ''
    }
  },

  created: function created () {
    this.$store.dispatch('cml/annotations/register', {
      uid: this.uid,
      mediaUid: this.mediaUid,
      layersUid: this.layersUid
    });
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();







var spinner = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner"},[_c('div',{staticClass:"bounce1"}),_vm._v(" "),_c('div',{staticClass:"bounce2"}),_vm._v(" "),_c('div',{staticClass:"bounce3"})])}],
  name: 'CamomileUtilsSpinner'
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var youtube = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.media)?_c('div',{ref:"container"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLoaded),expression:"isLoaded"}]},[_c('div',{attrs:{"id":"player"}})]),_vm._v(" "),(!_vm.isLoaded)?_c('spinner'):_vm._e()],1):_vm._e()},staticRenderFns: [],
  name: 'CamomileMediaYoutube',

  components: {
    spinner: spinner
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    filter: {
      type: Function,
      default: function (media) { return media &&
        media.description &&
        media.description.type && media.description.type === 'youtube' && media; }
    }
  },

  data: function data () {
    return {
      player: null,
      videoNew: false
    }
  },

  computed: {
    media: function media () {
      return this.$store.getters['cml/medias/active'](this.mediaUid, this.filter)
    },
    properties: function properties () {
      return this.$store.getters['cml/medias/properties'](this.mediaUid, this.filter)
    },
    isPlaying: function isPlaying () {
      return this.properties.isPlaying || false
    },
    isLoaded: function isLoaded () {
      return this.properties.isLoaded || false
    },
    seek: function seek () {
      return this.properties.seek || {}
    },
    timeCurrent: function timeCurrent () {
      return this.properties.timeCurrent || 0
    },
    viewportWidth: function viewportWidth () {
      return this.$store.state.cml.viewport.width || 0
    }
  },

  watch: {
    isPlaying: function isPlaying (val) {
      if (val) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    },
    seek: function seek (options) {
      if (options.seeking) {
        this.videoSeek(options.serverRequest);
      }
    },
    viewportWidth: function viewportWidth () {
      if (this.media) {
        var width = this.$refs.container.offsetWidth;
        var height = width * 9 / 16;
        this.player.setSize(width, height);
      }
    },
    media: function media (media$1, mediaOld) {
      if (
        media$1 &&
        media$1.url &&
        mediaOld &&
        mediaOld.url &&
        media$1.url !== mediaOld.url
      ) {
        this.videoLoad(media$1.url);
      }
    }
  },

  mounted: function mounted () {
    if (this.media && this.media.url) {
      this.playerLoad(this.media.url);
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy();
    }

    this.player = null;
  },

  methods: {
    videoLoad: function videoLoad (mediaUrl) {
      if (this.player) {
        var videoId = this.parseYouTubeId(mediaUrl);
        this.player.loadVideoById(videoId);
      } else {
        this.playerLoad(this.media.url);
      }
    },

    playerLoad: function playerLoad (mediaUrl) {
      var this$1 = this;

      var videoId = this.parseYouTubeId(mediaUrl);
      var width = this.$refs.container.offsetWidth;
      var height = width * 9 / 16;
      var events = {
        onReady: function (event) {
          // console.log('onReady', event)
          this$1.$store.commit('cml/medias/loaded', {
            isLoaded: true,
            uid: this$1.mediaUid
          });
          this$1.$store.commit('cml/medias/timeTotal', {
            time: this$1.player.getDuration() * 1000,
            uid: this$1.mediaUid
          });
        },
        onStateChange: function (event) {
          // console.log('onStateChange', event.data, this.videoNew)
          if (event.data === -1) {
            // unstarted
          } else if (event.data === 1) {
            // playing
            if (this$1.videoNew) {
              this$1.videoNew = false;
              this$1.$store.commit('cml/medias/loaded', {
                isLoaded: true,
                uid: this$1.mediaUid
              });
              this$1.$store.commit('cml/medias/timeTotal', {
                time: this$1.player.getDuration() * 1000,
                uid: this$1.mediaUid
              });
              this$1.player.pauseVideo();
            } else {
              this$1.$store.dispatch('cml/medias/play', { uid: this$1.mediaUid });
            }
          } else if (event.data === 2) {
            // paused
            this$1.$store.dispatch('cml/medias/pause', { uid: this$1.mediaUid });
          } else if (event.data === 3) {
            // buffering
            this$1.$store.dispatch('cml/medias/buffering', { uid: this$1.mediaUid });
          } else if (event.data === 0) {
            // ended
            this$1.$store.dispatch('cml/medias/stop', { uid: this$1.mediaUid });
          } else if (event.data === 5) {
            // cued
            this$1.$store.commit('cml/medias/loaded', {
              isLoaded: true,
              uid: this$1.mediaUid
            });
            this$1.$store.commit('cml/medias/timeTotal', {
              time: this$1.player.getDuration() * 1000,
              uid: this$1.mediaUid
            });
          }
        },
        onApiChange: function (event) {
          // console.log('onApiChange', event, this.isLoaded)
          if (!this$1.isLoaded) {
            this$1.videoNew = true;
          }
        }
      };
      var playerVars = {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        enablejsapi: 1,
        disablekb: 1
      };

      var tag = document.createElement('script');
      var scriptTags = document.getElementsByTagName('script');
      var scriptTagLast = scriptTags[scriptTags.length - 1];

      tag.src = 'https://www.youtube.com/iframe_api';
      scriptTagLast.parentNode.insertBefore(tag, scriptTagLast.nextSibling);

      // @ts-ignore
      window.onYouTubeIframeAPIReady = function () {
        /* global YT */
        // @ts-ignore
        this$1.player = new YT.Player('player', {
          width: width,
          height: height,
          videoId: videoId,
          playerVars: playerVars,
          events: events
        });
      };
    },
    videoSeek: function videoSeek (serverRequest) {
      this.player.seekTo(this.timeCurrent / 1000, serverRequest);
      this.$store.commit('cml/medias/seek', {
        options: { seeking: false },
        uid: this.mediaUid
      });
    },
    parseYouTubeId: function parseYouTubeId (url) {
      var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      return url.match(regex) ? RegExp.$2 : url
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var videoPlayer = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.media)?_c('div',{ref:"container"},[_c('video',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLoaded),expression:"isLoaded"}],ref:"video",staticClass:"object-fit",attrs:{"id":"bgvid"},on:{"ended":_vm.videoEnded,"click":_vm.videoToggle,"play":_vm.buttonToggle,"pause":_vm.buttonToggle,"timeupdate":_vm.videoTimeupdate,"canplay":_vm.videoLoad}},[_c('source',{attrs:{"src":_vm.media.url,"type":"video/mp4"}})]),_vm._v(" "),(!_vm.isLoaded)?_c('spinner'):_vm._e()],1):_vm._e()},staticRenderFns: [],
  name: 'CamomileMediaVideo',

  components: {
    spinner: spinner
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    filter: {
      type: Function,
      default: function (media) { return media &&
        media.description &&
        media.description.type && media.description.type === 'video' && media; }
    }
  },

  data: function data () {
    return {
      mousedown: false,
      videoLoaded: false,
      timeTotal: 0
    }
  },

  computed: {
    media: function media () {
      return this.$store.getters['cml/medias/active'](this.mediaUid, this.filter)
    },
    properties: function properties () {
      return this.$store.getters['cml/medias/properties'](this.mediaUid, this.filter)
    },
    isPlaying: function isPlaying () {
      return this.properties.isPlaying || false
    },
    isLoaded: function isLoaded () {
      return this.properties.isLoaded || false
    },
    seek: function seek () {
      return this.properties.seek || {}
    },
    timeCurrent: function timeCurrent () {
      return this.properties.timeCurrent || 0
    },
    viewportWidth: function viewportWidth () {
      return this.$store.state.cml.viewport.width || 0
    }
  },

  watch: {
    isPlaying: function isPlaying (val) {
      if (val) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    seek: function seek (options) {
      if (options.seeking) {
        this.videoSeek();
      }
    },
    viewportWidth: function viewportWidth () {
      var width = this.$refs.container.offsetWidth;
    },
    media: function media (media$1, mediaOld) {
      if (
        media$1 &&
        media$1.url &&
        mediaOld &&
        mediaOld.url &&
        media$1.url !== mediaOld.url
      ) {
        this.videoLoad();
      }
    }
  },

  methods: {
    videoEnded: function videoEnded () {
      this.$store.dispatch('cml/medias/stop', { uid: this.mediaUid });
    },
    videoToggle: function videoToggle () {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    buttonToggle: function buttonToggle () {
      if (this.$refs.video.paused) {
        this.$store.dispatch('cml/medias/pause', { uid: this.mediaUid });
      } else {
        this.$store.dispatch('cml/medias/play', { uid: this.mediaUid });
      }
    },
    videoTimeupdate: function videoTimeupdate () {
      if (this.$refs.video) {
        var percent =
          this.$refs.video.currentTime / this.$refs.video.duration * 100;
      }
    },
    videoSeek: function videoSeek (e) {
      this.$refs.video.currentTime = this.timeCurrent / 1000;
    },
    videoLoad: function videoLoad () {
      this.$store.commit('cml/medias/loaded', {
        isLoaded: true,
        uid: this.mediaUid
      });

      this.$store.commit('cml/medias/timeTotal', {
        time: this.$refs.video.duration * 1000,
        uid: this.mediaUid
      });
      this.$refs.video.volume = 0;
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();


















var annotationsBloc = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.visible)?_c('div',{ref:"annotation",style:({ left: ((_vm.left) + "%"), top: ((_vm.top) + "%"), width:((_vm.width) + "%"), height:((_vm.height) + "%") })},[_c('div',{staticClass:"relative full-y",on:{"mousedown":function($event){_vm.set($event);}}},[_c('div',{staticClass:"absolute handle handle-topleft",on:{"mousedown":function($event){_vm.dragTopleftOn($event);}}}),_vm._v(" "),_c('div',{staticClass:"absolute handle handle-bottomright",on:{"mousedown":function($event){_vm.dragBottomrightOn($event);}}})])]):_vm._e()},staticRenderFns: [],
  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    annotation: {
      type: Object,
      default: function () { return ({}); }
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    timeCurrent: {
      type: Number,
      default: 0
    },
    containerWidth: {
      type: Number,
      default: 0
    }
  },

  data: function data () {
    return {
      leftDragging: null,
      topDragging: null,
      rightDragging: null,
      bottomDragging: null,
      handleWidth: 32
    }
  },

  computed: {
    timeStart: function timeStart () {
      return this.annotation.fragment.time.start
    },
    timeEnd: function timeEnd () {
      return this.annotation.fragment.time.end
    },
    positionIndex: function positionIndex () {
      var this$1 = this;

      return this.annotation.fragment.positions
        .slice()
        .reverse()
        .findIndex(function (pos) { return pos.time <= this$1.timeCurrent; })
    },
    visible: function visible () {
      return (
        this.positionIndex !== -1 &&
        this.timeStart <= this.timeCurrent &&
        this.timeEnd >= this.timeCurrent
      )
    },
    position: function position () {
      return this.annotation.fragment.positions[this.positionIndex]
    },
    left: function left () {
      if (this.visible) {
        return this.leftDragging !== null
          ? this.leftDragging
          : this.position.left
      }
    },
    top: function top () {
      if (this.visible) {
        return this.topDragging !== null ? this.topDragging : this.position.top
      }
    },
    width: function width () {
      if (this.visible) {
        return this.bottomDragging !== null
          ? this.bottomDragging
          : this.position.width
      }
    },
    height: function height () {
      if (this.visible) {
        return this.bottomDragging !== null
          ? this.bottomDragging
          : this.position.height
      }
    }
  },

  methods: {
    positionUpdate: function positionUpdate (positions) {
      var element = Object.assign({}, this.annotation);
      positions.forEach(
        function (position) { return (element.fragment.position[position.type] = position.value); }
      );
      return this.$store.dispatch('cml/annotations/update', { element: element })
    },
    dragTopleftOn: function dragTopleftOn (e) {
      document.addEventListener('mousemove', this.dragTopleft);
      document.addEventListener('mouseup', this.dragTopleftOff);
    },
    dragTopleftOff: function dragTopleftOff (e) {
      document.removeEventListener('mousemove', this.dragTopleft);
      document.removeEventListener('mouseup', this.dragTopleftOff);
      var positions = [
        {
          type: 'top',
          value: this.$refs.annotation.offsetTop
        },
        {
          type: 'top',
          value: this.$refs.annotation.offsetLeft
        }
      ];
      this.positionUpdate(positions);
      this.topleftDragging = null;
    },
    dragTopleft: function dragTopleft (e) {
      var c = e.clientX - this.containerLeft + this.handleWidth / 2;

      if (c < 0) {
        this.topDragging = 0;
      } else if (c > this.containerWidth - this.right) {
        this.topDragging = this.containerWidth - this.right;
      } else {
        this.topDragging = c;
      }
    },
    dragBottomrightOn: function dragBottomrightOn (e) {
      document.addEventListener('mousemove', this.dragRight);
      document.addEventListener('mouseup', this.dragRightOff);
    },
    dragRightOff: function dragRightOff (e) {
      document.removeEventListener('mousemove', this.dragRight);
      document.removeEventListener('mouseup', this.dragRightOff);
      var time = Math.round(
        (this.$refs.annotation.offsetLeft + this.$refs.annotation.offsetWidth) *
        this.timeTotal /
        this.containerWidth
      );
      this.positionUpdate(time, 'end');
      this.bottomDragging = null;
    },
    dragRight: function dragRight (e) {
      var c =
        this.containerWidth +
        this.containerLeft -
        e.clientX +
        this.handleWidth / 2;

      this.bottomDragging = c > 0 ? c : 0;
    },
    set: function set (e) {
      this.$store.commit('cml/annotations/set', {
        id: this.annotation.id,
        uid: this.uid
      });
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
var zoningAnnotations = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container"},_vm._l((_vm.annotations),function(annotation){return _c('annotations-bloc',{key:annotation.id,staticClass:"absolute annotation",style:({ zIndex: annotation.id === _vm.activeId ? 1 : 0}),attrs:{"annotation":annotation,"uid":_vm.uid,"layers-uid":_vm.layersUid,"time-total":_vm.timeTotal,"time-current":_vm.timeCurrent,"container-width":_vm.containerWidth,"container-height":_vm.containerHeight}})}))},staticRenderFns: [],
  components: {
    annotationsBloc: annotationsBloc
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    annotations: {
      type: Array,
      default: function () { return []; }
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    timeCurrent: {
      type: Number,
      default: 0
    }
  },

  data: function data () {
    return {
      containerWidth: 0,
      containerHeight: 0
    }
  },

  computed: {
    activeId: function activeId () {
      return this.$store.state.cml.annotations.actives[this.uid]
    }
  },

  mounted: function mounted () {
    window.addEventListener('resize', this.resize);
    this.containerWidth = this.$refs.container.offsetWidth;
    this.containerHeight = this.$refs.container.offsetHeight;
  },

  methods: {
    resize: function resize () { }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var zoning = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",staticClass:"relative full-y"},_vm._l((_vm.layers),function(layer){return (_vm.annotations[layer.id])?_c('zoning-annotations',{key:("annotations-" + (layer.id)),staticClass:"absolute full",attrs:{"uid":_vm.uid,"layers-uid":_vm.layersUid,"layer-id":layer.id,"annotations":_vm.annotations[layer.id],"time-total":_vm.timeTotal,"time-current":_vm.timeCurrent}}):_vm._e()}))},staticRenderFns: [],
  components: { zoningAnnotations: zoningAnnotations },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    },
    layers: {
      type: Array,
      default: function () { return []; }
    },
    filter: {
      type: Function,
      default: function (a) { return a.fragment &&
        a.fragment.time &&
        !isNaN(a.fragment.time.start) &&
        !isNaN(a.fragment.time.end) &&
        a.fragment.positions &&
        a.fragment.positions instanceof Array &&
        a; }
    }
  },

  computed: {
    mediaProperties: function mediaProperties () {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    timeCurrent: function timeCurrent () {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal: function timeTotal () {
      return this.mediaProperties.timeTotal || 0
    },
    annotations: function annotations () {
      return this.$store.getters['cml/annotations/filter'](this.uid, this.filter)
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var videozoning = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"relative"},[(_vm.layers)?_c('zoning',{staticClass:"absolute full",attrs:{"media-uid":_vm.mediaUid,"uid":_vm.uid,"layers-uid":_vm.layersUid,"filter":_vm.annotationsFilter,"layers":_vm.layers}}):_vm._e(),_vm._v(" "),_c('video-player',{attrs:{"media-uid":_vm.mediaUid,"filter":_vm.mediaFilter}})],1)},staticRenderFns: [],
  name: 'CamomileMediaVideo',

  components: {
    videoPlayer: videoPlayer,
    zoning: zoning
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    },
    annotationsFilter: Function,
    mediaFilter: Function
  },

  computed: {
    layers: function layers () {
      var active = this.$store.state.cml.layers.actives[this.layersUid];
      return active ? this.$store.state.cml.layers.lists[active.corpuUid] : {}
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();





























var controller = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mediacontroller"},[_c('div',{staticClass:"mediacontroller-controls clearfix pb-s"},[_c('button',{ref:"button",staticClass:"mediacontroller-button btn",attrs:{"disabled":!_vm.isLoaded},on:{"click":_vm.mediaToggle}},[_vm._v(_vm._s(_vm.playButton))]),_vm._v(" "),_c('div',{ref:"counter",staticClass:"mediacontroller-counter"},[_vm._v(_vm._s(_vm.msToMinutesAndSeconds(_vm.timeCurrent))+" / "+_vm._s(_vm.msToMinutesAndSeconds(_vm.timeTotal))+" ")])]),_vm._v(" "),_c('div',{ref:"progress",staticClass:"mediacontroller-progress",class:{ loaded: _vm.isLoaded },on:{"mousedown":function($event){_vm.progressMousedown($event);}}},[_c('div',{staticClass:"pointer-none full-y"},[_c('div',{staticClass:"mediacontroller-progress-bar",style:({ width: _vm.progressBarWidth })})])])])},staticRenderFns: [],
  props: {
    mediaUid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      mousedown: false
    }
  },

  computed: {
    properties: function properties () {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    timeCurrent: function timeCurrent () {
      return this.properties.timeCurrent || 0
    },
    timeTotal: function timeTotal () {
      return this.properties.timeTotal || 0
    },
    playButton: function playButton () {
      return (this.properties.isPlaying && '❚ ❚') || '►'
    },
    isLoaded: function isLoaded () {
      return this.properties.isLoaded || false
    },
    progressBarWidth: function progressBarWidth () {
      return this.timeTotal ? ((this.timeCurrent / this.timeTotal * 100) + "%") : 0
    }
  },

  methods: {
    mediaToggle: function mediaToggle () {
      if (this.properties.isPlaying) {
        this.$store.commit('cml/medias/pause', { uid: this.mediaUid });
      } else {
        this.$store.commit('cml/medias/play', { uid: this.mediaUid });
      }
    },
    progressMousemove: function progressMousemove (e) {
      var x;
      if (e.clientX - this.$refs.progress.offsetLeft < 0) {
        x = 0;
      } else if (
        e.clientX >
        this.$refs.progress.offsetLeft + this.$refs.progress.offsetWidth
      ) {
        x = 1;
      } else {
        x =
          (e.clientX - this.$refs.progress.offsetLeft) /
          this.$refs.progress.offsetWidth;
      }
      this.seek(x, false);
    },
    progressMousedown: function progressMousedown (e) {
      document.addEventListener('mousemove', this.progressMousemove);
      document.addEventListener('mouseup', this.progressMouseup);
      this.progressMousemove(e);
    },
    progressMouseup: function progressMouseup () {
      document.removeEventListener('mousemove', this.progressMousemove);
      document.removeEventListener('mouseup', this.progressMouseup);
    },
    seek: function seek (ratio, serverRequest, uid) {
      if (this.properties.isLoaded) {
        this.$store.dispatch('cml/medias/seek', {
          ratio: ratio,
          serverRequest: serverRequest,
          uid: this.mediaUid
        });
      }
    },
    msToMinutesAndSeconds: function msToMinutesAndSeconds (ms) {
      var minutes = Math.floor(ms / 60000);
      var seconds = (ms % 60000) / 1000;
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds.toFixed(0)
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var annotationButton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn p-s",on:{"click":_vm.popupAnnotationLabelOpen}},[_c('i',{staticClass:"icon-24 icon-24-plus"})])},staticRenderFns: [],
  props: {
    layerId: {
      type: String,
      default: 'layerIdHash'
    },
    mediaId: {
      type: String,
      default: 'mediaIdHash'
    },
    annotations: {
      type: Array,
      default: function () { return []; }
    },
    fragmentType: {
      type: Object,
      default: function () { return ({}); }
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    timeCurrent: {
      type: Number,
      default: 0
    }
  },

  data: function data () {
    return {
      popupAnnotationLabelConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupAnnotationLabel
      }
    }
  },

  methods: {
    popupAnnotationLabelOpen: function popupAnnotationLabelOpen () {
      var element = {
        id: null,
        layerId: this.layerId,
        mediaId: this.mediaId,
        fragment: this.fragmentTypeFormat(this.fragmentType),
        metadata: { label: '' }
      };
      return this.$store.commit('cml/popup/open', {
        config: this.popupAnnotationLabelConfig,
        element: element
      })
    },

    fragmentTypeFormat: function fragmentTypeFormat (fragmentType) {
      if (!fragmentType.time) {
        fragmentType.time = {};
      }
      fragmentType.time.start = this.timeCurrent;
      fragmentType.time.end = this.timeCurrent + this.timeTotal / 10;
      return fragmentType
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var buttons = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.layers),function(layer){return (_vm.annotations[layer.id] && layer.permission === 3)?_c('annotation-button',{key:("annotation-button-" + (layer.id)),attrs:{"layer-id":layer.id,"media-id":_vm.mediaId,"time-current":_vm.timeCurrent,"time-total":_vm.timeTotal,"fragment-type":layer.fragmentType}}):_vm._e()}))},staticRenderFns: [],
  components: {
    annotationButton: annotationButton
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    mediaProperties: function mediaProperties () {
      return this.$store.getters['cml/medias/properties'](this.mediaUid)
    },
    timeCurrent: function timeCurrent () {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal: function timeTotal () {
      return this.mediaProperties.timeTotal || 0
    },
    annotations: function annotations () {
      return this.$store.getters['cml/annotations/lists'](this.uid)
    },
    mediaId: function mediaId () {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    layers: function layers () {
      return this.$store.getters['cml/layers/actives'](this.layersUid)
    }
  },

  methods: {
    resize: function resize () { }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var annotationsBloc$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"annotation",style:({ left: ((_vm.left) + "px"), right: ((_vm.right) + "px") })},[_c('div',{staticClass:"relative full-y",on:{"mousedown":function($event){_vm.set($event);},"dblclick":_vm.popupAnotationLabelOpen}},[_c('div',{staticClass:"absolute handle handle-left",on:{"mousedown":function($event){_vm.dragLeftOn($event);}}}),_vm._v(" "),_c('div',{staticClass:"absolute handle handle-right",on:{"mousedown":function($event){_vm.dragRightOn($event);}}})])])},staticRenderFns: [],
  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    annotation: {
      type: Object,
      default: function () { return ({}); }
    },
    fragmentType: {
      type: Object,
      default: function () { return ({}); }
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    containerWidth: {
      type: Number,
      default: 0
    },
    containerLeft: {
      type: Number,
      default: 0
    }
  },

  data: function data () {
    return {
      leftDragging: null,
      rightDragging: null,
      handleWidth: 32,
      popupAnnotationLabelConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupAnnotationLabel
      }
    }
  },

  computed: {
    time: function time () {
      return this.annotation.fragment.time
    },
    left: function left () {
      return this.leftDragging !== null
        ? this.leftDragging
        : this.time.start * this.containerWidth / this.timeTotal
    },
    right: function right () {
      return this.rightDragging !== null
        ? this.rightDragging
        : (this.timeTotal - this.time.end) *
        this.containerWidth /
        this.timeTotal
    }
  },

  methods: {
    timeUpdate: function timeUpdate (time, type) {
      var element = Object.assign({}, this.annotation);
      element.fragment.time[type] = time;
      return this.$store.dispatch('cml/annotations/update', { element: element })
    },
    dragLeftOn: function dragLeftOn (e) {
      document.addEventListener('mousemove', this.dragLeft);
      document.addEventListener('mouseup', this.dragLeftOff);
    },
    dragLeftOff: function dragLeftOff (e) {
      document.removeEventListener('mousemove', this.dragLeft);
      document.removeEventListener('mouseup', this.dragLeftOff);
      var time = Math.round(
        this.$refs.annotation.offsetLeft * this.timeTotal / this.containerWidth
      );
      this.timeUpdate(time, 'start');
      this.leftDragging = null;
    },
    dragLeft: function dragLeft (e) {
      var c = e.clientX - this.containerLeft + this.handleWidth / 2;

      if (c < 0) {
        this.leftDragging = 0;
      } else if (c > this.containerWidth - this.right) {
        this.leftDragging = this.containerWidth - this.right;
      } else {
        this.leftDragging = c;
      }
    },
    dragRightOn: function dragRightOn (e) {
      document.addEventListener('mousemove', this.dragRight);
      document.addEventListener('mouseup', this.dragRightOff);
    },
    dragRightOff: function dragRightOff (e) {
      document.removeEventListener('mousemove', this.dragRight);
      document.removeEventListener('mouseup', this.dragRightOff);
      var time = Math.round(
        (this.$refs.annotation.offsetLeft + this.$refs.annotation.offsetWidth) *
        this.timeTotal /
        this.containerWidth
      );
      this.timeUpdate(time, 'end');
      this.rightDragging = null;
    },
    dragRight: function dragRight (e) {
      var c =
        this.containerWidth +
        this.containerLeft -
        e.clientX +
        this.handleWidth / 2;

      this.rightDragging = c > 0 ? c : 0;
    },
    set: function set (e) {
      this.$store.commit('cml/annotations/set', {
        id: this.annotation.id,
        uid: this.uid
      });
    },
    popupAnotationLabelOpen: function popupAnotationLabelOpen () {
      var element = this.annotation;
      return this.$store.commit('cml/popup/open', {
        config: this.popupAnnotationLabelConfig,
        element: element
      })
    },
    fragmentTypeFormat: function fragmentTypeFormat (fragmentType) {
      if (!fragmentType.time) {
        fragmentType.time = {};
      }
      fragmentType.time.start = this.timeCurrent;
      fragmentType.time.end = this.timeCurrent + 25000;
      return fragmentType
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .annotation[data-v-d1d8581e] { top: 0; bottom: 0; text-align: center; } .annotation.active[data-v-d1d8581e] { z-index: 1; background-color: rgba(255, 0, 0, 1); } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var timelineAnnotations = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container"},_vm._l((_vm.annotations),function(annotation){return _c('annotations-bloc',{key:annotation.id,staticClass:"absolute annotation",class:{ active: annotation.id === _vm.activeId },attrs:{"annotation":annotation,"uid":_vm.uid,"layers-uid":_vm.layersUid,"layer-id":_vm.layerId,"time-total":_vm.timeTotal,"container-width":_vm.width,"container-left":_vm.left}})}))},staticRenderFns: [],_scopeId: 'data-v-d1d8581e',
  components: {
    annotationsBloc: annotationsBloc$1
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    layerId: {
      type: String,
      default: 'layerIdHash'
    },
    annotations: {
      type: Array,
      default: function () { return []; }
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },

  computed: {
    activeId: function activeId () {
      return this.$store.state.cml.annotations.actives[this.uid]
    }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .timeline-annotations { z-index: 0; } .annotations { height: 40px; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var timeline = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container"},[(_vm.layers)?_c('div',{staticClass:"relative overflow-hidden",style:({ height: ((40 * _vm.layers.length) + "px") })},[_c('div',{staticClass:"absolute timeline-cursor"}),_vm._v(" "),_c('div',{staticClass:"absolute timeline-annotations",style:({ top: 0, bottom: 0, left: ((_vm.left) + "px"), width: ((_vm.width) + "px") })},_vm._l((_vm.layers),function(layer){return (_vm.annotations[layer.id])?_c('timeline-annotations',{key:("annotations-" + (layer.id)),staticClass:"relative annotations",attrs:{"uid":_vm.uid,"layers-uid":_vm.layersUid,"layer-id":layer.id,"annotations":_vm.annotations[layer.id],"time-total":_vm.timeTotal,"width":_vm.width,"left":_vm.left + _vm.containerLeft,"fragment-type":layer.fragmentType}}):_vm._e()}))]):_vm._e()])},staticRenderFns: [],
  components: {
    timelineAnnotations: timelineAnnotations
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    },
    filter: {
      type: Function,
      default: function (a) { return a.fragment &&
        a.fragment.time &&
        !isNaN(a.fragment.time.start) &&
        !isNaN(a.fragment.time.end) &&
        a; }
    }
  },

  data: function data () {
    return {
      width: 3000,
      containerWidth: 0,
      containerLeft: 0
    }
  },

  computed: {
    mediaProperties: function mediaProperties () {
      return this.$store.getters['cml/medias/properties'](this.mediaUid)
    },
    timeCurrent: function timeCurrent () {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal: function timeTotal () {
      return this.mediaProperties.timeTotal || 0
    },
    annotations: function annotations () {
      return this.$store.getters['cml/annotations/filter'](this.uid, this.filter)
    },
    layers: function layers () {
      return this.$store.getters['cml/layers/actives'](this.layersUid)
    },
    left: function left () {
      return (
        this.containerWidth / 2 - this.timeCurrent / this.timeTotal * this.width
      )
    }
  },

  mounted: function mounted () {
    window.addEventListener('resize', this.resize);
    this.containerWidth = this.$refs.container.offsetWidth;
    this.containerLeft = this.$refs.container.offsetLeft;
  },

  methods: {
    resize: function resize () { }
  }
}

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();




var edit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')},staticRenderFns: [],
  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    annotations: function annotations () {
      return this.$store.getters['cml/annotations/lists'](this.uid)
    },
    mediaId: function mediaId () {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    layers: function layers () {
      return this.$store.getters['cml/layers/actives'](this.layersUid)
    }
  },

}

exports.cmlApp = app;
exports.cmlUsers = users$1;
exports.cmlGroups = groups$1;
exports.cmlCorpus = corpus$1;
exports.cmlMedias = medias$1;
exports.cmlLayers = layers$1;
exports.cmlAnnotations = annotations$1;
exports.cmlMediasYoutube = youtube;
exports.cmlMediasVideo = videoPlayer;
exports.cmlMediasVideozoning = videozoning;
exports.cmlMediasController = controller;
exports.cmlAnnotationsButtons = buttons;
exports.cmlAnnotationsTimeline = timeline;
exports.cmlAnnotationsEdit = edit;

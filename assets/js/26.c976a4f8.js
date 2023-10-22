(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{307:function(s,a,t){"use strict";t.r(a);var e=t(14),r=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"acme-sh-获取证书"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#acme-sh-获取证书"}},[s._v("#")]),s._v(" acme.sh 获取证书")]),s._v(" "),a("p",[s._v("为什么需要申请证书？")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("访问 syncthing 管理页面需要用到 https，使用域名证书更优雅")])]),s._v(" "),a("li",[a("p",[s._v("访问 stdicosrv ，如果使用域名证书可以省去携带 deviceID")])])]),s._v(" "),a("p",[s._v("能不能不用域名证书？")]),s._v(" "),a("ul",[a("li",[s._v("可以，但不够优雅")])]),s._v(" "),a("p",[s._v("开始之前你需要准备一个域名，证书将使用 acme.sh 申请。现在 acme.sh 一般提供 ZeroSSL 签名的证书，有效期 3 个月，到期前 acme.sh 可以自动续签。")]),s._v(" "),a("h2",{attrs:{id:"_1-get-acme-sh"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-get-acme-sh"}},[s._v("#")]),s._v(" 1. Get acme.sh")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/acmesh-official/acme.sh.git\n")])])]),a("h2",{attrs:{id:"_2-using-dnsapi-to-issue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-using-dnsapi-to-issue"}},[s._v("#")]),s._v(" 2. Using dnsapi to issue")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" acme.sh\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CF_Account_ID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Cloud flare account ID"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CF_Token")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Cloud flare token"')]),s._v("\n./acme.sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--issue")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--dns")]),s._v(" dns_cf "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("域名"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--keylength")]),s._v(" ec-384\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);
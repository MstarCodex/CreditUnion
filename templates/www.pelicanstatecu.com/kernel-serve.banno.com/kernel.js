var kernelAssociateTimeout = null,
    kernelSyncTimeout = null,
    kernelLoginFormElementId = null;
(function() {
    function v(a) {
        var b = Array.prototype.slice.call(a);
        "create" == b.shift() ? (w.apply(null, b), w = C) : p.push(a)
    }

    function D() {
        window.kernel = function() {
            x(arguments)
        };
        for (var a = 0, b = p.length; a < b; a++) x(p.shift());
        q("kernelReady")
    }

    function x(a) {
        a = Array.prototype.slice.call(a);
        var b = a.shift();
        "visit" == b ? E.apply(null, a) : "serve" == b ? F.apply(null, a) : "addClickthroughListeners" == b ? "" == h("previewAdId") && G.apply(null, a) : "associate" == b ? "[object Array]" == Object.prototype.toString.call(a[0]) ? y.apply(null, a) : y.apply(null, [
            [{
                loginFormId: a[0],
                usernameField: a[1]
            }]
        ]) : "testFunction" == b && H.apply(null, a)
    }

    function I() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            var b = 16 * Math.random() | 0;
            return ("x" == a ? b : b & 3 | 8).toString(16)
        })
    }

    function z(a) {
        return function(b) {
            function e(c) {
                return "a" == c.tagName.toLowerCase() ? c : e(c.parentElement)
            }

            function f(c) {
                c = c.parentElement;
                if (null != c) return c.hasAttribute("data-campaign-id") ? c : f(c)
            }
            b = b || window.event;
            var d = e(b.target || b.srcElement);
            "_blank" != d.target.toLowerCase() &&
                (clickedUrl = d.href, b.preventDefault());
            d = f(d);
            b = d.getAttribute("data-campaign-id");
            d = d.getAttribute("data-ad-id");
            b = "https://kernel-serve.banno.com/institutions/" + m + "/profiles/" + r + "/clickthrough?campaignId\x3d" + b + "\x26adId\x3d" + d + "\x26callback\x3d" + a;
            d = document.getElementsByTagName("head")[0];
            var g = document.createElement("script");
            g.setAttribute("src", b);
            d.appendChild(g);
            kernelClickthroughTimeout = window.setTimeout(function() {
                null != clickedUrl && (window.location.href = clickedUrl);
                clickedUrl = null
            }, 2E3)
        }
    }

    function n() {
        return null == m ? (window.console && console.error("Please send the 'institutionId' (in the 'create' operation) before invoking kernel operations."), !1) : !0
    }

    function t(a) {
        return "https://kernel-serve.banno.com/institutions/" + (m + "/profiles/" + r + "/" + a)
    }

    function A(a) {
        var b = document.getElementsByTagName("head")[0],
            e = document.createElement("script");
        e.type = "text/javascript";
        e.src = a;
        e.async = 1;
        b.appendChild(e)
    }

    function h(a) {
        return decodeURIComponent(((new RegExp("[?|\x26]" + a + "\x3d([^\x26;]+?)(\x26|#|;|$)")).exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || ""
    }

    function C() {}

    function q(a) {
        if ("undefined" != typeof document.createEvent) {
            var b = document.createEvent("Event");
            b.initEvent(a, !0, !0);
            window.dispatchEvent(b)
        } else if ("undefined" != typeof document.createEventObject) try {
            b = document.createEventObject(), window.fireEvent("on" + a.toLowerCase(), b)
        } catch (e) {}
    }
    var m = null,
        r = null,
        u = "auto",
        p = [],
        w = function(a, b) {
            null == a ? window.console && console.error("Please provide the institutionId in the 'create' operation.") : m = a;
            null != b && (u = b);
            var e =
                ("; " + document.cookie).split("; __bkp\x3d");
            e = 2 == e.length ? e.pop().split(";").shift() : "";
            0 == e.length && (e = I());
            var f = e;
            var d = new Date;
            var g = d.getTime();
            d.setTime(g + 63072E6);
            d = d.toGMTString();
            if ("auto" == u) {
                g = window.location.hostname;
                var c = g.split("."),
                    k = c.length;
                g = 2 < k ? "." + c[k - 2] + "." + c[k - 1] : "." + g
            } else g = u;
            document.cookie = "__bkp\x3d" + f + "; expires\x3d" + d + "; domain\x3d" + g + "; path\x3d/; SameSite\x3dLax; Secure";
            r = e
        };
    window.kernelTestValue = "Initial test value";
    var H = function(a) {
            n() && (window.kernelTestValue =
                a)
        },
        E = function(a) {
            if (n()) {
                a = a || {};
                if (a && null !== a.useMetaKeywords && "boolean" == typeof a.useMetaKeywords ? a.useMetaKeywords : 1) {
                    var b = a.keywordsMetaName || "keywords";
                    var e = [],
                        f = document.getElementsByTagName("meta");
                    if (f)
                        for (var d = 0, g = f.length; d < g; d++) f[d].name.toLowerCase() == b.toLowerCase() && e.push(f[d].content);
                    b = e
                } else b = [];
                a = "?keywords\x3d" + b.concat(a.keywords || []).join(",") + "\x26url\x3d" + encodeURIComponent(window.location.href);
                if ("true" == h("preview") || 0 != h("previewAdId").length) a += "\x26preview\x3dtrue";
                A(t("visit" + a))
            }
        },
        F = function() {
            if (n()) {
                var a = arguments;
                var b = h("previewAdId");
                var e = h("w") || h("width"),
                    f = h("h") || h("height"),
                    d = h("style");
                b = 0 == b.length ? null : {
                    adId: b,
                    width: e,
                    height: f,
                    style: d
                };
                d = "";
                e = 0;
                for (f = a.length; e < f; e++) {
                    var g = a[e];
                    var c = g.id || "";
                    var k = g.tags || [];
                    var l = g.w || g.width || "";
                    var J = g.h || g.height || "";
                    g = g.style || "";
                    c = 0 == c.length || null == document.getElementById(c) ? null : {
                        elementId: c,
                        width: l,
                        height: J,
                        style: g,
                        tags: k
                    };
                    null != c && (null != b ? (l = 0 != c.style.length && c.style == b.style, l = 0 != c.width.length &&
                        0 != c.height.length && c.width == b.width && c.height == b.height || l ? c.elementId + ":" + b.adId : "") : l = "", 0 == l.length ? (c = 0 == c.style.length ? c.elementId + ":" + c.width + "x" + c.height + ":" + c.tags.join("-") : c.elementId + ":" + c.style + ":" + c.tags.join("-"), d += c + ",") : d += l + ",")
                }
                a = d.slice(0, -1);
                b = null != b || "true" == h("preview");
                a = "?placements\x3d" + a;
                b && (a += "\x26preview\x3dtrue");
                A(t("serve.js" + a))
            }
        },
        y = function(a) {
            a.forEach(function(b, e) {
                if (n()) {
                    var f = b.usernameField,
                        d = document.getElementById(b.loginFormId);
                    null != d && null != d[b.usernameField] &&
                        (d.addEventListener ? d.addEventListener("submit", B(d, f), !0) : d.attachEvent("onsubmit", B(d, f)))
                }
            })
        },
        B = function(a, b) {
            return function(e) {
                e = encodeURIComponent(a[b].value.trim());
                for (var f = !0, d = a.getElementsByTagName("input"), g = 0; g < d.length; g++) {
                    var c = d.item(g);
                    "password" == c.type && (f = encodeURIComponent(c.value.trim()))
                }
                e && f && (f = new XMLHttpRequest, f.open("GET", t("associate?username\x3d" + e)), f.timeout = 2E3, f.send())
            }
        },
        G = function(a) {
            var b = function(f) {
                    return function() {
                        window.clearTimeout(kernelClickthroughTimeout);
                        null != clickedUrl && (window.location.href = f)
                    }
                },
                e = 0;
            a.forEach(function(f) {
                if (f = document.getElementById(f))
                    for (var d = f.getElementsByTagName("a"), g = 0; g < d.length; g++) {
                        var c = d[g];
                        e++;
                        var k = "kernelClickthroughCallback" + e.toString();
                        window[k] = b(c.href);
                        f.addEventListener ? c.addEventListener("click", z(k), !1) : c.attachEvent("onclick", z(k))
                    }
            });
            q("addClickthroughListenersDone")
        };
    (function() {
        var a = window.kernel.q;
        window.kernel = function() {
            v(arguments)
        };
        for (var b = 0, e = a.length; b < e; b++) v(a.shift());
        q("kernelPreStart");
        D()
    })()
})();
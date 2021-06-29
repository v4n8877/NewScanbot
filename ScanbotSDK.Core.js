!function(t) {
    var n = {};
    function e(r) {
        if (n[r])
            return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, e),
        i.l = !0,
        i.exports
    }
    e.m = t,
    e.c = n,
    e.d = function(t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {
            enumerable: !0,
            get: r
        })
    }
    ,
    e.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    e.t = function(t, n) {
        if (1 & n && (t = e(t)),
        8 & n)
            return t;
        if (4 & n && "object" == typeof t && t && t.__esModule)
            return t;
        var r = Object.create(null);
        if (e.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }),
        2 & n && "string" != typeof t)
            for (var i in t)
                e.d(r, i, function(n) {
                    return t[n]
                }
                .bind(null, i));
        return r
    }
    ,
    e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return e.d(n, "a", n),
        n
    }
    ,
    e.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }
    ,
    e.p = "",
    e(e.s = 0)
}([function(t, n, e) {
    "use strict";
    var r = e(1);
    let i;
    const a = {};
    function o(t) {
        const n = Math.random().toString(36);
        return a[n] = t,
        n
    }
    function u(t) {
        if (!a.hasOwnProperty(t))
            throw new Error(`Object ${t} does not exist`);
        return a[t]
    }
    function l(t) {
        const n = u(t);
        n.delete && n.delete(),
        delete a[t]
    }
    function s(t, n) {
        for (let e in n) {
            if (t === n[e])
                return e
        }
    }
    const c = {
        initialize: async function(t, n, a, o) {
            const u = e(3)
              , l = {
                locateFile: function(t, e) {
                    let i;
                    return i = n ? function(t) {
                        return -1 !== t.indexOf("http")
                    }(n) ? n : "" : o + r.Constants.DEFAULT_WASM_FOLDER,
                    i + "ScanbotSDK.Asm.wasm"
                }
            };
            return await u(l),
            i = l,
            i.initialize(t || "", a)
        },
        getLicenseInfo: function() {
            return i.getLicenseInfo()
        },
        applyFilter: function(t, n) {
            return p(i.applyFilter(t, n), d)
        },
        rotateImageCcw: function(t, n) {
            return p(i.rotateImageCcw(t, n), d)
        },
        cropAndRotateImageCcw: function(t, n, e) {
            const r = function(t) {
                const n = [];
                for (let e = 0; e < t.length; ++e)
                    n.push(t[e].x, t[e].y);
                return n
            }(n);
            return p(i.cropAndRotateImageCcw(t, r, e), d)
        },
        detectDocument: async function(t, n, e) {
            const r = m(t);
            return await f(i.detectDocumentOnRawImage(r.buffer, r.width, r.height, n, e))
        },
        detectDocumentOnImage: async function(t, n, e) {
            return await f(i.detectDocumentOnImage(t, n, e))
        },
        detectAndCropDocument: async function(t) {
            const n = m(t);
            return await f(i.detectAndCropDocument(n.buffer, n.width, n.height))
        },
        recognizeBarcodes: async function(t, n) {
            const e = m(t)
              , r = i.recognizeBarcodes(e.buffer, e.width, e.height, n);
            if (!r)
                return null;
            if (!r.length)
                return [];
            const a = r.map((t=>({
                format: s(t.format, i.BarcodeFormat),
                text: t.text,
                rawBytes: t.rawBytes.data.slice()
            })));
            return r.forEach((t=>t.delete())),
            a
        },
        beginPdf: async function(t) {
            return o(new i.PdfGenerationContext(t || {}))
        },
        addPageToPdf: async function(t, n) {
            p(u(t).addPage(n))
        },
        completePdf: async function(t) {
            const n = p(u(t).complete(), d);
            return l(t),
            n
        },
        beginTiff: async function(t) {
            const n = new i.TiffGenerationContext(t);
            return p(n.begin()),
            o(n)
        },
        addPageToTiff: async function(t, n) {
            p(u(t).addPage(n))
        },
        completeTiff: async function(t) {
            const n = p(u(t).complete(), d);
            return l(t),
            n
        }
    };
    async function f(t) {
        if (!t)
            return {
                success: !1,
                detectionStatus: "Error_License"
            };
        const n = (e = t.detectionResult,
        v[e] ? v[e] : e >= 200 ? "Error_Unknown" : "OK");
        var e;
        const r = {
            detectionStatus: n,
            success: _(n)
        };
        return r.original = d(t.originalImageJpegData),
        r.success && (r.cropped = d(t.croppedImageJpegData),
        r.polygon = function(t) {
            if (t.length % 2 != 0)
                throw Error("pointCoords size is not even.");
            const n = [];
            for (let e = 0; e < t.length; e += 2)
                n.push({
                    x: t[e],
                    y: t[e + 1]
                });
            return n
        }(t.polygon.data),
        r.horizontalLines = y(t.horizontalLines.data),
        r.verticalLines = y(t.verticalLines.data)),
        t.delete(),
        r
    }
    function d(t) {
        return t && t.data && t.data.slice()
    }
    function p(t, n) {
        try {
            if (t.errorMessage) {
                throw new Error(t.errorMessage)
            }
            return (n || (t=>t))(t.result)
        } finally {
            t.delete()
        }
    }
    function _(t) {
        return "OK" === t.substr(0, 2)
    }
    function y(t) {
        const n = [];
        if (!t)
            return n;
        if (t.length % 4 != 0)
            throw Error("lineCoords size invalid.");
        for (let e = 0; e < t.length; e += 4)
            n.push({
                p1: {
                    x: t[e],
                    y: t[e + 1]
                },
                p2: {
                    x: t[e + 2],
                    y: t[e + 3]
                }
            });
        return n
    }
    function m(t) {
        const {width: n, height: e, data: r} = t
          , a = i._malloc(4 * n * e);
        return i.HEAPU8.set(r, a),
        {
            buffer: a,
            width: n,
            height: e
        }
    }
    const v = {
        0: "NotAcquired",
        100: "OK",
        101: "OK_SmallSize",
        102: "OK_BadAngles",
        103: "OK_BadAspectRatio",
        104: "OK_OffCenter",
        200: "Error_NothingDetected",
        201: "Error_Brightness",
        202: "Error_Noise"
    };
    onmessage = function(t) {
        const {command: n, args: e, ticket: r} = t.data;
        if (!i && "initialize" !== n)
            throw Error("WASM module not loaded yet.");
        (async()=>await c[n].apply(null, e))().then((t=>self.postMessage({
            ticket: r,
            result: t
        }))).catch((t=>{
            console.error(t),
            self.postMessage({
                ticket: r,
                error: t.toString()
            })
        }
        ))
    }
}
, function(t, n, e) {
    "use strict";
    var r = this && this.__importDefault || function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    ;
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.Constants = void 0;
    const i = r(e(2));
    var a = "undefined" != typeof SCANBOT_WEBSDK_VERSION ? SCANBOT_WEBSDK_VERSION : i.default;
    class o {
    }
    n.Constants = o,
    o.CDN_PATH = a && `https://cdn.jsdelivr.net/npm/scanbot-web-sdk@${a}/bundle/`,
    o.DEFAULT_WASM_FOLDER = "bin/complete/"
}
, function(t, n, e) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.default = ""
}
, function(t, n, e) {
    "use strict";
    var r, i = (r = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0,
    function(t) {
        var n, e, i = void 0 !== (t = t || {}) ? t : {};
        i.ready = new Promise((function(t, r) {
            n = t,
            e = r
        }
        ));
        var a, o = {};
        for (a in i)
            i.hasOwnProperty(a) && (o[a] = i[a]);
        var u, l = [], s = "./this.program", c = function(t, n) {
            throw n
        }, f = "";
        f = self.location.href,
        r && (f = r),
        f = 0 !== f.indexOf("blob:") ? f.substr(0, f.lastIndexOf("/") + 1) : "",
        u = function(t) {
            var n = new XMLHttpRequest;
            return n.open("GET", t, !1),
            n.responseType = "arraybuffer",
            n.send(null),
            new Uint8Array(n.response)
        }
        ;
        var d = i.print || console.log.bind(console)
          , p = i.printErr || console.warn.bind(console);
        for (a in o)
            o.hasOwnProperty(a) && (i[a] = o[a]);
        o = null,
        i.arguments && (l = i.arguments),
        i.thisProgram && (s = i.thisProgram),
        i.quit && (c = i.quit);
        var _, y, m, v = 0, h = function(t) {
            v = t
        };
        i.wasmBinary && (_ = i.wasmBinary),
        i.noExitRuntime && (y = i.noExitRuntime),
        "object" != typeof WebAssembly && at("no native wasm support detected");
        var g = new WebAssembly.Table({
            initial: 7146,
            maximum: 7146,
            element: "anyfunc"
        })
          , C = !1;
        function w(t, n) {
            t || at("Assertion failed: " + n)
        }
        var b = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
        function T(t, n, e) {
            for (var r = n + e, i = n; t[i] && !(i >= r); )
                ++i;
            if (i - n > 16 && t.subarray && b)
                return b.decode(t.subarray(n, i));
            for (var a = ""; n < i; ) {
                var o = t[n++];
                if (128 & o) {
                    var u = 63 & t[n++];
                    if (192 != (224 & o)) {
                        var l = 63 & t[n++];
                        if ((o = 224 == (240 & o) ? (15 & o) << 12 | u << 6 | l : (7 & o) << 18 | u << 12 | l << 6 | 63 & t[n++]) < 65536)
                            a += String.fromCharCode(o);
                        else {
                            var s = o - 65536;
                            a += String.fromCharCode(55296 | s >> 10, 56320 | 1023 & s)
                        }
                    } else
                        a += String.fromCharCode((31 & o) << 6 | u)
                } else
                    a += String.fromCharCode(o)
            }
            return a
        }
        function j(t, n) {
            return t ? T(O, t, n) : ""
        }
        function P(t, n, e, r) {
            if (!(r > 0))
                return 0;
            for (var i = e, a = e + r - 1, o = 0; o < t.length; ++o) {
                var u = t.charCodeAt(o);
                if (u >= 55296 && u <= 57343 && (u = 65536 + ((1023 & u) << 10) | 1023 & t.charCodeAt(++o)),
                u <= 127) {
                    if (e >= a)
                        break;
                    n[e++] = u
                } else if (u <= 2047) {
                    if (e + 1 >= a)
                        break;
                    n[e++] = 192 | u >> 6,
                    n[e++] = 128 | 63 & u
                } else if (u <= 65535) {
                    if (e + 2 >= a)
                        break;
                    n[e++] = 224 | u >> 12,
                    n[e++] = 128 | u >> 6 & 63,
                    n[e++] = 128 | 63 & u
                } else {
                    if (e + 3 >= a)
                        break;
                    n[e++] = 240 | u >> 18,
                    n[e++] = 128 | u >> 12 & 63,
                    n[e++] = 128 | u >> 6 & 63,
                    n[e++] = 128 | 63 & u
                }
            }
            return n[e] = 0,
            e - i
        }
        function W(t, n, e) {
            return P(t, O, n, e)
        }
        function $(t) {
            for (var n = 0, e = 0; e < t.length; ++e) {
                var r = t.charCodeAt(e);
                r >= 55296 && r <= 57343 && (r = 65536 + ((1023 & r) << 10) | 1023 & t.charCodeAt(++e)),
                r <= 127 ? ++n : n += r <= 2047 ? 2 : r <= 65535 ? 3 : 4
            }
            return n
        }
        var A, S, O, k, D, x, F, E, M, R = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
        function I(t, n) {
            for (var e = t, r = e >> 1, i = r + n / 2; !(r >= i) && D[r]; )
                ++r;
            if ((e = r << 1) - t > 32 && R)
                return R.decode(O.subarray(t, e));
            for (var a = 0, o = ""; ; ) {
                var u = k[t + 2 * a >> 1];
                if (0 == u || a == n / 2)
                    return o;
                ++a,
                o += String.fromCharCode(u)
            }
        }
        function z(t, n, e) {
            if (void 0 === e && (e = 2147483647),
            e < 2)
                return 0;
            for (var r = n, i = (e -= 2) < 2 * t.length ? e / 2 : t.length, a = 0; a < i; ++a) {
                var o = t.charCodeAt(a);
                k[n >> 1] = o,
                n += 2
            }
            return k[n >> 1] = 0,
            n - r
        }
        function U(t) {
            return 2 * t.length
        }
        function H(t, n) {
            for (var e = 0, r = ""; !(e >= n / 4); ) {
                var i = x[t + 4 * e >> 2];
                if (0 == i)
                    break;
                if (++e,
                i >= 65536) {
                    var a = i - 65536;
                    r += String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a)
                } else
                    r += String.fromCharCode(i)
            }
            return r
        }
        function Y(t, n, e) {
            if (void 0 === e && (e = 2147483647),
            e < 4)
                return 0;
            for (var r = n, i = r + e - 4, a = 0; a < t.length; ++a) {
                var o = t.charCodeAt(a);
                if (o >= 55296 && o <= 57343 && (o = 65536 + ((1023 & o) << 10) | 1023 & t.charCodeAt(++a)),
                x[n >> 2] = o,
                (n += 4) + 4 > i)
                    break
            }
            return x[n >> 2] = 0,
            n - r
        }
        function B(t) {
            for (var n = 0, e = 0; e < t.length; ++e) {
                var r = t.charCodeAt(e);
                r >= 55296 && r <= 57343 && ++e,
                n += 4
            }
            return n
        }
        function N(t) {
            var n = $(t) + 1
              , e = ve(n);
            return e && P(t, S, e, n),
            e
        }
        function L(t, n) {
            S.set(t, n)
        }
        function V(t) {
            A = t,
            i.HEAP8 = S = new Int8Array(t),
            i.HEAP16 = k = new Int16Array(t),
            i.HEAP32 = x = new Int32Array(t),
            i.HEAPU8 = O = new Uint8Array(t),
            i.HEAPU16 = D = new Uint16Array(t),
            i.HEAPU32 = F = new Uint32Array(t),
            i.HEAPF32 = E = new Float32Array(t),
            i.HEAPF64 = M = new Float64Array(t)
        }
        var G = 1651248
          , q = i.INITIAL_MEMORY || 16777216;
        function J(t) {
            for (; t.length > 0; ) {
                var n = t.shift();
                if ("function" != typeof n) {
                    var e = n.func;
                    "number" == typeof e ? void 0 === n.arg ? i.dynCall_v(e) : i.dynCall_vi(e, n.arg) : e(void 0 === n.arg ? null : n.arg)
                } else
                    n(i)
            }
        }
        (m = i.wasmMemory ? i.wasmMemory : new WebAssembly.Memory({
            initial: q / 65536,
            maximum: 32768
        })) && (A = m.buffer),
        q = A.byteLength,
        V(A),
        x[G >> 2] = 6894304;
        var K = []
          , Q = []
          , X = []
          , Z = [];
        Math.abs;
        var tt = Math.ceil
          , nt = Math.floor
          , et = (Math.min,
        0)
          , rt = null
          , it = null;
        function at(t) {
            i.onAbort && i.onAbort(t),
            p(t += ""),
            C = !0,
            t = "abort(" + t + "). Build with -s ASSERTIONS=1 for more info.";
            var n = new WebAssembly.RuntimeError(t);
            throw e(n),
            n
        }
        function ot(t) {
            return n = t,
            e = "data:application/octet-stream;base64,",
            String.prototype.startsWith ? n.startsWith(e) : 0 === n.indexOf(e);
            var n, e
        }
        i.preloadedImages = {},
        i.preloadedAudios = {};
        var ut, lt = "ScanbotSDK.Asm.wasm";
        function st() {
            try {
                if (_)
                    return new Uint8Array(_);
                if (u)
                    return u(lt);
                throw "both async and sync fetching of the wasm failed"
            } catch (t) {
                at(t)
            }
        }
        ot(lt) || (ut = lt,
        lt = i.locateFile ? i.locateFile(ut, f) : f + ut);
        var ct, ft = {
            17616: function(t) {
                return N(function() {
                    return this[j(t)].toString()
                }
                .apply((0,
                eval)("(()=>this)()")))
            }
        };
        function dt(t) {
            return x[ge() >> 2] = t,
            t
        }
        function pt(t, n) {
            var e;
            if (0 === t)
                e = Date.now();
            else {
                if (1 !== t && 4 !== t)
                    return dt(28),
                    -1;
                e = ct()
            }
            return x[n >> 2] = e / 1e3 | 0,
            x[n + 4 >> 2] = e % 1e3 * 1e3 * 1e3 | 0,
            0
        }
        Q.push({
            func: function() {
                ye()
            }
        }),
        ct = function() {
            return performance.now()
        }
        ;
        var _t = 0
          , yt = 4
          , mt = 8
          , vt = 12
          , ht = 13
          , gt = 16;
        function Ct(t, n) {}
        function wt(t) {
            this.excPtr = t,
            this.ptr = t - gt,
            this.set_type = function(t) {
                x[this.ptr + mt >> 2] = t
            }
            ,
            this.get_type = function() {
                return x[this.ptr + mt >> 2]
            }
            ,
            this.set_destructor = function(t) {
                x[this.ptr + _t >> 2] = t
            }
            ,
            this.get_destructor = function() {
                return x[this.ptr + _t >> 2]
            }
            ,
            this.set_refcount = function(t) {
                x[this.ptr + yt >> 2] = t
            }
            ,
            this.set_caught = function(t) {
                t = t ? 1 : 0,
                S[this.ptr + vt >> 0] = t
            }
            ,
            this.get_caught = function() {
                return 0 != S[this.ptr + vt >> 0]
            }
            ,
            this.set_rethrown = function(t) {
                t = t ? 1 : 0,
                S[this.ptr + ht >> 0] = t
            }
            ,
            this.get_rethrown = function() {
                return 0 != S[this.ptr + ht >> 0]
            }
            ,
            this.init = function(t, n) {
                this.set_type(t),
                this.set_destructor(n),
                this.set_refcount(0),
                this.set_caught(!1),
                this.set_rethrown(!1)
            }
            ,
            this.add_ref = function() {
                var t = x[this.ptr + yt >> 2];
                x[this.ptr + yt >> 2] = t + 1
            }
            ,
            this.release_ref = function() {
                var t = x[this.ptr + yt >> 2];
                return x[this.ptr + yt >> 2] = t - 1,
                1 === t
            }
        }
        function bt(t) {
            this.free = function() {
                he(this.ptr),
                this.ptr = 0
            }
            ,
            this.set_base_ptr = function(t) {
                x[this.ptr >> 2] = t
            }
            ,
            this.get_base_ptr = function() {
                return x[this.ptr >> 2]
            }
            ,
            this.set_adjusted_ptr = function(t) {
                x[this.ptr + 4 >> 2] = t
            }
            ,
            this.get_adjusted_ptr = function() {
                return x[this.ptr + 4 >> 2]
            }
            ,
            this.get_exception_ptr = function() {
                if (___cxa_is_pointer_type(this.get_exception_info().get_type()))
                    return x[this.get_base_ptr() >> 2];
                var t = this.get_adjusted_ptr();
                return 0 !== t ? t : this.get_base_ptr()
            }
            ,
            this.get_exception_info = function() {
                return new wt(this.get_base_ptr())
            }
            ,
            void 0 === t ? (this.ptr = ve(8),
            this.set_adjusted_ptr(0)) : this.ptr = t
        }
        var Tt = [];
        function jt() {
            return jt.uncaught_exceptions > 0
        }
        function Pt(t) {
            return he(new wt(t).ptr)
        }
        function Wt(t) {
            if (t.release_ref() && !t.get_rethrown()) {
                var n = t.get_destructor();
                n && i.dynCall_ii(n, t.excPtr),
                Pt(t.excPtr)
            }
        }
        var $t = 0
          , At = {
            mappings: {},
            buffers: [null, [], []],
            printChar: function(t, n) {
                var e = At.buffers[t];
                0 === n || 10 === n ? ((1 === t ? d : p)(T(e, 0)),
                e.length = 0) : e.push(n)
            },
            varargs: void 0,
            get: function() {
                return At.varargs += 4,
                x[At.varargs - 4 >> 2]
            },
            getStr: function(t) {
                return j(t)
            },
            get64: function(t, n) {
                return t
            }
        }
          , St = {};
        function Ot(t) {
            for (; t.length; ) {
                var n = t.pop();
                t.pop()(n)
            }
        }
        function kt(t) {
            return this.fromWireType(F[t >> 2])
        }
        var Dt = {}
          , xt = {}
          , Ft = {};
        function Et(t) {
            if (void 0 === t)
                return "_unknown";
            var n = (t = t.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
            return n >= 48 && n <= 57 ? "_" + t : t
        }
        function Mt(t, n) {
            return t = Et(t),
            new Function("body","return function " + t + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(n)
        }
        function Rt(t, n) {
            var e = Mt(n, (function(t) {
                this.name = n,
                this.message = t;
                var e = new Error(t).stack;
                void 0 !== e && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""))
            }
            ));
            return e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e.prototype.toString = function() {
                return void 0 === this.message ? this.name : this.name + ": " + this.message
            }
            ,
            e
        }
        var It = void 0;
        function zt(t) {
            throw new It(t)
        }
        function Ut(t, n, e) {
            function r(n) {
                var r = e(n);
                r.length !== t.length && zt("Mismatched type converter count");
                for (var i = 0; i < t.length; ++i)
                    Gt(t[i], r[i])
            }
            t.forEach((function(t) {
                Ft[t] = n
            }
            ));
            var i = new Array(n.length)
              , a = []
              , o = 0;
            n.forEach((function(t, n) {
                xt.hasOwnProperty(t) ? i[n] = xt[t] : (a.push(t),
                Dt.hasOwnProperty(t) || (Dt[t] = []),
                Dt[t].push((function() {
                    i[n] = xt[t],
                    ++o === a.length && r(i)
                }
                )))
            }
            )),
            0 === a.length && r(i)
        }
        var Ht = {};
        function Yt(t) {
            switch (t) {
            case 1:
                return 0;
            case 2:
                return 1;
            case 4:
                return 2;
            case 8:
                return 3;
            default:
                throw new TypeError("Unknown type size: " + t)
            }
        }
        var Bt = void 0;
        function Nt(t) {
            for (var n = "", e = t; O[e]; )
                n += Bt[O[e++]];
            return n
        }
        var Lt = void 0;
        function Vt(t) {
            throw new Lt(t)
        }
        function Gt(t, n, e) {
            if (e = e || {},
            !("argPackAdvance"in n))
                throw new TypeError("registerType registeredInstance requires argPackAdvance");
            var r = n.name;
            if (t || Vt('type "' + r + '" must have a positive integer typeid pointer'),
            xt.hasOwnProperty(t)) {
                if (e.ignoreDuplicateRegistrations)
                    return;
                Vt("Cannot register type '" + r + "' twice")
            }
            if (xt[t] = n,
            delete Ft[t],
            Dt.hasOwnProperty(t)) {
                var i = Dt[t];
                delete Dt[t],
                i.forEach((function(t) {
                    t()
                }
                ))
            }
        }
        function qt(t) {
            if (!(this instanceof ln))
                return !1;
            if (!(t instanceof ln))
                return !1;
            for (var n = this.$$.ptrType.registeredClass, e = this.$$.ptr, r = t.$$.ptrType.registeredClass, i = t.$$.ptr; n.baseClass; )
                e = n.upcast(e),
                n = n.baseClass;
            for (; r.baseClass; )
                i = r.upcast(i),
                r = r.baseClass;
            return n === r && e === i
        }
        function Jt(t) {
            Vt(t.$$.ptrType.registeredClass.name + " instance already deleted")
        }
        var Kt = !1;
        function Qt(t) {}
        function Xt(t) {
            t.count.value -= 1,
            0 === t.count.value && function(t) {
                t.smartPtr ? t.smartPtrType.rawDestructor(t.smartPtr) : t.ptrType.registeredClass.rawDestructor(t.ptr)
            }(t)
        }
        function Zt(t) {
            return "undefined" == typeof FinalizationGroup ? (Zt = function(t) {
                return t
            }
            ,
            t) : (Kt = new FinalizationGroup((function(t) {
                for (var n = t.next(); !n.done; n = t.next()) {
                    var e = n.value;
                    e.ptr ? Xt(e) : console.warn("object already deleted: " + e.ptr)
                }
            }
            )),
            Qt = function(t) {
                Kt.unregister(t.$$)
            }
            ,
            (Zt = function(t) {
                return Kt.register(t, t.$$, t.$$),
                t
            }
            )(t))
        }
        function tn() {
            if (this.$$.ptr || Jt(this),
            this.$$.preservePointerOnDelete)
                return this.$$.count.value += 1,
                this;
            var t, n = Zt(Object.create(Object.getPrototypeOf(this), {
                $$: {
                    value: (t = this.$$,
                    {
                        count: t.count,
                        deleteScheduled: t.deleteScheduled,
                        preservePointerOnDelete: t.preservePointerOnDelete,
                        ptr: t.ptr,
                        ptrType: t.ptrType,
                        smartPtr: t.smartPtr,
                        smartPtrType: t.smartPtrType
                    })
                }
            }));
            return n.$$.count.value += 1,
            n.$$.deleteScheduled = !1,
            n
        }
        function nn() {
            this.$$.ptr || Jt(this),
            this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && Vt("Object already scheduled for deletion"),
            Qt(this),
            Xt(this.$$),
            this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0,
            this.$$.ptr = void 0)
        }
        function en() {
            return !this.$$.ptr
        }
        var rn = void 0
          , an = [];
        function on() {
            for (; an.length; ) {
                var t = an.pop();
                t.$$.deleteScheduled = !1,
                t.delete()
            }
        }
        function un() {
            return this.$$.ptr || Jt(this),
            this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && Vt("Object already scheduled for deletion"),
            an.push(this),
            1 === an.length && rn && rn(on),
            this.$$.deleteScheduled = !0,
            this
        }
        function ln() {}
        var sn = {};
        function cn(t, n, e) {
            if (void 0 === t[n].overloadTable) {
                var r = t[n];
                t[n] = function() {
                    return t[n].overloadTable.hasOwnProperty(arguments.length) || Vt("Function '" + e + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + t[n].overloadTable + ")!"),
                    t[n].overloadTable[arguments.length].apply(this, arguments)
                }
                ,
                t[n].overloadTable = [],
                t[n].overloadTable[r.argCount] = r
            }
        }
        function fn(t, n, e) {
            i.hasOwnProperty(t) ? ((void 0 === e || void 0 !== i[t].overloadTable && void 0 !== i[t].overloadTable[e]) && Vt("Cannot register public name '" + t + "' twice"),
            cn(i, t, t),
            i.hasOwnProperty(e) && Vt("Cannot register multiple overloads of a function with the same number of arguments (" + e + ")!"),
            i[t].overloadTable[e] = n) : (i[t] = n,
            void 0 !== e && (i[t].numArguments = e))
        }
        function dn(t, n, e, r, i, a, o, u) {
            this.name = t,
            this.constructor = n,
            this.instancePrototype = e,
            this.rawDestructor = r,
            this.baseClass = i,
            this.getActualType = a,
            this.upcast = o,
            this.downcast = u,
            this.pureVirtualFunctions = []
        }
        function pn(t, n, e) {
            for (; n !== e; )
                n.upcast || Vt("Expected null or instance of " + e.name + ", got an instance of " + n.name),
                t = n.upcast(t),
                n = n.baseClass;
            return t
        }
        function _n(t, n) {
            if (null === n)
                return this.isReference && Vt("null is not a valid " + this.name),
                0;
            n.$$ || Vt('Cannot pass "' + Vn(n) + '" as a ' + this.name),
            n.$$.ptr || Vt("Cannot pass deleted object as a pointer of type " + this.name);
            var e = n.$$.ptrType.registeredClass;
            return pn(n.$$.ptr, e, this.registeredClass)
        }
        function yn(t, n) {
            var e;
            if (null === n)
                return this.isReference && Vt("null is not a valid " + this.name),
                this.isSmartPointer ? (e = this.rawConstructor(),
                null !== t && t.push(this.rawDestructor, e),
                e) : 0;
            n.$$ || Vt('Cannot pass "' + Vn(n) + '" as a ' + this.name),
            n.$$.ptr || Vt("Cannot pass deleted object as a pointer of type " + this.name),
            !this.isConst && n.$$.ptrType.isConst && Vt("Cannot convert argument of type " + (n.$$.smartPtrType ? n.$$.smartPtrType.name : n.$$.ptrType.name) + " to parameter type " + this.name);
            var r = n.$$.ptrType.registeredClass;
            if (e = pn(n.$$.ptr, r, this.registeredClass),
            this.isSmartPointer)
                switch (void 0 === n.$$.smartPtr && Vt("Passing raw pointer to smart pointer is illegal"),
                this.sharingPolicy) {
                case 0:
                    n.$$.smartPtrType === this ? e = n.$$.smartPtr : Vt("Cannot convert argument of type " + (n.$$.smartPtrType ? n.$$.smartPtrType.name : n.$$.ptrType.name) + " to parameter type " + this.name);
                    break;
                case 1:
                    e = n.$$.smartPtr;
                    break;
                case 2:
                    if (n.$$.smartPtrType === this)
                        e = n.$$.smartPtr;
                    else {
                        var i = n.clone();
                        e = this.rawShare(e, Bn((function() {
                            i.delete()
                        }
                        ))),
                        null !== t && t.push(this.rawDestructor, e)
                    }
                    break;
                default:
                    Vt("Unsupporting sharing policy")
                }
            return e
        }
        function mn(t, n) {
            if (null === n)
                return this.isReference && Vt("null is not a valid " + this.name),
                0;
            n.$$ || Vt('Cannot pass "' + Vn(n) + '" as a ' + this.name),
            n.$$.ptr || Vt("Cannot pass deleted object as a pointer of type " + this.name),
            n.$$.ptrType.isConst && Vt("Cannot convert argument of type " + n.$$.ptrType.name + " to parameter type " + this.name);
            var e = n.$$.ptrType.registeredClass;
            return pn(n.$$.ptr, e, this.registeredClass)
        }
        function vn(t) {
            return this.rawGetPointee && (t = this.rawGetPointee(t)),
            t
        }
        function hn(t) {
            this.rawDestructor && this.rawDestructor(t)
        }
        function gn(t) {
            null !== t && t.delete()
        }
        function Cn(t, n, e) {
            if (n === e)
                return t;
            if (void 0 === e.baseClass)
                return null;
            var r = Cn(t, n, e.baseClass);
            return null === r ? null : e.downcast(r)
        }
        function wn() {
            return Object.keys(jn).length
        }
        function bn() {
            var t = [];
            for (var n in jn)
                jn.hasOwnProperty(n) && t.push(jn[n]);
            return t
        }
        function Tn(t) {
            rn = t,
            an.length && rn && rn(on)
        }
        var jn = {};
        function Pn(t, n) {
            return n = function(t, n) {
                for (void 0 === n && Vt("ptr should not be undefined"); t.baseClass; )
                    n = t.upcast(n),
                    t = t.baseClass;
                return n
            }(t, n),
            jn[n]
        }
        function Wn(t, n) {
            return n.ptrType && n.ptr || zt("makeClassHandle requires ptr and ptrType"),
            !!n.smartPtrType != !!n.smartPtr && zt("Both smartPtrType and smartPtr must be specified"),
            n.count = {
                value: 1
            },
            Zt(Object.create(t, {
                $$: {
                    value: n
                }
            }))
        }
        function $n(t) {
            var n = this.getPointee(t);
            if (!n)
                return this.destructor(t),
                null;
            var e = Pn(this.registeredClass, n);
            if (void 0 !== e) {
                if (0 === e.$$.count.value)
                    return e.$$.ptr = n,
                    e.$$.smartPtr = t,
                    e.clone();
                var r = e.clone();
                return this.destructor(t),
                r
            }
            function i() {
                return this.isSmartPointer ? Wn(this.registeredClass.instancePrototype, {
                    ptrType: this.pointeeType,
                    ptr: n,
                    smartPtrType: this,
                    smartPtr: t
                }) : Wn(this.registeredClass.instancePrototype, {
                    ptrType: this,
                    ptr: t
                })
            }
            var a, o = this.registeredClass.getActualType(n), u = sn[o];
            if (!u)
                return i.call(this);
            a = this.isConst ? u.constPointerType : u.pointerType;
            var l = Cn(n, this.registeredClass, a.registeredClass);
            return null === l ? i.call(this) : this.isSmartPointer ? Wn(a.registeredClass.instancePrototype, {
                ptrType: a,
                ptr: l,
                smartPtrType: this,
                smartPtr: t
            }) : Wn(a.registeredClass.instancePrototype, {
                ptrType: a,
                ptr: l
            })
        }
        function An(t, n, e, r, i, a, o, u, l, s, c) {
            this.name = t,
            this.registeredClass = n,
            this.isReference = e,
            this.isConst = r,
            this.isSmartPointer = i,
            this.pointeeType = a,
            this.sharingPolicy = o,
            this.rawGetPointee = u,
            this.rawConstructor = l,
            this.rawShare = s,
            this.rawDestructor = c,
            i || void 0 !== n.baseClass ? this.toWireType = yn : r ? (this.toWireType = _n,
            this.destructorFunction = null) : (this.toWireType = mn,
            this.destructorFunction = null)
        }
        function Sn(t, n, e) {
            i.hasOwnProperty(t) || zt("Replacing nonexistant public symbol"),
            void 0 !== i[t].overloadTable && void 0 !== e ? i[t].overloadTable[e] = n : (i[t] = n,
            i[t].argCount = e)
        }
        function On(t, n) {
            t = Nt(t);
            var e = function(e) {
                for (var r = [], i = 1; i < t.length; ++i)
                    r.push("a" + i);
                var a = "return function dynCall_" + t + "_" + n + "(" + r.join(", ") + ") {\n";
                return a += "    return dynCall(rawFunction" + (r.length ? ", " : "") + r.join(", ") + ");\n",
                a += "};\n",
                new Function("dynCall","rawFunction",a)(e, n)
            }(i["dynCall_" + t]);
            return "function" != typeof e && Vt("unknown function pointer with signature " + t + ": " + n),
            e
        }
        var kn = void 0;
        function Dn(t) {
            var n = Ce(t)
              , e = Nt(n);
            return he(n),
            e
        }
        function xn(t, n) {
            var e = []
              , r = {};
            throw n.forEach((function t(n) {
                r[n] || xt[n] || (Ft[n] ? Ft[n].forEach(t) : (e.push(n),
                r[n] = !0))
            }
            )),
            new kn(t + ": " + e.map(Dn).join([", "]))
        }
        function Fn(t, n) {
            for (var e = [], r = 0; r < t; r++)
                e.push(x[(n >> 2) + r]);
            return e
        }
        function En(t, n) {
            if (!(t instanceof Function))
                throw new TypeError("new_ called with constructor type " + typeof t + " which is not a function");
            var e = Mt(t.name || "unknownFunctionName", (function() {}
            ));
            e.prototype = t.prototype;
            var r = new e
              , i = t.apply(r, n);
            return i instanceof Object ? i : r
        }
        function Mn(t, n, e, r, i) {
            var a = n.length;
            a < 2 && Vt("argTypes array size mismatch! Must at least get return value and 'this' types!");
            for (var o = null !== n[1] && null !== e, u = !1, l = 1; l < n.length; ++l)
                if (null !== n[l] && void 0 === n[l].destructorFunction) {
                    u = !0;
                    break
                }
            var s = "void" !== n[0].name
              , c = ""
              , f = "";
            for (l = 0; l < a - 2; ++l)
                c += (0 !== l ? ", " : "") + "arg" + l,
                f += (0 !== l ? ", " : "") + "arg" + l + "Wired";
            var d = "return function " + Et(t) + "(" + c + ") {\nif (arguments.length !== " + (a - 2) + ") {\nthrowBindingError('function " + t + " called with ' + arguments.length + ' arguments, expected " + (a - 2) + " args!');\n}\n";
            u && (d += "var destructors = [];\n");
            var p = u ? "destructors" : "null"
              , _ = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"]
              , y = [Vt, r, i, Ot, n[0], n[1]];
            for (o && (d += "var thisWired = classParam.toWireType(" + p + ", this);\n"),
            l = 0; l < a - 2; ++l)
                d += "var arg" + l + "Wired = argType" + l + ".toWireType(" + p + ", arg" + l + "); // " + n[l + 2].name + "\n",
                _.push("argType" + l),
                y.push(n[l + 2]);
            if (o && (f = "thisWired" + (f.length > 0 ? ", " : "") + f),
            d += (s ? "var rv = " : "") + "invoker(fn" + (f.length > 0 ? ", " : "") + f + ");\n",
            u)
                d += "runDestructors(destructors);\n";
            else
                for (l = o ? 1 : 2; l < n.length; ++l) {
                    var m = 1 === l ? "thisWired" : "arg" + (l - 2) + "Wired";
                    null !== n[l].destructorFunction && (d += m + "_dtor(" + m + "); // " + n[l].name + "\n",
                    _.push(m + "_dtor"),
                    y.push(n[l].destructorFunction))
                }
            return s && (d += "var ret = retType.fromWireType(rv);\nreturn ret;\n"),
            d += "}\n",
            _.push(d),
            En(Function, _).apply(null, y)
        }
        function Rn(t, n, e) {
            return t instanceof Object || Vt(e + ' with invalid "this": ' + t),
            t instanceof n.registeredClass.constructor || Vt(e + ' incompatible with "this" of type ' + t.constructor.name),
            t.$$.ptr || Vt("cannot call emscripten binding method " + e + " on deleted object"),
            pn(t.$$.ptr, t.$$.ptrType.registeredClass, n.registeredClass)
        }
        var In = []
          , zn = [{}, {
            value: void 0
        }, {
            value: null
        }, {
            value: !0
        }, {
            value: !1
        }];
        function Un(t) {
            t > 4 && 0 == --zn[t].refcount && (zn[t] = void 0,
            In.push(t))
        }
        function Hn() {
            for (var t = 0, n = 5; n < zn.length; ++n)
                void 0 !== zn[n] && ++t;
            return t
        }
        function Yn() {
            for (var t = 5; t < zn.length; ++t)
                if (void 0 !== zn[t])
                    return zn[t];
            return null
        }
        function Bn(t) {
            switch (t) {
            case void 0:
                return 1;
            case null:
                return 2;
            case !0:
                return 3;
            case !1:
                return 4;
            default:
                var n = In.length ? In.pop() : zn.length;
                return zn[n] = {
                    refcount: 1,
                    value: t
                },
                n
            }
        }
        function Nn(t, n, e) {
            switch (n) {
            case 0:
                return function(t) {
                    var n = e ? S : O;
                    return this.fromWireType(n[t])
                }
                ;
            case 1:
                return function(t) {
                    var n = e ? k : D;
                    return this.fromWireType(n[t >> 1])
                }
                ;
            case 2:
                return function(t) {
                    var n = e ? x : F;
                    return this.fromWireType(n[t >> 2])
                }
                ;
            default:
                throw new TypeError("Unknown integer type: " + t)
            }
        }
        function Ln(t, n) {
            var e = xt[t];
            return void 0 === e && Vt(n + " has unknown type " + Dn(t)),
            e
        }
        function Vn(t) {
            if (null === t)
                return "null";
            var n = typeof t;
            return "object" === n || "array" === n || "function" === n ? t.toString() : "" + t
        }
        function Gn(t, n) {
            switch (n) {
            case 2:
                return function(t) {
                    return this.fromWireType(E[t >> 2])
                }
                ;
            case 3:
                return function(t) {
                    return this.fromWireType(M[t >> 3])
                }
                ;
            default:
                throw new TypeError("Unknown float type: " + t)
            }
        }
        function qn(t, n, e) {
            switch (n) {
            case 0:
                return e ? function(t) {
                    return S[t]
                }
                : function(t) {
                    return O[t]
                }
                ;
            case 1:
                return e ? function(t) {
                    return k[t >> 1]
                }
                : function(t) {
                    return D[t >> 1]
                }
                ;
            case 2:
                return e ? function(t) {
                    return x[t >> 2]
                }
                : function(t) {
                    return F[t >> 2]
                }
                ;
            default:
                throw new TypeError("Unknown integer type: " + t)
            }
        }
        function Jn(t) {
            return t || Vt("Cannot use deleted val. handle = " + t),
            zn[t].value
        }
        var Kn = {};
        function Qn(t) {
            var n = Kn[t];
            return void 0 === n ? Nt(t) : n
        }
        var Xn = [];
        function Zn() {
            return "object" == typeof globalThis ? globalThis : Function("return this")()
        }
        function te(t) {
            try {
                return m.grow(t - A.byteLength + 65535 >>> 16),
                V(m.buffer),
                1
            } catch (t) {}
        }
        var ne = {};
        function ee() {
            if (!ee.strings) {
                var t = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                    _: s || "./this.program"
                };
                for (var n in ne)
                    t[n] = ne[n];
                var e = [];
                for (var n in t)
                    e.push(n + "=" + t[n]);
                ee.strings = e
            }
            return ee.strings
        }
        var re = (W("GMT", 1651312, 4),
        1651312);
        function ie() {
            if (!ie.called) {
                ie.called = !0,
                x[Te() >> 2] = 60 * (new Date).getTimezoneOffset();
                var t = (new Date).getFullYear()
                  , n = new Date(t,0,1)
                  , e = new Date(t,6,1);
                x[be() >> 2] = Number(n.getTimezoneOffset() != e.getTimezoneOffset());
                var r = u(n)
                  , i = u(e)
                  , a = N(r)
                  , o = N(i);
                e.getTimezoneOffset() < n.getTimezoneOffset() ? (x[we() >> 2] = a,
                x[we() + 4 >> 2] = o) : (x[we() >> 2] = o,
                x[we() + 4 >> 2] = a)
            }
            function u(t) {
                var n = t.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                return n ? n[1] : "GMT"
            }
        }
        function ae(t, n) {
            ie();
            var e = new Date(1e3 * x[t >> 2]);
            x[n >> 2] = e.getSeconds(),
            x[n + 4 >> 2] = e.getMinutes(),
            x[n + 8 >> 2] = e.getHours(),
            x[n + 12 >> 2] = e.getDate(),
            x[n + 16 >> 2] = e.getMonth(),
            x[n + 20 >> 2] = e.getFullYear() - 1900,
            x[n + 24 >> 2] = e.getDay();
            var r = new Date(e.getFullYear(),0,1)
              , i = (e.getTime() - r.getTime()) / 864e5 | 0;
            x[n + 28 >> 2] = i,
            x[n + 36 >> 2] = -60 * e.getTimezoneOffset();
            var a = new Date(e.getFullYear(),6,1).getTimezoneOffset()
              , o = r.getTimezoneOffset()
              , u = 0 | (a != o && e.getTimezoneOffset() == Math.min(o, a));
            x[n + 32 >> 2] = u;
            var l = x[we() + (u ? 4 : 0) >> 2];
            return x[n + 40 >> 2] = l,
            n
        }
        function oe(t) {
            return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0)
        }
        function ue(t, n) {
            for (var e = 0, r = 0; r <= n; e += t[r++])
                ;
            return e
        }
        var le = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          , se = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        function ce(t, n) {
            for (var e = new Date(t.getTime()); n > 0; ) {
                var r = oe(e.getFullYear())
                  , i = e.getMonth()
                  , a = (r ? le : se)[i];
                if (!(n > a - e.getDate()))
                    return e.setDate(e.getDate() + n),
                    e;
                n -= a - e.getDate() + 1,
                e.setDate(1),
                i < 11 ? e.setMonth(i + 1) : (e.setMonth(0),
                e.setFullYear(e.getFullYear() + 1))
            }
            return e
        }
        function fe(t, n, e, r) {
            var i = x[r + 40 >> 2]
              , a = {
                tm_sec: x[r >> 2],
                tm_min: x[r + 4 >> 2],
                tm_hour: x[r + 8 >> 2],
                tm_mday: x[r + 12 >> 2],
                tm_mon: x[r + 16 >> 2],
                tm_year: x[r + 20 >> 2],
                tm_wday: x[r + 24 >> 2],
                tm_yday: x[r + 28 >> 2],
                tm_isdst: x[r + 32 >> 2],
                tm_gmtoff: x[r + 36 >> 2],
                tm_zone: i ? j(i) : ""
            }
              , o = j(e)
              , u = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
                "%Ec": "%c",
                "%EC": "%C",
                "%Ex": "%m/%d/%y",
                "%EX": "%H:%M:%S",
                "%Ey": "%y",
                "%EY": "%Y",
                "%Od": "%d",
                "%Oe": "%e",
                "%OH": "%H",
                "%OI": "%I",
                "%Om": "%m",
                "%OM": "%M",
                "%OS": "%S",
                "%Ou": "%u",
                "%OU": "%U",
                "%OV": "%V",
                "%Ow": "%w",
                "%OW": "%W",
                "%Oy": "%y"
            };
            for (var l in u)
                o = o.replace(new RegExp(l,"g"), u[l]);
            var s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
              , c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            function f(t, n, e) {
                for (var r = "number" == typeof t ? t.toString() : t || ""; r.length < n; )
                    r = e[0] + r;
                return r
            }
            function d(t, n) {
                return f(t, n, "0")
            }
            function p(t, n) {
                function e(t) {
                    return t < 0 ? -1 : t > 0 ? 1 : 0
                }
                var r;
                return 0 === (r = e(t.getFullYear() - n.getFullYear())) && 0 === (r = e(t.getMonth() - n.getMonth())) && (r = e(t.getDate() - n.getDate())),
                r
            }
            function _(t) {
                switch (t.getDay()) {
                case 0:
                    return new Date(t.getFullYear() - 1,11,29);
                case 1:
                    return t;
                case 2:
                    return new Date(t.getFullYear(),0,3);
                case 3:
                    return new Date(t.getFullYear(),0,2);
                case 4:
                    return new Date(t.getFullYear(),0,1);
                case 5:
                    return new Date(t.getFullYear() - 1,11,31);
                case 6:
                    return new Date(t.getFullYear() - 1,11,30)
                }
            }
            function y(t) {
                var n = ce(new Date(t.tm_year + 1900,0,1), t.tm_yday)
                  , e = new Date(n.getFullYear(),0,4)
                  , r = new Date(n.getFullYear() + 1,0,4)
                  , i = _(e)
                  , a = _(r);
                return p(i, n) <= 0 ? p(a, n) <= 0 ? n.getFullYear() + 1 : n.getFullYear() : n.getFullYear() - 1
            }
            var m = {
                "%a": function(t) {
                    return s[t.tm_wday].substring(0, 3)
                },
                "%A": function(t) {
                    return s[t.tm_wday]
                },
                "%b": function(t) {
                    return c[t.tm_mon].substring(0, 3)
                },
                "%B": function(t) {
                    return c[t.tm_mon]
                },
                "%C": function(t) {
                    return d((t.tm_year + 1900) / 100 | 0, 2)
                },
                "%d": function(t) {
                    return d(t.tm_mday, 2)
                },
                "%e": function(t) {
                    return f(t.tm_mday, 2, " ")
                },
                "%g": function(t) {
                    return y(t).toString().substring(2)
                },
                "%G": function(t) {
                    return y(t)
                },
                "%H": function(t) {
                    return d(t.tm_hour, 2)
                },
                "%I": function(t) {
                    var n = t.tm_hour;
                    return 0 == n ? n = 12 : n > 12 && (n -= 12),
                    d(n, 2)
                },
                "%j": function(t) {
                    return d(t.tm_mday + ue(oe(t.tm_year + 1900) ? le : se, t.tm_mon - 1), 3)
                },
                "%m": function(t) {
                    return d(t.tm_mon + 1, 2)
                },
                "%M": function(t) {
                    return d(t.tm_min, 2)
                },
                "%n": function() {
                    return "\n"
                },
                "%p": function(t) {
                    return t.tm_hour >= 0 && t.tm_hour < 12 ? "AM" : "PM"
                },
                "%S": function(t) {
                    return d(t.tm_sec, 2)
                },
                "%t": function() {
                    return "\t"
                },
                "%u": function(t) {
                    return t.tm_wday || 7
                },
                "%U": function(t) {
                    var n = new Date(t.tm_year + 1900,0,1)
                      , e = 0 === n.getDay() ? n : ce(n, 7 - n.getDay())
                      , r = new Date(t.tm_year + 1900,t.tm_mon,t.tm_mday);
                    if (p(e, r) < 0) {
                        var i = ue(oe(r.getFullYear()) ? le : se, r.getMonth() - 1) - 31
                          , a = 31 - e.getDate() + i + r.getDate();
                        return d(Math.ceil(a / 7), 2)
                    }
                    return 0 === p(e, n) ? "01" : "00"
                },
                "%V": function(t) {
                    var n, e = new Date(t.tm_year + 1900,0,4), r = new Date(t.tm_year + 1901,0,4), i = _(e), a = _(r), o = ce(new Date(t.tm_year + 1900,0,1), t.tm_yday);
                    return p(o, i) < 0 ? "53" : p(a, o) <= 0 ? "01" : (n = i.getFullYear() < t.tm_year + 1900 ? t.tm_yday + 32 - i.getDate() : t.tm_yday + 1 - i.getDate(),
                    d(Math.ceil(n / 7), 2))
                },
                "%w": function(t) {
                    return t.tm_wday
                },
                "%W": function(t) {
                    var n = new Date(t.tm_year,0,1)
                      , e = 1 === n.getDay() ? n : ce(n, 0 === n.getDay() ? 1 : 7 - n.getDay() + 1)
                      , r = new Date(t.tm_year + 1900,t.tm_mon,t.tm_mday);
                    if (p(e, r) < 0) {
                        var i = ue(oe(r.getFullYear()) ? le : se, r.getMonth() - 1) - 31
                          , a = 31 - e.getDate() + i + r.getDate();
                        return d(Math.ceil(a / 7), 2)
                    }
                    return 0 === p(e, n) ? "01" : "00"
                },
                "%y": function(t) {
                    return (t.tm_year + 1900).toString().substring(2)
                },
                "%Y": function(t) {
                    return t.tm_year + 1900
                },
                "%z": function(t) {
                    var n = t.tm_gmtoff
                      , e = n >= 0;
                    return n = (n = Math.abs(n) / 60) / 60 * 100 + n % 60,
                    (e ? "+" : "-") + String("0000" + n).slice(-4)
                },
                "%Z": function(t) {
                    return t.tm_zone
                },
                "%%": function() {
                    return "%"
                }
            };
            for (var l in m)
                o.indexOf(l) >= 0 && (o = o.replace(new RegExp(l,"g"), m[l](a)));
            var v, h, g, C, w, b, T = (v = o,
            h = !1,
            C = g > 0 ? g : $(v) + 1,
            w = new Array(C),
            b = P(v, w, 0, w.length),
            h && (w.length = b),
            w);
            return T.length > n ? 0 : (L(T, t),
            T.length - 1)
        }
        var de = [];
        It = i.InternalError = Rt(Error, "InternalError"),
        function() {
            for (var t = new Array(256), n = 0; n < 256; ++n)
                t[n] = String.fromCharCode(n);
            Bt = t
        }(),
        Lt = i.BindingError = Rt(Error, "BindingError"),
        ln.prototype.isAliasOf = qt,
        ln.prototype.clone = tn,
        ln.prototype.delete = nn,
        ln.prototype.isDeleted = en,
        ln.prototype.deleteLater = un,
        An.prototype.getPointee = vn,
        An.prototype.destructor = hn,
        An.prototype.argPackAdvance = 8,
        An.prototype.readValueFromPointer = kt,
        An.prototype.deleteObject = gn,
        An.prototype.fromWireType = $n,
        i.getInheritedInstanceCount = wn,
        i.getLiveInheritedInstances = bn,
        i.flushPendingDeletes = on,
        i.setDelayFunction = Tn,
        kn = i.UnboundTypeError = Rt(Error, "UnboundTypeError"),
        i.count_emval_handles = Hn,
        i.get_first_emval = Yn;
        var pe, _e = {
            __clock_gettime: function(t, n) {
                return pt(t, n)
            },
            __cxa_allocate_exception: function(t) {
                return ve(t + gt) + gt
            },
            __cxa_atexit: function(t, n) {},
            __cxa_begin_catch: function(t) {
                var n = new bt(t)
                  , e = n.get_exception_info();
                return e.get_caught() || (e.set_caught(!0),
                jt.uncaught_exceptions--),
                e.set_rethrown(!1),
                Tt.push(n),
                function(t) {
                    t.add_ref()
                }(e),
                n.get_exception_ptr()
            },
            __cxa_decrement_exception_refcount: function(t) {
                t && Wt(new wt(t))
            },
            __cxa_end_catch: function() {
                je(0);
                var t = Tt.pop();
                Wt(t.get_exception_info()),
                t.free(),
                $t = 0
            },
            __cxa_find_matching_catch_2: function() {
                var t = $t;
                if (!t)
                    return 0 | (h(0),
                    0);
                var n = new wt(t)
                  , e = n.get_type()
                  , r = new bt;
                if (r.set_base_ptr(t),
                !e)
                    return 0 | (h(0),
                    r.ptr);
                var i = Array.prototype.slice.call(arguments)
                  , a = 1651408;
                x[a >> 2] = t;
                for (var o = 0; o < i.length; o++) {
                    var u = i[o];
                    if (0 === u || u === e)
                        break;
                    if (___cxa_can_catch(u, e, a)) {
                        var l = x[a >> 2];
                        return t !== l && r.set_adjusted_ptr(l),
                        0 | (h(u),
                        r.ptr)
                    }
                }
                return 0 | (h(e),
                r.ptr)
            },
            __cxa_find_matching_catch_3: function() {
                var t = $t;
                if (!t)
                    return 0 | (h(0),
                    0);
                var n = new wt(t)
                  , e = n.get_type()
                  , r = new bt;
                if (r.set_base_ptr(t),
                !e)
                    return 0 | (h(0),
                    r.ptr);
                var i = Array.prototype.slice.call(arguments)
                  , a = 1651408;
                x[a >> 2] = t;
                for (var o = 0; o < i.length; o++) {
                    var u = i[o];
                    if (0 === u || u === e)
                        break;
                    if (___cxa_can_catch(u, e, a)) {
                        var l = x[a >> 2];
                        return t !== l && r.set_adjusted_ptr(l),
                        0 | (h(u),
                        r.ptr)
                    }
                }
                return 0 | (h(e),
                r.ptr)
            },
            __cxa_free_exception: Pt,
            __cxa_rethrow: function() {
                var t = Tt.pop()
                  , n = t.get_exception_info()
                  , e = t.get_base_ptr();
                throw n.get_rethrown() ? t.free() : (Tt.push(t),
                n.set_rethrown(!0)),
                $t = e,
                e
            },
            __cxa_throw: function(t, n, e) {
                throw new wt(t).init(n, e),
                $t = t,
                "uncaught_exception"in jt ? jt.uncaught_exceptions++ : jt.uncaught_exceptions = 1,
                t
            },
            __cxa_uncaught_exceptions: function() {
                return jt.uncaught_exceptions
            },
            __map_file: function(t, n) {
                return dt(63),
                -1
            },
            __resumeException: function(t) {
                var n = new bt(t)
                  , e = n.get_base_ptr();
                throw $t || ($t = e),
                n.free(),
                e
            },
            __sys__newselect: function(t, n, e, r, i) {},
            __sys_fcntl64: function(t, n, e) {
                return At.varargs = e,
                0
            },
            __sys_fstat64: function(t, n) {},
            __sys_getpid: function() {
                return 42
            },
            __sys_getuid32: function() {
                return 0
            },
            __sys_ioctl: function(t, n, e) {
                return At.varargs = e,
                0
            },
            __sys_mmap2: function(t, n, e, r, i, a) {
                return function(t, n, e, r, i, a) {
                    var o;
                    a <<= 12;
                    var u = !1;
                    return 0 != (16 & r) && t % 16384 != 0 ? -28 : 0 == (32 & r) ? -52 : (o = $e(16384, n)) ? (me(o, 0, n),
                    u = !0,
                    At.mappings[o] = {
                        malloc: o,
                        len: n,
                        allocated: u,
                        fd: i,
                        prot: e,
                        flags: r,
                        offset: a
                    },
                    o) : -48
                }(t, n, e, r, i, a)
            },
            __sys_munmap: function(t, n) {
                return function(t, n) {
                    if (-1 == (0 | t) || 0 === n)
                        return -28;
                    var e = At.mappings[t];
                    return e ? (n === e.len && (At.mappings[t] = null,
                    e.allocated && he(e.malloc)),
                    0) : 0
                }(t, n)
            },
            __sys_open: function(t, n, e) {
                At.varargs = e
            },
            __sys_read: function(t, n, e) {},
            __sys_rmdir: function(t) {},
            __sys_stat64: function(t, n) {},
            __sys_unlink: function(t) {},
            _embind_finalize_value_array: function(t) {
                var n = St[t];
                delete St[t];
                var e = n.elements
                  , r = e.length
                  , i = e.map((function(t) {
                    return t.getterReturnType
                }
                )).concat(e.map((function(t) {
                    return t.setterArgumentType
                }
                )))
                  , a = n.rawConstructor
                  , o = n.rawDestructor;
                Ut([t], i, (function(t) {
                    return e.forEach((function(n, e) {
                        var i = t[e]
                          , a = n.getter
                          , o = n.getterContext
                          , u = t[e + r]
                          , l = n.setter
                          , s = n.setterContext;
                        n.read = function(t) {
                            return i.fromWireType(a(o, t))
                        }
                        ,
                        n.write = function(t, n) {
                            var e = [];
                            l(s, t, u.toWireType(e, n)),
                            Ot(e)
                        }
                    }
                    )),
                    [{
                        name: n.name,
                        fromWireType: function(t) {
                            for (var n = new Array(r), i = 0; i < r; ++i)
                                n[i] = e[i].read(t);
                            return o(t),
                            n
                        },
                        toWireType: function(t, i) {
                            if (r !== i.length)
                                throw new TypeError("Incorrect number of tuple elements for " + n.name + ": expected=" + r + ", actual=" + i.length);
                            for (var u = a(), l = 0; l < r; ++l)
                                e[l].write(u, i[l]);
                            return null !== t && t.push(o, u),
                            u
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: kt,
                        destructorFunction: o
                    }]
                }
                ))
            },
            _embind_finalize_value_object: function(t) {
                var n = Ht[t];
                delete Ht[t];
                var e = n.rawConstructor
                  , r = n.rawDestructor
                  , i = n.fields;
                Ut([t], i.map((function(t) {
                    return t.getterReturnType
                }
                )).concat(i.map((function(t) {
                    return t.setterArgumentType
                }
                ))), (function(t) {
                    var a = {};
                    return i.forEach((function(n, e) {
                        var r = n.fieldName
                          , o = t[e]
                          , u = n.getter
                          , l = n.getterContext
                          , s = t[e + i.length]
                          , c = n.setter
                          , f = n.setterContext;
                        a[r] = {
                            read: function(t) {
                                return o.fromWireType(u(l, t))
                            },
                            write: function(t, n) {
                                var e = [];
                                c(f, t, s.toWireType(e, n)),
                                Ot(e)
                            }
                        }
                    }
                    )),
                    [{
                        name: n.name,
                        fromWireType: function(t) {
                            var n = {};
                            for (var e in a)
                                n[e] = a[e].read(t);
                            return r(t),
                            n
                        },
                        toWireType: function(t, n) {
                            for (var i in a)
                                if (!(i in n))
                                    throw new TypeError('Missing field:  "' + i + '"');
                            var o = e();
                            for (i in a)
                                a[i].write(o, n[i]);
                            return null !== t && t.push(r, o),
                            o
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: kt,
                        destructorFunction: r
                    }]
                }
                ))
            },
            _embind_register_bool: function(t, n, e, r, i) {
                var a = Yt(e);
                Gt(t, {
                    name: n = Nt(n),
                    fromWireType: function(t) {
                        return !!t
                    },
                    toWireType: function(t, n) {
                        return n ? r : i
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: function(t) {
                        var r;
                        if (1 === e)
                            r = S;
                        else if (2 === e)
                            r = k;
                        else {
                            if (4 !== e)
                                throw new TypeError("Unknown boolean type size: " + n);
                            r = x
                        }
                        return this.fromWireType(r[t >> a])
                    },
                    destructorFunction: null
                })
            },
            _embind_register_class: function(t, n, e, r, i, a, o, u, l, s, c, f, d) {
                c = Nt(c),
                a = On(i, a),
                u && (u = On(o, u)),
                s && (s = On(l, s)),
                d = On(f, d);
                var p = Et(c);
                fn(p, (function() {
                    xn("Cannot construct " + c + " due to unbound types", [r])
                }
                )),
                Ut([t, n, e], r ? [r] : [], (function(n) {
                    var e, i;
                    n = n[0],
                    i = r ? (e = n.registeredClass).instancePrototype : ln.prototype;
                    var o = Mt(p, (function() {
                        if (Object.getPrototypeOf(this) !== l)
                            throw new Lt("Use 'new' to construct " + c);
                        if (void 0 === f.constructor_body)
                            throw new Lt(c + " has no accessible constructor");
                        var t = f.constructor_body[arguments.length];
                        if (void 0 === t)
                            throw new Lt("Tried to invoke ctor of " + c + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(f.constructor_body).toString() + ") parameters instead!");
                        return t.apply(this, arguments)
                    }
                    ))
                      , l = Object.create(i, {
                        constructor: {
                            value: o
                        }
                    });
                    o.prototype = l;
                    var f = new dn(c,o,l,d,e,a,u,s)
                      , _ = new An(c,f,!0,!1,!1)
                      , y = new An(c + "*",f,!1,!1,!1)
                      , m = new An(c + " const*",f,!1,!0,!1);
                    return sn[t] = {
                        pointerType: y,
                        constPointerType: m
                    },
                    Sn(p, o),
                    [_, y, m]
                }
                ))
            },
            _embind_register_class_constructor: function(t, n, e, r, i, a) {
                w(n > 0);
                var o = Fn(n, e);
                i = On(r, i);
                var u = [a]
                  , l = [];
                Ut([], [t], (function(t) {
                    var e = "constructor " + (t = t[0]).name;
                    if (void 0 === t.registeredClass.constructor_body && (t.registeredClass.constructor_body = []),
                    void 0 !== t.registeredClass.constructor_body[n - 1])
                        throw new Lt("Cannot register multiple constructors with identical number of parameters (" + (n - 1) + ") for class '" + t.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
                    return t.registeredClass.constructor_body[n - 1] = function() {
                        xn("Cannot construct " + t.name + " due to unbound types", o)
                    }
                    ,
                    Ut([], o, (function(r) {
                        return t.registeredClass.constructor_body[n - 1] = function() {
                            arguments.length !== n - 1 && Vt(e + " called with " + arguments.length + " arguments, expected " + (n - 1)),
                            l.length = 0,
                            u.length = n;
                            for (var t = 1; t < n; ++t)
                                u[t] = r[t].toWireType(l, arguments[t - 1]);
                            var a = i.apply(null, u);
                            return Ot(l),
                            r[0].fromWireType(a)
                        }
                        ,
                        []
                    }
                    )),
                    []
                }
                ))
            },
            _embind_register_class_function: function(t, n, e, r, i, a, o, u) {
                var l = Fn(e, r);
                n = Nt(n),
                a = On(i, a),
                Ut([], [t], (function(t) {
                    var r = (t = t[0]).name + "." + n;
                    function i() {
                        xn("Cannot call " + r + " due to unbound types", l)
                    }
                    u && t.registeredClass.pureVirtualFunctions.push(n);
                    var s = t.registeredClass.instancePrototype
                      , c = s[n];
                    return void 0 === c || void 0 === c.overloadTable && c.className !== t.name && c.argCount === e - 2 ? (i.argCount = e - 2,
                    i.className = t.name,
                    s[n] = i) : (cn(s, n, r),
                    s[n].overloadTable[e - 2] = i),
                    Ut([], l, (function(i) {
                        var u = Mn(r, i, t, a, o);
                        return void 0 === s[n].overloadTable ? (u.argCount = e - 2,
                        s[n] = u) : s[n].overloadTable[e - 2] = u,
                        []
                    }
                    )),
                    []
                }
                ))
            },
            _embind_register_class_property: function(t, n, e, r, i, a, o, u, l, s) {
                n = Nt(n),
                i = On(r, i),
                Ut([], [t], (function(t) {
                    var r = (t = t[0]).name + "." + n
                      , c = {
                        get: function() {
                            xn("Cannot access " + r + " due to unbound types", [e, o])
                        },
                        enumerable: !0,
                        configurable: !0
                    };
                    return c.set = l ? function() {
                        xn("Cannot access " + r + " due to unbound types", [e, o])
                    }
                    : function(t) {
                        Vt(r + " is a read-only property")
                    }
                    ,
                    Object.defineProperty(t.registeredClass.instancePrototype, n, c),
                    Ut([], l ? [e, o] : [e], (function(e) {
                        var o = e[0]
                          , c = {
                            get: function() {
                                var n = Rn(this, t, r + " getter");
                                return o.fromWireType(i(a, n))
                            },
                            enumerable: !0
                        };
                        if (l) {
                            l = On(u, l);
                            var f = e[1];
                            c.set = function(n) {
                                var e = Rn(this, t, r + " setter")
                                  , i = [];
                                l(s, e, f.toWireType(i, n)),
                                Ot(i)
                            }
                        }
                        return Object.defineProperty(t.registeredClass.instancePrototype, n, c),
                        []
                    }
                    )),
                    []
                }
                ))
            },
            _embind_register_emval: function(t, n) {
                Gt(t, {
                    name: n = Nt(n),
                    fromWireType: function(t) {
                        var n = zn[t].value;
                        return Un(t),
                        n
                    },
                    toWireType: function(t, n) {
                        return Bn(n)
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: kt,
                    destructorFunction: null
                })
            },
            _embind_register_enum: function(t, n, e, r) {
                var i = Yt(e);
                function a() {}
                n = Nt(n),
                a.values = {},
                Gt(t, {
                    name: n,
                    constructor: a,
                    fromWireType: function(t) {
                        return this.constructor.values[t]
                    },
                    toWireType: function(t, n) {
                        return n.value
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: Nn(n, i, r),
                    destructorFunction: null
                }),
                fn(n, a)
            },
            _embind_register_enum_value: function(t, n, e) {
                var r = Ln(t, "enum");
                n = Nt(n);
                var i = r.constructor
                  , a = Object.create(r.constructor.prototype, {
                    value: {
                        value: e
                    },
                    constructor: {
                        value: Mt(r.name + "_" + n, (function() {}
                        ))
                    }
                });
                i.values[e] = a,
                i[n] = a
            },
            _embind_register_float: function(t, n, e) {
                var r = Yt(e);
                Gt(t, {
                    name: n = Nt(n),
                    fromWireType: function(t) {
                        return t
                    },
                    toWireType: function(t, n) {
                        if ("number" != typeof n && "boolean" != typeof n)
                            throw new TypeError('Cannot convert "' + Vn(n) + '" to ' + this.name);
                        return n
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: Gn(n, r),
                    destructorFunction: null
                })
            },
            _embind_register_function: function(t, n, e, r, i, a) {
                var o = Fn(n, e);
                t = Nt(t),
                i = On(r, i),
                fn(t, (function() {
                    xn("Cannot call " + t + " due to unbound types", o)
                }
                ), n - 1),
                Ut([], o, (function(e) {
                    var r = [e[0], null].concat(e.slice(1));
                    return Sn(t, Mn(t, r, null, i, a), n - 1),
                    []
                }
                ))
            },
            _embind_register_integer: function(t, n, e, r, i) {
                n = Nt(n),
                -1 === i && (i = 4294967295);
                var a = Yt(e)
                  , o = function(t) {
                    return t
                };
                if (0 === r) {
                    var u = 32 - 8 * e;
                    o = function(t) {
                        return t << u >>> u
                    }
                }
                var l = -1 != n.indexOf("unsigned");
                Gt(t, {
                    name: n,
                    fromWireType: o,
                    toWireType: function(t, e) {
                        if ("number" != typeof e && "boolean" != typeof e)
                            throw new TypeError('Cannot convert "' + Vn(e) + '" to ' + this.name);
                        if (e < r || e > i)
                            throw new TypeError('Passing a number "' + Vn(e) + '" from JS side to C/C++ side to an argument of type "' + n + '", which is outside the valid range [' + r + ", " + i + "]!");
                        return l ? e >>> 0 : 0 | e
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: qn(n, a, 0 !== r),
                    destructorFunction: null
                })
            },
            _embind_register_memory_view: function(t, n, e) {
                var r = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][n];
                function i(t) {
                    var n = F
                      , e = n[t >>= 2]
                      , i = n[t + 1];
                    return new r(A,i,e)
                }
                Gt(t, {
                    name: e = Nt(e),
                    fromWireType: i,
                    argPackAdvance: 8,
                    readValueFromPointer: i
                }, {
                    ignoreDuplicateRegistrations: !0
                })
            },
            _embind_register_std_string: function(t, n) {
                var e = "std::string" === (n = Nt(n));
                Gt(t, {
                    name: n,
                    fromWireType: function(t) {
                        var n, r = F[t >> 2];
                        if (e)
                            for (var i = t + 4, a = 0; a <= r; ++a) {
                                var o = t + 4 + a;
                                if (a == r || 0 == O[o]) {
                                    var u = j(i, o - i);
                                    void 0 === n ? n = u : (n += String.fromCharCode(0),
                                    n += u),
                                    i = o + 1
                                }
                            }
                        else {
                            var l = new Array(r);
                            for (a = 0; a < r; ++a)
                                l[a] = String.fromCharCode(O[t + 4 + a]);
                            n = l.join("")
                        }
                        return he(t),
                        n
                    },
                    toWireType: function(t, n) {
                        n instanceof ArrayBuffer && (n = new Uint8Array(n));
                        var r = "string" == typeof n;
                        r || n instanceof Uint8Array || n instanceof Uint8ClampedArray || n instanceof Int8Array || Vt("Cannot pass non-string to std::string");
                        var i = (e && r ? function() {
                            return $(n)
                        }
                        : function() {
                            return n.length
                        }
                        )()
                          , a = ve(4 + i + 1);
                        if (F[a >> 2] = i,
                        e && r)
                            W(n, a + 4, i + 1);
                        else if (r)
                            for (var o = 0; o < i; ++o) {
                                var u = n.charCodeAt(o);
                                u > 255 && (he(a),
                                Vt("String has UTF-16 code units that do not fit in 8 bits")),
                                O[a + 4 + o] = u
                            }
                        else
                            for (o = 0; o < i; ++o)
                                O[a + 4 + o] = n[o];
                        return null !== t && t.push(he, a),
                        a
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: kt,
                    destructorFunction: function(t) {
                        he(t)
                    }
                })
            },
            _embind_register_std_wstring: function(t, n, e) {
                var r, i, a, o, u;
                e = Nt(e),
                2 === n ? (r = I,
                i = z,
                o = U,
                a = function() {
                    return D
                }
                ,
                u = 1) : 4 === n && (r = H,
                i = Y,
                o = B,
                a = function() {
                    return F
                }
                ,
                u = 2),
                Gt(t, {
                    name: e,
                    fromWireType: function(t) {
                        for (var e, i = F[t >> 2], o = a(), l = t + 4, s = 0; s <= i; ++s) {
                            var c = t + 4 + s * n;
                            if (s == i || 0 == o[c >> u]) {
                                var f = r(l, c - l);
                                void 0 === e ? e = f : (e += String.fromCharCode(0),
                                e += f),
                                l = c + n
                            }
                        }
                        return he(t),
                        e
                    },
                    toWireType: function(t, r) {
                        "string" != typeof r && Vt("Cannot pass non-string to C++ string type " + e);
                        var a = o(r)
                          , l = ve(4 + a + n);
                        return F[l >> 2] = a >> u,
                        i(r, l + 4, a + n),
                        null !== t && t.push(he, l),
                        l
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: kt,
                    destructorFunction: function(t) {
                        he(t)
                    }
                })
            },
            _embind_register_value_array: function(t, n, e, r, i, a) {
                St[t] = {
                    name: Nt(n),
                    rawConstructor: On(e, r),
                    rawDestructor: On(i, a),
                    elements: []
                }
            },
            _embind_register_value_array_element: function(t, n, e, r, i, a, o, u, l) {
                St[t].elements.push({
                    getterReturnType: n,
                    getter: On(e, r),
                    getterContext: i,
                    setterArgumentType: a,
                    setter: On(o, u),
                    setterContext: l
                })
            },
            _embind_register_value_object: function(t, n, e, r, i, a) {
                Ht[t] = {
                    name: Nt(n),
                    rawConstructor: On(e, r),
                    rawDestructor: On(i, a),
                    fields: []
                }
            },
            _embind_register_value_object_field: function(t, n, e, r, i, a, o, u, l, s) {
                Ht[t].fields.push({
                    fieldName: Nt(n),
                    getterReturnType: e,
                    getter: On(r, i),
                    getterContext: a,
                    setterArgumentType: o,
                    setter: On(u, l),
                    setterContext: s
                })
            },
            _embind_register_void: function(t, n) {
                Gt(t, {
                    isVoid: !0,
                    name: n = Nt(n),
                    argPackAdvance: 0,
                    fromWireType: function() {},
                    toWireType: function(t, n) {}
                })
            },
            _emval_as: function(t, n, e) {
                t = Jn(t),
                n = Ln(n, "emval::as");
                var r = []
                  , i = Bn(r);
                return x[e >> 2] = i,
                n.toWireType(r, t)
            },
            _emval_call_method: function(t, n, e, r, i) {
                return (t = Xn[t])(n = Jn(n), e = Qn(e), function(t) {
                    var n = [];
                    return x[t >> 2] = Bn(n),
                    n
                }(r), i)
            },
            _emval_call_void_method: function(t, n, e, r) {
                (t = Xn[t])(n = Jn(n), e = Qn(e), null, r)
            },
            _emval_decref: Un,
            _emval_get_global: function(t) {
                return 0 === t ? Bn(Zn()) : (t = Qn(t),
                Bn(Zn()[t]))
            },
            _emval_get_method_caller: function(t, n) {
                for (var e = function(t, n) {
                    for (var e = new Array(t), r = 0; r < t; ++r)
                        e[r] = Ln(x[(n >> 2) + r], "parameter " + r);
                    return e
                }(t, n), r = e[0], i = r.name + "_$" + e.slice(1).map((function(t) {
                    return t.name
                }
                )).join("_") + "$", a = ["retType"], o = [r], u = "", l = 0; l < t - 1; ++l)
                    u += (0 !== l ? ", " : "") + "arg" + l,
                    a.push("argType" + l),
                    o.push(e[1 + l]);
                var s = "return function " + Et("methodCaller_" + i) + "(handle, name, destructors, args) {\n"
                  , c = 0;
                for (l = 0; l < t - 1; ++l)
                    s += "    var arg" + l + " = argType" + l + ".readValueFromPointer(args" + (c ? "+" + c : "") + ");\n",
                    c += e[l + 1].argPackAdvance;
                for (s += "    var rv = handle[name](" + u + ");\n",
                l = 0; l < t - 1; ++l)
                    e[l + 1].deleteObject && (s += "    argType" + l + ".deleteObject(arg" + l + ");\n");
                r.isVoid || (s += "    return retType.toWireType(destructors, rv);\n"),
                s += "};\n",
                a.push(s);
                var f, d, p = En(Function, a).apply(null, o);
                return f = p,
                d = Xn.length,
                Xn.push(f),
                d
            },
            _emval_get_property: function(t, n) {
                return Bn((t = Jn(t))[n = Jn(n)])
            },
            _emval_incref: function(t) {
                t > 4 && (zn[t].refcount += 1)
            },
            _emval_is_number: function(t) {
                return "number" == typeof (t = Jn(t))
            },
            _emval_is_string: function(t) {
                return "string" == typeof (t = Jn(t))
            },
            _emval_new_array: function() {
                return Bn([])
            },
            _emval_new_cstring: function(t) {
                return Bn(Qn(t))
            },
            _emval_run_destructors: function(t) {
                Ot(zn[t].value),
                Un(t)
            },
            _emval_take_value: function(t, n) {
                return Bn((t = Ln(t, "_emval_take_value")).readValueFromPointer(n))
            },
            abort: function() {
                at()
            },
            atexit: Ct,
            clock: function t() {
                return void 0 === t.start && (t.start = Date.now()),
                1e3 * (Date.now() - t.start) | 0
            },
            clock_gettime: pt,
            emscripten_asm_const_iii: function(t, n, e) {
                var r = function(t, n) {
                    var e;
                    for (de.length = 0,
                    n >>= 2; e = O[t++]; ) {
                        var r = e < 105;
                        r && 1 & n && n++,
                        de.push(r ? M[n++ >> 1] : x[n]),
                        ++n
                    }
                    return de
                }(n, e);
                return ft[t].apply(null, r)
            },
            emscripten_get_sbrk_ptr: function() {
                return 1651248
            },
            emscripten_longjmp: function(t, n) {
                !function(t, n) {
                    throw je(t, n || 1),
                    "longjmp"
                }(t, n)
            },
            emscripten_memcpy_big: function(t, n, e) {
                O.copyWithin(t, n, n + e)
            },
            emscripten_resize_heap: function(t) {
                t >>>= 0;
                var n = O.length
                  , e = 2147483648;
                if (t > e)
                    return !1;
                for (var r, i, a = 1; a <= 4; a *= 2) {
                    var o = n * (1 + .2 / a);
                    if (o = Math.min(o, t + 100663296),
                    te(Math.min(e, ((r = Math.max(16777216, t, o)) % (i = 65536) > 0 && (r += i - r % i),
                    r))))
                        return !0
                }
                return !1
            },
            environ_get: function(t, n) {
                var e = 0;
                return ee().forEach((function(r, i) {
                    var a = n + e;
                    x[t + 4 * i >> 2] = a,
                    function(t, n, e) {
                        for (var r = 0; r < t.length; ++r)
                            S[n++ >> 0] = t.charCodeAt(r);
                        e || (S[n >> 0] = 0)
                    }(r, a),
                    e += r.length + 1
                }
                )),
                0
            },
            environ_sizes_get: function(t, n) {
                var e = ee();
                x[t >> 2] = e.length;
                var r = 0;
                return e.forEach((function(t) {
                    r += t.length + 1
                }
                )),
                x[n >> 2] = r,
                0
            },
            exit: function(t) {
                !function(t, n) {
                    n && y && 0 === t || (y || (C = !0,
                    i.onExit && i.onExit(t)),
                    c(t, new er(t)))
                }(t)
            },
            fd_close: function(t) {
                return 0
            },
            fd_fdstat_get: function(t, n) {
                var e = 1 == t || 2 == t ? 2 : at();
                return S[n >> 0] = e,
                0
            },
            fd_read: function(t, n, e, r) {
                var i = At.getStreamFromFD(t)
                  , a = At.doReadv(i, n, e);
                return x[r >> 2] = a,
                0
            },
            fd_seek: function(t, n, e, r, i) {},
            fd_write: function(t, n, e, r) {
                for (var i = 0, a = 0; a < e; a++) {
                    for (var o = x[n + 8 * a >> 2], u = x[n + (8 * a + 4) >> 2], l = 0; l < u; l++)
                        At.printChar(t, O[o + l]);
                    i += u
                }
                return x[r >> 2] = i,
                0
            },
            getSelf: function() {
                return N(location.toString())
            },
            getTempRet0: function() {
                return 0 | v
            },
            gettimeofday: function(t) {
                var n = Date.now();
                return x[t >> 2] = n / 1e3 | 0,
                x[t + 4 >> 2] = n % 1e3 * 1e3 | 0,
                0
            },
            gmtime_r: function(t, n) {
                var e = new Date(1e3 * x[t >> 2]);
                x[n >> 2] = e.getUTCSeconds(),
                x[n + 4 >> 2] = e.getUTCMinutes(),
                x[n + 8 >> 2] = e.getUTCHours(),
                x[n + 12 >> 2] = e.getUTCDate(),
                x[n + 16 >> 2] = e.getUTCMonth(),
                x[n + 20 >> 2] = e.getUTCFullYear() - 1900,
                x[n + 24 >> 2] = e.getUTCDay(),
                x[n + 36 >> 2] = 0,
                x[n + 32 >> 2] = 0;
                var r = Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)
                  , i = (e.getTime() - r) / 864e5 | 0;
                return x[n + 28 >> 2] = i,
                x[n + 40 >> 2] = re,
                n
            },
            initializeOpenGL: function() {
                return N((t = ar,
                self[t(408, "4cBh")][t(422, "T%o5")]()));
                var t
            },
            invoke_diii: function(t, n, e, r) {
                var i = Pe();
                try {
                    return nr(t, n, e, r)
                } catch (t) {
                    if (We(i),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_fiii: function(t, n, e, r) {
                var i = Pe();
                try {
                    return tr(t, n, e, r)
                } catch (t) {
                    if (We(i),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_i: function(t) {
                var n = Pe();
                try {
                    return ze(t)
                } catch (t) {
                    if (We(n),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_ii: function(t, n) {
                var e = Pe();
                try {
                    return Ue(t, n)
                } catch (t) {
                    if (We(e),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iii: function(t, n, e) {
                var r = Pe();
                try {
                    return He(t, n, e)
                } catch (t) {
                    if (We(r),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiii: function(t, n, e, r) {
                var i = Pe();
                try {
                    return Ye(t, n, e, r)
                } catch (t) {
                    if (We(i),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiii: function(t, n, e, r, i) {
                var a = Pe();
                try {
                    return Be(t, n, e, r, i)
                } catch (t) {
                    if (We(a),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiid: function(t, n, e, r, i, a) {
                var o = Pe();
                try {
                    return Qe(t, n, e, r, i, a)
                } catch (t) {
                    if (We(o),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiii: function(t, n, e, r, i, a) {
                var o = Pe();
                try {
                    return Ne(t, n, e, r, i, a)
                } catch (t) {
                    if (We(o),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiiii: function(t, n, e, r, i, a, o) {
                var u = Pe();
                try {
                    return Le(t, n, e, r, i, a, o)
                } catch (t) {
                    if (We(u),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiiiii: function(t, n, e, r, i, a, o, u) {
                var l = Pe();
                try {
                    return Ve(t, n, e, r, i, a, o, u)
                } catch (t) {
                    if (We(l),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiiiiiiii: function(t, n, e, r, i, a, o, u, l, s, c) {
                var f = Pe();
                try {
                    return Ge(t, n, e, r, i, a, o, u, l, s, c)
                } catch (t) {
                    if (We(f),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiiiiiiiii: function(t, n, e, r, i, a, o, u, l, s, c, f) {
                var d = Pe();
                try {
                    return qe(t, n, e, r, i, a, o, u, l, s, c, f)
                } catch (t) {
                    if (We(d),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiiiiiiiiii: function(t, n, e, r, i, a, o, u, l, s, c, f, d) {
                var p = Pe();
                try {
                    return Je(t, n, e, r, i, a, o, u, l, s, c, f, d)
                } catch (t) {
                    if (We(p),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_iiiiij: function(t, n, e, r, i, a, o) {
                var u = Pe();
                try {
                    return Ke(t, n, e, r, i, a, o)
                } catch (t) {
                    if (We(u),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_jii: function(t, n, e) {
                var r = Pe();
                try {
                    return Xe(t, n, e)
                } catch (t) {
                    if (We(r),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_jiiii: function(t, n, e, r, i) {
                var a = Pe();
                try {
                    return Ze(t, n, e, r, i)
                } catch (t) {
                    if (We(a),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_v: function(t) {
                var n = Pe();
                try {
                    Ae(t)
                } catch (t) {
                    if (We(n),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_vi: function(t, n) {
                var e = Pe();
                try {
                    Se(t, n)
                } catch (t) {
                    if (We(e),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_vii: function(t, n, e) {
                var r = Pe();
                try {
                    Oe(t, n, e)
                } catch (t) {
                    if (We(r),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viii: function(t, n, e, r) {
                var i = Pe();
                try {
                    ke(t, n, e, r)
                } catch (t) {
                    if (We(i),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viiii: function(t, n, e, r, i) {
                var a = Pe();
                try {
                    De(t, n, e, r, i)
                } catch (t) {
                    if (We(a),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viiiii: function(t, n, e, r, i, a) {
                var o = Pe();
                try {
                    xe(t, n, e, r, i, a)
                } catch (t) {
                    if (We(o),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viiiiii: function(t, n, e, r, i, a, o) {
                var u = Pe();
                try {
                    Fe(t, n, e, r, i, a, o)
                } catch (t) {
                    if (We(u),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viiiiiii: function(t, n, e, r, i, a, o, u) {
                var l = Pe();
                try {
                    Ee(t, n, e, r, i, a, o, u)
                } catch (t) {
                    if (We(l),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viiiiiiiiii: function(t, n, e, r, i, a, o, u, l, s, c) {
                var f = Pe();
                try {
                    Me(t, n, e, r, i, a, o, u, l, s, c)
                } catch (t) {
                    if (We(f),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viiiiiiiiiiiiiii: function(t, n, e, r, i, a, o, u, l, s, c, f, d, p, _, y) {
                var m = Pe();
                try {
                    Re(t, n, e, r, i, a, o, u, l, s, c, f, d, p, _, y)
                } catch (t) {
                    if (We(m),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            invoke_viijii: function(t, n, e, r, i, a, o) {
                var u = Pe();
                try {
                    Ie(t, n, e, r, i, a, o)
                } catch (t) {
                    if (We(u),
                    t !== t + 0 && "longjmp" !== t)
                        throw t;
                    je(1, 0)
                }
            },
            localtime: function(t) {
                return ae(t, 1651264)
            },
            memory: m,
            pthread_create: function() {
                return 6
            },
            pthread_detach: function() {},
            pthread_join: function() {},
            pthread_mutexattr_destroy: function() {},
            pthread_mutexattr_init: function() {},
            pthread_mutexattr_settype: function() {},
            round: function(t) {
                return (t = +t) >= 0 ? +nt(t + .5) : +tt(t - .5)
            },
            roundf: function(t) {
                return (t = +t) >= 0 ? +nt(t + .5) : +tt(t - .5)
            },
            sem_destroy: function() {},
            sem_init: function() {},
            sem_post: function() {},
            sem_wait: function() {},
            setTempRet0: function(t) {
                h(0 | t)
            },
            strftime: fe,
            strftime_l: function(t, n, e, r) {
                return fe(t, n, e, r)
            },
            sysconf: function(t) {
                switch (t) {
                case 30:
                    return 16384;
                case 85:
                    return 131072;
                case 132:
                case 133:
                case 12:
                case 137:
                case 138:
                case 15:
                case 235:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 149:
                case 13:
                case 10:
                case 236:
                case 153:
                case 9:
                case 21:
                case 22:
                case 159:
                case 154:
                case 14:
                case 77:
                case 78:
                case 139:
                case 80:
                case 81:
                case 82:
                case 68:
                case 67:
                case 164:
                case 11:
                case 29:
                case 47:
                case 48:
                case 95:
                case 52:
                case 51:
                case 46:
                case 79:
                    return 200809;
                case 27:
                case 246:
                case 127:
                case 128:
                case 23:
                case 24:
                case 160:
                case 161:
                case 181:
                case 182:
                case 242:
                case 183:
                case 184:
                case 243:
                case 244:
                case 245:
                case 165:
                case 178:
                case 179:
                case 49:
                case 50:
                case 168:
                case 169:
                case 175:
                case 170:
                case 171:
                case 172:
                case 97:
                case 76:
                case 32:
                case 173:
                case 35:
                    return -1;
                case 176:
                case 177:
                case 7:
                case 155:
                case 8:
                case 157:
                case 125:
                case 126:
                case 92:
                case 93:
                case 129:
                case 130:
                case 131:
                case 94:
                case 91:
                    return 1;
                case 74:
                case 60:
                case 69:
                case 70:
                case 4:
                    return 1024;
                case 31:
                case 42:
                case 72:
                    return 32;
                case 87:
                case 26:
                case 33:
                    return 2147483647;
                case 34:
                case 1:
                    return 47839;
                case 38:
                case 36:
                    return 99;
                case 43:
                case 37:
                    return 2048;
                case 0:
                    return 2097152;
                case 3:
                    return 65536;
                case 28:
                    return 32768;
                case 44:
                    return 32767;
                case 75:
                    return 16384;
                case 39:
                    return 1e3;
                case 89:
                    return 700;
                case 71:
                    return 256;
                case 40:
                    return 255;
                case 2:
                    return 100;
                case 180:
                    return 64;
                case 25:
                    return 20;
                case 5:
                    return 16;
                case 6:
                    return 6;
                case 73:
                    return 4;
                case 84:
                    return "object" == typeof navigator && navigator.hardwareConcurrency || 1
                }
                return dt(28),
                -1
            },
            table: g,
            time: function(t) {
                var n = Date.now() / 1e3 | 0;
                return t && (x[t >> 2] = n),
                n
            }
        }, ye = (function() {
            var t = {
                env: _e,
                wasi_snapshot_preview1: _e
            };
            function n(t, n) {
                var e = t.exports;
                i.asm = e,
                function(t) {
                    if (et--,
                    i.monitorRunDependencies && i.monitorRunDependencies(et),
                    0 == et && (null !== rt && (clearInterval(rt),
                    rt = null),
                    it)) {
                        var n = it;
                        it = null,
                        n()
                    }
                }()
            }
            function e(t) {
                n(t.instance)
            }
            function r(n) {
                return (_ || "function" != typeof fetch ? new Promise((function(t, n) {
                    t(st())
                }
                )) : fetch(lt, {
                    credentials: "same-origin"
                }).then((function(t) {
                    if (!t.ok)
                        throw "failed to load wasm binary file at '" + lt + "'";
                    return t.arrayBuffer()
                }
                )).catch((function() {
                    return st()
                }
                ))).then((function(n) {
                    return WebAssembly.instantiate(n, t)
                }
                )).then(n, (function(t) {
                    p("failed to asynchronously prepare wasm: " + t),
                    at(t)
                }
                ))
            }
            if (et++,
            i.monitorRunDependencies && i.monitorRunDependencies(et),
            i.instantiateWasm)
                try {
                    return i.instantiateWasm(t, n)
                } catch (t) {
                    return p("Module.instantiateWasm callback failed with error: " + t),
                    !1
                }
            !function() {
                if (_ || "function" != typeof WebAssembly.instantiateStreaming || ot(lt) || "function" != typeof fetch)
                    return r(e);
                fetch(lt, {
                    credentials: "same-origin"
                }).then((function(n) {
                    return WebAssembly.instantiateStreaming(n, t).then(e, (function(t) {
                        return p("wasm streaming compile failed: " + t),
                        p("falling back to ArrayBuffer instantiation"),
                        r(e)
                    }
                    ))
                }
                ))
            }()
        }(),
        i.___wasm_call_ctors = function() {
            return (ye = i.___wasm_call_ctors = i.asm.__wasm_call_ctors).apply(null, arguments)
        }
        ), me = i._memset = function() {
            return (me = i._memset = i.asm.memset).apply(null, arguments)
        }
        , ve = i._malloc = function() {
            return (ve = i._malloc = i.asm.malloc).apply(null, arguments)
        }
        , he = i._free = function() {
            return (he = i._free = i.asm.free).apply(null, arguments)
        }
        , ge = (i.___em_js__getSelf = function() {
            return (i.___em_js__getSelf = i.asm.__em_js__getSelf).apply(null, arguments)
        }
        ,
        i.___em_js__initializeOpenGL = function() {
            return (i.___em_js__initializeOpenGL = i.asm.__em_js__initializeOpenGL).apply(null, arguments)
        }
        ,
        i.___errno_location = function() {
            return (ge = i.___errno_location = i.asm.__errno_location).apply(null, arguments)
        }
        ), Ce = (i._testSetjmp = function() {
            return (i._testSetjmp = i.asm.testSetjmp).apply(null, arguments)
        }
        ,
        i._saveSetjmp = function() {
            return (i._saveSetjmp = i.asm.saveSetjmp).apply(null, arguments)
        }
        ,
        i._realloc = function() {
            return (i._realloc = i.asm.realloc).apply(null, arguments)
        }
        ,
        i.___getTypeName = function() {
            return (Ce = i.___getTypeName = i.asm.__getTypeName).apply(null, arguments)
        }
        ), we = (i.___embind_register_native_and_builtin_types = function() {
            return (i.___embind_register_native_and_builtin_types = i.asm.__embind_register_native_and_builtin_types).apply(null, arguments)
        }
        ,
        i.__get_tzname = function() {
            return (we = i.__get_tzname = i.asm._get_tzname).apply(null, arguments)
        }
        ), be = i.__get_daylight = function() {
            return (be = i.__get_daylight = i.asm._get_daylight).apply(null, arguments)
        }
        , Te = i.__get_timezone = function() {
            return (Te = i.__get_timezone = i.asm._get_timezone).apply(null, arguments)
        }
        , je = i._setThrew = function() {
            return (je = i._setThrew = i.asm.setThrew).apply(null, arguments)
        }
        , Pe = i.stackSave = function() {
            return (Pe = i.stackSave = i.asm.stackSave).apply(null, arguments)
        }
        , We = i.stackRestore = function() {
            return (We = i.stackRestore = i.asm.stackRestore).apply(null, arguments)
        }
        , $e = (i.stackAlloc = function() {
            return (i.stackAlloc = i.asm.stackAlloc).apply(null, arguments)
        }
        ,
        i._memalign = function() {
            return ($e = i._memalign = i.asm.memalign).apply(null, arguments)
        }
        ), Ae = (i._emscripten_main_thread_process_queued_calls = function() {
            return (i._emscripten_main_thread_process_queued_calls = i.asm.emscripten_main_thread_process_queued_calls).apply(null, arguments)
        }
        ,
        i.dynCall_v = function() {
            return (Ae = i.dynCall_v = i.asm.dynCall_v).apply(null, arguments)
        }
        ), Se = i.dynCall_vi = function() {
            return (Se = i.dynCall_vi = i.asm.dynCall_vi).apply(null, arguments)
        }
        , Oe = i.dynCall_vii = function() {
            return (Oe = i.dynCall_vii = i.asm.dynCall_vii).apply(null, arguments)
        }
        , ke = i.dynCall_viii = function() {
            return (ke = i.dynCall_viii = i.asm.dynCall_viii).apply(null, arguments)
        }
        , De = i.dynCall_viiii = function() {
            return (De = i.dynCall_viiii = i.asm.dynCall_viiii).apply(null, arguments)
        }
        , xe = i.dynCall_viiiii = function() {
            return (xe = i.dynCall_viiiii = i.asm.dynCall_viiiii).apply(null, arguments)
        }
        , Fe = i.dynCall_viiiiii = function() {
            return (Fe = i.dynCall_viiiiii = i.asm.dynCall_viiiiii).apply(null, arguments)
        }
        , Ee = i.dynCall_viiiiiii = function() {
            return (Ee = i.dynCall_viiiiiii = i.asm.dynCall_viiiiiii).apply(null, arguments)
        }
        , Me = i.dynCall_viiiiiiiiii = function() {
            return (Me = i.dynCall_viiiiiiiiii = i.asm.dynCall_viiiiiiiiii).apply(null, arguments)
        }
        , Re = i.dynCall_viiiiiiiiiiiiiii = function() {
            return (Re = i.dynCall_viiiiiiiiiiiiiii = i.asm.dynCall_viiiiiiiiiiiiiii).apply(null, arguments)
        }
        , Ie = i.dynCall_viijii = function() {
            return (Ie = i.dynCall_viijii = i.asm.dynCall_viijii).apply(null, arguments)
        }
        , ze = i.dynCall_i = function() {
            return (ze = i.dynCall_i = i.asm.dynCall_i).apply(null, arguments)
        }
        , Ue = i.dynCall_ii = function() {
            return (Ue = i.dynCall_ii = i.asm.dynCall_ii).apply(null, arguments)
        }
        , He = i.dynCall_iii = function() {
            return (He = i.dynCall_iii = i.asm.dynCall_iii).apply(null, arguments)
        }
        , Ye = i.dynCall_iiii = function() {
            return (Ye = i.dynCall_iiii = i.asm.dynCall_iiii).apply(null, arguments)
        }
        , Be = i.dynCall_iiiii = function() {
            return (Be = i.dynCall_iiiii = i.asm.dynCall_iiiii).apply(null, arguments)
        }
        , Ne = i.dynCall_iiiiii = function() {
            return (Ne = i.dynCall_iiiiii = i.asm.dynCall_iiiiii).apply(null, arguments)
        }
        , Le = i.dynCall_iiiiiii = function() {
            return (Le = i.dynCall_iiiiiii = i.asm.dynCall_iiiiiii).apply(null, arguments)
        }
        , Ve = i.dynCall_iiiiiiii = function() {
            return (Ve = i.dynCall_iiiiiiii = i.asm.dynCall_iiiiiiii).apply(null, arguments)
        }
        , Ge = i.dynCall_iiiiiiiiiii = function() {
            return (Ge = i.dynCall_iiiiiiiiiii = i.asm.dynCall_iiiiiiiiiii).apply(null, arguments)
        }
        , qe = i.dynCall_iiiiiiiiiiii = function() {
            return (qe = i.dynCall_iiiiiiiiiiii = i.asm.dynCall_iiiiiiiiiiii).apply(null, arguments)
        }
        , Je = i.dynCall_iiiiiiiiiiiii = function() {
            return (Je = i.dynCall_iiiiiiiiiiiii = i.asm.dynCall_iiiiiiiiiiiii).apply(null, arguments)
        }
        , Ke = i.dynCall_iiiiij = function() {
            return (Ke = i.dynCall_iiiiij = i.asm.dynCall_iiiiij).apply(null, arguments)
        }
        , Qe = i.dynCall_iiiiid = function() {
            return (Qe = i.dynCall_iiiiid = i.asm.dynCall_iiiiid).apply(null, arguments)
        }
        , Xe = i.dynCall_jii = function() {
            return (Xe = i.dynCall_jii = i.asm.dynCall_jii).apply(null, arguments)
        }
        , Ze = i.dynCall_jiiii = function() {
            return (Ze = i.dynCall_jiiii = i.asm.dynCall_jiiii).apply(null, arguments)
        }
        , tr = i.dynCall_fiii = function() {
            return (tr = i.dynCall_fiii = i.asm.dynCall_fiii).apply(null, arguments)
        }
        , nr = i.dynCall_diii = function() {
            return (nr = i.dynCall_diii = i.asm.dynCall_diii).apply(null, arguments)
        }
        ;
        function er(t) {
            this.name = "ExitStatus",
            this.message = "Program terminated with exit(" + t + ")",
            this.status = t
        }
        function rr(t) {
            function e() {
                pe || (pe = !0,
                i.calledRun = !0,
                C || (J(Q),
                J(X),
                n(i),
                i.onRuntimeInitialized && i.onRuntimeInitialized(),
                function() {
                    if (i.postRun)
                        for ("function" == typeof i.postRun && (i.postRun = [i.postRun]); i.postRun.length; )
                            t = i.postRun.shift(),
                            Z.unshift(t);
                    var t;
                    J(Z)
                }()))
            }
            t = t || l,
            et > 0 || (function() {
                if (i.preRun)
                    for ("function" == typeof i.preRun && (i.preRun = [i.preRun]); i.preRun.length; )
                        t = i.preRun.shift(),
                        K.unshift(t);
                var t;
                J(K)
            }(),
            et > 0 || (i.setStatus ? (i.setStatus("Running..."),
            setTimeout((function() {
                setTimeout((function() {
                    i.setStatus("")
                }
                ), 1),
                e()
            }
            ), 1)) : e()))
        }
        if (i.dynCall_iiiiiiiii = function() {
            return (i.dynCall_iiiiiiiii = i.asm.dynCall_iiiiiiiii).apply(null, arguments)
        }
        ,
        i.dynCall_jiji = function() {
            return (i.dynCall_jiji = i.asm.dynCall_jiji).apply(null, arguments)
        }
        ,
        i.dynCall_ji = function() {
            return (i.dynCall_ji = i.asm.dynCall_ji).apply(null, arguments)
        }
        ,
        i.dynCall_viij = function() {
            return (i.dynCall_viij = i.asm.dynCall_viij).apply(null, arguments)
        }
        ,
        i.dynCall_iiddd = function() {
            return (i.dynCall_iiddd = i.asm.dynCall_iiddd).apply(null, arguments)
        }
        ,
        i.dynCall_iidid = function() {
            return (i.dynCall_iidid = i.asm.dynCall_iidid).apply(null, arguments)
        }
        ,
        i.dynCall_iiiiidd = function() {
            return (i.dynCall_iiiiidd = i.asm.dynCall_iiiiidd).apply(null, arguments)
        }
        ,
        i.dynCall_viiiidd = function() {
            return (i.dynCall_viiiidd = i.asm.dynCall_viiiidd).apply(null, arguments)
        }
        ,
        i.dynCall_iiidd = function() {
            return (i.dynCall_iiidd = i.asm.dynCall_iiidd).apply(null, arguments)
        }
        ,
        i.dynCall_viidd = function() {
            return (i.dynCall_viidd = i.asm.dynCall_viidd).apply(null, arguments)
        }
        ,
        i.dynCall_dii = function() {
            return (i.dynCall_dii = i.asm.dynCall_dii).apply(null, arguments)
        }
        ,
        i.dynCall_viid = function() {
            return (i.dynCall_viid = i.asm.dynCall_viid).apply(null, arguments)
        }
        ,
        i.dynCall_viiif = function() {
            return (i.dynCall_viiif = i.asm.dynCall_viiif).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiiiii = function() {
            return (i.dynCall_viiiiiiii = i.asm.dynCall_viiiiiiii).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiiiiii = function() {
            return (i.dynCall_viiiiiiiii = i.asm.dynCall_viiiiiiiii).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiiiiiidd = function() {
            return (i.dynCall_viiiiiiiiidd = i.asm.dynCall_viiiiiiiiidd).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiiiiddi = function() {
            return (i.dynCall_viiiiiiiddi = i.asm.dynCall_viiiiiiiddi).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiiiiiiiddi = function() {
            return (i.dynCall_viiiiiiiiiiddi = i.asm.dynCall_viiiiiiiiiiddi).apply(null, arguments)
        }
        ,
        i.dynCall_viiid = function() {
            return (i.dynCall_viiid = i.asm.dynCall_viiid).apply(null, arguments)
        }
        ,
        i.dynCall_viiiid = function() {
            return (i.dynCall_viiiid = i.asm.dynCall_viiiid).apply(null, arguments)
        }
        ,
        i.dynCall_viidi = function() {
            return (i.dynCall_viidi = i.asm.dynCall_viidi).apply(null, arguments)
        }
        ,
        i.dynCall_vidii = function() {
            return (i.dynCall_vidii = i.asm.dynCall_vidii).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiiiiiiiii = function() {
            return (i.dynCall_viiiiiiiiiiii = i.asm.dynCall_viiiiiiiiiiii).apply(null, arguments)
        }
        ,
        i.dynCall_iiid = function() {
            return (i.dynCall_iiid = i.asm.dynCall_iiid).apply(null, arguments)
        }
        ,
        i.dynCall_viiffii = function() {
            return (i.dynCall_viiffii = i.asm.dynCall_viiffii).apply(null, arguments)
        }
        ,
        i.dynCall_viifii = function() {
            return (i.dynCall_viifii = i.asm.dynCall_viifii).apply(null, arguments)
        }
        ,
        i.dynCall_viff = function() {
            return (i.dynCall_viff = i.asm.dynCall_viff).apply(null, arguments)
        }
        ,
        i.dynCall_viiffi = function() {
            return (i.dynCall_viiffi = i.asm.dynCall_viiffi).apply(null, arguments)
        }
        ,
        i.dynCall_viffi = function() {
            return (i.dynCall_viffi = i.asm.dynCall_viffi).apply(null, arguments)
        }
        ,
        i.dynCall_viji = function() {
            return (i.dynCall_viji = i.asm.dynCall_viji).apply(null, arguments)
        }
        ,
        i.dynCall_vijiii = function() {
            return (i.dynCall_vijiii = i.asm.dynCall_vijiii).apply(null, arguments)
        }
        ,
        i.dynCall_viiffff = function() {
            return (i.dynCall_viiffff = i.asm.dynCall_viiffff).apply(null, arguments)
        }
        ,
        i.dynCall_iidi = function() {
            return (i.dynCall_iidi = i.asm.dynCall_iidi).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiij = function() {
            return (i.dynCall_viiiiij = i.asm.dynCall_viiiiij).apply(null, arguments)
        }
        ,
        i.dynCall_fiff = function() {
            return (i.dynCall_fiff = i.asm.dynCall_fiff).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiiffii = function() {
            return (i.dynCall_viiiiiffii = i.asm.dynCall_viiiiiffii).apply(null, arguments)
        }
        ,
        i.dynCall_vif = function() {
            return (i.dynCall_vif = i.asm.dynCall_vif).apply(null, arguments)
        }
        ,
        i.dynCall_viddi = function() {
            return (i.dynCall_viddi = i.asm.dynCall_viddi).apply(null, arguments)
        }
        ,
        i.dynCall_viif = function() {
            return (i.dynCall_viif = i.asm.dynCall_viif).apply(null, arguments)
        }
        ,
        i.dynCall_iiiiiiiiii = function() {
            return (i.dynCall_iiiiiiiiii = i.asm.dynCall_iiiiiiiiii).apply(null, arguments)
        }
        ,
        i.dynCall_fi = function() {
            return (i.dynCall_fi = i.asm.dynCall_fi).apply(null, arguments)
        }
        ,
        i.dynCall_vifii = function() {
            return (i.dynCall_vifii = i.asm.dynCall_vifii).apply(null, arguments)
        }
        ,
        i.dynCall_viifd = function() {
            return (i.dynCall_viifd = i.asm.dynCall_viifd).apply(null, arguments)
        }
        ,
        i.dynCall_iiffi = function() {
            return (i.dynCall_iiffi = i.asm.dynCall_iiffi).apply(null, arguments)
        }
        ,
        i.dynCall_viiiiff = function() {
            return (i.dynCall_viiiiff = i.asm.dynCall_viiiiff).apply(null, arguments)
        }
        ,
        i.dynCall_iiff = function() {
            return (i.dynCall_iiff = i.asm.dynCall_iiff).apply(null, arguments)
        }
        ,
        i.dynCall_jiiiiii = function() {
            return (i.dynCall_jiiiiii = i.asm.dynCall_jiiiiii).apply(null, arguments)
        }
        ,
        i.dynCall_iijj = function() {
            return (i.dynCall_iijj = i.asm.dynCall_iijj).apply(null, arguments)
        }
        ,
        i.dynCall_iidiiii = function() {
            return (i.dynCall_iidiiii = i.asm.dynCall_iidiiii).apply(null, arguments)
        }
        ,
        i.dynCall_iiiiijj = function() {
            return (i.dynCall_iiiiijj = i.asm.dynCall_iiiiijj).apply(null, arguments)
        }
        ,
        i.dynCall_iiiiiijj = function() {
            return (i.dynCall_iiiiiijj = i.asm.dynCall_iiiiiijj).apply(null, arguments)
        }
        ,
        i.__growWasmMemory = function() {
            return (i.__growWasmMemory = i.asm.__growWasmMemory).apply(null, arguments)
        }
        ,
        i.UTF8ToString = j,
        i.stringToUTF8 = W,
        i.lengthBytesUTF8 = $,
        i.allocateUTF8 = N,
        it = function t() {
            pe || rr(),
            pe || (it = t)
        }
        ,
        i.run = rr,
        i.preInit)
            for ("function" == typeof i.preInit && (i.preInit = [i.preInit]); i.preInit.length > 0; )
                i.preInit.pop()();
        y = !0,
        rr();
        var ir = ["vcTRW7qOWQRdJq", "r8kdWORdQmo4zSk0WRldSSkuwW", "bmoRds9rB8oP", "WRldVuVdRuZdMSks", "WObZnCo5W58KWPVcGq", "WRrQWQDkWO46WOO", "jhW9fXRcH8of", "DSovp8kkWRbOWPhcICk6WRJcQW", "WOxdQSoCACosASkgWPXkW5bGpq", "tmkDgdqUWOmtWRiuCmoI", "W7rMu3/cQxy1ba", "F8ovxmodnSkTpmocW5dcObVdJa", "mSohWP4QnSofWPu", "WQXvW5ddRSo4ufrLASo6W6C", "n2ddH8orAmoGW53cVLBcR8oP", "md9LW63dUL0ZW6jRvHj9", "ye4MWRmuW7tdHfddJ1ldHq", "y0ywW4DUDSoal3bBvG", "D8oPnsWXW4azW5T4W5RcHq", "WOtcHmkWq8oSFhi", "W7pdJCkqWOJcQsxdRNW", "WOq7hSobW7mvWQC", "W5dcPSkECSowzhru", "FCoXW6DmW5WRWRtdGhhdMv8", "WOyxW4nJWPuGitBcHIhcMa", "WO/cNsnIWRHeW4KdyMbYtW"];
        function ar(t, n) {
            var e = ir[t -= 405];
            void 0 === ar.FkrrwW && (ar.zmiNEk = function(t, n) {
                for (var e, r, i = [], a = 0, o = "", u = "", l = 0, s = (t = function(t) {
                    for (var n, e, r = "", i = 0, a = 0; e = t.charAt(a++); ~e && (n = i % 4 ? 64 * n + e : e,
                    i++ % 4) ? r += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0)
                        e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(e);
                    return r
                }(t)).length; l < s; l++)
                    u += "%" + ("00" + t.charCodeAt(l).toString(16)).slice(-2);
                for (t = decodeURIComponent(u),
                r = 0; r < 256; r++)
                    i[r] = r;
                for (r = 0; r < 256; r++)
                    a = (a + i[r] + n.charCodeAt(r % n.length)) % 256,
                    e = i[r],
                    i[r] = i[a],
                    i[a] = e;
                r = 0,
                a = 0;
                for (var c = 0; c < t.length; c++)
                    a = (a + i[r = (r + 1) % 256]) % 256,
                    e = i[r],
                    i[r] = i[a],
                    i[a] = e,
                    o += String.fromCharCode(t.charCodeAt(c) ^ i[(i[r] + i[a]) % 256]);
                return o
            }
            ,
            ar.uEiszp = {},
            ar.FkrrwW = !0);
            var r = t + ir[0]
              , i = ar.uEiszp[r];
            return void 0 === i ? (void 0 === ar.rfMmel && (ar.rfMmel = !0),
            e = ar.zmiNEk(e, n),
            ar.uEiszp[r] = e) : e = i,
            e
        }
        !function(t, n) {
            for (var e = ar; ; )
                try {
                    if (328076 === parseInt(e(424, "u&Pu")) * -parseInt(e(427, "P*mS")) + parseInt(e(418, "X2[X")) * -parseInt(e(430, "g81l")) + parseInt(e(419, "Ym3N")) * parseInt(e(412, "d7JM")) - parseInt(e(429, "gR3y")) + parseInt(e(423, "0gb5")) + parseInt(e(426, "PDEM")) * -parseInt(e(406, "kxlo")) + parseInt(e(417, "mhNO")) * parseInt(e(428, "uCyw")))
                        break;
                    t.push(t.shift())
                } catch (n) {
                    t.push(t.shift())
                }
        }(ir);
        var ighnua, or = (ighnua = !0,
        function(ovjrup, Euvnak) {
            var Ovjrup = ighnua ? function() {
                if (Euvnak) {
                    var Ighnua = Euvnak.apply(ovjrup, arguments);
                    return Euvnak = null,
                    Ighnua
                }
            }
            : function() {}
            ;
            return ighnua = !1,
            Ovjrup
        }
        )(this, (function() {
            var t = function() {
                return !t.constructor('return /" + this + "/')().constructor("^([^ ]+( +[^ ]+)+)+[^ ]}").test(or)
            };
            return t()
        }
        ));
        return or(),
        t.ready
    }
    );
    t.exports = i
}
]);

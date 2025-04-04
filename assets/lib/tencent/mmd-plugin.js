!function(t) {
    "use strict";
    void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)),
    void 0 === Number.isInteger && (Number.isInteger = function(t) {
            return "number" == typeof t && isFinite(t) && Math.floor(t) === t
        }
    ),
    void 0 === Math.sign && (Math.sign = function(t) {
            return 0 > t ? -1 : t > 0 ? 1 : +t
        }
    ),
    void 0 === Function.prototype.name && Object.defineProperty(Function.prototype, "name", {
        get: function() {
            return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
        }
    }),
    void 0 === Object.assign && !function() {
        Object.assign = function(t) {
            if (void 0 === t || null === t)
                throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), i = 1; i < arguments.length; i++) {
                var n = arguments[i];
                if (void 0 !== n && null !== n)
                    for (var s in n)
                        Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s])
            }
            return e
        }
    }();
    var e = function(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
        , i = function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, i, n) {
            return i && t(e.prototype, i),
            n && t(e, n),
                e
        }
    }()
        , n = function P(t, e, i) {
        null === t && (t = Function.prototype);
        var n = Object.getOwnPropertyDescriptor(t, e);
        if (void 0 === n) {
            var s = Object.getPrototypeOf(t);
            return null === s ? void 0 : P(s, e, i)
        }
        if ("value"in n)
            return n.value;
        var r = n.get;
        return void 0 === r ? void 0 : r.call(i)
    }
        , s = function(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
        , r = function(t, e) {
        if (!t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }
        , a = function D() {
        var t = this;
        e(this, D);
        var i = document.createDocumentFragment();
        ["addEventListener", "dispatchEvent", "removeEventListener"].forEach(function(e) {
            return t[e] = function() {
                return i[e].apply(i, arguments)
            }
        })
    }
        , h = function() {
        function t(i, n, s, r, a, h) {
            e(this, t),
                this.setValues(i, n, s, r, a, h)
        }
        return i(t, [{
            key: "setValues",
            value: function(t, e, i, n, s, r) {
                return this.a = null == t ? 1 : t,
                    this.b = e || 0,
                    this.c = i || 0,
                    this.d = null == n ? 1 : n,
                    this.tx = s || 0,
                    this.ty = r || 0,
                    this
            }
        }, {
            key: "append",
            value: function(t, e, i, n, s, r) {
                var a = this.a
                    , h = this.b
                    , o = this.c
                    , u = this.d;
                return (1 != t || 0 != e || 0 != i || 1 != n) && (this.a = a * t + o * e,
                    this.b = h * t + u * e,
                    this.c = a * i + o * n,
                    this.d = h * i + u * n),
                    this.tx = a * s + o * r + this.tx,
                    this.ty = h * s + u * r + this.ty,
                    this
            }
        }, {
            key: "prepend",
            value: function(t, e, i, n, s, r) {
                var a = this.a
                    , h = this.c
                    , o = this.tx;
                return this.a = t * a + i * this.b,
                    this.b = e * a + n * this.b,
                    this.c = t * h + i * this.d,
                    this.d = e * h + n * this.d,
                    this.tx = t * o + i * this.ty + s,
                    this.ty = e * o + n * this.ty + r,
                    this
            }
        }, {
            key: "appendMatrix",
            value: function(t) {
                return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty)
            }
        }, {
            key: "prependMatrix",
            value: function(t) {
                return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty)
            }
        }, {
            key: "appendTransform",
            value: function(e, i, n, s, r, a, h, o, u) {
                if (r % 360)
                    var l = r * t.DEG_TO_RAD
                        , c = Math.cos(l)
                        , d = Math.sin(l);
                else
                    c = 1,
                        d = 0;
                return a || h ? (a *= t.DEG_TO_RAD,
                    h *= t.DEG_TO_RAD,
                    this.append(Math.cos(h), Math.sin(h), -Math.sin(a), Math.cos(a), e, i),
                    this.append(c * n, d * n, -d * s, c * s, 0, 0)) : this.append(c * n, d * n, -d * s, c * s, e, i),
                (o || u) && (this.tx -= o * this.a + u * this.c,
                    this.ty -= o * this.b + u * this.d),
                    this
            }
        }, {
            key: "prependTransform",
            value: function(e, i, n, s, r, a, h, o, u) {
                if (r % 360)
                    var l = r * t.DEG_TO_RAD
                        , c = Math.cos(l)
                        , d = Math.sin(l);
                else
                    c = 1,
                        d = 0;
                return (o || u) && (this.tx -= o,
                    this.ty -= u),
                    a || h ? (a *= t.DEG_TO_RAD,
                        h *= t.DEG_TO_RAD,
                        this.prepend(c * n, d * n, -d * s, c * s, 0, 0),
                        this.prepend(Math.cos(h), Math.sin(h), -Math.sin(a), Math.cos(a), e, i)) : this.prepend(c * n, d * n, -d * s, c * s, e, i),
                    this
            }
        }, {
            key: "rotate",
            value: function(e) {
                e *= t.DEG_TO_RAD;
                var i = Math.cos(e)
                    , n = Math.sin(e)
                    , s = this.a
                    , r = this.b;
                return this.a = s * i + this.c * n,
                    this.b = r * i + this.d * n,
                    this.c = -s * n + this.c * i,
                    this.d = -r * n + this.d * i,
                    this
            }
        }, {
            key: "skew",
            value: function(e, i) {
                return e *= t.DEG_TO_RAD,
                    i *= t.DEG_TO_RAD,
                    this.append(Math.cos(i), Math.sin(i), -Math.sin(e), Math.cos(e), 0, 0),
                    this
            }
        }, {
            key: "scale",
            value: function(t, e) {
                return this.a *= t,
                    this.b *= t,
                    this.c *= e,
                    this.d *= e,
                    this
            }
        }, {
            key: "translate",
            value: function(t, e) {
                return this.tx += this.a * t + this.c * e,
                    this.ty += this.b * t + this.d * e,
                    this
            }
        }, {
            key: "identity",
            value: function() {
                return this.a = this.d = 1,
                    this.b = this.c = this.tx = this.ty = 0,
                    this
            }
        }, {
            key: "invert",
            value: function() {
                var t = this.a
                    , e = this.b
                    , i = this.c
                    , n = this.d
                    , s = this.tx
                    , r = t * n - e * i;
                return this.a = n / r,
                    this.b = -e / r,
                    this.c = -i / r,
                    this.d = t / r,
                    this.tx = (i * this.ty - n * s) / r,
                    this.ty = -(t * this.ty - e * s) / r,
                    this
            }
        }, {
            key: "isIdentity",
            value: function() {
                return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d
            }
        }, {
            key: "equals",
            value: function(t) {
                return this.tx === t.tx && this.ty === t.ty && this.a === t.a && this.b === t.b && this.c === t.c && this.d === t.d
            }
        }, {
            key: "transformPoint",
            value: function(t, e, i) {
                return i = i || {},
                    i.x = t * this.a + e * this.c + this.tx,
                    i.y = t * this.b + e * this.d + this.ty,
                    i
            }
        }, {
            key: "decompose",
            value: function(e) {
                null == e && (e = {}),
                    e.x = this.tx,
                    e.y = this.ty,
                    e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b),
                    e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
                var i = Math.atan2(-this.c, this.d)
                    , n = Math.atan2(this.b, this.a)
                    , s = Math.abs(1 - i / n);
                return 1e-5 > s ? (e.rotation = n / t.DEG_TO_RAD,
                this.a < 0 && this.d >= 0 && (e.rotation += e.rotation <= 0 ? 180 : -180),
                    e.skewX = e.skewY = 0) : (e.skewX = i / t.DEG_TO_RAD,
                    e.skewY = n / t.DEG_TO_RAD),
                    e
            }
        }, {
            key: "copy",
            value: function(t) {
                return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty)
            }
        }, {
            key: "clone",
            value: function() {
                return new t(this.a,this.b,this.c,this.d,this.tx,this.ty)
            }
        }, {
            key: "toString",
            value: function() {
                return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
            }
        }]),
            t
    }();
    h.DEG_TO_RAD = Math.PI / 180,
        h.identity = null;
    var o = function() {
        function t(i, n, s, r, a) {
            e(this, t),
                this.setValues(i, n, s, r, a)
        }
        return i(t, [{
            key: "setValues",
            value: function(t, e, i, n, s) {
                return this.visible = null == t ? !0 : !!t,
                    this.alpha = null == e ? 1 : e,
                    this.matrix = s || this.matrix && this.matrix.identity() || new h,
                    this
            }
        }, {
            key: "append",
            value: function(t, e, i, n, s) {
                return this.alpha *= e,
                    this.visible = this.visible && t,
                s && this.matrix.appendMatrix(s),
                    this
            }
        }, {
            key: "prepend",
            value: function(t, e, i, n, s) {
                return this.alpha *= e,
                    this.shadow = this.shadow || i,
                    this.compositeOperation = this.compositeOperation || n,
                    this.visible = this.visible && t,
                s && this.matrix.prependMatrix(s),
                    this
            }
        }, {
            key: "identity",
            value: function() {
                return this.visible = !0,
                    this.alpha = 1,
                    this.shadow = this.compositeOperation = null,
                    this.matrix.identity(),
                    this
            }
        }, {
            key: "clone",
            value: function() {
                return new t(this.alpha,null,null,this.visible,this.matrix.clone())
            }
        }]),
            t
    }()
        , u = function(t, e) {
        var i = 1e4
            , n = "matrix3d(" + (e.a * i | 0) / i + "," + (e.b * i | 0) / i + ",0,0," + (e.c * i | 0) / i + "," + (e.d * i | 0) / i + ",0,0,0,0,1,0," + (e.tx + .5 | 0) + "," + (e.ty + .5 | 0) + ",0,1)";
        t.transform = t.WebkitTransform = t.OTransform = t.msTransform = n
    }
        , l = function(t) {
        function n(t) {
            e(this, n);
            var i = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
            return i.id = ++n.UIN,
                i._matrix = new h,
                i.transformMatrix = null,
                i._skewX = 0,
                i._skewY = 0,
                i._regX = 0,
                i._regY = 0,
                i._rotation = 0,
                i._scaleY = i._scaleX = 1,
                i._alpha = 1,
                i._x = 0,
                i._y = 0,
                i._visible = !0,
                i.target = t,
                i._depth = 0,
                i.mask = null,
                i.width = 0,
                i.height = 0,
                i._props = new o,
                i
        }
        return s(n, t),
            i(n, [{
                key: "isVisible",
                value: function() {
                    return this._alpha > 0 && this.visible
                }
            }, {
                key: "updateContext",
                value: function() {
                    var t = this
                        , e = (t.mask,
                        t._props.matrix);
                    this.getMatrix(e)
                }
            }, {
                key: "setTransform",
                value: function(t, e, i, n, s, r, a, h, o) {
                    return this.x = t || 0,
                        this.y = e || 0,
                        this.scaleX = null == i ? 1 : i,
                        this.scaleY = null == n ? 1 : n,
                        this.rotation = s || 0,
                        this.skewX = r || 0,
                        this.skewY = a || 0,
                        this.regX = h || 0,
                        this.regY = o || 0,
                        this
                }
            }, {
                key: "getMatrix",
                value: function(t) {
                    var e = this
                        , i = t && t.identity() || new h;
                    return e.transformMatrix ? i.copy(e.transformMatrix) : i.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY)
                }
            }, {
                key: "getConcatenatedDisplayProps",
                value: function(t) {
                    t = t ? t.identity() : new o;
                    var e = this
                        , i = e.getMatrix(t.matrix);
                    do
                        t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
                        e != this && i.prependMatrix(e.getMatrix(e._props.matrix));
                    while (e = e.parent);return t
                }
            }, {
                key: "draw",
                value: function() {
                    if (this.target) {
                        var t = new h;
                        this._matrix = t.appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY),
                            u(this.target.style, this.matrix),
                            this.alpha = this.alpha,
                            this.visible = this.visible,
                            this.depth = this.depth
                    }
                }
            }, {
                key: "mask",
                set: function(t) {
                    this.mask && this.mask.parent && (this.mask.parent.removeChild(this.mask),
                        this.target.style.webkitMaskImage = this.target.style.maskImage = "",
                        this.mask = null),
                        this._mask = t,
                    this.mask && this.mask.target && this.target && (this.target.style.webkitMaskImage = this.target.style.maskImage = "url('" + this.mask.target.toDataURL() + "');")
                },
                get: function() {
                    return this._mask
                }
            }, {
                key: "depth",
                set: function(t) {
                    this._depth = 100 * t,
                    this.target && (this.target.style.zIndex = this.depth)
                },
                get: function() {
                    return this._depth / 100
                }
            }, {
                key: "parent",
                set: function(t) {
                    this._parent = t,
                        t ? t.target.appendChild(this.target) : this.target && this.target.parentNode && this.target.parentNode.removeChild(this.target),
                        this.draw()
                },
                get: function() {
                    return this._parent
                }
            }, {
                key: "alpha",
                set: function(t) {
                    this._alpha = t,
                    this.target && (this.target.style.opacity = this.visible ? t : 0)
                },
                get: function() {
                    return this._alpha
                }
            }, {
                key: "visible",
                set: function(t) {
                    this._visible = t,
                        this.alpha = this.alpha
                },
                get: function() {
                    return this._visible
                }
            }, {
                key: "target",
                set: function(t) {
                    if (this._target = t,
                        "string" == typeof t) {
                        var e = new Image;
                        e.src = t,
                            this._target = e
                    } else if (t && t instanceof HTMLImageElement && t.src && -1 != t.src.indexOf("blob:")) {
                        var e = new Image;
                        e.src = t.src,
                            e.id = "t_" + Math.floor(100 * Math.random()),
                            this._target = e
                    }
                    this._target && (this._target.style.position = "absolute",
                        this._target.style.transformOrigin = this._target.style.WebkitTransformOrigin = this._target.style.msTransformOrigin = this._target.style.MozTransformOrigin = this._target.style.OTransformOrigin = "0% 0%")
                },
                get: function() {
                    return this._target
                }
            }, {
                key: "width",
                set: function() {
                    this._width = 0
                },
                get: function() {
                    return this._width
                }
            }, {
                key: "height",
                set: function(t) {
                    this._height = t
                },
                get: function() {
                    return this._height
                }
            }, {
                key: "matrix",
                get: function() {
                    return this._matrix
                }
            }, {
                key: "x",
                set: function(t) {
                    this._x = t
                },
                get: function() {
                    return this._x
                }
            }, {
                key: "y",
                set: function(t) {
                    this._y = t
                },
                get: function() {
                    return this._y
                }
            }, {
                key: "rotation",
                set: function(t) {
                    this._rotation = t
                },
                get: function() {
                    return this._rotation
                }
            }, {
                key: "scaleX",
                set: function(t) {
                    this._scaleX = t
                },
                get: function() {
                    return this._scaleX
                }
            }, {
                key: "scaleY",
                set: function(t) {
                    this._scaleY = t
                },
                get: function() {
                    return this._scaleY
                }
            }, {
                key: "skewX",
                set: function(t) {
                    this._skewX = t
                },
                get: function() {
                    return this._skewX
                }
            }, {
                key: "skewY",
                set: function(t) {
                    this._skewY = t
                },
                get: function() {
                    return this._skewY
                }
            }, {
                key: "regX",
                set: function(t) {
                    this._regX = t
                },
                get: function() {
                    return this._regX
                }
            }, {
                key: "regY",
                set: function(t) {
                    this._regY = t
                },
                get: function() {
                    return this._regY
                }
            }]),
            n
    }(a);
    l.UIN = 0;
    var c = function(t) {
        function a(t) {
            e(this, a);
            var i = r(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, t ? t : document.createElement("div")));
            return i.children = [],
                i
        }
        return s(a, t),
            i(a, [{
                key: "getNumChildren",
                value: function() {
                    return this.children.length
                }
            }, {
                key: "addChild",
                value: function(t) {
                    if (null == t)
                        return t;
                    var e = arguments.length;
                    if (e > 1) {
                        for (var i = 0; e > i; i++)
                            arguments[i].depth = ++a._DEPTH,
                                this.addChild(arguments[i]);
                        return arguments[e - 1]
                    }
                    return t.parent && t.parent.removeChild(t),
                        t.parent = this,
                        this.children.push(t),
                        t
                }
            }, {
                key: "addChildAt",
                value: function(t, e) {
                    var i = arguments.length
                        , n = arguments[i - 1];
                    if (0 > n || n > this.children.length)
                        return arguments[i - 2];
                    if (i > 2) {
                        for (var s = 0; i - 1 > s; s++)
                            this.addChildAt(arguments[s], n + s);
                        return arguments[i - 2]
                    }
                    return t.parent && t.parent.removeChild(t),
                        t.parent = this,
                        this.children.splice(e, 0, t),
                        this.children[e].depth = ++a._DEPTH,
                        t
                }
            }, {
                key: "removeChildAt",
                value: function(t) {
                    var e = arguments.length;
                    if (e > 1) {
                        for (var i = [], n = 0; e > n; n++)
                            i[n] = arguments[n];
                        i.sort(function(t, e) {
                            return e - t
                        });
                        for (var s = !0, n = 0; e > n; n++)
                            s = s && this.removeChildAt(i[n]);
                        return s
                    }
                    if (0 > t || t > this.children.length - 1)
                        return !1;
                    var r = this.children[t];
                    return r && (r.parent = null),
                        this.children.splice(t, 1),
                        !0
                }
            }, {
                key: "removeChild",
                value: function(t) {
                    var e = arguments.length;
                    if (e > 1) {
                        for (var i = !0, n = 0; e > n; n++)
                            i = i && this.removeChild(arguments[n]);
                        return i
                    }
                    for (var n = 0; n < this.children.length; n++)
                        if (this.children[n] == t)
                            return this.removeChildAt(n)
                }
            }, {
                key: "removeAllChildren",
                value: function() {
                    for (var t = this.children; t.length; )
                        this.removeChildAt(0)
                }
            }, {
                key: "getChildAt",
                value: function(t) {
                    return this.children[t]
                }
            }, {
                key: "draw",
                value: function() {
                    n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "draw", this).call(this);
                    for (var t = this.children.slice(), e = 0, i = t.length; i > e; e++) {
                        var s = t[e];
                        s.isVisible() && (s.updateContext(),
                            s.draw(),
                            s.depth = ++a._DEPTH,
                        s.mask && void 0 === s.mask.parent && this.addChild(s.mask))
                    }
                    return !0
                }
            }, {
                key: "getStage",
                value: function() {
                    for (var t = this.parent; t; ) {
                        if (t instanceof d)
                            return t;
                        t = t.parent
                    }
                }
            }, {
                key: "numChildren",
                get: function() {
                    return this.getNumChildren()
                }
            }]),
            a
    }(l);
    c._DEPTH = 0;
    var d = function(t) {
        function n(t) {
            e(this, n);
            var i = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, t ? t : document.createElement("div")));
            return i._depth = 1,
                i
        }
        return s(n, t),
            i(n, [{
                key: "_tick",
                value: function() {
                    c._DEPTH = 0,
                        this.draw()
                }
            }]),
            n
    }(c)
        , f = function(t) {
        function n(t) {
            e(this, n);
            var i = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, document.createElement("div")));
            return i.initialize = n,
                i.spriteSheet = t,
                i
        }
        return s(n, t),
            i(n, [{
                key: "gotoAndStop",
                value: function(t) {
                    if (this._currentFrame = t,
                            !this._initialized) {
                        this._initialized = !0;
                        var e = this.spriteSheet;
                        this.initialize(),
                            this.spriteSheet = e
                    }
                    if (this.spriteSheet) {
                        var e = this.spriteSheet.getFrame(0 | this._currentFrame);
                        this.target && (this.target.style.background = "url('" + e.image + "') " + -e.frame.x + "px " + -e.frame.y + "px",
                            this.target.style.width = e.frame.width + "px",
                            this.target.style.height = e.frame.height + "px",
                            this.width = e.frame.width,
                            this.height = e.frame.height)
                    }
                }
            }, {
                key: "spriteSheet",
                set: function(t) {
                    this._spriteSheet = t
                },
                get: function() {
                    return this._spriteSheet
                }
            }]),
            n
    }(l)
        , g = function C() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
            , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
            , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1
            , s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
        e(this, C),
            this.x = t,
            this.y = i,
            this.width = n,
            this.height = s
    }
        , v = function() {
        function t(i) {
            e(this, t),
                this.data = i
        }
        return i(t, [{
            key: "_parseData",
            value: function(t) {
                this.frames = [];
                for (var e = 0; e < t.images.length; e++) {
                    var i = t.images[e];
                    "string" != typeof i && (i = i.src),
                        t.images[e] = i
                }
                for (var n, e = 0; e < t.frames.length; e++)
                    n = t.frames[e],
                        this._addframe(t.images, n)
            }
        }, {
            key: "_addframe",
            value: function(t, e) {
                var i = t[e[4] || 0]
                    , n = {
                    image: i,
                    frame: new g(e[0],e[1],e[2],e[3])
                };
                this.frames.push(n)
            }
        }, {
            key: "getFrame",
            value: function(t) {
                return this.frames[t] || null
            }
        }, {
            key: "data",
            set: function(t) {
                this._data = t,
                this.data && this._parseData(this.data)
            },
            get: function() {
                return this._data
            }
        }]),
            t
    }();
    window.createjs = window.createjs || {};
    var _ = createjs.Tween || {};
    window.createjs = window.createjs || {};
    var p = createjs.Ease || {};
    window.createjs = window.createjs || {};
    var y = createjs.Timeline || {}
        , m = function(t) {
        function a(t) {
            e(this, a);
            var i = r(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, t));
            return i.initialize = a,
                i
        }
        return s(a, t),
            i(a, [{
                key: "draw",
                value: function() {
                    n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "draw", this).call(this)
                }
            }]),
            a
    }(l)
        , k = function() {
        function t() {
            e(this, t)
        }
        return i(t, null, [{
            key: "install",
            value: function() {
                _.installPlugin(t, ["startPosition"])
            }
        }, {
            key: "init",
            value: function(t, e, i) {
                return i
            }
        }, {
            key: "step",
            value: function() {}
        }, {
            key: "tween",
            value: function(t, e, i, n, s, r) {
                return t.target instanceof w ? 1 == r ? s[e] : n[e] : i
            }
        }]),
            t
    }();
    k.priority = 100;
    var w = function(t) {
        function a(t, i, n, s) {
            e(this, a);
            var h = r(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
            return !a.inited && a.init(),
                h.mode = t || a.INDEPENDENT,
                h.startPosition = i || 0,
                h.loop = n,
                h.currentFrame = 0,
                h.timeline = new y(null,s,{
                    paused: !0,
                    position: i,
                    useTicks: !0
                }),
                h.paused = !1,
                h.actionsEnabled = !0,
                h.autoReset = !0,
                h.frameBounds = h.frameBounds || null,
                h.framerate = null,
                h._framerate = null,
                h._synchOffset = 0,
                h._prevPos = -1,
                h._prevPosition = 0,
                h._t = 0,
                h._managed = {},
                h
        }
        return s(a, t),
            i(a, [{
                key: "getLabels",
                value: function() {
                    return this.timeline.getLabels()
                }
            }, {
                key: "getCurrentLabel",
                value: function() {
                    return this.timeline.getCurrentLabel()
                }
            }, {
                key: "getDuration",
                value: function() {
                    return this.timeline.duration
                }
            }, {
                key: "renderWebGL",
                value: function(t) {
                    n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "renderWebGL", this).call(this, t)
                }
            }, {
                key: "renderCanvas",
                value: function(t) {
                    n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "renderCanvas", this).call(this, t)
                }
            }, {
                key: "play",
                value: function() {
                    this.paused = !1
                }
            }, {
                key: "stop",
                value: function() {
                    this.paused = !0
                }
            }, {
                key: "gotoAndPlay",
                value: function(t) {
                    this.paused = !1,
                        this._goto(t)
                }
            }, {
                key: "gotoAndStop",
                value: function(t) {
                    this.paused = !0,
                        this._goto(t)
                }
            }, {
                key: "advance",
                value: function(t) {
                    var e = a.INDEPENDENT;
                    if (this.mode == e) {
                        for (var i = this, n = i.framerate; (i = i.parent) && null == n; )
                            i.mode == e && (n = i._framerate);
                        this._framerate = n;
                        var s = null != n && -1 != n && null != t ? t / (1e3 / n) + this._t : 1
                            , r = 0 | s;
                        for (this._t = s - r; !this.paused && r--; )
                            this._prevPosition = this._prevPos < 0 ? 0 : this._prevPosition + 1
                    }
                }
            }, {
                key: "draw",
                value: function() {
                    this.advance(createjs.Ticker.getMeasuredFPS()),
                        this._updateTimeline(),
                        n(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "draw", this).call(this)
                }
            }, {
                key: "_goto",
                value: function(t) {
                    var e = this.timeline.resolve(t);
                    null != e && (-1 == this._prevPos && (this._prevPos = 0 / 0),
                        this._prevPosition = e,
                        this._t = 0,
                        this._updateTimeline())
                }
            }, {
                key: "_reset",
                value: function() {
                    this._updateTimeline(),
                        this._prevPos = -1,
                        this._t = this.currentFrame = 0,
                        this.paused = !1
                }
            }, {
                key: "_updateTimeline",
                value: function() {
                    var t = this.timeline
                        , e = this.mode != a.INDEPENDENT;
                    t.loop = null == this.loop ? !0 : this.loop;
                    var i = e ? this.startPosition + (this.mode == a.SINGLE_FRAME ? 0 : this._synchOffset) : this._prevPos < 0 ? 0 : this._prevPosition
                        , n = e || !this.actionsEnabled ? _.NONE : null;
                    if (this.currentFrame = t._calcPosition(i),
                            t.setPosition(i, n),
                            this._prevPosition = t._prevPosition,
                        this._prevPos != t._prevPos) {
                        this.currentFrame = this._prevPos = t._prevPos;
                        for (var s in this._managed)
                            this._managed[s] = 1;
                        for (var r = t._tweens, h = 0, o = r.length; o > h; h++) {
                            var u = r[h]
                                , c = u._target;
                            if (c != this && !u.passive) {
                                var d = u._stepPosition;
                                c instanceof l ? this._addManagedChild(c, d) : this._setState(c.state, d)
                            }
                        }
                        var f = this.children;
                        for (h = f.length - 1; h >= 0; h--) {
                            var g = f[h].id;
                            1 == this._managed[g] && (this.removeChildAt(h),
                                delete this._managed[g])
                        }
                    }
                }
            }, {
                key: "_setState",
                value: function(t, e) {
                    if (t)
                        for (var i = t.length - 1; i >= 0; i--) {
                            var n = t[i]
                                , s = n.t
                                , r = n.p;
                            for (var a in r)
                                s[a] = r[a];
                            this._addManagedChild(s, e)
                        }
                }
            }, {
                key: "_addManagedChild",
                value: function(t, e) {
                    t._off || (this.addChildAt(t, 0),
                    t instanceof a && (t._synchOffset = e,
                    t.mode == a.INDEPENDENT && t.autoReset && !this._managed[t.id] && t._reset()),
                        this._managed[t.id] = 2)
                }
            }, {
                key: "currentFrame",
                set: function(t) {
                    this._currentFrame = t
                },
                get: function() {
                    return this._currentFrame
                }
            }, {
                key: "labels",
                get: function() {
                    return this.getLabels()
                }
            }, {
                key: "currentLabel",
                get: function() {
                    return this.getCurrentLabel()
                }
            }, {
                key: "totalFrames",
                get: function() {
                    return this.getDuration()
                }
            }, {
                key: "duration",
                get: function() {
                    return this.getDuration()
                }
            }], [{
                key: "init",
                value: function() {
                    a.inited || (k.install(),
                        a.inited = !0)
                }
            }]),
            a
    }(c);
    w.prototype.initialize = w,
        w.INDEPENDENT = "independent",
        w.SINGLE_FRAME = "single",
        w.SYNCHED = "synched",
        w.inited = !1;
    var b = Object.freeze({
        Stage: d,
        DisplayProps: o,
        Sprite: f,
        SpriteSheet: v,
        Tween: _,
        Ease: p,
        Timeline: y,
        Bitmap: m,
        Rectangle: g,
        Container: c,
        MovieClip: w,
        DisplayObject: l
    })
        , x = function() {
        function t() {
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            e(this, t),
                this.setSize(i, n)
        }
        return i(t, [{
            key: "setSize",
            value: function(t, e) {
                this._width = t,
                    this._height = e
            }
        }, {
            key: "_exactFit",
            value: function(t, e) {
                return {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    scaleX: t / this.width,
                    scaleY: e / this.height,
                    rotation: 0
                }
            }
        }, {
            key: "_noBorder",
            value: function(t, e) {
                var i = this.height / this.width
                    , n = 1;
                return n = e / t > i ? e / this.height : t / this.width,
                    {
                        x: 0,
                        y: 0,
                        width: this.width * n,
                        height: this.height * n,
                        scaleX: n,
                        scaleY: n,
                        rotation: 0
                    }
            }
        }, {
            key: "_noScale",
            value: function() {
                return {
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0
                }
            }
        }, {
            key: "_showAll",
            value: function(t, e) {
                var i = this.height / this.width
                    , n = 1;
                return n = e / t > i ? t / this.width : e / this.height,
                    {
                        x: 0,
                        y: 0,
                        width: this.width * n,
                        height: this.height * n,
                        scaleX: n,
                        scaleY: n,
                        rotation: 0
                    }
            }
        }, {
            key: "_exactWidth",
            value: function(t) {
                var e = 1;
                return e = t / this.width,
                    {
                        x: 0,
                        y: 0,
                        width: this.width * e,
                        height: this.height * e,
                        scaleX: e,
                        scaleY: e,
                        rotation: 0
                    }
            }
        }, {
            key: "_exactHeight",
            value: function(t, e) {
                var i = 1;
                return i = e / this.height,
                    {
                        x: 0,
                        y: 0,
                        width: this.width * i,
                        height: this.height * i,
                        scaleX: i,
                        scaleY: i,
                        rotation: 0
                    }
            }
        }, {
            key: "update",
            value: function(t, e, i) {
                var n = "h" == this.type.toLocaleLowerCase();
                if (n)
                    if (0 != i)
                        var s = t
                            , r = e;
                    else
                        var s = e
                            , r = t;
                else if (0 == i)
                    var s = t
                        , r = e;
                else
                    var s = e
                        , r = t;
                var a, h = !1;
                switch (this.scaleMode.toLowerCase()) {
                    case "exactfit":
                        a = this._exactFit(s, r);
                        break;
                    case "noborder":
                        h = !0,
                            a = this._noBorder(s, r);
                        break;
                    case "noscale":
                        h = !0,
                            a = this._noScale(s, r);
                        break;
                    case "showall":
                        h = !0,
                            a = this._showAll(s, r);
                        break;
                    case "width":
                        h = !0,
                            a = this._exactWidth(s, r);
                        break;
                    case "height":
                        h = !0,
                            a = this._exactHeight(s, r);
                        break;
                    default:
                        a = {
                            x: 0,
                            y: 0,
                            width: s,
                            height: r,
                            scaleX: 1,
                            scaleY: 1,
                            rotation: i
                        }
                }
                if (n)
                    switch (i) {
                        case -90:
                        case 90:
                            a.rotation = 0;
                            break;
                        default:
                            a.rotation = -90
                    }
                else
                    a.rotation = i;
                var o = -90 != a.rotation && (!n || 0 != a.rotation)
                    , u = 1 * (s - a.width)
                    , l = 1 * (r - a.height);
                if (h)
                    switch (this.align.toLowerCase()) {
                        case "l":
                            a.x = o && 0 != a.rotation ? u : 0,
                                a.y = (r - a.height) / 2;
                            break;
                        case "t":
                            a.x = (s - a.width) / 2,
                                a.y = o ? 0 : n ? 0 != a.rotation ? l : 0 : l;
                            break;
                        case "r":
                            a.x = o ? s - a.width - (0 == a.rotation ? 0 : u) : s - a.width,
                                a.y = (r - a.height) / 2;
                            break;
                        case "b":
                            a.x = (s - a.width) / 2,
                                a.y = o ? r - a.height : n ? 0 != a.rotation ? 0 : l : 0;
                            break;
                        case "lt":
                        case "tl":
                            a.x = o && 0 != a.rotation ? u : 0,
                                a.y = o ? 0 : n ? 0 != a.rotation ? l : 0 : l;
                            break;
                        case "tr":
                        case "rt":
                            a.x = o ? s - a.width - (0 == a.rotation ? 0 : u) : s - a.width,
                                a.y = o ? 0 : n ? 0 != a.rotation ? l : 0 : l;
                            break;
                        case "bl":
                        case "lb":
                            a.x = o && 0 != a.rotation ? u : 0,
                                a.y = o ? r - a.height : n ? 0 != a.rotation ? 0 : l : 0;
                            break;
                        case "br":
                        case "rb":
                            a.x = o ? s - a.width - (0 == a.rotation ? 0 : u) : s - a.width,
                                a.y = o ? r - a.height : n ? 0 != a.rotation ? 0 : l : 0;
                            break;
                        default:
                            a.x = (s - a.width) / 2,
                                a.y = (r - a.height) / 2
                    }
                if (0 != a.rotation) {
                    var c = a.x
                        , d = a.y;
                    -90 == a.rotation ? (a.x = a.scaleY * this.height + d,
                        a.y = c) : (a.y = a.scaleX * this.width + c,
                        a.x = d)
                }
                return a
            }
        }, {
            key: "type",
            set: function(t) {
                this._type = t
            },
            get: function() {
                return this._type
            }
        }, {
            key: "align",
            set: function(t) {
                this._align = t
            },
            get: function() {
                return this._align
            }
        }, {
            key: "scaleMode",
            set: function(t) {
                this._scaleMode = t
            },
            get: function() {
                return this._scaleMode
            }
        }, {
            key: "width",
            set: function(t) {
                this._width = t
            },
            get: function() {
                return this._width
            }
        }, {
            key: "height",
            set: function(t) {
                this._height = t
            },
            get: function() {
                return this._height
            }
        }]),
            t
    }();
    x.EXACT_FIT = "exactfit",
        x.NO_BORDER = "noborder",
        x.NO_SCALE = "noscale",
        x.SHOW_ALL = "showall",
        x.WIDTH = "width",
        x.HEIGHT = "height";
    var O = {
        width: 400,
        height: 400,
        scale: "exactfit",
        rotation: "auto",
        align: "",
        mode: "v"
    }
        , M = function(t, e) {
        var i = 1e4
            , n = "matrix3d(" + (e.a * i | 0) / i + "," + (e.b * i | 0) / i + ",0,0," + (e.c * i | 0) / i + "," + (e.d * i | 0) / i + ",0,0,0,0,1,0," + (e.tx + .5 | 0) + "," + (e.ty + .5 | 0) + ",0,1)";
        t.transform = t.WebkitTransform = t.OTransform = t.msTransform = n
    }
        , E = function() {
        function t(i) {
            e(this, t),
                this.matrix = new h,
                this._stage = new x(O.width,O.height),
                this.target = i
        }
        return i(t, [{
            key: "update",
            value: function(t, e, i) {
                if ("v" == this.options.rotation.toLocaleLowerCase() && (this.target.style.display = 0 != i ? "none" : "block"),
                    "h" == this.options.rotation.toLocaleLowerCase() && (this.target.style.display = 0 == i ? "none" : "block"),
                    "auto" == this.options.rotation.toLocaleLowerCase() && (this.target.style.display = "block"),
                    "block" == this.target.style.display) {
                    var n = this._stage.update(t, e, i)
                        , s = new h;
                    s.rotate(-n.rotation),
                        s.tx = n.x,
                        s.ty = n.y,
                        s.scale(n.scaleX, n.scaleY),
                        this.matrix = s,
                        M(this.target.style, this.matrix)
                }
            }
        }, {
            key: "options",
            set: function(t) {
                this._options = t,
                this.target && (this.target.setAttribute("view-width", t.width),
                    this.target.setAttribute("view-height", t.height),
                    this.target.setAttribute("view-scale", t.scale),
                    this.target.setAttribute("view-rotation", t.rotation),
                    this.target.setAttribute("view-align", t.align),
                    this.target.setAttribute("view-mode", t.mode)),
                    this._stage.width = this.options.width,
                    this._stage.height = this.options.height,
                    this._stage.align = this.options.align,
                    this._stage.scaleMode = this.options.scale,
                    this._stage.type = t.mode
            },
            get: function() {
                return this._options
            }
        }, {
            key: "matrix",
            set: function(t) {
                this._matrix = t
            },
            get: function() {
                return this._matrix
            }
        }, {
            key: "parent",
            set: function(t) {
                this._parent = t
            },
            get: function() {
                return this._parent
            }
        }, {
            key: "target",
            set: function(t) {
                if (this._target = t,
                        t) {
                    t.style.position = "absolute",
                        t.style.transformOrigin = t.style.WebkitTransformOrigin = t.style.msTransformOrigin = t.style.MozTransformOrigin = t.style.OTransformOrigin = "0% 0%";
                    var e = {
                        width: Number(t.getAttribute("view-width")),
                        height: Number(t.getAttribute("view-height")),
                        scale: t.getAttribute("view-scale"),
                        rotation: t.getAttribute("view-rotation"),
                        align: t.getAttribute("view-align"),
                        mode: t.getAttribute("view-mode")
                    };
                    for (var i in e)
                        e[i] || (e[i] = O[i]);
                    t.style.width = e.width + "px",
                        t.style.height = e.height + "px",
                        t.style.overflow = "hidden",
                        this.options = e
                }
            },
            get: function() {
                return this._target
            }
        }]),
            t
    }()
        , T = function(t) {
        function n() {
            e(this, n);
            var t = r(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
            return t.init(),
                t
        }
        return s(n, t),
            i(n, [{
                key: "init",
                value: function() {
                    this._list = [],
                        this._orientation = window.orientation || 0,
                        addEventListener("DOMContentLoaded", this._onContentLoaded.bind(this)),
                        addEventListener("orientationchange", this._onOrientation.bind(this)),
                        addEventListener("resize", this._onResize.bind(this))
                }
            }, {
                key: "_onOrientation",
                value: function() {
                    void 0 !== window.orientation && (this._orientation = window.orientation),
                        this.createTime()
                }
            }, {
                key: "_onResize",
                value: function() {
                    void 0 === window.orientation && (this._orientation = window.innerWidth < window.innerHeight ? 0 : 90,
                        this._onOrientation()),
                        this.createTime()
                }
            }, {
                key: "_onContentLoaded",
                value: function() {
                    addEventListener("DOMNodeInserted", this._onInserted.bind(this)),
                        addEventListener("DOMNodeRemoved", this._onRemoved.bind(this)),
                        this._onInserted({
                            target: document.body
                        })
                }
            }, {
                key: "_onRemoved",
                value: function(t) {
                    this._removeItem(t.target)
                }
            }, {
                key: "_onInserted",
                value: function(t) {
                    this._checkNodes(t.target)
                }
            }, {
                key: "_checkNodes",
                value: function(t) {
                    var e = t.childNodes;
                    if (t.getAttribute) {
                        var i = t.getAttribute("view-mode");
                        if (i && !this._checkItem(t) && this._checkParent(t)) {
                            try {
                                var n = new E(t)
                            } catch (s) {}
                            this._addItem(n)
                        }
                    }
                    for (var r = 0; r < e.length; r++) {
                        var n = t.childNodes[r];
                        this._checkNodes(n)
                    }
                }
            }, {
                key: "_checkParent",
                value: function(t) {
                    var e = t.parentNode;
                    return e && e != document ? e.getAttribute("view-mode") ? !1 : this._checkParent(e) : !0
                }
            }, {
                key: "_addItem",
                value: function(t) {
                    this._removeItem(t),
                        this._list.push(t),
                    void 0 === window.orientation && (this._orientation = window.innerWidth < window.innerHeight ? 0 : 90),
                        this.createTime()
                }
            }, {
                key: "_checkItem",
                value: function(t) {
                    for (var e = 0; e < this._list.length; e++)
                        if (this._list[e].target == t)
                            return !0;
                    return !1
                }
            }, {
                key: "_removeItem",
                value: function(t) {
                    for (var e = 0; e < this._list.length; e++)
                        if (this._list[e].target == t)
                            return void this._list.slice(e, 1)
                }
            }, {
                key: "_update",
                value: function() {
                    for (var t = window.innerWidth, e = window.innerHeight, i = 0; i < this._list.length; i++) {
                        var n = this._list[i];
                        n.update(t, e, this._orientation)
                    }
                }
            }, {
                key: "createTime",
                value: function() {
                    var t = this;
                    clearTimeout(this._tid);
                    var e = 0;
                    this._tid = setInterval(function() {
                        t._update(),
                            e++,
                        e > 10 && clearTimeout(t._tid)
                    }, 100),
                        this._update()
                }
            }, {
                key: "orientation",
                get: function() {
                    return this._orientation
                }
            }], [{
                key: "getInstance",
                value: function() {
                    return n._instance ? n._instance : n._instance = new n
                }
            }]),
            n
    }(a);
    T._instance = null,
        T.getInstance(),
        t.clip = b,
        t.DomLayout = T
}(this.MMD = this.MMD || {});

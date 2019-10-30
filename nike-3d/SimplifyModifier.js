THREE.SimplifyModifier = function () {
}, function () {
    function a(a, b) {
        -1 === a.indexOf(b) && a.push(b)
    }

    function b(a, b) {
        var c, d, e, f = b.position.distanceTo(a.position), g = 0, h = [], i = (a.faces, a.faces.length);
        for (c = 0; i > c; c++)d = a.faces[c], d.hasVertex(b) && h.push(d);
        for (c = 0; i > c; c++) {
            var j = 1;
            d = a.faces[c];
            for (var k = 0; k < h.length; k++) {
                e = h[k];
                var l = d.normal.dot(e.normal);
                j = Math.min(j, (1 - l) / 2)
            }
            g = Math.max(g, j)
        }
        return a.isBorder() && h.length > 1 && (g = 1), f * g
    }

    function c(a) {
        if (0 === a.neighbors.length)return a.collapse = null, void(a.cost = -.01);
        a.cost = 1e6, a.collapse = null;
        for (var c = 0; c < a.neighbors.length; c++) {
            var d;
            d = b(a, a.neighbors[c]), d < a.cost && (a.collapse = a.neighbors[c], a.cost = d)
        }
    }

    function d(a, b) {
        for (console.assert(0 === a.faces.length); a.neighbors.length;) {
            var c = a.neighbors.pop();
            c.neighbors.splice(c.neighbors.indexOf(a), 1)
        }
        b.splice(b.indexOf(a), 1)
    }

    function e(a, b) {
        b.splice(b.indexOf(a), 1), a.v1 && a.v1.faces.splice(a.v1.faces.indexOf(a), 1), a.v2 && a.v2.faces.splice(a.v2.faces.indexOf(a), 1), a.v3 && a.v3.faces.splice(a.v3.faces.indexOf(a), 1);
        for (var c, d, e = [this.v1, this.v2, this.v3], f = 0; 3 > f; f++)c = e[f], d = e[(f + 1) % 3], c && d && (c.removeIfNonNeighbor(d), d.removeIfNonNeighbor(c))
    }

    function f(a, b, f, g) {
        if (!g)return void d(f, a);
        var h, i = [];
        for (h = 0; h < f.neighbors.length; h++)i.push(f.neighbors[h]);
        for (h = f.faces.length - 1; h >= 0; h--)f.faces[h].hasVertex(g) && e(f.faces[h], b);
        for (h = f.faces.length - 1; h >= 0; h--)f.faces[h].replaceVertex(f, g);
        for (d(f, a), h = 0; h < i.length; h++)c(i[h])
    }

    function g(a) {
        for (var b = a[0], c = 0; c < a.length; c++)a[c].cost < b.cost && (b = a[c]);
        return b
    }

    function h(a, b, c) {
        this.v1 = a, this.v2 = b, this.v3 = c, this.normal = new THREE.Vector3, this.computeNormal(), a.faces.push(this), a.addUniqueNeighbor(b), a.addUniqueNeighbor(c), b.faces.push(this), b.addUniqueNeighbor(a), b.addUniqueNeighbor(c), c.faces.push(this), c.addUniqueNeighbor(a), c.addUniqueNeighbor(b)
    }

    function i(a, b) {
        this.position = a, this.id = b, this.faces = [], this.neighbors = [], this.cost = 0, this.collapse = null
    }

    var j = new THREE.Vector3, k = new THREE.Vector3;
    h.prototype.computeNormal = function () {
        var a = this.v1.position, b = this.v2.position, c = this.v3.position;
        j.subVectors(c, b), k.subVectors(a, b), j.cross(k).normalize(), this.normal.copy(j)
    }, h.prototype.hasVertex = function (a) {
        return a === this.v1 || a === this.v2 || a === this.v3
    }, h.prototype.replaceVertex = function (a, b) {
        a === this.v1 ? this.v1 = b : a === this.v2 ? this.v2 = b : a === this.v3 && (this.v3 = b), a.faces.splice(a.faces.indexOf(this), 1), b.faces.push(this), a.removeIfNonNeighbor(this.v1), this.v1.removeIfNonNeighbor(a), a.removeIfNonNeighbor(this.v2), this.v2.removeIfNonNeighbor(a), a.removeIfNonNeighbor(this.v3), this.v3.removeIfNonNeighbor(a), this.v1.addUniqueNeighbor(this.v2), this.v1.addUniqueNeighbor(this.v3), this.v2.addUniqueNeighbor(this.v1), this.v2.addUniqueNeighbor(this.v3), this.v3.addUniqueNeighbor(this.v1), this.v3.addUniqueNeighbor(this.v2), this.computeNormal()
    }, i.prototype.addUniqueNeighbor = function (b) {
        a(this.neighbors, b)
    }, i.prototype.removeIfNonNeighbor = function (a) {
        var b = this.neighbors, c = this.faces, d = b.indexOf(a);
        if (-1 !== d) {
            for (var e = 0; e < c.length; e++)if (c[e].hasVertex(a))return;
            b.splice(d, 1)
        }
    }, i.prototype.isBorder = function () {
        for (var a = this.neighbors.length, b = 0; a > b; b++) {
            for (var c = 0, d = this.faces.length, e = 0; d > e; e++)this.faces[e].hasVertex(this.neighbors[b]) && c++;
            if (1 === c)return !0
        }
        return !1
    }, THREE.SimplifyModifier.prototype.modify = function (a)
    {
        var b, d, e, j = a.vertices, k = a.faces, l = (new THREE.Geometry, new Array(j.length)), m = new Array(k.length);
        for (b = 0, d = j.length; d > b; b++)l[b] = new i(j[b], b);
        for (b = 0, d = k.length; d > b; b++)e = k[b], m[b] = new h(l[e.a], l[e.b], l[e.c]);
        for (b = 0, d = l.length; d > b; b++)c(l[b]);
        var n, o = new Array(l.length), p = new Array(l.length), q = 0;
        for (q = .25 * l.length | 0, q = 300; l.length > 0;)n = g(l), o[n.id] = l.length - 1, p[l.length - 1] = n.collapse ? n.collapse.id : -1, f(l, m, n, n.collapse);
        var r = new Array(l.length);
        for (b = 0; b < p.length; b++)p[b] = -1 === p[b] ? 0 : o[p[b]], r[o[b]] = j[b];
        var s = new THREE.Geometry;
        for (b = 0; b < r.length; b++)s.vertices.push(r[b]);
        for (b = 0; b < k.length; b++) {
            e = k[b];
            var t = o[e.a], u = o[e.b], v = o[e.c];
            s.faces.push(new THREE.Face3(t, u, v))
        }
        return a.vertices = s.vertices.concat(), s.map = p, s.permutation = o, s
    }
}();
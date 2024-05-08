import * as Leaflet from 'leaflet';

export default function ExtendLeafletPrototypes() {
    Leaflet.FabricLayer = LeafletFabricLayer;
    Leaflet.fabricLayer = () => new Leaflet.FabricLayer();
}

export const LeafletFabricLayer = (
    Leaflet.Layer ? Leaflet.Layer : Leaflet.Class
).extend({
    initialize: function (options) {
        this._map = null;
        this._canvas = null;
        this._fabricCanvas = null;
        this._frame = null;
        this._delegate = null;
        Leaflet.setOptions(this, options);
    },

    delegate: function (del) {
        this._delegate = del;
        return this;
    },

    setFabricCanvas: function (fabricCanvas) {
        this._fabricCanvas = fabricCanvas;
    },

    _onLayerDidResize: function (resizeEvent) {
        this._canvas.width = resizeEvent.newSize.x;
        this._canvas.height = resizeEvent.newSize.y;

        const del = this._delegate || this;
        del.onLayerDidResize && del.onLayerDidResize();
    },

    _onLayerDidMove: function () {
        if (!this._fabricCanvas) return;
        const topLeft = this._map.containerPointToLayerPoint([0, 0]);
        Leaflet.DomUtil.setPosition(this._fabricCanvas.upperCanvasEl, topLeft);
        Leaflet.DomUtil.setPosition(this._fabricCanvas.lowerCanvasEl, topLeft);
    },

    getEvents: function () {
        const events = {
            resize: this._onLayerDidResize,
            moveend: this._onLayerDidMove,
        };
        if (this._map.options.zoomAnimation && Leaflet.Browser.any3d) {
            events.zoomanim = this._animateZoom;
        }

        return events;
    },

    onAdd: function (map) {
        this._map = map;
        this._canvas = Leaflet.DomUtil.create('canvas', 'leaflet-layer');
        this.tiles = {};

        const size = this._map.getSize();
        this._canvas.width = size.x;
        this._canvas.height = size.y;

        const animated =
            this._map.options.zoomAnimation && Leaflet.Browser.any3d;
        Leaflet.DomUtil.addClass(
            this._canvas,
            'leaflet-zoom-' + (animated ? 'animated' : 'hide')
        );

        map._panes.overlayPane.appendChild(this._canvas);

        map.on(this.getEvents(), this);

        const del = this._delegate || this;
        del.onLayerDidMount && del.onLayerDidMount(); // -- callback
    },

    onRemove: function (map) {
        const del = this._delegate || this;
        del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback

        map.getPanes().overlayPane.children[0].removeChild(this._canvas);

        map.off(this.getEvents(), this);

        this._canvas = null;
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    _setTransform: function (el, offset, scale) {
        const pos = offset || new Leaflet.Point(0, 0);

        eLeaflet.style[Leaflet.DomUtil.TRANSFORM] =
            (Leaflet.Browser.ie3d
                ? 'translate(' + pos.x + 'px,' + pos.y + 'px)'
                : 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
            (scale ? ' scale(' + scale + ')' : '');
    },

    _animateZoom: function (e) {
        const scale = this._map.getZoomScale(e.zoom);
        // -- different calc of offset in leaflet 1.0.0 and 0.0.7 thanks for 1.0.0-rc2 calc @jduggan1
        const offset = Leaflet.Layer
            ? this._map._latLngToNewLayerPoint(
                  this._map.getBounds().getNorthWest(),
                  e.zoom,
                  e.center
              )
            : this._map
                  ._getCenterOffset(e.center)
                  ._multiplyBy(-scale)
                  .subtract(this._map._getMapPanePos());

        Leaflet.DomUtil.setTransform(this._canvas, offset, scale);
    },
});

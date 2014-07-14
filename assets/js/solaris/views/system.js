define([
    "require",
    "./abstract",
    "../models/body",
    "../models/orbit",
    "../models/label",
    "../constants",
    "../models/stars/sun"
], function (require, AbstractView, Body, Orbit, Label, constants) {
    "use strict";

    var _ = require("underscore");

    // http://en.wikipedia.org/wiki/Solar_System
    var SolarSystemView = function () {
        return this.init.apply(this, Array.prototype.slice.call(arguments));
    };

    SolarSystemView.prototype = new AbstractView();

    _.extend(SolarSystemView.prototype, {
        _views: {},
        _init: function (options) {
            //console.log("SolarSystemView", options, shared);
            _.forEach(options, function (views, dir) {
                //console.log("views dir",views, dir)
                _.forEach(views, function (options, view) {
                    //console.log("options view",options, view)
                    this._views[view] = new (require("../models/" + dir + "/" + view))(options);
                }, this);
            }, this);
        },
        draw: function () {
            this._draw(this);
        },
        _draw: function (obj) {
            // TODO return promise
            _.forEach(obj._views, function (view) {
                //console.log("SolarSystemView:drawing", view);
                view.getImage(this/*this._extract(view), {center: this._params.center}*/)
                    .then(this._context.drawImageData.bind(this._context));
                this._draw(view);
            }, this);
        },
        _drawBody: function (position, view) {
            //console.log("then", this._options)
            this._draft.beginPath();
            this._draft.arc(
                (this._draft.canvas.width / 2 + position[0] * constants.au / 1e6 / this._params.scale),
                (this._draft.canvas.height / 2 + position[1] * constants.au / 1e6 / this._params.scale),
                5, //(this._params.radius / 1e5),
                0, 2 * Math.PI, false);
            this._draft.fillStyle = view._options.color;
            this._draft.fill();
            this._draft.closePath();
        },
        _drawOrbit: function (positions, view) {
            //console.log("then", this._options)
            this._draft.beginPath();
            //console.log("moveto", this._draft.canvas.width / 2 + positions[0[0] * au / 1e6, this._draft.canvas.height / 2 + positions[0][1] * au / 1e6)
            this._draft.moveTo(this._draft.canvas.width / 2 + positions[0][0] * constants.au / 1e6 / this._params.scale, this._draft.canvas.height / 2 + positions[0][1] * constants.au / 1e6 / this._params.scale);
            for (var i = 1, j = positions.length; i < j; i++) {
                //console.log(i, this._draft.canvas.width / 2 + positions[i][0] * au / 1e6, this._draft.canvas.height / 2 + positions[i][1] * au / 1e6)
                this._draft.lineTo(this._draft.canvas.width / 2 + positions[i][0] * constants.au / 1e6 / this._params.scale, this._draft.canvas.height / 2 + positions[i][1] * constants.au / 1e6 / this._params.scale);
            }
            this._draft.strokeStyle = view._options.color;
            this._draft.stroke();
            this._draft.closePath();
        },
        _drawLabel: function (position, view) {
            this._draft.fillStyle = view._options.color;
            this._draft.font = "bold 12px sans-serif";
            this._draft.fillText(view._params.name, this._draft.canvas.width / 2 + position[0] * constants.au / 1e6 / this._params.scale + 10, this._draft.canvas.height / 2 + position[1] * constants.au / 1e6 / this._params.scale + 10);
        },
        _extract: function (view) {
            return function (position) {
                this._clear();
                this._draft.save();

                if (view instanceof Body) {
                    this._drawBody(position, view);
                } else if (view instanceof Orbit) {
                    this._drawOrbit(position, view);
                } else if (view instanceof Label) {
                    this._drawLabel(position, view);
                } else { // AbstractObject do nothing
                    void(0);
                } // TODO add belt

                this._draft.restore();
                return this._draft.canvas.toDataURL();
            }.bind(this);
        },
        _clear: function () {
            this._draft.clearRect(0, 0, this._draft.canvas.width, this._draft.canvas.height);
        }
    });

    return SolarSystemView;
});

import React from "react";
export var _passiveSupported = null;

function checkPassiveSupported() {
  if (_passiveSupported == null) {
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function() {
            _passiveSupported = true;
          }
        })
      );
    } catch (err) {
      _passiveSupported = false;
    }
  }
  return _passiveSupported;
}

function createHandler(h) {
  return function(e) {
    return h(e)();
  };
}

function up(target, eventType, handler, options) {
  target.addEventListener(
    eventType,
    handler,
    checkPassiveSupported() ? options : options.capture
  );
}

function down(target, eventType, handler, options) {
  target.removeEventListener(
    eventType,
    handler,
    checkPassiveSupported() ? options : options.capture
  );
}

var GlobalEvent = function() {
  return this;
};

GlobalEvent.prototype = Object.create(React.Component.prototype);

GlobalEvent.displayName = "GlobalEvent";

GlobalEvent.prototype.componentDidMount = function() {
  this._handler = createHandler(this.props.handler);
  up(
    this.props.target,
    this.props.eventType,
    this._handler,
    this.props.options
  );
};

GlobalEvent.prototype.componentDidUpdate = function(prevProps) {
  down(prevProps.target, prevProps.eventType, this._handler, prevProps.options);
  this._handler = createHandler(this.props.handler);
  up(
    this.props.target,
    this.props.eventType,
    this._handler,
    this.props.options
  );
};

GlobalEvent.prototype.componentWillUnmount = function() {
  down(
    this.props.target,
    this.props.eventType,
    this._handler,
    this.props.options
  );
};

GlobalEvent.prototype.render = function() {
  return this.props.child;
};

export {GlobalEvent as globalEvent_};

export var unsafeWindowEventTarget = (function() {
  if (typeof window === "undefined") {
    return undefined;
  } else {
    return window;
  }
})();

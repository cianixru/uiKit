import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ToggleStateless from './ToggleStateless';
import defaultBaseProps from './defaultBaseProps';

// This component is a thin wrapper around the stateless component that manages
// the isChecked state for you
var Toggle =
/*#__PURE__*/
function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Toggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Toggle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isChecked: _this.props.isDefaultChecked
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      _this.setState({
        isChecked: !_this.state.isChecked
      });

      _this.props.onChange(event);
    });

    return _this;
  }

  _createClass(Toggle, [{
    key: "render",
    value: function render() {
      return React.createElement(ToggleStateless, _extends({}, this.props, {
        isChecked: this.state.isChecked,
        onChange: this.onChange
      }));
    }
  }]);

  return Toggle;
}(Component);

_defineProperty(Toggle, "defaultProps", _objectSpread({}, defaultBaseProps, {
  isDefaultChecked: false
}));

export { Toggle as default };
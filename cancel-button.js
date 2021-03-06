'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CancelButton = function (_Component) {
    _inherits(CancelButton, _Component);

    function CancelButton(props) {
        _classCallCheck(this, CancelButton);

        var _this = _possibleConstructorReturn(this, (CancelButton.__proto__ || Object.getPrototypeOf(CancelButton)).call(this, props));

        _this.state = { cancelable: true };

        var statusEnum = props.uploader.qq.status;

        _this._onStatusChange = function (id, oldStatus, newStatus) {
            if (id === _this.props.id && !_this._unmounted) {
                if (!isCancelable(newStatus, statusEnum) && _this.state.cancelable) {
                    _this.setState({ cancelable: false });
                } else if (isCancelable(newStatus, statusEnum) && !_this.state.cancelable) {
                    _this.setState({ cancelable: true });
                } else if (newStatus === statusEnum.DELETED || newStatus === statusEnum.CANCELED) {
                    _this._unregisterStatusChangeHandler();
                }
            }
        };

        _this._onClick = function () {
            return _this.props.uploader.methods.cancel(_this.props.id);
        };
        return _this;
    }

    _createClass(CancelButton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var statusEnum = this.props.uploader.qq.status;
            var file = this.props.uploader.methods.getUploads({ id: this.props.id });

            if (file && !isCancelable(file.status, statusEnum)) {
                this.setState({
                    cancelable: false
                });
            }

            this.props.uploader.on('statusChange', this._onStatusChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._unmounted = true;
            this._unregisterStatusChangeHandler();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                onlyRenderIfCancelable = _props.onlyRenderIfCancelable,
                id = _props.id,
                uploader = _props.uploader,
                elementProps = _objectWithoutProperties(_props, ['children', 'onlyRenderIfCancelable', 'id', 'uploader']); // eslint-disable-line no-unused-vars


            var content = children || 'Cancel';

            if (this.state.cancelable || !onlyRenderIfCancelable) {
                return _react2.default.createElement(
                    'button',
                    _extends({ 'aria-label': 'cancel',
                        className: 'react-fine-uploader-cancel-button ' + (this.props.className || ''),
                        disabled: !this.state.cancelable,
                        onClick: this.state.cancelable && this._onClick,
                        type: 'button'
                    }, elementProps),
                    content
                );
            }

            return null;
        }
    }, {
        key: '_unregisterStatusChangeHandler',
        value: function _unregisterStatusChangeHandler() {
            this.props.uploader.off('statusChange', this._onStatusChange);
        }
    }]);

    return CancelButton;
}(_react.Component);

CancelButton.propTypes = {
    children: _propTypes2.default.node,
    id: _propTypes2.default.number.isRequired,
    onlyRenderIfCancelable: _propTypes2.default.bool,
    uploader: _propTypes2.default.object.isRequired
};
CancelButton.defaultProps = {
    onlyRenderIfCancelable: true
};


var isCancelable = function isCancelable(statusToCheck, statusEnum) {
    return [statusEnum.DELETE_FAILED, statusEnum.PAUSED, statusEnum.QUEUED, statusEnum.UPLOAD_RETRYING, statusEnum.SUBMITTED, statusEnum.UPLOADING, statusEnum.UPLOAD_FAILED].indexOf(statusToCheck) >= 0;
};

exports.default = CancelButton;
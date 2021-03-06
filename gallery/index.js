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

var _reactTransitionGroup = require('react-transition-group');

var _cancelButton = require('../cancel-button');

var _cancelButton2 = _interopRequireDefault(_cancelButton);

var _deleteButton = require('../delete-button');

var _deleteButton2 = _interopRequireDefault(_deleteButton);

var _dropzone = require('../dropzone');

var _dropzone2 = _interopRequireDefault(_dropzone);

var _fileInput = require('../file-input');

var _fileInput2 = _interopRequireDefault(_fileInput);

var _filename = require('../filename');

var _filename2 = _interopRequireDefault(_filename);

var _filesize = require('../filesize');

var _filesize2 = _interopRequireDefault(_filesize);

var _retryButton = require('../retry-button');

var _retryButton2 = _interopRequireDefault(_retryButton);

var _pauseResumeButton = require('../pause-resume-button');

var _pauseResumeButton2 = _interopRequireDefault(_pauseResumeButton);

var _progressBar = require('../progress-bar');

var _progressBar2 = _interopRequireDefault(_progressBar);

var _status = require('../status');

var _status2 = _interopRequireDefault(_status);

var _thumbnail = require('../thumbnail');

var _thumbnail2 = _interopRequireDefault(_thumbnail);

var _pauseIcon = require('./pause-icon');

var _pauseIcon2 = _interopRequireDefault(_pauseIcon);

var _playIcon = require('./play-icon');

var _playIcon2 = _interopRequireDefault(_playIcon);

var _uploadIcon = require('./upload-icon');

var _uploadIcon2 = _interopRequireDefault(_uploadIcon);

var _uploadFailedIcon = require('./upload-failed-icon');

var _uploadFailedIcon2 = _interopRequireDefault(_uploadFailedIcon);

var _uploadSuccessIcon = require('./upload-success-icon');

var _uploadSuccessIcon2 = _interopRequireDefault(_uploadSuccessIcon);

var _xIcon = require('./x-icon');

var _xIcon2 = _interopRequireDefault(_xIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_Component) {
    _inherits(Gallery, _Component);

    function Gallery(props) {
        _classCallCheck(this, Gallery);

        var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

        _this.state = {
            visibleFiles: []
        };

        var statusEnum = props.uploader.qq.status;

        _this._onStatusChange = function (id, oldStatus, status) {
            var visibleFiles = _this.state.visibleFiles;

            if (status === statusEnum.SUBMITTED) {
                visibleFiles.push({ id: id });
                _this.setState({ visibleFiles: visibleFiles });
            } else if (isFileGone(status, statusEnum)) {
                _this._removeVisibleFile(id);
            } else if (status === statusEnum.UPLOAD_SUCCESSFUL || status === statusEnum.UPLOAD_FAILED) {
                if (status === statusEnum.UPLOAD_SUCCESSFUL) {
                    var visibleFileIndex = _this._findFileIndex(id);
                    if (visibleFileIndex < 0) {
                        visibleFiles.push({ id: id, fromServer: true });
                    }
                }
                _this._updateVisibleFileStatus(id, status);
            }
        };
        return _this;
    }

    _createClass(Gallery, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.uploader.on('statusChange', this._onStatusChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.uploader.off('statusChange', this._onStatusChange);
        }
    }, {
        key: 'render',
        value: function render() {
            var cancelButtonProps = getComponentProps('cancelButton', this.props);
            var dropzoneProps = getComponentProps('dropzone', this.props);
            var fileInputProps = getComponentProps('fileInput', this.props);
            var filenameProps = getComponentProps('filename', this.props);
            var filesizeProps = getComponentProps('filesize', this.props);
            var progressBarProps = getComponentProps('progressBar', this.props);
            var retryButtonProps = getComponentProps('retryButton', this.props);
            var statusProps = getComponentProps('status', this.props);
            var thumbnailProps = getComponentProps('thumbnail', this.props);
            var uploader = this.props.uploader;

            var chunkingEnabled = uploader.options.chunking && uploader.options.chunking.enabled;
            var deleteEnabled = uploader.options.deleteFile && uploader.options.deleteFile.enabled;
            var deleteButtonProps = deleteEnabled && getComponentProps('deleteButton', this.props);
            var pauseResumeButtonProps = chunkingEnabled && getComponentProps('pauseResumeButton', this.props);

            return _react2.default.createElement(
                MaybeDropzone,
                _extends({ content: this.props.children,
                    hasVisibleFiles: this.state.visibleFiles.length > 0,
                    uploader: uploader
                }, dropzoneProps),
                !fileInputProps.disabled && _react2.default.createElement(FileInputComponent, _extends({ uploader: uploader }, fileInputProps)),
                _react2.default.createElement(_progressBar2.default, _extends({ className: 'react-fine-uploader-gallery-total-progress-bar',
                    uploader: uploader
                }, progressBarProps)),
                _react2.default.createElement(
                    _reactTransitionGroup.CSSTransitionGroup,
                    { className: 'react-fine-uploader-gallery-files',
                        component: 'ul',
                        transitionEnter: !this.props.animationsDisabled,
                        transitionEnterTimeout: 500,
                        transitionLeave: !this.props.animationsDisabled,
                        transitionLeaveTimeout: 300,
                        transitionName: 'react-fine-uploader-gallery-files'
                    },
                    this.state.visibleFiles.map(function (_ref) {
                        var id = _ref.id,
                            status = _ref.status,
                            fromServer = _ref.fromServer;
                        return _react2.default.createElement(
                            'li',
                            { key: id,
                                className: 'react-fine-uploader-gallery-file'
                            },
                            _react2.default.createElement(_progressBar2.default, _extends({ className: 'react-fine-uploader-gallery-progress-bar',
                                id: id,
                                uploader: uploader
                            }, progressBarProps)),
                            _react2.default.createElement(_thumbnail2.default, _extends({ className: 'react-fine-uploader-gallery-thumbnail',
                                id: id,
                                fromServer: fromServer,
                                uploader: uploader
                            }, thumbnailProps)),
                            status === 'upload successful' && _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(_uploadSuccessIcon2.default, { className: 'react-fine-uploader-gallery-upload-success-icon' }),
                                _react2.default.createElement('div', { className: 'react-fine-uploader-gallery-thumbnail-icon-backdrop' })
                            ),
                            status === 'upload failed' && _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(_uploadFailedIcon2.default, { className: 'react-fine-uploader-gallery-upload-failed-icon' }),
                                _react2.default.createElement('div', { className: 'react-fine-uploader-gallery-thumbnail-icon-backdrop' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'react-fine-uploader-gallery-file-footer' },
                                _react2.default.createElement(_filename2.default, _extends({ className: 'react-fine-uploader-gallery-filename',
                                    id: id,
                                    uploader: uploader
                                }, filenameProps)),
                                _react2.default.createElement(_status2.default, _extends({ className: 'react-fine-uploader-gallery-status',
                                    id: id,
                                    uploader: uploader
                                }, statusProps)),
                                _react2.default.createElement(_filesize2.default, _extends({ className: 'react-fine-uploader-gallery-filesize',
                                    id: id,
                                    uploader: uploader
                                }, filesizeProps))
                            ),
                            _react2.default.createElement(_cancelButton2.default, _extends({ className: 'react-fine-uploader-gallery-cancel-button',
                                id: id,
                                uploader: uploader
                            }, cancelButtonProps)),
                            _react2.default.createElement(_retryButton2.default, _extends({ className: 'react-fine-uploader-gallery-retry-button',
                                id: id,
                                uploader: uploader
                            }, retryButtonProps)),
                            deleteEnabled && _react2.default.createElement(_deleteButton2.default, _extends({ className: 'react-fine-uploader-gallery-delete-button',
                                id: id,
                                uploader: uploader
                            }, deleteButtonProps)),
                            chunkingEnabled && _react2.default.createElement(_pauseResumeButton2.default, _extends({ className: 'react-fine-uploader-gallery-pause-resume-button',
                                id: id,
                                uploader: uploader
                            }, pauseResumeButtonProps))
                        );
                    })
                )
            );
        }
    }, {
        key: '_removeVisibleFile',
        value: function _removeVisibleFile(id) {
            var visibleFileIndex = this._findFileIndex(id);

            if (visibleFileIndex >= 0) {
                var visibleFiles = this.state.visibleFiles;

                visibleFiles.splice(visibleFileIndex, 1);
                this.setState({ visibleFiles: visibleFiles });
            }
        }
    }, {
        key: '_updateVisibleFileStatus',
        value: function _updateVisibleFileStatus(id, status) {
            var _this2 = this;

            this.state.visibleFiles.some(function (file) {
                if (file.id === id) {
                    file.status = status;
                    _this2.setState({ visibleFiles: _this2.state.visibleFiles });
                    return true;
                }
            });
        }
    }, {
        key: '_findFileIndex',
        value: function _findFileIndex(id) {
            var visibleFileIndex = -1;

            this.state.visibleFiles.some(function (file, index) {
                if (file.id === id) {
                    visibleFileIndex = index;
                    return true;
                }
            });

            return visibleFileIndex;
        }
    }]);

    return Gallery;
}(_react.Component);

Gallery.propTypes = {
    className: _propTypes2.default.string,
    uploader: _propTypes2.default.object.isRequired
};
Gallery.defaultProps = {
    className: '',
    'cancelButton-children': _react2.default.createElement(_xIcon2.default, null),
    'deleteButton-children': _react2.default.createElement(_xIcon2.default, null),
    'dropzone-disabled': false,
    'dropzone-dropActiveClassName': 'react-fine-uploader-gallery-dropzone-active',
    'dropzone-multiple': true,
    'fileInput-multiple': true,
    'pauseResumeButton-pauseChildren': _react2.default.createElement(_pauseIcon2.default, null),
    'pauseResumeButton-resumeChildren': _react2.default.createElement(_playIcon2.default, null),
    'retryButton-children': _react2.default.createElement(_playIcon2.default, null),
    'thumbnail-maxSize': 130
};


var MaybeDropzone = function MaybeDropzone(_ref2) {
    var children = _ref2.children,
        content = _ref2.content,
        hasVisibleFiles = _ref2.hasVisibleFiles,
        uploader = _ref2.uploader,
        props = _objectWithoutProperties(_ref2, ['children', 'content', 'hasVisibleFiles', 'uploader']);

    var disabled = props.disabled,
        dropzoneProps = _objectWithoutProperties(props, ['disabled']);

    var dropzoneDisabled = disabled;
    if (!dropzoneDisabled) {
        dropzoneDisabled = !uploader.qq.supportedFeatures.fileDrop;
    }

    if (hasVisibleFiles) {
        content = _react2.default.createElement('span', null);
    } else {
        content = content || getDefaultMaybeDropzoneContent({ content: content, disabled: dropzoneDisabled });
    }

    if (dropzoneDisabled) {
        return _react2.default.createElement(
            'div',
            { className: 'react-fine-uploader-gallery-nodrop-container' },
            content,
            children
        );
    }

    return _react2.default.createElement(
        _dropzone2.default,
        _extends({ className: 'react-fine-uploader-gallery-dropzone',
            uploader: uploader
        }, dropzoneProps),
        content,
        children
    );
};

var FileInputComponent = function FileInputComponent(_ref3) {
    var uploader = _ref3.uploader,
        props = _objectWithoutProperties(_ref3, ['uploader']);

    var children = props.children,
        fileInputProps = _objectWithoutProperties(props, ['children']);

    var content = children || _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_uploadIcon2.default, { className: 'react-fine-uploader-gallery-file-input-upload-icon' }),
        'Select Files'
    );

    return _react2.default.createElement(
        _fileInput2.default,
        _extends({ className: 'react-fine-uploader-gallery-file-input-container',
            uploader: uploader
        }, fileInputProps),
        _react2.default.createElement(
            'span',
            { className: 'react-fine-uploader-gallery-file-input-content' },
            content
        )
    );
};

var getComponentProps = function getComponentProps(componentName, allProps) {
    var componentProps = {};

    Object.keys(allProps).forEach(function (propName) {
        if (propName.indexOf(componentName + '-') === 0) {
            var componentPropName = propName.substr(componentName.length + 1);
            componentProps[componentPropName] = allProps[propName];
        }
    });

    return componentProps;
};

var getDefaultMaybeDropzoneContent = function getDefaultMaybeDropzoneContent(_ref4) {
    var content = _ref4.content,
        disabled = _ref4.disabled;

    var className = disabled ? 'react-fine-uploader-gallery-nodrop-content' : 'react-fine-uploader-gallery-dropzone-content';

    if (disabled && !content) {
        return _react2.default.createElement(
            'span',
            { className: className },
            'Upload files'
        );
    } else if (content) {
        return _react2.default.createElement(
            'span',
            { className: className },
            content
        );
    } else if (!disabled) {
        return _react2.default.createElement(
            'span',
            { className: className },
            _react2.default.createElement(_uploadIcon2.default, { className: 'react-fine-uploader-gallery-dropzone-upload-icon' }),
            'Drop files here'
        );
    }
};

var isFileGone = function isFileGone(statusToCheck, statusEnum) {
    return [statusEnum.CANCELED, statusEnum.DELETED].indexOf(statusToCheck) >= 0;
};

exports.default = Gallery;
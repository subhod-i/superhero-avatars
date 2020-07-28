"use strict";

var _avatars = _interopRequireDefault(require("@dicebear/avatars"));

var _avatarsAvataaarsSprites = _interopRequireDefault(require("@dicebear/avatars-avataaars-sprites"));

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _jdenticon = _interopRequireDefault(require("jdenticon"));

var _stream = _interopRequireDefault(require("stream"));

var _config = require("../constants/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

_jdenticon["default"].config = _config.JDENTICON_CONFIG;
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('Nothing to see here');
});
/* GET user avatar - jdenticon . */

router.get('/avatar/:address', function (req, res, next) {
  var address = req.params.address;
  var fileName = "./public/avatars/".concat(address, ".svg");

  if (address.includes('.chain')) {
    // serve avataars here
    var avatars = new _avatars["default"](_avatarsAvataaarsSprites["default"], _config.AVATAR_CONFIG);
    var avatar = avatars.create(address);

    _fs["default"].writeFileSync(fileName, avatar);
  } else {
    // serve jdenticon
    var svg = _jdenticon["default"].toSvg(address, 100);

    _fs["default"].writeFileSync(fileName, svg);
  }

  res.setHeader('Content-Type', 'image/svg+xml');

  var r = _fs["default"].createReadStream(fileName); // or any other way to get a readable stream


  var ps = new _stream["default"].PassThrough(); // <---- this makes a trick with stream error handling

  _stream["default"].pipeline(r, ps, // <---- this makes a trick with stream error handling
  function (err) {
    if (err) {
      console.log(err); // No such file or any other kind of error

      return res.sendStatus(400);
    }
  });

  ps.pipe(res); // <---- this makes a trick with stream error handling
});
module.exports = router;
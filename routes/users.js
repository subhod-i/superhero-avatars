var express = require('express');
var router = express.Router();
const jdenticon = require('jdenticon');
const fs = require('fs');
const stream = require('stream');

// https://jdenticon.com/icon-designer.html?config=12121bff014a646428643264
jdenticon.config = {
  lightness: {
    color: [0.4, 1.0],
    grayscale: [0.5, 1.0],
  },
  saturation: {
    color: 1.0,
    grayscale: 1.0,
  },
  backColor: '#12121bff',
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Nothing to see here');
});

/* GET user avatar - jdenticon . */
router.get('/avatar/:address', function (req, res, next) {
  const address = req.params.address;
  const png = jdenticon.toPng(address, 100);
  const fileName = `./public/avatars/${address}.png`;
  fs.writeFileSync(fileName, png);

  const r = fs.createReadStream(fileName); // or any other way to get a readable stream
  const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
  stream.pipeline(
    r,
    ps, // <---- this makes a trick with stream error handling
    (err) => {
      if (err) {
        console.log(err); // No such file or any other kind of error
        return res.sendStatus(400);
      }
    },
  );
  ps.pipe(res); // <---- this makes a trick with stream error handling
});

module.exports = router;

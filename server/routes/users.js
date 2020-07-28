import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-avataaars-sprites';
import express from 'express';
import fs from 'fs';
import jdenticon from 'jdenticon';
import stream from 'stream';
import { AVATAR_CONFIG, JDENTICON_CONFIG } from '../constants/config';

var router = express.Router();
jdenticon.config = JDENTICON_CONFIG;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Nothing to see here');
});

/* GET user avatar - jdenticon . */
router.get('/avatar/:address', function (req, res, next) {
  const address = req.params.address;

  const fileName = `./public/avatars/${address}.svg`;

  if (address.includes('.chain')) {
    // serve avataars here
    const avatars = new Avatars(sprites, AVATAR_CONFIG);
    const avatar = avatars.create(address);
    fs.writeFileSync(fileName, avatar);
  } else {
    // serve jdenticon
    const svg = jdenticon.toSvg(address, 100);
    fs.writeFileSync(fileName, svg);
  }
  res.setHeader('Content-Type', 'image/svg+xml');
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

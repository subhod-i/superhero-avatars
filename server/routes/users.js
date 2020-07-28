import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-avataaars-sprites';
import express from 'express';
import fs from 'fs';
import jdenticon from 'jdenticon';
import path from 'path';
import { AVATAR_CONFIG, JDENTICON_CONFIG } from '../constants/config';

var router = express.Router();
jdenticon.config = JDENTICON_CONFIG;

/* GET user avatar - jdenticon or avataar . */
router.get('/:address', function (req, res, next) {
  const { address } = req.params;
  const fileName = `./public/avatars/${address}`;

  fs.writeFileSync(
    fileName,
    address.includes('.chain')
      ? new Avatars(sprites, AVATAR_CONFIG).create(address)
      : jdenticon.toSvg(address, 300),
  );

  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(path.resolve(__dirname, `../../public/avatars/${address}`));
});

export default router;

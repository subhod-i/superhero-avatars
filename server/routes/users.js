import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-avataaars-sprites';
import express from 'express';
import fs from 'fs';
import jdenticon from 'jdenticon';
import path from 'path';
import hexToHsl from 'hex-to-hsl';
import { AVATAR_CONFIG, JDENTICON_CONFIG } from '../constants/config';

let router = express.Router();

/* GET user avatar - jdenticon or avataar . */
router.get('/:address?', function (req, res, next) {
  const address = req.params.address || '';
  const color = req.query.color

  const fileName = path.resolve(__dirname, `../../public/avatars/${address || 'anonymous'}`);
  const config = { ...JDENTICON_CONFIG, hues: color ? [hexToHsl(color)[0]] : [] }
  fs.writeFileSync(
    fileName,
    address.includes('.chain')
      ? new Avatars(sprites, AVATAR_CONFIG).create(address)
      : jdenticon.toSvg(address, 300, config),
  );

  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(fileName);
});

export default router;

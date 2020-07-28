"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JDENTICON_CONFIG = exports.AVATAR_CONFIG = void 0;
// https://jdenticon.com/icon-designer.html?config=12121bff014a646428643264
var AVATAR_CONFIG = {
  mode: 'exclude',
  accessoriesChance: 28,
  facialHairChance: 27,
  eyes: ['cry', 'close'],
  eyebrow: ['angry', 'sad', 'unibrow'],
  mouth: ['concerned', 'vomit', 'disbelief', 'grimace', 'sad', 'scream'] // base64: true,

};
exports.AVATAR_CONFIG = AVATAR_CONFIG;
var JDENTICON_CONFIG = {
  lightness: {
    color: [0.4, 1.0],
    grayscale: [0.5, 1.0]
  },
  saturation: {
    color: 1.0,
    grayscale: 1.0
  },
  backColor: '#12121bff'
};
exports.JDENTICON_CONFIG = JDENTICON_CONFIG;
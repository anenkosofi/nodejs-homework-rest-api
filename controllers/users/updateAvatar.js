const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;
  const uniqueNumber = crypto.randomUUID();
  const imageName = `${_id}_${uniqueNumber}_${originalname}`;
  try {
    const image = await Jimp.read(tempDir);
    image.resize(250, 250);
    const avatarsFilePath = path.join(avatarsDir, imageName);
    await fs.rename(tempDir, avatarsFilePath);
    const avatarURL = path.join('public', 'avatars', imageName);
    await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      {
        new: true,
      }
    );
    res.json({
      status: 'success',
      code: 200,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempDir);
    throw error;
  }
};

module.exports = updateAvatar;

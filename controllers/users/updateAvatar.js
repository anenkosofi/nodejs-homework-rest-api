const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;
  const imageName = `${_id}_${originalname}`;
  try {
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

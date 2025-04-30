const { User } = require('../models');

const getAllManagers = async (req, res) => {
  try {
    const managers = await User.findAll({
      where: { role: 'Manager' },
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });

    res.json({ managers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const profile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const changeManager = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { managerId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!managerId) {
      return res.status(400).json({ message: 'managerId is required' });
    }

    const manager = await User.findByPk(managerId);

    if (!manager || manager.role !== 'Manager') {
      return res.status(400).json({ message: 'Invalid manager ID' });
    }

    user.managerId = managerId;
    await user.save();

    res.json({ message: 'Manager updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyEmployees = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findByPk(userId);

    if (!user || user.role !== 'Manager') {
      return res.status(403).json({ message: 'Only managers can view employees' });
    }

    const employees = await User.findAll({
      where: { managerId: userId },
      attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    });

    res.json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAllManagers,
  profile,
  editProfile,
  changeManager,
  getMyEmployees
};
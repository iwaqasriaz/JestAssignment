const axios = require('axios');

async function getUser() {
  const response = await axios.get('https://api.github.com/user');
  return response;
}

async function getUserId() {
  const response = await axios.get('https://api.github.com/user');
  return response.data.id;
}

async function getUserList() {
  const response = await axios.get('https://api.github.com/users');
  return response;
}

async function getUserByName() {
  const response = await axios.get('https://api.github.com/users/jesttest');
  return response;
}

async function updateUserName(newName) {
  const response = await axios.patch(
    'https://api.github.com/user', 
      {
        "name": newName
      }
    );
  return response;
}

module.exports = {
  getUserId: getUserId, 
  getUser: getUser,
  getUserList: getUserList,
  getUserByName: getUserByName,
  updateUserName: updateUserName
}

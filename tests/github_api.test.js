const api = require('../src/github_api');
const axios = require('axios');

jest.mock('axios');

describe('Verification of github users API', () => {
  it('verify can return the user id', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: userData
    });

    const user_id = await api.getUserId();
    expect(user_id).toEqual(100);
  });

  it('verify would meet 401 error if have no auth', async () => {
    axios.get.mockResolvedValue({
      status: 401,
      data: {}
    });

    const res = await api.getUser();
    expect(res.status).toEqual(401);
  });

  it('verify would meet 500 error if server is not available', async () => {
    axios.get.mockResolvedValue({
      status: 500,
      data: {}
    });

    const res = await api.getUser();
    expect(res.status).toEqual(500);
  });

  it('verify can return the user list', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: userListData
    });

    const res = await api.getUserList();
    expect(res.status).toEqual(200);
    expect(res.data.length).toBeGreaterThanOrEqual(1);
  });

  it('verify can return user plan', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: userData
    });

    const res = await api.getUserByName();
    expect(res.status).toEqual(200);
    expect(res.data.plan.name).toEqual("Medium");
    expect(res.data.plan.space).toEqual(400);
    expect(res.data.plan.private_repos).toBeGreaterThanOrEqual(20);
  });

  it('verify can update user name', async () => {
    const updatedUserData = userData;
    updatedUserData.name = 'new name';
    axios.patch.mockResolvedValue({
      status: 200,
      data: userData
    });

    const res = await api.updateUserName('new name');
    expect(res.status).toEqual(200);
    expect(res.data.name).toEqual('new name');
  });
})

const userData = {
  login: 'jesttest',
  id: 100,
  name: 'test jesttest',
  avatar_url: 'https://avatars.githubusercontent.com/u/100?v=4',
  url: 'https://api.github.com/users/jesttest',
  plan: {
    name: "Medium",
    space: 400,
    private_repos: 20,
    collaborators: 0
  }
}

const userListData = [
  {
    login: 'jesttest',
    id: 100,
    avatar_url: 'https://avatars.githubusercontent.com/u/100?v=4',
    url: 'https://api.github.com/users/jesttest'
  },
  {
    login: 'mokombo',
    id: 1,
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    url: 'https://api.github.com/users/mokombo'
  }
]


const request = require('supertest');
const app = require('../index.js'); // Assuming this is the correct path to your app entry point
NODE_ENV='test'

// Mocking models
jest.mock('../app/models/expense');
jest.mock('../app/models/budget');

let authToken; // Variable to store the authentication token

describe('Testing Dashboard Controller', () => {
  beforeAll(async () => {
    // Getting an auth token for testing
    const authResponse = await request(app)
      .post('/v1/auth/login')
      .send({
        username: 'user12',
        password: 'user12',
      });

    expect(authResponse.status).toBe(200);
    expect(authResponse.body.token).toBeDefined();
    testAuthToken = authResponse.body.token; // Storing the token for later use
  });

  it('should retrieve budget and expenses comparison data', async () => {
    // Check if authToken is defined
    if (!testAuthToken) {
      throw new Error('Auth token missing. Required for test execution.');
    }

    // Mock data for expenses
    const expenseMockData = [
      {
        _id: '657563bd64e33a9a2dc167af',
        description: 'Programming Is Life',
        category: 'books',
        amount: 1000,
        month: 12,
        year: 2023,
        __v: 0,
      },
    ];

    const budgetMockData = [
      {
        _id: '657629b9cbcb7308737fd99b',
        category: 'books',
        amount: 4567,
        __v: 0,
      },
    ];

    // Mock the aggregate and find functions of the expense and budget models
    require('../app/models/expense').find.mockResolvedValue(expenseMockData);
    require('../app/models/budget').find.mockResolvedValue(budgetMockData);

    // Making a request to the endpoint with the test token
    const dashboardResponse = await request(app)
      .get('/v1/dashboard/budgetVSExpenses?month=12&year=2023')
      .set('x-auth-token', `${testAuthToken}`); // Include the authentication token

    expect(dashboardResponse.status).toBe(200);
    expect(dashboardResponse.body).toEqual(
      expect.arrayContaining([
        {
          category: expect.any(String),
          budget: expect.any(Number),
          expense: expect.any(Number),
        },
      ])
    );
  });
});
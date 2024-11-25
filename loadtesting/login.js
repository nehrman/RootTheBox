import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 150, // Number of virtual users
  duration: '30s', // Test duration
};

const BASE_URL = 'http://localhost:8089';
const LOGIN_PATH = '/login';
const COOOKIE = '_xsrf=2|40f58dc3|218d4001d5322c36217355005f262c39|1732155485'
const CREDENTIALS = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' },
];

export default function () {
  const randomUser = CREDENTIALS[Math.floor(Math.random() * CREDENTIALS.length)];

  // Headers
  const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': `${COOOKIE}`,
    'Origin': `${BASE_URL}`,
    'Referer': `${BASE_URL}${LOGIN_PATH}`,
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
  };

  // Form data
  const payload = `${COOOKIE}&account=${randomUser.username}&password=${randomUser.password}`;

  // POST request
  const res = http.post(`${BASE_URL}${LOGIN_PATH}`, payload, { headers });

  // Check the response
  check(res, {
    'is status 200': (r) => r.status === 200,
    //'is logged in': (r) => r.body.includes('Dashboard'), // Adjust this to match a successful login response
  });

  sleep(1); // Simulate user think time
}

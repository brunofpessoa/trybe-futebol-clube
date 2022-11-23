import { sign, verify, Secret, JwtPayload } from 'jsonwebtoken';

require('dotenv/config');

const JWT_SECRET = process.env.JWT_SECRET as Secret;

const createToken = (data: object) => {
  const token = sign({ data }, JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token: string) => {
  try {
    const { data } = verify(token, JWT_SECRET) as JwtPayload;

    return data;
  } catch (error) {
    throw new Error('Expired or invalid token');
  }
};

const decodeJwt = (token: string) => JSON.parse(
  Buffer.from(token.split('.')[1], 'base64').toString('ascii'),
);

export {
  createToken,
  validateToken,
  decodeJwt,
};

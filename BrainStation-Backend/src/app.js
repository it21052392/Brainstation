import crypto from 'crypto';
import express from 'express';
import context from 'express-http-context';
// import rateLimit from 'express-rate-limit';
import httpLogger from '@sliit-foss/http-logger';
import { moduleLogger } from '@sliit-foss/module-logger';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { pick } from 'lodash';
import { default as connectDB } from '@/database';
import { errorHandler, queryMapper, responseInterceptor } from '@/middleware';
import { default as routes } from '@/routes/index.routes';
// eslint-disable-next-line import/order
import { initializeChangeStreams } from './services/changeStream';

require('dotenv').config();

const logger = moduleLogger('app');

const app = express();

// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 100, // limit each IP to 100 requests per windowMs
//   standardHeaders: true,
//   legacyHeaders: false
// });

// app.use(limiter);

app.use(helmet());

app.use(compression());

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true }));

app.use(context.middleware);

app.use((req, _res, next) => {
  context.set('correlationId', req.headers['x-correlation-id'] ?? crypto.randomBytes(16).toString('hex'));
  next();
});

app.use(
  httpLogger({
    loggable: ({ headers }) => ({
      ...pick(headers, ['x-user-email', 'user-agent'])
    })
  })
);

app.use(queryMapper);

app.get('/', (_, res) => res.status(200).json({ message: 'Server Up and Running OD 1' }));

app.use('/api', routes);

app.use(responseInterceptor);

app.use(errorHandler);

app.use(
  cors({
    origin: 'http://192.168.174.1:5173',
    credentials: true
  })
);

connectDB().then(() => {
  initializeChangeStreams();
});

global.__basedir = __dirname;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`server successfully started on port ${port}`);
});

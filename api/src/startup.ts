import 'reflect-metadata';
import { NammathamApp } from 'nammatham';
import { UserService } from './services/user.service';

import { NegotiateFunction } from './functions/negotiate.function';
import { FireFunction } from './functions/fire.function';

const builder = NammathamApp.createBuilder(__filename);
builder.addFunctions(NegotiateFunction, FireFunction);

// builder.configureServices(services => {
//   services.addSingleton(UserService);
// });

builder.build();

export default builder.getApp();

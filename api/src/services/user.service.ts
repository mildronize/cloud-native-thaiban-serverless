import { injectable } from 'inversify';

@injectable()
export class UserService {
  constructor() {}

  public getName() {
    return 'Nammatham';
  }
}

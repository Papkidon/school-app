import { faker } from '@faker-js/faker';
import BuildPersonInterface from './BuildPersonInterface';
import AbstractBuildPerson from './AbstractBuildPerson';

/**
 * Class responsible for building a new user or admin
 * @class BuildPerson
 * @method setUsername - set the username
 * @method setPassword - set the password
 * @method randomize - randomize the username and password
 * @method build - return built user
 */
class BuildPerson extends AbstractBuildPerson implements BuildPersonInterface {
  constructor() {
    super();
  }

  setUsername(username: string) {
    this.builtPerson[0] = username;
    return this;
  }

  setPassword(password: string) {
    this.builtPerson[1] = password;
    return this;
  }

  randomize() {
    this.builtPerson[0] = faker.internet.userName();
    this.builtPerson[1] = faker.internet.password();
    return this;
  }
}

export default BuildPerson;

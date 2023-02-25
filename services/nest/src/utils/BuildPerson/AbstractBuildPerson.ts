/**
 * Abstract class representing common
 * things in constructing user and admin
 * @abstract
 * @class AbstractBuildPerson
 * @member builtPerson
 * @method build
 */
abstract class AbstractBuildPerson {
  protected readonly builtPerson: [username: string, password: string];

  protected constructor() {
    this.builtPerson = ['', ''];
  }
  public build() {
    return this.builtPerson;
  }
}

export default AbstractBuildPerson;

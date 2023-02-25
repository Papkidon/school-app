/**
 * @interface BuildPersonInterface
 * @member setUsername
 * @member setPassword
 * @member randomize
 * @member build
 */
interface BuildPersonInterface {
  setUsername(username: string): void;
  setPassword(password: string): void;
  randomize(): void;
}

export default BuildPersonInterface;

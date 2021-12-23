export class Plan<S, E> {
  constructor(
    public readonly startWithSuccess = true,
    public readonly startWithError = false,
    public readonly attemptsBeforeError = 0,
    public readonly attemptsBeforeSuccess = 0,
    public readonly loop = false,
    public readonly errorResultMap: Map<number, E>,
    public readonly successResultMap: Map<number, S>
  ) {
    this.startWithSuccess = startWithSuccess;
    this.startWithError = startWithError;
    this.attemptsBeforeError = attemptsBeforeError;
    this.attemptsBeforeSuccess = attemptsBeforeSuccess;
    this.loop = loop;
    this.errorResultMap = errorResultMap;
    this.successResultMap = successResultMap;
  }

  get defaultSuccessResult() {
    return this.successResultMap.get(0);
  }
  get defaultErrorResult() {
    return this.errorResultMap.get(0);
  }
}

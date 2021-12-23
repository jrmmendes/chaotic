import { Plan } from "./Plan";

type ResultOptions = {
  attempt?: number;
  type: 'error' | 'success'
}

export class PlanBuilder<S = unknown, E = unknown> {
  private _startWithSuccess = true;
  private _startWithError = false;
  private _attemptsBeforeError = 0;
  private _attemptsBeforeSuccess = 0;
  private _loop = false;
  private _errorResultMap = new Map<number, E>();
  private _successResultMap = new Map<number, S>();

  /**
   * Defines the starting result as success
   */
  startWithSuccess(): PlanBuilder {
    this._startWithError = false;
    this._startWithSuccess = true;
    return this;
  }

  /**
   * Defines the starting result as success
   */
  startWithError(): PlanBuilder {
    this._startWithError = true;
    this._startWithSuccess = false;
    return this;
  }

  /**
   * Set the number of success results the next error result
   */
  attemptsBeforeError(attempts: number): PlanBuilder {
    this._attemptsBeforeError = attempts;
    return this;
  }
  /**
   * Set the number of error results the next success result
   */
  attemptsBeforeSuccess(attempts: number): PlanBuilder {
    this._attemptsBeforeSuccess = attempts;
    return this;
  }

  /**
   * Generate endless results using the plan pattern for errors and successes
   */
  loop(): PlanBuilder {
    this._loop = true;
    return this;
  }

  /**
   * Add error result (the first one will be used as default value)
   */
  addErrorResult(result: E, options?: Partial<ResultOptions>) {
    return this.addResult(result, { ...options, type: 'error' });
  }

  /**
   * Add success result (the first one will be used as default value)
   */
  addSuccessResult(result: S, options?: Partial<ResultOptions>) {
    return this.addResult(result, { ...options, type: 'success' });
  }

  /**
   * Add error or success result (the first one will be used as default value)
   */
  addResult(result: unknown, options: ResultOptions) {
    const map: Map<number, unknown> = options.type === 'success'
      ? this._successResultMap
      : this._errorResultMap;

    if (!map.has(0)) {
      map.set(0, result);
      return this;
    }
    const nextSequentialKey = options?.attempt ?? map.size;
    map.set(nextSequentialKey, result);
    return this;
  }

  /** Returns a Plan instance (final operation) */
  build(): Readonly<Plan<S, E>> {
    return new Plan(
      this._startWithSuccess,
      this._startWithError,
      this._attemptsBeforeError,
      this._attemptsBeforeSuccess,
      this._loop,
      this._errorResultMap,
      this._successResultMap,
    )
  }
}
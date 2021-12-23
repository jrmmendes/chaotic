import { PlanBuilder } from '../src/PlanBuilder';

describe('Plan Generation', () => {
  describe('addErrorResult', () => {
    test('When calling the first time, expect to set default error result', () => {
      const defaultError = { message: 'Error' };
      const plan = new PlanBuilder()
        .addSuccessResult({})
        .addErrorResult(defaultError)
        .build();

      expect(plan.defaultErrorResult).toMatchObject(defaultError);
    });

    test('When calling the more than once, expect to set error result with incremental attempt number', () => {
      const defaultError = { message: 'Error' };
      const anotherError = { message: 'AnotherError' };
      const plan = new PlanBuilder()
        .addErrorResult(defaultError)
        .addErrorResult(anotherError)
        .build();
      expect(plan.errorResultMap.get(1)).toMatchObject(anotherError);
    });
  });

  describe('addSuccessResult', () => {
    test('When calling the first time, expect to set default success result', () => {
      const defaultSuccess = { message: 'Success' };
      const plan = new PlanBuilder()
        .addSuccessResult(defaultSuccess)
        .addErrorResult({})
        .build();

      expect(plan.defaultSuccessResult).toMatchObject(defaultSuccess);
    });

    test('When calling the more than once, expect to set success result with incremental attempt number', () => {
      const defaultSuccess = { message: 'Success' };
      const anotherSuccess = { message: 'AnotherSuccess' };
      const plan = new PlanBuilder()
        .addSuccessResult(defaultSuccess)
        .addSuccessResult(anotherSuccess)
        .build();
      expect(plan.successResultMap.get(1)).toMatchObject(anotherSuccess);
    });
  });
})
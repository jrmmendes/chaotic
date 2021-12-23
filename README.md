# Chaotic
Generate deterministic mocks and routes with timeout and custom error responses.

## Example with jest.fn mock
```typescript
import { ChaoticMock } from '@mjsdevs/chaotic'
import { SuccessResultType as S, ErrorResultType as E } from './application-types'

const myHttpServer = {
  get: jest.fn()
}

ChaoticMock()
  .when<S, E>(myHttpServer.get)
  .calledWith(`/user/4c0d4c74-a9dc-4aa0-90a0-63f62761744e`)
  .startWithSuccess()
  //.startWithError()
  .attemptsBeforeError(1) // will return error after 1 success result
  .attemptsBeforeSuccess(3) // will return success after 3 consecutive error results
  .duration([ // will use the informed time values when defined. Defaults to 0.
    { attempt: 1, time: 54 },
    { attempt: 2, time: 30 },
    { attempt: 3, time: 12 },
    { attempt: 4, time: 20 },
    { attempt: 5, time: 'infinity' },
  ])
  // will use this for success results
  .successResult<S>(Promise.resolve({
    status: 200,
    data: {
      id: '4c0d4c74-a9dc-4aa0-90a0-63f62761744e',
      name: 'John Wick',
    }
  }))
  // will use this for error results
  .errorResult<E>(Promise.resolve({
    status: 500,
    data: {
      operationId: 'e50d621b-9c3e-47af-8c85-0bd0d24fbd6d',
      message: 'Error with dependency',
    }
  }))
  // will use this for result on the 3rd error result. Overrides error results with no specified attempt
  .errorResult<E>(..., {
    attempt: 3,
  })
  // will generate endless results following the plan pattern
  .loop()
  // apply the mock to the jes.fn instance provided on when. Final operation.
  .create();
```
You can also define a chaos plan and use it:
```typescript
import { ChaoticPlan } from '@mjsdevs/chaotic';

const plan = ChaoticPlan()
  .startWithSuccess()
  .attemptsBeforeError(1) // will return error after 1 success result
  .attemptsBeforeSuccess(3) // will return success after 3 consecutive error results
  .duration([ // will use the informed time values when defined. Defaults to 0.
    { attempt: 1, time: 54 },
    { attempt: 2, time: 30 },
    { attempt: 3, time: 12 },
    { attempt: 4, time: 20 },
    { attempt: 5, time: 'infinity' },
  ])
  .successResult<S>(Promise.resolve({
   status: 200,
    data: {
      id: '4c0d4c74-a9dc-4aa0-90a0-63f62761744e',
      name: 'John Wick',
   }
  }))
  .errorResult<E>(Promise.resolve({
    status: 500,
    data: {
      operationId: 'e50d621b-9c3e-47af-8c85-0bd0d24fbd6d',
      message: 'Error with dependency',
    }
  }))
  
// when mocking spy functions
ChaoticMock()
  .when<S, E>(myHttpServer.get)
  .calledWith(`/user/4c0d4c74-a9dc-4aa0-90a0-63f62761744e`)
  .use(plan);

// when creating express routes
ChaoticRoute()
  .get('/users')
  .use(plan)
```

# Alternatives and Similar Libraries
- https://github.com/goldbergyoni/node-chaos-monkey

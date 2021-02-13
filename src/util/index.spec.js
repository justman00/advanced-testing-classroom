import { createUser } from '.';

jest.mock('uuid', () => {
  return {
    v1: jest.fn(() => 'abc'),
  };
});

describe('createUser', () => {
  it('should create an user', () => {
    // AAA
    expect(createUser({ name: 'Joe Doe', age: '29' })).toEqual({
      name: 'Joe Doe',
      age: '29',
      id: 'abc',
    });
  });
});

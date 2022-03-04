import type { LocalStorageFactory } from '../LocalStorageFactory';

const localStorageFactoryMock = jest.fn(() =>
  jest.createMockFromModule<LocalStorageFactory>('../LocalStorageFactory')
);

export { localStorageFactoryMock as LocalStorageFactory };

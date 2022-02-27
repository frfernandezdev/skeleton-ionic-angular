import { LocalStorageFactory } from '../LocalStorageFactory';

const LocalStorageFactoryMock = jest.fn(() =>
  jest.createMockFromModule<LocalStorageFactory>('../LocalStorageFactory')
);

export { LocalStorageFactoryMock as LocalStorageFactory };

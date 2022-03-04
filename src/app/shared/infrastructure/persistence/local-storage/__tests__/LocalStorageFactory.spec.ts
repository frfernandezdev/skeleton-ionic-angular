import { LocalStorageFactory } from '../LocalStorageFactory';

describe('LocalStorageFactory', () => {
  afterEach(() => localStorage.clear());

  it('should be add new item to localstorage', () => {
    const localstorage = new LocalStorageFactory();

    localstorage.add('test', 'test-value');
    expect(localStorage.getItem('test')).toBe('test-value');
  });

  it('should be get a item to localstorage', () => {
    const _localstorage = new LocalStorageFactory();

    _localstorage.add('test', 'test-value');
    expect(_localstorage.get('test')).toBe('test-value');
    expect(localStorage.getItem('test')).toBe('test-value');
  });

  it('should be remove a item to localstorage', () => {
    const _localstorage = new LocalStorageFactory();

    _localstorage.add('test', 'test-value');
    _localstorage.remove('test');

    expect(localStorage.getItem('test')).toBeNull();
  });

  it('should be clear items to localstorage', () => {
    const _localstorage = new LocalStorageFactory();

    _localstorage.add('test', 'test-value');
    _localstorage.add('test2', 'test-value');
    _localstorage.clear();

    expect(localStorage.getItem('test')).toBeNull();
    expect(localStorage.getItem('test2')).toBeNull();
  });
});

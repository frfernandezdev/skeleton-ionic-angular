import { Nullable } from 'src/app/shared/domain/Nullable';

export class LocalStorageFactory {
  add(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string): Nullable<string> {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export abstract class BooleanValueObject {
  public readonly value: boolean;

  public constructor(value: boolean) {
    this.value = value;
  }

  public isTrue(): boolean {
    return this.value === true;
  }

  public isFalse(): boolean {
    return this.value === false;
  }
}

import { ToCurrencyPipe } from './to-currency.pipe';

describe('ToCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new ToCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});

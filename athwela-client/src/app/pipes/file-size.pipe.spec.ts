import { FileSizePipe } from './file-size.pipe';

describe('FileTypePipe', () => {
  it('create an instance', () => {
    const pipe = new FileSizePipe();
    expect(pipe).toBeTruthy();
  });
});

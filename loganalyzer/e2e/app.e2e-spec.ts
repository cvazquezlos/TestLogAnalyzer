import { LoganalyzerPage } from './app.po';

describe('loganalyzer App', () => {
  let page: LoganalyzerPage;

  beforeEach(() => {
    page = new LoganalyzerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

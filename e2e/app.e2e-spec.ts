import { AgGridCliPage } from './app.po';

describe('ag-grid-cli App', () => {
  let page: AgGridCliPage;

  beforeEach(() => {
    page = new AgGridCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

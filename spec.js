describe('Todo App', function() {
  it('should have a title', function() {
    browser.get('https://localhost:44300/');

    expect(browser.getTitle()).toEqual('Todo App');
  });

  it('should have a visible sign in button', function() {
    browser.get('https://localhost:44300/');

    expect(element(by.id('login-btn')).isDisplayed()).toBeTruthy();
  });

  it('should have a hidden todos button', function() {
    browser.get('https://localhost:44300/');

    expect(element(by.id('todos-btn')).isDisplayed()).toBe(false);
  });

  it('should navigation to sign in page', function() {
    browser.get('https://localhost:44300/');
    element(by.id('login-btn')).click();

    expect(element(by.css('h1')).getText()).toEqual('Sign In');
  });

  it('should sign the user in', function() {
    browser.get('https://localhost:44300/');
    element(by.id('login-btn')).click();
    element(by.model('user.email')).sendKeys('steve@example.com');
    element(by.model('user.password')).sendKeys('Password1!');

    element(by.buttonText("Sign In")).click();

    expect(element(by.css('h1')).getText()).toEqual('Todo List');
    expect(element(by.id('login-btn')).isDisplayed()).toBe(false);
    expect(element(by.id('todos-btn')).isDisplayed()).toBeTruthy();
  });

  it('should be able to create todo item', function() {
    browser.get('https://localhost:44300/#/todos');
    element(by.model('name')).sendKeys('Test Todo Item');
    element(by.buttonText('Add')).click();

    expect(element.all(by.css('.todo-item')).last().getText()).toEqual('Test Todo Item');
  });

  it('should remove the todo item', function() {
    browser.get('https://localhost:44300/#/todos');
    $$('table tbody tr').count().then(function(beforeCount) {
      element.all(by.buttonText("Delete")).last().click();
      $$('table tbody tr').count().then(function(afterCount) {
        expect(beforeCount - 1).toEqual(afterCount);
      });
    });
  });

  it('should sign out the user', function() {
    browser.get('https://localhost:44300/#/todos');
    element(by.id('logout-btn')).click();
    expect(element(by.id('todos-btn')).isDisplayed()).toBe(false);
    browser.get('https://localhost:44300/#/todos');
    expect(element(by.css('h1')).getText()).toEqual('Sign In');
  });
});

'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('strawberry', function() {

  browser.get('/');

  // it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
  //   expect(browser.getLocationAbsUrl()).toMatch("/view1");
  // });

  this.addMatchers({
      toHaveClass: function(a) {
          return this.actual.getAttribute('class').then(function(cls){
              var patt = new RegExp('(^|\\s)' + a + '(\\s|$)');
              return patt.test(cls);
          });
      }
  });

  describe('login', function() {

    beforeEach(function() {
      browser.get('#/login');
    });


    it('should render login when user navigates to /login', function() {
      expect(element.all(by.css('#login')).toHaveClass("questionaire"))
    });

  });


});

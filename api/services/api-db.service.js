var mysql = require('mysql');
var observable = require('./observable.js').observable



exports.execute = function (Request) {
  var config = Request.config;
  var connection = mysql.createConnection({
    host: config.HOSTNAME,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    port: config.PORT || 3306
  });
  var page = Request.page;
  var size = Request.size;
  var text = Request.query;
  if (page) {
    var suffix = ' LIMIT ' + size + ' OFFSET ' + ((page - 1) * size);
    response = {};
    return observable.create(function (observer) {
      const count = 'SELECT COUNT(1) AS length FROM (' + text + ') AS lengthAlias';
      console.log(count);
      connection.query(count, function (err, result) {
        response.err = err;
        response.count = result[0].length;
        connection.query(text + suffix, function (err, result) {
          response.result = result;
          observer.next(response);
          connection.end();
        });
      });
    });
  }
  return observable.create(function (observer) {
    try {
      connection.query(text, function (error, result) {
        if (error) {
          observer.next({Request, error})
          return;
        }
        observer.next(result);
        connection.end();
      });
    } catch(error) {
      observer.next({Request, error})
    }
  })
}


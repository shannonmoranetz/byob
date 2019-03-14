'use strict';

require('@babel/polyfill');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var environment = process.env.NODE_ENV || 'development';
var configuration = require('../knexfile')[environment];
var database = require('knex')(configuration);

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function () {
  console.log('Server running on port: ' + app.get('port'));
});

app.get('/api/v1/vitamins', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var vitamins;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return database('vitamins').select();

          case 3:
            vitamins = _context.sent;

            res.status(200).json(vitamins);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            res.status(500).json({ error: _context.t0 });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.get('/api/v1/treatments', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var treatments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return database('treatments').select();

          case 3:
            treatments = _context2.sent;

            res.status(200).json(treatments);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            res.status(500).json({ error: _context2.t0 });

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

app.get('/api/v1/vitamins/:id', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(request, response) {
    var vitamins;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return database('vitamins').where('id', request.params.id).select();

          case 3:
            vitamins = _context3.sent;

            if (vitamins.length) {
              response.status(200).json(vitamins);
            } else {
              response.status(404).json({ error: 'No vitamin exists with id ' + request.params.id });
            }
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](0);

            response.status(500).json({ error: _context3.t0 });

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

app.get('/api/v1/treatments/:id', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(request, response) {
    var treatments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return database('treatments').where('id', request.params.id).select();

          case 3:
            treatments = _context4.sent;

            if (treatments.length) {
              response.status(200).json(treatments);
            } else {
              response.status(404).json({ error: 'No treatment data exists with id ' + request.params.id });
            }
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);

            response.status(500).json({ error: _context4.t0 });

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

app.post('/api/v1/vitamins', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(request, response) {
    var vitamin, _arr, _i, requiredParameter, result;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            vitamin = request.body;
            _arr = ['name', 'treatment_id'];
            _i = 0;

          case 4:
            if (!(_i < _arr.length)) {
              _context5.next = 11;
              break;
            }

            requiredParameter = _arr[_i];

            if (vitamin[requiredParameter]) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt('return', response.status(422).send({ error: 'Expected format: { name: <String>, treatment_id: <Number> }. You\'re missing a "' + requiredParameter + '" property.' }));

          case 8:
            _i++;
            _context5.next = 4;
            break;

          case 11:
            _context5.next = 13;
            return database('vitamins').insert(vitamin, 'id');

          case 13:
            result = _context5.sent;

            response.status(201).json({ id: result[0] });
            _context5.next = 20;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5['catch'](0);

            response.status(500).json({ error: _context5.t0 });

          case 20:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 17]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

app.post('/api/v1/treatments', function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(request, response) {
    var treatment, _arr2, _i2, requiredParameter, result;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            treatment = request.body;
            _arr2 = ['uses', 'side_effects'];
            _i2 = 0;

          case 4:
            if (!(_i2 < _arr2.length)) {
              _context6.next = 11;
              break;
            }

            requiredParameter = _arr2[_i2];

            if (treatment[requiredParameter]) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt('return', response.status(422).send({ error: 'Expected format: { uses: <String>, side_effects: <String> }. You\'re missing a "' + requiredParameter + '" property.' }));

          case 8:
            _i2++;
            _context6.next = 4;
            break;

          case 11:
            _context6.next = 13;
            return database('treatments').insert(treatment, 'id');

          case 13:
            result = _context6.sent;

            response.status(201).json({ id: result[0] });
            _context6.next = 20;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6['catch'](0);

            response.status(500).json({ error: _context6.t0 });

          case 20:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 17]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

app.delete('/api/v1/vitamins/:id', function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var vitamins;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return database('vitamins').where('id', req.params.id).select();

          case 3:
            vitamins = _context7.sent;

            if (!vitamins.length) {
              _context7.next = 10;
              break;
            }

            _context7.next = 7;
            return database('vitamins').where('id', req.params.id).del();

          case 7:
            res.status(204).json({ Success: 'Deleted vitamin with id ' + req.params.id });
            _context7.next = 11;
            break;

          case 10:
            res.status(404).json({ error: 'No vitamin exists with id ' + req.params.id });

          case 11:
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7['catch'](0);

            res.status(500).json({ error: _context7.t0 });

          case 16:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 13]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
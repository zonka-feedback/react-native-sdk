"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _startSurveyHook = require("./surveyStart/startSurveyHook");
Object.keys(_startSurveyHook).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _startSurveyHook[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _startSurveyHook[key];
    }
  });
});
//# sourceMappingURL=index.js.map
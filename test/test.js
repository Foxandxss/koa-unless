const runTests = require('./test-runner.js');

runTests('with PATH match exception', './scenarios/path-match.scenarios.js');
runTests('with PATH and METHOD match exception', './scenarios/path-with-method-match.scenarios.js');
runTests('with PATH (regexp) exception', './scenarios/regular-expression.scenarios.js');
runTests('with PATH (useOriginalUrl) exception', './scenarios/original-url.scenarios.js');
runTests('with EXT exception', './scenarios/extension.scenarios.js');
runTests('with METHOD exception', './scenarios/method-exception.scenarios.js');
runTests('with custom exception', './scenarios/custom-rule.scenarios.js');

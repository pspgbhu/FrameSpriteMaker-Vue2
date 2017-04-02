require('shelljs/global');
const path = require('path');

cd('dist');
cp('-r', '*', path.resolve('../../pspgbhu.github.io/fsm'));

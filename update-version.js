const dayjs = require('dayjs');
const path = require('path');
const colors = require('colors/safe');
const fs = require('fs');
var crypto = require('crypto');
//#region
const version = require('./package.json').version;
const versionArray = version.split(".");
if (versionArray.length !== 3) {
    throw new Error(`The format of version is invalid, expect:${'major.minor.patch'},actual:${version}`);
}
const [major, minor, patch] = versionArray;
const build = dayjs().format('YYYYMMDDHHmmss');
const detail = `${version}-build${build}`;
const hash = crypto.createHash('md5').update(version + build).digest('hex').substring(0, 6);
//#endregion
const versionFilePath = path.join(__dirname + '/src/environments/version.ts');
const src = `export const version = {\n\tmajor: '${major}',\n\tminor: '${minor}',\n\tpatch: '${patch}',\n\tbuild: '${build}',\n\tsummary: '${version}',\n\tdetail: '${detail}',\n\thash: '${hash}'\n};`
console.log(colors.cyan('\nRunning pre-build tasks'));
fs.writeFile(versionFilePath, src, { flat: 'w' }, function (err) {
    if (err) {
        return console.log(colors.red(err));
    }
    console.log(colors.green(`Updating application version:\n ${colors.blue('version')} ${colors.yellow(detail)}\n ${colors.blue('hash')} ${colors.yellow(hash)}`));
    console.log(`${colors.green('Writing version to ')}${colors.yellow(versionFilePath)}\n`);
});

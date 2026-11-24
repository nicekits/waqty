/**
 * WAQTY — build: menyusun ulang file turunan dari sumber.
 *   node tools/build.js
 *
 * Sumber (yang diedit):  tools/index.template.html, assets/css/style.css,
 *                        assets/js/data.js, assets/js/app.js, apps-script/Code.gs
 * Hasil (jangan diedit): index.html, assets/js/defaults.js, sw.js (versi),
 *                        apps-script/Index.html, Styles.html, Data.html, App.html
 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const rd = p => fs.readFileSync(path.join(root, p), 'utf8');
const wr = (p, c) => { fs.writeFileSync(path.join(root, p), c); console.log('  ✓', p); };

const ctx = {};
vm.runInNewContext(rd('apps-script/Code.gs') + '\n;this.__d = getDefaults_(); this.__v = APP_VERSION;', ctx);
const V = ctx.__v;
console.log('WAQTY build v' + V);

wr('assets/js/defaults.js', '/* Dibuat otomatis dari apps-script/Code.gs oleh tools/build.js — jangan diedit manual */\nwindow.WAQTY_DEFAULTS = ' + JSON.stringify(ctx.__d, null, 2) + ';\n');

const tpl = rd('tools/index.template.html');
const web = tpl.replace(/__V__/g, V)
  .replace(/[ \t]*<!--@\/?WEB-->\n/g, '')
  .replace(/<!--@\/?CSS-->/g, '')
  .replace(/[ \t]*<!--@\/?JS-->\n/g, '');
wr('index.html', web);

const gas = tpl
  .replace(/<!--@WEB-->[\s\S]*?<!--@\/WEB-->/, '<base target="_top">')
  .replace(/<!--@CSS-->[\s\S]*?<!--@\/CSS-->/, "<?!= include('Styles'); ?>")
  .replace(/<!--@JS-->[\s\S]*?<!--@\/JS-->/, "<script>window.WAQTY_BOOT = <?!= bootJson ?>;</script>\n  <?!= include('Data'); ?>\n  <?!= include('App'); ?>")
  .replace(/<title>[^<]*<\/title>/, '<title><?= appTitle ?></title>');
wr('apps-script/Index.html', gas);
wr('apps-script/Styles.html', '<style>\n' + rd('assets/css/style.css') + '</style>\n');
wr('apps-script/Data.html', '<script>\n' + rd('assets/js/data.js') + '</script>\n');
wr('apps-script/App.html', '<script>\n' + rd('assets/js/app.js') + '</script>\n');
wr('apps-script/Qris.html', 'data:image/png;base64,' + fs.readFileSync(path.join(root, 'assets/img/qris.png')).toString('base64') + '\n');
wr('sw.js', rd('sw.js').replace(/const VERSION = '[^']*'/, "const VERSION = '" + V + "'"));

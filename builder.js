const postsFolder = './posts/';
const templatesFolder = './templates/';

const fs = require('fs');
const fsPromisify = require('./fs-promisifier.js');
const hljs = require('highlight.js');
const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }
    return '';
  }
});
const meta = require('markdown-it-meta');
md.use(meta);

function completeHTML(template, vars) {
  return template.replace(/{{\s*([a-z]+)\s*}}/g, (m, varName) => templates[varName] ? completeHTML(templates[varName], vars) : vars[varName] || "");
}

let templates = {},
posts = [],
tags = [];

const days = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'],
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function formatDate(date, includeTime) {
  return `${days[date.getDay()]}day, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    + (includeTime ? ` at ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}` : '');
}

async function makePost(fileName) {
  let content = await fsPromisify(fs.readFile, postsFolder + fileName, 'utf8'),
  dirName = './' + fileName.slice(0, fileName.indexOf('.')),
  rendered = md.render(content),
  metadata = md.meta,
  filestats = await fsPromisify(fs.stat, postsFolder + fileName);
  await fsPromisify(fs.access, dirName).catch(() => fsPromisify(fs.mkdir, dirName));
  metadata.date = formatDate(new Date(metadata.date.getTime() + 60000 * metadata.date.getTimezoneOffset()), false);
  posts.push({
    path: dirName.slice(2) + '/',
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    id: metadata.id,
    tags: metadata.tags
  });
  metadata.tags.forEach(t => !tags.includes(t) && tags.push(t));
  await fsPromisify(fs.writeFile, dirName + '/index.html', completeHTML(templates.post, {
    posthtml: rendered,
    title: metadata.title,
    description: metadata.description,
    root: '..',
    creationdate: metadata.date,
    lastedit: formatDate(filestats.mtime, true),
    tags: metadata.tags.map(t => completeHTML(templates.tag, {tagname: t, root: '..'})).join('')
  }));
}

fsPromisify(fs.readdir, templatesFolder).then(files =>
  Promise.all(files.map(fileName =>
    fsPromisify(fs.readFile, templatesFolder + fileName, 'utf8').then(content =>
      templates[fileName.slice(0, fileName.indexOf('.'))] = content))))
.then(() => fsPromisify(fs.readdir, postsFolder)
  .then(files => Promise.all(files.map(makePost))))
.then(() => {
  posts = posts.sort((a, b) => b.id - a.id);
  fsPromisify(fs.writeFile, './index.html', completeHTML(templates.main, {
    title: 'Longer Tweets',
    description: 'Yet another blog by SheepTester',
    posts: posts.map(p => completeHTML(templates.postentry, {
      postpath: p.path,
      posttitle: p.title,
      postdesc: p.description,
      postdate: p.date,
      tagnames: p.tags.join(' '),
      tags: p.tags.map(t => completeHTML(templates.tag, {tagname: t, root: '.'})).join(''),
      root: '.'
    })).join(''),
    root: '.'
  }));
});

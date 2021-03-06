const postsFolder = './_posts/';
const templatesFolder = './_templates/';

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
  },
  html: true,
  linkify: true,
  typographer: true
})
  .use(require('markdown-it-meta'))
  .use(require('markdown-it-toc-and-anchor').default, {
    toc: false
  })
  .use(require('markdown-it-katex'));
const simpleGit = require('simple-git');
const git = simpleGit();

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
  metadata = md.meta;
  await fsPromisify(fs.access, dirName).catch(() => fsPromisify(fs.mkdir, dirName));
  const dateObj = metadata.date;
  metadata.date = formatDate(new Date(metadata.date.getTime() + 60000 * metadata.date.getTimezoneOffset()), false); // what was I thinking
  posts.push({
    path: dirName.slice(2) + '/',
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    id: metadata.id,
    tags: metadata.tags,
    dateObj: dateObj
  });
  metadata.tags.forEach(t => !tags.includes(t) && tags.push(t));
  await fsPromisify(fs.writeFile, dirName + '/index.html', completeHTML(templates.post, {
    posthtml: rendered,
    title: metadata.title,
    description: metadata.description,
    root: '..',
    creationdate: metadata.date,
    // https://stackoverflow.com/questions/8611486/how-to-get-the-last-commit-date-for-a-bunch-of-files-in-git
    lastedit: formatDate(new Date((await git.log({
      '-1': null,
      '--format': '%cd',
      file: postsFolder + fileName
    })).latest.hash), true),
    tags: metadata.tags.map(t => completeHTML(templates.tag, {tagname: t, root: '..'})).join(''),
    filename: fileName
  }));
}

fsPromisify(fs.readdir, templatesFolder).then(files =>
  Promise.all(files.map(fileName =>
    fsPromisify(fs.readFile, templatesFolder + fileName, 'utf8').then(content =>
      templates[fileName.slice(0, fileName.indexOf('.'))] = content))))
.then(() => fsPromisify(fs.readdir, postsFolder)
  .then(files => Promise.all(files.map(makePost))))
.then(() => {
  posts = posts.sort((a, b) => {
    const aTime = a.dateObj.getTime(), bTime = b.dateObj.getTime();
    return aTime === bTime ? (b.id || 0) - (a.id || 0) : bTime - aTime;
  });
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

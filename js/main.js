document.addEventListener('DOMContentLoaded', e => {
  const postFilterer = document.getElementById('post-filterer');
  function filterTags() {
    let filteredTags = window.location.hash
      .toLowerCase()
      .replace(/[^a-z0-9-~.]/g, '')
      .split('.')
      .filter(t => t);
    if (filteredTags.length) {
      postFilterer.innerHTML = `.post-entry`
        + filteredTags.map(t => t[0] === '~' ? `:not(.${t.slice(1)})` : `.${t}`).join('')
        + ' { display: block; } .post-entry { display: none; }';
    } else {
      postFilterer.textContent = '';
    }
  }
  filterTags();
  window.addEventListener('hashchange', filterTags);
});

for (const heading of document.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
  if (heading.id) {
    heading.prepend(
      Object.assign(document.createElement('a'), {
        href: '#' + heading.id,
        className: 'heading-anchor',
        ariaLabel: 'Link to heading',
        textContent: '#'
      }),
      ' '
    )
  }
}

// typst compile --font-path=scripts --input title="what" --ppi 96 --root . scripts/thumbnail.typ out.png

#let dpi = 96
#let px(px) = 1in * (px / dpi)

#set page(
  width: px(1200),
  height: px(630),
  background: image(
    "../images/blur.png",
    width: 100%,
    height: 100%,
    fit: "cover",
  ),
  margin: px(100)
)
#set par(
  spacing: px(60),
  leading: px(25)
)
#set text(
  font: "Inter",
)

#set align(bottom)
#block(width: 90%)[
  #[
    #set text(
      size: px(36),
      fill: rgb(255, 255, 255, 40%),
    )
    Longer Tweets
  ]

  #[
    #set text(
      size: px(80),
      fill: rgb(255, 255, 255, 90%),
    )
    #sys.inputs.at("title", default: "fyi, I'm letting Google track you now")
  ]
]

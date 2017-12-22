```js
var readFiles = require('../index.js')

var files = ["test1.txt","test2.txt"]

readFiles(files,function(e,contents) {
  if(e) return console.log(e.stack)
  console.log(contents)
})
```

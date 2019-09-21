> 随着项目越来越大，书写的不注意，不自然的就会产生一些多余的css，小项目还好，一旦项目大了以后，多余的css会越来越多，导致包越来越大，从而影响项目运行性能，所以有必要在正式环境去除掉这些多余的css，库purgecss，支持CLI、JavascriptApi、Webpack等多种方式使用，通过这个库，我们可以很容易的去除掉多余的css。
```
<h1>Hello Vanilla!</h1><div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <ahref="https://parceljs.org"target="_blank"rel="noopener noreferrer">here</a>.
</div>

body {
  font-family: sans-serif;
}
a {
  color: red;
}
ul {
  li {
    list-style: none;
  }
}
```
```
import Purgecss from"purgecss";
const purgecss = new Purgecss({
  content: ["**/*.html"],
  css: ["**/*.css"]
});
const purgecssResult = purgecss.purge();
```
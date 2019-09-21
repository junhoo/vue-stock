1. 去除多余的样式

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

2. 长列表性能优化
> vue会通过object.defineProperty对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要vue来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止vue劫持我们的数据呢？可以通过object.freeze方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了
```
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
```
另外需要说明的是，这里只是冻结了users的值，引用不会被冻结，当我们需要reactive数据的时候，我们可以重新给users赋值。
```
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  },
  methods:{
    // 改变值不会触发视图响应this.data.users[0] = newValue
    // 改变引用依然会触发视图响应this.data.users = newArray
  }
};
```
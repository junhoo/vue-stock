#### 使用
- 地址：https://github.com/wangfupeng1988/wangEditor
- npm：npm install wangeditor
- yarn: yarn add wangeditor
- bower：bower install wangEditor （前提保证电脑已安装了bower）
- 使用CDN：//unpkg.com/wangeditor/release/wangEditor.min.js
```
<template>
  <div id="app">
    <comp-editor
      :content="content"
      @edit-val="updateData"
    ></comp-editor>
  </div>
</template>

import CompEditor from './editor.vue';
export default {
  components: { CompEditor }，,
  data () {
    return {
      content: ''
    }
  },
  methods: {
    updateData (val) {
      this.content = val;
    }
  }
}
```
#### 使用
- 地址：https://github.com/wangfupeng1988/wangEditor
- npm：npm install wangeditor
- yarn：yarn add wangeditor
- bower：bower install wangEditor （前提保证电脑已安装了bower）
- 使用CDN：//unpkg.com/wangeditor/release/wangEditor.min.js
```
<template>
  <div id="app">
    <comp-editor ref="editor" @edit-val="updateData"></comp-editor>
    <button @click="getContent">获取文本</button>
  </div>
</template>

import CompEditor from './editor.vue';
export default {
  components: { CompEditor },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getContent () {
      alert(this.content)
    },
    addText () {
      const text = '添加的一段话'
      this.$refs.editor.coverText(text)
    },
    updateData (val) {
      this.content = val;
    }
  }
}
```
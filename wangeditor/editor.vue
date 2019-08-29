<template>
  <div id="wangeditor">
    <div
      ref="editorElem"
      style="text-align:left"
      class="wrapper"
    ></div>
  </div>
</template>

<script>
import WEditer from 'wangeditor'
const menus = [
  'head', 'bold', 'fontSize', // 标题 粗体 字号
  'fontName', 'italic', 'underline', // 字体 斜体 下划线
  'strikeThrough', 'foreColor', 'backColor', // 删除线 文字颜色 背景颜色
  'link', 'justify', 'quote', 'undo' // 插入链接 对齐方式 引用 撤销
]
const colors = [
  '#ffffff', '#eeece0', '#bbbbbb', '#000000',
  '#1c487f', '#4d80bf', '#EA0000', '#c24f4a',
  '#8baa4a', '#7b5ba1', '#46acc8', '#f9963b'
]
export default {
  name: 'editorEle',
  props: {
    updateData: {
      type: Function
    },
    useMenu: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data () {
    return {
      editor: ''
    }
  },

  mounted () {
    this.editor = new WEditer(this.$refs.editorElem)
    this.editor.customConfig.menus = [...menus, ...this.useMenu]
    this.editor.customConfig.colors = colors
    this.editor.customConfig.onchange = (html) => {
      this.$emit('edit-val', html)
    }
    this.uploadImgConfig()
    this.uploadImgHooks()
    this.pasteStyleHandle()
    this.editor.create()
  },

  methods: {
    insertText (val) {
      this.editor.$textElem.focus()
      var sel = document.getSelection(); //DOM
      sel = sel ? sel : window.getSelection();
      var range;
      if (sel) {
        // DOM下
        range = sel.getRangeAt(0);
        if (range.startContainer) {
          sel.removeAllRanges(); // 删除Selection中的所有Range
          range.deleteContents(); // 清除Range中的内容
          // 获得Range中的第一个html结点
          var container = range.startContainer;
          // 获得Range起点的位移
          var pos = range.startOffset;
          // 建一个空Range
          range = document.createRange();
          // 插入内容
          var cons = document.createTextNode(val);

          if (container.nodeType == 3) {
            // 如是一个TextNode
            container.insertData(pos, cons.nodeValue);
            // 改变光标位置
            range.setEnd(container, pos + cons.nodeValue.length);
            range.setStart(container, pos + cons.nodeValue.length);
          } else {
            // 如果是一个HTML Node
            var afternode = container.childNodes[pos];
            container.insertBefore(cons, afternode);

            range.setEnd(cons, cons.nodeValue.length);
            range.setStart(cons, cons.nodeValue.length);
          }
          sel.addRange(range);
        }
      } else {
        //IE
        sel = editor.document.selection;
        range = sel.createRange();
        var cnode = range.parentElement();
        while (cnode.tagName.toLowerCase() != 'body') {
          cnode = cnode.parentNode;
        }
        if (cnode.id && cnode.id == 'rich_txt_editor') {
          range.pasteHTML(val);
        }
      }
      this.editor.change()
      this.editor.$textElem.focus()
    },

    coverText (val) {
      this.editor.txt.html(val)
    },

    pasteStyleHandle () {
      // 关闭粘贴样式的过滤
      this.editor.customConfig.pasteFilterStyle = false
      // 忽略粘贴内容中的图片
      this.editor.customConfig.pasteIgnoreImg = false
      // 自定义处理粘贴的文本内容
      this.editor.customConfig.pasteTextHandle = (content) => {
        var str = ''
        if (content === '' && !content) { return str }
        str = content.replace(/<!--[\w\W\r\n]*?-->/gmi, '');
        str = str.replace(/<(w.*).+?>/igm, '');
        str = str.replace(/<html[\s\S]*?>/ig, '')
        str = str.replace(/<link[\s\S]*?>/ig, '')
        str = str.replace(/<body[\s\S]*?>/ig, '')
        str = str.replace(/<\/body>/ig, '')
        str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
        str = str.replace(/<head>[\s\S]*?<\/head>/ig, '')
        str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
        return str
      }
    },

    uploadImgConfig () {
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.uploadImgTimeout = 3500
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      this.editor.customConfig.uploadImgMaxLength = 5
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgServer = '/api/self/uploadImage'
      this.editor.customConfig.uploadImgParams = { type: 'facebook' }
    },

    uploadImgHooks () {
      this.editor.customConfig.uploadImgHooks = {
        before (xhr, editor, files) {
          console.log(xhr, editor, files)
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
          // 当返回的结果是 {prevent: true, msg: '放弃上传'} 表示用户放弃上传
        },

        success (xhr, editor, result) {
          console.log('upload success')
          console.log(xhr, editor, result)
          this.$message.success('添加图片成功~');
        },

        fail (xhr, editor, fail) {
          console.log('upload insert-fail')
          console.log(xhr, editor, fail)
          this.$message.warning('图片添加错误~');
        },

        error (xhr, editor) {
          console.log('upload error')
          console.log(xhr, editor)
          this.$message.error('图片上传出错~');
        },

        timeout (xhr, editor) {
          console.log('upload timeout')
          console.log(xhr, editor)
          this.$message.warning('图片上传超时~');
        },

        customInsert (insertImg, result) {
          const data = result.data;
          if (result.code === 200 && data) {
            let fullFileName = data.fullFileName;
            let mdx = fullFileName.indexOf(':/');
            if (mdx > 0) {
              let scheme = fullFileName.substr(0, mdx);
              scheme = window.global_config.assets_servers[scheme];
              if (scheme) {
                // const url = 'https:' + scheme + fullFileName.substr(mdx + 2);
                const url = data.imageUrl
                insertImg(url)
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
#wangeditor {
  width: 100%;
  border-radius: 4px;
  .wrapper {
    border-radius: 4px;
  }
  .w-e-toolbar {
    background: #fff !important;
    flex-wrap: wrap;
  }
}

.w-e-text::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/*正常情况下滑块的样式*/
.w-e-text::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

/*鼠标悬浮在该类指向的控件上时滑块的样式*/
.w-e-text:hover::-webkit-scrollbar-thumb {
  background-color: rgba(125, 125, 125, 0.1);
  border-radius: 5px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

/*鼠标悬浮在滑块上时滑块的样式*/
.w-e-text::-webkit-scrollbar-thumb:hover {
  background-color: rgba(125, 125, 125, 0.2);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

/*正常时候的主干部分*/
.w-e-text::-webkit-scrollbar-track {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
}

/*鼠标悬浮在滚动条上的主干部分*/
.w-e-text::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: rgba(88, 88, 88, 0.01);
}
</style>
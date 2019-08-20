<template>
  <div id="wangeditor">
    <div
      ref="editorElem"
      style="text-align:left"
    ></div>
  </div>
</template>

<script>
import WEditer from 'wangeditor'
export default {
  name: 'editorEle',
  props: {
    content: {
      type: String,
      default: ''
    },
    updateData: {
      type: Function
    }
  },
  data () {
    return {
      editorContent: ''
    }
  },
  watch: {
    content () {
      this.editor.txt.html(this.content)
    }
  },
  mounted () {
    this.editor = new WEditer(this.$refs.editorElem)
    this.editor.customConfig.menus = [ // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      // 'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon', // 表情
      'image', // 插入图片
      // 'table', // 表格
      'undo' // 撤销
      // 'redo' // 重复
    ]
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
      this.$emit('edit-val', this.editorContent)
    }
    this.uploadImgConfig()
    this.uploadImgHooks()
    this.editor.create()
    if (!this.content) {
      this.editor.txt.html('')
    }
  },
  methods: {
    uploadImgConfig () {
      // this.editor.txt.clear() // 清空内容
      this.editor.customConfig.zIndex = 100
      this.editor.customConfig.uploadImgTimeout = 3500
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgServer = '/api/self/uploadImage'
      this.editor.customConfig.uploadImgParams = { type: 'facebook' }
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      this.editor.customConfig.uploadImgMaxLength = 5
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
  .w-e-toolbar {
    background: #fff !important;
  }
}
</style>
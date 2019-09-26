<template>
  <div class="steps-body">
    <a-spin :spinning="spinning">
      <a-steps
        :current="planCur"
        :initial="0"
        style="padding-top: 20px;"
        labelPlacement="vertical">
          <a-step
            v-for="(item, key) in reviewList"
            :key="key">
              <p
                slot="title"
                class="title"
                :class="{'active-col': key <= planCur}"
              >{{item.title}}</p>
            <template slot="icon">
              <a-icon
                v-if="(!item.hasSet && item.nextSet) || item.hasSkip"
                type="close"
              />
              <span v-else>{{key + 1}}</span>
            </template>
          </a-step>
      </a-steps>
    </a-spin>
    <div class="wrapper">
      <div class="module">
        <router-view></router-view>
      </div>
      <div class="btns">
        <a-button class="btn-last" v-show="planCur !== 0" @click="jump(-1)">上一步</a-button>
        <a-button>退出</a-button>
        <a-button v-show="!isexit" type="primary" @click="jump(1)">下一步</a-button>
        <a-button v-show="isexit" type="primary">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script>
const reviewList = [
  {
    title: '选择模板'
  },
  {
    title: '编辑内容'
  },
  {
    title: '发送时光'
  },
  {
    title: '选择商品'
  },
  {
    title: '其他条件'
  },
  {
    title: '保存计划'
  }
]
export default {
  data () {
    return {
      navlist: [],
      timer: null,
      spinning: false,
      isexit: false,
      planCur: 0,
      reviewList
    }
  },
  created () {
    const arr = [];
    const route = this.$route.matched;
    let routes = {
      children: this.$router.options.routes
    }
    for (var i = 0; i < route.length - 1; i++) {
      // eslint-disable-next-line
      routes = routes.children.find((e) => (e.name == route[i].name));
    }
    for (const item of routes.children) {
      arr.push(item.name);
    }
    this.navlist = arr;
  },
  methods: {
    jump(n) {
      this.$router.push({ name: this.navlist[this.planCur + n]});
    }
  },
  watch: {
    $route() {
      this.planCur = this.navlist.indexOf(this.$route.name);
      this.isexit = this.planCur === this.navlist.length - 1 ? true : false;
    }
  }
}
</script>

<style lang="less" scoped>
.steps-body {
  background: #fff;
  padding-bottom: 20px;
  /deep/ .ant-steps {
    padding: 0 32px;
  }
  /deep/ .ant-steps-item-tail {
    top: 18px;
    margin-left: 55px;
  }
  /deep/ .ant-steps-item-finish > .ant-steps-item-tail:after {
    background: #1890ff;
  }
  /deep/ .ant-steps-item-finish {
    .ant-steps-item-icon {
      border-color: #1890ff;
      .ant-steps-icon a {
        color: #1890ff;
      }
    }
  }
  /deep/ .ant-steps-item-process .ant-steps-item-icon {
    border-color: #1890ff;
    .ant-steps-icon a {
      color: #1890ff;
    }
  }
  /deep/ .ant-steps-item-icon {
    width: 37px;
    height: 37px;
    border-radius: 37px;
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-color: #999;
    background: #fff;
    .ant-steps-icon {
      font-size: 25px;
      font-weight: bold;
      a {
        text-decoration: none;
        color: #999;
      }
    }
  }
  /deep/ .ant-steps-label-vertical .ant-steps-item-content {
    width: 120px;
  }
  /deep/ .ant-btn[disabled]:hover {
    color: #fff;
    background-color: rgba(20, 20, 20, 0.25);
  }

  .title {
    margin: 0 -15px;
    color: #999999;
    font-size: 15px;
  }
  .active-col {
    color: #1890ff;
  }
  .active-bg {
    background: #1890ff;
  }
  .wrapper {
    padding: 15px;
  }
  .module {
    padding: 25px 20px;
    border: 1px solid rgb(232, 232, 232);
  }
  .btns {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .btn-last {
      color: #fff;
      background: #90939c;
    }
    button {
      margin-left: 12px;
    }
  }
}

@media (max-width: 1400px) {
  .steps-body {
    .title {
      height: 42px;
      line-height: 21px;
      margin: 0;
      font-size: 16.5px;
    }
    .desc {
      height: 92px;
    }

    button {
      padding: 6px 12px;
      font-size: 12px;
    }
  }
}
</style>
<template>
  <span :endTime='endTime' :callback='callback' :endText='endText'>
    <slot>{{content}}</slot>
  </span>
</template>
<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  props: {
    endTime: {
      type: Number,
      default: 0
    },
    endText: {
      type: String,
      default: '已结束'
    },
    callback: {
      type: Function,
      default: () => {
        // 结束后毁回调
      }
    },
    timeType: {
      type: String,
      default: 'symbol'
    }
  },
  mounted () {
    this.countdowm(this.endTime, this.timeType)
  },
  methods: {
    countdowm (timestamp, timetype) {
      let self = this
      let timer = setInterval(function () {
        // let jiuTest = timestamp
        // var createTime = (new Date('2019/04/03 11:30:00')).getTime() // 得到毫秒数

        let nowTime = new Date()
        let t = parseInt(timestamp) - parseInt(nowTime.getTime())
        if (t > 0) {
          let day = Math.floor(t / 86400000)
          let hour = Math.floor((t / 3600000) % 24)
          let min = Math.floor((t / 60000) % 60)
          let sec = Math.floor((t / 1000) % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          let format = ''
          if (timetype === 'symbol') {
            if (day > 0) {
              format = `${day} ${hour}:${min}:${sec}`
            }
            if (day <= 0 && hour > 0) {
              format = `${hour}:${min}分${sec}`
            }
            if (day <= 0 && hour <= 0) {
              format = `${min}:${sec}`
            }
            // self.content = '（倒计时' + format + '）'
            self.content = format
          } else {
            if (day > 0) {
              format = `${day}天${hour}小时${min}分${sec}秒`
            }
            if (day <= 0 && hour > 0) {
              format = `${hour}小时${min}分${sec}秒`
            }
            if (day <= 0 && hour <= 0) {
              format = `${min}分${sec}秒`
            }
            self.content = '剩余：' + format
          }
        } else {
          clearInterval(timer)
          self.content = self.endText
          self.$emit('callbackEvent', true)
        }
      }, 1000)
    },
    _callback () {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this)
      }
    }
  }
}
</script>

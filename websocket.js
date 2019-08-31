export const inlineWebSocket = (that, ACCESS_TOKEN) => {
  let host = document.location.host
  const IS_HTTPS = document.location.protocol.includes('https')
  let wsProtocol = IS_HTTPS ? 'wss://' : 'ws://'
  let url = `${wsProtocol}${host}`
  let time = 0 //  重连次数
  let socket = {
    init() {
      // ws initialize
      this.wsUri = url
      this.webscoket = new WebSocket(url)
      this.webscoket.onopen = evt => {
        let { readyState } = this.webscoket
        if (+readyState === 1) {
          time = 0
        }
        let d = {
          cmd: 'rgb',
          system: 77, //
          access_token: ACCESS_TOKEN
        }
        let dStr = JSON.stringify(d)
        console.log('webSocket-Connection-established')
        this.webscoket.send(dStr)
      }

      this.webscoket.onreadyStateChange = () => {
        console.log(this.webscoket.readyState)
      }

      this.webscoket.onclose = () => {
        console.log('webSocket close')
        if (time >= 3) {
          return false
        } else {
          time++
          this.init()
        }
      }

      this.webscoket.onmessage = e => {
        let isString = typeof e.data === 'string'
        let d = isString ? JSON.parse(e.data) : e.data
        that.updateUnreadMsgNum({ payload }) // 更新未读消息数量
        that.$internalNotify({
          // some options
        }) // 通知
      }

      this.webscoket.onerror = e => {
        console.log(
          'WebSocket has been shut down in accident,the following is the error emssage,please ask for technological support!!'
        )
        console.log('we are trying to reconnect')
      }
      return this
    },

    shutWebSocket() {
      time = 3
      this.webscoket.close()
      return this
    }
  }

  return socket
}

import classNames from 'classnames'
import { createNamespace } from '../../utils/createNamespace'

const bem = createNamespace('notification')

const body = document.getElementsByTagName('body')[0]
let num = 0
const instances: Array<object> = []

interface MessageProps {
  title: string
  message?: string
  type?: string
  duration?: number
}

function notification(props: MessageProps) {
  const { title = '', message = '', type = 'info', duration = 3000 } = props
  const classes = bem(classNames([type]))
  const box = document.createElement('div')

  const show = () => {
    num++
    box.className = classes
    box.innerHTML = `
    <div class="header">
      <span class="title">${title}</span>
      <span class="iconfont icon-cross"></span>
    </div>
    ${message && `<div class="content">${message}</div>`} 
    `
    box.style.animation = 'showNtf .4s forwards'
    let H = instances.map(item => {
      console.log(item.box.style, item.box.style.height)
      item.box.style.height + H
    })
    console.log(H)
    box.style.top = (num - 1) * 130 + 20 + 'px'
    instances.push({
      box,
      top: (num - 1) * 65
    })

    body.appendChild(box)
  }

  const hidden = () => {
    setTimeout(() => {
      num--
      box.style.animation = 'closeNtf .4s forwards'

      // 此处top与instances中的top一致
      let top = box.style.top.slice(0, -2)

      // 利用闭包查找到被hidden的元素
      let i = instances.findIndex(item => item.top == top)

      // 从instances中删除此元素
      instances.splice(i, 1)

      // 这个元素之后的所以元素top都需要重新调整
      instances.slice(i).forEach(item => {
        // 改变DOM自身style
        item.box.style.top = item.top - 65 + 'px'
        item.box.style.transition = '.4s'
        // 改变instances里面的top
        item.top -= 65
      })

      setTimeout(() => {
        body.removeChild(box)
      }, 200)
    }, duration)
  }

  show()
  // hidden()
}

export default notification

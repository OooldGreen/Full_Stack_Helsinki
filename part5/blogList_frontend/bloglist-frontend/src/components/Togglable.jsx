import { useState, useImperativeHandle } from 'react'
import '../App.css'

const Togglable = (props) => {
  // 显示或隐藏创建博客页面
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hidenWhenVisible}>
        <button className="button" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button className="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
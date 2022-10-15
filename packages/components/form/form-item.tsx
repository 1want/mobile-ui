import { cloneElement, useContext } from 'react'
import FormContext from './formContext'
import { FormItemProps } from './types'

const FormItem = (props: FormItemProps) => {
  const { children, name = '', rules, label } = props
  const { setValue, setRules, errorInfo } = useContext(FormContext)
  // 初始化表单，收集表单里面包含的formItem的名称
  setValue(name, '')
  // 添加表单校验规则
  if (rules) {
    setRules(name, rules)
  }

  const setProperty = children => {
    return {
      ...children.props,
      onChange: e => {
        setValue(name, e.target.value)
      }
    }
  }

  const newElement = cloneElement(children, setProperty(children))
  return (
    <div className='form-item'>
      {label && <span className={`label ${rules && 'rules'}`}>{label}:</span>}
      {errorInfo?.name}
      {newElement}
    </div>
  )
}

export default FormItem

import { Radio } from 'votary'

const onChange = e => {
  console.log(e)
}

export default () => (
  <>
    <Radio.Group value='orange' onChange={onChange}>
      <Radio value='apple'>苹果</Radio>
      <Radio value='banner'>香蕉</Radio>
      <Radio value='orange'>橘子</Radio>
    </Radio.Group>
  </>
)

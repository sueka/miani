import AnyInput from './AnyInput'
import BdayPicker from './BdayPicker'
import FnInput from './FnInput'
import NInput from './NInput'

const VCardForm: React.FC = () => (
  <>
    <FnInput />
    <NInput />
    <BdayPicker />
    <AnyInput type="FOO" />
  </>
)

export default VCardForm

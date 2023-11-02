import { InputBox, Label } from './styledComponents/InputBox.styles';
interface lableKey {
  label: string;
  value: string|number;
  onChange: any;
  type?: string;
  placeholder?:string;
}
const LabelValue = ({ label, value, onChange, type = 'text',placeholder, ...rest }: lableKey) => {
  return (
    <div>
      <div>
        <Label>{label}</Label>
      </div>
      <div>
        <InputBox value={value} size="small" type={type} onChange={onChange} placeholder={placeholder} {...rest }/>
      </div>
    </div>
  );
};

export default LabelValue;

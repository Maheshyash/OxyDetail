import { InputBox, Label } from './styledComponents/InputBox.styles';
interface lableKey {
  label: string;
  value: string | number;
  onChange: any;
  type?: string;
  placeholder?: string;
}
const LabelValue = ({ label, value, onChange, type = 'text', placeholder, ...rest }: lableKey) => {
  return (
    <div>
      <Label>{label}</Label>
      <InputBox value={value} size="small" type={type} onChange={onChange} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default LabelValue;

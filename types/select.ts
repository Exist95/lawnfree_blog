export interface ISelectProps {
  placeholder: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  options: string[];
}
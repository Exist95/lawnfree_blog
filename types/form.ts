export interface IFormInputProps {
  control: any;
  label: string;
  type?: string;
  options?: string[]; //드롭다운 옵션
}

export interface ITagInputProps extends IFormInputProps {
  tags: string[]; // 초기 태그 목록
  onChange: (tags: string[]) => void; // 태그 변경 핸들러
  placeholder?: string;
  initialTags: string[];
  onTagsChange: (tags: string[]) => void;
}
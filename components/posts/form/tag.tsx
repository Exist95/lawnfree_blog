import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IFormInputProps, ITagInputProps } from '@/types/form';
import React, { useState } from 'react'

const TagInput = ({ control, label, type = 'text', initialTags, onTagsChange }: ITagInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const placeholder = `Please enter the ${label}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  return (
    <FormField
      control={control}
      name={label}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label.toUpperCase()}</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800">
                  x
                </button>
              </span>
            ))}
          </div>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}

              onKeyDown={handleKeyDown}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TagInput
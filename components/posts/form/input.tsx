import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { IFormInputProps } from '@/types/form';



const FormInput = ({ control, label, type = 'text', options }: IFormInputProps) => {
  const placeholder = `Please enter the ${label}`;

  return (
    <FormField
      control={control}
      name={label}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label.toUpperCase()}</FormLabel>
          <FormControl>
            {options ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Input value={field.value} readOnly className="w-full text-left cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start"
                  className="w-full">
                  {options.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => field.onChange(option)}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              label === 'contents'
                ? <Textarea
                  className='min-h-[200px]'
                  placeholder={placeholder}
                  {...field} />
                : <Input
                  type={type}
                  placeholder={placeholder}
                  {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
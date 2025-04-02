import React, { FC } from 'react';

interface IFieldTW {
  value: string | number
  onChange: (value: string) => void
  isDisabled?: boolean
  isError?: boolean
  placeholder?: string
  rows?: number
  cn?: string
}

export const FieldTW: FC<IFieldTW> = ( {
  value,
  onChange,
  isDisabled,
  isError,
  placeholder = '',
  rows = 8,
  cn
} ) => {
  return (
    <textarea
      className={ 'py-3 px-5 w-full outline-none text-sm bg-bg-input resize-none rounded-lg border focus:border-border '
        + (isError ? ' border-error ' : 'border-transparent')
        + (cn ? cn : '')
      }
      value={ value }
      rows={ rows }
      placeholder={ placeholder }
      onChange={ e => !isDisabled && onChange(e.target.value) }
    />
  )
}

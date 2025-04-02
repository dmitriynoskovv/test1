import React, { FC } from 'react';

interface IInputTW {
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  isDisabled?: boolean
  isError?: boolean
  cn?: string
}

export const InputTW: FC<IInputTW> = ( {
  value,
  onChange,
  placeholder = '',
  isDisabled,
  isError,
  cn = ''
} ) => {
  return (
    <input
      className={ 'w-full outline-none text-sm px-5 bg-bg-input py-3 rounded-lg border focus:border-border '
        + ( cn ? cn : '' )
        + ( isError ? ' border-error ' : ' border-transparent ')
      }
      value={ value }
      placeholder={ placeholder }
      onChange={ e => !isDisabled && onChange(e.target.value) }
    />
  )
}

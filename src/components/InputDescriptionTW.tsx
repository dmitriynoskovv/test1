import React, { FC, ReactNode } from 'react';

interface IInputDescriptionTW {
  text: string | ReactNode
  isError?: boolean
  cn?: string
  children: ReactNode
}

export const InputDescriptionTW: FC<IInputDescriptionTW> = ( {
  text,
  children,
  isError,
  cn = ''
} ) => {
  return (
    <div className={ 'w-full ' + ( cn ? cn : '' ) }>
      { children }
      <p className={ 'mt-0.5 ml-3 text-[10px] ' + ( isError ? ' text-error ' : ' text-transparent' ) }>
        { text }
      </p>
    </div>
  )
}

import React, { FC, ReactNode } from 'react';

interface IButtonTW {
  onClick: () => void
  content: string | ReactNode
  isDisabled?: boolean
  cn?: string
}

export const ButtonTW: FC<IButtonTW> = ( {
  onClick,
  content,
  isDisabled,
  cn = ''
} ) => {
  return (
    <button
      className={ `px-5 py-3 w-full outline-none text-sm bg-bg-button rounded-lg cursor-pointer whitespace-nowrap ${ cn ? cn : '' }` }
      onClick={() => !isDisabled && onClick() }
    >
      { content }
    </button>
  )
}

import React, { useState, MouseEvent, useEffect } from 'react';

interface IDropdownTW<T extends string | object> {
  options: T[]
  selected: T | string | null
  onSelect: (value: T) => void
  displayedKey?: T extends string ? undefined : keyof T
  placeholder?: string
  isDisabled?: boolean
  isError?: boolean
  cn?: string
}

export const DropdownTW = <T extends string | object>( {
  options,
  selected,
  onSelect,
  displayedKey,
  placeholder = '',
  isDisabled,
  isError,
  cn = '',
}: IDropdownTW<T> ) => {
  const [ isOpen, setIsOpen ] = useState(false)

  const open = ( e: MouseEvent<HTMLDivElement> ) => {
    e.stopPropagation()
    if (isDisabled) return
    setIsOpen(!isOpen)
  }

  const select = ( item: T ) => {
    if ( isDisabled ) return
    onSelect(item)
    setIsOpen(false)
  }

  useEffect( () => {
    const hideDropdown = ( event: DocumentEventMap["click"] ) => {
      const isItDropdown: boolean = !!event.target?.closest( `[data-modal="dropdown"]` )
      !isItDropdown && setIsOpen( false )
    }
    document.addEventListener( 'click', hideDropdown )
    return () => document.removeEventListener( 'click', hideDropdown )
  }, [ isOpen ] )

  return (
    <div className='relative'>
      <input
        className={ 'w-full outline-none text-sm px-5 bg-bg-input py-3 rounded-lg border focus:border-border '
          + ( cn ? cn : '' )
          + ( isError ? ' border-error ' : ' border-transparent ' )
        }
        value={ ( typeof selected === 'string'
            ? selected
            : displayedKey && selected && selected[ displayedKey ]
          ) || ''
        }
        data-modal="dropdown"
        placeholder={ placeholder }
        onChange={ () => {} }
        onClick={ open }
        readOnly
      />
      { }

      { isOpen && options.length
        ? <div className='absolute z-10 w-full max-h-[200px] top-[48px] border border-border bg-bg-input rounded-lg overflow-y-auto text-sm'>
            { options.map(( item, idx ) => (
              <div
                key={ idx }
                className='py-2 px-4 cursor-pointer hover:bg-background'
                onClick={ () => select(item) }
              >
                { typeof item === 'string' ? item : displayedKey && item[ displayedKey ] }
              </div>
            )) }
          </div>
        : null
      }
    </div>
  )
}

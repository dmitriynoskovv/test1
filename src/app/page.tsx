'use client';
import React, { useEffect, useState } from 'react';
import { InputTW, FieldTW, ButtonTW, InputDescriptionTW } from '@/components';
import { DropdownTW } from '@/components/DropdownTW';
import { loadLevelListAPI, sendFormAPI } from '@/API/homepage';
import { FormType } from '@/types/home';
import { emailRegexp, urlRegexp } from '@/shared/constants';
import { redirect } from 'next/navigation';
import { PATH } from '@/shared/routs';

export default function Home() {
  const [ form, setForm ] = useState<FormType>({ name: '', email: '', description: '', url: '', lvl: null })
  const [ options, setOptions ] = useState<string[]>([])
  const [ isError, setIsError ] = useState(false)
  const [ loadingError, setLoadingError ] = useState(false)

  const onAccept = () => {
    const isEmailValid = form.email && emailRegexp.test(form.email)
    const isDescriptionValid = form.description && form.description.length >= 10
    const isUrlValid = form.url && urlRegexp.test(form.url)

    const isValid = form.name && isEmailValid && isDescriptionValid && isUrlValid && form.lvl

    if(!isValid) return setIsError(true)
    sendFormAPI(form).then(() => redirect(PATH.thanks))
  }
  useEffect(() => {
    loadLevelListAPI()
      .then(( { levels } ) => setOptions(levels))
      .catch(() => setLoadingError(true))
  }, [])

  return (
    <div className='w-full h-full lap:px-14 xs:px-8 lap:py-10 xs:py-5 bg-bg-light rounded-2xl flex flex-col lap:gap-5 overflow-y-auto'>
      <div className='w-full flex justify-between items-center lap:flex-row xs:flex-col xs:items-start'>
        <p className='xs:text-lg xs:pb-2 xs:ml-2 2xl:xs:text-lg'>Name</p>
        <InputDescriptionTW
          text={ 'Can\'t be empty' }
          cn='xs:w-full lap:max-w-2/3'
          isError={ isError && !form.name }
        >
          <InputTW
            value={ form.name }
            onChange={ name => {
              setIsError(false)
              setForm({ ...form, name })
            }}
            placeholder='Name'
            isError={ isError && !form.name }
          />
        </InputDescriptionTW>
      </div>

      <div className='w-full flex justify-between items-center lap:flex-row xs:flex-col xs:items-start'>
        <p className='xs:text-lg xs:pb-2 xs:ml-2 2xl:xs:text-lg'>Email</p>
        <InputDescriptionTW
          text='Reqired. Should looks like example@example.com '
          cn='xs:w-full lap:max-w-2/3'
          isError={ isError && !emailRegexp.test(form.email) }
        >
          <InputTW
            value={ form.email }
            placeholder='Email'
            onChange={ email => {
              setIsError(false)
              setForm({ ...form, email })
            } }
            isError={ isError && !emailRegexp.test(form.email) }
          />
        </InputDescriptionTW>
      </div>

      <p className='xs:text-lg xs:pb-2 xs:ml-2 2xl:xs:text-lg'>Assignment Description</p>
      <InputDescriptionTW
        text={ 'Should contains at least 10 characters' }
        isError={ isError && form.description.length < 10 }
        cn='w-full lap:ml-auto lap:max-w-2/3'
      >
        <FieldTW
          value={ form.description }
          placeholder='Description'
          onChange={ description => {
            setIsError(false)
            setForm({ ...form, description })
          } }
          isError={ isError && form.description.length < 10 }
        />
      </InputDescriptionTW>

      <div className='w-full flex justify-between items-center lap:flex-row xs:flex-col xs:items-start'>
        <p className='xs:text-lg xs:pb-2 xs:ml-2 2xl:xs:text-lg'>GitHub Repository URL</p>
        <InputDescriptionTW
          text={ 'Should contains correct URL like \'https://github.com\'' }
          cn='xs:w-full lap:max-w-2/3'
          isError={ isError && !urlRegexp.test(form.url) }
        >
          <InputTW
            value={ form.url }
            placeholder='URL'
            onChange={ url => {
              setIsError(false)
              setForm({ ...form, url })
            } }
            isError={ isError && !urlRegexp.test(form.url) }
          />
        </InputDescriptionTW>
      </div>

      <div className='w-full flex justify-between items-center lap:flex-row xs:flex-col xs:items-start'>
        <p className='xs:text-lg xs:pb-2 xs:ml-2 2xl:xs:text-lg'>Candidate Level</p>
        <InputDescriptionTW
          text={ 'Can\'t be empty' }
          cn='xs:w-full lap:max-w-2/3'
          isError={ isError && !form.lvl }
        >
          <DropdownTW
            options={ options }
            selected={ form.lvl }
            onSelect={ (lvl: string) => {
              setIsError(false)
              setForm( { ...form, lvl } )
            } }
            isError={ isError && !form.lvl }
            placeholder='Select level'
          />
        </InputDescriptionTW>
      </div>

      <ButtonTW
        onClick={ onAccept }
        content='Submit Assignment'
        cn='mt-auto mx-auto lap:max-w-1/3 xs:w-full'
      />

      <Notify isNewError={ loadingError } clear={ () => setLoadingError(false) } />
    </div>
  );
}

// Can be moved globally
const Notify = ( { isNewError, clear }: { isNewError: boolean, clear: () => void } ) => {
  const [ error, setError ] = useState(false)

  useEffect(() => {
    if(!isNewError) return
    setError(true)
    const timer = setTimeout(() => {
      clear()
      setError(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [isNewError])

  if(!error) return null

  return (
    <div className='fixed top-5 right-5 bg-rose-400 px-4 py-2 rounded-lg uppercase text-xs'>
      Request Error
    </div>
  )
}

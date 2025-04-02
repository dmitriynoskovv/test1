import { FormType } from '@/types/home';

const BASE_URL = 'https://tools.qa.ale.ai/api/tools/'

const URL = {
  LVL: 'candidates/levels',
  FORM: 'candidates/assignments'
}

type RLevel = {
  levels: string[]
}

export const loadLevelListAPI = ():Promise<RLevel> => fetch(BASE_URL + URL.LVL).then((data) => data.json())

export const sendFormAPI = (form: FormType) => {
  const data = {
    name: form.name,
    email: form.email,
    assignment_description: form.description,
    github_repo_url: form.url,
    candidate_level: form.lvl,
  }

  return fetch(BASE_URL + URL.FORM, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
}


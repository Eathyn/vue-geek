type LanguageType = 'zh' | 'en' | null

type AssemblySize = 'large' | 'default' | 'small'

export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export interface UserState {
  token: string
  userInfo: {
    name: string
  }
}

export interface GlobalState {
  language: LanguageType
  primary: string
  isDark: boolean
  assemblySize: AssemblySize
  layout: LayoutType
}

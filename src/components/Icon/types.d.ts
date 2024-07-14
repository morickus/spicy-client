export type IconColor = 'default' | 'grey'

export type IconNamesMap =
  'clock'
  | 'arrow-right'


export interface IconProps {
  name: IconNamesMap
  color?: IconColor
  className?: string
  fontSize?: number
  onClick?(): void
}
import { FC } from 'react'
import classnames from 'classnames'
import styles from './icomoon.module.scss'
import { IconProps } from '@/components/Icon/types'

const Icon: FC<IconProps> = (props) => {
  const { name, color = 'default', className, fontSize = 16, onClick } = props

  return (
    <i
      onClick={onClick}
      style={{fontSize: `${fontSize}px`}}
      className={classnames(styles.root, {
        [styles[`${name}`]]: name,
        [styles[`${color}`]]: color,
      }, className)}
    />
  );
}

export default Icon
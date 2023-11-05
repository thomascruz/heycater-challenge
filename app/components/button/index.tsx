import classNames from 'classnames';

import s from './style.module.scss';

export default function Button({
  id,
  actionName,
  text,
  title,
  variant,
  onClick,
}: {
  id?: string
  actionName?: string
  text?: string
  title?: string
  variant?: 'white' | 'black'
  onClick?: (action?: string, id?: string) => void,
}) {


  return (
    <button 
      onClick={(evt) => onClick && onClick(actionName, id)}
      className={classNames(s.button, s[variant || 'white'])}
      title={title}
    >
      {text}
    </button>
  )
}

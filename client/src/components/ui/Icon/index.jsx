import PropTypes from 'prop-types'
import { memo, useMemo } from 'react'

import { IconContext } from 'react-icons'
import { BiCheck } from 'react-icons/bi'
import { BsCircle, BsListTask } from 'react-icons/bs'
import { HiPlus, HiOutlineTrash } from 'react-icons/hi'
import { FiEdit3 } from 'react-icons/fi'
import { GrCircleAlert } from 'react-icons/gr'
import { LuCheckSquare } from 'react-icons/lu'

import styles from './index.module.css'

const ICON_MAP = {
  check: <BiCheck />,
  plus: <HiPlus />,
  edit: <FiEdit3 />,
  trash: <HiOutlineTrash />,
  circle: <BsCircle />,
  circleAlert: <GrCircleAlert />,
  todoList: <BsListTask />,
  completeList: <LuCheckSquare />,
}

const SIZE_LIST = {
  small: '14px',
  medium: '18px',
  large: '24px',
}

export const Icon = memo(({ className, color, iconName, size }) => {
  const iconValue = useMemo(
    () => ({
      size: SIZE_LIST[size],
      className: `${styles.icon} ${color ? styles[color] : ''} ${
        className || ''
      }`,
    }),
    [size, color, className]
  )

  return (
    <IconContext.Provider value={iconValue}>
      {ICON_MAP[iconName]}
    </IconContext.Provider>
  )
})

Icon.displayName = 'Icon'
Icon.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.oneOf([
    'check',
    'plus',
    'edit',
    'trash',
    'circle',
    'circleAlert',
    'todoList',
    'completeList',
  ]).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf([
    'gray-light',
    'orange',
    'indigo-blue',
    'dark-blue',
    'danger',
  ]),
}
Icon.defaultProps = {
  className: '',
  size: 'small',
  color: 'gray-light',
}

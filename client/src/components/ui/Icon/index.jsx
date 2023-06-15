import PropTypes from 'prop-types'
import { memo, useMemo } from 'react'
import { IconContext } from 'react-icons'
import { BsCheck2 } from 'react-icons/bs'

import styles from './index.module.css'

const ICON_MAP = {
  check: <BsCheck2 />,
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
  iconName: PropTypes.oneOf(['check']).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['gray-light']),
}
Icon.defaultProps = {
  className: '',
  size: 'small',
  color: 'gray-light',
}

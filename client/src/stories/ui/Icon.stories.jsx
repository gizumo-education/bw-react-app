import { Icon } from '../../components/ui/Icon'

export default {
  title: 'ui/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'アイコンコンポーネント',
      },
    },
  },
  argTypes: {
    iconName: { description: 'アイコン名' },
    color: { description: 'アイコンカラー' },
    size: { description: 'アイコンサイズ' },
    className: { description: 'アイコンのクラス名' },
  },
}

export const Check = {
  args: {
    iconName: 'check',
    color: 'orange',
    size: 'medium',
  },
}

export const Plus = {
  args: {
    iconName: 'plus',
    color: 'orange',
    size: 'medium',
  },
}

export const Edit = {
  args: {
    iconName: 'edit',
    color: 'indigo-blue',
    size: 'medium',
  },
}

export const Trash = {
  args: {
    iconName: 'trash',
    color: 'indigo-blue',
    size: 'medium',
  },
}

export const Circle = {
  args: {
    iconName: 'circle',
    color: 'indigo-blue',
    size: 'medium',
  },
}

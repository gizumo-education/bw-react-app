import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'

import styles from '../../components/pages/Top/index.module.css'

export default {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'ボタンコンポーネント',
      },
    },
  },
  argTypes: {
    type: { description: 'ボタンのタイプ' },
    disabled: {
      control: 'boolean',
      type: { summary: 'boolean' },
      description: 'ボタンの有効/無効',
      table: { defaultValue: { summary: false } },
    },
    children: { description: 'ボタンのラベル' },
    buttonStyle: { description: 'ボタンのスタイル' },
    className: { description: 'ボタンのクラス名' },
  },
  args: {
    type: 'button',
    disabled: false,
  },
}

export const Orange = {
  args: {
    children: 'タスクを追加',
    buttonStyle: 'orange',
  },
}

export const Disable = {
  args: {
    children: 'タスクを追加',
    disabled: true,
  },
}

export const Cancel = {
  args: {
    children: 'キャンセル',
    buttonStyle: 'cancel',
  },
}

export const AddTask = {
  args: {
    children: (
      <>
        <Icon
          iconName='plus'
          color='orange'
          size='medium'
          className={styles['plus-icon']}
        />
        タスクを追加
      </>
    ),
    buttonStyle: 'indigo-blue',
    className: styles['add-task'],
  },
}

export const IconOnly = {
  args: {
    children: <Icon iconName='check' size='large' color='orange' />,
    buttonStyle: 'icon-only',
  },
}

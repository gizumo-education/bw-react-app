import { Layout } from '../../components/ui/Layout'

export default {
  title: 'ui/Layout',
  component: Layout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'レイアウトコンポーネント',
      },
    },
  },
  argTypes: {},
}

export const Sample = {
  args: {
    children: 'Todo一覧',
  },
}

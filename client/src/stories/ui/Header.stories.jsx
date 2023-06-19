import { Header } from '../../components/ui/Header'

export default {
  title: 'ui/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '300px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'ヘッダーコンポーネント',
      },
    },
  },
  argTypes: {},
}

export const Sample = {
  args: {},
}

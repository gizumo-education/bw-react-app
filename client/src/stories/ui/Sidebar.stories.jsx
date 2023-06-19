import { Sidebar } from '../../components/ui/Sidebar'

export default {
  title: 'ui/Sidebar',
  component: Sidebar,
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
        component: 'サイドバーコンポーネント',
      },
    },
  },
  argTypes: {},
}

export const Sample = {
  args: {},
}

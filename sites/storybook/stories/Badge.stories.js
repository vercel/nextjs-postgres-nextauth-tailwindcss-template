import React from 'react';
import { Badge } from '@easeful/components';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'secondary', 'outline', 'destructive']
      },
      description: 'Selects the badge style variant'
    },
    children: {
      control: 'text',
      description: 'Content inside the badge'
    }
  },
  parameters: {
    layout: 'centered'
  }
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Badge',
  variant: 'default'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: 'secondary'
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline',
  variant: 'outline'
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Destructive',
  variant: 'destructive'
};

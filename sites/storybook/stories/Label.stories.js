import React from 'react';
import { Label } from '@easeful/components';

export default {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The label text',
      defaultValue: 'Your email address'
    },
    htmlFor: {
      control: 'text',
      description: 'The ID of the associated input field',
      defaultValue: 'email'
    },
    className: {
      control: 'text',
      description: 'Custom classes for styling'
    }
  }
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Your email address',
  htmlFor: 'email'
};

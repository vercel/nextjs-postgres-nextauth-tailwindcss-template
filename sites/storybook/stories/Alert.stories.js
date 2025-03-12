import React from 'react';
import { Terminal } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@easeful/components';

export default {
  title: 'Components/Alert',
  component: Alert,
  subcomponents: { AlertTitle, AlertDescription },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Defines the style variant of the alert'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    variant: 'default'
  }
};

const Template = (args) => (
  <Alert {...args}>
    <Terminal className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components and dependencies to your app using the CLI.
    </AlertDescription>
  </Alert>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'default'
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: 'destructive'
};

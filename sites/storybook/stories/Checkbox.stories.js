import React from 'react';
import { Checkbox } from '@easeful/components';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controls whether the checkbox is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    checked: false,
    disabled: false
  }
};

// Template for a standalone checkbox
const Template = (args) => <Checkbox {...args} />;

// Template for checkbox with label (CheckboxDemo)
const LabeledTemplate = (args) => (
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" {...args} />
    <label
      htmlFor="terms"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Accept terms and conditions
    </label>
  </div>
);

// Default Story: Standalone Checkbox
export const Default = Template.bind({});
Default.args = {};

// Checkbox with a label (Demo)
export const WithLabel = LabeledTemplate.bind({});
WithLabel.args = {};

// Disabled Checkbox
export const Disabled = LabeledTemplate.bind({});
Disabled.args = {
  disabled: true
};

// Pre-checked Checkbox
export const Checked = LabeledTemplate.bind({});
Checked.args = {
  checked: true
};

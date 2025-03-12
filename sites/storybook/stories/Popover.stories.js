import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@easeful/components';
import { Button } from '@easeful/components';

export default {
  title: 'Components/Popover',
  component: Popover,
  subcomponents: {
    PopoverTrigger,
    PopoverContent
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Aligns the popover content'
    },
    sideOffset: {
      control: 'number',
      description: 'Offset of the popover from the trigger'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling'
    }
  },
  args: {
    align: 'center',
    sideOffset: 4,
    className: 'w-72'
  }
};

const Template = ({ align, sideOffset, className }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent align={align} sideOffset={sideOffset} className={className}>
      Place content for the popover here.
    </PopoverContent>
  </Popover>
);

export const Default = Template.bind({});
Default.args = {};

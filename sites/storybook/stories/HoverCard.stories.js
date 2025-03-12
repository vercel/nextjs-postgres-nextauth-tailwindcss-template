import React from 'react';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@easeful/components';
import { Button } from '@easeful/components';

export default {
  title: 'Components/HoverCard',
  component: HoverCard,
  subcomponents: {
    HoverCardTrigger,
    HoverCardContent
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Aligns the hover card content'
    },
    sideOffset: {
      control: 'number',
      description: 'Offset distance from the trigger'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling'
    }
  },
  args: {
    align: 'center',
    sideOffset: 4,
    className: 'w-64'
  }
};

const Template = ({ align, sideOffset, className }) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button variant="outline">Hover Over Me</Button>
    </HoverCardTrigger>
    <HoverCardContent
      align={align}
      sideOffset={sideOffset}
      className={className}
    >
      The React Framework – created and maintained by <strong>@vercel</strong>.
    </HoverCardContent>
  </HoverCard>
);

export const Default = Template.bind({});
Default.args = {};

import React, { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@easeful/components';

export default {
  title: 'Components/Collapsible',
  component: Collapsible,
  subcomponents: {
    CollapsibleTrigger,
    CollapsibleContent
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the collapsible is open'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling'
    }
  },
  args: {
    open: false,
    className: 'w-[350px] space-y-2'
  }
};

const Template = ({ open, className }) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const Default = Template.bind({});
Default.args = {};

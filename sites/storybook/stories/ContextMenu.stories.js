import React from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem
} from '@easeful/components';

export default {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  subcomponents: {
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuGroup,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
    ContextMenuCheckboxItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling'
    }
  },
  args: {
    className: ''
  }
};

const Template = ({ className }) => (
  <ContextMenu>
    <ContextMenuTrigger className="p-4 border rounded-md cursor-pointer">
      Right Click Here
    </ContextMenuTrigger>
    <ContextMenuContent className={className}>
      <ContextMenuGroup>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuSub>
        <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Settings</ContextMenuItem>
          <ContextMenuItem>Logout</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup value="dark">
        <ContextMenuRadioItem value="light">Light Mode</ContextMenuRadioItem>
        <ContextMenuRadioItem value="dark">Dark Mode</ContextMenuRadioItem>
      </ContextMenuRadioGroup>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked>
        Enable Notifications
      </ContextMenuCheckboxItem>
    </ContextMenuContent>
  </ContextMenu>
);

export const Default = Template.bind({});
Default.args = {};

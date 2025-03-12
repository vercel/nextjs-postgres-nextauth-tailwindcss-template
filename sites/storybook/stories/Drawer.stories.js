import React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@easeful/components';
import { Button } from '@easeful/components';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  subcomponents: {
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
    DrawerClose
  },
  tags: ['autodocs'],
  argTypes: {
    shouldScaleBackground: {
      control: 'boolean',
      description:
        'Determines if the background should scale when the drawer opens'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling'
    }
  },
  args: {
    shouldScaleBackground: true,
    className: ''
  }
};

const Template = ({ shouldScaleBackground, className }) => (
  <Drawer shouldScaleBackground={shouldScaleBackground}>
    <DrawerTrigger asChild>
      <Button variant="outline">Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent className={className}>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const Default = Template.bind({});
Default.args = {};

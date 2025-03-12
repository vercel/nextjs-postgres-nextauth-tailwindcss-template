import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@easeful/components';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  subcomponents: { AvatarImage, AvatarFallback },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The image source URL for the avatar'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the avatar image'
    },
    fallbackText: {
      control: 'text',
      description: 'Fallback text displayed when the image fails to load'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    src: 'https://github.com/shadcn.png',
    alt: '@shadcn',
    fallbackText: 'CN'
  }
};

const Template = ({ src, alt, fallbackText, ...args }) => (
  <Avatar {...args}>
    <AvatarImage src={src} alt={alt} />
    <AvatarFallback>{fallbackText}</AvatarFallback>
  </Avatar>
);

export const Default = Template.bind({});
Default.args = {};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  src: '',
  fallbackText: 'AB'
};

import React from 'react';
import { Button, buttonVariants } from '@easeful/components';
import { ChevronRight, MailOpen, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Storybook Config
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'default',
          'secondary',
          'destructive',
          'outline',
          'ghost',
          'link'
        ]
      }
    },
    size: {
      control: { type: 'select', options: ['default', 'sm', 'lg', 'icon'] }
    },
    asChild: {
      control: 'boolean',
      description: 'Use child component inside button'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button'
    }
  }
};

// Default Template
const Template = ({ variant, size, asChild, disabled }) => (
  <Button variant={variant} size={size} asChild={asChild} disabled={disabled}>
    {asChild ? <Link href="/login">Login</Link> : 'Button'}
  </Button>
);

export const Primary = Template.bind({});
Primary.args = { variant: 'default' };

export const Secondary = Template.bind({});
Secondary.args = { variant: 'secondary' };

export const Destructive = Template.bind({});
Destructive.args = { variant: 'destructive' };

export const Outline = Template.bind({});
Outline.args = { variant: 'outline' };

export const Ghost = Template.bind({});
Ghost.args = { variant: 'ghost' };

export const LinkButton = Template.bind({});
LinkButton.args = { variant: 'link' };

// ✅ Button with Icon
export const WithIcon = () => (
  <Button>
    <MailOpen className="mr-2" />
    Login with Email
  </Button>
);

// ✅ Icon Button (Square Button)
export const IconButton = () => (
  <Button variant="outline" size="icon">
    <ChevronRight />
  </Button>
);

// ✅ Loading State
export const LoadingButton = () => (
  <Button disabled>
    <Loader2 className="animate-spin mr-2" />
    Please wait
  </Button>
);

// ✅ Button as Next.js Link (asChild)
export const AsChild = () => (
  <Button asChild>
    <Link href="/login">Login</Link>
  </Button>
);

// ✅ Button Styled Link using `buttonVariants`
export const StyledLink = () => (
  <Link className={buttonVariants({ variant: 'outline' })} href="/login">
    Click here
  </Link>
);

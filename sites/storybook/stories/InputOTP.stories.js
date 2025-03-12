import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@easeful/components';

export default {
  title: 'Components/InputOTP',
  component: InputOTP,
  subcomponents: { InputOTPGroup, InputOTPSlot, InputOTPSeparator },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number', min: 4, max: 8, step: 1 },
      description: 'Defines the number of OTP input slots',
      defaultValue: 6
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    maxLength: 6
  }
};

const Template = ({ maxLength, ...args }) => (
  <InputOTP {...args} maxLength={maxLength}>
    {[...Array(maxLength)].map((_, i) => (
      <React.Fragment key={i}>
        {i === Math.floor(maxLength / 2) ? <InputOTPSeparator /> : null}
        <InputOTPGroup>
          <InputOTPSlot index={i} />
        </InputOTPGroup>
      </React.Fragment>
    ))}
  </InputOTP>
);

export const Default = Template.bind({});
Default.args = {
  maxLength: 6
};

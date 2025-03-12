import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@easeful/components';
import { Button } from '@easeful/components';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@easeful/components';

export default {
  title: 'Components/Form',
  component: Form,
  subcomponents: {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage
  },
  tags: ['autodocs'],
  argTypes: {
    username: {
      control: 'text',
      description: 'Username input field'
    }
  },
  args: {
    username: ''
  }
};

// Define the form validation schema
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(50)
});

const Template = ({ username }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username }
  });

  const onSubmit = (values) => {
    console.log('Form Submitted:', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};

import React, { useState } from 'react';
import { Button, Calendar } from '@easeful/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '../lib/utils/cn';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@easeful/components';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@easeful/components';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'Selection mode for the calendar'
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from adjacent months'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    mode: 'single',
    showOutsideDays: true
  }
};

const StandaloneTemplate = ({ mode, ...args }) => {
  const [selected, setSelected] = useState(() => {
    if (mode === 'multiple') return []; // Ensure an array for multiple selection
    if (mode === 'range') return { from: undefined, to: undefined }; // Object for range selection
    return undefined; // Single mode
  });

  const handleSelect = (date) => {
    if (!date) return; // Ensure valid date

    if (mode === 'multiple') {
      setSelected((prev) => {
        if (!Array.isArray(prev)) return [date]; // Ensure selected is an array
        return prev.some(
          (d) => d instanceof Date && d.getTime() === date.getTime()
        )
          ? prev.filter((d) => d.getTime() !== date.getTime()) // Remove if exists
          : [...prev, date]; // Add if not exists
      });
    } else if (mode === 'range') {
      setSelected(date); // React-Day-Picker will handle range selection
    } else {
      setSelected(date); // Single mode
    }
  };

  return (
    <Calendar
      {...args}
      mode={mode}
      selected={selected}
      onSelect={handleSelect}
      className="rounded-md border shadow"
    />
  );
};

export const Standalone = StandaloneTemplate.bind({});
Standalone.args = {
  mode: 'single'
};

export const MultipleSelection = StandaloneTemplate.bind({});
MultipleSelection.args = {
  mode: 'multiple'
};

export const RangeSelection = StandaloneTemplate.bind({});
RangeSelection.args = {
  mode: 'range'
};

const FormTemplate = (args) => {
  const FormSchema = z.object({
    dob: z.date({
      required_error: 'A date of birth is required.'
    })
  });

  const form = useForm({
    resolver: zodResolver(FormSchema)
  });

  function onSubmit(data) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    {...args}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
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

export const WithForm = FormTemplate.bind({});
WithForm.args = {};

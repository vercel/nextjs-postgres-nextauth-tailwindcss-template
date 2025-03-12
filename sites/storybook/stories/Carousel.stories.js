import React from 'react';
import { Card, CardContent, Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious } from '@easeful/components';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  subcomponents: {
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Defines the orientation of the carousel'
    },
    spacing: {
      control: 'select',
      options: ['none', 'small', 'medium'],
      description: 'Controls the spacing between items'
    },
    cardSize: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Defines the size of carousel cards'
    },
    loop: {
      control: 'boolean',
      description: 'Enables looping for the carousel'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    orientation: 'horizontal',
    spacing: 'none',
    cardSize: 'large',
    loop: false
  }
};

const Template = ({ orientation, spacing, cardSize, loop, ...args }) => {
  // Define spacing and size variations
  const spacingClasses = {
    none: '',
    small: '-ml-1',
    medium: '-ml-2'
  };

  const itemSpacingClasses = {
    none: '',
    small: 'pl-1 md:basis-1/2 lg:basis-1/3',
    medium: 'pl-2 md:basis-1/2 lg:basis-1/3'
  };

  const sizeClasses = {
    small: 'text-3xl p-6',
    large: 'text-4xl p-8'
  };

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: loop
      }}
      orientation={orientation}
      className={`w-full ${orientation === 'vertical' ? 'max-w-xs' : 'max-w-sm'}`}
      {...args}
    >
      <CarouselContent className={spacingClasses[spacing]}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className={`${itemSpacingClasses[spacing]} ${
              orientation === 'vertical' ? 'pt-1 md:basis-1/2' : ''
            }`}
          >
            <div className="p-1">
              <Card>
                <CardContent
                  className={`flex items-center justify-center aspect-square ${sizeClasses[cardSize]}`}
                >
                  <span className="font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export const HorizontalLarge = Template.bind({});
HorizontalLarge.args = {
  orientation: 'horizontal',
  cardSize: 'large',
  spacing: 'none'
};

export const HorizontalSmall = Template.bind({});
HorizontalSmall.args = {
  orientation: 'horizontal',
  cardSize: 'small',
  spacing: 'small'
};

export const SpacingBetweenCards = Template.bind({});
SpacingBetweenCards.args = {
  orientation: 'horizontal',
  cardSize: 'small',
  spacing: 'medium'
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  orientation: 'vertical',
  cardSize: 'small',
  spacing: 'small'
};

export const LoopingCarousel = Template.bind({});
LoopingCarousel.args = {
  orientation: 'horizontal',
  cardSize: 'large',
  spacing: 'none',
  loop: true
};

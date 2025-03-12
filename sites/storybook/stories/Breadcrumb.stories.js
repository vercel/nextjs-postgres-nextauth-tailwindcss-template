import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '@easeful/components';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@easeful/components';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter
} from '@easeful/components';
import { Button } from '@easeful/components';
import { Slash } from 'lucide-react';

// Storybook Config
export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separatorIcon: {
      control: {
        type: 'select',
        options: ['ChevronRight', 'Slash', 'Ellipsis']
      },
      description: 'Selects the separator icon'
    },
    useDropdown: {
      control: 'boolean',
      description: 'Use dropdown for middle breadcrumb'
    }
  },
  parameters: {
    layout: 'centered'
  }
};

// Template for Basic Stories
const Template = ({ separatorIcon, useDropdown }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator>
        {separatorIcon === 'Slash' ? (
          <Slash />
        ) : separatorIcon === 'Ellipsis' ? (
          <BreadcrumbEllipsis />
        ) : null}
      </BreadcrumbSeparator>

      {useDropdown ? (
        <>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                More
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Docs</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            {separatorIcon === 'Slash' ? (
              <Slash />
            ) : separatorIcon === 'Ellipsis' ? (
              <BreadcrumbEllipsis />
            ) : null}
          </BreadcrumbSeparator>
        </>
      ) : (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            {separatorIcon === 'Slash' ? (
              <Slash />
            ) : separatorIcon === 'Ellipsis' ? (
              <BreadcrumbEllipsis />
            ) : null}
          </BreadcrumbSeparator>
        </>
      )}

      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

export const Default = Template.bind({});
Default.args = {
  separatorIcon: 'ChevronRight',
  useDropdown: false
};

export const CustomSeparator = Template.bind({});
CustomSeparator.args = {
  separatorIcon: 'Slash',
  useDropdown: false
};

export const WithDropdown = Template.bind({});
WithDropdown.args = {
  separatorIcon: 'ChevronRight',
  useDropdown: true
};

export const WithEllipsis = Template.bind({});
WithEllipsis.args = {
  separatorIcon: 'Ellipsis',
  useDropdown: false
};

// ✅ Link Component Demo (Next.js Link)
export const WithNextLink = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/Users/razvanmatei/work/new/web/__delete__components">Components</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

// ✅ Fully Responsive Demo (With Drawer for Small Screens)
export const Responsive = () => {
  const items = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Documentation' },
    { href: '#', label: 'Building Your Application' },
    { href: '#', label: 'Data Fetching' },
    { label: 'Caching and Revalidating' }
  ];

  const ITEMS_TO_DISPLAY = 3;
  const [open, setOpen] = React.useState(false);
  const isDesktop =
    typeof window !== 'undefined' ? window.innerWidth >= 768 : false;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -2).map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href ? item.href : '#'}>
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle Menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {items.slice(1, -2).map((item, index) => (
                        <Link
                          key={index}
                          href={item.href ? item.href : '#'}
                          className="py-1 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}

        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

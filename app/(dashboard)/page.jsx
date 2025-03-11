import { Button } from '@/components/ui/button';
import TestClient, { testClient } from '@/components/testClient';
import { Accordion } from "@easeful/components";
import { AccordionContent, AccordionItem, AccordionTrigger } from '@easeful/components';
import React from 'react';

export default async function ProductsPage(props) {
  return (
    <div>
      <Button>Click me</Button>Hello World! {(await props.searchParams).q}
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match the other components'
            aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <TestClient/>
    </div>
  );
}

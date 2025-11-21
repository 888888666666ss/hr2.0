'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        className,
      )}
      formatters={{
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit'),
        months: cn('flex gap-4 flex-col md:flex-row relative'),
        month: cn('flex flex-col w-full gap-4'),
        nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between'),
        nav_button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none'
        ),
        nav_button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none'
        ),
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
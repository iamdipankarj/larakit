import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    defaultDate,
    oneYearEarlierDate,
    sixMonthsEarlierDate,
    startOfCurrentMonth,
    threeMonthsEarlierDate,
    yearToDate
} from '@/lib/time'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { type HTMLAttributes, useEffect, useState } from 'react'
import type { DateRange } from 'react-day-picker'

interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
    value?: DateRange
    onDateChange: (date: DateRange) => void
    hasPreset?: boolean
}

export function DateRangePicker({
    value,
    className,
    hasPreset = true,
    onDateChange
}: DatePickerProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const [date, setDate] = useState<DateRange | undefined>(defaultDate)

    useEffect(() => {
        if (value) {
            setDate(value)
        }
    }, [value])

    const handleDateChange = (range: DateRange | undefined) => {
        setDate(range)
    }

    const handleSubmit = () => {
        if (date) {
            setIsPopoverOpen(false)
            onDateChange({
                from: date.from || new Date(),
                to: date.to || new Date()
            })
        }
    }

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {dayjs(date.from).format('MMM D, YYYY')} -{' '}
                                    {dayjs(date.to).format('MMM D, YYYY')}
                                </>
                            ) : (
                                dayjs(date.from).format('MMM D, YYYY')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    {hasPreset ? (
                        <div className="p-2 pb-0">
                            <Select
                                onValueChange={(value) => {
                                    const months = Number.parseInt(value)
                                    if (months === 6) {
                                        handleDateChange(sixMonthsEarlierDate)
                                    } else if (months === 3) {
                                        handleDateChange(threeMonthsEarlierDate)
                                    } else if (months === 12) {
                                        handleDateChange(oneYearEarlierDate)
                                    } else if (months === 1) {
                                        handleDateChange(startOfCurrentMonth)
                                    } else if (months === 180) {
                                        handleDateChange(yearToDate)
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Preset" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="6">
                                        Last 6 Months
                                    </SelectItem>
                                    <SelectItem value="3">
                                        Last 3 Months
                                    </SelectItem>
                                    <SelectItem value="12">
                                        Last 1 Year
                                    </SelectItem>
                                    <SelectItem value="1">
                                        This Month
                                    </SelectItem>
                                    <SelectItem value="180">
                                        Year to Date (YTD)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    ) : null}
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={2}
                        toDate={new Date()}
                    />
                    <div className="px-4 pb-4 flex justify-end">
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

import { DateRangePicker } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { metricsDateRangeAtom } from '@/lib/store'
import {
    defaultDate,
    oneYearEarlierDate,
    sixMonthsEarlierDate,
    startOfCurrentMonth,
    threeMonthsEarlierDate,
    yearToDate
} from '@/lib/time'
import { useAtom } from 'jotai'
import { CalendarArrowDown, CalendarClock } from 'lucide-react'
import { type SyntheticEvent, useState } from 'react'
import type { DateRange } from 'react-day-picker'

export function AnalyticsDatePicker() {
    const [dateRange, setDateRange] = useState<DateRange>(defaultDate)
    const [, setAtomDateRange] = useAtom(metricsDateRangeAtom)

    const handleDateChange = (range: DateRange) => {
        setAtomDateRange(range)
        setDateRange(range)
    }

    const handlePreset = (range: DateRange) => (e: SyntheticEvent) => {
        handleDateChange(range)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <CalendarArrowDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Date Preset</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="[&>*]:cursor-pointer">
                        <DropdownMenuItem
                            onClick={handlePreset(sixMonthsEarlierDate)}
                        >
                            <CalendarClock />
                            <span>Last 6 Months</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handlePreset(threeMonthsEarlierDate)}
                        >
                            <CalendarClock />
                            <span>Last 3 Months</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handlePreset(startOfCurrentMonth)}
                        >
                            <CalendarClock />
                            <span>This Month</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handlePreset(oneYearEarlierDate)}
                        >
                            <CalendarClock />
                            <span>Last 1 Year</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handlePreset(yearToDate)}>
                            <CalendarClock />
                            <span>Year to Date (YTD)</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DateRangePicker
                value={dateRange}
                onDateChange={handleDateChange}
                hasPreset={false}
            />
        </>
    )
}

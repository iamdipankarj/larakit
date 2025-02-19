import dayjs from 'dayjs'
import type { DateRange } from 'react-day-picker'

export const dateOfSixMonthsEarlier = dayjs()
    .subtract(6, 'month')
    .startOf('month')

export const dateOfNow = dayjs()

export const defaultDate: DateRange = {
    from: dateOfSixMonthsEarlier.toDate(),
    to: dateOfNow.toDate()
}

export const sixMonthsEarlierDate: DateRange = {
    from: dateOfSixMonthsEarlier.toDate(),
    to: dateOfNow.toDate()
}

export const threeMonthsEarlierDate: DateRange = {
    from: dayjs().subtract(3, 'month').startOf('month').toDate(),
    to: dateOfNow.toDate()
}

export const startOfCurrentMonth: DateRange = {
    from: dayjs().startOf('month').toDate(),
    to: dateOfNow.toDate()
}

export const oneYearEarlierDate: DateRange = {
    from: dayjs().subtract(1, 'year').startOf('month').toDate(),
    to: dateOfNow.toDate()
}

export const yearToDate: DateRange = {
    from: dayjs().startOf('year').toDate(),
    to: dateOfNow.toDate()
}

"use client"

import { useState, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"
import ChevronLeft from "@/ui/icons/ChevronLeft"
import ChevronRight from "@/ui/icons/ChevronRight"

// Types
export type DateRange = {
  from: Date | null
  to: Date | null
}

interface CalendarBaseProps {
  disabled?: Date[] | ((date: Date) => boolean)
  booked?: Date[]
  min?: Date
  max?: Date
  className?: string
  showOutsideDays?: boolean
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

interface CalendarSingleProps extends CalendarBaseProps {
  mode?: "single"
  selected?: Date | null
  defaultSelected?: Date | null
  onSelect?: (date: Date | null) => void
}

interface CalendarRangeProps extends CalendarBaseProps {
  mode: "range"
  selected?: DateRange | null
  defaultSelected?: DateRange | null
  onSelect?: (range: DateRange | null) => void
}

interface CalendarMultipleProps extends CalendarBaseProps {
  mode: "multiple"
  selected?: Date[]
  defaultSelected?: Date[]
  onSelect?: (dates: Date[]) => void
}

type CalendarProps = CalendarSingleProps | CalendarRangeProps | CalendarMultipleProps

// Utility functions
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

const isDateInRange = (date: Date, from: Date | null, to: Date | null) => {
  if (!from || !to) return false
  const time = date.getTime()
  return time >= from.getTime() && time <= to.getTime()
}

const isDateDisabled = (
  date: Date,
  disabled?: Date[] | ((date: Date) => boolean),
  booked?: Date[],
  min?: Date,
  max?: Date
) => {
  if (min && date < min) return true
  if (max && date > max) return true

  if (booked?.some(d => isSameDay(d, date))) return true

  if (typeof disabled === "function") {
    return disabled(date)
  }

  if (Array.isArray(disabled)) {
    return disabled.some(d => isSameDay(d, date))
  }

  return false
}

const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function Calendar(props: CalendarProps) {
  const {
    mode = "single",
    selected: controlledSelected,
    onSelect,
    disabled,
    booked,
    min,
    max,
    className,
    showOutsideDays = true,
    weekStartsOn = 0,
  } = props

  // Get defaultSelected based on mode
  const defaultSelected = "defaultSelected" in props ? props.defaultSelected : undefined

  // Internal state for uncontrolled mode
  const [internalSingleDate, setInternalSingleDate] = useState<Date | null>(
    mode === "single" ? (defaultSelected as Date | null) ?? null : null
  )
  const [internalRange, setInternalRange] = useState<DateRange>(
    mode === "range" ? (defaultSelected as DateRange | null) ?? { from: null, to: null } : { from: null, to: null }
  )
  const [internalMultiple, setInternalMultiple] = useState<Date[]>(
    mode === "multiple" ? (defaultSelected as Date[]) ?? [] : []
  )

  // Determine if controlled or uncontrolled
  const isControlled = controlledSelected !== undefined

  // Get the actual selected value (controlled or uncontrolled)
  const selected = isControlled
    ? controlledSelected
    : mode === "single"
      ? internalSingleDate
      : mode === "range"
        ? internalRange
        : internalMultiple

  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  // Reorder days based on weekStartsOn
  const orderedDays = useMemo(() => {
    const days = [...DAYS_SHORT]
    const before = days.splice(0, weekStartsOn)
    return [...days, ...before]
  }, [weekStartsOn])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const adjustedFirstDay = (firstDay - weekStartsOn + 7) % 7

    const days: { date: Date; isCurrentMonth: boolean }[] = []

    // Previous month days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(prevYear, prevMonth, daysInPrevMonth - i),
        isCurrentMonth: false,
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        isCurrentMonth: true,
      })
    }

    // Next month days
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    const remainingDays = 42 - days.length // 6 rows × 7 days

    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(nextYear, nextMonth, i),
        isCurrentMonth: false,
      })
    }

    return days
  }, [currentMonth, currentYear, weekStartsOn])

  const goToPreviousMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
  }, [currentMonth])

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
  }, [currentMonth])

  const handleDateClick = useCallback((date: Date) => {
    if (isDateDisabled(date, disabled, booked, min, max)) return

    if (mode === "single") {
      // Update internal state (for uncontrolled mode)
      if (!isControlled) {
        setInternalSingleDate(date)
      }
      // Call onSelect callback if provided
      (onSelect as ((date: Date | null) => void) | undefined)?.(date)
    } else if (mode === "multiple") {
      const currentSelected = (selected as Date[]) || []
      const isAlreadySelected = currentSelected.some(d => isSameDay(d, date))

      let newSelection: Date[]
      if (isAlreadySelected) {
        newSelection = currentSelected.filter(d => !isSameDay(d, date))
      } else {
        newSelection = [...currentSelected, date]
      }

      // Update internal state (for uncontrolled mode)
      if (!isControlled) {
        setInternalMultiple(newSelection)
      }
      // Call onSelect callback if provided
      (onSelect as ((dates: Date[]) => void) | undefined)?.(newSelection)
    } else if (mode === "range") {
      const range = (selected as DateRange) || { from: null, to: null }

      let newRange: DateRange
      if (!range.from || (range.from && range.to)) {
        // Start new range
        newRange = { from: date, to: null }
      } else {
        // Complete range
        if (date < range.from) {
          newRange = { from: date, to: range.from }
        } else {
          newRange = { from: range.from, to: date }
        }
      }

      // Update internal state (for uncontrolled mode)
      if (!isControlled) {
        setInternalRange(newRange)
      }
      // Call onSelect callback if provided
      (onSelect as ((range: DateRange | null) => void) | undefined)?.(newRange)
    }
  }, [mode, selected, onSelect, disabled, booked, min, max, isControlled])

  const isSelected = useCallback((date: Date) => {
    if (!selected) return false

    if (mode === "single") {
      return isSameDay(date, selected as Date)
    } else if (mode === "multiple") {
      return (selected as Date[]).some(d => isSameDay(d, date))
    } else if (mode === "range") {
      const range = selected as DateRange
      if (range.from && isSameDay(date, range.from)) return true
      if (range.to && isSameDay(date, range.to)) return true
      return false
    }

    return false
  }, [mode, selected])

  const isInRange = useCallback((date: Date) => {
    if (mode !== "range") return false

    const range = selected as DateRange
    if (!range?.from) return false

    // If we have both from and to, check if date is between
    if (range.to) {
      return isDateInRange(date, range.from, range.to) && !isSameDay(date, range.from) && !isSameDay(date, range.to)
    }

    // If only from and we're hovering, show preview range
    if (hoverDate) {
      const start = range.from < hoverDate ? range.from : hoverDate
      const end = range.from < hoverDate ? hoverDate : range.from
      return isDateInRange(date, start, end) && !isSameDay(date, range.from) && !isSameDay(date, hoverDate)
    }

    return false
  }, [mode, selected, hoverDate])

  const isRangeStart = useCallback((date: Date) => {
    if (mode !== "range") return false
    const range = selected as DateRange
    return range?.from ? isSameDay(date, range.from) : false
  }, [mode, selected])

  const isRangeEnd = useCallback((date: Date) => {
    if (mode !== "range") return false
    const range = selected as DateRange
    return range?.to ? isSameDay(date, range.to) : false
  }, [mode, selected])

  return (
    <div className={cn("p-3 bg-background border border-border rounded-lg w-fit", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="p-1.5 hover:bg-accent rounded-md transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="font-medium text-sm">
          {MONTHS[currentMonth]} {currentYear}
        </div>

        <button
          type="button"
          onClick={goToNextMonth}
          className="p-1.5 hover:bg-accent rounded-md transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 mb-2">
        {orderedDays.map((day) => (
          <div
            key={day}
            className="h-8 w-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const isDisabled = isDateDisabled(date, disabled, booked, min, max)
          const isBooked = booked?.some(d => isSameDay(d, date))
          const isToday = isSameDay(date, today)
          const selected = isSelected(date)
          const inRange = isInRange(date)
          const rangeStart = isRangeStart(date)
          const rangeEnd = isRangeEnd(date)

          if (!showOutsideDays && !isCurrentMonth) {
            return <div key={index} className="h-8 w-8" />
          }

          return (
            <button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => mode === "range" && setHoverDate(date)}
              onMouseLeave={() => mode === "range" && setHoverDate(null)}
              className={cn(
                "h-8 w-8 text-sm rounded-md transition-colors relative",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                !isCurrentMonth && "text-muted-foreground/50",
                isCurrentMonth && !selected && !isDisabled && "hover:bg-accent",
                isToday && !selected && "text-primary",
                selected && "bg-primary text-primary-foreground hover:bg-primary/90",
                inRange && "bg-accent",
                rangeStart && "rounded-r-none",
                rangeEnd && "rounded-l-none",
                inRange && !rangeStart && !rangeEnd && "rounded-none",
                isDisabled && "opacity-50 cursor-not-allowed",
                isBooked && "line-through decoration-2"
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { Calendar } from "@/ui/components/Calendar"

interface CalendarDemoProps {
  mode?: "single" | "range" | "multiple"
  variant?: "disabled" | "booked" | "minmax" | "defaultSelected" | "rangeDefault"
}

export function CalendarDemo({ mode, variant }: CalendarDemoProps) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  if (variant === "disabled") {
    return (
      <Calendar
        disabled={[
          new Date(year, month, 15),
          new Date(year, month, 20),
        ]}
      />
    )
  }

  if (variant === "booked") {
    return (
      <Calendar
        booked={[
          new Date(year, month, 10),
          new Date(year, month, 11),
          new Date(year, month, 12),
        ]}
      />
    )
  }

  if (variant === "minmax") {
    return (
      <Calendar
        min={new Date(year, month, 5)}
        max={new Date(year, month, 25)}
      />
    )
  }

  if (variant === "defaultSelected") {
    return <Calendar defaultSelected={now} />
  }

  if (variant === "rangeDefault") {
    return (
      <Calendar
        mode="range"
        defaultSelected={{
          from: new Date(year, month, 10),
          to: new Date(year, month, 15),
        }}
      />
    )
  }

  if (mode === "range") {
    return <Calendar mode="range" />
  }

  if (mode === "multiple") {
    return <Calendar mode="multiple" />
  }

  return <Calendar />
}

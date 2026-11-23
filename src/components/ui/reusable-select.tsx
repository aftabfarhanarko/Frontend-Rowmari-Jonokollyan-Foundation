"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface SelectOption<T = string> {
  label: React.ReactNode
  value: T
  disabled?: boolean
  description?: React.ReactNode
  icon?: React.ReactNode
}

export interface SelectGroupOption<T = string> {
  groupLabel: string
  items: (SelectOption<T> | string)[]
}

export interface ReusableSelectProps<T = string> {
  /**
   * Array of options or grouped options.
   * Can be an array of objects `{ label, value }`, simple strings `["Apple", "Banana"]`,
   * or groups `[{ groupLabel: "Fruits", items: [...] }]`
   */
  items: (SelectOption<T> | string)[] | SelectGroupOption<T>[]

  /** Current controlled value */
  value?: T | null
  /** Default uncontrolled value */
  defaultValue?: T | null
  /** Callback triggered when a new item is selected */
  onValueChange?: (value: T) => void

  /** Placeholder text shown when no item is selected */
  placeholder?: string
  /** Form field label displayed above the select trigger */
  label?: React.ReactNode
  /** Optional group label inside the dropdown menu (for flat lists) */
  groupLabel?: string
  /** Helper text shown below the select */
  helperText?: React.ReactNode
  /** Error message (displays in red and highlights border) */
  error?: string

  /** Field name for HTML forms */
  name?: string
  /** ID for accessibility label linking */
  id?: string
  /** Whether the field is disabled */
  disabled?: boolean
  /** Whether the field is required */
  required?: boolean
  /** Trigger button size */
  size?: "sm" | "default"

  /** Whether the select trigger expands to 100% width */
  fullWidth?: boolean

  /** Container wrapper class name */
  className?: string
  /** Select trigger class name */
  triggerClassName?: string
  /** Dropdown popup content class name */
  contentClassName?: string
}

export function ReusableSelect<T extends string | number | null = string>({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "নির্বাচন করুন...",
  label,
  groupLabel,
  helperText,
  error,
  name,
  id,
  disabled = false,
  required = false,
  size = "default",
  fullWidth = true,
  className,
  triggerClassName,
  contentClassName,
}: ReusableSelectProps<T>) {
  const generatedId = React.useId()
  const selectId = id || generatedId

  // Normalize items to check if they are grouped or flat
  const isGrouped = React.useMemo(() => {
    if (!items || items.length === 0) return false
    const first = items[0]
    return typeof first === "object" && first !== null && "groupLabel" in first && "items" in first
  }, [items])

  // Normalize flat items to { label, value }
  const normalizeItem = (item: SelectOption<T> | string): SelectOption<T> => {
    if (typeof item === "string" || typeof item === "number") {
      return { label: String(item), value: item as unknown as T }
    }
    return item
  }

  // Flattened items for Base UI Select's internal lookup dictionary
  const baseUiItems = React.useMemo(() => {
    if (isGrouped) {
      const groups = items as SelectGroupOption<T>[]
      const flatList: Array<{ label: React.ReactNode; value: any }> = []
      groups.forEach((g) => {
        g.items.forEach((it) => {
          const norm = normalizeItem(it)
          flatList.push({ label: norm.label, value: norm.value })
        })
      })
      return flatList
    }

    return (items as (SelectOption<T> | string)[]).map((it) => {
      const norm = normalizeItem(it)
      return { label: norm.label, value: norm.value }
    })
  }, [items, isGrouped])

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {/* Optional Form Label */}
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "block text-xs font-medium text-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}

      {/* Select Component */}
      <Select
        id={selectId}
        name={name}
        items={baseUiItems}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(val: any) => onValueChange?.(val)}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          size={size}
          aria-invalid={!!error}
          className={cn(
            fullWidth ? "w-full" : "w-fit min-w-44",
            error && "border-destructive focus-visible:ring-destructive/30",
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className={cn("min-w-44", contentClassName)}>
          {isGrouped ? (
            // Grouped Options Rendering
            (items as SelectGroupOption<T>[]).map((group, gIdx) => (
              <React.Fragment key={group.groupLabel || `group-${gIdx}`}>
                {gIdx > 0 && <SelectSeparator />}
                <SelectGroup>
                  {group.groupLabel && <SelectLabel>{group.groupLabel}</SelectLabel>}
                  {group.items.map((it, iIdx) => {
                    const norm = normalizeItem(it)
                    const itemKey = norm.value !== null && norm.value !== undefined ? String(norm.value) : `item-${iIdx}`
                    return (
                      <SelectItem
                        key={itemKey}
                        value={norm.value}
                        disabled={norm.disabled}
                      >
                        <div className="flex items-center gap-2">
                          {norm.icon && <span className="shrink-0">{norm.icon}</span>}
                          <div className="flex flex-col">
                            <span>{norm.label}</span>
                            {norm.description && (
                              <span className="text-xs text-muted-foreground">{norm.description}</span>
                            )}
                          </div>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </React.Fragment>
            ))
          ) : (
            // Flat Options Rendering
            <SelectGroup>
              {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
              {(items as (SelectOption<T> | string)[]).map((it, idx) => {
                const norm = normalizeItem(it)
                const itemKey = norm.value !== null && norm.value !== undefined ? String(norm.value) : `item-${idx}`
                return (
                  <SelectItem
                    key={itemKey}
                    value={norm.value}
                    disabled={norm.disabled}
                  >
                    <div className="flex items-center gap-2">
                      {norm.icon && <span className="shrink-0">{norm.icon}</span>}
                      <div className="flex flex-col">
                        <span>{norm.label}</span>
                        {norm.description && (
                          <span className="text-xs text-muted-foreground">{norm.description}</span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>

      {/* Helper text or Error message */}
      {error ? (
        <p className="text-xs font-medium text-destructive">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  )
}

export default ReusableSelect

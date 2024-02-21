import { Stack, TextField, Typography } from "@mui/material"
import { TextFieldProps } from "@mui/material/TextField"
import { isEmpty } from "lodash"
import React, { ReactElement } from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
export interface ControlledTextFieldProps<FieldValueProps extends FieldValues>
  extends UseControllerProps<FieldValueProps> {
  label?: string | ReactElement<any, string | React.JSXElementConstructor<any>>
  required?: boolean
  autoFocus?: boolean
  maxCharCount?: number
  placeholder?: string
  disabled?: boolean
  TextFieldProps?: Omit<TextFieldProps, "required" | "placeholder" | "label">
  rows?: number
  fullWidth?: boolean
}

function ControlledTextField<FieldValueProps extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  required = false,
  autoFocus = false,
  maxCharCount,
  placeholder = "",
  TextFieldProps = {},
  rows = 1,
  fullWidth = false,
}: ControlledTextFieldProps<FieldValueProps>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        fieldState: { error },
        field, // { onChange, onBlur, value, ref },
      }) => (
        <TextField
          fullWidth={fullWidth}
          error={!isEmpty(error)}
          id={name}
          required={required}
          autoFocus={autoFocus}
          placeholder={placeholder}
          label={label}
          disabled={disabled}
          multiline={rows > 1}
          rows={rows}
          {...field} // { onChange, onBlur, value, ref }
          sx={{
            "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
              padding: "6px 10px 6px 6px",
              backgroundColor: "#F9FAFB",
            },
            "& .MuiOutlinedInput-root": {
              height: "unset",
            },
          }}
          helperText={
            <Stack
              component="span"
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              {(error?.type !== "max" || !maxCharCount) && (
                <Typography variant="caption">
                  {error?.message ?? ""}
                </Typography>
              )}

              {maxCharCount && (
                <Typography
                  variant="caption"
                  color={error?.type !== "max" ? "default" : "error"}
                  sx={{
                    flexGrow: 1,
                    whiteSpace: "nowrap",
                    textAlign: "right",
                  }}
                >
                  {`Character Count: ${
                    (field.value && field.value.length) || 0
                  } / ${maxCharCount}`}
                </Typography>
              )}
            </Stack>
          }
          {...TextFieldProps}
          FormHelperTextProps={{
            ...TextFieldProps.FormHelperTextProps,
            sx: {
              mx: 0,
              ...TextFieldProps.FormHelperTextProps?.sx,
            },
          }}
        />
      )}
    />
  )
}

export { ControlledTextField }

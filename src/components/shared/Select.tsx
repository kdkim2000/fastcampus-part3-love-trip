// src/components/shared/Select.tsx

import { forwardRef, SelectHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'

import Flex from './Flex'
import Text from './Text'

export interface Option {
  label: string
  value: string | number | undefined
}

// ✅ placeholder 속성 추가
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string  // ✅ 추가
}

const BaseSelect = styled.select`
  height: 52px;
  border: 1px solid ${colors.gray};
  border-radius: 6px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value="">
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})

export default Select

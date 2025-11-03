# 📚 React 완전 정복 가이드

> **LoveTrip 프로젝트를 통해 배우는 React 실전 개발**
>
> 이 문서는 React 초보자부터 중급 개발자까지, React의 기초 개념부터 고급 최적화 기법까지 체계적으로 학습할 수 있도록 구성된 교육 자료입니다. 모든 예제는 실제 프로젝트 코드를 기반으로 작성되었습니다.

---

## 📑 목차

### Part 1: React 기초
- [Chapter 1: React 시작하기](#chapter-1-react-시작하기)
- [Chapter 2: 컴포넌트와 Props](#chapter-2-컴포넌트와-props)
- [Chapter 3: State와 이벤트 처리](#chapter-3-state와-이벤트-처리)

### Part 2: React Hooks 완전정복
- [Chapter 4: useState - 상태 관리의 기본](#chapter-4-usestate---상태-관리의-기본)
- [Chapter 5: useEffect - 생명주기와 부수효과](#chapter-5-useeffect---생명주기와-부수효과)
- [Chapter 6: useCallback과 useMemo - 성능 최적화](#chapter-6-usecallback과-usememo---성능-최적화)
- [Chapter 7: useRef - DOM 접근과 값 보관](#chapter-7-useref---dom-접근과-값-보관)
- [Chapter 8: useContext - 전역 상태 관리](#chapter-8-usecontext---전역-상태-관리)

### Part 3: 실전 React 패턴
- [Chapter 9: Custom Hooks - 로직 재사용](#chapter-9-custom-hooks---로직-재사용)
- [Chapter 10: React Router - SPA 라우팅](#chapter-10-react-router---spa-라우팅)
- [Chapter 11: 데이터 페칭과 React Query](#chapter-11-데이터-페칭과-react-query)
- [Chapter 12: Form 관리와 React Hook Form](#chapter-12-form-관리와-react-hook-form)

### Part 4: 고급 주제
- [Chapter 13: CSS-in-JS와 Emotion](#chapter-13-css-in-js와-emotion)
- [Chapter 14: 성능 최적화 전략](#chapter-14-성능-최적화-전략)
- [Chapter 15: Firebase 연동](#chapter-15-firebase-연동)
- [Chapter 16: 프로젝트 구조와 Best Practices](#chapter-16-프로젝트-구조와-best-practices)

---

# Part 1: React 기초

## Chapter 1: React 시작하기

### 1.1 React란 무엇인가?

React는 Facebook(현 Meta)에서 개발한 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. React의 핵심 개념은 다음과 같습니다:

1. **컴포넌트 기반 아키텍처**: UI를 독립적이고 재사용 가능한 조각으로 분리
2. **선언적 프로그래밍**: "무엇을" 렌더링할지 선언하면 React가 "어떻게" 업데이트할지 처리
3. **Virtual DOM**: 실제 DOM 조작을 최소화하여 성능 최적화

### 1.2 JSX (JavaScript XML)

JSX는 JavaScript를 확장한 문법으로, HTML과 유사한 구조로 UI를 표현할 수 있게 해줍니다.

**예제: `src/components/shared/Button.tsx`**

```typescript
import { ButtonHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Colors, colors } from '@styles/colorPalette'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Colors
  size?: 'small' | 'medium' | 'large'
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

function Button({
  color = 'primary',
  size = 'medium',
  weak,
  full,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      color={color}
      size={size}
      weak={weak}
      full={full}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
```

**JSX 핵심 개념:**

1. **JavaScript 표현식 삽입**: 중괄호 `{}`를 사용하여 JavaScript 코드 실행
2. **속성(Props) 전달**: HTML 속성과 유사하게 컴포넌트에 데이터 전달
3. **조건부 렌더링**: JavaScript의 조건문을 활용

---

# Part 2: React Hooks 완전정복

## Chapter 4: useState - 상태 관리의 기본

`useState`는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 Hook입니다.

**기본 문법:**

```typescript
const [state, setState] = useState<Type>(initialValue)
```

### 실전 예제: 인증 상태 관리

**`src/components/auth/AuthGuard.tsx`**

```typescript
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser != null) {
        const 사용자 = {
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          displayName: firebaseUser.displayName ?? '',
          photoURL: firebaseUser.photoURL ?? '',
        }
        setUser(사용자)
      } else {
        setUser(null)
      }
      setInitialize(true)
    })

    return () => unsubscribe()
  }, [])

  if (initialize === false) return null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
```

---

# Part 3: 실전 React 패턴

## Chapter 11: 데이터 페칭과 React Query

### 11.1 React Query란?

TanStack Query (구 React Query)는 서버 상태 관리를 위한 강력한 라이브러리입니다. 데이터 페칭, 캐싱, 동기화, 업데이트를 자동으로 처리합니다.

**핵심 기능:**
- 자동 캐싱 및 재검증
- 백그라운드 업데이트
- 중복 요청 제거
- 페이지네이션 및 무한 스크롤
- Optimistic 업데이트

### 11.2 QueryClient 설정

**예제: `src/index.tsx`**

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,  // 실패 시 재시도 횟수
      refetchOnWindowFocus: false,  // 창 포커스 시 재검증 비활성화
      staleTime: 1000 * 60 * 5,  // 5분 동안 데이터 신선함 유지
    },
  },
})

root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
)
```

### 11.3 useQuery - 데이터 조회

**예제: `src/components/hotelList/hooks/useHotels.ts`**

```typescript
import { useQuery } from '@tanstack/react-query'
import { getHotels } from '@remote/hotel'

function useHotels() {
  return useQuery({
    queryKey: ['hotels'],  // 캐시 키
    queryFn: getHotels,    // 데이터 페칭 함수
  })
}

export default useHotels
```

**사용 예시:**

```typescript
function HotelListPage() {
  const { data, isLoading, error, refetch } = useHotels()

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>
  }

  return (
    <div>
      <button onClick={() => refetch()}>새로고침</button>
      {data?.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

### 11.4 useQuery의 반환값

```typescript
const {
  data,           // 성공 시 데이터
  error,          // 에러 객체
  isLoading,      // 최초 로딩 중
  isFetching,     // 백그라운드 페칭 중
  isError,        // 에러 발생 여부
  isSuccess,      // 성공 여부
  refetch,        // 수동 재요청 함수
} = useQuery({ ... })
```

### 11.5 조건부 쿼리 (enabled)

**예제: `src/components/hotel/hooks/useHotel.ts`**

```typescript
function useHotel({ id }: { id: string }) {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotel(id),
    enabled: !!id,  // id가 있을 때만 쿼리 실행
  })
}
```

### 11.6 useMutation - 데이터 변경

**예제: `src/components/hotel/hooks/useReview.ts`**

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { writeReview, removeReview } from '@remote/review'

function useReview({ hotelId }: { hotelId: string }) {
  const client = useQueryClient()
  const user = useUser()

  // 리뷰 작성
  const { mutateAsync: write } = useMutation({
    mutationFn: writeReview,
    onSuccess: () => {
      // 성공 시 리뷰 목록 캐시 무효화 (자동 재조회)
      client.invalidateQueries({
        queryKey: ['reviews', hotelId],
      })
    },
    onError: (error) => {
      alert('리뷰 작성에 실패했습니다.')
    },
  })

  // 리뷰 삭제
  const { mutate: remove } = useMutation({
    mutationFn: removeReview,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['reviews', hotelId],
      })
    },
  })

  const handleWrite = async (text: string) => {
    if (user == null) {
      alert('로그인이 필요합니다.')
      return
    }

    await write({
      hotelId,
      userId: user.uid,
      text,
    })
  }

  return { write: handleWrite, remove }
}
```

**핵심 학습 포인트:**

1. **mutateAsync vs mutate**:
   - `mutateAsync`: Promise 반환, await 사용 가능
   - `mutate`: Promise 미반환, 콜백만 사용

2. **캐시 무효화**: `invalidateQueries`로 관련 데이터 자동 재조회

3. **낙관적 업데이트**: UI를 먼저 업데이트하고 서버 응답을 나중에 처리

### 11.7 Optimistic Update (낙관적 업데이트)

```typescript
const { mutate } = useMutation({
  mutationFn: updateHotelLike,
  onMutate: async (newLike) => {
    // 이전 쿼리 취소
    await queryClient.cancelQueries({ queryKey: ['hotel', hotelId] })

    // 이전 데이터 스냅샷 저장
    const previousHotel = queryClient.getQueryData(['hotel', hotelId])

    // UI 즉시 업데이트
    queryClient.setQueryData(['hotel', hotelId], (old) => ({
      ...old,
      isLiked: newLike,
    }))

    return { previousHotel }
  },
  onError: (err, newLike, context) => {
    // 에러 시 롤백
    queryClient.setQueryData(['hotel', hotelId], context.previousHotel)
  },
  onSettled: () => {
    // 완료 후 재검증
    queryClient.invalidateQueries({ queryKey: ['hotel', hotelId] })
  },
})
```

### 11.8 무한 스크롤 (useInfiniteQuery)

**예제: `src/components/hotelList/hooks/useHotels.ts`**

```typescript
import { useInfiniteQuery } from '@tanstack/react-query'

function useInfiniteHotels() {
  return useInfiniteQuery({
    queryKey: ['hotels'],
    queryFn: ({ pageParam = 0 }) => getHotels({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지 번호 반환, 없으면 undefined
      return lastPage.hasMore ? allPages.length : undefined
    },
    initialPageParam: 0,
  })
}

// 사용
function HotelList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHotels()

  return (
    <div>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.hotels.map(hotel => (
            <HotelItem key={hotel.id} hotel={hotel} />
          ))}
        </React.Fragment>
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </button>
      )}
    </div>
  )
}
```

### 11.9 Query Key 전략

```typescript
// 1. 목록 조회
['hotels']
['hotels', { filter: 'popular' }]

// 2. 상세 조회
['hotel', hotelId]
['hotel', hotelId, 'details']

// 3. 관계 데이터
['hotel', hotelId, 'reviews']
['hotel', hotelId, 'rooms']

// 4. 사용자별 데이터
['likes', userId]
['reservations', userId]
```

**Query Key 패턴:**
- 배열 형태로 작성
- 계층 구조로 구성
- 필터/옵션은 객체로 전달

---

## Chapter 12: Form 관리와 React Hook Form

### 12.1 React Hook Form이란?

React Hook Form은 성능이 뛰어난 폼 관리 라이브러리입니다. 비제어 컴포넌트 방식으로 리렌더링을 최소화합니다.

**핵심 특징:**
- 최소한의 리렌더링
- 간단한 validation
- TypeScript 지원
- 작은 번들 사이즈

### 12.2 기본 사용법

```typescript
import { useForm } from 'react-hook-form'

interface FormData {
  email: string
  password: string
  name: string
}

function SignupForm() {
  const {
    register,       // input 등록
    handleSubmit,   // 제출 핸들러
    formState: { errors, isSubmitting },  // 폼 상태
    watch,          // 필드 값 관찰
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    // API 호출
    await signup(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '올바른 이메일 형식이 아닙니다',
          },
        })}
        placeholder="이메일"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: {
            value: 8,
            message: '비밀번호는 8자 이상이어야 합니다',
          },
        })}
        type="password"
        placeholder="비밀번호"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '제출 중...' : '회원가입'}
      </button>
    </form>
  )
}
```

### 12.3 Validation 규칙

```typescript
register('fieldName', {
  required: '필수 입력 항목입니다',
  minLength: { value: 5, message: '최소 5자 이상' },
  maxLength: { value: 20, message: '최대 20자 이하' },
  min: { value: 18, message: '18세 이상' },
  max: { value: 100, message: '100 이하' },
  pattern: {
    value: /^[0-9]+$/,
    message: '숫자만 입력 가능합니다',
  },
  validate: (value) => {
    return value !== 'admin' || '예약어는 사용할 수 없습니다'
  },
})
```

### 12.4 watch - 필드 값 관찰

```typescript
function ReservationForm() {
  const { register, watch } = useForm()

  // 특정 필드 관찰
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  // 전체 폼 데이터 관찰
  const formData = watch()

  // 여러 필드 관찰
  const [checkIn, checkOut] = watch(['checkIn', 'checkOut'])

  // 계산된 값 표시
  const nights = useMemo(() => {
    if (!startDate || !endDate) return 0
    const diff = new Date(endDate) - new Date(startDate)
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }, [startDate, endDate])

  return (
    <form>
      <input {...register('startDate')} type="date" />
      <input {...register('endDate')} type="date" />
      <div>총 {nights}박</div>
    </form>
  )
}
```

### 12.5 Custom Hook과 통합

**예제: `src/hooks/useReservationForm.ts`**

```typescript
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { createReservation } from '@remote/reservation'

interface ReservationFormData {
  hotelId: string
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
}

function useReservationForm() {
  const navigate = useNavigate()
  const user = useUser()

  const form = useForm<ReservationFormData>({
    defaultValues: {
      guests: 1,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createReservation,
    onSuccess: (reservation) => {
      alert('예약이 완료되었습니다!')
      navigate(`/reservation/${reservation.id}`)
    },
    onError: (error) => {
      alert('예약에 실패했습니다.')
      console.error(error)
    },
  })

  const onSubmit = (data: ReservationFormData) => {
    if (!user) {
      alert('로그인이 필요합니다.')
      navigate('/signin')
      return
    }

    mutate({
      ...data,
      userId: user.uid,
    })
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  }
}

export default useReservationForm
```

### 12.6 forwardRef와 함께 사용

**예제: React Hook Form과 TextField 통합**

```typescript
import { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TextFieldProps {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, registration, ...props }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...registration} {...props} />
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    )
  }
)

// 사용
function MyForm() {
  const { register, formState: { errors } } = useForm()

  return (
    <form>
      <TextField
        label="이메일"
        error={errors.email?.message}
        registration={register('email', { required: '필수 입력' })}
      />
    </form>
  )
}
```

### 12.7 복잡한 폼 관리

```typescript
function ComplexForm() {
  const { register, control, watch, setValue } = useForm()

  // 동적 필드 추가/제거
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guests',
  })

  return (
    <form>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`guests.${index}.name`, {
              required: '이름을 입력해주세요',
            })}
            placeholder="게스트 이름"
          />
          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: '' })}
      >
        게스트 추가
      </button>
    </form>
  )
}
```

---

# Part 4: 고급 주제

## Chapter 13: CSS-in-JS와 Emotion

### 13.1 Emotion이란?

Emotion은 JavaScript로 CSS를 작성하는 CSS-in-JS 라이브러리입니다. 동적 스타일링, 테마, 컴포넌트 기반 스타일링을 쉽게 구현할 수 있습니다.

**장점:**
- 컴포넌트 스코프 스타일 (이름 충돌 방지)
- 동적 스타일링
- TypeScript 지원
- 자동 vendor prefix
- 번들 최적화

### 13.2 styled 컴포넌트

**예제: `src/components/shared/Button.tsx`**

```typescript
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Colors, colors } from '@styles/colorPalette'

interface ButtonProps {
  color?: Colors
  size?: 'small' | 'medium' | 'large'
  full?: boolean
}

const Button = styled.button<ButtonProps>`
  /* 기본 스타일 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  /* Props 기반 동적 스타일 */
  background-color: ${({ color = 'primary' }) => colors[color]};

  width: ${({ full }) => (full ? '100%' : 'auto')};

  /* size prop에 따른 스타일 */
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: 14px;
        `
      case 'large':
        return css`
          padding: 16px 32px;
          font-size: 18px;
        `
      default:
        return css`
          padding: 12px 24px;
          font-size: 16px;
        `
    }
  }}

  /* 호버 효과 */
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export default Button
```

### 13.3 css prop 사용

```typescript
import { css } from '@emotion/react'

function Component() {
  return (
    <div
      css={css`
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 8px;

        &:hover {
          background-color: #e0e0e0;
        }
      `}
    >
      Content
    </div>
  )
}
```

### 13.4 Theme 시스템

**예제: `src/styles/theme.ts`**

```typescript
export const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gray: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: {
      base: "'Pretendard', -apple-system, sans-serif",
      mono: "'Fira Code', monospace",
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
}

export type Theme = typeof theme
```

**Theme Provider 사용:**

```typescript
import { ThemeProvider } from '@emotion/react'
import { theme } from '@styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  )
}

// 컴포넌트에서 theme 사용
const Container = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`
```

### 13.5 Global Styles

**예제: `src/styles/globalStyles.ts`**

```typescript
import { css, Global } from '@emotion/react'

export const globalStyles = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html,
      body {
        font-family: 'Pretendard', -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        border: none;
        background: none;
        cursor: pointer;
      }

      ul,
      ol {
        list-style: none;
      }
    `}
  />
)
```

### 13.6 미디어 쿼리 헬퍼

```typescript
// src/styles/media.ts
const breakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
}

export const media = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
}

// 사용
const ResponsiveBox = styled.div`
  padding: 16px;

  ${media.tablet} {
    padding: 24px;
  }

  ${media.desktop} {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
`
```

---

## Chapter 14: 성능 최적화 전략

### 14.1 React.memo - 불필요한 리렌더링 방지

```typescript
import { memo } from 'react'

interface HotelItemProps {
  hotel: Hotel
  onLike: (hotelId: string) => void
}

// props가 변경되지 않으면 리렌더링하지 않음
const HotelItem = memo(function HotelItem({ hotel, onLike }: HotelItemProps) {
  console.log('HotelItem 렌더링:', hotel.id)

  return (
    <div>
      <h3>{hotel.name}</h3>
      <button onClick={() => onLike(hotel.id)}>찜하기</button>
    </div>
  )
})

// 커스텀 비교 함수 (선택사항)
const HotelItemWithCustomCompare = memo(
  HotelItem,
  (prevProps, nextProps) => {
    // true 반환 시 리렌더링 하지 않음
    return prevProps.hotel.id === nextProps.hotel.id &&
           prevProps.hotel.isLiked === nextProps.hotel.isLiked
  }
)
```

### 14.2 Code Splitting - 동적 import

```typescript
import { lazy, Suspense } from 'react'

// 동적 import로 컴포넌트 분리
const HotelDetailPage = lazy(() => import('@pages/HotelDetail'))
const ReservationPage = lazy(() => import('@pages/Reservation'))

function App() {
  return (
    <Routes>
      <Route
        path="/hotel/:id"
        element={
          <Suspense fallback={<Loading />}>
            <HotelDetailPage />
          </Suspense>
        }
      />
      <Route
        path="/reservation"
        element={
          <Suspense fallback={<Loading />}>
            <ReservationPage />
          </Suspense>
        }
      />
    </Routes>
  )
}
```

### 14.3 이미지 최적화

**지연 로딩 (Lazy Loading):**

```typescript
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function HotelImage({ src, alt }: { src: string; alt: string }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholderSrc="/placeholder.jpg"
      width="100%"
      height="auto"
    />
  )
}
```

**WebP 포맷 사용:**

```typescript
function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={`${src}.jpg`} type="image/jpeg" />
      <img src={`${src}.jpg`} alt={alt} loading="lazy" />
    </picture>
  )
}
```

### 14.4 가상 스크롤 (Virtualization)

**예제: `src/pages/settings/like.tsx`**

```typescript
import { Virtuoso } from 'react-virtuoso'

function LikePage() {
  const { data } = useEditLike()

  return (
    <Virtuoso
      style={{ height: '100vh' }}
      data={data ?? []}
      itemContent={(index, hotel) => (
        <HotelItem
          key={hotel.id}
          hotel={hotel}
        />
      )}
      // 추가 최적화 옵션
      overscan={5}  // 보이는 영역 위아래로 5개 더 렌더링
    />
  )
}
```

**언제 사용할까?**
- 리스트 항목이 100개 이상
- 각 항목의 렌더링 비용이 큼
- 스크롤 성능이 중요한 경우

### 14.5 Debounce & Throttle

```typescript
import { useState, useCallback } from 'react'
import { debounce } from 'lodash'

function SearchInput() {
  const [results, setResults] = useState([])

  // Debounce: 입력이 멈춘 후 300ms 뒤에 실행
  const handleSearch = useCallback(
    debounce(async (keyword: string) => {
      const data = await searchHotels(keyword)
      setResults(data)
    }, 300),
    []
  )

  return (
    <input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="호텔 검색..."
    />
  )
}

// Throttle: 스크롤 이벤트 최적화
function InfiniteScroll() {
  const handleScroll = useCallback(
    throttle(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore()
      }
    }, 200),  // 200ms마다 최대 1회 실행
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return <div>...</div>
}
```

### 14.6 Bundle 크기 최적화

**1. Analyze Bundle:**

```bash
# bundle 분석
yarn build
npx source-map-explorer 'build/static/js/*.js'
```

**2. Tree Shaking:**

```typescript
// ❌ 전체 라이브러리 import
import _ from 'lodash'

// ✅ 필요한 것만 import
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
```

**3. 동적 import:**

```typescript
// 조건부 로딩
const loadChart = async () => {
  const { Chart } = await import('chart.js')
  return new Chart(ctx, config)
}

// 사용자 액션에 따라 로딩
button.addEventListener('click', async () => {
  const module = await import('./heavyModule')
  module.doSomething()
})
```

### 14.7 Web Vitals 측정

**예제: `src/reportWebVitals.ts`**

```typescript
import { Metric } from 'web-vitals'

type ReportHandler = (metric: Metric) => void

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry)   // Cumulative Layout Shift
      onINP(onPerfEntry)   // Interaction to Next Paint
      onFCP(onPerfEntry)   // First Contentful Paint
      onLCP(onPerfEntry)   // Largest Contentful Paint
      onTTFB(onPerfEntry)  // Time to First Byte
    })
  }
}

export default reportWebVitals

// 사용
reportWebVitals((metric) => {
  console.log(metric)
  // Analytics 전송
  sendToAnalytics(metric)
})
```

---

## Chapter 15: Firebase 연동

### 15.1 Firebase 초기 설정

**예제: `src/remote/firebase.ts`**

```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGEING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGEING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const store = getFirestore(app)
export const storage = getStorage(app)
```

### 15.2 Authentication - Google 로그인

**예제: `src/components/signin/hooks/useGoogleSignin.ts`**

```typescript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, collection } from 'firebase/firestore'
import { auth, store } from '@remote/firebase'
import { FirebaseError } from 'firebase/app'

const provider = new GoogleAuthProvider()

function useGoogleSignin() {
  const navigate = useNavigate()
  const { setUser } = useUserContext()

  const signin = useCallback(async () => {
    try {
      const { user } = await signInWithPopup(auth, provider)

      const 새로운유저 = {
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      }

      // Firestore에 사용자 정보 저장
      await setDoc(
        doc(collection(store, 'users'), user.uid),
        새로운유저
      )

      setUser(새로운유저)
      navigate('/', { replace: true })
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Firebase error:', error.code, error.message)

        if (error.code === 'auth/popup-closed-by-user') {
          return  // 사용자가 직접 닫음
        }

        if (error.code === 'auth/cancelled-popup-request') {
          return  // 이미 팝업이 열려있음
        }
      }

      alert('로그인에 실패했습니다.')
    }
  }, [navigate, setUser])

  const signout = useCallback(async () => {
    await auth.signOut()
    setUser(null)
  }, [setUser])

  return { signin, signout }
}
```

### 15.3 Firestore - 데이터 CRUD

**생성 (Create):**

```typescript
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'

// 자동 ID 생성
async function createHotel(hotel: Hotel) {
  const docRef = await addDoc(collection(store, 'hotels'), hotel)
  return docRef.id
}

// 직접 ID 지정
async function createUser(userId: string, user: User) {
  await setDoc(doc(store, 'users', userId), user)
}
```

**조회 (Read):**

```typescript
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'

// 전체 조회
async function getHotels() {
  const snapshot = await getDocs(collection(store, 'hotels'))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// 단건 조회
async function getHotel(hotelId: string) {
  const docRef = doc(store, 'hotels', hotelId)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    throw new Error('Hotel not found')
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  }
}

// 조건 조회
async function getPopularHotels() {
  const q = query(
    collection(store, 'hotels'),
    where('rating', '>=', 4.5),
    orderBy('rating', 'desc'),
    limit(10)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}
```

**수정 (Update):**

```typescript
import { doc, updateDoc } from 'firebase/firestore'

async function updateHotel(hotelId: string, updates: Partial<Hotel>) {
  const docRef = doc(store, 'hotels', hotelId)
  await updateDoc(docRef, updates)
}
```

**삭제 (Delete):**

```typescript
import { doc, deleteDoc } from 'firebase/firestore'

async function deleteHotel(hotelId: string) {
  await deleteDoc(doc(store, 'hotels', hotelId))
}
```

### 15.4 실시간 업데이트 (onSnapshot)

```typescript
import { collection, onSnapshot, query, where } from 'firebase/firestore'

function useRealtimeHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([])

  useEffect(() => {
    const q = query(collection(store, 'hotels'))

    // 실시간 리스너 등록
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const hotels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setHotels(hotels)
    })

    // Cleanup
    return () => unsubscribe()
  }, [])

  return hotels
}
```

### 15.5 Storage - 이미지 업로드

```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@remote/firebase'

async function uploadImage(file: File, path: string) {
  // 1. Storage 참조 생성
  const storageRef = ref(storage, path)

  // 2. 파일 업로드
  await uploadBytes(storageRef, file)

  // 3. 다운로드 URL 가져오기
  const downloadURL = await getDownloadURL(storageRef)

  return downloadURL
}

// 사용 예시
function ImageUpload() {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const url = await uploadImage(
        file,
        `hotels/${Date.now()}_${file.name}`
      )
      console.log('업로드 완료:', url)
    } catch (error) {
      console.error('업로드 실패:', error)
    }
  }

  return <input type="file" onChange={handleFileChange} />
}
```

### 15.6 Firestore 보안 규칙

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자는 자신의 데이터만 읽고 쓸 수 있음
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 호텔은 모두 읽을 수 있지만, 관리자만 쓸 수 있음
    match /hotels/{hotelId} {
      allow read: if true;
      allow write: if request.auth != null &&
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // 리뷰는 로그인한 사용자만 작성 가능
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
                               resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## Chapter 16: 프로젝트 구조와 Best Practices

### 16.1 디렉토리 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── shared/         # 공통 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── hotel/          # 도메인별 컴포넌트
│   │   ├── HotelItem.tsx
│   │   ├── HotelList.tsx
│   │   └── hooks/
│   │       ├── useHotel.ts
│   │       └── useReview.ts
│   └── auth/
│       └── AuthGuard.tsx
│
├── pages/              # 페이지 컴포넌트
│   ├── HotelList.tsx
│   ├── Hotel.tsx
│   ├── My.tsx
│   └── Signin.tsx
│
├── hooks/              # 전역 Custom Hooks
│   ├── auth/
│   │   └── useUser.ts
│   └── useDebounce.ts
│
├── contexts/           # Context API
│   └── UserContext.tsx
│
├── remote/             # API 통신
│   ├── firebase.ts
│   ├── hotel.ts
│   ├── review.ts
│   └── like.ts
│
├── models/             # TypeScript 타입 정의
│   ├── hotel.ts
│   ├── user.ts
│   └── review.ts
│
├── styles/             # 스타일 관련
│   ├── colorPalette.ts
│   ├── typography.ts
│   ├── theme.ts
│   └── globalStyles.ts
│
├── utils/              # 유틸리티 함수
│   ├── addDelimiter.ts
│   └── formatDate.ts
│
├── constants/          # 상수
│   └── index.ts
│
├── App.tsx
├── index.tsx
└── routes.tsx
```

### 16.2 명명 규칙

**컴포넌트:**
```typescript
// PascalCase
function HotelItem() {}
function UserProfile() {}
```

**함수/변수:**
```typescript
// camelCase
const getUserInfo = () => {}
const isLoading = true
```

**상수:**
```typescript
// UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3
```

**파일명:**
```typescript
// 컴포넌트: PascalCase
HotelItem.tsx
UserProfile.tsx

// Hooks/Utils: camelCase
useAuth.ts
formatDate.ts

// Constants: camelCase
index.ts
apiEndpoints.ts
```

### 16.3 코드 작성 원칙

#### 1. **단일 책임 원칙 (SRP)**

```typescript
// ❌ 너무 많은 책임
function UserDashboard() {
  // 데이터 페칭
  // 폼 처리
  // 차트 렌더링
  // 알림 관리
  // ...
}

// ✅ 책임 분리
function UserDashboard() {
  const { user } = useUser()
  const { stats } = useUserStats(user.id)

  return (
    <div>
      <UserProfile user={user} />
      <StatsChart stats={stats} />
      <NotificationList userId={user.id} />
    </div>
  )
}
```

#### 2. **DRY (Don't Repeat Yourself)**

```typescript
// ❌ 중복 코드
function HotelList() {
  const data = await fetch('/api/hotels')
  const hotels = await data.json()
  // ...
}

function PopularHotels() {
  const data = await fetch('/api/hotels/popular')
  const hotels = await data.json()
  // ...
}

// ✅ 재사용
function useHotels(endpoint: string) {
  return useQuery({
    queryKey: ['hotels', endpoint],
    queryFn: () => fetcher(endpoint)
  })
}

function HotelList() {
  const { data } = useHotels('/hotels')
}

function PopularHotels() {
  const { data } = useHotels('/hotels/popular')
}
```

#### 3. **조기 반환 (Early Return)**

```typescript
// ❌ 중첩된 조건문
function processReservation(reservation) {
  if (reservation) {
    if (reservation.isValid()) {
      if (reservation.isPaid()) {
        // 처리 로직
      }
    }
  }
}

// ✅ 조기 반환
function processReservation(reservation) {
  if (!reservation) return
  if (!reservation.isValid()) return
  if (!reservation.isPaid()) return

  // 처리 로직
}
```

### 16.4 TypeScript 활용

**Type vs Interface:**

```typescript
// Type: 유니온, 인터섹션 등 복잡한 타입
type Status = 'pending' | 'success' | 'error'
type Result<T> = { data: T } | { error: Error }

// Interface: 객체 구조 정의, 확장 가능
interface User {
  id: string
  name: string
  email: string
}

interface Admin extends User {
  role: 'admin'
  permissions: string[]
}
```

**제네릭 활용:**

```typescript
// API 응답 타입
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// 사용
const response: ApiResponse<Hotel[]> = await getHotels()
const user: ApiResponse<User> = await getUser(id)
```

**유틸리티 타입:**

```typescript
// Partial: 모든 속성을 선택적으로
type UpdateUser = Partial<User>

// Pick: 특정 속성만 선택
type UserPreview = Pick<User, 'id' | 'name'>

// Omit: 특정 속성 제외
type UserWithoutPassword = Omit<User, 'password'>

// Required: 모든 속성을 필수로
type RequiredUser = Required<User>
```

### 16.5 에러 처리 패턴

```typescript
// Error Boundary
class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo)
    // 에러 로깅 서비스 전송
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

// React Query 에러 처리
function HotelList() {
  const { data, error, isError } = useHotels()

  if (isError) {
    return <ErrorMessage error={error} retry={() => refetch()} />
  }

  return <div>{/* 정상 렌더링 */}</div>
}
```

### 16.6 테스트 작성

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HotelItem from './HotelItem'

describe('HotelItem', () => {
  const mockHotel = {
    id: '1',
    name: '테스트 호텔',
    price: 100000,
    rating: 4.5,
  }

  const setup = () => {
    const queryClient = new QueryClient()
    const onLike = jest.fn()

    render(
      <QueryClientProvider client={queryClient}>
        <HotelItem hotel={mockHotel} onLike={onLike} />
      </QueryClientProvider>
    )

    return { onLike }
  }

  it('호텔 정보를 올바르게 표시한다', () => {
    setup()

    expect(screen.getByText('테스트 호텔')).toBeInTheDocument()
    expect(screen.getByText('100,000원')).toBeInTheDocument()
  })

  it('찜하기 버튼을 클릭하면 onLike가 호출된다', async () => {
    const { onLike } = setup()

    const likeButton = screen.getByRole('button', { name: /찜하기/i })
    await userEvent.click(likeButton)

    expect(onLike).toHaveBeenCalledWith(mockHotel.id)
  })
})
```

### 16.7 성능 모니터링

```typescript
// React DevTools Profiler
import { Profiler } from 'react'

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`)
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourApp />
    </Profiler>
  )
}
```

### 16.8 배포 전 체크리스트

- [ ] TypeScript 에러 없음 (`yarn tsc --noEmit`)
- [ ] Lint 에러 없음 (`yarn lint`)
- [ ] 테스트 통과 (`yarn test`)
- [ ] 프로덕션 빌드 성공 (`yarn build`)
- [ ] 환경 변수 설정 완료
- [ ] API 엔드포인트 확인
- [ ] SEO 메타 태그 설정
- [ ] 성능 최적화 (Lighthouse 점수 90 이상)
- [ ] 에러 로깅 설정
- [ ] 보안 검토 (XSS, CSRF 방어)

---

## 📌 프로젝트 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn start

# 프로덕션 빌드
yarn build

# 테스트 실행
yarn test

# Lint 검사
yarn lint

# Lint 자동 수정
yarn lint:fix
```

## 🔗 추가 자료

- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [React Hook Form 문서](https://react-hook-form.com/)
- [Emotion 문서](https://emotion.sh/docs/introduction)
- [Firebase 문서](https://firebase.google.com/docs)
- [React Router 문서](https://reactrouter.com/)

---

## 🎯 학습 로드맵

### 초급 (1-2개월)
1. React 기초 (Chapter 1-3)
2. useState, useEffect (Chapter 4-5)
3. 간단한 CRUD 애플리케이션 만들기

### 중급 (3-4개월)
4. useCallback, useMemo (Chapter 6)
5. useRef, useContext (Chapter 7-8)
6. Custom Hooks (Chapter 9)
7. React Router (Chapter 10)
8. React Query (Chapter 11)
9. Form 관리 (Chapter 12)

### 고급 (5-6개월)
10. CSS-in-JS (Chapter 13)
11. 성능 최적화 (Chapter 14)
12. Firebase 연동 (Chapter 15)
13. 프로젝트 구조 Best Practices (Chapter 16)
14. 실전 프로젝트 완성

---

**프로젝트**: LoveTrip - 호텔 예약 플랫폼
**기술 스택**: React 19, TypeScript, TanStack Query, Emotion, Firebase
**작성자**: React 학습 가이드
**마지막 업데이트**: 2025년

---

> 💡 **Tip**: 각 Chapter를 순서대로 학습하되, 실제 프로젝트 코드를 직접 작성해보며 익히는 것이 가장 효과적입니다. 이론만 읽지 말고 반드시 손으로 코딩하세요!

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

## Chapter 2: 컴포넌트와 Props

### 2.1 컴포넌트란?

컴포넌트는 React 애플리케이션을 구성하는 독립적이고 재사용 가능한 UI 조각입니다. 레고 블록처럼 여러 컴포넌트를 조합하여 복잡한 UI를 만들 수 있습니다.

**컴포넌트의 종류:**
1. **함수형 컴포넌트**: 현대 React의 표준 (Hooks 사용)
2. **클래스형 컴포넌트**: 레거시 방식 (거의 사용하지 않음)

### 2.2 Props (Properties)

Props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다. **단방향 데이터 흐름**을 따르며, 자식 컴포넌트는 Props를 읽기만 할 수 있고 수정할 수 없습니다.

**기본 예제:**

```typescript
// 자식 컴포넌트 정의
interface GreetingProps {
  name: string
  age?: number  // ? = 선택적 prop
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      {age && <p>나이: {age}세</p>}
    </div>
  )
}

// 부모 컴포넌트에서 사용
function App() {
  return (
    <div>
      <Greeting name="김철수" age={25} />
      <Greeting name="이영희" />
    </div>
  )
}
```

### 2.3 실전 예제: HotelItem 컴포넌트

**예제: `src/components/hotelList/HotelItem.tsx`**

```typescript
import styled from '@emotion/styled'
import { Hotel } from '@models/hotel'
import addDelimiter from '@utils/addDelimiter'

interface HotelItemProps {
  hotel: Hotel
  onClick?: () => void
  isLiked?: boolean
  onLikeClick?: (hotelId: string) => void
}

function HotelItem({
  hotel,
  onClick,
  isLiked = false,
  onLikeClick
}: HotelItemProps) {
  return (
    <Container onClick={onClick}>
      <Image src={hotel.mainImageUrl} alt={hotel.name} />
      <Contents>
        <Title>{hotel.name}</Title>
        <Location>{hotel.location}</Location>
        <PriceWrap>
          <Price>{addDelimiter(hotel.price)}원</Price>
          <Rating>⭐ {hotel.rating}</Rating>
        </PriceWrap>
      </Contents>

      {onLikeClick && (
        <LikeButton
          onClick={(e) => {
            e.stopPropagation()  // 이벤트 버블링 방지
            onLikeClick(hotel.id)
          }}
        >
          {isLiked ? '❤️' : '🤍'}
        </LikeButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f5f5f5;
  }
`

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
`

const Contents = styled.div`
  flex: 1;
`

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
`

const Location = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`

const PriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Price = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #3b82f6;
`

const Rating = styled.span`
  font-size: 14px;
`

const LikeButton = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`

export default HotelItem
```

### 2.4 Props의 핵심 패턴

#### 1. **Default Props (기본값 설정)**

```typescript
interface ButtonProps {
  text: string
  color?: string
  size?: 'small' | 'medium' | 'large'
}

function Button({
  text,
  color = 'blue',  // 기본값
  size = 'medium'
}: ButtonProps) {
  return <button>{text}</button>
}
```

#### 2. **Children Prop**

```typescript
interface CardProps {
  children: React.ReactNode
  title?: string
}

function Card({ children, title }: CardProps) {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}

// 사용
<Card title="호텔 정보">
  <p>설명...</p>
  <Button text="예약하기" />
</Card>
```

#### 3. **Spread Props (나머지 props 전달)**

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

function Input({ label, error, ...rest }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />  {/* 나머지 모든 props 전달 */}
      {error && <span>{error}</span>}
    </div>
  )
}

// 사용
<Input
  label="이메일"
  type="email"
  placeholder="example@email.com"
  required
/>
```

#### 4. **Function Props (이벤트 핸들러)**

```typescript
interface SearchBarProps {
  onSearch: (keyword: string) => void
  onClear?: () => void
}

function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [keyword, setKeyword] = useState('')

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={() => onSearch(keyword)}>검색</button>
      {onClear && <button onClick={onClear}>초기화</button>}
    </div>
  )
}
```

### 2.5 Props Drilling 문제와 해결책

**Props Drilling**: 여러 계층의 컴포넌트를 거쳐 props를 전달해야 하는 문제

```typescript
// ❌ Props Drilling
function App() {
  const [user, setUser] = useState(null)

  return <Layout user={user} />
}

function Layout({ user }) {
  return <Header user={user} />
}

function Header({ user }) {
  return <UserMenu user={user} />
}

function UserMenu({ user }) {
  return <div>{user.name}</div>
}
```

**해결책: Context API (Chapter 8에서 자세히 다룸)**

```typescript
// ✅ Context 사용
const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  )
}

function UserMenu() {
  const user = useContext(UserContext)
  return <div>{user.name}</div>
}
```

### 2.6 TypeScript와 Props

**제네릭을 활용한 재사용 가능한 컴포넌트:**

```typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map(item => (
        <div key={keyExtractor(item)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}

// 사용
<List
  items={hotels}
  renderItem={(hotel) => <HotelItem hotel={hotel} />}
  keyExtractor={(hotel) => hotel.id}
/>
```

---

## Chapter 3: State와 이벤트 처리

### 3.1 State란?

State는 컴포넌트가 가지는 **동적인 데이터**입니다. State가 변경되면 React는 자동으로 컴포넌트를 다시 렌더링합니다.

**Props vs State:**
- **Props**: 부모로부터 받는 읽기 전용 데이터
- **State**: 컴포넌트 내부에서 관리하는 변경 가능한 데이터

### 3.2 useState 기본

```typescript
import { useState } from 'react'

function Counter() {
  // [현재 값, 값을 변경하는 함수] = useState(초기값)
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>초기화</button>
    </div>
  )
}
```

### 3.3 여러 개의 State 관리

```typescript
function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeToTerms) {
      alert('약관에 동의해주세요')
      return
    }

    console.log({ email, password, name })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <label>
        <input
          type="checkbox"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
        />
        약관에 동의합니다
      </label>
      <button type="submit">회원가입</button>
    </form>
  )
}
```

### 3.4 객체 State 관리

```typescript
interface UserForm {
  email: string
  password: string
  name: string
}

function SignupFormV2() {
  const [form, setForm] = useState<UserForm>({
    email: '',
    password: '',
    name: '',
  })

  // 여러 필드를 한 번에 관리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,      // 기존 값 복사
      [name]: value // 특정 필드만 업데이트
    }))
  }

  return (
    <form>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
      />
    </form>
  )
}
```

### 3.5 배열 State 관리

```typescript
function TodoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  // 추가
  const addTodo = () => {
    if (input.trim() === '') return
    setTodos(prev => [...prev, input])
    setInput('')
  }

  // 삭제
  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index))
  }

  // 수정
  const updateTodo = (index: number, newText: string) => {
    setTodos(prev => prev.map((todo, i) =>
      i === index ? newText : todo
    ))
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>추가</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### 3.6 이벤트 처리

#### 1. **클릭 이벤트**

```typescript
function ClickExample() {
  const handleClick = () => {
    console.log('버튼 클릭!')
  }

  const handleClickWithParam = (message: string) => {
    console.log(message)
  }

  return (
    <div>
      {/* 방법 1: 직접 함수 전달 */}
      <button onClick={handleClick}>클릭</button>

      {/* 방법 2: 익명 함수 */}
      <button onClick={() => console.log('익명 함수')}>클릭</button>

      {/* 방법 3: 파라미터 전달 */}
      <button onClick={() => handleClickWithParam('안녕!')}>클릭</button>

      {/* ❌ 잘못된 방법 - 함수가 즉시 실행됨 */}
      <button onClick={handleClick()}>클릭</button>
    </div>
  )
}
```

#### 2. **Form 이벤트**

```typescript
function FormExample() {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // 페이지 새로고침 방지
    console.log('제출:', value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button type="submit">제출</button>
    </form>
  )
}
```

#### 3. **이벤트 버블링 제어**

```typescript
function EventBubbling() {
  const handleParentClick = () => {
    console.log('부모 클릭')
  }

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation()  // 이벤트 버블링 중단
    console.log('자식 클릭')
  }

  return (
    <div onClick={handleParentClick}>
      부모
      <button onClick={handleChildClick}>자식</button>
    </div>
  )
}
```

### 3.7 실전 예제: 검색 필터링

```typescript
function HotelSearch() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500000)

  // 필터링된 호텔 목록
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesPrice =
      hotel.price >= minPrice &&
      hotel.price <= maxPrice

    return matchesSearch && matchesPrice
  })

  return (
    <div>
      {/* 검색 입력 */}
      <input
        type="text"
        placeholder="호텔 이름 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 가격 필터 */}
      <div>
        <label>
          최소 가격:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label>
          최대 가격:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      {/* 결과 표시 */}
      <div>
        총 {filteredHotels.length}개의 호텔
      </div>

      {/* 호텔 목록 */}
      {filteredHotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

### 3.8 조건부 렌더링

```typescript
function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // 방법 1: if-else
  if (!isLoggedIn) {
    return <LoginPage />
  }

  return (
    <div>
      {/* 방법 2: 삼항 연산자 */}
      {isLoggedIn ? <WelcomePage /> : <LoginPage />}

      {/* 방법 3: && 연산자 (조건이 true일 때만 렌더링) */}
      {user && <UserProfile user={user} />}

      {/* 방법 4: 함수로 분리 */}
      {renderContent()}
    </div>
  )

  function renderContent() {
    if (user?.role === 'admin') {
      return <AdminDashboard />
    }
    if (user?.role === 'user') {
      return <UserDashboard />
    }
    return <GuestDashboard />
  }
}
```

### 3.9 리스트 렌더링과 Key

```typescript
function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([])

  return (
    <div>
      {/* ✅ 올바른 방법: 고유한 ID 사용 */}
      {hotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}

      {/* ❌ 잘못된 방법: index를 key로 사용 (순서가 바뀔 수 있는 경우) */}
      {hotels.map((hotel, index) => (
        <HotelItem key={index} hotel={hotel} />
      ))}
    </div>
  )
}
```

**Key가 중요한 이유:**
- React가 어떤 항목이 변경/추가/삭제되었는지 식별
- 리스트 항목의 순서가 바뀔 때 불필요한 리렌더링 방지
- 컴포넌트 state가 올바르게 유지됨

### 3.10 State 업데이트 주의사항

```typescript
function StateUpdates() {
  const [count, setCount] = useState(0)

  // ❌ 잘못된 방법: 이전 state에 의존
  const incrementThreeTimes_Wrong = () => {
    setCount(count + 1)  // 0 + 1 = 1
    setCount(count + 1)  // 0 + 1 = 1
    setCount(count + 1)  // 0 + 1 = 1
    // 결과: 1 (예상과 다름!)
  }

  // ✅ 올바른 방법: 함수형 업데이트
  const incrementThreeTimes_Correct = () => {
    setCount(prev => prev + 1)  // 0 + 1 = 1
    setCount(prev => prev + 1)  // 1 + 1 = 2
    setCount(prev => prev + 1)  // 2 + 1 = 3
    // 결과: 3
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementThreeTimes_Correct}>+3</button>
    </div>
  )
}
```

---

# Part 2: React Hooks 완전정복

## Chapter 4: useState - 상태 관리의 기본

`useState`는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 Hook입니다.

**기본 문법:**

```typescript
const [state, setState] = useState<Type>(initialValue)
```

### 4.1 useState 심화

#### 1. **초기 상태가 복잡한 계산인 경우**

```typescript
function ExpensiveComponent() {
  // ❌ 매 렌더링마다 실행됨
  const [data, setData] = useState(expensiveCalculation())

  // ✅ 초기 렌더링 시에만 실행
  const [data, setData] = useState(() => expensiveCalculation())

  return <div>{data}</div>
}
```

#### 2. **이전 상태 기반 업데이트**

```typescript
function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    // ✅ 함수형 업데이트: 항상 최신 상태 보장
    setCount(prev => prev + 1)
  }

  return <button onClick={increment}>Count: {count}</button>
}
```

#### 3. **복잡한 상태 관리 패턴**

```typescript
interface FormState {
  name: string
  email: string
  age: number
  interests: string[]
}

function ProfileForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    age: 0,
    interests: [],
  })

  // 개별 필드 업데이트
  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // 관심사 토글
  const toggleInterest = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  return (
    <form>
      <input
        value={form.name}
        onChange={e => updateField('name', e.target.value)}
      />
      <input
        value={form.email}
        onChange={e => updateField('email', e.target.value)}
      />
    </form>
  )
}
```

### 4.2 실전 예제: 인증 상태 관리

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

### 4.3 useState vs useReducer

복잡한 상태 로직의 경우 `useReducer`를 고려하세요:

```typescript
// useState - 간단한 상태
const [count, setCount] = useState(0)

// useReducer - 복잡한 상태 로직
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset'; payload: number }

const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case 'increment': return state + 1
    case 'decrement': return state - 1
    case 'reset': return action.payload
    default: return state
  }
}

const [count, dispatch] = useReducer(reducer, 0)
```

---

## Chapter 5: useEffect - 생명주기와 부수효과

### 5.1 useEffect란?

`useEffect`는 컴포넌트가 렌더링된 후 **부수 효과(side effect)**를 수행하는 Hook입니다.

**부수 효과 예시:**
- 데이터 페칭
- 구독(subscription) 설정
- DOM 직접 조작
- 타이머 설정
- 로깅

**기본 문법:**

```typescript
useEffect(() => {
  // 실행할 코드 (effect)

  return () => {
    // cleanup 함수 (선택사항)
  }
}, [dependencies]) // 의존성 배열
```

### 5.2 의존성 배열의 3가지 패턴

```typescript
// 1. 의존성 배열 없음 - 매 렌더링마다 실행
useEffect(() => {
  console.log('매 렌더링마다 실행')
})

// 2. 빈 배열 - 마운트 시 1번만 실행
useEffect(() => {
  console.log('컴포넌트 마운트 시 1번만 실행')
}, [])

// 3. 특정 값 - 해당 값이 변경될 때만 실행
useEffect(() => {
  console.log('count가 변경될 때마다 실행')
}, [count])
```

### 5.3 실전 예제: 데이터 페칭

```typescript
function HotelDetail({ hotelId }: { hotelId: string }) {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchHotel = async () => {
      try {
        setLoading(true)
        const data = await getHotel(hotelId)

        if (!cancelled) {
          setHotel(data)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchHotel()

    // Cleanup: 컴포넌트가 언마운트되거나 hotelId가 변경될 때
    return () => {
      cancelled = true
    }
  }, [hotelId])

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error.message}</div>
  if (!hotel) return <div>호텔을 찾을 수 없습니다</div>

  return <div>{hotel.name}</div>
}
```

### 5.4 Cleanup 함수

```typescript
function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('타이머 시작')

    const timer = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)

    // Cleanup: 컴포넌트 언마운트 시 타이머 정리
    return () => {
      console.log('타이머 정리')
      clearInterval(timer)
    }
  }, [])

  return <div>카운트: {count}</div>
}
```

### 5.5 이벤트 리스너 등록/해제

```typescript
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // Cleanup: 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      {size.width} x {size.height}
    </div>
  )
}
```

### 5.6 여러 개의 useEffect 사용

```typescript
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  // Effect 1: 사용자 정보 로드
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])

  // Effect 2: 사용자 게시글 로드
  useEffect(() => {
    if (user) {
      fetchUserPosts(user.id).then(setPosts)
    }
  }, [user])

  // Effect 3: 페이지 타이틀 업데이트
  useEffect(() => {
    if (user) {
      document.title = `${user.name}의 프로필`
    }

    return () => {
      document.title = '앱 이름'
    }
  }, [user])

  return <div>...</div>
}
```

### 5.7 useEffect 안티패턴

```typescript
// ❌ 안티패턴 1: 의존성 배열 누락
function BadExample1() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)  // count가 의존성에 없음!
    }, 1000)

    return () => clearInterval(timer)
  }, [])  // 빈 배열 - count 변경 감지 못함
}

// ✅ 올바른 방법
function GoodExample1() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1)  // 함수형 업데이트
    }, 1000)

    return () => clearInterval(timer)
  }, [])
}

// ❌ 안티패턴 2: useEffect 내에서 상태 직접 변경
function BadExample2() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then(result => {
      setData(result)
      setData(result.filter(item => item.active))  // 연속 setState
    })
  }, [])
}

// ✅ 올바른 방법
function GoodExample2() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then(result => {
      const activeData = result.filter(item => item.active)
      setData(activeData)
    })
  }, [])
}
```

### 5.8 실전 예제: Firebase 실시간 구독

```typescript
function RealtimeHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([])

  useEffect(() => {
    const q = query(collection(store, 'hotels'))

    // 실시간 구독
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const hotelList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Hotel[]

      setHotels(hotelList)
    })

    // Cleanup: 구독 해제
    return () => unsubscribe()
  }, [])

  return (
    <div>
      {hotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

---

## Chapter 6: useCallback과 useMemo - 성능 최적화

### 6.1 React의 렌더링 최적화

React는 기본적으로 부모 컴포넌트가 리렌더링되면 모든 자식 컴포넌트도 리렌더링됩니다. `useCallback`과 `useMemo`는 불필요한 리렌더링을 방지합니다.

### 6.2 useMemo - 값 메모이제이션

**언제 사용할까?**
- 비용이 큰 계산 결과를 캐싱
- 참조 동일성이 중요한 객체/배열

```typescript
import { useMemo } from 'react'

function ExpensiveComponent({ items }: { items: Item[] }) {
  // ❌ 매 렌더링마다 재계산
  const sortedItems = items.sort((a, b) => b.price - a.price)

  // ✅ items가 변경될 때만 재계산
  const sortedItems = useMemo(() => {
    console.log('정렬 실행')
    return items.sort((a, b) => b.price - a.price)
  }, [items])

  return <div>{sortedItems.map(item => ...)}</div>
}
```

### 6.3 실전 예제: 필터링과 정렬

```typescript
function HotelList({ hotels }: { hotels: Hotel[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price')

  // 필터링 + 정렬 결과를 메모이제이션
  const filteredAndSortedHotels = useMemo(() => {
    console.log('필터링 및 정렬 실행')

    // 1. 검색어로 필터링
    const filtered = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // 2. 정렬
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price
      } else {
        return b.rating - a.rating
      }
    })

    return sorted
  }, [hotels, searchTerm, sortBy])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="호텔 검색..."
      />
      <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
        <option value="price">가격순</option>
        <option value="rating">평점순</option>
      </select>

      {filteredAndSortedHotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

### 6.4 useCallback - 함수 메모이제이션

**언제 사용할까?**
- 자식 컴포넌트에 함수를 props로 전달할 때
- 의존성 배열에 함수가 포함된 경우

```typescript
import { useCallback } from 'react'

function Parent() {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  // ❌ 매 렌더링마다 새 함수 생성
  const handleClick = () => {
    setCount(count + 1)
  }

  // ✅ count가 변경될 때만 새 함수 생성
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  return <Child onClick={handleClick} />
}

// React.memo로 props가 변경될 때만 리렌더링
const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child 렌더링')
  return <button onClick={onClick}>클릭</button>
})
```

### 6.5 실전 예제: 검색 디바운싱

```typescript
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Hotel[]>([])

  // 검색 함수를 useCallback으로 메모이제이션
  const performSearch = useCallback(async (keyword: string) => {
    if (keyword.trim() === '') {
      setResults([])
      return
    }

    const data = await searchHotels(keyword)
    setResults(data)
  }, [])

  // 디바운싱 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, performSearch])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="호텔 검색..."
      />
      <SearchResults results={results} />
    </div>
  )
}
```

### 6.6 useCallback과 useMemo 조합

```typescript
function HotelManager() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filter, setFilter] = useState('')

  // 필터링된 호텔 목록 (useMemo)
  const filteredHotels = useMemo(() => {
    return hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [hotels, filter])

  // 호텔 추가 함수 (useCallback)
  const addHotel = useCallback((hotel: Hotel) => {
    setHotels(prev => [...prev, hotel])
  }, [])

  // 호텔 삭제 함수 (useCallback)
  const deleteHotel = useCallback((hotelId: string) => {
    setHotels(prev => prev.filter(h => h.id !== hotelId))
  }, [])

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <HotelList
        hotels={filteredHotels}
        onDelete={deleteHotel}
      />
      <AddHotelForm onAdd={addHotel} />
    </div>
  )
}
```

### 6.7 성능 측정

```typescript
function PerformanceCheck() {
  const [count, setCount] = useState(0)

  const expensiveCalculation = (num: number) => {
    console.time('계산 시간')
    let result = 0
    for (let i = 0; i < 1000000000; i++) {
      result += num
    }
    console.timeEnd('계산 시간')
    return result
  }

  // useMemo 없이
  const result1 = expensiveCalculation(count)

  // useMemo 사용
  const result2 = useMemo(() => expensiveCalculation(count), [count])

  return <div>{result2}</div>
}
```

### 6.8 주의사항

```typescript
// ❌ 과도한 최적화 - 간단한 계산에는 불필요
const sum = useMemo(() => a + b, [a, b])

// ✅ 이렇게만 해도 충분
const sum = a + b

// ❌ 모든 함수를 useCallback으로 감쌀 필요 없음
const handleClick = useCallback(() => {
  console.log('click')
}, [])

// ✅ 자식에게 전달하지 않는다면 불필요
const handleClick = () => {
  console.log('click')
}
```

---

## Chapter 7: useRef - DOM 접근과 값 보관

### 7.1 useRef란?

`useRef`는 두 가지 주요 용도로 사용됩니다:
1. **DOM 요소에 직접 접근**
2. **리렌더링되지 않는 변수 저장**

**기본 문법:**

```typescript
const ref = useRef<Type>(initialValue)
```

### 7.2 DOM 요소 접근

```typescript
function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    // DOM 요소에 직접 접근
    inputRef.current?.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>포커스</button>
    </div>
  )
}
```

### 7.3 실전 예제: 검색 입력창 자동 포커스

```typescript
function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // 컴포넌트 마운트 시 자동 포커스
    searchInputRef.current?.focus()
  }, [])

  const handleClear = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
      searchInputRef.current.focus()
    }
  }

  return (
    <div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="호텔 검색..."
      />
      <button onClick={handleClear}>초기화</button>
    </div>
  )
}
```

### 7.4 스크롤 위치 제어

```typescript
function ScrollToTop() {
  const topRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div ref={topRef}>페이지 상단</div>

      {/* 긴 콘텐츠 */}
      <div style={{ height: '2000px' }}>...</div>

      <button onClick={scrollToTop}>맨 위로</button>
    </div>
  )
}
```

### 7.5 이전 값 저장

```typescript
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// 사용
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>현재: {count}</p>
      <p>이전: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
```

### 7.6 타이머 ID 저장

```typescript
function Timer() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  const start = () => {
    if (timerRef.current !== null) return

    setIsRunning(true)
    timerRef.current = window.setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)
  }

  const stop = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
      setIsRunning(false)
    }
  }

  const reset = () => {
    stop()
    setCount(0)
  }

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div>
      <p>시간: {count}초</p>
      <button onClick={start} disabled={isRunning}>시작</button>
      <button onClick={stop} disabled={!isRunning}>정지</button>
      <button onClick={reset}>리셋</button>
    </div>
  )
}
```

### 7.7 useRef vs useState

```typescript
function Comparison() {
  // useState: 값이 변경되면 리렌더링됨
  const [stateValue, setStateValue] = useState(0)

  // useRef: 값이 변경되어도 리렌더링 안 됨
  const refValue = useRef(0)

  const handleStateChange = () => {
    setStateValue(prev => prev + 1)
    console.log('리렌더링 발생')
  }

  const handleRefChange = () => {
    refValue.current += 1
    console.log('리렌더링 없음, 값:', refValue.current)
  }

  return (
    <div>
      <p>State: {stateValue}</p>
      <p>Ref: {refValue.current}</p>
      <button onClick={handleStateChange}>State 변경</button>
      <button onClick={handleRefChange}>Ref 변경</button>
    </div>
  )
}
```

### 7.8 실전 예제: 무한 스크롤

```typescript
function InfiniteScroll() {
  const [items, setItems] = useState<number[]>([])
  const [page, setPage] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // 마지막 요소가 보이면 다음 페이지 로드
          setPage(prev => prev + 1)
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // 페이지가 변경되면 데이터 로드
    const newItems = Array.from({ length: 20 }, (_, i) => page * 20 + i)
    setItems(prev => [...prev, ...newItems])
  }, [page])

  return (
    <div>
      {items.map(item => (
        <div key={item}>Item {item}</div>
      ))}
      <div ref={loaderRef}>로딩 중...</div>
    </div>
  )
}
```

---

## Chapter 8: useContext - 전역 상태 관리

### 8.1 Context API란?

Props Drilling 문제를 해결하기 위한 React의 내장 상태 관리 솔루션입니다.

**Context 생성 3단계:**
1. Context 생성 (`createContext`)
2. Provider로 값 제공
3. Consumer에서 값 사용 (`useContext`)

### 8.2 기본 사용법

```typescript
import { createContext, useContext, useState } from 'react'

// 1. Context 생성
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 2. Provider 컴포넌트
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Custom Hook으로 사용 편의성 향상
function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// 4. 사용
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  )
}

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '다크모드' : '라이트모드'}
      </button>
    </header>
  )
}
```

### 8.3 실전 예제: 사용자 인증 Context

**`src/contexts/UserContext.tsx`**

```typescript
import { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@models/user'
import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          displayName: firebaseUser.displayName ?? '',
          photoURL: firebaseUser.photoURL ?? '',
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

// 사용
function Profile() {
  const { user, loading } = useUser()

  if (loading) return <div>로딩 중...</div>
  if (!user) return <div>로그인이 필요합니다</div>

  return <div>{user.displayName}님 환영합니다!</div>
}
```

### 8.4 여러 Context 조합

```typescript
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <LanguageProvider>
          <NotificationProvider>
            <Router />
          </NotificationProvider>
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

// 또는 Provider 조합 컴포넌트
function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

function App() {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  )
}
```

### 8.5 Context 성능 최적화

```typescript
// ❌ 성능 문제: 모든 consumer가 리렌더링됨
function BadProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [settings, setSettings] = useState({})

  // 매 렌더링마다 새 객체 생성
  return (
    <UserContext.Provider value={{ user, setUser, settings, setSettings }}>
      {children}
    </UserContext.Provider>
  )
}

// ✅ 개선: Context 분리
const UserContext = createContext(null)
const SettingsContext = createContext(null)

function GoodProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [settings, setSettings] = useState({})

  const userValue = useMemo(() => ({ user, setUser }), [user])
  const settingsValue = useMemo(() => ({ settings, setSettings }), [settings])

  return (
    <UserContext.Provider value={userValue}>
      <SettingsContext.Provider value={settingsValue}>
        {children}
      </SettingsContext.Provider>
    </UserContext.Provider>
  )
}
```

### 8.6 Context vs Props vs 상태 관리 라이브러리

```typescript
// Props: 1-2단계 전달
function Parent() {
  const [user, setUser] = useState(null)
  return <Child user={user} />
}

// Context: 여러 단계 전달, 중간 컴포넌트 불필요
<UserContext.Provider value={user}>
  <DeepChild />  {/* 중간 컴포넌트들이 user를 전달할 필요 없음 */}
</UserContext.Provider>

// Zustand/Redux: 복잡한 전역 상태
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

---

# Part 3: 실전 React 패턴

## Chapter 9: Custom Hooks - 로직 재사용

### 9.1 Custom Hook이란?

Custom Hook은 상태 관리 로직을 재사용 가능한 함수로 추출하는 패턴입니다.

**규칙:**
- 이름은 `use`로 시작
- 다른 Hook을 사용할 수 있음
- 컴포넌트가 아니므로 JSX 반환 불가

### 9.2 기본 Custom Hook 예제

```typescript
// useToggle Hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}

// 사용
function Modal() {
  const { value: isOpen, toggle, setTrue, setFalse } = useToggle()

  return (
    <div>
      <button onClick={setTrue}>열기</button>
      {isOpen && (
        <div>
          <p>모달 내용</p>
          <button onClick={setFalse}>닫기</button>
        </div>
      )}
    </div>
  )
}
```

### 9.3 실전 Custom Hooks

#### useDebounce

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// 사용
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearch) {
      searchAPI(debouncedSearch)
    }
  }, [debouncedSearch])

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  )
}
```

#### useLocalStorage

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

// 사용
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      현재 테마: {theme}
    </button>
  )
}
```

#### useIntersectionObserver

```typescript
function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options])

  return isIntersecting
}

// 사용
function LazyImage({ src }: { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const isVisible = useIntersectionObserver(imgRef, { threshold: 0.1 })

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : '/placeholder.jpg'}
      alt="지연 로딩 이미지"
    />
  )
}
```

---

## Chapter 10: React Router - SPA 라우팅

### 10.1 React Router 설정

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelListPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### 10.2 네비게이션

```typescript
import { Link, useNavigate } from 'react-router-dom'

function Navigation() {
  const navigate = useNavigate()

  return (
    <nav>
      {/* Link 컴포넌트 */}
      <Link to="/">홈</Link>
      <Link to="/hotels">호텔 목록</Link>

      {/* 프로그래밍 방식 네비게이션 */}
      <button onClick={() => navigate('/hotels')}>호텔 보기</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </nav>
  )
}
```

### 10.3 URL 파라미터와 쿼리스트링

```typescript
import { useParams, useSearchParams } from 'react-router-dom'

// URL 파라미터: /hotel/:id
function HotelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: hotel } = useHotel({ id: id! })

  return <div>{hotel?.name}</div>
}

// 쿼리스트링: /hotels?filter=popular&sort=price
function HotelListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filter = searchParams.get('filter') // 'popular'
  const sort = searchParams.get('sort') // 'price'

  const updateFilter = (newFilter: string) => {
    setSearchParams({ filter: newFilter, sort: sort ?? 'price' })
  }

  return <div>...</div>
}
```

### 10.4 Protected Route (인증 라우트)

```typescript
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()

  if (loading) {
    return <div>로딩 중...</div>
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

// 사용
function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SigninPage />} />
      <Route
        path="/my"
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
```

---

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

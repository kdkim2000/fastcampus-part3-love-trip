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

React는 2013년 Facebook(현 Meta)에서 개발하여 오픈소스로 공개한 **사용자 인터페이스(UI)를 구축하기 위한 JavaScript 라이브러리**입니다.

#### 왜 React를 사용할까?

전통적인 웹 개발에서는 HTML, CSS, JavaScript를 각각 분리하여 작성했습니다. 하지만 현대의 웹 애플리케이션은 매우 복잡하고 동적이어서, 단순히 HTML을 조작하는 방식으로는 관리하기 어려워졌습니다.

**전통적인 방식의 문제점:**
```javascript
// 전통적인 JavaScript (jQuery 스타일)
$('#button').click(function() {
  $('#counter').text(parseInt($('#counter').text()) + 1)
  if (parseInt($('#counter').text()) > 10) {
    $('#message').text('10을 넘었습니다!')
    $('#message').show()
  }
})
```

위 코드는 여러 DOM 요소를 직접 조작하므로, 애플리케이션이 커질수록 코드가 복잡해지고 버그가 발생하기 쉽습니다.

**React의 해결 방법:**
```javascript
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      {count > 10 && <p>10을 넘었습니다!</p>}
    </div>
  )
}
```

React는 데이터(state)가 변경되면 자동으로 UI를 업데이트해줍니다. 개발자는 "어떻게 UI를 업데이트할지" 고민하지 않고, "어떤 UI를 보여줄지"만 선언하면 됩니다.

#### React의 3가지 핵심 개념

**1. 컴포넌트 기반 아키텍처 (Component-Based Architecture)**

컴포넌트는 UI를 구성하는 독립적이고 재사용 가능한 조각입니다. 레고 블록처럼 작은 컴포넌트를 조립하여 복잡한 UI를 만들 수 있습니다.

```
앱 전체
├── Header
│   ├── Logo
│   ├── Navigation
│   └── UserMenu
├── Main
│   ├── HotelList
│   │   ├── HotelItem (반복)
│   │   └── HotelItem (반복)
│   └── Pagination
└── Footer
```

**장점:**
- **재사용성**: 한 번 만든 컴포넌트를 여러 곳에서 사용 가능
- **유지보수성**: 각 컴포넌트가 독립적이므로 수정이 쉬움
- **테스트 용이성**: 작은 단위로 테스트 가능

**2. 선언적 프로그래밍 (Declarative Programming)**

**명령형 프로그래밍** (어떻게 할지 명령):
```javascript
// DOM을 직접 조작
const element = document.createElement('div')
element.className = 'container'
element.textContent = 'Hello'
document.body.appendChild(element)
```

**선언적 프로그래밍** (무엇을 보여줄지 선언):
```javascript
// React - 결과만 선언
function App() {
  return <div className="container">Hello</div>
}
```

React에서는 "최종 결과"만 선언하면, React가 알아서 DOM을 업데이트합니다.

**3. Virtual DOM (가상 DOM)**

**DOM (Document Object Model)이란?**
브라우저가 HTML 문서를 트리 구조로 표현한 것입니다. JavaScript로 DOM을 조작할 수 있지만, DOM 조작은 매우 느린 작업입니다.

**Virtual DOM의 동작 원리:**

1. **초기 렌더링**: React가 Virtual DOM(메모리 상의 가상 DOM 트리)을 생성
2. **상태 변경**: 데이터가 변경되면 새로운 Virtual DOM 생성
3. **비교 (Diffing)**: 이전 Virtual DOM과 새 Virtual DOM을 비교
4. **최소한의 업데이트**: 변경된 부분만 실제 DOM에 반영

```
[이전 Virtual DOM]     [새로운 Virtual DOM]
<div>                   <div>
  <p>Count: 5</p>  →      <p>Count: 6</p>  ← 여기만 변경됨
  <button>+</button>      <button>+</button>
</div>                  </div>

→ 실제 DOM에서는 숫자 "5"를 "6"으로만 변경
```

**장점:**
- 불필요한 DOM 조작 최소화로 **성능 향상**
- 개발자는 성능 걱정 없이 편하게 개발 가능

#### React vs 다른 프레임워크

| 특징 | React | Vue | Angular |
|------|-------|-----|---------|
| 타입 | 라이브러리 | 프레임워크 | 프레임워크 |
| 학습 곡선 | 중간 | 쉬움 | 어려움 |
| 생태계 | 매우 큼 | 중간 | 큼 |
| 유연성 | 높음 | 높음 | 낮음 (정해진 구조) |
| 채용 시장 | 매우 큼 | 중간 | 중간 |

---

### 1.2 JSX (JavaScript XML)

JSX는 JavaScript를 확장한 문법으로, **JavaScript 코드 안에서 HTML과 유사한 마크업을 작성**할 수 있게 해줍니다.

#### JSX가 필요한 이유

**JSX 없이 (순수 JavaScript):**
```javascript
// React.createElement로 작성
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'Welcome to React')
)
```

**JSX 사용:**
```javascript
// 훨씬 읽기 쉽고 HTML과 유사
const element = (
  <div className="container">
    <h1>Hello</h1>
    <p>Welcome to React</p>
  </div>
)
```

JSX는 코드의 가독성을 높이고, UI 구조를 직관적으로 표현할 수 있게 해줍니다.

#### JSX의 동작 원리

JSX는 브라우저가 직접 이해할 수 없는 문법입니다. **Babel**이라는 도구가 JSX를 일반 JavaScript로 변환(트랜스파일)합니다.

```jsx
// 우리가 작성하는 JSX
const element = <h1 className="title">Hello</h1>

// Babel이 변환한 JavaScript
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello'
)
```

#### JSX 문법 규칙

**1. 하나의 부모 요소로 감싸야 함**

```jsx
// ❌ 오류: 여러 개의 최상위 요소
function App() {
  return (
    <h1>제목</h1>
    <p>내용</p>
  )
}

// ✅ 올바름: 하나의 부모로 감쌈
function App() {
  return (
    <div>
      <h1>제목</h1>
      <p>내용</p>
    </div>
  )
}

// ✅ 또는 Fragment 사용 (빈 태그)
function App() {
  return (
    <>
      <h1>제목</h1>
      <p>내용</p>
    </>
  )
}
```

**왜 하나로 감싸야 할까?**
함수는 하나의 값만 반환할 수 있기 때문입니다. JSX는 결국 `React.createElement()` 호출로 변환되므로, 여러 개를 반환할 수 없습니다.

**2. JavaScript 표현식 삽입: 중괄호 `{}`**

```jsx
function Greeting() {
  const name = '철수'
  const age = 25
  const isAdult = age >= 19

  return (
    <div>
      {/* 변수 출력 */}
      <h1>안녕하세요, {name}님!</h1>

      {/* 계산식 */}
      <p>내년 나이: {age + 1}세</p>

      {/* 조건부 렌더링 */}
      <p>{isAdult ? '성인' : '미성년자'}</p>

      {/* 함수 호출 */}
      <p>{name.toUpperCase()}</p>

      {/* 배열 렌더링 */}
      <ul>
        {['사과', '바나나', '오렌지'].map(fruit => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  )
}
```

**주의:** `{}` 안에는 **표현식(expression)**만 사용 가능합니다. 문(statement)은 사용할 수 없습니다.

```jsx
// ❌ 오류: if문은 표현식이 아닌 문(statement)
<div>
  {if (isLoggedIn) { return <p>환영합니다</p> }}
</div>

// ✅ 올바름: 삼항 연산자는 표현식
<div>
  {isLoggedIn ? <p>환영합니다</p> : <p>로그인하세요</p>}
</div>
```

**3. 속성명은 camelCase**

JSX는 JavaScript이므로, HTML 속성명을 camelCase로 작성합니다.

```jsx
// HTML
<div class="container" onclick="handleClick()">
  <label for="input">이름</label>
  <input tabindex="1" />
</div>

// JSX
<div className="container" onClick={handleClick}>
  <label htmlFor="input">이름</label>
  <input tabIndex={1} />
</div>
```

**주요 변경사항:**
- `class` → `className` (class는 JavaScript 예약어)
- `for` → `htmlFor` (for는 JavaScript 예약어)
- `onclick` → `onClick`
- `tabindex` → `tabIndex`

**4. 모든 태그는 닫아야 함**

```jsx
// HTML에서는 가능
<input type="text">
<br>
<img src="image.jpg">

// JSX에서는 반드시 닫아야 함
<input type="text" />
<br />
<img src="image.jpg" />
```

**5. 주석 작성법**

```jsx
function App() {
  return (
    <div>
      {/* JSX 안에서 주석 */}
      <h1>제목</h1>

      {/*
        여러 줄
        주석도 가능
      */}

      <p>내용</p>
    </div>
  )

  // JSX 밖에서는 일반 JavaScript 주석
}
```

#### JSX에서 스타일 적용하기

**1. 인라인 스타일 (객체 형태)**

```jsx
function StyledComponent() {
  // 스타일 객체 (camelCase 사용)
  const titleStyle = {
    color: 'blue',
    fontSize: '24px',        // 'font-size' → fontSize
    backgroundColor: 'yellow', // 'background-color' → backgroundColor
    marginTop: '10px'
  }

  return (
    <div>
      {/* 방법 1: 변수 사용 */}
      <h1 style={titleStyle}>제목</h1>

      {/* 방법 2: 직접 객체 전달 (이중 중괄호) */}
      <p style={{ color: 'red', fontSize: '16px' }}>내용</p>
    </div>
  )
}
```

**왜 이중 중괄호 `{{ }}`를 쓸까?**
- 바깥 `{}`: JavaScript 표현식을 삽입
- 안쪽 `{}`: JavaScript 객체를 표현

**2. className으로 CSS 클래스 적용**

```jsx
// App.css
.title {
  color: blue;
  font-size: 24px;
}

// App.tsx
import './App.css'

function App() {
  return <h1 className="title">제목</h1>
}
```

#### 조건부 렌더링

**1. 삼항 연산자**

```jsx
function LoginButton() {
  const isLoggedIn = false

  return (
    <div>
      {isLoggedIn ? (
        <button>로그아웃</button>
      ) : (
        <button>로그인</button>
      )}
    </div>
  )
}
```

**2. && 연산자 (true일 때만 렌더링)**

```jsx
function Notification() {
  const hasNewMessage = true
  const messageCount = 5

  return (
    <div>
      <h1>알림</h1>
      {/* hasNewMessage가 true일 때만 뒤의 내용 렌더링 */}
      {hasNewMessage && <p>새로운 메시지가 {messageCount}개 있습니다</p>}
    </div>
  )
}
```

**주의:** 숫자 `0`은 화면에 표시됩니다!

```jsx
const count = 0

// ❌ 화면에 "0"이 표시됨
{count && <p>개수: {count}</p>}

// ✅ 올바른 방법
{count > 0 && <p>개수: {count}</p>}
```

**3. 변수에 JSX 저장**

```jsx
function Welcome() {
  const isLoggedIn = true

  let content
  if (isLoggedIn) {
    content = <p>환영합니다!</p>
  } else {
    content = <p>로그인이 필요합니다</p>
  }

  return <div>{content}</div>
}
```

#### 리스트 렌더링

배열을 화면에 표시할 때는 `map()` 메서드를 사용합니다.

```jsx
function FruitList() {
  const fruits = ['사과', '바나나', '오렌지']

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}
```

**`key` 속성은 왜 필요할까?**

React가 어떤 항목이 변경/추가/삭제되었는지 식별하기 위해 필요합니다.

```jsx
// ❌ key가 없으면 경고 발생
{fruits.map(fruit => <li>{fruit}</li>)}

// ✅ key 제공 (고유한 값 사용)
{fruits.map(fruit => <li key={fruit}>{fruit}</li>)}

// 객체 배열의 경우
const hotels = [
  { id: 1, name: '호텔A' },
  { id: 2, name: '호텔B' }
]

{hotels.map(hotel => (
  <div key={hotel.id}>{hotel.name}</div>
))}
```

**⚠️ index를 key로 사용하면 안 되는 경우:**

항목의 순서가 바뀔 수 있는 경우 index를 key로 사용하면 버그가 발생할 수 있습니다.

```jsx
// ❌ 나쁜 예: 항목 순서가 바뀔 수 있음
{items.map((item, index) => <TodoItem key={index} item={item} />)}

// ✅ 좋은 예: 고유한 ID 사용
{items.map(item => <TodoItem key={item.id} item={item} />)}
```

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

컴포넌트는 React 애플리케이션을 구성하는 **독립적이고 재사용 가능한 UI 조각**입니다. 마치 레고 블록처럼 작은 컴포넌트들을 조합하여 복잡한 UI를 만들 수 있습니다.

#### 컴포넌트가 왜 중요한가?

전통적인 웹 개발에서는 HTML, CSS, JavaScript를 각각 분리했습니다. 하지만 현대 웹 애플리케이션에서는 **관련된 로직과 UI를 함께 묶는 것**이 더 효율적입니다.

**전통적인 방식:**
```
📁 프로젝트/
├── 📄 index.html        (모든 HTML 구조)
├── 📄 styles.css        (모든 스타일)
└── 📄 script.js         (모든 JavaScript)
```

**컴포넌트 방식:**
```
📁 src/components/
├── 📁 Header/
│   ├── Header.tsx       (구조 + 로직)
│   └── Header.css       (스타일)
├── 📁 HotelList/
│   ├── HotelList.tsx
│   └── HotelItem.tsx
└── 📁 Footer/
    └── Footer.tsx
```

#### 컴포넌트의 종류

**1. 함수형 컴포넌트 (Function Component)** - 현대 React의 표준

```typescript
// 가장 기본적인 함수형 컴포넌트
function Welcome() {
  return <h1>환영합니다!</h1>
}

// 화살표 함수로도 작성 가능
const Welcome = () => {
  return <h1>환영합니다!</h1>
}

// return이 한 줄이면 괄호 생략 가능
const Welcome = () => <h1>환영합니다!</h1>
```

**2. 클래스형 컴포넌트 (Class Component)** - 레거시 방식

```typescript
// 예전 방식 (더 이상 권장하지 않음)
class Welcome extends React.Component {
  render() {
    return <h1>환영합니다!</h1>
  }
}
```

**함수형 컴포넌트가 선호되는 이유:**
- 더 간결하고 읽기 쉬움
- Hooks를 사용할 수 있음 (useState, useEffect 등)
- 성능이 약간 더 좋음
- 코드량이 적음

#### 컴포넌트 명명 규칙

```typescript
// ✅ 올바름: PascalCase (첫 글자 대문자)
function UserProfile() { }
function HotelList() { }
function MyCustomButton() { }

// ❌ 잘못됨: camelCase (첫 글자 소문자)
function userProfile() { }  // React가 컴포넌트로 인식 못함
function hotelList() { }

// ❌ 잘못됨: kebab-case
function user-profile() { }  // 문법 오류
```

**왜 PascalCase를 써야 할까?**
React는 소문자로 시작하는 태그를 HTML 태그로 인식합니다.

```jsx
// userProfile을 HTML 태그로 인식
<userProfile />  // <userprofile></userprofile>로 렌더링

// UserProfile을 컴포넌트로 인식
<UserProfile />  // UserProfile 컴포넌트 렌더링
```

#### 컴포넌트 분리 기준

**언제 새로운 컴포넌트로 분리해야 할까?**

1. **재사용이 필요한 경우**
```typescript
// Button을 여러 곳에서 사용
<Button>저장</Button>
<Button>취소</Button>
<Button>확인</Button>
```

2. **코드가 너무 길어진 경우** (보통 200줄 이상)
```typescript
// ❌ 너무 긴 컴포넌트
function Dashboard() {
  // 300줄의 코드...
}

// ✅ 여러 컴포넌트로 분리
function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <DashboardFooter />
    </>
  )
}
```

3. **독립적인 기능을 가진 경우**
```typescript
// 검색창은 독립적인 기능
function SearchBar() { }

// 호텔 목록은 독립적인 기능
function HotelList() { }
```

---

### 2.2 Props (Properties)

Props는 **부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법**입니다.

#### Props의 핵심 개념

**1. Props는 읽기 전용 (Read-Only)**

```typescript
function Greeting(props) {
  // ❌ 잘못됨: props를 수정할 수 없음
  props.name = '다른이름'  // 오류!

  // ✅ 올바름: props를 읽기만 함
  return <h1>안녕하세요, {props.name}님!</h1>
}
```

**왜 읽기 전용일까?**
- **예측 가능성**: 컴포넌트가 항상 같은 props에 대해 같은 결과를 반환
- **디버깅 용이**: 데이터 흐름을 추적하기 쉬움
- **순수 함수**: 같은 입력 → 같은 출력

**2. 단방향 데이터 흐름 (One-Way Data Flow)**

```
[부모 컴포넌트]
     ↓ props 전달
[자식 컴포넌트]
     ↓ props 전달
[손자 컴포넌트]
```

데이터는 항상 위에서 아래로만 흐릅니다.

```typescript
function Parent() {
  const userName = "김철수"

  return (
    <Child name={userName} />  // 부모 → 자식
  )
}

function Child(props) {
  return (
    <GrandChild name={props.name} />  // 자식 → 손자
  )
}

function GrandChild(props) {
  return <div>{props.name}</div>
}
```

#### Props 기본 사용법

**방법 1: props 객체로 받기**

```typescript
function Greeting(props) {
  return (
    <div>
      <h1>안녕하세요, {props.name}님!</h1>
      <p>나이: {props.age}세</p>
    </div>
  )
}

// 사용
<Greeting name="김철수" age={25} />
```

**방법 2: 구조 분해 할당 (Destructuring)** - 더 많이 사용됨

```typescript
function Greeting({ name, age }) {
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      <p>나이: {age}세</p>
    </div>
  )
}

// 사용
<Greeting name="김철수" age={25} />
```

**방법 3: TypeScript로 타입 지정** - 권장!

```typescript
// Props 타입 정의
interface GreetingProps {
  name: string
  age: number
  email?: string  // ? = 선택적 prop (없어도 됨)
}

function Greeting({ name, age, email }: GreetingProps) {
  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      <p>나이: {age}세</p>
      {email && <p>이메일: {email}</p>}
    </div>
  )
}

// 사용
<Greeting name="김철수" age={25} />
<Greeting name="이영희" age={30} email="younghee@example.com" />
```

#### Props의 다양한 타입

**1. 기본 타입 (문자열, 숫자, 불리언)**

```typescript
function UserCard({ name, age, isActive }) {
  return (
    <div>
      {/* 문자열: 따옴표 또는 중괄호 */}
      <h1>{name}</h1>

      {/* 숫자: 중괄호 필수 */}
      <p>나이: {age}</p>

      {/* 불리언: 중괄호 필수 */}
      {isActive && <span>활성</span>}
    </div>
  )
}

// 사용
<UserCard name="김철수" age={25} isActive={true} />

// 문자열은 따옴표만으로도 전달 가능
<UserCard name="김철수" age={25} isActive={true} />
```

**2. 객체**

```typescript
interface User {
  name: string
  age: number
  email: string
}

function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.age}세</p>
      <p>{user.email}</p>
    </div>
  )
}

// 사용
const userData = {
  name: "김철수",
  age: 25,
  email: "chulsoo@example.com"
}

<UserProfile user={userData} />
```

**3. 배열**

```typescript
function FruitList({ fruits }: { fruits: string[] }) {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}

// 사용
<FruitList fruits={["사과", "바나나", "오렌지"]} />
```

**4. 함수 (이벤트 핸들러)**

```typescript
function Button({ onClick, label }: {
  onClick: () => void
  label: string
}) {
  return <button onClick={onClick}>{label}</button>
}

// 사용
function App() {
  const handleClick = () => {
    alert("버튼 클릭!")
  }

  return <Button onClick={handleClick} label="클릭하세요" />
}
```

**5. JSX/React 요소**

```typescript
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}

// 사용
<Card>
  <h1>제목</h1>
  <p>내용</p>
</Card>
```

#### 기본값 설정 (Default Props)

**방법 1: 구조 분해 할당에서 기본값**

```typescript
function Button({
  color = 'blue',
  size = 'medium',
  disabled = false
}) {
  return (
    <button
      style={{
        backgroundColor: color,
        fontSize: size === 'large' ? '18px' : '14px'
      }}
      disabled={disabled}
    >
      버튼
    </button>
  )
}

// 사용
<Button />  // 모두 기본값 사용
<Button color="red" />  // color만 변경
<Button color="green" size="large" />
```

**방법 2: TypeScript 타입과 함께**

```typescript
interface ButtonProps {
  color?: string
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: React.ReactNode
}

function Button({
  color = 'blue',
  size = 'medium',
  disabled = false,
  children
}: ButtonProps) {
  return (
    <button>{children}</button>
  )
}
```

#### Props 전개 연산자 (Spread Operator)

나머지 모든 props를 한 번에 전달할 때 유용합니다.

```typescript
function Input({ label, ...rest }) {
  return (
    <div>
      <label>{label}</label>
      {/* 나머지 모든 props를 input에 전달 */}
      <input {...rest} />
    </div>
  )
}

// 사용
<Input
  label="이름"
  type="text"
  placeholder="이름을 입력하세요"
  maxLength={20}
  required
/>
```

**TypeScript 버전:**

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function Input({ label, ...rest }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
    </div>
  )
}
```

#### Children Prop

`children`은 특별한 prop으로, 컴포넌트 태그 사이의 내용을 받습니다.

```typescript
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}

// 사용
<Card>
  <h1>제목</h1>
  <p>내용</p>
  <button>버튼</button>
</Card>
```

**children의 타입:**
- `React.ReactNode`: 가장 넓은 타입 (문자열, 숫자, JSX 등 모두 가능)
- `React.ReactElement`: JSX 요소만
- `string`: 문자열만
- `number`: 숫자만

```typescript
// React.ReactNode - 가장 유연함
function Container({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

<Container>Hello</Container>
<Container>{123}</Container>
<Container><div>JSX</div></Container>
<Container>{null}</Container>  // null도 가능

// React.ReactElement - JSX만
function Wrapper({ children }: { children: React.ReactElement }) {
  return <div>{children}</div>
}

<Wrapper><div>OK</div></Wrapper>
<Wrapper>Text</Wrapper>  // ❌ 오류: 문자열은 안 됨
```

#### Props 검증과 에러 방지

```typescript
interface UserCardProps {
  name: string        // 필수
  age?: number       // 선택
  email?: string     // 선택
}

function UserCard({ name, age, email }: UserCardProps) {
  return (
    <div>
      <h1>{name}</h1>
      {/* age가 있을 때만 표시 */}
      {age && <p>나이: {age}세</p>}
      {/* email이 있을 때만 표시 */}
      {email && <p>이메일: {email}</p>}
    </div>
  )
}

// ✅ 정상: name은 필수
<UserCard name="김철수" />

// ❌ 오류: name이 없음
<UserCard age={25} />

// ✅ 정상: 선택적 props 추가
<UserCard name="김철수" age={25} email="kim@example.com" />
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

State는 컴포넌트가 가지는 **동적으로 변하는 데이터**입니다. State가 변경되면 React는 자동으로 컴포넌트를 **다시 렌더링(re-render)**하여 화면을 업데이트합니다.

#### State가 필요한 이유

**State 없이 (일반 변수):**
```typescript
function Counter() {
  let count = 0  // 일반 변수

  const handleClick = () => {
    count = count + 1
    console.log(count)  // 콘솔에는 1, 2, 3... 출력됨
  }

  // ❌ 문제: 화면은 업데이트되지 않음!
  return (
    <div>
      <p>카운트: {count}</p>  {/* 항상 0으로 표시 */}
      <button onClick={handleClick}>증가</button>
    </div>
  )
}
```

일반 변수는 값이 변경되어도 **React가 이를 감지하지 못하므로** 화면이 업데이트되지 않습니다.

**State 사용:**
```typescript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // State 사용

  const handleClick = () => {
    setCount(count + 1)
    // ✅ State 변경 → React가 감지 → 자동으로 화면 업데이트!
  }

  return (
    <div>
      <p>카운트: {count}</p>  {/* 1, 2, 3... 제대로 표시됨 */}
      <button onClick={handleClick}>증가</button>
    </div>
  )
}
```

#### Props vs State

| 구분 | Props | State |
|------|-------|-------|
| 정의 | 부모로부터 받는 데이터 | 컴포넌트 내부의 데이터 |
| 변경 가능? | ❌ 읽기 전용 (자식이 변경 불가) | ✅ setState로 변경 가능 |
| 변경 시 | 부모가 변경해야 함 | 컴포넌트 내부에서 변경 |
| 용도 | 컴포넌트 설정값 전달 | 동적인 데이터 관리 |

**예시로 이해하기:**
```typescript
// Props: 부모가 주는 설정값 (읽기 전용)
function Button({ color, text }) {
  // color, text는 props (변경 불가)
  return <button style={{ color }}>{text}</button>
}

// State: 컴포넌트 내부의 변하는 값
function Counter() {
  const [count, setCount] = useState(0)  // State (변경 가능)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
```

---

### 3.2 useState 기본

`useState`는 React에서 State를 관리하기 위한 **Hook**입니다.

#### useState 기본 문법

```typescript
import { useState } from 'react'

function Component() {
  // [현재 값, 값을 변경하는 함수] = useState(초기값)
  const [state, setState] = useState(initialValue)
}
```

**구조:**
- **첫 번째 값**: 현재 state 값 (읽기용)
- **두 번째 값**: state를 변경하는 함수
- **괄호 안**: 초기값

#### useState 동작 이해하기

```typescript
function Counter() {
  const [count, setCount] = useState(0)

  console.log('렌더링!')

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

**실행 순서:**
1. **초기 렌더링**: `count = 0`, 화면에 "0" 표시
2. **버튼 클릭**: `setCount(1)` 호출
3. **리렌더링 발생**: 컴포넌트 함수 다시 실행, `count = 1`
4. **화면 업데이트**: "1" 표시
5. **또 클릭**: `setCount(2)` → 리렌더링 → "2" 표시

**중요한 원칙:**
- **State 변경은 반드시 setState 함수를 통해서만** 해야 함
- `count = count + 1` ❌ (동작 안 함)
- `setCount(count + 1)` ✅ (올바름)

#### 다양한 타입의 State

**1. 숫자 (Number)**
```typescript
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>초기화</button>
    </div>
  )
}
```

**2. 문자열 (String)**
```typescript
function NameInput() {
  const [name, setName] = useState('')

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <p>입력한 이름: {name}</p>
    </div>
  )
}
```

**3. 불리언 (Boolean)**
```typescript
function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false)

  return (
    <div>
      <p>스위치: {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => setIsOn(!isOn)}>
        토글
      </button>
    </div>
  )
}
```

**4. 배열 (Array)**
```typescript
function FruitList() {
  const [fruits, setFruits] = useState(['사과', '바나나'])

  const addFruit = () => {
    setFruits([...fruits, '오렌지'])
  }

  return (
    <div>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
      <button onClick={addFruit}>과일 추가</button>
    </div>
  )
}
```

**5. 객체 (Object)**
```typescript
function UserProfile() {
  const [user, setUser] = useState({
    name: '김철수',
    age: 25,
    email: 'kim@example.com'
  })

  const updateName = () => {
    setUser({
      ...user,           // 기존 값 복사
      name: '이영희'     // 이름만 변경
    })
  }

  return (
    <div>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <button onClick={updateName}>이름 변경</button>
    </div>
  )
}
```

#### TypeScript와 함께 사용하기

```typescript
// 타입 지정
const [count, setCount] = useState<number>(0)
const [name, setName] = useState<string>('')
const [isOpen, setIsOpen] = useState<boolean>(false)

// 인터페이스 사용
interface User {
  name: string
  age: number
}

const [user, setUser] = useState<User>({
  name: '김철수',
  age: 25
})

// 초기값이 null일 수 있는 경우
const [user, setUser] = useState<User | null>(null)
```

#### State 업데이트 시 주의사항

**❌ 잘못된 방법 - 직접 수정**
```typescript
function Counter() {
  const [count, setCount] = useState(0)

  const wrongWay = () => {
    count = count + 1  // ❌ 동작 안 함!
    count++            // ❌ 동작 안 함!
  }

  return <button onClick={wrongWay}>증가</button>
}
```

**✅ 올바른 방법 - setState 사용**
```typescript
function Counter() {
  const [count, setCount] = useState(0)

  const rightWay = () => {
    setCount(count + 1)  // ✅ 올바름
  }

  return <button onClick={rightWay}>증가</button>
}
```

#### 여러 번 업데이트하기

```typescript
function Counter() {
  const [count, setCount] = useState(0)

  // ❌ 잘못된 방법: 세 번 호출해도 1만 증가
  const incrementWrong = () => {
    setCount(count + 1)  // 0 + 1 = 1
    setCount(count + 1)  // 0 + 1 = 1
    setCount(count + 1)  // 0 + 1 = 1
    // 결과: count는 1 (예상: 3)
  }

  // ✅ 올바른 방법: 함수형 업데이트
  const incrementCorrect = () => {
    setCount(prev => prev + 1)  // 0 + 1 = 1
    setCount(prev => prev + 1)  // 1 + 1 = 2
    setCount(prev => prev + 1)  // 2 + 1 = 3
    // 결과: count는 3 ✅
  }

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={incrementCorrect}>+3</button>
    </div>
  )
}
```

**왜 이런 차이가 생길까?**
- `setCount(count + 1)`: 현재 count 값(0)을 기준으로 계산
- `setCount(prev => prev + 1)`: 이전 state 값을 기준으로 계산

#### 실전 예제: 간단한 카운터

```typescript
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>카운터</h1>
      <p style={{ fontSize: '48px' }}>{count}</p>

      <div>
        <button onClick={() => setCount(count + 1)}>
          +1
        </button>
        <button onClick={() => setCount(count - 1)}>
          -1
        </button>
        <button onClick={() => setCount(count + 10)}>
          +10
        </button>
        <button onClick={() => setCount(0)}>
          초기화
        </button>
      </div>

      {/* 조건부 렌더링 */}
      {count > 10 && <p>10을 넘었습니다!</p>}
      {count < 0 && <p>음수입니다!</p>}
    </div>
  )
}
```

### 3.3 여러 개의 State 관리

하나의 컴포넌트에서 여러 개의 State를 관리해야 하는 경우가 많습니다.

#### 방법 1: 개별 State로 관리

```typescript
function SignupForm() {
  // 각각 별도의 State로 관리
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    if (!email) {
      alert('이메일을 입력해주세요')
      return
    }
    if (!password) {
      alert('비밀번호를 입력해주세요')
      return
    }
    if (!agreeToTerms) {
      alert('약관에 동의해주세요')
      return
    }

    // 서버로 데이터 전송
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

**장점:**
- 간단하고 직관적
- 각 State가 독립적

**단점:**
- State가 많아지면 관리가 복잡해짐
- 함수가 많아짐 (setEmail, setPassword, setName...)

---

### 3.4 객체 State 관리

여러 개의 관련된 값을 **하나의 객체로 묶어서** 관리하면 더 편리합니다.

#### 객체 State의 필요성

```typescript
// ❌ 개별 State - 관리가 복잡함
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')
const [age, setAge] = useState(0)
const [address, setAddress] = useState('')

// ✅ 객체 State - 관리가 쉬움
const [user, setUser] = useState({
  email: '',
  password: '',
  name: '',
  age: 0,
  address: ''
})
```

#### 객체 State 사용법

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
      ...prev,      // 기존 값 복사 (중요!)
      [name]: value // 특정 필드만 업데이트
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)  // { email: '...', password: '...', name: '...' }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"  // name 속성이 중요!
        value={form.email}
        onChange={handleChange}
        placeholder="이메일"
      />
      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <button type="submit">회원가입</button>
    </form>
  )
}
```

#### 객체 State 업데이트 주의사항

**❌ 잘못된 방법 - 직접 수정**
```typescript
const [user, setUser] = useState({ name: '김철수', age: 25 })

// ❌ 직접 수정 - 동작 안 함!
user.age = 26

// ❌ 일부만 업데이트 - 나머지 값이 사라짐!
setUser({ age: 26 })  // name이 사라짐!
```

**✅ 올바른 방법 - 스프레드 연산자 사용**
```typescript
const [user, setUser] = useState({ name: '김철수', age: 25 })

// ✅ 올바름: 기존 값 복사 후 업데이트
setUser({
  ...user,    // 기존 값 복사
  age: 26     // age만 변경
})

// 결과: { name: '김철수', age: 26 } ✅
```

#### 중첩된 객체 업데이트

```typescript
const [user, setUser] = useState({
  name: '김철수',
  address: {
    city: '서울',
    street: '강남구'
  }
})

// city만 변경하고 싶을 때
setUser({
  ...user,
  address: {
    ...user.address,  // address 내부도 복사
    city: '부산'      // city만 변경
  }
})
```

---

### 3.5 배열 State 관리

배열을 State로 관리할 때는 **불변성(Immutability)**을 유지해야 합니다.

#### 배열의 불변성이란?

배열을 직접 수정하지 않고, **새로운 배열을 만들어서** 업데이트하는 것입니다.

```typescript
const [items, setItems] = useState([1, 2, 3])

// ❌ 직접 수정 - 동작 안 함!
items.push(4)
items[0] = 10

// ✅ 새 배열 생성 - 올바름
setItems([...items, 4])           // 추가
setItems(items.map(x => x * 2))   // 변경
setItems(items.filter(x => x > 1)) // 삭제
```

#### 배열 CRUD 완전 정복

```typescript
interface Todo {
  id: number
  text: string
  completed: boolean
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  // 1. 추가 (Create)
  const addTodo = () => {
    if (input.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false
    }

    setTodos([...todos, newTodo])  // 끝에 추가
    // 또는 setTodos(prev => [...prev, newTodo])
    setInput('')
  }

  // 2. 읽기 (Read) - todos를 그대로 사용

  // 3. 수정 (Update)
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }  // 해당 todo만 변경
        : todo                                      // 나머지는 그대로
    ))
  }

  const updateTodoText = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, text: newText }
        : todo
    ))
  }

  // 4. 삭제 (Delete)
  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // 전체 삭제
  const clearAll = () => {
    setTodos([])
  }

  // 완료된 항목만 삭제
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  return (
    <div>
      {/* 입력 */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>

      {/* 목록 */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>

      {/* 통계 */}
      <div>
        <p>전체: {todos.length}</p>
        <p>완료: {todos.filter(t => t.completed).length}</p>
        <p>미완료: {todos.filter(t => !t.completed).length}</p>
      </div>

      {/* 일괄 작업 */}
      <button onClick={clearCompleted}>완료된 항목 삭제</button>
      <button onClick={clearAll}>전체 삭제</button>
    </div>
  )
}
```

#### 배열 메서드 정리

| 작업 | 잘못된 방법 (직접 수정) | 올바른 방법 (새 배열 생성) |
|------|------------------------|-------------------------|
| 추가 (끝) | `arr.push(item)` ❌ | `[...arr, item]` ✅ |
| 추가 (앞) | `arr.unshift(item)` ❌ | `[item, ...arr]` ✅ |
| 삭제 | `arr.splice(index, 1)` ❌ | `arr.filter((_, i) => i !== index)` ✅ |
| 수정 | `arr[0] = newValue` ❌ | `arr.map((item, i) => i === 0 ? newValue : item)` ✅ |
| 정렬 | `arr.sort()` ❌ | `[...arr].sort()` ✅ |
| 역순 | `arr.reverse()` ❌ | `[...arr].reverse()` ✅ |

#### 객체 배열 관리 예제

```typescript
interface User {
  id: number
  name: string
  age: number
}

function UserList() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '김철수', age: 25 },
    { id: 2, name: '이영희', age: 30 }
  ])

  // 사용자 추가
  const addUser = (name: string, age: number) => {
    setUsers([
      ...users,
      { id: Date.now(), name, age }
    ])
  }

  // 특정 사용자의 나이 증가
  const incrementAge = (id: number) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, age: user.age + 1 }
        : user
    ))
  }

  // 이름으로 사용자 삭제
  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.age}세)
          <button onClick={() => incrementAge(user.id)}>+1</button>
          <button onClick={() => removeUser(user.id)}>삭제</button>
        </li>
      ))}
    </ul>
  )
}
```

### 3.6 이벤트 처리

React에서 이벤트를 처리하는 방법은 HTML과 유사하지만 몇 가지 중요한 차이점이 있습니다.

#### React 이벤트 vs HTML 이벤트

```html
<!-- HTML -->
<button onclick="handleClick()">클릭</button>

<!-- React -->
<button onClick={handleClick}>클릭</button>
```

**차이점:**
1. 이벤트명이 **camelCase** (`onClick`, `onChange`, `onSubmit`)
2. 함수 **자체를 전달** (`handleClick` not `handleClick()`)
3. 문자열이 아닌 **중괄호로 함수 전달**

#### 1. 클릭 이벤트

```typescript
function ClickExample() {
  const [count, setCount] = useState(0)

  // 방법 1: 함수 선언 후 전달
  const handleClick = () => {
    console.log('버튼 클릭!')
    setCount(count + 1)
  }

  // 방법 2: 파라미터가 있는 함수
  const handleClickWithParam = (message: string) => {
    console.log(message)
    setCount(count + 1)
  }

  return (
    <div>
      <p>클릭 횟수: {count}</p>

      {/* ✅ 방법 1: 함수 직접 전달 */}
      <button onClick={handleClick}>클릭</button>

      {/* ✅ 방법 2: 익명 함수 (간단한 경우) */}
      <button onClick={() => console.log('익명 함수')}>클릭</button>

      {/* ✅ 방법 3: 파라미터 전달 (화살표 함수로 감싸기) */}
      <button onClick={() => handleClickWithParam('안녕!')}>클릭</button>

      {/* ❌ 잘못됨: 함수가 즉시 실행됨! */}
      <button onClick={handleClick()}>클릭</button>
      {/* 렌더링될 때 handleClick()이 실행되고, 반환값(undefined)이 onClick에 할당됨 */}

      {/* ❌ 잘못됨: 파라미터 전달 시 화살표 함수 없이 */}
      <button onClick={handleClickWithParam('안녕!')}>클릭</button>
    </div>
  )
}
```

**중요한 차이 이해하기:**
```typescript
// ✅ 올바름: 함수를 전달 (클릭 시 실행됨)
onClick={handleClick}

// ❌ 잘못됨: 함수를 즉시 실행 (렌더링 시 실행됨)
onClick={handleClick()}

// ✅ 올바름: 파라미터가 필요한 경우 화살표 함수로 감싸기
onClick={() => handleClick('hello')}
```

#### 2. Input 이벤트 (onChange)

```typescript
function InputExample() {
  const [text, setText] = useState('')
  const [number, setNumber] = useState(0)
  const [checked, setChecked] = useState(false)

  return (
    <div>
      {/* 텍스트 입력 */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="텍스트 입력"
      />
      <p>입력: {text}</p>

      {/* 숫자 입력 */}
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>숫자: {number}</p>

      {/* 체크박스 */}
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        동의합니다
      </label>

      {/* Select (드롭다운) */}
      <select value={text} onChange={(e) => setText(e.target.value)}>
        <option value="">선택하세요</option>
        <option value="apple">사과</option>
        <option value="banana">바나나</option>
      </select>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여러 줄 입력"
      />
    </div>
  )
}
```

#### 3. Form 이벤트 (onSubmit)

```typescript
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // ⭐ 중요: 페이지 새로고침 방지!

    // 유효성 검사
    if (email === '' || password === '') {
      alert('모든 필드를 입력해주세요')
      return
    }

    // 서버로 데이터 전송
    console.log('로그인:', { email, password })

    // 입력 초기화
    setEmail('')
    setPassword('')
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

      {/* type="submit"인 버튼을 클릭하면 form의 onSubmit 이벤트 발생 */}
      <button type="submit">로그인</button>
    </form>
  )
}
```

**`e.preventDefault()`가 왜 필요할까?**

HTML form은 기본적으로 제출 시 페이지를 새로고침합니다. React에서는 이를 막아야 합니다.

```typescript
// e.preventDefault() 없으면:
// 1. 버튼 클릭
// 2. handleSubmit 실행
// 3. 페이지 새로고침 → State가 모두 초기화됨!

// e.preventDefault() 있으면:
// 1. 버튼 클릭
// 2. handleSubmit 실행
// 3. 페이지 새로고침 안 됨 → State 유지됨 ✅
```

#### 4. 키보드 이벤트

```typescript
function KeyboardExample() {
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')

  // Enter 키를 눌렀을 때 추가
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        setItems([...items, input])
        setInput('')
      }
    }
  }

  // ESC 키를 눌렀을 때 초기화
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setInput('')
    }
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}  // Enter
        onKeyDown={handleKeyDown}    // ESC
        placeholder="입력 후 Enter (ESC로 취소)"
      />
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
```

**주요 키보드 이벤트:**
- `onKeyPress`: 키를 눌렀을 때 (⚠️ deprecated, `onKeyDown` 사용 권장)
- `onKeyDown`: 키를 누르는 순간
- `onKeyUp`: 키를 떼는 순간

**자주 사용하는 키:**
- `e.key === 'Enter'` - Enter 키
- `e.key === 'Escape'` - ESC 키
- `e.key === 'Tab'` - Tab 키
- `e.key === ' '` - 스페이스 바
- `e.ctrlKey` - Ctrl 키가 눌렸는지
- `e.shiftKey` - Shift 키가 눌렸는지

#### 5. 이벤트 버블링 (Event Bubbling)

이벤트는 자식 → 부모 순서로 전파됩니다.

```typescript
function EventBubbling() {
  const handleParentClick = () => {
    console.log('1. 부모 클릭')
  }

  const handleChildClick = () => {
    console.log('2. 자식 클릭')
  }

  return (
    <div onClick={handleParentClick} style={{ padding: '20px', background: 'lightblue' }}>
      부모
      <button onClick={handleChildClick} style={{ margin: '10px' }}>
        자식 버튼
      </button>
    </div>
  )
}

// 버튼 클릭 시 콘솔 출력:
// 2. 자식 클릭
// 1. 부모 클릭
// → 자식의 이벤트가 부모로 전파됨 (버블링)
```

**이벤트 버블링 막기: `stopPropagation()`**

```typescript
function StopBubbling() {
  const handleParentClick = () => {
    console.log('부모 클릭')
  }

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation()  // ⭐ 이벤트 전파 중단!
    console.log('자식 클릭')
  }

  return (
    <div onClick={handleParentClick}>
      부모
      <button onClick={handleChildClick}>자식 버튼</button>
    </div>
  )
}

// 버튼 클릭 시 콘솔 출력:
// 자식 클릭
// (부모 이벤트는 실행 안 됨 ✅)
```

**실전 예제: 모달 창**

```typescript
function Modal({ onClose }: { onClose: () => void }) {
  return (
    // 배경 클릭 시 모달 닫기
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)'
      }}
    >
      {/* 모달 내용 클릭 시 닫히지 않도록 버블링 중단 */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'white', padding: '20px', margin: '100px auto', width: '300px' }}
      >
        <h2>모달 제목</h2>
        <p>모달 내용</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )
}
```

#### 6. 이벤트 객체 (Event Object)

이벤트 핸들러는 **이벤트 객체**를 매개변수로 받습니다.

```typescript
function EventObject() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('클릭 위치:', e.clientX, e.clientY)
    console.log('버튼 텍스트:', e.currentTarget.textContent)
    console.log('이벤트 타입:', e.type)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('입력값:', e.target.value)
    console.log('입력 요소:', e.target)
  }

  return (
    <div>
      <button onClick={handleClick}>클릭</button>
      <input onChange={handleInput} />
    </div>
  )
}
```

**자주 사용하는 이벤트 속성:**
- `e.target`: 이벤트가 발생한 요소
- `e.currentTarget`: 이벤트 핸들러가 붙어있는 요소
- `e.preventDefault()`: 기본 동작 방지
- `e.stopPropagation()`: 이벤트 전파 중단
- `e.type`: 이벤트 타입 ('click', 'change' 등)

#### 7. 이벤트 위임 (Event Delegation)

리스트의 각 항목에 이벤트를 붙이는 대신, 부모에 하나만 붙이는 패턴

```typescript
function EventDelegation() {
  const [items, setItems] = useState(['사과', '바나나', '오렌지'])

  // ❌ 비효율적: 각 항목마다 이벤트 핸들러
  const inefficientWay = (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => console.log(item)}>
          {item}
        </li>
      ))}
    </ul>
  )

  // ✅ 효율적: 부모에 하나만
  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'LI') {
      console.log('클릭:', target.textContent)
    }
  }

  return (
    <ul onClick={handleClick}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
```

### 3.7 실전 예제: 검색 필터링

#### 왜 검색 필터링이 중요할까?

실제 애플리케이션에서는 대량의 데이터를 사용자가 원하는 조건으로 필터링하는 기능이 필수입니다. 호텔 검색, 상품 검색, 게시글 검색 등 대부분의 서비스에서 필터링 기능을 사용합니다.

**검색 필터링의 핵심 개념:**

1. **원본 데이터 보존**: 원본 배열(`hotels`)은 변경하지 않고, 필터링된 새로운 배열(`filteredHotels`)을 생성
2. **실시간 반응**: 사용자가 검색어나 필터 조건을 변경할 때마다 즉시 결과 업데이트
3. **다중 조건 처리**: 여러 필터 조건을 동시에 적용 (예: 이름 검색 + 가격 범위)
4. **성능 고려**: 렌더링 시마다 필터링이 실행되므로 최적화 필요

#### 기본 검색 필터링 구현

```typescript
interface Hotel {
  id: string
  name: string
  price: number
  rating: number
  location: string
}

function HotelSearch() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500000)

  // 필터링된 호텔 목록
  const filteredHotels = hotels.filter(hotel => {
    // 조건 1: 이름 검색 (대소문자 구분 없음)
    const matchesSearch = hotel.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    // 조건 2: 가격 범위
    const matchesPrice =
      hotel.price >= minPrice &&
      hotel.price <= maxPrice

    // 모든 조건을 만족하는 경우만 포함
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

#### 필터링 동작 원리 이해하기

```typescript
// 예시 데이터
const hotels = [
  { id: '1', name: '신라호텔', price: 300000, rating: 5, location: '서울' },
  { id: '2', name: '롯데호텔', price: 250000, rating: 4.5, location: '서울' },
  { id: '3', name: '메리어트', price: 200000, rating: 4, location: '부산' }
]

// 사용자가 검색어 "호텔" 입력, 가격 범위 200000~300000
const searchTerm = "호텔"
const minPrice = 200000
const maxPrice = 300000

// 필터링 과정:
hotels.filter(hotel => {
  // 1번 호텔: "신라호텔" - "호텔" 포함 ✅, 300000 (200000~300000 사이) ✅ → 포함
  // 2번 호텔: "롯데호텔" - "호텔" 포함 ✅, 250000 (200000~300000 사이) ✅ → 포함
  // 3번 호텔: "메리어트" - "호텔" 불포함 ❌ → 제외
})

// 결과: [신라호텔, 롯데호텔]
```

#### 고급 필터링: 다중 조건과 정렬

```typescript
function AdvancedHotelSearch() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500000)
  const [minRating, setMinRating] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price')

  // 1단계: 필터링
  let result = hotels.filter(hotel => {
    const matchesSearch = hotel.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesPrice =
      hotel.price >= minPrice && hotel.price <= maxPrice

    const matchesRating = hotel.rating >= minRating

    const matchesLocation =
      selectedLocation === '' || hotel.location === selectedLocation

    return matchesSearch && matchesPrice && matchesRating && matchesLocation
  })

  // 2단계: 정렬
  result = result.sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price  // 가격 오름차순
    } else {
      return b.rating - a.rating  // 평점 내림차순
    }
  })

  return (
    <div>
      {/* 검색 UI */}
      <input
        type="text"
        placeholder="호텔 이름 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 가격 필터 */}
      <div>
        <input
          type="range"
          min={0}
          max={500000}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <span>{minPrice.toLocaleString()}원 ~</span>
        <input
          type="range"
          min={0}
          max={500000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <span>{maxPrice.toLocaleString()}원</span>
      </div>

      {/* 평점 필터 */}
      <div>
        <label>
          최소 평점:
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value={0}>전체</option>
            <option value={3}>3점 이상</option>
            <option value={4}>4점 이상</option>
            <option value={4.5}>4.5점 이상</option>
          </select>
        </label>
      </div>

      {/* 지역 필터 */}
      <div>
        <label>
          지역:
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">전체</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="제주">제주</option>
          </select>
        </label>
      </div>

      {/* 정렬 옵션 */}
      <div>
        <label>
          정렬:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
          >
            <option value="price">가격순</option>
            <option value="rating">평점순</option>
          </select>
        </label>
      </div>

      {/* 결과 표시 */}
      <div>
        총 {result.length}개의 호텔 (전체: {hotels.length}개)
      </div>

      {/* 호텔 목록 */}
      {result.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        result.map(hotel => (
          <HotelItem key={hotel.id} hotel={hotel} />
        ))
      )}
    </div>
  )
}
```

#### 필터링 성능 최적화

**문제점**: 렌더링할 때마다 필터링과 정렬이 실행되므로, 데이터가 많으면 성능 저하 발생

**해결 방법**: `useMemo`로 메모이제이션

```typescript
import { useMemo } from 'react'

function OptimizedHotelSearch() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500000)

  // ✅ 의존성이 변경될 때만 재계산
  const filteredHotels = useMemo(() => {
    console.log('필터링 실행')  // 성능 확인용
    return hotels.filter(hotel => {
      const matchesSearch = hotel.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesPrice =
        hotel.price >= minPrice && hotel.price <= maxPrice

      return matchesSearch && matchesPrice
    })
  }, [hotels, searchTerm, minPrice, maxPrice])
  // 👆 이 값들이 변경될 때만 필터링 재실행

  return (
    <div>
      {/* 검색 UI */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 결과 표시 */}
      <div>총 {filteredHotels.length}개의 호텔</div>

      {filteredHotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

#### 디바운싱으로 검색 최적화

검색어를 입력할 때마다 필터링하면 성능 문제가 발생할 수 있습니다. **디바운싱(Debouncing)**을 사용하여 사용자가 입력을 멈춘 후 일정 시간이 지나면 검색을 실행합니다.

```typescript
import { useState, useEffect } from 'react'

function DebouncedSearch() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [inputValue, setInputValue] = useState('')  // 입력값
  const [searchTerm, setSearchTerm] = useState('')  // 실제 검색어

  // 디바운싱: 입력 후 500ms 대기
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue)  // 500ms 후 검색어 업데이트
    }, 500)

    // 클린업: 이전 타이머 취소
    return () => clearTimeout(timer)
  }, [inputValue])

  // searchTerm이 변경될 때만 필터링
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="호텔 이름 검색"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>검색어: {searchTerm}</p>  {/* 디버깅용 */}
      <div>총 {filteredHotels.length}개의 호텔</div>
      {filteredHotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

**디바운싱 동작 과정:**

```
사용자 입력: "신" → 타이머 시작 (500ms)
           "신라" → 이전 타이머 취소, 새 타이머 시작 (500ms)
           "신라호" → 이전 타이머 취소, 새 타이머 시작 (500ms)
           "신라호텔" → 이전 타이머 취소, 새 타이머 시작 (500ms)
           [입력 멈춤]
           [500ms 대기...]
           → searchTerm = "신라호텔" (검색 실행)
```

#### 필터 상태 초기화

```typescript
function HotelSearchWithReset() {
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500000)
  const [minRating, setMinRating] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState('')

  // 모든 필터 초기화
  const resetFilters = () => {
    setSearchTerm('')
    setMinPrice(0)
    setMaxPrice(500000)
    setMinRating(0)
    setSelectedLocation('')
  }

  // 활성화된 필터 개수 계산
  const activeFilterCount = [
    searchTerm !== '',
    minPrice > 0 || maxPrice < 500000,
    minRating > 0,
    selectedLocation !== ''
  ].filter(Boolean).length

  return (
    <div>
      {/* 필터 UI */}
      <div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* 다른 필터들... */}
      </div>

      {/* 필터 초기화 버튼 */}
      <button onClick={resetFilters} disabled={activeFilterCount === 0}>
        필터 초기화 ({activeFilterCount})
      </button>

      {/* 결과 표시 */}
    </div>
  )
}
```

#### 검색 필터링 체크리스트

✅ **구현 시 고려사항:**

| 항목 | 설명 |
|------|------|
| **원본 데이터 보존** | `filter()` 사용으로 원본 배열 변경 방지 |
| **대소문자 처리** | `toLowerCase()` 사용으로 검색 정확도 향상 |
| **빈 값 처리** | 검색어가 비어있을 때 모든 결과 표시 |
| **결과 없음 처리** | 빈 배열일 때 "검색 결과 없음" 메시지 표시 |
| **성능 최적화** | `useMemo`로 불필요한 재계산 방지 |
| **디바운싱** | 검색어 입력 시 API 호출 최소화 |
| **로딩 상태** | 검색 중일 때 로딩 인디케이터 표시 |
| **필터 초기화** | 사용자가 쉽게 필터를 초기화할 수 있도록 제공 |

### 3.8 조건부 렌더링

#### 왜 조건부 렌더링이 필요할까?

애플리케이션에서는 특정 조건에 따라 다른 UI를 보여줘야 하는 경우가 매우 많습니다.

**조건부 렌더링이 필요한 상황:**

- 로그인 여부에 따라 다른 페이지 표시
- 로딩 중일 때 스피너 표시
- 에러 발생 시 에러 메시지 표시
- 사용자 권한에 따라 다른 메뉴 표시
- 데이터 유무에 따라 빈 상태(empty state) 표시

#### 조건부 렌더링의 4가지 방법

React에서 조건부 렌더링을 구현하는 방법은 여러 가지가 있습니다. 각 상황에 맞는 방법을 선택해야 합니다.

```typescript
interface User {
  id: string
  name: string
  role: 'admin' | 'user' | 'guest'
}

function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // 방법 1: Early Return (조기 반환)
  // 특정 조건에서 컴포넌트 전체를 다르게 렌더링
  if (!isLoggedIn) {
    return <LoginPage />
  }

  return (
    <div>
      {/* 방법 2: 삼항 연산자 (? :) */}
      {/* A 또는 B 둘 중 하나를 렌더링 */}
      {isLoggedIn ? <WelcomePage /> : <LoginPage />}

      {/* 방법 3: && 연산자 (논리 AND) */}
      {/* 조건이 true일 때만 렌더링 */}
      {user && <UserProfile user={user} />}

      {/* 방법 4: 함수로 분리 */}
      {/* 복잡한 조건 로직을 함수로 분리 */}
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

#### 방법 1: Early Return (조기 반환)

컴포넌트 초반에 조건을 검사하여, 조건에 맞지 않으면 즉시 다른 UI를 반환합니다.

**언제 사용?**
- 특정 조건에서 완전히 다른 UI를 보여줄 때
- 로딩 상태, 에러 상태 처리
- 권한 체크

```typescript
function ProtectedPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  // 1단계: 로딩 중
  if (isLoading) {
    return (
      <div>
        <Spinner />
        <p>로딩 중...</p>
      </div>
    )
  }

  // 2단계: 에러 발생
  if (error) {
    return (
      <div>
        <ErrorIcon />
        <p>에러: {error}</p>
        <button onClick={() => window.location.reload()}>
          다시 시도
        </button>
      </div>
    )
  }

  // 3단계: 로그인 필요
  if (!user) {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
        <button onClick={() => navigate('/login')}>
          로그인하기
        </button>
      </div>
    )
  }

  // 4단계: 권한 체크
  if (user.role !== 'admin') {
    return (
      <div>
        <p>관리자 권한이 필요합니다.</p>
        <button onClick={() => navigate('/')}>
          홈으로 돌아가기
        </button>
      </div>
    )
  }

  // 모든 조건을 통과한 경우에만 실제 콘텐츠 렌더링
  return (
    <div>
      <h1>관리자 페이지</h1>
      <AdminContent />
    </div>
  )
}
```

**Early Return의 장점:**

✅ 코드 가독성이 좋음 (조건을 순차적으로 처리)
✅ 중첩된 조건문을 피할 수 있음
✅ 각 상태를 명확히 구분

#### 방법 2: 삼항 연산자 (Ternary Operator)

`조건 ? 참일 때 : 거짓일 때` 형태로 두 가지 중 하나를 선택합니다.

**언제 사용?**
- A 또는 B 둘 중 하나를 렌더링할 때
- 간단한 조건 분기

```typescript
function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      {/* ✅ 올바른 사용 */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}

      {/* ❌ 중첩하면 가독성 나빠짐 */}
      {isLoggedIn ? (
        user?.isPremium ? (
          <PremiumBadge />
        ) : (
          <FreeBadge />
        )
      ) : (
        <GuestBadge />
      )}

      {/* ✅ 중첩 조건은 함수로 분리 */}
      {isLoggedIn ? renderUserBadge() : <GuestBadge />}
    </div>
  )

  function renderUserBadge() {
    return user?.isPremium ? <PremiumBadge /> : <FreeBadge />
  }
}
```

**실전 예제: 빈 상태(Empty State) 처리**

```typescript
function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div>
      {isLoading ? (
        // 로딩 중
        <div className="loading">
          <Spinner />
          <p>호텔 정보를 불러오는 중...</p>
        </div>
      ) : hotels.length > 0 ? (
        // 데이터 있음
        <div className="hotel-list">
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        // 데이터 없음 (Empty State)
        <div className="empty-state">
          <EmptyIcon />
          <p>등록된 호텔이 없습니다.</p>
          <button onClick={handleAddHotel}>
            첫 호텔 등록하기
          </button>
        </div>
      )}
    </div>
  )
}
```

#### 방법 3: && 연산자 (논리 AND)

`조건 && <JSX>` 형태로 조건이 `true`일 때만 렌더링합니다.

**언제 사용?**
- 조건이 참일 때만 보여주고, 거짓일 때는 아무것도 렌더링하지 않을 때
- 선택적으로 UI 요소를 표시할 때

```typescript
function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isPremium, setIsPremium] = useState(false)

  return (
    <div>
      {/* ✅ user가 있을 때만 프로필 표시 */}
      {user && (
        <div className="profile">
          <img src={user.avatar} />
          <p>{user.name}</p>
        </div>
      )}

      {/* ✅ 읽지 않은 메시지가 있을 때만 배지 표시 */}
      {unreadCount > 0 && (
        <span className="badge">{unreadCount}</span>
      )}

      {/* ✅ 프리미엄 회원일 때만 배지 표시 */}
      {isPremium && <PremiumBadge />}

      {/* ❌ 주의: 숫자 0은 렌더링됨! */}
      {unreadCount && <span>{unreadCount}</span>}
      {/* unreadCount가 0이면 "0"이 화면에 표시됨 */}

      {/* ✅ 명시적으로 boolean 변환 */}
      {unreadCount > 0 && <span>{unreadCount}</span>}
      {Boolean(unreadCount) && <span>{unreadCount}</span>}
    </div>
  )
}
```

**&& 연산자 사용 시 주의사항:**

| 조건 값 | 결과 | 설명 |
|---------|------|------|
| `true && <div>내용</div>` | `<div>내용</div>` 렌더링 | ✅ 정상 |
| `false && <div>내용</div>` | 렌더링 안 됨 | ✅ 정상 |
| `null && <div>내용</div>` | 렌더링 안 됨 | ✅ 정상 |
| `undefined && <div>내용</div>` | 렌더링 안 됨 | ✅ 정상 |
| `0 && <div>내용</div>` | **"0" 렌더링됨** | ❌ 주의! |
| `'' && <div>내용</div>` | 렌더링 안 됨 | ✅ 정상 |

```typescript
// ❌ 잘못된 예: 0이 화면에 표시됨
{items.length && <div>총 {items.length}개</div>}

// ✅ 올바른 예
{items.length > 0 && <div>총 {items.length}개</div>}
```

#### 방법 4: 함수로 분리

복잡한 조건 로직은 별도 함수로 분리하여 가독성을 높입니다.

**언제 사용?**
- 3개 이상의 조건 분기
- 복잡한 비즈니스 로직
- 재사용 가능한 렌더링 로직

```typescript
function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 조건에 따라 다른 컴포넌트 반환
  function renderContent() {
    if (isLoading) {
      return <LoadingSpinner />
    }

    if (error) {
      return <ErrorMessage message={error} />
    }

    if (!user) {
      return <LoginPrompt />
    }

    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} />
      case 'user':
        return <UserDashboard user={user} />
      case 'guest':
        return <GuestDashboard />
      default:
        return <div>알 수 없는 권한</div>
    }
  }

  return (
    <div className="dashboard">
      <Header />
      {renderContent()}
      <Footer />
    </div>
  )
}
```

**함수 분리의 다른 형태: 컴포넌트로 분리**

```typescript
// ✅ 더 나은 방법: 별도 컴포넌트로 분리
function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="dashboard">
      <Header />
      <DashboardContent user={user} isLoading={isLoading} />
      <Footer />
    </div>
  )
}

// 조건부 렌더링 로직을 별도 컴포넌트로
function DashboardContent({ user, isLoading }: Props) {
  if (isLoading) return <LoadingSpinner />
  if (!user) return <LoginPrompt />

  switch (user.role) {
    case 'admin':
      return <AdminDashboard user={user} />
    case 'user':
      return <UserDashboard user={user} />
    default:
      return <GuestDashboard />
  }
}
```

#### 실전 예제: 복합 조건 처리

```typescript
interface Article {
  id: string
  title: string
  content: string
  isPremium: boolean
  author: {
    id: string
    name: string
  }
}

function ArticleViewer() {
  const [article, setArticle] = useState<Article | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Early Return으로 상태 처리
  if (isLoading) {
    return <ArticleSkeletonLoader />
  }

  if (!article) {
    return (
      <div className="error-state">
        <p>게시글을 찾을 수 없습니다.</p>
        <button onClick={() => navigate('/articles')}>
          목록으로 돌아가기
        </button>
      </div>
    )
  }

  // 프리미엄 콘텐츠 접근 권한 체크
  const canViewPremium = user?.isPremium || article.author.id === user?.id

  return (
    <div className="article">
      <h1>{article.title}</h1>

      {/* 프리미엄 배지 */}
      {article.isPremium && (
        <span className="premium-badge">프리미엄</span>
      )}

      {/* 본문 또는 프리미엄 안내 */}
      {article.isPremium && !canViewPremium ? (
        <div className="premium-required">
          <p>이 콘텐츠는 프리미엄 회원 전용입니다.</p>
          <button onClick={() => navigate('/premium')}>
            프리미엄 가입하기
          </button>
        </div>
      ) : (
        <div className="content">
          {article.content}
        </div>
      )}

      {/* 작성자 전용 기능 */}
      {user?.id === article.author.id && (
        <div className="author-actions">
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  )
}
```

#### 조건부 스타일링

조건에 따라 CSS 클래스나 스타일을 변경할 수도 있습니다.

```typescript
function Button({ isPrimary, isDisabled, children }: ButtonProps) {
  return (
    <button
      // 조건부 className
      className={`
        btn
        ${isPrimary ? 'btn-primary' : 'btn-secondary'}
        ${isDisabled ? 'btn-disabled' : ''}
      `}

      // 조건부 style
      style={{
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}

      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

// 더 나은 방법: classnames 라이브러리 사용
import classNames from 'classnames'

function Button({ isPrimary, isDisabled, children }: ButtonProps) {
  return (
    <button
      className={classNames('btn', {
        'btn-primary': isPrimary,
        'btn-secondary': !isPrimary,
        'btn-disabled': isDisabled,
      })}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
```

#### 조건부 렌더링 선택 가이드

상황에 맞는 최적의 방법을 선택하세요:

| 상황 | 추천 방법 | 예시 |
|------|----------|------|
| 전체 컴포넌트를 다르게 렌더링 | Early Return | `if (!user) return <Login />` |
| A 또는 B 중 선택 | 삼항 연산자 | `{isOn ? <On /> : <Off />}` |
| 조건 참일 때만 표시 | && 연산자 | `{isLoggedIn && <Profile />}` |
| 3개 이상의 분기 | 함수/컴포넌트 분리 | `switch (role) { ... }` |
| 숫자 조건 | 명시적 비교 | `{count > 0 && <Badge />}` |
| 복잡한 로직 | 별도 컴포넌트 | `<Content {...props} />` |

#### 조건부 렌더링 안티패턴

```typescript
// ❌ 나쁜 예: 중첩된 삼항 연산자
{isLoading ? <Spinner /> : data ? data.length > 0 ? <List /> : <Empty /> : <Error />}

// ✅ 좋은 예: Early Return 사용
function Content() {
  if (isLoading) return <Spinner />
  if (!data) return <Error />
  if (data.length === 0) return <Empty />
  return <List data={data} />
}

// ❌ 나쁜 예: 불필요한 true 체크
{condition === true && <Component />}

// ✅ 좋은 예: 직접 boolean 사용
{condition && <Component />}

// ❌ 나쁜 예: 숫자를 직접 조건으로
{count && <div>{count}개</div>}  // count가 0이면 "0"이 렌더링됨

// ✅ 좋은 예: 명시적 비교
{count > 0 && <div>{count}개</div>}
```

### 3.9 리스트 렌더링과 Key

#### 왜 리스트 렌더링이 중요할까?

대부분의 웹 애플리케이션에서 데이터는 배열 형태로 제공됩니다. 호텔 목록, 게시글 목록, 댓글 목록 등을 화면에 표시하려면 배열의 각 항목을 컴포넌트로 변환해야 합니다.

**리스트 렌더링이 필요한 상황:**

- 호텔 검색 결과 표시
- 게시글 목록 표시
- 댓글 목록 표시
- 장바구니 아이템 표시
- 메뉴 목록 표시

#### 기본 리스트 렌더링

JavaScript의 `map()` 함수를 사용하여 배열을 JSX 요소로 변환합니다.

```typescript
interface Hotel {
  id: string
  name: string
  price: number
  rating: number
}

function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: '1', name: '신라호텔', price: 300000, rating: 5 },
    { id: '2', name: '롯데호텔', price: 250000, rating: 4.5 },
    { id: '3', name: '메리어트', price: 200000, rating: 4 },
  ])

  return (
    <div>
      {/* ✅ 올바른 방법: 고유한 ID를 key로 사용 */}
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

#### Key가 중요한 이유

`key`는 React가 어떤 항목이 변경, 추가, 삭제되었는지 식별하는 데 사용하는 특별한 속성입니다.

**Key의 역할:**

1. **효율적인 업데이트**: React가 변경된 항목만 업데이트
2. **순서 변경 감지**: 리스트 항목의 순서가 바뀔 때 올바르게 처리
3. **컴포넌트 상태 유지**: 각 항목의 state가 올바르게 유지됨
4. **성능 최적화**: 불필요한 리렌더링 방지

#### Key가 없으면 어떤 문제가 발생할까?

```typescript
function TodoList() {
  const [todos, setTodos] = useState([
    { id: '1', text: '장보기', done: false },
    { id: '2', text: '운동하기', done: false },
  ])

  return (
    <div>
      {/* ❌ Key 없음 - 경고 발생 */}
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
      {/* Warning: Each child in a list should have a unique "key" prop. */}
    </div>
  )
}
```

**Key가 없을 때의 문제:**

```
초기 상태:
1. 장보기 [체크박스: ☐]
2. 운동하기 [체크박스: ☐]

사용자가 "장보기"를 체크:
1. 장보기 [체크박스: ☑]
2. 운동하기 [체크박스: ☐]

맨 앞에 "공부하기"를 추가:
예상:
1. 공부하기 [체크박스: ☐]  ← 새 항목
2. 장보기 [체크박스: ☑]    ← 체크 유지
3. 운동하기 [체크박스: ☐]

실제 (key 없을 때):
1. 공부하기 [체크박스: ☑]  ← 잘못된 상태!
2. 장보기 [체크박스: ☐]
3. 운동하기 [체크박스: ☐]

React가 첫 번째 항목을 새로 추가된 것으로 인식하지 못하고,
기존 첫 번째 항목의 체크 상태가 새 항목에 적용됨!
```

#### 올바른 Key 사용하기

**✅ 좋은 Key: 고유한 ID 사용**

```typescript
function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([])

  return (
    <div>
      {/* 데이터베이스에서 가져온 고유 ID 사용 */}
      {hotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

**❌ 나쁜 Key: index 사용 (순서가 바뀔 수 있는 경우)**

```typescript
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <div>
      {/* ❌ 순서가 바뀔 수 있는 리스트에서 index 사용 */}
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
      {/* 항목 추가/삭제/정렬 시 문제 발생! */}
    </div>
  )
}
```

#### Index를 Key로 사용해도 되는 경우

다음 **모든 조건**을 만족할 때만 index를 key로 사용할 수 있습니다:

1. ✅ 리스트가 정적이고 변경되지 않음
2. ✅ 항목이 추가/삭제되지 않음
3. ✅ 항목의 순서가 바뀌지 않음
4. ✅ 각 항목이 내부 상태를 가지지 않음

```typescript
// ✅ Index를 사용해도 괜찮은 경우: 정적 메뉴
function Navigation() {
  const menuItems = ['홈', '소개', '서비스', '연락처']  // 변경 안 됨

  return (
    <nav>
      {menuItems.map((item, index) => (
        <a key={index} href={`#${item}`}>
          {item}
        </a>
      ))}
    </nav>
  )
}

// ❌ Index를 사용하면 안 되는 경우: 동적 리스트
function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>  {/* ❌ 삭제 시 문제 발생! */}
          <p>{item.name}</p>
          <button onClick={() => removeItem(index)}>삭제</button>
        </div>
      ))}
    </div>
  )
}
```

#### Key가 없는 데이터에 ID 추가하기

API에서 받은 데이터에 고유 ID가 없는 경우, 직접 ID를 추가할 수 있습니다.

```typescript
import { nanoid } from 'nanoid'  // 고유 ID 생성 라이브러리

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])

  // 새 할 일 추가 시 고유 ID 생성
  const addTodo = (text: string) => {
    const newTodo = {
      id: nanoid(),  // 고유 ID 생성
      text,
      done: false,
    }
    setTodos([...todos, newTodo])
  }

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />  // ✅ 고유 ID 사용
      ))}
    </div>
  )
}
```

**다른 ID 생성 방법:**

```typescript
// 1. crypto.randomUUID() (브라우저 내장)
const id = crypto.randomUUID()  // "550e8400-e29b-41d4-a716-446655440000"

// 2. Date.now() + 랜덤 값
const id = `${Date.now()}-${Math.random()}`  // "1640000000000-0.123456"

// 3. 라이브러리 사용
import { v4 as uuidv4 } from 'uuid'
const id = uuidv4()  // "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
```

#### Key 실전 예제

**예제 1: 검색 가능한 호텔 리스트**

```typescript
function SearchableHotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // 필터링된 결과
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="호텔 검색"
      />

      {/* ✅ 필터링되어도 각 호텔의 고유 ID는 유지됨 */}
      {filteredHotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

**예제 2: 정렬 가능한 테이블**

```typescript
function SortableHotelTable() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // 가격순 정렬
  const sortedHotels = [...hotels].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  })

  return (
    <div>
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        가격순 정렬 ({sortOrder === 'asc' ? '오름차순' : '내림차순'})
      </button>

      <table>
        <thead>
          <tr>
            <th>호텔명</th>
            <th>가격</th>
            <th>평점</th>
          </tr>
        </thead>
        <tbody>
          {/* ✅ 정렬되어도 각 호텔의 ID는 변하지 않음 */}
          {sortedHotels.map(hotel => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.price.toLocaleString()}원</td>
              <td>{'⭐'.repeat(hotel.rating)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

**예제 3: 중첩된 리스트 (댓글과 대댓글)**

```typescript
interface Comment {
  id: string
  text: string
  replies: Comment[]
}

function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>

          {/* 중첩된 리스트에도 각각 key 필요 */}
          {comment.replies.length > 0 && (
            <div className="replies">
              {comment.replies.map(reply => (
                <div key={reply.id} className="reply">
                  <p>{reply.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
```

#### Key 사용 시 주의사항

```typescript
// ❌ 1. Math.random()을 key로 사용 (매번 바뀜)
{items.map(item => (
  <Item key={Math.random()} item={item} />
))}

// ❌ 2. 배열을 문자열로 변환하여 key 사용 (고유하지 않을 수 있음)
{items.map(item => (
  <Item key={item.name} item={item} />  // 같은 이름 있으면 충돌!
))}

// ❌ 3. 여러 값을 조합했지만 고유하지 않음
{items.map(item => (
  <Item key={`${item.type}-${item.index}`} item={item} />
))}

// ✅ 올바른 방법: 데이터베이스 ID 또는 고유 식별자
{items.map(item => (
  <Item key={item.id} item={item} />
))}
```

#### Key 관련 자주 하는 질문

**Q: Key를 props로 접근할 수 있나요?**

```typescript
// ❌ key는 특별한 prop으로, 컴포넌트 내부에서 접근 불가
function Item({ key }: { key: string }) {
  console.log(key)  // undefined
}

// ✅ ID가 필요하면 별도 prop으로 전달
function Item({ id, data }: { id: string; data: any }) {
  console.log(id)  // 접근 가능
}

<Item key={item.id} id={item.id} data={item} />
```

**Q: 두 개의 다른 리스트가 있으면 key가 충돌하나요?**

```typescript
// ✅ 충돌 안 함: key는 같은 부모 내에서만 고유하면 됨
<div>
  <ul>
    {hotels.map(hotel => (
      <li key={hotel.id}>{hotel.name}</li>
    ))}
  </ul>

  <ul>
    {restaurants.map(restaurant => (
      <li key={restaurant.id}>{restaurant.name}</li>  // hotels와 같은 ID 가능
    ))}
  </ul>
</div>
```

**Q: 리스트의 항목이 변경되지 않는데도 key를 넣어야 하나요?**

```typescript
// ✅ 네, 항상 key를 넣어야 합니다
// React는 미래에 변경될 가능성을 대비하여 key를 요구합니다
{items.map(item => (
  <Item key={item.id} item={item} />
))}
```

#### 리스트 렌더링 체크리스트

✅ **올바른 리스트 렌더링:**

| 항목 | 설명 |
|------|------|
| **고유한 Key** | 데이터베이스 ID 또는 고유 식별자 사용 |
| **Key 안정성** | 렌더링 중에 Key가 변경되지 않아야 함 |
| **Index 사용** | 정적 리스트에서만 사용 |
| **Key Props** | Key를 다른 용도로 사용하려면 별도 prop 전달 |
| **중첩 리스트** | 각 레벨의 리스트마다 고유한 key 필요 |
| **빈 리스트** | 빈 배열일 때 Empty State 표시 |

### 3.10 State 업데이트 주의사항

#### 왜 State 업데이트 방식이 중요할까?

React의 State 업데이트는 **비동기적**으로 처리됩니다. 이를 이해하지 못하면 예상치 못한 버그가 발생할 수 있습니다. State 업데이트의 동작 원리를 정확히 이해하고 올바른 방법을 사용해야 합니다.

#### State 업데이트는 비동기적이다

```typescript
function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    console.log(count)  // ❌ 0 출력 (업데이트 전 값)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>증가</button>
    </div>
  )
}
```

**왜 이런 일이 발생할까?**

React는 성능 최적화를 위해 여러 State 업데이트를 **배치(batch)**로 처리합니다. `setCount`를 호출해도 즉시 `count`가 변경되지 않고, 다음 렌더링 때 반영됩니다.

```
1. handleClick 실행 시작 (count = 0)
2. setCount(0 + 1) 호출 → 업데이트 예약
3. console.log(count) → 여전히 0 (아직 업데이트 안 됨)
4. handleClick 실행 종료
5. React가 리렌더링 수행
6. 다음 렌더링에서 count = 1
```

#### 문제 1: 여러 번 State 업데이트하기

**❌ 잘못된 방법: 이전 state에 의존**

```typescript
function StateUpdates() {
  const [count, setCount] = useState(0)

  // ❌ 3번 증가시키려고 했지만 1만 증가
  const incrementThreeTimes_Wrong = () => {
    setCount(count + 1)  // 0 + 1 = 1
    setCount(count + 1)  // 0 + 1 = 1 (여전히 count는 0)
    setCount(count + 1)  // 0 + 1 = 1 (여전히 count는 0)
    // 결과: 1 (예상: 3)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementThreeTimes_Wrong}>+3 (잘못된 방법)</button>
    </div>
  )
}
```

**동작 원리:**

```
현재 count = 0

setCount(count + 1)  // setCount(0 + 1) → 1로 업데이트 예약
setCount(count + 1)  // setCount(0 + 1) → 1로 업데이트 예약 (count는 여전히 0)
setCount(count + 1)  // setCount(0 + 1) → 1로 업데이트 예약 (count는 여전히 0)

React가 배치 처리:
- 1로 업데이트
- 1로 업데이트 (덮어씀)
- 1로 업데이트 (덮어씀)

최종 결과: count = 1
```

**✅ 올바른 방법: 함수형 업데이트**

```typescript
function StateUpdates() {
  const [count, setCount] = useState(0)

  // ✅ 함수형 업데이트 사용
  const incrementThreeTimes_Correct = () => {
    setCount(prev => prev + 1)  // 0 + 1 = 1
    setCount(prev => prev + 1)  // 1 + 1 = 2 (이전 업데이트 결과 사용)
    setCount(prev => prev + 1)  // 2 + 1 = 3 (이전 업데이트 결과 사용)
    // 결과: 3 ✅
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementThreeTimes_Correct}>+3 (올바른 방법)</button>
    </div>
  )
}
```

**동작 원리:**

```
현재 count = 0

setCount(prev => prev + 1)  // prev = 0, 반환 1
setCount(prev => prev + 1)  // prev = 1 (이전 결과), 반환 2
setCount(prev => prev + 1)  // prev = 2 (이전 결과), 반환 3

React가 배치 처리:
- 0 → 1
- 1 → 2
- 2 → 3

최종 결과: count = 3 ✅
```

#### 언제 함수형 업데이트를 사용해야 할까?

| 상황 | 사용 방법 | 예시 |
|------|----------|------|
| **이전 state 기반 업데이트** | 함수형 업데이트 | `setCount(prev => prev + 1)` |
| **한 함수에서 여러 번 업데이트** | 함수형 업데이트 | `setCount(prev => prev + 1)` 3번 호출 |
| **이벤트 핸들러에서 업데이트** | 함수형 업데이트 권장 | `onClick={() => setCount(prev => prev + 1)}` |
| **고정 값으로 설정** | 직접 값 전달 | `setCount(0)` |
| **외부 값으로 설정** | 직접 값 전달 | `setCount(newValue)` |

#### 문제 2: 객체 State 업데이트

**❌ 잘못된 방법: 직접 수정**

```typescript
function UserProfile() {
  const [user, setUser] = useState({
    name: '김철수',
    age: 25,
    email: 'kim@example.com'
  })

  // ❌ 직접 수정 (동작 안 함!)
  const updateAge_Wrong = () => {
    user.age = 26  // ❌ State 직접 수정
    setUser(user)  // ❌ 같은 객체 참조 → 리렌더링 안 됨!
  }

  return (
    <div>
      <p>나이: {user.age}</p>
      <button onClick={updateAge_Wrong}>나이 증가 (동작 안 함)</button>
    </div>
  )
}
```

**왜 동작하지 않을까?**

React는 State가 변경되었는지 **참조(reference)**를 비교하여 판단합니다. 객체의 내용을 수정해도 참조는 같기 때문에 React는 변경을 감지하지 못합니다.

```typescript
const oldUser = { name: '김철수', age: 25 }
const newUser = oldUser
newUser.age = 26

console.log(oldUser === newUser)  // true (같은 참조)
// React: "참조가 같네? 변경 없음!" → 리렌더링 안 함
```

**✅ 올바른 방법: 새 객체 생성**

```typescript
function UserProfile() {
  const [user, setUser] = useState({
    name: '김철수',
    age: 25,
    email: 'kim@example.com'
  })

  // ✅ 스프레드 연산자로 새 객체 생성
  const updateAge_Correct = () => {
    setUser({
      ...user,      // 기존 속성 복사
      age: user.age + 1  // age만 변경
    })
  }

  // ✅ 함수형 업데이트 (더 안전)
  const updateAge_Best = () => {
    setUser(prev => ({
      ...prev,
      age: prev.age + 1
    }))
  }

  return (
    <div>
      <p>나이: {user.age}</p>
      <button onClick={updateAge_Best}>나이 증가</button>
    </div>
  )
}
```

#### 문제 3: 배열 State 업데이트

**❌ 잘못된 방법: 변경 메서드 사용**

```typescript
function TodoList() {
  const [todos, setTodos] = useState<string[]>(['운동하기', '공부하기'])

  // ❌ push는 원본 배열을 변경 (동작 안 함!)
  const addTodo_Wrong = (text: string) => {
    todos.push(text)  // ❌ 원본 배열 변경
    setTodos(todos)   // ❌ 같은 배열 참조 → 리렌더링 안 됨
  }

  // ❌ splice도 원본 배열을 변경
  const removeTodo_Wrong = (index: number) => {
    todos.splice(index, 1)  // ❌ 원본 배열 변경
    setTodos(todos)          // ❌ 리렌더링 안 됨
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <span>{todo}</span>
          <button onClick={() => removeTodo_Wrong(index)}>삭제</button>
        </div>
      ))}
      <button onClick={() => addTodo_Wrong('새 할 일')}>추가</button>
    </div>
  )
}
```

**✅ 올바른 방법: 불변성 유지**

```typescript
function TodoList() {
  const [todos, setTodos] = useState<string[]>(['운동하기', '공부하기'])

  // ✅ 스프레드 연산자로 새 배열 생성
  const addTodo_Correct = (text: string) => {
    setTodos([...todos, text])
  }

  // ✅ filter로 새 배열 생성
  const removeTodo_Correct = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  // ✅ map으로 새 배열 생성 (수정)
  const updateTodo = (index: number, newText: string) => {
    setTodos(todos.map((todo, i) =>
      i === index ? newText : todo
    ))
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          <span>{todo}</span>
          <button onClick={() => removeTodo_Correct(index)}>삭제</button>
        </div>
      ))}
      <button onClick={() => addTodo_Correct('새 할 일')}>추가</button>
    </div>
  )
}
```

#### 문제 4: 중첩된 객체 업데이트

**복잡한 중첩 구조의 State를 업데이트할 때는 주의가 필요합니다.**

```typescript
interface User {
  name: string
  address: {
    city: string
    street: string
    zipCode: string
  }
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}

function UserSettings() {
  const [user, setUser] = useState<User>({
    name: '김철수',
    address: {
      city: '서울',
      street: '강남대로 123',
      zipCode: '12345'
    },
    preferences: {
      theme: 'light',
      notifications: true
    }
  })

  // ❌ 잘못된 방법: 일부만 복사
  const updateCity_Wrong = (newCity: string) => {
    setUser({
      ...user,
      address: {
        city: newCity  // ❌ street, zipCode가 사라짐!
      }
    })
  }

  // ✅ 올바른 방법: 모든 레벨 복사
  const updateCity_Correct = (newCity: string) => {
    setUser({
      ...user,
      address: {
        ...user.address,  // 기존 address 복사
        city: newCity     // city만 변경
      }
    })
  }

  // ✅ 함수형 업데이트로 더 안전하게
  const updateTheme = (theme: 'light' | 'dark') => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme
      }
    }))
  }

  return (
    <div>
      <p>도시: {user.address.city}</p>
      <button onClick={() => updateCity_Correct('부산')}>
        부산으로 이사
      </button>

      <p>테마: {user.preferences.theme}</p>
      <button onClick={() => updateTheme('dark')}>
        다크 모드
      </button>
    </div>
  )
}
```

#### 문제 5: State 업데이트 후 즉시 사용하기

**❌ State 업데이트 직후 새 값을 사용하려는 시도**

```typescript
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Hotel[]>([])

  // ❌ 업데이트 직후 사용 (이전 값 사용됨)
  const handleSearch_Wrong = (term: string) => {
    setSearchTerm(term)
    fetchHotels(searchTerm)  // ❌ 이전 searchTerm 사용됨!
  }

  return (
    <input
      value={searchTerm}
      onChange={(e) => handleSearch_Wrong(e.target.value)}
    />
  )
}
```

**✅ 해결 방법 1: 직접 값 사용**

```typescript
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  // ✅ State 대신 직접 값 사용
  const handleSearch_Correct = (term: string) => {
    setSearchTerm(term)
    fetchHotels(term)  // ✅ 새 값 직접 사용
  }

  return (
    <input
      value={searchTerm}
      onChange={(e) => handleSearch_Correct(e.target.value)}
    />
  )
}
```

**✅ 해결 방법 2: useEffect 사용**

```typescript
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Hotel[]>([])

  // ✅ searchTerm이 변경될 때마다 자동 실행
  useEffect(() => {
    if (searchTerm) {
      fetchHotels(searchTerm).then(setResults)
    }
  }, [searchTerm])

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
```

#### 문제 6: 조건부 State 업데이트

**조건에 따라 State를 업데이트할 때 현재 값 확인이 필요합니다.**

```typescript
function LikeButton() {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // ❌ 이전 state에 의존하면 문제 발생 가능
  const toggleLike_Wrong = () => {
    if (isLiked) {
      setLikes(likes - 1)  // ❌ 동시에 여러 번 클릭 시 문제
    } else {
      setLikes(likes + 1)  // ❌ 동시에 여러 번 클릭 시 문제
    }
    setIsLiked(!isLiked)
  }

  // ✅ 함수형 업데이트로 안전하게
  const toggleLike_Correct = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
    setIsLiked(prev => !prev)
  }

  // ✅ 더 나은 방법: 하나의 업데이트에서 모두 처리
  const toggleLike_Best = () => {
    setIsLiked(prev => {
      const newIsLiked = !prev
      setLikes(prevLikes => newIsLiked ? prevLikes + 1 : prevLikes - 1)
      return newIsLiked
    })
  }

  return (
    <button onClick={toggleLike_Best}>
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  )
}
```

#### State 업데이트 베스트 프랙티스

**✅ 따라야 할 규칙:**

1. **불변성 유지**
   ```typescript
   // ❌ 직접 수정
   state.value = newValue

   // ✅ 새 객체/배열 생성
   setState({ ...state, value: newValue })
   ```

2. **함수형 업데이트 사용**
   ```typescript
   // ❌ 이전 state에 의존
   setState(state + 1)

   // ✅ 함수형 업데이트
   setState(prev => prev + 1)
   ```

3. **중첩 구조 올바르게 복사**
   ```typescript
   // ❌ 일부만 복사
   setState({ ...state, nested: { value: newValue } })

   // ✅ 모든 레벨 복사
   setState({ ...state, nested: { ...state.nested, value: newValue } })
   ```

4. **배열 변경 메서드 피하기**
   ```typescript
   // ❌ push, pop, splice, sort 등
   array.push(item)

   // ✅ 불변 메서드 사용
   [...array, item]  // 추가
   array.filter((_, i) => i !== index)  // 삭제
   array.map((item, i) => i === index ? newItem : item)  // 수정
   [...array].sort()  // 정렬
   ```

5. **복잡한 State는 useReducer 고려**
   ```typescript
   // State가 복잡하고 업데이트 로직이 많으면
   const [state, dispatch] = useReducer(reducer, initialState)
   ```

#### State 업데이트 체크리스트

| 항목 | ❌ 잘못된 방법 | ✅ 올바른 방법 |
|------|---------------|---------------|
| **여러 번 업데이트** | `setState(state + 1)` | `setState(prev => prev + 1)` |
| **객체 업데이트** | `state.value = x` | `setState({ ...state, value: x })` |
| **배열 추가** | `arr.push(item)` | `setState([...arr, item])` |
| **배열 삭제** | `arr.splice(i, 1)` | `setState(arr.filter((_, idx) => idx !== i))` |
| **중첩 객체** | 일부만 복사 | 모든 레벨 복사 |
| **즉시 사용** | 업데이트 후 state 사용 | 직접 값 사용 또는 useEffect |

---

# Part 2: React Hooks 완전정복

## Chapter 4: useState - 상태 관리의 기본

### 왜 useState가 필요할까?

React가 도입되기 전, 함수형 컴포넌트는 상태를 가질 수 없었습니다. **Hooks**의 등장으로 함수형 컴포넌트에서도 상태 관리가 가능해졌고, 그 중심에 `useState`가 있습니다.

**useState의 역할:**

- 컴포넌트가 기억해야 할 값을 저장
- 값이 변경되면 자동으로 화면 업데이트 (리렌더링)
- 각 컴포넌트 인스턴스마다 독립적인 상태 유지

#### 기본 문법

```typescript
const [state, setState] = useState<Type>(initialValue)
```

**구조 분해 할당 설명:**

```typescript
// useState는 [현재값, 업데이트함수] 배열을 반환
const result = useState(0)
const count = result[0]      // 현재 상태 값
const setCount = result[1]   // 상태 업데이트 함수

// 구조 분해 할당으로 간결하게
const [count, setCount] = useState(0)
```

#### 기본 사용 예제

```typescript
function Counter() {
  const [count, setCount] = useState(0)
  //     ↑        ↑              ↑
  //  현재값   업데이트 함수   초기값

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
      <button onClick={() => setCount(0)}>리셋</button>
    </div>
  )
}
```

**동작 과정:**

```
1. 초기 렌더링: count = 0
2. 사용자가 "증가" 버튼 클릭
3. setCount(0 + 1) 호출 → React에 업데이트 예약
4. React가 컴포넌트 리렌더링
5. 새 렌더링: count = 1
6. 화면에 "카운트: 1" 표시
```

### 4.1 useState 타입 정의

TypeScript와 함께 사용할 때 타입을 명시적으로 지정할 수 있습니다.

```typescript
// 1. 기본 타입
const [count, setCount] = useState<number>(0)
const [name, setName] = useState<string>('')
const [isOpen, setIsOpen] = useState<boolean>(false)

// 2. 타입 추론 (초기값으로 자동 추론)
const [count, setCount] = useState(0)        // number로 추론
const [name, setName] = useState('')         // string으로 추론
const [isOpen, setIsOpen] = useState(false)  // boolean으로 추론

// 3. null 가능한 타입
const [user, setUser] = useState<User | null>(null)
const [error, setError] = useState<Error | null>(null)

// 4. 배열 타입
const [items, setItems] = useState<string[]>([])
const [hotels, setHotels] = useState<Hotel[]>([])

// 5. 객체 타입
interface FormData {
  name: string
  email: string
  age: number
}
const [form, setForm] = useState<FormData>({
  name: '',
  email: '',
  age: 0
})

// 6. Union 타입
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
```

### 4.2 초기 상태 설정

#### 직접 값 전달

```typescript
function SimpleState() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('김철수')
  const [items, setItems] = useState(['사과', '바나나'])

  return <div>...</div>
}
```

#### 함수로 초기 상태 계산 (Lazy Initialization)

초기 상태를 계산하는 데 비용이 크다면, **함수를 전달**하여 초기 렌더링 시에만 실행되도록 합니다.

```typescript
function ExpensiveComponent() {
  // ❌ 나쁜 예: 매 렌더링마다 expensiveCalculation() 실행
  const [data, setData] = useState(expensiveCalculation())

  // ✅ 좋은 예: 초기 렌더링 시에만 실행
  const [data, setData] = useState(() => expensiveCalculation())

  return <div>{data}</div>
}
```

**언제 사용하나?**

```typescript
// 1. localStorage에서 데이터 읽기
const [settings, setSettings] = useState(() => {
  const saved = localStorage.getItem('settings')
  return saved ? JSON.parse(saved) : defaultSettings
})

// 2. 복잡한 초기 데이터 생성
const [matrix, setMatrix] = useState(() => {
  // 1000x1000 배열 생성 (비용이 큼)
  return Array(1000).fill(0).map(() => Array(1000).fill(0))
})

// 3. Date 객체 생성
const [createdAt, setCreatedAt] = useState(() => new Date())

// 4. 난수 생성
const [id, setId] = useState(() => Math.random().toString(36).substr(2, 9))
```

**동작 비교:**

```typescript
// ❌ 직접 호출 - 매 렌더링마다 실행
const [data, setData] = useState(expensiveCalculation())

렌더링 1: expensiveCalculation() 실행 → 결과: "abc"
렌더링 2: expensiveCalculation() 실행 (불필요!) → 무시됨
렌더링 3: expensiveCalculation() 실행 (불필요!) → 무시됨

// ✅ 함수 전달 - 초기 렌더링 시에만 실행
const [data, setData] = useState(() => expensiveCalculation())

렌더링 1: expensiveCalculation() 실행 → 결과: "abc"
렌더링 2: 실행 안 함
렌더링 3: 실행 안 함
```

### 4.3 상태 업데이트의 두 가지 방법

#### 방법 1: 직접 값 전달

```typescript
function DirectUpdate() {
  const [count, setCount] = useState(0)

  const reset = () => {
    setCount(0)  // 0으로 직접 설정
  }

  const setToTen = () => {
    setCount(10)  // 10으로 직접 설정
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={reset}>리셋</button>
      <button onClick={setToTen}>10으로 설정</button>
    </div>
  )
}
```

**언제 사용?**
- 새로운 값이 이전 값과 관계없을 때
- 고정된 값으로 설정할 때

#### 방법 2: 함수형 업데이트 (이전 상태 기반)

```typescript
function FunctionalUpdate() {
  const [count, setCount] = useState(0)

  const increment = () => {
    // ✅ 함수형 업데이트: 항상 최신 상태 보장
    setCount(prev => prev + 1)
    //       ↑ 이전 상태를 매개변수로 받음
  }

  const incrementThreeTimes = () => {
    setCount(prev => prev + 1)  // 0 → 1
    setCount(prev => prev + 1)  // 1 → 2
    setCount(prev => prev + 1)  // 2 → 3
    // 결과: 3 ✅
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementThreeTimes}>+3</button>
    </div>
  )
}
```

**언제 사용?**
- 이전 상태를 기반으로 새 상태를 계산할 때
- 한 이벤트 핸들러에서 여러 번 상태를 업데이트할 때
- 클로저 문제를 피하고 싶을 때

**비교:**

```typescript
// ❌ 직접 값 전달 - 문제 발생
const [count, setCount] = useState(0)

const incrementThreeTimes = () => {
  setCount(count + 1)  // 0 + 1 = 1
  setCount(count + 1)  // 0 + 1 = 1 (count는 여전히 0)
  setCount(count + 1)  // 0 + 1 = 1 (count는 여전히 0)
  // 결과: 1 ❌
}

// ✅ 함수형 업데이트 - 올바름
const incrementThreeTimes = () => {
  setCount(prev => prev + 1)  // 0 → 1
  setCount(prev => prev + 1)  // 1 → 2
  setCount(prev => prev + 1)  // 2 → 3
  // 결과: 3 ✅
}
```

### 4.4 복잡한 상태 관리 패턴

#### 객체 상태 관리

```typescript
interface User {
  name: string
  email: string
  age: number
}

function UserForm() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    age: 0
  })

  // 개별 필드 업데이트
  const updateName = (name: string) => {
    setUser(prev => ({ ...prev, name }))
  }

  const updateEmail = (email: string) => {
    setUser(prev => ({ ...prev, email }))
  }

  const updateAge = (age: number) => {
    setUser(prev => ({ ...prev, age }))
  }

  // 제네릭을 사용한 범용 업데이트 함수
  const updateField = <K extends keyof User>(
    field: K,
    value: User[K]
  ) => {
    setUser(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form>
      <input
        value={user.name}
        onChange={e => updateField('name', e.target.value)}
        placeholder="이름"
      />
      <input
        value={user.email}
        onChange={e => updateField('email', e.target.value)}
        placeholder="이메일"
      />
      <input
        type="number"
        value={user.age}
        onChange={e => updateField('age', Number(e.target.value))}
        placeholder="나이"
      />
    </form>
  )
}
```

#### 배열 상태 관리

```typescript
function TodoList() {
  const [todos, setTodos] = useState<string[]>([])

  // 추가
  const addTodo = (text: string) => {
    setTodos(prev => [...prev, text])
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

  // 모두 삭제
  const clearTodos = () => {
    setTodos([])
  }

  return (
    <div>
      <button onClick={() => addTodo('새 할 일')}>추가</button>
      <button onClick={clearTodos}>모두 삭제</button>
      {todos.map((todo, index) => (
        <div key={index}>
          <span>{todo}</span>
          <button onClick={() => removeTodo(index)}>삭제</button>
        </div>
      ))}
    </div>
  )
}
```

#### 복잡한 폼 상태 관리

```typescript
interface FormState {
  name: string
  email: string
  age: number
  interests: string[]
  agreeToTerms: boolean
}

function ComplexForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    age: 0,
    interests: [],
    agreeToTerms: false
  })

  // 개별 필드 업데이트
  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // 관심사 토글 (배열에 추가/제거)
  const toggleInterest = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)  // 제거
        : [...prev.interests, interest]                // 추가
    }))
  }

  // 폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('제출된 데이터:', form)
  }

  // 폼 초기화
  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      age: 0,
      interests: [],
      agreeToTerms: false
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={form.name}
        onChange={e => updateField('name', e.target.value)}
        placeholder="이름"
      />
      <input
        type="email"
        value={form.email}
        onChange={e => updateField('email', e.target.value)}
        placeholder="이메일"
      />
      <input
        type="number"
        value={form.age}
        onChange={e => updateField('age', Number(e.target.value))}
        placeholder="나이"
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={form.interests.includes('운동')}
            onChange={() => toggleInterest('운동')}
          />
          운동
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.interests.includes('독서')}
            onChange={() => toggleInterest('독서')}
          />
          독서
        </label>
      </div>

      <label>
        <input
          type="checkbox"
          checked={form.agreeToTerms}
          onChange={e => updateField('agreeToTerms', e.target.checked)}
        />
        약관에 동의합니다
      </label>

      <button type="submit" disabled={!form.agreeToTerms}>
        제출
      </button>
      <button type="button" onClick={resetForm}>
        초기화
      </button>
    </form>
  )
}
```

### 4.5 여러 개의 상태 관리

#### 개별 상태 vs 통합 상태

```typescript
// ❌ 방법 1: 모든 것을 하나의 객체로 (권장하지 않음)
function BadExample() {
  const [state, setState] = useState({
    user: null,
    hotels: [],
    loading: false,
    error: null,
    searchTerm: '',
    page: 1
  })
  // 문제: 관련 없는 상태들이 함께 있어 복잡도 증가
}

// ✅ 방법 2: 관련된 상태끼리 그룹화
function GoodExample() {
  // 사용자 관련
  const [user, setUser] = useState<User | null>(null)

  // 데이터 관련
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // UI 상태
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  // 각 상태가 독립적으로 업데이트 가능
}

// ✅ 방법 3: 밀접하게 관련된 상태는 함께
function BestExample() {
  const [user, setUser] = useState<User | null>(null)

  // 로딩과 에러는 함께 관리
  const [apiState, setApiState] = useState<{
    loading: boolean
    error: Error | null
  }>({
    loading: false,
    error: null
  })

  // 검색 관련 상태는 함께
  const [searchState, setSearchState] = useState({
    term: '',
    page: 1,
    sortBy: 'price' as const
  })
}
```

### 4.6 실전 예제: 인증 상태 관리

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

### 4.7 useState vs useReducer

언제 `useState`를 사용하고, 언제 `useReducer`로 전환해야 할까요?

#### useState를 사용하는 경우

```typescript
// ✅ 간단한 독립적인 상태
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)

// ✅ 간단한 토글
const [isDarkMode, setIsDarkMode] = useState(false)
const toggleDarkMode = () => setIsDarkMode(prev => !prev)

// ✅ 서로 관련 없는 여러 상태
const [user, setUser] = useState<User | null>(null)
const [searchTerm, setSearchTerm] = useState('')
const [page, setPage] = useState(1)
```

#### useReducer를 사용하는 경우

```typescript
// ✅ 복잡한 상태 로직
type State = {
  count: number
  step: number
  history: number[]
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step]
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count - state.step]
      }
    case 'setStep':
      return { ...state, step: action.payload }
    case 'reset':
      return { count: 0, step: 1, history: [0] }
    default:
      return state
  }
}

function ComplexCounter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
    history: [0]
  })

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({
          type: 'setStep',
          payload: Number(e.target.value)
        })}
      />
    </div>
  )
}
```

#### 선택 가이드

| 기준 | useState | useReducer |
|------|----------|------------|
| **상태 복잡도** | 단순 (숫자, 문자열, boolean) | 복잡 (객체, 여러 관련 값) |
| **업데이트 로직** | 간단 (직접 설정) | 복잡 (여러 조건, 계산) |
| **상태 개수** | 1-3개 정도 | 여러 개가 함께 변경 |
| **업데이트 종류** | 1-2가지 | 여러 종류의 액션 |
| **테스트** | 간단 | Reducer 함수 독립 테스트 가능 |
| **예측 가능성** | 보통 | 높음 (명확한 액션) |

### 4.8 useState 베스트 프랙티스

#### ✅ 해야 할 것

```typescript
// 1. 함수형 업데이트 사용 (이전 상태 기반)
setCount(prev => prev + 1)

// 2. 불변성 유지
setUser({ ...user, name: '새 이름' })
setItems([...items, newItem])

// 3. 관련된 상태 그룹화
const [formData, setFormData] = useState({
  name: '',
  email: '',
  age: 0
})

// 4. 초기값이 비싼 경우 함수 사용
const [data, setData] = useState(() => expensiveCalculation())

// 5. TypeScript 타입 명시
const [user, setUser] = useState<User | null>(null)
```

#### ❌ 피해야 할 것

```typescript
// 1. 상태 직접 변경 (불변성 위반)
user.name = '새 이름'  // ❌
setUser(user)         // ❌

// 2. 배열 변경 메서드 사용
items.push(newItem)   // ❌
setItems(items)       // ❌

// 3. 불필요한 상태 (계산으로 대체 가능)
const [price, setPrice] = useState(0)
const [tax, setTax] = useState(0)
const [total, setTotal] = useState(0)  // ❌ total = price + tax로 계산 가능

// ✅ 개선
const [price, setPrice] = useState(0)
const [tax, setTax] = useState(0)
const total = price + tax  // 계산된 값

// 4. Props를 State로 복사 (동기화 문제)
function Child({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)  // ❌
  // initialCount가 변경되어도 count는 업데이트 안 됨!
}

// ✅ 개선 1: Props를 직접 사용
function Child({ count }: { count: number }) {
  return <div>{count}</div>
}

// ✅ 개선 2: useEffect로 동기화 (꼭 필요한 경우만)
function Child({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    setCount(initialCount)
  }, [initialCount])

  return <div>{count}</div>
}

// 5. 너무 많은 개별 상태
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [age, setAge] = useState(0)
const [phone, setPhone] = useState('')
const [address, setAddress] = useState('')
// ... 10개 이상의 상태 ❌

// ✅ 개선: 객체로 그룹화
const [form, setForm] = useState({
  name: '',
  email: '',
  age: 0,
  phone: '',
  address: ''
})
```

### 4.9 useState 성능 최적화

#### 문제: 불필요한 리렌더링

```typescript
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ 매 렌더링마다 새 배열/객체 생성
  const config = { theme: 'dark', lang: 'ko' }

  return <Child config={config} />
}

// Child는 config가 항상 다르다고 판단 → 매번 리렌더링
const Child = memo(({ config }) => {
  console.log('Child 렌더링')
  return <div>...</div>
})
```

#### 해결 1: 컴포넌트 외부로 이동

```typescript
// ✅ 컴포넌트 외부에 선언
const DEFAULT_CONFIG = { theme: 'dark', lang: 'ko' }

function Parent() {
  const [count, setCount] = useState(0)
  return <Child config={DEFAULT_CONFIG} />
}
```

#### 해결 2: useMemo 사용

```typescript
import { useMemo } from 'react'

function Parent() {
  const [count, setCount] = useState(0)

  // ✅ 메모이제이션으로 참조 유지
  const config = useMemo(() => ({
    theme: 'dark',
    lang: 'ko'
  }), [])

  return <Child config={config} />
}
```

### 4.10 useState 디버깅 팁

#### 1. 상태 변경 추적하기

```typescript
function DebugCounter() {
  const [count, setCount] = useState(0)

  // 상태 변경 시 로그 출력
  const updateCount = (newCount: number) => {
    console.log('이전 값:', count)
    console.log('새 값:', newCount)
    console.trace('호출 스택')  // 어디서 호출되었는지 추적
    setCount(newCount)
  }

  return <button onClick={() => updateCount(count + 1)}>+1</button>
}
```

#### 2. React DevTools 사용

```typescript
// 컴포넌트 이름 설정 (DevTools에서 식별하기 쉬움)
Counter.displayName = 'Counter'

function Counter() {
  const [count, setCount] = useState(0)

  // 디버깅용 useEffect
  useEffect(() => {
    console.log('Counter 렌더링됨, count:', count)
  })

  return <div>{count}</div>
}
```

#### 3. 상태가 업데이트되지 않을 때 체크리스트

```typescript
// ✅ 체크리스트
// 1. setState 호출했는가?
setCount(count + 1)  // ✅

// 2. 불변성을 지켰는가?
setUser({ ...user, name: 'new' })  // ✅
user.name = 'new'; setUser(user)   // ❌

// 3. 비동기 처리를 이해하는가?
setCount(count + 1)
console.log(count)  // 이전 값 출력됨 (정상)

// 4. 조건문 안에서만 setState 호출하지 않았는가?
if (condition) {
  useState(0)  // ❌ Hook은 항상 최상위에서 호출
}
```

---

---

## Chapter 5: useEffect - 생명주기와 부수효과

### 왜 useEffect가 필요할까?

React 컴포넌트는 **순수 함수**여야 합니다. 즉, 같은 입력(props)에 대해 항상 같은 출력(JSX)을 반환해야 합니다. 하지만 실제 애플리케이션에서는 **부수 효과(side effect)**가 필요합니다.

**부수 효과(Side Effect)란?**

컴포넌트 외부와 상호작용하거나, 렌더링 결과에 직접적으로 영향을 주지 않는 작업을 말합니다.

```typescript
// ❌ 컴포넌트 본문에서 직접 부수 효과 수행 (금지!)
function BadComponent() {
  // 렌더링 중에 API 호출 - 매 렌더링마다 실행됨!
  fetch('/api/data')  // ❌ 렌더링마다 반복 실행

  // 렌더링 중에 타이머 설정 - 메모리 누수 발생!
  setInterval(() => {}, 1000)  // ❌ 정리 불가능

  return <div>내용</div>
}

// ✅ useEffect로 부수 효과 수행 (올바름)
function GoodComponent() {
  useEffect(() => {
    // 렌더링 후에 실행
    fetch('/api/data')

    // cleanup 함수로 정리 가능
    const timer = setInterval(() => {}, 1000)
    return () => clearInterval(timer)
  }, [])

  return <div>내용</div>
}
```

**부수 효과의 예시:**

| 카테고리 | 예시 |
|---------|------|
| **데이터 페칭** | API 호출, Firebase 데이터 가져오기 |
| **구독(Subscription)** | WebSocket, Firebase 실시간 리스너 |
| **DOM 조작** | 포커스 설정, 스크롤 위치 변경 |
| **타이머** | setInterval, setTimeout |
| **브라우저 API** | localStorage 저장, 페이지 타이틀 변경 |
| **로깅** | 분석 이벤트 전송, 에러 로깅 |
| **이벤트 리스너** | window 이벤트 등록/해제 |

### 5.1 useEffect 기본 문법

```typescript
useEffect(() => {
  // 1. Effect: 렌더링 후 실행할 코드

  return () => {
    // 2. Cleanup: 정리 작업 (선택사항)
  }
}, [dependencies])  // 3. 의존성 배열
```

**세 가지 구성 요소:**

1. **Effect 함수**: 렌더링 후 실행될 코드
2. **Cleanup 함수** (선택): 컴포넌트 언마운트 또는 다음 Effect 실행 전에 실행
3. **의존성 배열**: Effect가 언제 실행될지 결정

#### 실행 순서 이해하기

```typescript
function LifecycleDemo() {
  console.log('1. 렌더링 시작')

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('3. Effect 실행 (렌더링 후)')

    return () => {
      console.log('4. Cleanup 실행 (다음 Effect 전 또는 언마운트 시)')
    }
  }, [count])

  console.log('2. 렌더링 완료')

  return <div>{count}</div>
}

// 실행 순서:
// 초기 마운트: 1 → 2 → 3
// count 변경: 1 → 2 → 4 (이전 Cleanup) → 3 (새 Effect)
// 언마운트: 4 (Cleanup)
```

### 5.2 의존성 배열의 3가지 패턴

의존성 배열은 **Effect가 언제 실행될지**를 결정합니다.

#### 패턴 1: 의존성 배열 없음 - 매 렌더링마다 실행

```typescript
function EveryRender() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // ⚠️ 의존성 배열 없음 - 모든 렌더링 후 실행
  useEffect(() => {
    console.log('매 렌더링마다 실행')
    console.log('count:', count, 'name:', name)
  })  // 의존성 배열 생략

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>카운트</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}
```

**언제 실행되나?**
- 초기 마운트 시
- count가 변경될 때
- name이 변경될 때
- 부모 컴포넌트 리렌더링으로 인한 모든 렌더링

**언제 사용하나?**
- 거의 사용하지 않음
- 매 렌더링마다 실행이 필요한 경우 (예: 렌더링 로깅)

#### 패턴 2: 빈 배열 - 마운트 시 1번만 실행

```typescript
function MountOnce() {
  const [count, setCount] = useState(0)

  // ✅ 빈 배열 - 마운트 시에만 실행
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다')

    // 초기 데이터 로드
    fetchInitialData()

    // Cleanup: 언마운트 시 실행
    return () => {
      console.log('컴포넌트가 언마운트되었습니다')
    }
  }, [])  // 빈 배열

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      {/* count가 변경되어도 Effect 재실행 안 됨 */}
    </div>
  )
}
```

**언제 실행되나?**
- 초기 마운트 시 1번만
- 컴포넌트 언마운트 시 Cleanup 실행

**언제 사용하나?**
- 초기 데이터 로드
- 이벤트 리스너 등록
- 구독(subscription) 설정
- 페이지 타이틀 설정

#### 패턴 3: 특정 값 - 해당 값이 변경될 때만 실행

```typescript
function WatchSpecific() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // ✅ count가 변경될 때만 실행
  useEffect(() => {
    console.log('count가 변경되었습니다:', count)

    // count 기반 작업
    if (count > 10) {
      alert('10을 넘었습니다!')
    }
  }, [count])  // count만 감시

  // ✅ name이 변경될 때만 실행
  useEffect(() => {
    console.log('name이 변경되었습니다:', name)

    // name 기반 작업
    if (name) {
      localStorage.setItem('userName', name)
    }
  }, [name])  // name만 감시

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        카운트: {count}
      </button>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="이름"
      />
    </div>
  )
}
```

**언제 실행되나?**
- 초기 마운트 시
- 의존성 배열의 값이 변경될 때

**언제 사용하나?**
- 특정 props나 state 변경에 반응
- ID 기반 데이터 다시 로드
- 검색어 변경 시 검색 실행

#### 의존성 배열 비교표

| 패턴 | 구문 | 실행 시점 | 사용 사례 |
|------|------|----------|----------|
| **배열 없음** | `useEffect(() => {})` | 매 렌더링 | 거의 사용 안 함 |
| **빈 배열** | `useEffect(() => {}, [])` | 마운트 시 1번 | 초기 설정, 구독 |
| **특정 값** | `useEffect(() => {}, [val])` | val 변경 시 | 값 기반 로직 |

### 5.3 의존성 배열 동작 원리

React는 **얕은 비교(shallow comparison)**로 의존성이 변경되었는지 확인합니다.

```typescript
function DependencyComparison() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: 'Kim' })

  // 기본 타입: 값 비교
  useEffect(() => {
    console.log('count 변경:', count)
  }, [count])  // 0 → 1 변경 시 실행

  // 객체/배열: 참조 비교
  useEffect(() => {
    console.log('user 변경:', user)
  }, [user])  // 새 객체가 생성될 때만 실행

  const updateUser = () => {
    // ❌ 같은 참조 - Effect 실행 안 됨
    user.name = 'Lee'
    setUser(user)

    // ✅ 새 객체 - Effect 실행됨
    setUser({ ...user, name: 'Lee' })
  }

  return <button onClick={updateUser}>사용자 변경</button>
}
```

**의존성 비교 방식:**

```typescript
// React 내부 비교 로직 (의사 코드)
function areHookInputsEqual(prevDeps, nextDeps) {
  for (let i = 0; i < prevDeps.length; i++) {
    if (Object.is(prevDeps[i], nextDeps[i])) {
      continue
    }
    return false  // 하나라도 다르면 Effect 재실행
  }
  return true  // 모두 같으면 Effect 건너뜀
}

// Object.is() 비교
Object.is(5, 5)                    // true
Object.is('hello', 'hello')        // true
Object.is({ a: 1 }, { a: 1 })      // false (다른 참조)
Object.is([1, 2], [1, 2])          // false (다른 참조)
```

### 5.4 실전 예제: 데이터 페칭

데이터 페칭은 useEffect의 가장 일반적인 사용 사례입니다.

#### 기본 데이터 페칭 패턴

```typescript
interface Hotel {
  id: string
  name: string
  price: number
}

function HotelDetail({ hotelId }: { hotelId: string }) {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false  // Cleanup 플래그

    const fetchHotel = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getHotel(hotelId)

        // ✅ 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
        if (!cancelled) {
          setHotel(data)
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
      cancelled = true  // 진행 중인 요청 무시
    }
  }, [hotelId])  // hotelId가 변경되면 새로 페칭

  // 로딩 상태 처리
  if (loading) return <div>로딩 중...</div>

  // 에러 상태 처리
  if (error) return <div>에러: {error.message}</div>

  // 데이터 없음 처리
  if (!hotel) return <div>호텔을 찾을 수 없습니다</div>

  // 정상 데이터 렌더링
  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>가격: {hotel.price.toLocaleString()}원</p>
    </div>
  )
}
```

#### 왜 cancelled 플래그가 필요할까?

```typescript
// 문제 상황:
// 1. 사용자가 호텔 A를 클릭 → API 요청 시작
// 2. 응답 받기 전에 호텔 B를 클릭 → 컴포넌트 리렌더링, 새 Effect 실행
// 3. 호텔 A 응답 도착 → setState 호출
// 4. 호텔 B 응답 도착 → setState 호출
// 결과: Race Condition (순서가 보장되지 않음)

// ❌ cancelled 플래그 없이
useEffect(() => {
  fetchHotel(hotelId).then(data => {
    setHotel(data)  // ⚠️ 언마운트된 컴포넌트에서 setState 경고!
  })
}, [hotelId])

// ✅ cancelled 플래그로 해결
useEffect(() => {
  let cancelled = false

  fetchHotel(hotelId).then(data => {
    if (!cancelled) {  // ✅ 취소되지 않았을 때만 업데이트
      setHotel(data)
    }
  })

  return () => {
    cancelled = true  // 다음 Effect 실행 시 이전 요청 무시
  }
}, [hotelId])
```

#### AbortController를 사용한 고급 패턴

```typescript
function HotelDetailAdvanced({ hotelId }: { hotelId: string }) {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // AbortController로 요청 취소
    const controller = new AbortController()

    const fetchHotel = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/hotels/${hotelId}`, {
          signal: controller.signal  // 취소 신호 연결
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setHotel(data)
      } catch (err) {
        // AbortError는 무시 (정상적인 취소)
        if (err.name !== 'AbortError') {
          setError(err as Error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchHotel()

    // Cleanup: 요청 취소
    return () => {
      controller.abort()  // 진행 중인 fetch 요청 취소
    }
  }, [hotelId])

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러: {error.message}</div>
  if (!hotel) return <div>호텔을 찾을 수 없습니다</div>

  return <div>{hotel.name}</div>
}
```

#### 로딩 상태 개선: 이전 데이터 유지

```typescript
function HotelDetailWithPreviousData({ hotelId }: { hotelId: string }) {
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    // ✅ 로딩 시작 시 이전 데이터 유지 (깜빡임 방지)
    setLoading(true)
    // setHotel(null) - 이렇게 하지 않음!

    const fetchHotel = async () => {
      try {
        const data = await getHotel(hotelId)

        if (!cancelled) {
          setHotel(data)  // 새 데이터로 교체
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

    return () => {
      cancelled = true
    }
  }, [hotelId])

  return (
    <div>
      {loading && <div className="loading-overlay">로딩 중...</div>}
      {error && <div className="error">{error.message}</div>}
      {hotel && (
        <div className={loading ? 'loading' : ''}>
          <h1>{hotel.name}</h1>
          <p>가격: {hotel.price.toLocaleString()}원</p>
        </div>
      )}
    </div>
  )
}
```

### 5.5 Cleanup 함수 완전 정복

Cleanup 함수는 **메모리 누수를 방지**하고 **리소스를 정리**하는 데 필수적입니다.

#### Cleanup 함수가 필요한 이유

```typescript
// ❌ Cleanup 없이 타이머 사용 - 메모리 누수!
function BadTimer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)
    // ⚠️ 타이머가 계속 실행됨 - 컴포넌트 언마운트 후에도!
  }, [])

  return <div>{count}</div>
}

// ✅ Cleanup으로 타이머 정리
function GoodTimer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)

    // Cleanup: 타이머 정리
    return () => {
      clearInterval(timer)
    }
  }, [])

  return <div>{count}</div>
}
```

#### Cleanup 함수 실행 시점

```typescript
function CleanupDemo() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`Effect 실행: count = ${count}`)

    return () => {
      console.log(`Cleanup 실행: count = ${count}`)
    }
  }, [count])

  return <button onClick={() => setCount(count + 1)}>클릭</button>
}

// 실행 순서:
// 1. 초기 마운트:
//    - "Effect 실행: count = 0"

// 2. 버튼 클릭 (count: 0 → 1):
//    - "Cleanup 실행: count = 0"  (이전 Effect 정리)
//    - "Effect 실행: count = 1"    (새 Effect 실행)

// 3. 버튼 클릭 (count: 1 → 2):
//    - "Cleanup 실행: count = 1"
//    - "Effect 실행: count = 2"

// 4. 컴포넌트 언마운트:
//    - "Cleanup 실행: count = 2"  (마지막 정리)
```

#### Cleanup이 필요한 대표적인 경우

**1. 타이머 (setInterval, setTimeout)**

```typescript
function TimerExample() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)  // ✅ 타이머 정리
  }, [])

  return <div>{seconds}초</div>
}
```

**2. 이벤트 리스너**

```typescript
function KeyPressExample() {
  const [key, setKey] = useState('')

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKey(e.key)
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)  // ✅ 리스너 제거
    }
  }, [])

  return <div>마지막 키: {key}</div>
}
```

**3. WebSocket 연결**

```typescript
function WebSocketExample() {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const ws = new WebSocket('wss://example.com/socket')

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }

    return () => {
      ws.close()  // ✅ WebSocket 연결 종료
    }
  }, [])

  return (
    <div>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  )
}
```

**4. Firebase 구독**

```typescript
function FirebaseSubscription() {
  const [hotels, setHotels] = useState<Hotel[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'hotels'),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Hotel[]
        setHotels(data)
      }
    )

    return () => unsubscribe()  // ✅ 구독 해제
  }, [])

  return <div>{hotels.length}개의 호텔</div>
}
```

**5. Intersection Observer**

```typescript
function LazyImage({ src }: { src: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()  // ✅ Observer 정리
    }
  }, [])

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : '/placeholder.jpg'}
      alt="Lazy loaded"
    />
  )
}
```

### 5.6 이벤트 리스너 등록/해제 상세

이벤트 리스너는 반드시 **등록과 해제를 쌍으로** 처리해야 메모리 누수를 방지할 수 있습니다.

#### 윈도우 리사이즈 이벤트

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

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // Cleanup: 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])  // 빈 배열 - 마운트 시에만 등록

  return (
    <div>
      화면 크기: {size.width} x {size.height}
    </div>
  )
}
```

#### 스크롤 이벤트 (스크롤 진행률)

```typescript
function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const percent = (currentScroll / totalHeight) * 100
      setScrollPercent(Math.min(100, Math.max(0, percent)))
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="scroll-progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollPercent}%`,
        height: '4px',
        backgroundColor: 'blue'
      }}
    />
  )
}
```

#### 키보드 이벤트 (단축키)

```typescript
function KeyboardShortcuts() {
  const [lastKey, setLastKey] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setLastKey(e.key)

      // ESC 키로 모달 닫기
      if (e.key === 'Escape') {
        closeModal()
      }

      // Ctrl+S로 저장
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        saveData()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <div>마지막 키: {lastKey}</div>
}
```

#### 외부 클릭 감지

```typescript
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 메뉴 외부 클릭 시 닫기
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])  // isOpen이 변경될 때마다 재등록

  return (
    <div ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}>메뉴</button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#1">옵션 1</a>
          <a href="#2">옵션 2</a>
        </div>
      )}
    </div>
  )
}
```

### 5.7 여러 개의 useEffect 사용

관심사를 분리하기 위해 여러 개의 useEffect를 사용하는 것이 좋습니다.

#### 잘못된 예: 모든 로직을 하나의 Effect에

```typescript
// ❌ 나쁜 예: 관련 없는 로직이 섞여 있음
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    // 사용자 정보 로드
    fetchUser(userId).then(setUser)

    // 게시글 로드
    fetchUserPosts(userId).then(setPosts)

    // 페이지 타이틀 업데이트
    document.title = `프로필`

    // 방문 기록
    logPageView(userId)

    return () => {
      document.title = '앱 이름'
    }
  }, [userId])

  return <div>...</div>
}
```

#### 올바른 예: 관심사별로 Effect 분리

```typescript
// ✅ 좋은 예: 관심사별로 분리
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  // Effect 1: 사용자 정보 로드
  useEffect(() => {
    let cancelled = false

    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data)
    })

    return () => {
      cancelled = true
    }
  }, [userId])

  // Effect 2: 사용자 게시글 로드 (user에 의존)
  useEffect(() => {
    if (!user) return

    let cancelled = false

    fetchUserPosts(user.id).then(data => {
      if (!cancelled) setPosts(data)
    })

    return () => {
      cancelled = true
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

  // Effect 4: 분석 이벤트
  useEffect(() => {
    logPageView(userId)
  }, [userId])

  return <div>...</div>
}
```

**Effect 분리의 장점:**

| 장점 | 설명 |
|------|------|
| **가독성** | 각 Effect의 목적이 명확함 |
| **유지보수** | 특정 로직만 수정하기 쉬움 |
| **의존성 관리** | 각 Effect가 필요한 의존성만 선언 |
| **디버깅** | 문제가 발생한 Effect를 쉽게 식별 |
| **재사용** | Custom Hook으로 추출하기 쉬움 |

### 5.8 useEffect 안티패턴 완전 정복

#### 안티패턴 1: 의존성 배열 누락

```typescript
// ❌ 안티패턴: count가 의존성에 없음
function BadCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)  // count가 의존성에 없음!
    }, 1000)

    return () => clearInterval(timer)
  }, [])  // 빈 배열 - count 변경을 감지하지 못함
}

// 결과: count는 항상 0으로 고정됨 (0 → 1 → 1 → 1...)

// ✅ 해결 1: 함수형 업데이트
function GoodCounter1() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1)  // 함수형 업데이트
    }, 1000)

    return () => clearInterval(timer)
  }, [])
}

// ✅ 해결 2: 의존성 추가 (권장하지 않음 - 타이머 재설정됨)
function GoodCounter2() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [count])  // count를 의존성에 추가
  // 단점: count가 변경될 때마다 타이머가 재설정됨
}
```

#### 안티패턴 2: Effect에서 연속 setState

```typescript
// ❌ 안티패턴: 연속 setState - 불필요한 리렌더링
function BadExample() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then(result => {
      setData(result)  // 1번 렌더링
      setData(result.filter(item => item.active))  // 2번 렌더링
    })
  }, [])
  // 문제: 불필요한 리렌더링 2번 발생
}

// ✅ 올바른 방법: 계산 후 한 번만 setState
function GoodExample() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then(result => {
      const activeData = result.filter(item => item.active)
      setData(activeData)  // 1번만 렌더링
    })
  }, [])
}
```

#### 안티패턴 3: Props를 State로 복사

```typescript
// ❌ 안티패턴: Props를 State로 복사 - 동기화 문제
function BadChild({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)

  // 문제: initialCount가 변경되어도 count는 업데이트 안 됨!
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}

// ✅ 해결 1: Props를 직접 사용
function GoodChild1({ count, onIncrement }: Props) {
  return (
    <div>
      <p>{count}</p>
      <button onClick={onIncrement}>증가</button>
    </div>
  )
}

// ✅ 해결 2: useEffect로 동기화 (꼭 필요한 경우만)
function GoodChild2({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)

  useEffect(() => {
    setCount(initialCount)
  }, [initialCount])

  return <div>{count}</div>
}

// ✅ 해결 3: key prop으로 리셋
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <Child
      key={count}  // count가 변경되면 Child가 완전히 재생성
      initialCount={count}
    />
  )
}
```

#### 안티패턴 4: 무한 루프

```typescript
// ❌ 안티패턴: 무한 루프
function InfiniteLoop() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1)  // Effect가 count를 변경
  }, [count])  // count가 변경되면 Effect 재실행
  // 결과: 무한 루프! (count → Effect → count → Effect → ...)
}

// ✅ 올바른 방법 1: 조건 추가
function NoInfiniteLoop1() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 10) {  // 조건 추가
      setCount(count + 1)
    }
  }, [count])
}

// ✅ 올바른 방법 2: 의존성 제거
function NoInfiniteLoop2() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(prev => prev + 1)
  }, [])  // 빈 배열 - 한 번만 실행
}
```

#### 안티패턴 5: 계산 가능한 값을 State로 관리

```typescript
// ❌ 안티패턴: 불필요한 State 동기화
function BadSync() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`)
  }, [firstName, lastName])

  return <div>{fullName}</div>
}

// ✅ 올바른 방법: 계산된 값 사용
function GoodSync() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // State 대신 계산된 값
  const fullName = `${firstName} ${lastName}`

  return <div>{fullName}</div>
}
```

#### 안티패턴 6: 객체/배열을 의존성으로 사용

```typescript
// ❌ 안티패턴: 매번 새로운 객체 생성
function BadDependency() {
  const [user, setUser] = useState({ name: 'Kim', age: 25 })

  useEffect(() => {
    console.log('Effect 실행')
    fetchUserData(user)
  }, [user])  // user 객체가 매번 다른 참조

  const updateAge = () => {
    setUser({ ...user, age: 26 })  // 새 객체 생성 → Effect 재실행
  }

  return <button onClick={updateAge}>나이 변경</button>
}

// ✅ 해결 1: 기본 타입만 의존성으로
function GoodDependency1() {
  const [user, setUser] = useState({ name: 'Kim', age: 25 })

  useEffect(() => {
    console.log('Effect 실행')
    fetchUserData(user)
  }, [user.name, user.age])  // 기본 타입만 의존성으로

  return <div>...</div>
}

// ✅ 해결 2: useMemo로 안정적인 참조 유지
function GoodDependency2() {
  const [name, setName] = useState('Kim')
  const [age, setAge] = useState(25)

  const user = useMemo(() => ({ name, age }), [name, age])

  useEffect(() => {
    console.log('Effect 실행')
    fetchUserData(user)
  }, [user])  // useMemo로 안정적인 참조

  return <div>...</div>
}
```

#### 안티패턴 7: Effect를 직접 async로 만들기

```typescript
// ❌ 안티패턴: Effect를 async로 만들기
function BadAsync() {
  useEffect(async () => {  // ❌ 에러 발생!
    const data = await fetchData()
    setData(data)
  }, [])
  // 에러: useEffect는 Promise를 반환할 수 없음 (Cleanup 함수만 가능)
}

// ✅ 올바른 방법: 내부에서 async 함수 정의
function GoodAsync() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await api()
      setData(data)
    }

    fetchData()
  }, [])
}
```

### 5.9 useEffect 베스트 프랙티스

#### ✅ 해야 할 것

```typescript
// 1. 관심사별로 Effect 분리
useEffect(() => {
  fetchUser()
}, [userId])

useEffect(() => {
  updateTitle()
}, [user])

// 2. Cleanup 함수 작성 (필요한 경우)
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  return () => clearInterval(timer)
}, [])

// 3. 함수형 업데이트 사용
useEffect(() => {
  setCount(prev => prev + 1)
}, [])

// 4. 의존성 배열 정확히 명시
useEffect(() => {
  fetchData(userId, filter)
}, [userId, filter])  // 모든 외부 값 포함

// 5. async/await는 내부 함수로
useEffect(() => {
  const loadData = async () => {
    const data = await api()
    setData(data)
  }
  loadData()
}, [])

// 6. ESLint 경고 무시하지 않기
// eslint-disable-next-line react-hooks/exhaustive-deps  // ❌ 피하기
```

#### ❌ 피해야 할 것

```typescript
// 1. Effect를 직접 async로
useEffect(async () => {}, [])  // ❌

// 2. 의존성 배열 생략 (ESLint 경고 무시)
useEffect(() => {
  setCount(count + 1)
}, [])  // ❌ count가 의존성에 없음

// 3. 너무 많은 로직을 하나의 Effect에
useEffect(() => {
  // 100줄의 복잡한 로직  ❌
}, [dep1, dep2, dep3, dep4, dep5])

// 4. 계산 가능한 값을 State로
useEffect(() => {
  setFullName(`${first} ${last}`)  // ❌
}, [first, last])

// 5. 조건 없는 무한 루프
useEffect(() => {
  setCount(count + 1)  // ❌
}, [count])
```

### 5.10 useEffect 디버깅 팁

```typescript
// 1. Effect 실행 추적
useEffect(() => {
  console.log('Effect 실행:', { userId, filter })

  return () => {
    console.log('Cleanup 실행:', { userId, filter })
  }
}, [userId, filter])

// 2. 의존성 변경 감지
useEffect(() => {
  console.log('userId 변경:', userId)
}, [userId])

// 3. Effect 실행 횟수 카운트
function DebugComponent() {
  const effectCount = useRef(0)

  useEffect(() => {
    effectCount.current += 1
    console.log('Effect 실행 횟수:', effectCount.current)
  })

  return <div>Effect 실행: {effectCount.current}번</div>
}

// 4. 의존성 변경 디버깅
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function DebugDependencies() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  useEffect(() => {
    console.log(`count 변경: ${prevCount} → ${count}`)
  }, [count])

  return <button onClick={() => setCount(count + 1)}>증가</button>
}

// 5. React DevTools Profiler 사용
// - "Highlight updates when components render" 활성화
// - Effect가 예상치 못하게 실행되는지 확인
// - Components 탭에서 Hooks 상태 확인
```

---

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

### 왜 useCallback과 useMemo가 필요할까?

React는 성능이 뛰어나지만, **대규모 애플리케이션**에서는 불필요한 재계산과 리렌더링이 성능 문제를 일으킬 수 있습니다. 이때 `useCallback`과 `useMemo`가 성능 최적화의 핵심 도구가 됩니다.

**⚠️ 중요한 전제:**
- 모든 곳에 useCallback/useMemo를 사용하는 것은 **과도한 최적화**입니다
- 메모이제이션 자체도 **비용**이 듭니다 (메모리, 비교 연산)
- **성능 문제가 실제로 발생했을 때** 프로파일링 후 적용하는 것이 권장됩니다

**언제 사용해야 할까?**

```typescript
// 1. 비용이 큰 계산 → useMemo
const sortedList = useMemo(() => {
  return items.sort((a, b) => b.price - a.price) // 무거운 정렬 연산
}, [items])

// 2. 자식 컴포넌트에 함수 전달 → useCallback
const MemoizedChild = memo(ChildComponent)
const handleClick = useCallback(() => {
  // 함수가 동일하면 자식이 리렌더링되지 않음
}, [])
<MemoizedChild onClick={handleClick} />

// 3. useEffect 의존성 배열에 포함되는 객체/함수
const options = useMemo(() => ({ page: 1, limit: 10 }), [])
useEffect(() => {
  fetchData(options) // options이 동일하면 재실행 안 됨
}, [options])
```

### 6.1 React의 렌더링 동작 원리

React의 렌더링 메커니즘을 이해해야 최적화 시점을 알 수 있습니다.

**기본 렌더링 규칙:**
```typescript
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <Child /> {/* ⚠️ count 변경 시 Child도 리렌더링! */}
    </div>
  )
}

function Child() {
  console.log('Child 렌더링')
  return <div>나는 count와 무관한데 왜 리렌더링?</div>
}
```

**실행 흐름:**
1. Parent의 `setCount` 호출 → Parent 리렌더링
2. Parent가 리렌더링되면 **모든 자식도 자동 리렌더링**
3. Child는 count와 무관하지만 매번 렌더링됨

**해결 방법 1: React.memo**
```typescript
import { memo } from 'react'

const Child = memo(() => {
  console.log('Child 렌더링')
  return <div>이제 props가 변경될 때만 렌더링!</div>
})
```

**해결 방법 2: useCallback + React.memo (함수 props)**
```typescript
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ 매 렌더링마다 새 함수 생성 → Child는 계속 리렌더링
  const handleClick = () => console.log('click')

  // ✅ 함수가 동일하게 유지 → Child 리렌더링 방지
  const handleClick = useCallback(() => console.log('click'), [])

  return <Child onClick={handleClick} />
}

const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child 렌더링')
  return <button onClick={onClick}>버튼</button>
})
```

**왜 함수가 문제일까?**
```typescript
// JavaScript의 함수 동작
const func1 = () => console.log('hello')
const func2 = () => console.log('hello')

console.log(func1 === func2) // false! (서로 다른 참조)

// React 렌더링마다
function Component() {
  const handleClick = () => {} // 매번 새로운 함수 객체 생성!
  return <Child onClick={handleClick} />
}
```

### 6.2 useMemo - 값 메모이제이션

**기본 문법:**
```typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

**useMemo의 동작 원리:**
1. 첫 렌더링: 함수 실행 → 결과 저장
2. 이후 렌더링: 의존성 배열 비교
   - 변경 없음 → 저장된 값 반환 (재계산 X)
   - 변경 있음 → 함수 재실행 → 새 결과 저장

**언제 사용할까?**

| 상황 | 사용 여부 | 이유 |
|------|----------|------|
| 무거운 계산 (정렬, 필터링 등) | ✅ 사용 | 매 렌더링마다 재계산하면 성능 저하 |
| 객체/배열을 자식에게 전달 | ✅ 사용 | 참조 동일성 유지로 불필요한 리렌더링 방지 |
| useEffect 의존성의 객체/배열 | ✅ 사용 | 무한 루프 방지 |
| 간단한 계산 (a + b 등) | ❌ 불필요 | 메모이제이션 비용이 더 큼 |
| 컴포넌트 내부에서만 사용하는 값 | ❌ 불필요 | 전달하지 않으면 메모이제이션 불필요 |

**예제 1: 비용이 큰 계산**

```typescript
import { useMemo } from 'react'

interface Item {
  id: string
  name: string
  price: number
}

function ExpensiveComponent({ items }: { items: Item[] }) {
  // ❌ 문제: 매 렌더링마다 정렬 재실행
  const sortedItems = items.sort((a, b) => b.price - a.price)

  // 부모가 리렌더링될 때마다 불필요하게 정렬 실행!
  // items가 동일해도 sort가 계속 실행됨

  // ✅ 해결: items가 변경될 때만 정렬
  const sortedItems = useMemo(() => {
    console.log('정렬 실행 - 비용이 큰 연산!')
    return [...items].sort((a, b) => b.price - a.price)
  }, [items])

  return (
    <div>
      {sortedItems.map(item => (
        <div key={item.id}>{item.name}: {item.price}원</div>
      ))}
    </div>
  )
}
```

**실행 결과 비교:**
```typescript
// ❌ useMemo 없이 (3번의 부모 리렌더링 시)
// "정렬 실행" - 1번째 렌더링
// "정렬 실행" - 2번째 렌더링 (items 동일한데도!)
// "정렬 실행" - 3번째 렌더링 (items 동일한데도!)

// ✅ useMemo 사용 (items 변경 시에만)
// "정렬 실행" - 1번째 렌더링
// (2번째 렌더링 - items 동일하므로 스킵)
// (3번째 렌더링 - items 동일하므로 스킵)
// "정렬 실행" - items 변경된 4번째 렌더링
```

**예제 2: 참조 동일성 문제**

```typescript
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ 매 렌더링마다 새 배열 생성
  const items = [1, 2, 3]

  // ✅ 참조 유지
  const items = useMemo(() => [1, 2, 3], [])

  return <Child items={items} />
}

const Child = memo(({ items }: { items: number[] }) => {
  console.log('Child 렌더링')
  return <div>{items.join(', ')}</div>
})

// ❌ useMemo 없이
// Parent의 count 변경 → items는 새 배열 → Child 리렌더링
// (내용은 [1,2,3]으로 동일하지만 참조가 달라져서 리렌더링!)

// ✅ useMemo 사용
// Parent의 count 변경 → items는 동일 참조 → Child 리렌더링 안 됨
```

### 6.3 useMemo 실전 예제: 필터링과 정렬

복잡한 데이터 처리 로직에서 useMemo의 효과를 극대화할 수 있습니다.

```typescript
interface Hotel {
  id: string
  name: string
  price: number
  rating: number
}

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
  // ↑ 의존성: hotels, searchTerm, sortBy 중 하나라도 변경되면 재계산

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

**왜 useMemo가 필요한가?**

```typescript
// ❌ useMemo 없이 (1000개의 호텔 데이터)
// 사용자가 다른 상태(예: 테마 변경)를 업데이트할 때마다
// → 필터링 + 정렬 재실행 (약 100ms 소요)
// → 화면이 버벅거림!

// ✅ useMemo 사용
// hotels, searchTerm, sortBy가 변경되지 않으면
// → 저장된 결과 재사용 (0ms)
// → 부드러운 사용자 경험
```

**다단계 메모이제이션:**

```typescript
function ComplexHotelList({ hotels }: { hotels: Hotel[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])

  // 1단계: 검색어 필터링
  const searchFiltered = useMemo(() => {
    console.log('1단계: 검색 필터링')
    return hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [hotels, searchTerm])

  // 2단계: 가격 범위 필터링
  const priceFiltered = useMemo(() => {
    console.log('2단계: 가격 필터링')
    return searchFiltered.filter(hotel =>
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    )
  }, [searchFiltered, priceRange])

  // 3단계: 정렬
  const sorted = useMemo(() => {
    console.log('3단계: 정렬')
    return [...priceFiltered].sort((a, b) => {
      return sortBy === 'price' ? a.price - b.price : b.rating - a.rating
    })
  }, [priceFiltered, sortBy])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="호텔 검색..."
      />
      <div>
        <label>가격 범위: {priceRange[0]} ~ {priceRange[1]}</label>
        <input
          type="range"
          min={0}
          max={1000000}
          value={priceRange[0]}
          onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
        />
      </div>
      <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
        <option value="price">가격순</option>
        <option value="rating">평점순</option>
      </select>

      {sorted.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}

// 실행 시나리오:
// 1. 초기 렌더링: 1단계 → 2단계 → 3단계 모두 실행
// 2. searchTerm 변경: 1단계 → 2단계 → 3단계 (모두 재실행)
// 3. priceRange 변경: 1단계 스킵 → 2단계 → 3단계 (1단계 재사용!)
// 4. sortBy 변경: 1, 2단계 스킵 → 3단계만 실행 (1, 2단계 재사용!)
```

### 6.4 useCallback - 함수 메모이제이션

**기본 문법:**
```typescript
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

**useCallback의 동작 원리:**
1. 첫 렌더링: 함수 생성 → 참조 저장
2. 이후 렌더링: 의존성 배열 비교
   - 변경 없음 → 저장된 함수 반환 (동일 참조)
   - 변경 있음 → 새 함수 생성 → 새 참조 저장

**useMemo vs useCallback:**
```typescript
// useCallback: 함수 자체를 메모이제이션
const handleClick = useCallback(() => {
  console.log('click')
}, [])

// useMemo로 동일하게 구현 가능 (하지만 useCallback이 더 명확)
const handleClick = useMemo(() => {
  return () => console.log('click')
}, [])

// 비교
useCallback(fn, deps)  // 함수를 반환
useMemo(() => fn, deps) // 함수를 반환하는 함수를 실행
```

**언제 사용할까?**

| 상황 | 사용 여부 | 이유 |
|------|----------|------|
| React.memo된 자식에게 함수 전달 | ✅ 사용 | 함수 참조 동일성 유지로 리렌더링 방지 |
| useEffect 의존성 배열의 함수 | ✅ 사용 | 무한 루프 방지 |
| 다른 Hook의 의존성으로 사용 | ✅ 사용 | 불필요한 재실행 방지 |
| 일반 이벤트 핸들러 | ❌ 불필요 | 자식에게 전달하지 않으면 불필요 |
| 인라인 함수 | ❌ 불필요 | 간단한 로직은 인라인이 더 읽기 쉬움 |

**예제 1: React.memo와 함께 사용**

```typescript
import { useCallback, memo } from 'react'

function Parent() {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(0)

  // ❌ 문제: 매 렌더링마다 새 함수 생성
  const handleClick = () => {
    setCount(count + 1)
  }

  // Parent가 리렌더링될 때마다 handleClick은 새로운 함수
  // → Child는 props가 변경되었다고 판단 → 리렌더링!

  // ✅ 해결: useCallback으로 함수 참조 유지
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1) // 함수형 업데이트로 count 의존성 제거!
  }, [])
  // 의존성 배열이 빈 배열 → 함수는 컴포넌트 생명주기 동안 동일

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setOtherState(otherState + 1)}>
        다른 상태 변경
      </button>
      <Child onClick={handleClick} />
    </div>
  )
}

// React.memo로 props가 변경될 때만 리렌더링
const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log('Child 렌더링')
  return <button onClick={onClick}>카운트 증가</button>
})

// 실행 흐름:
// 1. "다른 상태 변경" 버튼 클릭
// 2. Parent 리렌더링
// 3. handleClick은 동일한 참조 (useCallback 덕분)
// 4. Child는 리렌더링되지 않음! (props 동일)
```

**예제 2: 의존성이 있는 경우**

```typescript
function SearchComponent({ userId }: { userId: string }) {
  const [searchTerm, setSearchTerm] = useState('')

  // ❌ userId를 의존성에 포함하지 않으면 stale closure!
  const handleSearch = useCallback(() => {
    console.log(`검색: ${searchTerm}, 사용자: ${userId}`)
    // userId가 변경되어도 이전 값이 사용됨!
  }, [searchTerm]) // userId 누락!

  // ✅ 모든 외부 변수를 의존성에 포함
  const handleSearch = useCallback(() => {
    console.log(`검색: ${searchTerm}, 사용자: ${userId}`)
  }, [searchTerm, userId])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <SearchButton onSearch={handleSearch} />
    </div>
  )
}
```

**예제 3: useEffect와 함께 사용**

```typescript
function DataFetcher({ hotelId }: { hotelId: string }) {
  const [data, setData] = useState<Hotel | null>(null)

  // ❌ 문제: fetchData가 의존성에 있는데 매번 새로 생성
  const fetchData = async () => {
    const result = await getHotel(hotelId)
    setData(result)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData]) // ⚠️ fetchData가 매번 바뀌어서 무한 루프!

  // ✅ 해결 1: useCallback으로 함수 안정화
  const fetchData = useCallback(async () => {
    const result = await getHotel(hotelId)
    setData(result)
  }, [hotelId])

  useEffect(() => {
    fetchData()
  }, [fetchData]) // fetchData는 hotelId가 변경될 때만 바뀜

  // ✅ 해결 2: useEffect 안에 함수 정의 (더 권장)
  useEffect(() => {
    const fetchData = async () => {
      const result = await getHotel(hotelId)
      setData(result)
    }
    fetchData()
  }, [hotelId]) // 의존성이 명확!

  return <div>{data?.name}</div>
}
```

### 6.5 useCallback 실전 예제: 검색 디바운싱

디바운싱은 성능 최적화의 대표적인 패턴입니다. useCallback과 결합하면 강력합니다.

```typescript
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 검색 함수를 useCallback으로 메모이제이션
  const performSearch = useCallback(async (keyword: string) => {
    if (keyword.trim() === '') {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const data = await searchHotels(keyword)
      setResults(data)
    } catch (error) {
      console.error('검색 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  // 의존성 없음 → 함수는 컴포넌트 생명주기 동안 동일

  // 디바운싱 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm)
    }, 500) // 500ms 대기 후 검색

    return () => clearTimeout(timer) // 이전 타이머 취소
  }, [searchTerm, performSearch])
  // searchTerm 변경 시 → 이전 타이머 취소 → 새 타이머 시작

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="호텔 검색..."
      />
      {isLoading && <div>검색 중...</div>}
      <SearchResults results={results} />
    </div>
  )
}

// 실행 흐름:
// 1. 사용자 입력: "서" → 500ms 타이머 시작
// 2. 500ms 전에 "서울" 입력 → 이전 타이머 취소, 새 타이머 시작
// 3. 500ms 전에 "서울호" 입력 → 이전 타이머 취소, 새 타이머 시작
// 4. 500ms 경과 → performSearch("서울호") 실행
// 결과: API 호출 1번만! (3번 입력했지만)
```

**커스텀 Hook으로 재사용:**

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
  const [results, setResults] = useState<Hotel[]>([])

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchHotels(debouncedSearchTerm).then(setResults)
    }
  }, [debouncedSearchTerm])

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="호텔 검색..."
    />
  )
}
```

### 6.6 useCallback과 useMemo 조합 패턴

실전에서는 두 Hook을 함께 사용하여 최적의 성능을 달성합니다.

```typescript
interface Hotel {
  id: string
  name: string
  price: number
  rating: number
}

function HotelManager() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filter, setFilter] = useState('')

  // 1. 필터링된 호텔 목록 (useMemo) - 값 메모이제이션
  const filteredHotels = useMemo(() => {
    console.log('필터링 실행')
    return hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [hotels, filter])
  // hotels나 filter가 변경될 때만 재계산

  // 2. 호텔 추가 함수 (useCallback) - 함수 메모이제이션
  const addHotel = useCallback((hotel: Hotel) => {
    setHotels(prev => [...prev, hotel])
  }, [])
  // 의존성 없음 → 함수는 항상 동일

  // 3. 호텔 삭제 함수 (useCallback)
  const deleteHotel = useCallback((hotelId: string) => {
    setHotels(prev => prev.filter(h => h.id !== hotelId))
  }, [])

  // 4. 호텔 업데이트 함수 (useCallback)
  const updateHotel = useCallback((hotelId: string, updates: Partial<Hotel>) => {
    setHotels(prev => prev.map(h =>
      h.id === hotelId ? { ...h, ...updates } : h
    ))
  }, [])

  return (
    <div>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="호텔 검색..."
      />
      <HotelList
        hotels={filteredHotels}  // useMemo로 메모이제이션된 값
        onDelete={deleteHotel}   // useCallback으로 메모이제이션된 함수
        onUpdate={updateHotel}   // useCallback으로 메모이제이션된 함수
      />
      <AddHotelForm onAdd={addHotel} />
    </div>
  )
}

// HotelList는 memo로 최적화
const HotelList = memo(({
  hotels,
  onDelete,
  onUpdate
}: {
  hotels: Hotel[]
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Hotel>) => void
}) => {
  console.log('HotelList 렌더링')
  return (
    <div>
      {hotels.map(hotel => (
        <HotelItem
          key={hotel.id}
          hotel={hotel}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
})
```

**최적화 효과:**
1. `filter` 변경 → `filteredHotels` 재계산, `HotelList` 리렌더링
2. 부모의 다른 상태 변경 → `filteredHotels`, `onDelete`, `onUpdate` 모두 동일 → `HotelList` 리렌더링 안 됨!

### 6.7 성능 측정 및 프로파일링

**언제 최적화해야 할까?**

> "Premature optimization is the root of all evil" - Donald Knuth

먼저 측정하고, 문제가 있을 때만 최적화하세요!

**방법 1: console.time으로 측정**

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

  // ❌ useMemo 없이: 매 렌더링마다 실행
  const result1 = expensiveCalculation(count)
  // 콘솔 출력: "계산 시간: 847.23ms"

  // ✅ useMemo 사용: count 변경 시에만 실행
  const result2 = useMemo(() => expensiveCalculation(count), [count])
  // count 동일 → 재계산 안 함 → 0ms

  return <div>{result2}</div>
}
```

**방법 2: React DevTools Profiler**

```typescript
import { Profiler, ProfilerOnRenderCallback } from 'react'

function App() {
  const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    console.log(`${id} (${phase}):`, {
      actualDuration, // 실제 렌더링 시간
      baseDuration,   // 메모이제이션 없이의 예상 시간
    })
  }

  return (
    <Profiler id="HotelList" onRender={onRenderCallback}>
      <HotelList />
    </Profiler>
  )
}
```

**방법 3: 커스텀 Hook으로 렌더링 추적**

```typescript
function useRenderCount(componentName: string) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log(`${componentName} 렌더링 횟수: ${renderCount.current}`)
  })
}

// 사용
function HotelList() {
  useRenderCount('HotelList')
  // ...
}
```

### 6.8 useMemo/useCallback 안티패턴 완전 정복

**안티패턴 1: 모든 것을 메모이제이션**

```typescript
// ❌ 과도한 최적화
function Component({ a, b }: { a: number; b: number }) {
  const sum = useMemo(() => a + b, [a, b])  // 간단한 계산
  const handleClick = useCallback(() => {    // 자식에게 전달 안 함
    console.log('click')
  }, [])

  return <button onClick={handleClick}>{sum}</button>
}

// ✅ 이렇게만 해도 충분
function Component({ a, b }: { a: number; b: number }) {
  const sum = a + b  // 덧셈은 충분히 빠름
  const handleClick = () => console.log('click')

  return <button onClick={handleClick}>{sum}</button>
}
```

**안티패턴 2: 의존성 배열 누락**

```typescript
// ❌ userId가 변경되어도 이전 값 사용 (stale closure)
function UserProfile({ userId }: { userId: string }) {
  const fetchData = useCallback(async () => {
    const data = await getUserData(userId)  // ⚠️ userId 의존!
    return data
  }, [])  // userId 누락!

  // ✅ 모든 의존성 포함
  const fetchData = useCallback(async () => {
    const data = await getUserData(userId)
    return data
  }, [userId])
}
```

**안티패턴 3: 객체/배열을 의존성에 직접 포함**

```typescript
// ❌ options 객체는 매번 새로 생성 → useMemo 무용지물
function Component() {
  const options = { page: 1, limit: 10 }

  const data = useMemo(() => {
    return fetchData(options)
  }, [options])  // options는 매번 새 참조!
}

// ✅ 해결 1: 원시값을 의존성으로
function Component() {
  const page = 1
  const limit = 10

  const data = useMemo(() => {
    return fetchData({ page, limit })
  }, [page, limit])
}

// ✅ 해결 2: options도 메모이제이션
function Component() {
  const options = useMemo(() => ({ page: 1, limit: 10 }), [])

  const data = useMemo(() => {
    return fetchData(options)
  }, [options])
}
```

**안티패턴 4: useCallback에서 상태를 직접 참조**

```typescript
// ❌ count를 의존성에 포함 → 함수가 매번 변경 → 최적화 무용지물
function Counter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount(count + 1)  // count 의존!
  }, [count])  // count 변경마다 새 함수 생성

  return <ExpensiveChild onIncrement={increment} />
}

// ✅ 함수형 업데이트로 의존성 제거
function Counter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount(prev => prev + 1)  // 의존성 없음!
  }, [])  // 함수는 항상 동일

  return <ExpensiveChild onIncrement={increment} />
}
```

**안티패턴 5: useMemo 안에서 부수 효과**

```typescript
// ❌ useMemo는 순수 함수여야 함
const data = useMemo(() => {
  fetchData()  // ⚠️ 부수 효과 (API 호출)
  localStorage.setItem('key', 'value')  // ⚠️ 부수 효과
  return someCalculation()
}, [deps])

// ✅ 부수 효과는 useEffect에서
useEffect(() => {
  fetchData()
  localStorage.setItem('key', 'value')
}, [deps])

const data = useMemo(() => {
  return someCalculation()  // 순수 계산만
}, [deps])
```

### 6.9 useCallback/useMemo 베스트 프랙티스

**✅ DO: 이럴 때 사용하세요**

1. **비용이 큰 계산 (useMemo)**
   ```typescript
   const sortedList = useMemo(() =>
     items.sort((a, b) => b.price - a.price),
     [items]
   )
   ```

2. **React.memo와 함께 (useCallback)**
   ```typescript
   const MemoChild = memo(Child)
   const handleClick = useCallback(() => {}, [])
   <MemoChild onClick={handleClick} />
   ```

3. **useEffect 의존성 (useMemo/useCallback)**
   ```typescript
   const options = useMemo(() => ({ page: 1 }), [])
   useEffect(() => {
     fetchData(options)
   }, [options])
   ```

**❌ DON'T: 이럴 때는 불필요합니다**

1. **간단한 계산**
   ```typescript
   // ❌
   const sum = useMemo(() => a + b, [a, b])
   // ✅
   const sum = a + b
   ```

2. **자식에게 전달하지 않는 함수**
   ```typescript
   // ❌
   const handleClick = useCallback(() => {}, [])
   // ✅
   const handleClick = () => {}
   ```

3. **이미 메모이제이션된 값을 다시 메모이제이션**
   ```typescript
   // ❌ 불필요한 중복
   const memoized = useMemo(() => props.memoizedValue, [props.memoizedValue])
   // ✅
   const memoized = props.memoizedValue
   ```

### 6.10 useCallback/useMemo 디버깅 팁

**1. 의존성 변경 추적**

```typescript
function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
  const previousProps = useRef<Record<string, any>>()

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      const changes: Record<string, { from: any; to: any }> = {}

      allKeys.forEach(key => {
        if (previousProps.current![key] !== props[key]) {
          changes[key] = {
            from: previousProps.current![key],
            to: props[key],
          }
        }
      })

      if (Object.keys(changes).length) {
        console.log('[why-did-you-update]', name, changes)
      }
    }

    previousProps.current = props
  })
}

// 사용
function HotelList({ hotels, onDelete }: Props) {
  useWhyDidYouUpdate('HotelList', { hotels, onDelete })
  // 콘솔 출력: [why-did-you-update] HotelList { hotels: { from: [...], to: [...] } }
}
```

**2. 렌더링 원인 추적**

```typescript
function useTraceUpdate(props: Record<string, any>) {
  const prev = useRef(props)

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((acc, [key, value]) => {
      if (prev.current[key] !== value) {
        acc[key] = {
          old: prev.current[key],
          new: value,
        }
      }
      return acc
    }, {} as Record<string, any>)

    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps)
    }

    prev.current = props
  })
}
```

**3. useMemo/useCallback 히트율 측정**

```typescript
function useMemoCacheHit<T>(factory: () => T, deps: any[], name: string): T {
  const cacheHit = useRef(0)
  const cacheMiss = useRef(0)

  const value = useMemo(() => {
    cacheMiss.current++
    console.log(`${name} - Hit: ${cacheHit.current}, Miss: ${cacheMiss.current}`)
    return factory()
  }, deps)

  useEffect(() => {
    cacheHit.current++
  })

  return value
}
```

---

## Chapter 7: useRef - DOM 접근과 값 보관

### 왜 useRef가 필요할까?

React는 **선언적(Declarative)** 프로그래밍을 지향합니다. 하지만 때로는 **명령형(Imperative)** 방식으로 DOM을 직접 제어하거나, **리렌더링을 유발하지 않는 값**을 저장해야 할 때가 있습니다.

**useRef가 해결하는 문제:**

```typescript
// ❌ 문제 1: 일반 변수는 렌더링마다 초기화됨
function BadCounter() {
  let count = 0  // 렌더링마다 0으로 초기화!

  const handleClick = () => {
    count += 1
    console.log(count)  // 콘솔에는 증가하지만
  }

  return <div>{count}</div>  // UI는 항상 0!
}

// ❌ 문제 2: useState는 리렌더링을 유발함
function BadTimer() {
  const [timerId, setTimerId] = useState<number | null>(null)

  const start = () => {
    const id = setInterval(() => {
      console.log('tick')
    }, 1000)
    setTimerId(id)  // ⚠️ 불필요한 리렌더링 발생!
  }
}

// ✅ 해결: useRef는 값을 유지하면서 리렌더링을 유발하지 않음
function GoodTimer() {
  const timerRef = useRef<number | null>(null)

  const start = () => {
    timerRef.current = setInterval(() => {
      console.log('tick')
    }, 1000)
    // 리렌더링 없이 값만 저장!
  }
}
```

### 7.1 useRef의 두 가지 주요 용도

`useRef`는 다음 두 가지 목적으로 사용됩니다:

**1. DOM 요소에 직접 접근**
```typescript
const inputRef = useRef<HTMLInputElement>(null)
// inputRef.current는 실제 DOM 노드를 가리킴
inputRef.current?.focus()  // DOM API 직접 호출
```

**2. 리렌더링되지 않는 변수 저장 (Mutable Value)**
```typescript
const countRef = useRef(0)
countRef.current += 1  // 값 변경해도 리렌더링 안 됨
```

**기본 문법:**

```typescript
const ref = useRef<Type>(initialValue)

// ref 객체 구조
{
  current: initialValue  // 유일한 프로퍼티
}
```

**useRef vs useState 비교:**

| 특징 | useRef | useState |
|------|--------|----------|
| **값 변경 시 리렌더링** | ❌ 안 됨 | ✅ 됨 |
| **값 유지** | ✅ 렌더링 간 유지 | ✅ 렌더링 간 유지 |
| **변경 방법** | `ref.current = newValue` | `setState(newValue)` |
| **초기화** | 한 번만 | 한 번만 |
| **사용 사례** | DOM 접근, 타이머 ID, 이전 값 | UI에 표시할 상태 |

### 7.2 DOM 요소 접근: 기본부터 심화까지

**기본 예제:**

```typescript
function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null)
  // null: 초기값 (아직 DOM이 생성 안 됨)

  const handleFocus = () => {
    // DOM 요소에 직접 접근
    inputRef.current?.focus()
    // Optional chaining (?) : null일 수 있으므로 안전하게 접근
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      {/* ref 속성에 연결하면 DOM 노드가 inputRef.current에 저장됨 */}
      <button onClick={handleFocus}>포커스</button>
    </div>
  )
}
```

**실행 순서:**
1. 컴포넌트 렌더링 → `inputRef.current`는 `null`
2. DOM 요소 생성 → `inputRef.current`에 실제 `<input>` DOM 노드 할당
3. `handleFocus` 호출 → `inputRef.current.focus()` 실행

**TypeScript 타입 지정:**

```typescript
// 다양한 DOM 요소 타입
const inputRef = useRef<HTMLInputElement>(null)
const divRef = useRef<HTMLDivElement>(null)
const buttonRef = useRef<HTMLButtonElement>(null)
const videoRef = useRef<HTMLVideoElement>(null)
const canvasRef = useRef<HTMLCanvasElement>(null)

// 제네릭 사용
function GenericRef<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  return ref
}
```

### 7.3 DOM 접근 실전 예제

**예제 1: 검색 입력창 자동 포커스**

```typescript
function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // 컴포넌트 마운트 시 자동 포커스
    searchInputRef.current?.focus()
  }, [])

  const handleClear = () => {
    setSearchTerm('')
    // ⚠️ 주의: setState는 비동기!
    // 상태 업데이트 후 바로 DOM 조작하려면:

    // ❌ 작동 안 함 (state 업데이트는 비동기)
    // searchInputRef.current.value = ''

    // ✅ ref를 통한 직접 제어
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
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="호텔 검색..."
      />
      <button onClick={handleClear}>초기화</button>
    </div>
  )
}
```

**예제 2: 스크롤 위치 제어**

```typescript
function ScrollToTop() {
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // 현재 스크롤 위치 감지
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div>
      <div ref={topRef}>페이지 상단</div>

      {/* 긴 콘텐츠 */}
      <div style={{ height: '2000px' }}>
        {/* 호텔 목록 등 */}
      </div>

      <div ref={bottomRef}>페이지 하단</div>

      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
        >
          맨 위로 ↑
        </button>
      )}
    </div>
  )
}
```

**예제 3: 비디오 재생 제어**

```typescript
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      console.log('현재 재생 시간:', videoRef.current.currentTime)
    }
  }

  return (
    <div>
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={togglePlay}>
        {isPlaying ? '일시정지' : '재생'}
      </button>
      <button onClick={() => videoRef.current?.load()}>
        처음부터
      </button>
    </div>
  )
}
```

### 7.4 Mutable Value 저장 (리렌더링 없는 값)

useRef의 두 번째 주요 용도는 **렌더링 간 값을 유지하면서 변경 시 리렌더링을 유발하지 않는** 변수를 만드는 것입니다.

**언제 사용할까?**

```typescript
// ✅ useRef 사용: 다음 경우에 적합
// - 타이머 ID (setInterval, setTimeout)
// - 구독 객체 (unsubscribe 함수)
// - DOM 요소 크기, 스크롤 위치
// - 이전 props/state 값 추적
// - 렌더링 횟수 카운트

// ❌ useState 사용: 다음 경우에만
// - UI에 표시되는 값
// - 변경 시 리렌더링이 필요한 값
```

**예제 1: 타이머 ID 저장**

```typescript
function Timer() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  const start = () => {
    // 이미 실행 중이면 무시
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

  // 언마운트 시 타이머 정리 (메모리 누수 방지!)
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

// 왜 useState가 아닌 useRef를 사용할까?
// 1. timerRef 값 변경 시 리렌더링 불필요 (타이머 ID는 UI와 무관)
// 2. useState를 사용하면 불필요한 리렌더링 발생
```

**예제 2: 렌더링 횟수 추적**

```typescript
function RenderCounter() {
  const renderCount = useRef(0)

  // 렌더링될 때마다 증가 (하지만 리렌더링 유발 안 함!)
  useEffect(() => {
    renderCount.current += 1
  })

  const [count, setCount] = useState(0)

  return (
    <div>
      <p>렌더링 횟수: {renderCount.current}</p>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}

// 출력:
// 1회 렌더링: "렌더링 횟수: 1"
// 버튼 클릭 → 2회 렌더링: "렌더링 횟수: 2"
// 버튼 클릭 → 3회 렌더링: "렌더링 횟수: 3"
```

### 7.5 이전 값 저장 (usePrevious 패턴)

**커스텀 Hook: usePrevious**

```typescript
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    // 렌더링 완료 후 현재 값을 이전 값으로 저장
    ref.current = value
  }, [value])

  // 첫 렌더링에서는 undefined 반환
  return ref.current
}
```

**동작 원리:**
```typescript
// 1회 렌더링: value = 5
//   - ref.current = undefined (아직 useEffect 실행 안 됨)
//   - return undefined
//   - useEffect 실행 → ref.current = 5

// 2회 렌더링: value = 10
//   - ref.current = 5 (이전 렌더링의 값)
//   - return 5
//   - useEffect 실행 → ref.current = 10

// 3회 렌더링: value = 15
//   - ref.current = 10
//   - return 10
//   - useEffect 실행 → ref.current = 15
```

**사용 예제:**

```typescript
function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>현재: {count}</p>
      <p>이전: {prevCount ?? '없음'}</p>
      <p>변화량: {prevCount !== undefined ? count - prevCount : 0}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
    </div>
  )
}

// 실행 결과:
// 초기: 현재: 0, 이전: 없음, 변화량: 0
// 증가: 현재: 1, 이전: 0, 변화량: 1
// 증가: 현재: 2, 이전: 1, 변화량: 1
// 감소: 현재: 1, 이전: 2, 변화량: -1
```

**실전 예제: 호텔 검색 결과 변경 감지**

```typescript
function HotelList({ searchTerm }: { searchTerm: string }) {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const prevSearchTerm = usePrevious(searchTerm)

  useEffect(() => {
    // 검색어가 실제로 변경되었을 때만 API 호출
    if (searchTerm !== prevSearchTerm) {
      console.log(`검색어 변경: "${prevSearchTerm}" → "${searchTerm}"`)
      fetchHotels(searchTerm).then(setHotels)
    }
  }, [searchTerm, prevSearchTerm])

  return <div>{/* 호텔 목록 렌더링 */}</div>
}
```

### 7.6 useRef vs useState: 언제 무엇을 쓸까?

**비교 예제:**

```typescript
function Comparison() {
  // useState: 값이 변경되면 리렌더링됨
  const [stateValue, setStateValue] = useState(0)

  // useRef: 값이 변경되어도 리렌더링 안 됨
  const refValue = useRef(0)

  const handleStateChange = () => {
    setStateValue(prev => prev + 1)
    console.log('리렌더링 발생, 새 값:', stateValue + 1)
  }

  const handleRefChange = () => {
    refValue.current += 1
    console.log('리렌더링 없음, 새 값:', refValue.current)
    // ⚠️ 화면에는 업데이트 안 됨!
  }

  return (
    <div>
      <p>State: {stateValue}</p>
      <p>Ref: {refValue.current}</p>
      {/* Ref 값은 변경되어도 화면에 반영 안 됨 */}
      <button onClick={handleStateChange}>State 변경 (리렌더링)</button>
      <button onClick={handleRefChange}>Ref 변경 (리렌더링 없음)</button>
    </div>
  )
}
```

**의사결정 플로우:**

```
Q: 이 값이 UI에 표시되나요?
├─ YES → useState 사용
└─ NO → Q: 렌더링 간 값을 유지해야 하나요?
    ├─ YES → useRef 사용
    └─ NO → 일반 변수 사용
```

**실전 예제:**

```typescript
function SearchComponent() {
  // ✅ UI에 표시 → useState
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Hotel[]>([])

  // ✅ UI에 표시 안 함 + 렌더링 간 유지 → useRef
  const abortControllerRef = useRef<AbortController | null>(null)
  const searchCount = useRef(0)

  useEffect(() => {
    // 이전 요청 취소
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    searchCount.current += 1
    console.log(`검색 횟수: ${searchCount.current}`)

    fetch(`/api/hotels?q=${searchTerm}`, {
      signal: abortControllerRef.current.signal
    })
      .then(res => res.json())
      .then(setResults)

    return () => abortControllerRef.current?.abort()
  }, [searchTerm])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {results.map(hotel => (
        <div key={hotel.id}>{hotel.name}</div>
      ))}
    </div>
  )
}
```

### 7.7 무한 스크롤 구현 (Intersection Observer + useRef)

```typescript
function InfiniteScroll() {
  const [items, setItems] = useState<Hotel[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // 마지막 요소를 관찰할 ref
  const loaderRef = useRef<HTMLDivElement>(null)

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 마지막 요소가 화면에 보이면
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 1.0 }  // 100% 보일 때 트리거
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [hasMore, isLoading])

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    if (page === 0) return

    setIsLoading(true)

    fetch(`/api/hotels?page=${page}&limit=20`)
      .then(res => res.json())
      .then((newItems: Hotel[]) => {
        setItems(prev => [...prev, ...newItems])
        setHasMore(newItems.length > 0)
        setIsLoading(false)
      })
  }, [page])

  return (
    <div>
      {items.map(item => (
        <div key={item.id} style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <h3>{item.name}</h3>
          <p>{item.price}원</p>
        </div>
      ))}

      {/* 로딩 인디케이터 */}
      {hasMore && (
        <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
          {isLoading ? '로딩 중...' : '스크롤하여 더 보기'}
        </div>
      )}

      {!hasMore && <div>모든 항목을 불러왔습니다</div>}
    </div>
  )
}
```

### 7.8 useRef 안티패턴 및 주의사항

**안티패턴 1: ref.current를 렌더링 중에 읽기/쓰기**

```typescript
// ❌ 렌더링 중에 ref 변경
function BadComponent() {
  const renderCount = useRef(0)
  renderCount.current += 1  // ⚠️ 렌더링 중 부수 효과!

  return <div>렌더링 횟수: {renderCount.current}</div>
}

// ✅ useEffect에서 변경
function GoodComponent() {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
  })

  return <div>렌더링 횟수: {renderCount.current}</div>
}
```

**안티패턴 2: ref.current 변경으로 리렌더링 시도**

```typescript
// ❌ ref 변경은 리렌더링을 유발하지 않음
function BadComponent() {
  const dataRef = useRef({ count: 0 })

  const increment = () => {
    dataRef.current.count += 1
    // ⚠️ 화면은 업데이트 안 됨!
  }

  return <div>{dataRef.current.count}</div>
}

// ✅ UI 업데이트가 필요하면 useState 사용
function GoodComponent() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(prev => prev + 1)
  }

  return <div>{count}</div>
}
```

**안티패턴 3: useEffect 의존성에 ref.current 포함**

```typescript
// ❌ ref.current는 의존성 배열에 넣지 않음
function BadComponent() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef.current])  // ⚠️ 불필요하고 버그 발생 가능
}

// ✅ ref 객체 자체는 변하지 않으므로 의존성 불필요
function GoodComponent() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])  // ✅ 빈 배열
}
```

---

## Chapter 8: useContext - 전역 상태 관리

### 왜 useContext가 필요할까?

React 컴포넌트 트리에서 데이터를 전달할 때 **Props Drilling** 문제가 발생합니다.

**Props Drilling이란?**

```typescript
// ❌ 문제: 5단계에 걸쳐 user를 전달해야 함
function App() {
  const [user, setUser] = useState({ name: 'John' })
  return <Page1 user={user} />
}

function Page1({ user }: { user: User }) {
  return <Page2 user={user} />  // user를 사용하지 않지만 전달
}

function Page2({ user }: { user: User }) {
  return <Page3 user={user} />  // user를 사용하지 않지만 전달
}

function Page3({ user }: { user: User }) {
  return <Page4 user={user} />  // user를 사용하지 않지만 전달
}

function Page4({ user }: { user: User }) {
  return <Profile user={user} />  // 드디어 사용!
}

function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>
}
```

**문제점:**
1. 중간 컴포넌트들이 user를 사용하지 않는데도 props로 전달해야 함
2. user 타입이 변경되면 모든 중간 컴포넌트 수정 필요
3. 코드가 복잡해지고 유지보수 어려움

**해결: Context API**

```typescript
// ✅ 해결: Context로 직접 전달
const UserContext = createContext<User | null>(null)

function App() {
  const [user, setUser] = useState({ name: 'John' })
  return (
    <UserContext.Provider value={user}>
      <Page1 />  {/* user props 불필요! */}
    </UserContext.Provider>
  )
}

// 중간 컴포넌트들은 user를 신경 쓰지 않음
function Page1() { return <Page2 /> }
function Page2() { return <Page3 /> }
function Page3() { return <Page4 /> }
function Page4() { return <Profile /> }

// 필요한 곳에서만 직접 가져옴
function Profile() {
  const user = useContext(UserContext)
  return <div>{user?.name}</div>
}
```

### 8.1 Context API 기본 개념

**Context 생성 3단계:**
1. **Context 생성** (`createContext`)
2. **Provider로 값 제공** (상위 컴포넌트)
3. **Consumer에서 값 사용** (`useContext`, 하위 컴포넌트)

**시각화:**
```
┌──────────────────────────────────┐
│  <Provider value={data}>         │  ← 값 제공
│    ┌──────────────────────────┐  │
│    │  <Component1 />          │  │  ← useContext 사용 가능
│    │    ┌────────────────────┐│  │
│    │    │  <Component2 />    ││  │  ← useContext 사용 가능
│    │    │    <Component3 />  ││  │  ← useContext 사용 가능
│    │    └────────────────────┘│  │
│    └──────────────────────────┘  │
│  </Provider>                     │
└──────────────────────────────────┘
```

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

Context를 잘못 사용하면 **불필요한 리렌더링**이 발생할 수 있습니다.

**문제 1: 매 렌더링마다 새 객체 생성**

```typescript
// ❌ 성능 문제: Provider 리렌더링 시 모든 consumer가 리렌더링됨
function BadProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [settings, setSettings] = useState({})

  // 매 렌더링마다 새 객체 생성 → 참조가 변경됨!
  return (
    <UserContext.Provider value={{ user, setUser, settings, setSettings }}>
      {children}
    </UserContext.Provider>
  )
}

// 실행 흐름:
// 1. BadProvider 리렌더링 (어떤 이유로든)
// 2. value 객체가 새로 생성 (새 참조)
// 3. 모든 consumer가 리렌더링 (user, settings가 동일해도!)
```

**해결 1: useMemo로 value 메모이제이션**

```typescript
// ✅ 개선: useMemo로 불필요한 리렌더링 방지
function BetterProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [settings, setSettings] = useState({})

  const value = useMemo(
    () => ({ user, setUser, settings, setSettings }),
    [user, settings]
  )
  // user, settings가 변경될 때만 새 객체 생성

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
```

**해결 2: Context 분리 (더 권장)**

```typescript
// ✅ 최선: Context를 관심사별로 분리
const UserContext = createContext<UserContextType | null>(null)
const SettingsContext = createContext<SettingsContextType | null>(null)

function GoodProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [settings, setSettings] = useState({})

  // 각각 독립적으로 메모이제이션
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

// 장점:
// 1. user만 변경 → UserContext consumer만 리렌더링
// 2. settings만 변경 → SettingsContext consumer만 리렌더링
// 3. 필요한 데이터만 구독 가능
```

**실전 예제: 상태와 액션 분리**

```typescript
// Context를 state와 actions로 분리
const UserStateContext = createContext<User | null>(null)
const UserActionsContext = createContext<UserActions | null>(null)

interface UserActions {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // actions는 변하지 않음 (useCallback으로 안정화)
  const actions = useMemo<UserActions>(() => ({
    login: async (email, password) => {
      const userData = await loginAPI(email, password)
      setUser(userData)
    },
    logout: async () => {
      await logoutAPI()
      setUser(null)
    },
    updateProfile: async (data) => {
      const updated = await updateProfileAPI(data)
      setUser(updated)
    }
  }), [])

  return (
    <UserStateContext.Provider value={user}>
      <UserActionsContext.Provider value={actions}>
        {children}
      </UserActionsContext.Provider>
    </UserStateContext.Provider>
  )
}

// 사용: 상태만 필요한 컴포넌트
function UserProfile() {
  const user = useContext(UserStateContext)
  // user 변경 시에만 리렌더링
  return <div>{user?.name}</div>
}

// 사용: 액션만 필요한 컴포넌트
function LogoutButton() {
  const { logout } = useContext(UserActionsContext)!
  // user 변경 시에도 리렌더링 안 됨!
  return <button onClick={logout}>로그아웃</button>
}
```

### 8.6 Context vs Props vs 상태 관리 라이브러리

**언제 무엇을 사용해야 할까?**

```typescript
// 1. Props: 1-2단계 전달, 명시적 의존성
function Parent() {
  const [user, setUser] = useState(null)
  return <Child user={user} />  // ✅ 가까운 관계, 명확한 데이터 흐름
}

// 2. Context: 여러 단계 전달, Props Drilling 방지
<UserContext.Provider value={user}>
  <Layout>
    <Sidebar>
      <Profile />  {/* 5단계 깊이에서 user 사용 */}
    </Sidebar>
  </Layout>
</UserContext.Provider>

// 3. Zustand/Redux: 복잡한 전역 상태, 여러 곳에서 동시 업데이트
const useStore = create((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),
}))
```

**비교표:**

| 특징 | Props | Context | 상태 관리 라이브러리 |
|------|-------|---------|---------------------|
| **사용 사례** | 부모-자식 직접 전달 | 여러 단계 전달 | 복잡한 전역 상태 |
| **데이터 흐름** | 명시적, 추적 쉬움 | 암시적, 추적 어려움 | 중앙 집중식 |
| **성능** | 빠름 | 주의 필요 | 최적화됨 |
| **디버깅** | 쉬움 | 보통 | DevTools 지원 |
| **학습 곡선** | 낮음 | 낮음 | 높음 |
| **보일러플레이트** | 없음 | 적음 | 많음 |

**의사결정 플로우:**

```
Q: 데이터를 몇 단계 전달해야 하나요?
├─ 1-2단계 → Props 사용
└─ 3단계 이상 → Q: 데이터가 자주 변경되나요?
    ├─ 아니오 (테마, 언어 설정 등) → Context 사용
    └─ 예 (장바구니, 사용자 활동 등) → Q: 복잡한 업데이트 로직이 있나요?
        ├─ 아니오 → Context + useReducer 사용
        └─ 예 → Zustand/Redux 사용
```

### 8.7 Context 안티패턴 및 베스트 프랙티스

**안티패턴 1: 모든 상태를 하나의 Context에**

```typescript
// ❌ 모든 상태를 하나의 Context에 넣음
const AppContext = createContext({
  user: null,
  theme: 'light',
  language: 'ko',
  notifications: [],
  cart: [],
  settings: {},
  // ... 모든 상태
})

// 문제: 어떤 상태가 변경되어도 모든 consumer가 리렌더링!
```

```typescript
// ✅ 관심사별로 Context 분리
const UserContext = createContext(null)
const ThemeContext = createContext('light')
const CartContext = createContext([])
// 각 Context는 독립적으로 업데이트됨
```

**안티패턴 2: Context를 너무 깊게 중첩**

```typescript
// ❌ 10개 이상의 Provider 중첩
<Provider1>
  <Provider2>
    <Provider3>
      <Provider4>
        <Provider5>
          {/* ... */}
        </Provider5>
      </Provider4>
    </Provider3>
  </Provider2>
</Provider1>
```

```typescript
// ✅ compose 함수로 Provider 합성
function composeProviders(...providers: React.FC<any>[]) {
  return providers.reduce(
    (Prev, Curr) => ({ children }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    )
  )
}

const AppProviders = composeProviders(
  ThemeProvider,
  UserProvider,
  CartProvider
)

function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  )
}
```

**베스트 프랙티스:**

1. **항상 custom hook 제공**
   ```typescript
   // ✅ useUser hook으로 안전하게 사용
   export function useUser() {
     const context = useContext(UserContext)
     if (context === undefined) {
       throw new Error('useUser must be used within UserProvider')
     }
     return context
   }
   ```

2. **TypeScript로 타입 안전성 확보**
   ```typescript
   interface UserContextType {
     user: User | null
     login: (email: string) => Promise<void>
     logout: () => Promise<void>
   }

   const UserContext = createContext<UserContextType | undefined>(undefined)
   ```

3. **성능을 위해 Context 분리**
   ```typescript
   // State와 Actions 분리
   const UserStateContext = createContext<User | null>(null)
   const UserActionsContext = createContext<UserActions | null>(null)
   ```

---

# Part 3: 실전 React 패턴

## Chapter 9: Custom Hooks - 로직 재사용

### 왜 Custom Hook이 필요할까?

여러 컴포넌트에서 **동일한 로직**을 반복해서 사용할 때, Custom Hook으로 추출하면 코드 재사용성과 가독성이 크게 향상됩니다.

**문제: 중복 코드**

```typescript
// ❌ 여러 컴포넌트에서 동일한 로직 반복
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedValue, setDebouncedValue] = useState(searchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // 검색 로직...
}

function FilterInput() {
  const [filterTerm, setFilterTerm] = useState('')
  const [debouncedValue, setDebouncedValue] = useState(filterTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(filterTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [filterTerm])

  // 필터링 로직...
}

// 같은 디바운싱 로직이 반복됨!
```

**해결: Custom Hook**

```typescript
// ✅ 재사용 가능한 Custom Hook으로 추출
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

// 사용: 간결하고 재사용 가능!
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  // 검색 로직...
}

function FilterInput() {
  const [filterTerm, setFilterTerm] = useState('')
  const debouncedFilter = useDebounce(filterTerm, 500)
  // 필터링 로직...
}
```

### 9.1 Custom Hook의 규칙과 특징

**규칙:**
1. **이름은 `use`로 시작**해야 함 (React가 Hook으로 인식)
2. **다른 Hook을 사용할 수 있음** (useState, useEffect 등)
3. **컴포넌트가 아니므로 JSX 반환 불가**
4. **Hook 규칙을 따라야 함** (조건문, 반복문 안에서 호출 불가)

**Custom Hook의 장점:**
- ✅ 로직 재사용
- ✅ 컴포넌트 코드 간결화
- ✅ 테스트 용이
- ✅ 관심사 분리

**언제 만들어야 할까?**
```
Q: 이 로직을 다른 컴포넌트에서도 사용하나요?
├─ YES → Custom Hook으로 추출
└─ NO → Q: 컴포넌트가 너무 복잡한가요?
    ├─ YES → 관심사 분리를 위해 Custom Hook 고려
    └─ NO → 컴포넌트에 그대로 두기
```

### 9.2 기본 Custom Hook 예제: useToggle

**useToggle Hook** - Boolean 상태를 편리하게 관리

```typescript
// src/hooks/useToggle.ts
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  // useCallback으로 함수 참조 안정화
  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return { value, toggle, setTrue, setFalse }
}
```

**사용 예제 1: 모달**

```typescript
function Modal() {
  const { value: isOpen, setTrue: open, setFalse: close } = useToggle()

  return (
    <div>
      <button onClick={open}>모달 열기</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>모달 내용</p>
            <button onClick={close}>닫기</button>
          </div>
        </div>
      )}
    </div>
  )
}
```

**사용 예제 2: 아코디언**

```typescript
function Accordion() {
  const { value: isExpanded, toggle } = useToggle(false)

  return (
    <div>
      <button onClick={toggle}>
        {isExpanded ? '접기 ▲' : '펼치기 ▼'}
      </button>
      {isExpanded && (
        <div className="accordion-content">
          <p>상세 내용...</p>
        </div>
      )}
    </div>
  )
}
```

**사용 예제 3: 다크모드 토글**

```typescript
function ThemeToggle() {
  const { value: isDark, toggle } = useToggle(false)

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light'
  }, [isDark])

  return (
    <button onClick={toggle}>
      {isDark ? '🌙 다크모드' : '☀️ 라이트모드'}
    </button>
  )
}
```

**왜 useToggle을 만들까?**

```typescript
// ❌ useToggle 없이: 매번 이렇게 작성
const [isOpen, setIsOpen] = useState(false)
const open = () => setIsOpen(true)
const close = () => setIsOpen(false)
const toggle = () => setIsOpen(prev => !prev)

// ✅ useToggle 사용: 한 줄로 해결
const { value: isOpen, open, close, toggle } = useToggle()
```

### 9.3 실전 Custom Hooks 완전 정복

#### 9.3.1 useDebounce - 입력 지연 처리

**목적:** 사용자 입력을 일정 시간 지연시켜 불필요한 API 호출을 줄임

```typescript
// src/hooks/useDebounce.ts
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // delay 후에 값 업데이트
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // value 변경 시 이전 타이머 취소
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

**동작 원리:**
```typescript
// 사용자가 "React"를 입력하는 과정
// 1. "R" 입력 → 500ms 타이머 시작 → 타이머 취소 (다음 입력)
// 2. "Re" 입력 → 500ms 타이머 시작 → 타이머 취소 (다음 입력)
// 3. "Rea" 입력 → 500ms 타이머 시작 → 타이머 취소 (다음 입력)
// 4. "Reac" 입력 → 500ms 타이머 시작 → 타이머 취소 (다음 입력)
// 5. "React" 입력 → 500ms 타이머 시작 → 500ms 경과 → API 호출!

// 결과: 5번 입력했지만 API는 1번만 호출
```

**실전 예제: 호텔 검색**

```typescript
function HotelSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<Hotel[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (!debouncedSearch) {
      setResults([])
      return
    }

    setIsSearching(true)
    searchHotels(debouncedSearch)
      .then(setResults)
      .finally(() => setIsSearching(false))
  }, [debouncedSearch])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="호텔 검색..."
      />
      {isSearching && <div>검색 중...</div>}
      <div>
        {results.map(hotel => (
          <div key={hotel.id}>{hotel.name}</div>
        ))}
      </div>
    </div>
  )
}

// 성능 개선:
// - 사용자가 "서울호텔"을 입력 (4글자)
// - useDebounce 없이: API 4번 호출
// - useDebounce 사용: API 1번 호출 (75% 감소!)
```

#### 9.3.2 useLocalStorage - 로컬 스토리지 동기화

**목적:** localStorage와 React state를 자동으로 동기화

```typescript
// src/hooks/useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T) {
  // 초기값: localStorage에서 가져오기 (lazy initialization)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // setState와 동일한 API (함수형 업데이트 지원)
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 함수형 업데이트 지원
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // State 업데이트
      setStoredValue(valueToStore)

      // localStorage에 저장
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}
```

**실전 예제 1: 테마 설정 저장**

```typescript
function ThemeSettings() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      현재 테마: {theme}
    </button>
  )
}

// 장점:
// 1. 페이지 새로고침해도 테마 유지
// 2. localStorage 동기화 자동화
// 3. useState와 동일한 API
```

**실전 예제 2: 최근 검색어 저장**

```typescript
function SearchHistory() {
  const [history, setHistory] = useLocalStorage<string[]>('search-history', [])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if (!searchTerm.trim()) return

    // 함수형 업데이트 지원!
    setHistory(prev => {
      const newHistory = [searchTerm, ...prev.filter(term => term !== searchTerm)]
      return newHistory.slice(0, 10)  // 최대 10개만 저장
    })

    // 검색 실행...
  }

  const clearHistory = () => setHistory([])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <div>
        <h3>최근 검색어</h3>
        {history.map((term, idx) => (
          <div key={idx} onClick={() => setSearchTerm(term)}>
            {term}
          </div>
        ))}
        <button onClick={clearHistory}>기록 삭제</button>
      </div>
    </div>
  )
}
```

#### 9.3.3 useIntersectionObserver - 뷰포트 감지

**목적:** 요소가 화면에 보이는지 감지 (무한 스크롤, 지연 로딩)

```typescript
// src/hooks/useIntersectionObserver.ts
function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      options
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}
```

**실전 예제 1: 이미지 지연 로딩**

```typescript
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const isVisible = useIntersectionObserver(imgRef, {
    threshold: 0.1,  // 10% 보일 때 트리거
    rootMargin: '50px',  // 50px 전에 미리 로드
  })

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : '/placeholder.jpg'}
      alt={alt}
      style={{
        transition: 'opacity 0.3s',
        opacity: isVisible ? 1 : 0.5,
      }}
    />
  )
}

// 성능 개선:
// - 100개 이미지가 있는 페이지
// - 지연 로딩 없이: 100개 모두 즉시 로드 (느림!)
// - 지연 로딩 사용: 보이는 것만 로드 (빠름!)
```

**실전 예제 2: 무한 스크롤**

```typescript
function InfiniteHotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loaderRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(loaderRef, {
    threshold: 1.0,
  })

  // 마지막 요소가 보이면 다음 페이지 로드
  useEffect(() => {
    if (isVisible && hasMore) {
      fetchHotels(page).then(newHotels => {
        setHotels(prev => [...prev, ...newHotels])
        setHasMore(newHotels.length > 0)
        setPage(prev => prev + 1)
      })
    }
  }, [isVisible, hasMore])

  return (
    <div>
      {hotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
      {hasMore && <div ref={loaderRef}>로딩 중...</div>}
    </div>
  )
}
```

**실전 예제 3: 애니메이션 트리거**

```typescript
function AnimatedSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold: 0.5 })

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s ease-out',
      }}
    >
      <h2>스크롤하면 나타나는 섹션</h2>
    </div>
  )
}
```

---

## Chapter 10: React Router - SPA 라우팅

### 왜 React Router가 필요할까?

**SPA (Single Page Application)**에서는 페이지 전환 시 서버에서 HTML을 다시 받아오지 않고, **JavaScript로 URL을 변경하고 컴포넌트를 교체**합니다.

**전통적인 MPA vs SPA:**

```typescript
// ❌ 전통적인 MPA (Multi Page Application)
// 페이지 이동 시 서버에서 새 HTML 받아옴
<a href="/hotels">호텔 목록</a>
// 문제:
// 1. 전체 페이지 새로고침 (깜빡임)
// 2. 상태 초기화
// 3. 느린 페이지 전환

// ✅ SPA (Single Page Application) with React Router
<Link to="/hotels">호텔 목록</Link>
// 장점:
// 1. 부드러운 페이지 전환 (깜빡임 없음)
// 2. 상태 유지
// 3. 빠른 페이지 전환
```

### 10.1 React Router 기본 설정

**설치:**
```bash
npm install react-router-dom
```

**기본 라우트 구조:**

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 라우트 */}
        <Route path="/" element={<HomePage />} />

        {/* 정적 경로 */}
        <Route path="/hotels" element={<HotelListPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/my" element={<MyPage />} />

        {/* 동적 경로 (URL 파라미터) */}
        <Route path="/hotel/:id" element={<HotelDetailPage />} />

        {/* 리다이렉트 */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* 404 페이지 (모든 경로에 매칭 안 되면) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**라우트 매칭 순서:**
```typescript
// React Router는 위에서 아래로 순차적으로 매칭
<Routes>
  <Route path="/" element={<Home />} />        // /
  <Route path="/hotels" element={<Hotels />} />  // /hotels
  <Route path="/hotel/:id" element={<Detail />} />  // /hotel/123
  <Route path="*" element={<NotFound />} />    // 그 외 모든 경로
</Routes>

// 예시:
// - /          → Home 렌더링
// - /hotels    → Hotels 렌더링
// - /hotel/123 → Detail 렌더링 (id = "123")
// - /invalid   → NotFound 렌더링
```

### 10.2 네비게이션: Link vs useNavigate

**방법 1: Link 컴포넌트 (선언적)**

```typescript
import { Link, NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      {/* 기본 Link */}
      <Link to="/">홈</Link>
      <Link to="/hotels">호텔 목록</Link>
      <Link to="/my">마이페이지</Link>

      {/* NavLink: 현재 경로와 일치하면 active 클래스 추가 */}
      <NavLink
        to="/hotels"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black',
          fontWeight: isActive ? 'bold' : 'normal',
        })}
      >
        호텔
      </NavLink>
    </nav>
  )
}
```

**방법 2: useNavigate (명령적)**

```typescript
import { useNavigate } from 'react-router-dom'

function HotelCard({ hotel }: { hotel: Hotel }) {
  const navigate = useNavigate()

  const handleClick = () => {
    // 조건부 로직 후 이동
    if (hotel.isAvailable) {
      navigate(`/hotel/${hotel.id}`)
    } else {
      alert('예약 불가능한 호텔입니다')
    }
  }

  const handleBooking = () => {
    // 예약 후 페이지 이동
    bookHotel(hotel.id).then(() => {
      navigate('/my/reservations', {
        state: { hotelName: hotel.name },  // 상태 전달
        replace: true,  // 히스토리 대체 (뒤로가기 불가)
      })
    })
  }

  return (
    <div>
      <h3>{hotel.name}</h3>
      <button onClick={handleClick}>상세보기</button>
      <button onClick={handleBooking}>예약하기</button>

      {/* 네비게이션 유틸리티 */}
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <button onClick={() => navigate(1)}>앞으로가기</button>
      <button onClick={() => navigate('/', { replace: true })}>홈으로</button>
    </div>
  )
}
```

**Link vs useNavigate 선택 기준:**

| 상황 | 사용 도구 | 이유 |
|------|----------|------|
| 단순 페이지 이동 | Link | 접근성 좋음, SEO 친화적 |
| 조건부 이동 | useNavigate | 로직 포함 가능 |
| 폼 제출 후 이동 | useNavigate | 비동기 처리 후 이동 |
| 네비게이션 메뉴 | NavLink | 현재 페이지 표시 |

### 10.3 URL 파라미터와 쿼리스트링 완전 정복

**URL 파라미터 (useParams):**

```typescript
import { useParams } from 'react-router-dom'

// 라우트 정의: /hotel/:id
// URL 예시: /hotel/hotel-123

function HotelDetailPage() {
  const { id } = useParams<{ id: string }>()
  // id = "hotel-123"

  const { data: hotel, isLoading } = useHotel({ id: id! })

  if (isLoading) return <div>로딩 중...</div>
  if (!hotel) return <div>호텔을 찾을 수 없습니다</div>

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
    </div>
  )
}

// 다중 파라미터
// 라우트: /hotel/:hotelId/room/:roomId
// URL: /hotel/hotel-123/room/room-456
function RoomDetailPage() {
  const { hotelId, roomId } = useParams<{
    hotelId: string
    roomId: string
  }>()

  return <div>호텔 {hotelId}의 객실 {roomId}</div>
}
```

**쿼리스트링 (useSearchParams):**

```typescript
import { useSearchParams } from 'react-router-dom'

// URL 예시: /hotels?filter=popular&sort=price&page=2
function HotelListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // 쿼리 파라미터 읽기
  const filter = searchParams.get('filter')  // "popular"
  const sort = searchParams.get('sort')      // "price"
  const page = searchParams.get('page')      // "2"

  // 쿼리 파라미터 업데이트 (개별)
  const updateFilter = (newFilter: string) => {
    searchParams.set('filter', newFilter)
    setSearchParams(searchParams)
  }

  // 쿼리 파라미터 업데이트 (전체)
  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value)
    })
    setSearchParams(newParams)
  }

  // 쿼리 파라미터 삭제
  const clearFilter = () => {
    searchParams.delete('filter')
    setSearchParams(searchParams)
  }

  return (
    <div>
      <button onClick={() => updateFilter('popular')}>
        인기순
      </button>
      <button onClick={() => updateParams({ sort: 'price', filter: 'budget' })}>
        저가순
      </button>
      <button onClick={clearFilter}>
        필터 초기화
      </button>

      {/* 현재 URL: /hotels?filter=popular&sort=price */}
      <div>현재 필터: {filter}</div>
      <div>현재 정렬: {sort}</div>
    </div>
  )
}
```

**실전 패턴: 쿼리스트링으로 필터 관리**

```typescript
function HotelListPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // 쿼리스트링에서 필터 객체 생성
  const filters = {
    search: searchParams.get('search') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 1000000,
    rating: Number(searchParams.get('rating')) || 0,
  }

  // 필터 업데이트 (URL 동기화)
  const updateFilters = (updates: Partial<typeof filters>) => {
    const newParams = new URLSearchParams()

    Object.entries({ ...filters, ...updates }).forEach(([key, value]) => {
      if (value) {  // 빈 값은 제외
        newParams.set(key, String(value))
      }
    })

    setSearchParams(newParams)
  }

  // React Query와 연동
  const { data: hotels } = useHotels(filters)

  return (
    <div>
      <input
        value={filters.search}
        onChange={e => updateFilters({ search: e.target.value })}
        placeholder="호텔 검색..."
      />
      <input
        type="range"
        min={0}
        max={1000000}
        value={filters.maxPrice}
        onChange={e => updateFilters({ maxPrice: Number(e.target.value) })}
      />

      {/* URL이 /hotels?search=서울&maxPrice=200000 처럼 업데이트됨 */}
      {/* 새로고침해도 필터 유지! */}
    </div>
  )
}
```

### 10.4 Protected Route (인증 라우트) 패턴

**기본 Protected Route:**

```typescript
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const location = useLocation()

  // 로딩 중
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
        <p>인증 확인 중...</p>
      </div>
    )
  }

  // 미인증 사용자 → 로그인 페이지로 리다이렉트
  if (!user) {
    // 로그인 후 원래 페이지로 돌아가기 위해 state로 경로 전달
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  // 인증된 사용자 → 컴포넌트 렌더링
  return <>{children}</>
}
```

**로그인 후 원래 페이지로 복귀:**

```typescript
function SigninPage() {
  const navigate = useNavigate()
  const location = useLocation()

  // Protected Route에서 전달한 원래 경로
  const from = location.state?.from?.pathname || '/'

  const handleSignin = async (email: string, password: string) => {
    await signIn(email, password)

    // 로그인 성공 → 원래 가려던 페이지로 이동
    navigate(from, { replace: true })
  }

  return <div>로그인 폼...</div>
}
```

**역할 기반 Protected Route:**

```typescript
function RoleProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles: ('admin' | 'user')[]
}) {
  const { user, loading } = useUser()

  if (loading) return <div>로딩 중...</div>

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  // 역할 확인
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

// 사용
function App() {
  return (
    <Routes>
      {/* 일반 사용자 전용 */}
      <Route
        path="/my"
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />

      {/* 관리자 전용 */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminPage />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  )
}
```

### 10.5 중첩 라우트 (Nested Routes)

```typescript
function App() {
  return (
    <Routes>
      {/* 레이아웃을 포함한 중첩 라우트 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />  {/* / */}
        <Route path="hotels" element={<HotelListPage />} />  {/* /hotels */}
        <Route path="hotel/:id" element={<HotelDetailPage />} />  {/* /hotel/123 */}
      </Route>

      {/* 마이페이지 중첩 라우트 */}
      <Route path="/my" element={<MyPageLayout />}>
        <Route index element={<MyOverview />} />  {/* /my */}
        <Route path="reservations" element={<MyReservations />} />  {/* /my/reservations */}
        <Route path="likes" element={<MyLikes />} />  {/* /my/likes */}
        <Route path="reviews" element={<MyReviews />} />  {/* /my/reviews */}
      </Route>
    </Routes>
  )
}

// Layout 컴포넌트
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />  {/* 자식 라우트가 렌더링되는 위치 */}
      <Footer />
    </div>
  )
}

function MyPageLayout() {
  return (
    <div className="my-page">
      <aside>
        <NavLink to="/my">개요</NavLink>
        <NavLink to="/my/reservations">예약 내역</NavLink>
        <NavLink to="/my/likes">찜 목록</NavLink>
        <NavLink to="/my/reviews">리뷰 관리</NavLink>
      </aside>
      <main>
        <Outlet />  {/* 중첩된 라우트 렌더링 */}
      </main>
    </div>
  )
}
```

---

## Chapter 11: 데이터 페칭과 React Query

### 왜 React Query가 필요할까?

**전통적인 데이터 페칭의 문제점:**

```typescript
// ❌ useState + useEffect로 데이터 페칭
function HotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/hotels')
      .then(res => res.json())
      .then(setHotels)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [])

  // 문제점:
  // 1. 보일러플레이트 코드 많음
  // 2. 캐싱 없음 (매번 새로 요청)
  // 3. 백그라운드 재검증 없음
  // 4. 중복 요청 방지 없음
  // 5. 에러 재시도 로직 없음
  // 6. 로딩/에러 상태 수동 관리
}
```

**React Query의 해결책:**

```typescript
// ✅ React Query로 간단하게
function HotelList() {
  const { data: hotels, isLoading, error } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels,
  })

  // 자동으로 제공:
  // ✅ 캐싱 (동일한 데이터 재요청 안 함)
  // ✅ 백그라운드 재검증 (자동 업데이트)
  // ✅ 중복 요청 제거
  // ✅ 자동 재시도
  // ✅ 로딩/에러 상태 자동 관리
  // ✅ DevTools 지원
}
```

### 11.1 React Query (TanStack Query) 핵심 개념

**TanStack Query**는 서버 상태 관리를 위한 강력한 라이브러리입니다.

**클라이언트 상태 vs 서버 상태:**

| 구분 | 클라이언트 상태 | 서버 상태 |
|------|----------------|-----------|
| **위치** | 브라우저 메모리 | 서버 데이터베이스 |
| **관리** | useState, zustand | React Query |
| **예시** | UI 토글, 폼 입력 | API 데이터 |
| **특징** | 동기적, 즉시 변경 | 비동기적, 캐싱 필요 |
| **소유권** | 프론트엔드 | 백엔드 (진실의 원천) |

**React Query의 핵심 기능:**

1. **자동 캐싱** - 동일한 데이터 재요청 방지
2. **백그라운드 재검증** - 데이터 최신 상태 유지
3. **중복 요청 제거** - 동시 요청 통합
4. **자동 재시도** - 실패 시 재시도
5. **Optimistic Update** - 낙관적 UI 업데이트
6. **무한 스크롤** - useInfiniteQuery
7. **DevTools** - 캐시 상태 시각화

### 11.2 QueryClient 설정 및 주요 옵션

**설치:**
```bash
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools  # DevTools (선택)
```

**기본 설정:**

```typescript
// src/index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 쿼리 옵션
      retry: 1,  // 실패 시 재시도 횟수 (기본: 3)
      refetchOnWindowFocus: false,  // 창 포커스 시 재검증 (기본: true)
      refetchOnReconnect: true,  // 네트워크 재연결 시 재검증
      staleTime: 1000 * 60 * 5,  // 5분간 데이터를 신선(fresh)하게 유지
      gcTime: 1000 * 60 * 10,  // 10분간 캐시 유지 (이전 cacheTime)
    },
    mutations: {
      // 뮤테이션 옵션
      retry: 0,  // 뮤테이션은 재시도하지 않음 (기본: 0)
    },
  },
})

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    {/* DevTools: 개발 환경에서만 표시 */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
```

**주요 옵션 설명:**

```typescript
// staleTime vs gcTime (cacheTime)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,  // 30초
      // staleTime: 데이터가 '신선(fresh)'한 시간
      // - 이 시간 내에는 재요청하지 않음
      // - 0 (기본값): 즉시 stale 상태로 전환

      gcTime: 1000 * 60 * 5,  // 5분
      // gcTime: 캐시에 데이터를 보관하는 시간
      // - 이 시간이 지나면 가비지 컬렉션으로 제거
      // - Infinity: 영구 보관
    },
  },
})

// 시간 흐름:
// 1. 데이터 페칭 → fresh 상태 (staleTime 동안)
// 2. staleTime 경과 → stale 상태 (재검증 필요)
// 3. 컴포넌트 언마운트 → inactive 상태
// 4. gcTime 경과 → 캐시에서 제거
```

**실전 설정 예시:**

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 개발 환경에 맞는 설정
      retry: process.env.NODE_ENV === 'production' ? 3 : 0,
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',

      // 데이터 특성에 따라
      staleTime: 1000 * 30,  // 30초 (자주 변경되는 데이터)
      // staleTime: 1000 * 60 * 5,  // 5분 (가끔 변경되는 데이터)
      // staleTime: Infinity,  // 변경 안 되는 데이터 (정적 데이터)

      // 에러 처리
      onError: (error) => {
        console.error('Query Error:', error)
        // 전역 에러 처리 (예: Toast 알림)
      },
    },
  },
})
```

### 11.3 useQuery - 데이터 조회의 모든 것

**기본 사용법:**

```typescript
// src/hooks/useHotels.ts
import { useQuery } from '@tanstack/react-query'
import { getHotels } from '@remote/hotel'

function useHotels() {
  return useQuery({
    queryKey: ['hotels'],  // 고유 캐시 키
    queryFn: getHotels,    // 데이터 페칭 함수
  })
}

// 사용
function HotelListPage() {
  const { data, isLoading, error, refetch } = useHotels()

  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage error={error} />

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

**useQuery 반환값 완전 정리:**

```typescript
const {
  // 데이터
  data,              // 성공 시 데이터
  error,             // 에러 객체 (Error 타입)

  // 상태 플래그
  isLoading,         // 최초 로딩 중 (data 없음 + fetching 중)
  isFetching,        // 페칭 중 (백그라운드 페칭 포함)
  isError,           // 에러 발생
  isSuccess,         // 성공
  isPending,         // 대기 중 (최초 로딩 + enabled: false)

  // 상태 조합
  status,            // 'pending' | 'error' | 'success'
  fetchStatus,       // 'fetching' | 'paused' | 'idle'

  // 유틸리티
  refetch,           // 수동 재요청
  dataUpdatedAt,     // 데이터 업데이트 시간
  errorUpdatedAt,    // 에러 업데이트 시간
} = useQuery({ queryKey, queryFn })

// isLoading vs isFetching 차이:
// isLoading = !data && isFetching  // 데이터 없고 + 페칭 중
// isFetching = 페칭 중 (데이터 있어도 백그라운드 페칭)

// 사용 예시:
if (isLoading) return <Spinner />  // 최초 로딩
if (isFetching) return <BackgroundSpinner />  // 백그라운드 새로고침
```

**파라미터가 있는 쿼리:**

```typescript
// 단일 파라미터
function useHotel(hotelId: string) {
  return useQuery({
    queryKey: ['hotel', hotelId],  // 파라미터를 키에 포함
    queryFn: () => getHotel(hotelId),
    enabled: !!hotelId,  // hotelId가 있을 때만 실행
  })
}

// 여러 파라미터
function useHotels(filters: {
  search: string
  minPrice: number
  maxPrice: number
}) {
  return useQuery({
    queryKey: ['hotels', filters],  // 객체 전체를 키에 포함
    queryFn: () => getHotels(filters),
  })
}

// 사용
function HotelListPage() {
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(1000000)

  const { data: hotels } = useHotels({
    search,
    minPrice: 0,
    maxPrice,
  })
  // search나 maxPrice가 변경되면 자동으로 새 요청!
}
```

**조건부 쿼리 (enabled):**

```typescript
// 예시 1: 사용자 로그인 후에만 데이터 로드
function MyReservations() {
  const { user } = useUser()

  const { data: reservations } = useQuery({
    queryKey: ['reservations', user?.uid],
    queryFn: () => getReservations(user!.uid),
    enabled: !!user,  // 로그인했을 때만 실행
  })

  if (!user) return <div>로그인이 필요합니다</div>

  return <div>{/* 예약 목록 */}</div>
}

// 예시 2: 의존적 쿼리 (sequential queries)
function HotelWithReviews({ hotelId }: { hotelId: string }) {
  // 1단계: 호텔 정보 가져오기
  const { data: hotel } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getHotel(hotelId),
  })

  // 2단계: 호텔 정보 로드 후 리뷰 가져오기
  const { data: reviews } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews(hotelId),
    enabled: !!hotel,  // 호텔 정보가 있을 때만 실행
  })

  return <div>{/* 호텔 + 리뷰 */}</div>
}
```

**쿼리 옵션 활용:**

```typescript
function useHotelWithOptions(hotelId: string) {
  return useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getHotel(hotelId),

    // 캐싱 옵션
    staleTime: 1000 * 60 * 5,  // 5분간 fresh 유지
    gcTime: 1000 * 60 * 10,    // 10분간 캐시 보관

    // 재시도 옵션
    retry: 3,  // 3번 재시도
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    // 재시도 간격: 1초, 2초, 4초, 8초... (최대 30초)

    // 재검증 옵션
    refetchOnWindowFocus: true,  // 창 포커스 시 재검증
    refetchOnReconnect: true,    // 재연결 시 재검증
    refetchInterval: 1000 * 30,  // 30초마다 자동 재검증 (폴링)

    // 콜백
    onSuccess: (data) => {
      console.log('데이터 로드 성공:', data)
    },
    onError: (error) => {
      console.error('에러 발생:', error)
    },

    // 데이터 변환
    select: (data) => {
      // 응답 데이터 변환
      return {
        ...data,
        formattedPrice: `${data.price.toLocaleString()}원`,
      }
    },
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

### 왜 React Hook Form이 필요할까?

**전통적인 제어 컴포넌트의 문제점:**

```typescript
// ❌ useState로 폼 관리: 입력마다 리렌더링 발생!
function TraditionalForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  // ... 10개 필드 = 10개 state

  // 문제점:
  // 1. 각 입력마다 컴포넌트 리렌더링 (성능 저하)
  // 2. 보일러플레이트 코드 많음
  // 3. Validation 로직 복잡
  // 4. 에러 상태 수동 관리

  return (
    <form>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}  // 리렌더링!
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}  // 리렌더링!
      />
      {/* 매 입력마다 전체 컴포넌트 리렌더링! */}
    </form>
  )
}
```

**React Hook Form의 해결책:**

```typescript
// ✅ React Hook Form: 비제어 컴포넌트 방식
function ModernForm() {
  const { register, handleSubmit } = useForm()

  // 장점:
  // ✅ 입력 중에는 리렌더링 안 함 (성능 향상)
  // ✅ 간결한 코드
  // ✅ 내장 Validation
  // ✅ 자동 에러 관리

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <input {...register('password')} />
      {/* 입력 중에도 리렌더링 없음! */}
    </form>
  )
}
```

### 12.1 React Hook Form 핵심 개념

**설치:**
```bash
npm install react-hook-form
```

**제어 vs 비제어 컴포넌트:**

| 특징 | 제어 컴포넌트 (useState) | 비제어 컴포넌트 (React Hook Form) |
|------|------------------------|--------------------------------|
| **값 저장** | React state | DOM (ref) |
| **입력 시 리렌더링** | ✅ 발생 | ❌ 없음 |
| **성능** | 느림 (많은 필드 시) | 빠름 |
| **코드량** | 많음 | 적음 |
| **실시간 Validation** | 쉬움 | 가능 |
| **사용 사례** | 실시간 피드백 필요 | 일반적인 폼 |

**핵심 특징:**
- ✅ 최소한의 리렌더링 (비제어 컴포넌트 방식)
- ✅ 간단한 Validation (내장 규칙 + 커스텀)
- ✅ TypeScript 완벽 지원
- ✅ 작은 번들 사이즈 (~8.6KB)
- ✅ React DevTools 통합

### 12.2 기본 사용법

**useForm의 주요 반환 값:**

| 반환 값 | 설명 | 사용 시기 |
|---------|------|-----------|
| `register` | input에 연결하는 함수 | 모든 필드에 필수 |
| `handleSubmit` | 제출 핸들러 래퍼 | form onSubmit에 사용 |
| `formState` | 폼 상태 객체 | errors, isSubmitting 등 |
| `watch` | 필드 값 관찰 | 실시간 값 필요 시 |
| `setValue` | 값 수동 설정 | 프로그래밍 방식 변경 |
| `reset` | 폼 초기화 | 제출 후 초기화 |
| `getValues` | 현재 값 가져오기 | 제출 외 값 필요 시 |

#### 12.2.1 기본 회원가입 폼

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

**실행 흐름:**

```
1. 사용자가 폼 작성
   ↓ (입력 중에는 리렌더링 없음!)
2. 제출 버튼 클릭
   ↓
3. handleSubmit이 validation 실행
   ↓
   [성공] → onSubmit 실행
   [실패] → errors에 에러 저장, 리렌더링
   ↓
4. onSubmit에서 API 호출
   ↓
5. isSubmitting = true (버튼 비활성화)
   ↓
6. API 응답 후 isSubmitting = false
```

#### 12.2.2 register()가 반환하는 것

```typescript
// register('email')이 반환하는 객체:
{
  name: 'email',
  ref: (element) => { /* DOM ref 저장 */ },
  onChange: (event) => { /* 값 업데이트 */ },
  onBlur: (event) => { /* validation 실행 */ },
}

// {...register('email')}는 위 모든 props를 input에 전달
<input {...register('email')} />

// 이는 다음과 동일:
<input
  name="email"
  ref={registerRef}
  onChange={handleChange}
  onBlur={handleBlur}
/>
```

### 12.3 Validation 규칙

**내장 Validation 규칙:**

| 규칙 | 설명 | 예시 |
|------|------|------|
| `required` | 필수 입력 | `required: '필수 항목입니다'` |
| `minLength` | 최소 길이 | `minLength: { value: 5, message: '5자 이상' }` |
| `maxLength` | 최대 길이 | `maxLength: { value: 20, message: '20자 이하' }` |
| `min` | 최소 값 (숫자) | `min: { value: 18, message: '18세 이상' }` |
| `max` | 최대 값 (숫자) | `max: { value: 100, message: '100 이하' }` |
| `pattern` | 정규식 | `pattern: { value: /^[0-9]+$/, message: '숫자만' }` |
| `validate` | 커스텀 검증 | `validate: (value) => value !== 'admin'` |

#### 12.3.1 기본 Validation

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

#### 12.3.2 실전 예제: 호텔 예약 폼 Validation

```typescript
interface ReservationFormData {
  checkIn: string
  checkOut: string
  guests: number
  specialRequest?: string
}

function ReservationForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ReservationFormData>()

  // 체크인 날짜를 관찰 (체크아웃 검증에 사용)
  const checkInDate = watch('checkIn')

  const onSubmit = (data: ReservationFormData) => {
    console.log('예약 정보:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 체크인 날짜: 오늘 이후만 선택 가능 */}
      <input
        type="date"
        {...register('checkIn', {
          required: '체크인 날짜를 선택해주세요',
          validate: (value) => {
            const selectedDate = new Date(value)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return selectedDate >= today || '오늘 이후 날짜를 선택해주세요'
          },
        })}
      />
      {errors.checkIn && <span>{errors.checkIn.message}</span>}

      {/* 체크아웃 날짜: 체크인보다 나중 */}
      <input
        type="date"
        {...register('checkOut', {
          required: '체크아웃 날짜를 선택해주세요',
          validate: (value) => {
            if (!checkInDate) return true
            return new Date(value) > new Date(checkInDate) ||
                   '체크아웃은 체크인보다 나중이어야 합니다'
          },
        })}
      />
      {errors.checkOut && <span>{errors.checkOut.message}</span>}

      {/* 투숙객 수: 1~10명 */}
      <input
        type="number"
        {...register('guests', {
          required: '투숙객 수를 입력해주세요',
          min: { value: 1, message: '최소 1명 이상' },
          max: { value: 10, message: '최대 10명까지' },
          valueAsNumber: true,  // 문자열이 아닌 숫자로 변환!
        })}
      />
      {errors.guests && <span>{errors.guests.message}</span>}

      {/* 특별 요청사항: 선택적, 최대 200자 */}
      <textarea
        {...register('specialRequest', {
          maxLength: { value: 200, message: '200자 이하로 입력해주세요' },
        })}
        placeholder="특별한 요청사항이 있으신가요?"
      />
      {errors.specialRequest && <span>{errors.specialRequest.message}</span>}

      <button type="submit">예약하기</button>
    </form>
  )
}
```

#### 12.3.3 복잡한 Validation: 비밀번호 확인

```typescript
function SignupForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  // password 필드를 관찰
  const password = watch('password')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="password"
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 8, message: '8자 이상' },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message: '영문 대소문자, 숫자, 특수문자를 포함해야 합니다',
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="password"
        {...register('passwordConfirm', {
          required: '비밀번호 확인을 입력해주세요',
          validate: (value) =>
            value === password || '비밀번호가 일치하지 않습니다',
        })}
      />
      {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
    </form>
  )
}
```

#### 12.3.4 여러 조건의 Custom Validation

```typescript
register('username', {
  validate: {
    // 여러 검증 규칙을 객체로 정의
    noSpaces: (value) => !/\s/.test(value) || '공백을 포함할 수 없습니다',
    noSpecialChars: (value) =>
      /^[a-zA-Z0-9_]+$/.test(value) || '영문, 숫자, 언더스코어만 가능합니다',
    notReserved: (value) =>
      !['admin', 'root', 'system'].includes(value) || '예약어는 사용할 수 없습니다',
    checkDuplicate: async (value) => {
      // 비동기 검증도 가능!
      const isDuplicate = await checkUsername(value)
      return !isDuplicate || '이미 사용 중인 아이디입니다'
    },
  },
})
```

**⚠️ 안티패턴:**

```typescript
// ❌ 나쁜 예: 에러 메시지 없음
register('email', {
  required: true,  // 'true'만 전달 → 기본 에러 메시지
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
})

// ✅ 좋은 예: 명확한 에러 메시지
register('email', {
  required: '이메일을 입력해주세요',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: '올바른 이메일 형식이 아닙니다',
  },
})
```

```typescript
// ❌ 나쁜 예: validate에서 에러 throw
register('age', {
  validate: (value) => {
    if (value < 18) {
      throw new Error('18세 이상만 가능')  // throw하지 말 것!
    }
  },
})

// ✅ 좋은 예: 에러 문자열 또는 true 반환
register('age', {
  validate: (value) => {
    return value >= 18 || '18세 이상만 가능합니다'
  },
})
```

### 12.4 watch - 필드 값 관찰

**watch()를 언제 사용하나?**

입력 중인 값을 실시간으로 확인하거나, 한 필드가 다른 필드에 영향을 줄 때 사용합니다.

**⚠️ 주의:** watch()를 사용하면 해당 필드가 변경될 때마다 **리렌더링**이 발생합니다!

**watch() 사용법:**

| 방법 | 설명 | 리렌더링 |
|------|------|----------|
| `watch('fieldName')` | 특정 필드 하나 관찰 | 해당 필드 변경 시 |
| `watch(['field1', 'field2'])` | 여러 필드 관찰 | 해당 필드들 변경 시 |
| `watch()` | 모든 필드 관찰 | 모든 필드 변경 시 |
| `watch('field', defaultValue)` | 기본값 지정 | 해당 필드 변경 시 |

#### 12.4.1 기본 사용법

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

#### 12.4.2 실전 예제: 가격 계산기

```typescript
interface PricingFormData {
  roomType: 'standard' | 'deluxe' | 'suite'
  nights: number
  guests: number
  breakfast: boolean
}

function PricingCalculator() {
  const { register, watch } = useForm<PricingFormData>({
    defaultValues: {
      roomType: 'standard',
      nights: 1,
      guests: 1,
      breakfast: false,
    },
  })

  // 모든 필드를 관찰하여 실시간 가격 계산
  const formData = watch()

  // 가격 계산 로직
  const totalPrice = useMemo(() => {
    const roomPrices = {
      standard: 100000,
      deluxe: 150000,
      suite: 250000,
    }

    const basePrice = roomPrices[formData.roomType] * formData.nights
    const guestFee = formData.guests > 2 ? (formData.guests - 2) * 20000 * formData.nights : 0
    const breakfastFee = formData.breakfast ? formData.guests * 15000 * formData.nights : 0

    return basePrice + guestFee + breakfastFee
  }, [formData])

  return (
    <form>
      <select {...register('roomType')}>
        <option value="standard">스탠다드 (10만원)</option>
        <option value="deluxe">디럭스 (15만원)</option>
        <option value="suite">스위트 (25만원)</option>
      </select>

      <input type="number" {...register('nights', { valueAsNumber: true })} min="1" />
      <input type="number" {...register('guests', { valueAsNumber: true })} min="1" />

      <label>
        <input type="checkbox" {...register('breakfast')} />
        조식 포함 (1인 1.5만원)
      </label>

      {/* 실시간 가격 표시 */}
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        총 금액: {totalPrice.toLocaleString()}원
      </div>

      <div style={{ fontSize: '14px', color: 'gray' }}>
        <div>객실 요금: {roomPrices[formData.roomType] * formData.nights}원</div>
        {formData.guests > 2 && (
          <div>추가 인원 요금: {(formData.guests - 2) * 20000 * formData.nights}원</div>
        )}
        {formData.breakfast && (
          <div>조식 요금: {formData.guests * 15000 * formData.nights}원</div>
        )}
      </div>
    </form>
  )
}
```

**실행 흐름:**

```
1. 사용자가 "roomType" 선택 변경
   ↓
2. watch()가 변경 감지
   ↓
3. 컴포넌트 리렌더링
   ↓
4. useMemo가 totalPrice 재계산
   ↓
5. 화면에 새 가격 표시
```

#### 12.4.3 조건부 필드 표시

```typescript
function DynamicForm() {
  const { register, watch } = useForm()

  // "hasCompanion" 필드를 관찰
  const hasCompanion = watch('hasCompanion')
  const paymentMethod = watch('paymentMethod')

  return (
    <form>
      <label>
        <input type="checkbox" {...register('hasCompanion')} />
        동반자가 있습니까?
      </label>

      {/* hasCompanion이 true일 때만 표시 */}
      {hasCompanion && (
        <div>
          <input {...register('companionName')} placeholder="동반자 이름" />
          <input {...register('companionPhone')} placeholder="동반자 연락처" />
        </div>
      )}

      <select {...register('paymentMethod')}>
        <option value="card">신용카드</option>
        <option value="transfer">계좌이체</option>
        <option value="mobile">간편결제</option>
      </select>

      {/* 계좌이체 선택 시 계좌 정보 입력 */}
      {paymentMethod === 'transfer' && (
        <div>
          <input {...register('bankName')} placeholder="은행명" />
          <input {...register('accountNumber')} placeholder="계좌번호" />
        </div>
      )}

      {/* 간편결제 선택 시 전화번호 입력 */}
      {paymentMethod === 'mobile' && (
        <input {...register('phoneNumber')} placeholder="전화번호" />
      )}
    </form>
  )
}
```

#### 12.4.4 watch vs getValues 비교

```typescript
function ComparisonExample() {
  const { register, watch, getValues } = useForm()

  // ✅ watch: 값이 변경되면 리렌더링
  const email = watch('email')

  const handleClick = () => {
    // ✅ getValues: 현재 값만 가져오기 (리렌더링 없음)
    const currentEmail = getValues('email')
    console.log('현재 이메일:', currentEmail)
  }

  return (
    <form>
      <input {...register('email')} />

      {/* watch 사용: 입력할 때마다 실시간 표시 */}
      <div>입력한 이메일: {email}</div>

      {/* getValues 사용: 버튼 클릭 시에만 확인 */}
      <button type="button" onClick={handleClick}>
        현재 값 확인
      </button>
    </form>
  )
}
```

**watch vs getValues 선택 기준:**

| 상황 | 사용할 것 | 이유 |
|------|----------|------|
| 실시간으로 값 표시 필요 | `watch()` | 리렌더링으로 화면 업데이트 |
| 계산된 값 표시 (가격 등) | `watch()` | 값 변경 시 재계산 필요 |
| 버튼 클릭 시에만 값 필요 | `getValues()` | 불필요한 리렌더링 방지 |
| 제출 핸들러에서만 사용 | `handleSubmit()` | 제출 시 자동으로 값 전달 |

**⚠️ 안티패턴:**

```typescript
// ❌ 나쁜 예: 모든 필드를 watch로 관찰 (성능 저하)
function BadForm() {
  const formData = watch()  // 모든 필드 변경 시 리렌더링!

  // 실제로는 email만 필요한데...
  return <div>{formData.email}</div>
}

// ✅ 좋은 예: 필요한 필드만 watch
function GoodForm() {
  const email = watch('email')  // email 변경 시에만 리렌더링

  return <div>{email}</div>
}
```

```typescript
// ❌ 나쁜 예: 제출 핸들러에서 watch 사용
function BadForm() {
  const email = watch('email')  // 불필요한 리렌더링!

  const onSubmit = () => {
    console.log(email)  // 제출 시에만 필요한데 watch 사용
  }

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>
}

// ✅ 좋은 예: handleSubmit이 자동으로 값 전달
function GoodForm() {
  const onSubmit = (data: FormData) => {
    console.log(data.email)  // handleSubmit이 알아서 값 전달
  }

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>
}
```

### 12.5 Custom Hook과 통합

**왜 Custom Hook으로 만드나?**

폼 로직(validation, 제출, 에러 처리)을 재사용 가능하게 만들고, 컴포넌트를 깔끔하게 유지하기 위해서입니다.

#### 12.5.1 기본 패턴: useReservationForm

**파일: `src/hooks/useReservationForm.ts`**

```typescript
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createReservation } from '@remote/reservation'
import { useUser } from '@hooks/useUser'

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

**사용:**

```typescript
// 컴포넌트가 매우 깔끔해짐!
function ReservationPage() {
  const { register, onSubmit, isPending, formState: { errors } } = useReservationForm()

  return (
    <form onSubmit={onSubmit}>
      <input {...register('checkIn', { required: '체크인 날짜 필요' })} type="date" />
      {errors.checkIn && <span>{errors.checkIn.message}</span>}

      <input {...register('checkOut', { required: '체크아웃 날짜 필요' })} type="date" />
      {errors.checkOut && <span>{errors.checkOut.message}</span>}

      <button type="submit" disabled={isPending}>
        {isPending ? '예약 중...' : '예약하기'}
      </button>
    </form>
  )
}
```

#### 12.5.2 고급 패턴: 서버 에러를 폼 에러로 표시

```typescript
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

interface SignupFormData {
  email: string
  password: string
  name: string
}

function useSignupForm() {
  const form = useForm<SignupFormData>()
  const { setError } = form

  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      alert('회원가입 완료!')
    },
    onError: (error: any) => {
      // 서버 에러를 폼 에러로 변환!
      if (error.code === 'EMAIL_ALREADY_EXISTS') {
        setError('email', {
          type: 'server',
          message: '이미 사용 중인 이메일입니다',
        })
      } else if (error.code === 'WEAK_PASSWORD') {
        setError('password', {
          type: 'server',
          message: '비밀번호가 너무 약합니다',
        })
      } else {
        setError('root', {
          type: 'server',
          message: '회원가입에 실패했습니다',
        })
      }
    },
  })

  const onSubmit = (data: SignupFormData) => {
    mutate(data)
  }

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  }
}
```

**사용:**

```typescript
function SignupPage() {
  const { register, onSubmit, formState: { errors }, isPending } = useSignupForm()

  return (
    <form onSubmit={onSubmit}>
      <input {...register('email')} />
      {/* 클라이언트 + 서버 에러 모두 표시 */}
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      {/* root 에러 (전체 폼 에러) */}
      {errors.root && <div className="error">{errors.root.message}</div>}

      <button type="submit" disabled={isPending}>회원가입</button>
    </form>
  )
}
```

#### 12.5.3 여러 페이지에서 재사용 가능한 폼 Hook

```typescript
// src/hooks/useContactForm.ts
interface ContactFormData {
  name: string
  email: string
  message: string
}

interface UseContactFormOptions {
  onSuccess?: () => void
  successMessage?: string
}

function useContactForm(options?: UseContactFormOptions) {
  const form = useForm<ContactFormData>()

  const { mutate, isPending } = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      alert(options?.successMessage || '메시지가 전송되었습니다!')
      form.reset()  // 폼 초기화
      options?.onSuccess?.()
    },
  })

  return {
    ...form,
    onSubmit: form.handleSubmit((data) => mutate(data)),
    isPending,
  }
}

// 여러 곳에서 재사용
function ContactPage() {
  const { register, onSubmit, isPending } = useContactForm({
    successMessage: '문의가 접수되었습니다!',
    onSuccess: () => navigate('/'),
  })

  return <form onSubmit={onSubmit}>...</form>
}

function HotelInquiryModal({ hotelId }: { hotelId: string }) {
  const { register, onSubmit, isPending } = useContactForm({
    successMessage: '호텔 문의가 접수되었습니다!',
    onSuccess: () => closeModal(),
  })

  return <form onSubmit={onSubmit}>...</form>
}
```

### 12.6 forwardRef와 함께 사용

**왜 forwardRef가 필요한가?**

재사용 가능한 input 컴포넌트를 만들 때, React Hook Form이 내부 `<input>`에 접근하려면 `forwardRef`로 ref를 전달해야 합니다.

#### 12.6.1 기본 TextField 컴포넌트

**파일: `src/components/shared/TextField.tsx`**

```typescript
import { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TextFieldProps {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
  type?: 'text' | 'email' | 'password' | 'number'
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, registration, type = 'text', ...props }, ref) => {
    return (
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          {...registration}
          {...props}
          style={{
            width: '100%',
            padding: '8px',
            border: error ? '1px solid red' : '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        {error && <span style={{ color: 'red', fontSize: '14px' }}>{error}</span>}
      </div>
    )
  }
)

TextField.displayName = 'TextField'  // DevTools에서 컴포넌트 이름 표시

export default TextField
```

**사용:**

```typescript
function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="이메일"
        type="email"
        error={errors.email?.message}
        registration={register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '올바른 이메일 형식이 아닙니다',
          },
        })}
      />

      <TextField
        label="비밀번호"
        type="password"
        error={errors.password?.message}
        registration={register('password', {
          required: '비밀번호를 입력해주세요',
          minLength: { value: 8, message: '8자 이상' },
        })}
      />

      <button type="submit">회원가입</button>
    </form>
  )
}
```

#### 12.6.2 더 나은 패턴: Controller 사용

**복잡한 UI 라이브러리(MUI, Ant Design 등)와 통합할 때는 `Controller`를 사용하세요:**

```typescript
import { Controller, useForm } from 'react-hook-form'
import { TextField as MuiTextField } from '@mui/material'

function AdvancedForm() {
  const { control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register 대신 Controller 사용 */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: '이메일을 입력해주세요',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '올바른 이메일 형식이 아닙니다',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <MuiTextField
            {...field}
            label="이메일"
            error={!!error}
            helperText={error?.message}
            fullWidth
          />
        )}
      />

      <button type="submit">제출</button>
    </form>
  )
}
```

**register vs Controller:**

| 상황 | 사용할 것 | 이유 |
|------|----------|------|
| 기본 HTML input | `register` | 간단하고 빠름 |
| 커스텀 input (직접 제작) | `register + forwardRef` | 단순한 통합 |
| 외부 UI 라이브러리 (MUI, Ant Design) | `Controller` | 복잡한 props 관리 |
| 특수한 제어 로직 필요 | `Controller` | onChange, onBlur 커스터마이징 |

#### 12.6.3 실전 예제: DatePicker 통합

```typescript
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function ReservationForm() {
  const { control, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="checkIn"
        control={control}
        rules={{ required: '체크인 날짜를 선택해주세요' }}
        render={({ field }) => (
          <div>
            <label>체크인 날짜</label>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="날짜 선택"
            />
            {errors.checkIn && <span>{errors.checkIn.message}</span>}
          </div>
        )}
      />

      <button type="submit">예약하기</button>
    </form>
  )
}
```

### 12.7 복잡한 폼 관리 - useFieldArray

**useFieldArray를 언제 사용하나?**

동적으로 필드를 추가/제거/재정렬해야 할 때 사용합니다. 예: 여러 명의 게스트 정보, 쇼핑 카트 항목, 할 일 목록 등.

#### 12.7.1 기본 사용법

```typescript
import { useForm, useFieldArray } from 'react-hook-form'

interface GuestFormData {
  guests: Array<{
    name: string
    age: number
  }>
}

function GuestForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<GuestFormData>({
    defaultValues: {
      guests: [{ name: '', age: 0 }],  // 최소 1명으로 시작
    },
  })

  // useFieldArray: 동적 필드 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guests',
  })

  const onSubmit = (data: GuestFormData) => {
    console.log('게스트 정보:', data.guests)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '8px' }}>
          <h3>게스트 {index + 1}</h3>

          <input
            {...register(`guests.${index}.name`, {
              required: '이름을 입력해주세요',
            })}
            placeholder="게스트 이름"
          />
          {errors.guests?.[index]?.name && (
            <span>{errors.guests[index].name.message}</span>
          )}

          <input
            type="number"
            {...register(`guests.${index}.age`, {
              required: '나이를 입력해주세요',
              min: { value: 1, message: '1세 이상' },
              valueAsNumber: true,
            })}
            placeholder="나이"
          />
          {errors.guests?.[index]?.age && (
            <span>{errors.guests[index].age.message}</span>
          )}

          {/* 삭제 버튼 (최소 1명은 유지) */}
          {fields.length > 1 && (
            <button type="button" onClick={() => remove(index)}>
              삭제
            </button>
          )}
        </div>
      ))}

      {/* 게스트 추가 버튼 */}
      <button
        type="button"
        onClick={() => append({ name: '', age: 0 })}
      >
        게스트 추가
      </button>

      <button type="submit">제출</button>
    </form>
  )
}
```

**useFieldArray 주요 메서드:**

| 메서드 | 설명 | 예시 |
|--------|------|------|
| `fields` | 현재 필드 배열 | `fields.map((field, index) => ...)` |
| `append(value)` | 배열 끝에 추가 | `append({ name: '', age: 0 })` |
| `prepend(value)` | 배열 앞에 추가 | `prepend({ name: '', age: 0 })` |
| `insert(index, value)` | 특정 위치에 삽입 | `insert(2, { name: '', age: 0 })` |
| `remove(index)` | 특정 위치 삭제 | `remove(0)` |
| `swap(indexA, indexB)` | 두 항목 위치 바꾸기 | `swap(0, 1)` |
| `move(from, to)` | 항목 이동 | `move(0, 2)` |
| `update(index, value)` | 특정 항목 업데이트 | `update(0, { name: 'John', age: 30 })` |

#### 12.7.2 실전 예제: 호텔 리뷰 작성 폼

```typescript
interface ReviewFormData {
  rating: number
  reviewText: string
  photos: Array<{
    url: string
    caption: string
  }>
}

function ReviewForm() {
  const { register, control, handleSubmit, watch } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 5,
      reviewText: '',
      photos: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'photos',
  })

  const onSubmit = (data: ReviewFormData) => {
    console.log('리뷰 데이터:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>호텔 리뷰 작성</h2>

      <label>
        평점:
        <select {...register('rating', { valueAsNumber: true })}>
          <option value={5}>⭐⭐⭐⭐⭐ 최고에요</option>
          <option value={4}>⭐⭐⭐⭐ 좋아요</option>
          <option value={3}>⭐⭐⭐ 보통이에요</option>
          <option value={2}>⭐⭐ 별로에요</option>
          <option value={1}>⭐ 최악이에요</option>
        </select>
      </label>

      <textarea
        {...register('reviewText', {
          required: '리뷰 내용을 입력해주세요',
          minLength: { value: 10, message: '10자 이상 입력해주세요' },
        })}
        placeholder="호텔에 대한 솔직한 리뷰를 남겨주세요"
        rows={5}
      />

      <h3>사진 추가 ({fields.length}장)</h3>
      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: '16px', border: '1px dashed #ccc', padding: '8px' }}>
          <input
            {...register(`photos.${index}.url`, {
              required: '사진 URL을 입력해주세요',
            })}
            placeholder="사진 URL"
          />

          <input
            {...register(`photos.${index}.caption`)}
            placeholder="사진 설명 (선택사항)"
          />

          <button type="button" onClick={() => remove(index)}>
            사진 삭제
          </button>
        </div>
      ))}

      {/* 사진은 최대 5장까지 */}
      {fields.length < 5 && (
        <button
          type="button"
          onClick={() => append({ url: '', caption: '' })}
        >
          사진 추가
        </button>
      )}

      <button type="submit">리뷰 제출</button>
    </form>
  )
}
```

#### 12.7.3 고급 패턴: 재정렬 가능한 목록

```typescript
function ReorderableGuestList() {
  const { register, control, handleSubmit } = useForm()
  const { fields, move, remove } = useFieldArray({
    control,
    name: 'guests',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          {/* 위로 이동 */}
          <button
            type="button"
            onClick={() => move(index, index - 1)}
            disabled={index === 0}
          >
            ↑
          </button>

          {/* 아래로 이동 */}
          <button
            type="button"
            onClick={() => move(index, index + 1)}
            disabled={index === fields.length - 1}
          >
            ↓
          </button>

          <input {...register(`guests.${index}.name`)} placeholder="이름" />

          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ name: '' })}>
        추가
      </button>
    </form>
  )
}
```

#### 12.7.4 중첩된 useFieldArray

```typescript
// 호텔마다 여러 객실을 추가하는 복잡한 폼
interface HotelFormData {
  hotels: Array<{
    name: string
    rooms: Array<{
      roomType: string
      price: number
    }>
  }>
}

function NestedFieldArrayForm() {
  const { register, control } = useForm<HotelFormData>()

  // 첫 번째 레벨: 호텔 목록
  const { fields: hotelFields, append: appendHotel } = useFieldArray({
    control,
    name: 'hotels',
  })

  return (
    <form>
      {hotelFields.map((hotelField, hotelIndex) => (
        <div key={hotelField.id}>
          <h3>호텔 {hotelIndex + 1}</h3>
          <input {...register(`hotels.${hotelIndex}.name`)} placeholder="호텔 이름" />

          {/* 두 번째 레벨: 각 호텔의 객실 목록 */}
          <NestedRoomFields control={control} hotelIndex={hotelIndex} />
        </div>
      ))}

      <button type="button" onClick={() => appendHotel({ name: '', rooms: [] })}>
        호텔 추가
      </button>
    </form>
  )
}

// 중첩된 필드를 별도 컴포넌트로 분리
function NestedRoomFields({ control, hotelIndex }: { control: any; hotelIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `hotels.${hotelIndex}.rooms`,
  })

  return (
    <div style={{ marginLeft: '20px' }}>
      {fields.map((roomField, roomIndex) => (
        <div key={roomField.id}>
          <input
            {...register(`hotels.${hotelIndex}.rooms.${roomIndex}.roomType`)}
            placeholder="객실 타입"
          />
          <input
            type="number"
            {...register(`hotels.${hotelIndex}.rooms.${roomIndex}.price`, {
              valueAsNumber: true,
            })}
            placeholder="가격"
          />
          <button type="button" onClick={() => remove(roomIndex)}>
            객실 삭제
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append({ roomType: '', price: 0 })}>
        객실 추가
      </button>
    </div>
  )
}
```

**⚠️ 주의사항:**

```typescript
// ❌ 나쁜 예: field.id 대신 index를 key로 사용
{fields.map((field, index) => (
  <div key={index}>  {/* 재정렬/삭제 시 버그 발생! */}
    ...
  </div>
))}

// ✅ 좋은 예: 항상 field.id를 key로 사용
{fields.map((field, index) => (
  <div key={field.id}>  {/* React가 올바르게 추적 */}
    ...
  </div>
))}
```

```typescript
// ❌ 나쁜 예: defaultValues 없이 사용
const { fields } = useFieldArray({
  control,
  name: 'guests',
  // defaultValues 없음 → 빈 배열로 시작
})

// ✅ 좋은 예: 최소 1개 항목으로 시작
const { control } = useForm({
  defaultValues: {
    guests: [{ name: '', age: 0 }],  // 기본값 제공
  },
})
```

**Best Practices:**

1. **항상 `field.id`를 key로 사용**: React가 항목을 올바르게 추적하도록 합니다
2. **최소 항목 수 제한**: `fields.length > 1 && <button onClick={remove}>` 패턴 사용
3. **최대 항목 수 제한**: `fields.length < MAX && <button onClick={append}>` 패턴 사용
4. **중첩된 배열은 컴포넌트 분리**: 코드 가독성과 유지보수성 향상
5. **validation에 index 포함**: `errors.guests?.[index]?.name` 형태로 에러 접근

---

# Part 4: 고급 주제

## Chapter 13: CSS-in-JS와 Emotion

### 13.1 Emotion이란?

**왜 CSS-in-JS가 필요한가?**

전통적인 CSS 방식의 문제점:

```typescript
// ❌ 전통적인 CSS 문제점

// 1. 전역 네임스페이스 (이름 충돌)
// styles.css
.button {
  background: blue;
}

// header.css
.button {
  background: red;  // 충돌! 나중에 로드된 것이 적용됨
}

// 2. 동적 스타일링의 어려움
<div className={`button ${isActive ? 'active' : ''} ${size === 'large' ? 'large' : ''}`}>
  {/* 복잡하고 읽기 어려움 */}
</div>

// 3. 사용하지 않는 CSS 제거 어려움
// 어떤 CSS가 어디서 사용되는지 추적 불가능

// 4. 컴포넌트와 스타일의 분리
// Button.tsx
import './Button.css'  // 의존성이 명확하지 않음
```

```typescript
// ✅ Emotion으로 해결

import styled from '@emotion/styled'

// 1. 컴포넌트 스코프 (자동으로 고유한 클래스명 생성)
const Button = styled.button`
  background: blue;
`

// 2. 동적 스타일링 쉬움
const Button = styled.button<{ isActive: boolean; size: 'small' | 'large' }>`
  background: ${props => props.isActive ? 'blue' : 'gray'};
  padding: ${props => props.size === 'large' ? '16px' : '8px'};
`

// 3. 사용하지 않는 스타일 자동 제거
// 컴포넌트가 import되지 않으면 스타일도 번들에 포함되지 않음

// 4. 컴포넌트와 스타일이 함께
// 의존성이 명확하고, 재사용 가능
```

**Emotion은 JavaScript로 CSS를 작성하는 CSS-in-JS 라이브러리입니다.**

**주요 장점:**

| 장점 | 설명 | 예시 |
|------|------|------|
| 컴포넌트 스코프 | 각 컴포넌트의 스타일이 격리됨 | `.css-abc123` 자동 생성 |
| 동적 스타일링 | Props/상태 기반 스타일 | `color: ${props => props.color}` |
| TypeScript 지원 | 타입 안전한 props | `styled.button<ButtonProps>` |
| 자동 vendor prefix | `-webkit-`, `-moz-` 자동 추가 | `display: flex` → `-webkit-box` |
| 번들 최적화 | 사용하지 않는 스타일 제거 | Tree shaking |
| 테마 시스템 | 전역 디자인 시스템 | `theme.colors.primary` |

**설치:**

```bash
yarn add @emotion/react @emotion/styled
```

### 13.2 styled 컴포넌트

**styled 문법 기본:**

```typescript
import styled from '@emotion/styled'

// 기본 HTML 요소 스타일링
const Container = styled.div`
  padding: 20px;
  background: white;
`

// 다른 컴포넌트 확장
const PrimaryButton = styled(Button)`
  background: blue;
  color: white;
`

// TypeScript props 지원
const StyledButton = styled.button<{ isActive: boolean }>`
  background: ${props => props.isActive ? 'blue' : 'gray'};
`
```

#### 13.2.1 실전 예제: Button 컴포넌트

**파일: `src/components/shared/Button.tsx`**

```typescript
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Colors, colors } from '@styles/colorPalette'

interface ButtonProps {
  color?: Colors
  size?: 'small' | 'medium' | 'large'
  full?: boolean
  disabled?: boolean
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

**사용:**

```typescript
function ReservationPage() {
  return (
    <div>
      {/* 기본 버튼 */}
      <Button>예약하기</Button>

      {/* Props로 스타일 변경 */}
      <Button color="blue" size="large" full>
        전체 너비 버튼
      </Button>

      {/* 비활성화 */}
      <Button disabled>비활성화</Button>
    </div>
  )
}
```

#### 13.2.2 고급 패턴: 조건부 스타일링

```typescript
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface CardProps {
  variant?: 'default' | 'highlighted' | 'error'
  elevation?: number
}

const Card = styled.div<CardProps>`
  padding: 20px;
  border-radius: 8px;
  background: white;

  /* variant에 따른 조건부 스타일 */
  ${({ variant = 'default' }) =>
    variant === 'highlighted' &&
    css`
      border: 2px solid #3b82f6;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
    `}

  ${({ variant }) =>
    variant === 'error' &&
    css`
      border: 2px solid #ef4444;
      background: #fef2f2;
    `}

  /* elevation으로 그림자 조절 */
  ${({ elevation = 1 }) => css`
    box-shadow: 0 ${elevation * 2}px ${elevation * 4}px rgba(0, 0, 0, ${elevation * 0.1});
  `}
`

// 사용
function HotelCard({ hotel, isRecommended }: Props) {
  return (
    <Card variant={isRecommended ? 'highlighted' : 'default'} elevation={2}>
      <h3>{hotel.name}</h3>
      <p>{hotel.description}</p>
    </Card>
  )
}
```

#### 13.2.3 Nesting (중첩) - Sass처럼 사용

```typescript
const HotelCard = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;

  /* 자식 요소 스타일링 */
  h3 {
    font-size: 24px;
    margin-bottom: 8px;
    color: #1a202c;
  }

  p {
    color: #718096;
    line-height: 1.6;
  }

  /* & = 현재 요소 */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    /* hover 시 h3만 변경 */
    h3 {
      color: #3b82f6;
    }
  }

  /* 특정 클래스가 있을 때 */
  &.is-liked {
    border: 2px solid #ef4444;
  }

  /* 부모가 있을 때 */
  .grid-layout & {
    width: 100%;
  }
`
```

#### 13.2.4 컴포넌트 확장 (Extending)

```typescript
// 기본 버튼
const BaseButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`

// BaseButton을 확장하여 Primary 버튼 생성
const PrimaryButton = styled(BaseButton)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
`

// 또 다른 확장
const DangerButton = styled(BaseButton)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
`

// Link 컴포넌트를 버튼처럼 스타일링
import { Link } from 'react-router-dom'

const LinkButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    background: #2563eb;
  }
`
```

**⚠️ 안티패턴:**

```typescript
// ❌ 나쁜 예: 인라인에서 styled 컴포넌트 생성
function MyComponent() {
  // 렌더링할 때마다 새 컴포넌트 생성 → 성능 저하!
  const StyledDiv = styled.div`
    padding: 20px;
  `

  return <StyledDiv>Content</StyledDiv>
}

// ✅ 좋은 예: 컴포넌트 외부에 선언
const StyledDiv = styled.div`
  padding: 20px;
`

function MyComponent() {
  return <StyledDiv>Content</StyledDiv>
}
```

```typescript
// ❌ 나쁜 예: 불필요한 div 래핑
const Container = styled.div`
  padding: 20px;
`

function Component() {
  return (
    <div>  {/* 불필요한 div */}
      <Container>Content</Container>
    </div>
  )
}

// ✅ 좋은 예: styled 컴포넌트를 직접 루트로 사용
function Component() {
  return <Container>Content</Container>
}
```

### 13.3 css prop 사용

**styled vs css prop 비교:**

| 방법 | 사용 시기 | 장점 | 단점 |
|------|----------|------|------|
| `styled` | 재사용 가능한 컴포넌트 | 컴포넌트로 추출 가능, 명확한 이름 | 코드가 길어짐 |
| `css prop` | 일회성 스타일링 | 빠르고 간결 | 재사용 어려움 |

#### 13.3.1 기본 사용법

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

#### 13.3.2 동적 스타일링

```typescript
function HotelCard({ hotel, isLiked }: Props) {
  return (
    <div
      css={css`
        padding: 20px;
        border: 2px solid ${isLiked ? '#ef4444' : '#e2e8f0'};
        background: ${isLiked ? '#fef2f2' : 'white'};

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}
    >
      <h3>{hotel.name}</h3>
      <p>{hotel.price.toLocaleString()}원</p>
    </div>
  )
}
```

#### 13.3.3 css 재사용: 변수로 추출

```typescript
import { css } from '@emotion/react'

// 재사용 가능한 스타일 정의
const cardStyle = css`
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const highlightedStyle = css`
  border: 2px solid #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
`

function HotelCard({ hotel, isRecommended }: Props) {
  return (
    <div css={[cardStyle, isRecommended && highlightedStyle]}>
      <h3>{hotel.name}</h3>
    </div>
  )
}
```

### 13.4 Theme 시스템

**왜 Theme이 필요한가?**

여러 컴포넌트에서 동일한 색상, 간격, 폰트 크기를 사용할 때, 하드코딩하면 유지보수가 어렵습니다.

```typescript
// ❌ 하드코딩: 색상을 변경하려면 모든 파일을 수정해야 함
const Button = styled.button`
  background: #3b82f6;
  color: white;
`

const Header = styled.header`
  background: #3b82f6;  // 같은 색상 반복
`

// ✅ Theme 사용: 한 곳만 수정하면 전체 적용
const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`

const Header = styled.header`
  background: ${({ theme }) => theme.colors.primary};
`
```

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

**왜 성능 최적화가 필요한가?**

사용자 경험과 직결되는 문제입니다:
- 로딩 시간 1초 증가 → 전환율 7% 감소
- 페이지 로드 3초 이상 → 53% 사용자 이탈

**최적화 우선순위:**
1. **측정 먼저**: 추측하지 말고 실제 병목 지점 찾기
2. **80/20 법칙**: 20%의 노력으로 80%의 성능 향상
3. **사용자 체감**: 실제 사용자가 느끼는 개선에 집중

### 14.1 React.memo - 불필요한 리렌더링 방지

**왜 필요한가?**

부모 컴포넌트가 리렌더링되면, **모든 자식 컴포넌트도 리렌더링**됩니다. props가 변하지 않았는데도요!

```typescript
// ❌ 문제 상황
function HotelList() {
  const [filter, setFilter] = useState('')

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />

      {/* filter가 변경되면 모든 HotelItem이 리렌더링! */}
      {hotels.map(hotel => (
        <HotelItem key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}
```

**React.memo로 해결:**

```typescript
import { memo } from 'react'

interface HotelItemProps {
  hotel: Hotel
  onLike: (hotelId: string) => void
}

// ✅ memo로 감싸기: props가 변경될 때만 리렌더링
const HotelItem = memo(function HotelItem({ hotel, onLike }: HotelItemProps) {
  console.log('HotelItem 렌더링:', hotel.id)

  return (
    <div>
      <h3>{hotel.name}</h3>
      <p>{hotel.price.toLocaleString()}원</p>
      <button onClick={() => onLike(hotel.id)}>찜하기</button>
    </div>
  )
})

export default HotelItem
```

**실행 흐름:**

```
1. 부모 컴포넌트 리렌더링
   ↓
2. React.memo가 props 비교 (얕은 비교)
   ↓
   [props 동일] → 리렌더링 스킵 (기존 결과 재사용)
   [props 변경] → 리렌더링 실행
```

#### 14.1.1 커스텀 비교 함수

```typescript
// 특정 필드만 비교하고 싶을 때
const HotelItem = memo(
  function HotelItem({ hotel, onLike }: HotelItemProps) {
    return (
      <div>
        <h3>{hotel.name}</h3>
        <button onClick={() => onLike(hotel.id)}>
          {hotel.isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // true를 반환하면 리렌더링 하지 않음 (변경 없음)
    // false를 반환하면 리렌더링 (변경 있음)
    return (
      prevProps.hotel.id === nextProps.hotel.id &&
      prevProps.hotel.name === nextProps.hotel.name &&
      prevProps.hotel.isLiked === nextProps.hotel.isLiked
    )
    // hotel.views 같은 다른 필드는 무시
  }
)
```

#### 14.1.2 주의사항: 함수 props와 useCallback

```typescript
// ❌ 나쁜 예: memo가 무용지물
function ParentComponent() {
  return (
    <div>
      {hotels.map(hotel => (
        <HotelItem
          key={hotel.id}
          hotel={hotel}
          onLike={(id) => handleLike(id)}  // 매번 새 함수 생성!
        />
      ))}
    </div>
  )
}

// ✅ 좋은 예: useCallback으로 함수 메모이제이션
function ParentComponent() {
  const handleLike = useCallback((hotelId: string) => {
    // 찜하기 로직
  }, [])  // 의존성이 없으면 함수가 재생성되지 않음

  return (
    <div>
      {hotels.map(hotel => (
        <HotelItem
          key={hotel.id}
          hotel={hotel}
          onLike={handleLike}  // 같은 함수 참조 유지
        />
      ))}
    </div>
  )
}
```

**⚠️ 안티패턴:**

```typescript
// ❌ 모든 컴포넌트에 memo 사용 (over-optimization)
const TinyComponent = memo(function TinyComponent({ text }: { text: string }) {
  return <span>{text}</span>  // 너무 작은 컴포넌트
})
// memo의 비교 비용 > 리렌더링 비용

// ✅ 리렌더링 비용이 큰 컴포넌트에만 사용
const ExpensiveList = memo(function ExpensiveList({ items }: Props) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {/* 복잡한 렌더링 로직 */}
          <HeavyChart data={item.data} />
        </li>
      ))}
    </ul>
  )
})
```

**memo를 사용해야 할 때:**

| 상황 | memo 사용 | 이유 |
|------|----------|------|
| 리스트 항목 컴포넌트 | ✅ | 항목이 많고 자주 리렌더링 |
| 복잡한 계산/렌더링 | ✅ | 리렌더링 비용이 큼 |
| 자주 변하는 props | ❌ | memo 비교 비용만 증가 |
| 작고 단순한 컴포넌트 | ❌ | 리렌더링 비용이 작음 |

### 14.2 Code Splitting - 동적 import

**왜 필요한가?**

모든 코드를 한 번에 다운로드하면 **초기 로딩이 느려집니다**.

```typescript
// ❌ 문제: 모든 페이지를 한 번에 번들링
import HotelDetailPage from '@pages/HotelDetail'  // 500KB
import ReservationPage from '@pages/Reservation'  // 300KB
import AdminPage from '@pages/Admin'  // 800KB

// 사용자가 호텔 목록만 보고 싶은데, 1.6MB를 다운로드!
```

**Code Splitting으로 해결:**

```typescript
import { lazy, Suspense } from 'react'

// ✅ 동적 import: 필요할 때만 로드
const HotelDetailPage = lazy(() => import('@pages/HotelDetail'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const AdminPage = lazy(() => import('@pages/Admin'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />  {/* 즉시 로드 */}

      {/* 해당 페이지 방문 시에만 로드 */}
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

      {/* 관리자만 방문 → 대부분 사용자는 다운로드 안 함 */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<Loading />}>
            <AdminPage />
          </Suspense>
        }
      />
    </Routes>
  )
}
```

**실행 흐름:**

```
1. 초기 로드: HomePage만 번들에 포함 (100KB)
   ↓
2. 사용자가 /hotel/123 접속
   ↓
3. HotelDetailPage 청크 다운로드 시작 (500KB)
   ↓
4. 다운로드 중: <Loading /> 표시
   ↓
5. 다운로드 완료: HotelDetailPage 렌더링
```

#### 14.2.1 라우터별 Code Splitting (권장)

```typescript
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// 페이지별로 분리
const HotelListPage = lazy(() => import('@pages/HotelList'))
const HotelDetailPage = lazy(() => import('@pages/HotelDetail'))
const ReservationPage = lazy(() => import('@pages/Reservation'))
const MyPage = lazy(() => import('@pages/MyPage'))

// 공통 Loading 컴포넌트
function Loading() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div className="spinner">로딩 중...</div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/hotels" element={<HotelListPage />} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </Suspense>
  )
}
```

#### 14.2.2 조건부 Code Splitting

```typescript
// 특정 조건에서만 로드
function AdminPanel() {
  const { user } = useUser()
  const [AdminComponent, setAdminComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    if (user?.role === 'admin') {
      // 관리자일 때만 AdminPanel 로드
      import('@components/AdminPanel').then(module => {
        setAdminComponent(() => module.default)
      })
    }
  }, [user])

  if (!AdminComponent) {
    return <div>권한을 확인하는 중...</div>
  }

  return <AdminComponent />
}
```

#### 14.2.3 라이브러리 Code Splitting

```typescript
// 무거운 라이브러리를 사용자 액션에 따라 로드
function ChartPage() {
  const [showChart, setShowChart] = useState(false)
  const [Chart, setChart] = useState<any>(null)

  const loadChart = async () => {
    // Chart.js는 무거운 라이브러리 (200KB+)
    // 사용자가 "차트 보기" 클릭할 때만 로드
    const { Chart } = await import('chart.js')
    setChart(() => Chart)
    setShowChart(true)
  }

  return (
    <div>
      <button onClick={loadChart}>차트 보기</button>

      {showChart && Chart && (
        <Chart data={chartData} />
      )}
    </div>
  )
}
```

**⚠️ 주의사항:**

```typescript
// ❌ 나쁜 예: 너무 작은 컴포넌트 분리
const Button = lazy(() => import('@components/Button'))  // 5KB만 분리 → 비효율적

// ✅ 좋은 예: 의미 있는 크기의 청크
const AdminDashboard = lazy(() => import('@pages/AdminDashboard'))  // 500KB 분리
```

**Code Splitting 기준:**

| 대상 | 분리 여부 | 이유 |
|------|----------|------|
| 페이지 컴포넌트 | ✅ 권장 | 라우트별로 로드 |
| 관리자 페이지 | ✅ 권장 | 대부분 사용자는 접근 안 함 |
| 무거운 라이브러리 (차트, 에디터) | ✅ 권장 | 선택적 기능 |
| 작은 공통 컴포넌트 (Button, Input) | ❌ 비권장 | 분리 비용 > 이득 |
| 초기 화면에 필요한 컴포넌트 | ❌ 비권장 | 어차피 로드됨 |

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

# FastCampus React 학습 정리

> 이 문서는 FastCampus React 강의에서 제공된 실습 소스(`fastcampus-part3-love-trip`)를 바탕으로
> 초보자가 **React + TypeScript** 프로젝트를 이해하고 스스로 확장할 수 있도록 교재 형태로 정리한 README입니다.
>
> README만 읽어도 강의 핵심 개념과 프로젝트 구조, 실습 포인트, 모범 사례, 자주 발생하는 오류와 해결 방법 등을 학습할 수 있도록 상세히 작성했습니다.

---

## 목차

1. 소개 및 학습 목표
2. 사전 준비물
3. 프로젝트 구조 설명
4. 빠른 시작(환경 구성 및 실행)
5. 핵심 파일/디렉터리 안내
6. React 기초와 핵심 개념(예제 포함)

   * 컴포넌트
   * Props & State
   * 이벤트 처리
   * 조건부 렌더링 / 리스트 렌더링
   * 컴포넌트 라이프사이클과 `useEffect`
   * 커스텀 훅
   * Context API
   * 라우팅 (React Router)
   * 폼 처리
7. TypeScript 적용 포인트

   * 인터페이스 & 타입 정의
   * 제네릭 컴포넌트
   * 유틸 타입 사용법
8. 비동기 통신과 API 설계 패턴

   * remote 디렉터리 패턴
   * 에러 처리 전략
   * 캐싱/성능 고려사항
9. 인증/제3자 SDK 연동 (예: Kakao, Google, Firebase)

   * 키 관리 (.env)
   * SDK 로딩 패턴(useLoadKakao 예제)
   * 보안 주의사항
10. 성능 최적화

    * 메모이제이션(useMemo, useCallback, React.memo)
    * 코드 스플리팅(lazy, Suspense)
    * 리스트 성능(키 사용, 가상화)
11. 테스트 & 린트 & 코드 스타일
12. 배포 & 운영
13. 개발 체크리스트 & 자주 묻는 질문(FAQ)
14. 실습 과제와 확장 아이디어
15. 참고 자료

---

# 1. 소개 및 학습 목표

이 프로젝트(예: `love-trip`)는 여행 예약(호텔 목록, 예약, 찜, 리뷰 등) 기능을 연습해보기 위한 React + TypeScript 실습용 앱입니다.

학습 목표:

* React 컴포넌트 설계와 상태 관리 패턴 이해
* Hooks와 Context를 활용한 애플리케이션 구조 설계
* TypeScript로 타입 안정성을 확보하는 방법
* 외부 API(Firebase, Kakao, Google) 연동 및 보안 관리
* 성능 최적화와 배포 전략

---

# 2. 사전 준비물

* Node.js (권장: 18 LTS 이상)
* npm 또는 yarn
* Git
* Visual Studio Code (권장) + ESLint, Prettier 확장
* 카카오 개발자 계정(필요 시), Firebase 콘솔

환경변수를 `.env.*` 파일로 관리합니다. (프로젝트에 `.env.development`, `.env.local`, `.env.production` 샘플 있음)

> **중요**: 민감한 키(예: Firebase admin key, Kakao Admin Key 등)는 절대 레포지토리에 커밋하지 마세요.

---

# 3. 프로젝트 구조 (요약)

```
fastcampus-part3-love-trip/
├─ public/                # 정적자원 (index.html 등)
├─ src/
│  ├─ components/         # 재사용 가능한 UI 컴포넌트
│  ├─ pages/              # 라우팅 페이지 단위
│  ├─ hooks/              # 커스텀 훅 (useLoadKakao, useGoogleSignin 등)
│  ├─ contexts/           # Context API
│  ├─ remote/             # Firebase, API 호출 모듈
│  ├─ models/             # TypeScript 인터페이스/타입
│  ├─ constants/          # 앱 전역 상수
│  ├─ mock/               # 샘플 데이터 (개발용)
│  ├─ App.tsx
│  └─ index.tsx
├─ .eslintrc
├─ package.json
└─ .env.*
```

각 디렉터리는 역할이 명확히 분리되어 있어 유지보수가 용이합니다.

---

# 4. 빠른 시작 (환경 구성 및 실행)

1. 레포지토리 복제

```bash
git clone <repo-url>
cd fastcampus-part3-love-trip
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. 환경변수 설정

* `.env.development` 와 같은 템플릿을 보고 필요한 키를 입력하세요.
* 예: `REACT_APP_KAKAO_API_KEY=your_kakao_js_key`

4. 개발 서버 실행

```bash
npm start
# 또는
yarn start
```

빌드

```bash
npm run build
```

테스트 및 린트

```bash
npm run lint
npm run test
```

---

# 5. 핵심 파일/디렉터리 안내

* `src/App.tsx` – 라우터 설정, 전역 레이아웃, 글로벌 Context 프로바이더 등록
* `src/index.tsx` – React 엔트리, SSR/StrictMode 설정
* `src/hooks/` – 비즈니스 로직을 캡슐화한 재사용 가능한 훅
* `src/contexts/` – 전역 상태(예: Alert, Auth)를 관리
* `src/remote/` – 외부 API(예: Firebase)와 통신하는 레이어
* `src/pages/` – 화면 단위 컴포넌트
* `src/components/` – 작은 UI 컴포넌트 (Button, Modal, Card 등)
* `src/models/` – 프로젝트 전역에서 사용하는 타입/인터페이스

---

# 6. React 핵심 개념 & 실습 예제

아래는 교재식 설명과 코드 예제입니다. 주요 개념을 예제와 함께 설명하므로 직접 실습해보세요.

## 6.1 컴포넌트

* 함수형 컴포넌트(권장)
* 클래스형 컴포넌트(레거시)

예제 (TypeScript):

```tsx
// src/components/Greeting.tsx
import React from 'react';

interface Props {
  name: string;
}

const Greeting: React.FC<Props> = ({ name }) => {
  return <h1>안녕하세요, {name}님!</h1>;
};

export default Greeting;
```

**핵심 포인트**:

* 컴포넌트는 **재사용성**과 **단일 책임 원칙(SRP)**을 지키도록 설계
* UI는 최대한 순수 함수처럼(부수효과 최소) 유지

## 6.2 Props & State

Props는 부모 -> 자식 단방향 전달, State는 컴포넌트 내부 상태.

```tsx
// 상태 예제
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>증가</button>
    </div>
  );
};
```

## 6.3 이벤트 처리

JSX 내부에서 이벤트를 핸들러로 연결합니다.

```tsx
<button onClick={(e) => handleClick(e)}>클릭</button>
```

이벤트 핸들러는 필요시 `useCallback`으로 메모이제이션합니다.

## 6.4 조건부 렌더링 / 리스트 렌더링

```tsx
// 조건부 렌더링
{isLoggedIn ? <Dashboard /> : <Login />}

// 리스트 렌더링
<ul>
  {hotels.map(hotel => (
    <li key={hotel.id}>{hotel.name}</li>
  ))}
</ul>
```

`key`는 리스트 항목의 고유값을 사용하세요. 인덱스 사용은 재정렬 이슈 유발 가능.

## 6.5 컴포넌트 라이프사이클과 useEffect

`useEffect`는 사이드 이펙트를 처리합니다. 의존성 배열을 정확히 명시하세요.

```tsx
useEffect(() => {
  const id = setInterval(() => {
    // ...
  }, 1000);
  return () => clearInterval(id); // cleanup
}, [dependency]);
```

**자주 발생하는 실수**:

* 의존성 배열 누락 → stale closure 또는 과도한 재실행
* 불필요한 의존성으로 인한 무한 루프

## 6.6 커스텀 훅 (Custom Hooks)

재사용 가능한 로직을 훅으로 추출합니다. 예: `useLoadKakao`, `useGoogleSignin`.

```ts
// src/hooks/useLoadScript.ts
import { useEffect } from 'react';

export function useLoadScript(src: string, id?: string) {
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    if (id) script.id = id;
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // 필요시 제거
    };
  }, [src, id]);
}
```

**권장 패턴**: 훅 내부는 상태와 사이드 이펙트만 관리하고 UI는 컴포넌트가 담당

## 6.7 Context API

전역 상태 공유 시 유용. 하지만 state가 자주 바뀌면 성능 문제가 발생하므로 분리하거나 `useMemo`로 값 메모이제이션 필요.

```tsx
// src/contexts/AlertContext.tsx
const AlertContext = React.createContext({ showAlert: (msg: string) => {} });

export const AlertProvider: React.FC = ({ children }) => {
  const showAlert = (msg: string) => {
    // 알림 로직
  };
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
```

**주의**: Context에 큰 객체를 그대로 넘기면 모든 구독 컴포넌트가 재렌더링됩니다.

## 6.8 라우팅 (React Router)

`react-router-dom`을 사용합니다. `Routes`, `Route`, `useNavigate`, `useParams` 등을 활용.

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/hotel/:id" element={<Hotel />} />
  </Routes>
</BrowserRouter>
```

## 6.9 폼 처리

간단한 폼은 `useState`로 처리, 복잡한 폼은 `react-hook-form` 사용 권장.

```tsx
import { useForm } from 'react-hook-form';

function BookingForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
    </form>
  );
}
```

---

# 7. TypeScript 적용 포인트

TypeScript는 코드 안정성을 높이고 리팩터링 시 안전망 역할을 합니다. 다음은 관례와 팁입니다.

* `src/models/`에 도메인 타입(예: `hotel.ts`, `room.ts`)을 정의
* 컴포넌트 props는 interface로 명시
* API 응답 타입을 `remote` 레이어에서 정의 및 사용
* Any 사용을 지양하고, 불가피하면 주석으로 이유를 남김
* `unknown`을 활용하여 안전하게 타입 단언

예시 인터페이스:

```ts
export interface Hotel {
  id: string;
  name: string;
  address?: string;
  rating?: number;
}
```

제네릭 컴포넌트 예시:

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  return <>{items.map((i, idx) => <div key={idx}>{renderItem(i)}</div>)}</>;
}
```

---

# 8. 비동기 통신과 API 설계 패턴

`remote/` 디렉터리는 API 호출을 캡슐화합니다. 다음 패턴을 권장합니다.

* **함수 당 단일 책임**: 각 함수는 특정 API 엔드포인트 하나만 호출
* **DTO(요청/응답 타입) 명시**: 입력/출력 타입을 명확히
* **에러 래핑**: 네트워크/파싱 에러를 공통 형식으로 변환
* **타임아웃/재시도 정책**: 필요 시 구현

예시 (fetch wrapper):

```ts
export async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}
```

캐싱 전략:

* `react-query`(TanStack Query) 사용 권장: 데이터 페칭+캐싱+갱신 자동화

---

# 9. 인증/제3자 SDK 연동

## 9.1 환경변수 관리

`.env` 파일에 민감한 키를 저장하고, 예제 파일만 레포에 유지하세요.

```env
REACT_APP_KAKAO_JS_KEY=xxxx
REACT_APP_GOOGLE_CLIENT_ID=yyyy
REACT_APP_FIREBASE_API_KEY=zzzz
```

React에서 `process.env.REACT_APP_*`로 접근합니다.

## 9.2 Kakao SDK 로딩(useLoadKakao 패턴)

* 외부 SDK는 동적으로 로드하고, 로드 상태를 훅으로 관리
* 여러 컴포넌트에서 SDK를 참조해야 하면 Context나 전역 상태로 관리

```ts
// useLoadKakao.ts (요약)
import { useEffect, useState } from 'react';

export function useLoadKakao(key: string) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if ((window as any).kakao) return setLoaded(true);
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => setLoaded(true);
  }, [key]);
  return loaded;
}
```

## 9.3 Firebase 연동

* `remote/firebase.ts`에서 Firebase 초기화 함
* 클라이언트 SDK의 config 값만 공개(서버용 Admin 키 절대 공개 금지)
* 인증/DB/스토리지 로직을 분리하여 재사용

---

# 10. 성능 최적화

## 10.1 메모이제이션

* `React.memo`로 순수 컴포넌트를 감싸 불필요 재렌더링 방지
* `useCallback`으로 함수 참조 고정
* `useMemo`로 값 계산 비용 절감

예:

```tsx
const onClick = useCallback(() => doSomething(id), [id]);
```

## 10.2 코드 스플리팅

`React.lazy`와 `Suspense`를 사용하여 초기 번들 크기를 줄입니다.

```tsx
const Hotel = React.lazy(() => import('./pages/Hotel'));

<Suspense fallback={<div>로딩중...</div>}>
  <Hotel />
</Suspense>
```

## 10.3 가상화

긴 리스트는 `react-window` 혹은 `react-virtualized`로 가상화

## 10.4 이미지 최적화

* `srcset`, `loading="lazy"` 활용
* CDN 또는 외부 스토리지 사용

---

# 11. 테스트 & 린트 & 코드 스타일

* ESLint + Prettier 설정을 프로젝트 루트에 포함
* React Testing Library + Jest로 컴포넌트 테스트 권장
* 타입 체크는 `tsc --noEmit` 또는 CI에서 실행

예: 기본 테스트 예시

```tsx
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders greeting', () => {
  render(<Greeting name="홍길동" />);
  expect(screen.getByText(/안녕하세요, 홍길동/)).toBeInTheDocument();
});
```

---

# 12. 배포 & 운영

* 정적 호스팅: Vercel, Netlify, GitHub Pages 추천
* CI: GitHub Actions로 빌드/린트/테스트 자동화
* 환경별 환경변수 관리(Production/Preview/Development)
* 모니터링: Sentry(에러 추적), Vercel/Netlify 로그

배포 시 주의:

* 민감 키가 빌드 타임 환경변수로 노출되지 않도록 주의
* CSP(콘텐츠 보안 정책) 설정 검토

---

# 13. 개발 체크리스트 & FAQ

### 체크리스트

* [ ] ESLint/Prettier 적용
* [ ] 타입 정의(모델) 작성
* [ ] API 에러 핸들링 구현
* [ ] 키/민감정보 .env로 분리
* [ ] Context 성능 고려 (메모이제이션)
* [ ] 라우트 기반 코드 분할(lazy)

### 자주 묻는 질문

Q: `useEffect` 안에서 `setState`가 무한히 호출됩니다. 왜?
A: 의존성 배열이 잘못 설정되어 있을 가능성이 큽니다. 함수나 객체를 의존성으로 전달하면 매 렌더링마다 새 참조가 생겨서 무한루프가 발생합니다. `useCallback`/`useMemo`로 참조를 고정하거나 의존성을 재설계하세요.

Q: Context의 값이 바뀌면 하위 컴포넌트가 전부 재렌더링돼요.
A: Context에 자주 변경되는 값을 직접 넣지 마세요. 대신 필요한 값/함수만 제공하거나 여러 Context로 분리하세요.

Q: 프로덕션 빌드에서 API 키가 보이나요?
A: 클라이언트 키(JavaScript key) 등은 브라우저에 전달되므로 노출됩니다. 민감한 액션(서버 인증, 관리자 권한 등)은 백엔드에서 처리하세요.

---

# 14. 실습 과제와 확장 아이디어

1. `react-query`를 도입해 기존 `remote/` 호출을 교체하고 캐싱/재시도/옵셔널 리패칭 구현
2. 예약(Reservation) 기능에 결제 모듈 연동(모의결제) 구현
3. 찜(like) 기능을 로컬 스토리지 기반 오프라인 동기화로 확장
4. 지도(카카오맵)에서 호텔 위치를 클러스터링하여 렌더링
5. PWA 기능 추가하여 오프라인 읽기 지원

---

# 15. 권장 코드 스타일(간단 요약)

* 파일/폴더명: kebab-case 또는 camelCase 일관성 유지
* 컴포넌트 파일: `PascalCase.tsx`
* 컴포넌트는 작게, 한 컴포넌트는 하나의 책임
* 타입/interface는 `src/models`에 중앙 관리
* 반복되는 UI는 재사용 가능한 컴포넌트로 추출

---

# 16. 참고 자료

* React 공식 문서: [https://reactjs.org/](https://reactjs.org/)
* TypeScript + React 가이드: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
* React Router: [https://reactrouter.com/](https://reactrouter.com/)
* TanStack Query: [https://tanstack.com/query/latest](https://tanstack.com/query/latest)
* Kakao Developers: [https://developers.kakao.com/](https://developers.kakao.com/)
* Firebase: [https://firebase.google.com/](https://firebase.google.com/)

---

## 마무리

이 README는 수업 교재처럼 실습과 핵심 개념을 연결하여 이해할 수 있도록 구성했습니다. 프로젝트 내 특정 파일(예: `src/hooks/useLoadKakao.ts`, `src/remote/firebase.ts`)를 함께 보면서 실습을 병행하면 이해가 훨씬 빠릅니다.

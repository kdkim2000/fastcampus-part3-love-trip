# 🚀 GitHub Pages 배포 가이드

이 문서는 GitHub Actions를 사용하여 React 애플리케이션을 GitHub Pages에 자동 배포하는 방법을 설명합니다.

## 📋 사전 준비

### 1. GitHub 저장소 설정

1. **저장소가 public이어야 합니다** (private 저장소는 GitHub Pro 필요)
2. 저장소 이름: `fastcampus-part3-love-trip`

### 2. GitHub Secrets 설정

GitHub 저장소에서 환경 변수를 Secrets로 등록해야 합니다.

#### 설정 방법:

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 사이드바에서 **Secrets and variables** → **Actions** 클릭
4. **New repository secret** 버튼 클릭
5. 다음 Secrets를 하나씩 추가:

| Secret Name | 값 (`.env.local`에서 복사) |
|-------------|---------------------------|
| `REACT_APP_API_KEY` | Firebase API Key |
| `REACT_APP_AUTH_DOMAIN` | Firebase Auth Domain |
| `REACT_APP_PROJECT_ID` | Firebase Project ID |
| `REACT_APP_STORAGE_BUCKET` | Firebase Storage Bucket |
| `REACT_APP_MESSAGEING_SENDER_ID` | Firebase Messaging Sender ID |
| `REACT_APP_APP_ID` | Firebase App ID |
| `REACT_APP_MEASUREMENT_ID` | Firebase Measurement ID |
| `REACT_APP_KAKAO_API_KEY` | Kakao API Key |

#### 예시:
```
Name: REACT_APP_API_KEY
Secret: AIzaSyDw1waMUiOXvap5VistniAEDbZUDA1u0eY
```

### 3. GitHub Pages 활성화

1. GitHub 저장소 페이지 → **Settings** 탭
2. 왼쪽 사이드바에서 **Pages** 클릭
3. **Source** 섹션에서:
   - **Source**: `GitHub Actions` 선택 (⚠️ 중요!)
   - ~~Branch를 선택하지 마세요~~

## 🔧 Firebase 설정

### Authorized domains 추가

Google 로그인이 작동하려면 Firebase Console에서 도메인을 승인해야 합니다.

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택: `love-trip-a9d59`
3. **Authentication** → **Settings** → **Authorized domains** 탭
4. **Add domain** 버튼 클릭
5. 다음 도메인 추가:
   ```
   kdkim2000.github.io
   ```

## 📦 배포 과정

### 자동 배포

`main` 브랜치에 코드를 push하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### 수동 배포

GitHub 저장소 페이지에서:

1. **Actions** 탭 클릭
2. 왼쪽에서 **Deploy to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. **Run workflow** 확인

## 🔍 배포 상태 확인

1. **Actions** 탭에서 워크플로우 실행 상태 확인
2. 각 단계의 로그를 확인하여 오류 디버깅 가능
3. 배포 완료 후 접속:
   ```
   https://kdkim2000.github.io/fastcampus-part3-love-trip
   ```

## 📁 파일 구조

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 워크플로우
├── public/
│   ├── index.html              # SPA 라우팅 스크립트 포함
│   └── 404.html                # GitHub Pages 404 처리
├── package.json                # homepage 필드 설정
└── DEPLOYMENT.md              # 이 문서
```

## ⚙️ 설정 파일 설명

### 1. `package.json`

```json
{
  "homepage": "https://kdkim2000.github.io/fastcampus-part3-love-trip"
}
```

- 빌드 시 정적 자원의 경로를 올바르게 설정

### 2. `.github/workflows/deploy.yml`

GitHub Actions 워크플로우:
- ✅ Node.js 환경 설정
- ✅ 의존성 설치 (Yarn)
- ✅ 환경 변수 주입
- ✅ 프로젝트 빌드
- ✅ GitHub Pages 배포

### 3. `public/404.html`

- GitHub Pages는 SPA 라우팅을 지원하지 않음
- 404 페이지에서 `index.html`로 리다이렉트하여 해결
- React Router가 올바른 페이지 렌더링

### 4. `public/index.html`

- 404 리다이렉트를 처리하는 스크립트 포함
- URL 파라미터를 복원하여 React Router에 전달

## 🐛 문제 해결

### 1. 배포 후 빈 화면이 나타남

**원인**: `homepage` 설정이 잘못됨

**해결**:
```json
// package.json
"homepage": "https://kdkim2000.github.io/fastcampus-part3-love-trip"
```

### 2. 페이지 새로고침 시 404 오류

**원인**: `public/404.html` 또는 `public/index.html` 설정 누락

**해결**: 이미 설정되어 있음 (이 가이드 따라 설정 완료)

### 3. Google 로그인 실패

**원인**: Firebase Authorized domains 미설정

**해결**: Firebase Console에서 `kdkim2000.github.io` 도메인 추가

### 4. 환경 변수가 로드되지 않음

**원인**: GitHub Secrets 미설정 또는 이름 오타

**해결**: GitHub 저장소 Settings → Secrets에서 확인

### 5. Actions 워크플로우 실패

**원인**: 권한 또는 설정 문제

**확인 사항**:
- Settings → Pages → Source가 `GitHub Actions`로 설정되어 있는지
- Settings → Actions → General에서 Workflow permissions가 활성화되어 있는지

## 📊 배포 플로우

```
┌─────────────────┐
│  git push main  │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ GitHub Actions      │
│ Workflow 트리거     │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Build (yarn build)  │
│ + 환경 변수 주입    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Deploy to           │
│ GitHub Pages        │
└────────┬────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ https://kdkim2000.github.io/        │
│ fastcampus-part3-love-trip          │
└─────────────────────────────────────┘
```

## 🎉 완료!

이제 `main` 브랜치에 코드를 push할 때마다 자동으로 배포됩니다.

배포된 사이트: **https://kdkim2000.github.io/fastcampus-part3-love-trip**

---

## 📚 추가 리소스

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Create React App 배포 가이드](https://create-react-app.dev/docs/deployment/#github-pages)
- [SPA GitHub Pages 가이드](https://github.com/rafgraph/spa-github-pages)

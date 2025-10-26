// src/scripts/seed.js

const { initializeApp } = require('firebase/app')
const {
  getFirestore,
  doc,
  setDoc,
  writeBatch,
} = require('firebase/firestore')

// ✅ dotenv 사용하여 환경 변수 로드
require('dotenv').config()

// ✅ 환경 변수에서 Firebase 설정 읽기
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Mock 데이터 import
const {
  HOTEL_NAMES,
  IMAGES,
  EVENTS,
  HOTEL,
  ROOMS,
  FORMS,
} = require('../mock/data')

// 랜덤 숫자 생성 함수
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 고유 ID 생성 함수
function generateUserId() {
  return `test_user_${Date.now()}_${random(1000, 9999)}`
}

// 호텔 데이터 생성 함수
function generateHotelData(name, index, allHotelIds) {
  const mainImageIndex = index % IMAGES.length
  const imageIndexes = [
    mainImageIndex,
    (mainImageIndex + 1) % IMAGES.length,
    (mainImageIndex + 2) % IMAGES.length,
    (mainImageIndex + 3) % IMAGES.length,
  ]

  const hotelData = {
    name: name,
    mainImageUrl: IMAGES[mainImageIndex],
    images: imageIndexes.map((idx) => IMAGES[idx]),
    price: random(100000, 500000),
    starRating: random(1, 5),
    ...HOTEL,
  }

  // 50% 확률로 단일 이벤트 객체 추가
  if (Math.random() > 0.5) {
    const randomEvent = EVENTS[random(0, EVENTS.length - 1)]
    hotelData.events = randomEvent
  }

  // 추천 호텔 추가 (랜덤하게 3~5개)
  if (allHotelIds && allHotelIds.length > 1) {
    const currentHotelId = `hotel_${index + 1}`
    const otherHotels = allHotelIds.filter((id) => id !== currentHotelId)
    const recommendCount = Math.min(random(3, 5), otherHotels.length)
    const shuffled = [...otherHotels].sort(() => Math.random() - 0.5)
    hotelData.recommendHotels = shuffled.slice(0, recommendCount)
  }

  return hotelData
}

// 객실 데이터 생성 함수
function generateRoomData(hotelId) {
  return ROOMS.map((room) => ({
    hotelId: hotelId,
    ...room,
  }))
}

// 테스트 사용자 생성 함수
async function createTestUsers(count = 3) {
  console.log(`\n👥 테스트 사용자 ${count}명 생성 중...`)

  const userIds = []

  for (let i = 0; i < count; i++) {
    const userId = generateUserId()

    await setDoc(doc(db, 'user', userId), {
      uid: userId,
      email: `test${i + 1}@example.com`,
      displayName: `테스트 사용자 ${i + 1}`,
      photoURL: null,
      createdAt: new Date().toISOString(),
    })

    console.log(`  ✓ 테스트 사용자 ${i + 1} 생성 완료 (UID: ${userId})`)
    userIds.push(userId)
  }

  return userIds
}

// Like 데이터 생성 함수
async function generateLikeData(userId, hotelIds) {
  const likeCount = random(3, Math.min(7, hotelIds.length))
  const shuffledHotels = [...hotelIds].sort(() => Math.random() - 0.5)
  const likedHotels = shuffledHotels.slice(0, likeCount)

  const batch = writeBatch(db)

  likedHotels.forEach((hotelId, index) => {
    const likeDocId = `${userId}_${hotelId}`
    const likeRef = doc(db, 'like', likeDocId)

    batch.set(likeRef, {
      userId: userId,
      hotelId: hotelId,
      order: index + 1,
      createdAt: new Date().toISOString(),
    })
  })

  await batch.commit()

  return likedHotels
}

// 예약 데이터 생성 함수
async function generateReservationData(userId, hotelIds) {
  const reservationCount = random(1, 2)
  const shuffledHotels = [...hotelIds].sort(() => Math.random() - 0.5)

  const reservations = []

  for (let i = 0; i < reservationCount; i++) {
    const hotelId = shuffledHotels[i]
    const roomId = `${hotelId}_room_${random(1, 3)}`

    const checkInDays = random(1, 30)
    const checkOutDays = checkInDays + random(1, 5)

    const checkInDate = new Date()
    checkInDate.setDate(checkInDate.getDate() + checkInDays)

    const checkOutDate = new Date()
    checkOutDate.setDate(checkOutDate.getDate() + checkOutDays)

    const reservationId = `reservation_${Date.now()}_${i}_${random(
      1000,
      9999,
    )}`

    await setDoc(doc(db, 'reservation', reservationId), {
      userId: userId,
      hotelId: hotelId,
      roomId: roomId,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      price: random(150000, 500000),
      formValues: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'test@example.com',
      },
      createdAt: new Date().toISOString(),
    })

    reservations.push(reservationId)
  }

  return reservations
}

// 데이터베이스 초기화 함수
async function seedDatabase() {
  console.log('🌱 데이터베이스 초기화를 시작합니다...\n')

  // ✅ 환경 변수 검증
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('❌ Firebase 환경 변수가 설정되지 않았습니다!')
    console.error('📝 .env.development 파일을 확인하세요.')
    process.exit(1)
  }

  console.log(`🔥 Firebase 프로젝트: ${firebaseConfig.projectId}\n`)

  try {
    // 1. 먼저 모든 호텔 ID 생성
    const hotelIds = HOTEL_NAMES.map((_, index) => `hotel_${index + 1}`)
    console.log(`📋 생성할 호텔 ID: ${hotelIds.length}개\n`)

    // 2. 호텔 데이터 추가
    console.log('📍 호텔 데이터 추가 중...')
    const hotelPromises = HOTEL_NAMES.map(async (name, index) => {
      const hotelId = hotelIds[index]
      const hotelData = generateHotelData(name, index, hotelIds)

      await setDoc(doc(db, 'hotel', hotelId), hotelData)

      const recommendCount = hotelData.recommendHotels
        ? hotelData.recommendHotels.length
        : 0
      console.log(
        `  ✓ ${name} 추가 완료 (추천: ${recommendCount}개, 이벤트: ${hotelData.events ? '있음' : '없음'})`,
      )

      return hotelId
    })

    await Promise.all(hotelPromises)
    console.log(`\n✅ 총 ${hotelIds.length}개의 호텔 데이터 추가 완료`)

    // 3. 객실 데이터 추가
    console.log('\n🛏️  객실 데이터 추가 중...')
    let roomCount = 0

    for (const hotelId of hotelIds) {
      const rooms = generateRoomData(hotelId)

      for (let i = 0; i < rooms.length; i++) {
        const roomId = `${hotelId}_room_${i + 1}`
        await setDoc(doc(db, 'room', roomId), rooms[i])
        roomCount++
      }
    }

    console.log(`✅ 총 ${roomCount}개의 객실 데이터 추가 완료`)

    // 4. 예약 폼 데이터 추가
    console.log('\n📋 예약 폼 데이터 추가 중...')
    await setDoc(doc(db, 'hotel_form', 'default'), {
      forms: FORMS,
    })
    console.log('✅ 예약 폼 데이터 추가 완료')

    // 5. 테스트 사용자 생성
    const userIds = await createTestUsers(3)

    // 6. Like 데이터 추가
    console.log('\n❤️  Like 데이터 추가 중...')
    let totalLikes = 0

    for (const userId of userIds) {
      const likedHotels = await generateLikeData(userId, hotelIds)
      totalLikes += likedHotels.length
      console.log(`  ✓ ${userId}: ${likedHotels.length}개의 Like 추가`)
    }

    console.log(`✅ 총 ${totalLikes}개의 Like 데이터 추가 완료`)

    // 7. 예약 데이터 추가
    console.log('\n📅 예약 데이터 추가 중...')
    let totalReservations = 0

    for (const userId of userIds) {
      const reservations = await generateReservationData(userId, hotelIds)
      totalReservations += reservations.length
      console.log(`  ✓ ${userId}: ${reservations.length}개의 예약 추가`)
    }

    console.log(`✅ 총 ${totalReservations}개의 예약 데이터 추가 완료`)

    console.log('\n🎉 데이터베이스 초기화가 완료되었습니다!')
    console.log('\n📊 초기화 요약:')
    console.log(`  - 호텔: ${hotelIds.length}개`)
    console.log(`  - 객실: ${roomCount}개`)
    console.log(`  - 예약 폼: 1개`)
    console.log(`  - 테스트 사용자: ${userIds.length}명`)
    console.log(`  - Like: ${totalLikes}개`)
    console.log(`  - 예약: ${totalReservations}개`)

    console.log(`\n👤 테스트 사용자 목록:`)
    userIds.forEach((userId, index) => {
      console.log(`  ${index + 1}. ${userId}`)
    })
    console.log(
      '\n💡 실제 Google 로그인 후 해당 사용자의 UID로 Like/예약 데이터를 확인할 수 있습니다.',
    )
    console.log(
      '\n🏨 각 호텔에는 3~5개의 추천 호텔이 랜덤으로 설정되어 있습니다.',
    )
  } catch (error) {
    console.error('❌ 데이터베이스 초기화 중 오류 발생:', error)
    throw error
  }
}

// 스크립트 실행
seedDatabase()
  .then(() => {
    console.log('\n✨ 모든 작업이 완료되었습니다.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 오류가 발생했습니다:', error)
    process.exit(1)
  })
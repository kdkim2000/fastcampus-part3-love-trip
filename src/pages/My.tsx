import { Link } from 'react-router-dom'

import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import ListRow from '@shared/ListRow'
import useUser from '@hooks/auth/useUser'
import useGoogleSignin from '@hooks/useGoogleSignin'

function MyPage() {
  const user = useUser()
  const { signout } = useGoogleSignin()

  return (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <img
          src={
            user?.photoURL ||
            'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-64.png'
          }
          alt="profile"
          width={80}
          height={80}
          style={{ borderRadius: '100%' }}
        />
        <Spacing size={20} />
        <Flex direction="column" align="center">
          <strong>{user?.displayName}</strong>
          <Spacing size={4} />
          <span>{user?.email}</span>
        </Flex>
      </Flex>

      <Spacing size={40} />

      <ul>
        <li>
          <Link to="/settings">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="설정" subTitle="찜하기, 예약목록 관리" />
              }
              withArrow={true}
            />
          </Link>
        </li>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="찜하기" subTitle="찜한 호텔 순서 변경" />
              }
              withArrow={true}
            />
          </Link>
        </li>
        <li>
          <Link to="/reservation/list">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts title="예약목록" subTitle="예약 내역 확인" />
              }
              withArrow={true}
            />
          </Link>
        </li>
      </ul>

      <Spacing size={20} />

      <Flex justify="center" style={{ padding: '0 24px' }}>
        <Button
          full={true}
          onClick={() => {
            signout()
          }}
        >
          로그아웃
        </Button>
      </Flex>
    </div>
  )
}

export default MyPage

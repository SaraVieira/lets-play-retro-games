import { NavDesktop } from './NavDesktop'
import { NavMobile } from './NavMobile'

export const Header = () => {
  return (
    <nav className="tui-nav">
      <NavDesktop />
      <NavMobile />
    </nav>
  )
}

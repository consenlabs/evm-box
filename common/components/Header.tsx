import { Link, Spacer, useTheme } from '@geist-ui/react'
import { Moon, Sun } from '@geist-ui/react-icons'
import NextLink from 'next/link'
import { useLocale } from '../hooks/useLocale'
import { useThemeSwitch } from '../hooks/useThemeContext'
import { addColorAlpha } from '../utils'

const Header: React.FC = () => {
  const t = useLocale()
  const theme = useTheme()
  const { switchTheme, themeType } = useThemeSwitch()
  return (
    <header>
      <div className="header">
        <NextLink href="/">
          <div className="logo">
            <img src="/favicon.png" />
            <span>{t('AppName')}</span>
          </div>
        </NextLink>
        <nav>
          <Link
            href="https://faucet.paradigm.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            color={false}
            block
          >
            Faucet
          </Link>
          <Spacer w={2}/>
          <Link block href="#">
            {themeType === 'dark'
              ? <Moon
                size={18}
                onClick={() => switchTheme('light')}
                color={theme.palette.foreground}
              />
              : <Sun
                size={18}
                onClick={() => switchTheme('dark')}
                color={theme.palette.foreground}
              />
            }
          </Link>
        </nav>
      </div>
      <style jsx>{`
        header {
          backdrop-filter: saturate(180%) blur(5px);
          background-color: ${addColorAlpha(theme.palette.background, 0.8)};
          box-shadow: ${theme.type === 'dark' ? '0 0 0 1px #333' : '0 0 15px 0 rgba(0, 0, 0, 0.1)'};
          width: 100%;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 12;
        }
        .header {
          max-width: 1000px;
          width: 100%;
          padding: 0 16pt;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: auto;
        }

        nav a {
          color: ${theme.palette.foreground};
          cursor: pointer;
        }

        :global(.header .link) {
          color: ${theme.palette.foreground} !important;
        }

        .logo {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .logo img {
          width: 32px;
          height: 32px;
        }

        .logo span {
          font-size: 1.125rem;
          font-weight: 500;
          margin-left: 1em;
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
            nav {
              display: none;
            }
          }
      `}</style>
    </header>
  )
}

export default Header

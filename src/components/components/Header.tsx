import Image from 'next/image';
import { ThemeButton } from './ThemeButton';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import { Link } from '../../i18n/navigation';
import ThemeProvider from '../../app/[locale]/(main)/ThemeProvider';

export function Header(): React.ReactNode {
  const t = useTranslations('header');

  return (
    <>
      <header>
        <div className="header-top">
          <div>
            <a
              href="https://pokeapi.co/about"
              data-testid="header-logo"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/pokeapi.png"
                className="logo"
                alt="Poke logo"
                width={100}
                height={100}
                priority
              />
            </a>
          </div>
          <nav className="nav">
            <Link href="/" className="header-link">
              {t('nav.home')}
            </Link>
            <Link href="/about" className="header-link">
              {t('nav.about')}
            </Link>
          </nav>
          <ThemeProvider>
            <ThemeButton />
          </ThemeProvider>
          <LocaleSwitcher />
        </div>
        <h1 className="header-title">{t('title')}</h1>
      </header>
    </>
  );
}

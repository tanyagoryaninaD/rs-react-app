'use client';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/navigation';

export default function LocaleSwitcher(): React.ReactNode {
  const t = useTranslations('header');
  const pathname = usePathname();

  return (
    <div className="locals">
      <p>{t('languages.title')}</p>
      <div className="locals-links">
        <Link href={pathname} locale="en">
          {t('languages.en')}
        </Link>
        <Link href={pathname} locale="ru">
          {t('languages.ru')}
        </Link>
      </div>
    </div>
  );
}

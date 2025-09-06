import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="not-found">
      <h2>{t('title')}</h2>
      <Link href="/">{t('backButton')}</Link>
      <Image src="/not-found.gif" alt="not found" width={500} height={300} />
    </div>
  );
}

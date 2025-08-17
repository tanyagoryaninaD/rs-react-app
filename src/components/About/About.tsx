import Link from 'next/dist/client/link';
import '../../styles/About.css';
import { useTranslations } from 'next-intl';

export function About(): React.ReactNode {
  const t = useTranslations('aboutPage');

  return (
    <>
      <h2>{t('title')}</h2>
      <div className="wrapper-about">
        <h3>{t('about.title')}</h3>
        <p>{t('about.description')}</p>
      </div>

      <div className="wrapper-about">
        <div className="school">
          <h3>{t('school.title')}</h3>
          <Link href="https://rs.school/courses/reactjs" target={'_blank'}>
            <img
              src="https://i.ytimg.com/vi/s0BEXi7x2bk/hqdefault.jpg"
              alt=""
            />
          </Link>
        </div>
        <p>{t('school.description')}</p>
      </div>
      <div className="wrapper-about">
        <h3>{t('develop.title')}</h3>
        <div className="develop">
          <img
            src="https://avatars.githubusercontent.com/u/176940159?v=4"
            alt="Tatsiana Haranina"
          />
          <div>
            <h4>{t('develop.name')}</h4>
            <ul>
              <li>{t('develop.description')}</li>
              <li>
                GitHub:{' '}
                <Link
                  href="https://github.com/tanyagoryaninaD"
                  target={'_blank'}
                >
                  @tanyagoryaninaD
                </Link>
              </li>
              <li>Discord: @tanyagoryanina._96715</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

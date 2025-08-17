import '../../styles/index.css';
import '../../styles/App.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '../../i18n/routing';
import { RootLayoutProps } from '../../types/interfaces';
import { notFound } from 'next/navigation';

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          {<NextIntlClientProvider>{children}</NextIntlClientProvider>}
        </div>
      </body>
    </html>
  );
}

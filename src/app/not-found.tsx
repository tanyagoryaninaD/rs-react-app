import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="not-found">
      <h2>Oops! I didn&apos;t find anything at this URL.</h2>
      <Link href="/">Back to Home</Link>
      <Image src="/not-found.gif" alt="not found" width={500} height={300} />
    </div>
  );
}

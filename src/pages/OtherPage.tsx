import { Link } from 'wouter'

export function OtherPage() {
  return (
    <div>
      <div className="mt-5">Other page</div>
      <div className="mt-5">
        <Link href="/">Link to home page</Link>
      </div>
    </div>
  );
}

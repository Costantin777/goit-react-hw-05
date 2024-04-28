import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>Page not found!</p>
      <Link to="/">Home page</Link>
    </div>
  );
}

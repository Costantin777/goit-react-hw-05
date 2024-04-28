export default function ReviewCard({ review: { author, content } }) {
  return (
    <>
      <h4>Author: {author}</h4>
      <p>{content}</p>
    </>
  );
}

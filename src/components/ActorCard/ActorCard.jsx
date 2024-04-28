export default function ActorCard({
  actor: { original_name, profile_path, character },
}) {
  const path = `https://image.tmdb.org/t/p/w500${profile_path}`;

  return (
    <>
      <img src={path} alt={original_name} width="180" />
      <h4>Name: {original_name}</h4>
      <p>Character: {character}</p>
    </>
  );
}

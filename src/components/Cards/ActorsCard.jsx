import Image from "next/image"

function ActorsCard({ actor }) {
  const profilePath = actor.profile_path
  return (
    <div className="card bg-slate-800 shadow-xl " style={{ height: "300px" }}>
      <figure className="h-56">
        <img
          src={`https://image.tmdb.org/t/p/w500${profilePath}`}
          alt="Movie Poster"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-0 w-full items-center">
        <h2 className="card-title text-base text-center pt-6">{actor.name}</h2>
      </div>
    </div>
  )
}

export default ActorsCard

import { FaStar } from "react-icons/fa"

function MovieCard({ title, release_date, vote_average, poster_path }) {
  return (
    <div className="card bg-gray-900 shadow-xl " style={{ height: "300px" }}>
      <figure className="h-56">
        <img
          src={`https://image.tmdb.org/t/p/w500/` + poster_path}
          alt="Movie Poster"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-0 grid grid-cols-4 w-full items-center">
        <div className="col-span-4 pl-1" style={{ maxHeight: "2.5em" }}>
          <h2 className="card-title text-base text-slate-200">{title}</h2>
        </div>
        <p className="col-span-2 pl-2 pb-2 text-sm flex justify-start gap-2 text-slate-200 items-center">
          <span className="text-yellow-200">
            <FaStar />
          </span>
          {vote_average}
        </p>
        <p className="col-span-2 pr-2 pb-2 text-sm text-slate-200 justify-self-end">
          {release_date}
        </p>
      </div>
    </div>
  )
}

export default MovieCard

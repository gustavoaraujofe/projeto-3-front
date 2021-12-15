import { Link } from "react-router-dom";

function AnimalCard(props) {
  return (
    <div className="card-container mb-4">
      <div className="pr-5 pt-1 flex justify-end">
        <Link to="/animal-edit">
          <p className="text-sm pr-2">Editar</p>

          <p className="text-sm">Deletar</p>
        </Link>
      </div>
      <div className="pt-1 card-content">
        <div className="media">
          <div className="media-left">
            <div className="flex-shrink-0">
              <img className="h-20 w-20 rounded-full" src={props.imageUrl} />
            </div>
          </div>
          <div className="media-content">
            <p className="title is-4">{props.name}</p>
            <p className="subtitle is-6 mb-2">Idade: {props.age} anos</p>
            <p className="subtitle is-6">Peso: {props.weight}kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalCard;

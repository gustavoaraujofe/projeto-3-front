import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { Link } from "react-router-dom";
import telaRosaAzul from "../../assets/tela-rosa-azul.png";
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";

function RecordDetail() {
  const [toggleDelete, setToggleDelete] = useState(false);
  const navigate = useNavigate();
  const [recordData, setRecordData] = useState({});

  const params = useParams();

  useEffect(() => {
    async function fetchRecord() {
      try {
        const response = await api.get(
          `/medical-appointment/search/${params.id}`
        );
        console.log(response.data);

        setRecordData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchRecord();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/medical-appointment/delete/${id}`);
      navigate("/prontuario");
      setToggleDelete(false);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(recordData.date);
  console.log(recordData);
  return (
    <div className="min-h-full flex items-start justify-center pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h1 className="text-center">Registro</h1>
        </div>

        {recordData.date !== undefined ? (
          <>
            <div className="flex items-center justify-end">
              <Link to={`/vet/prontuario/${recordData.animalId}`}>
                <i className="fas fa-arrow-left fa-2x mr-3 icon"></i>
              </Link>
              <Link to={`/prontuario/record-edit/${recordData._id}`}>
                <img
                  src={editIcon}
                  type="button"
                  className="mr-3 icon"
                  alt="icone editar"
                />
              </Link>
              <img
                onClick={() => setToggleDelete(true)}
                src={deleteIcon}
                type="button"
                className="icon"
                alt="deletar"
              />
            </div>
            <form className="forms">
              <div className="mt-5 relative rounded-md shadow-sm">
                <h3 className="pl-1 noto-bold">Sinais clínicos</h3>
                <p>{recordData.clinicalSign}</p>
              </div>

              <div className="mt-5 relative rounded-md shadow-sm">
                <h3 className="pl-1 noto-bold">Exame</h3>
                <p>{recordData.exam}</p>
              </div>

              <div className="mt-5 relative rounded-md shadow-sm">
                <h3 className="pl-1 noto-bold">Doenças</h3>
                <p>{recordData.disease}</p>
              </div>

              <div className="mt-5 relative rounded-md shadow-sm">
                <h3 className="pl-1 noto-bold">Prescrição</h3>
                <p>{recordData.prescription}</p>
              </div>

              <div className="mt-5 relative rounded-md shadow-sm">
                <h3 className="pl-1 noto-bold">Vacina</h3>
                <p>{recordData.vaccine}</p>
              </div>
            </form>{" "}
          </>
        ) : null}
        <div className="flex items-center justify-center">
          <img
            alt="imagem inferior"
            className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
            src={telaRosaAzul}
          />
        </div>
      </div>
      <div className="container" id="app">
        <div className={`modal ${toggleDelete ? "is-active" : null}`}>
          <div className="modal-background "></div>
          <div className="modal-content is-flex is-justify-content-center is-flex-direction-column">
            <h3 className="has-text-centered has-text-white is-size-3">
              Deseja excluir esse registro?
            </h3>
            <div className="is-flex is-align-items-center is-justify-content-center mt-4">
              <button
                onClick={() => handleDelete(recordData._id)}
                className="button salmon-btn bg-slate-300 mr-5"
              >
                Sim
              </button>
              <button
                onClick={() => setToggleDelete(false)}
                className="button gray-btn"
                id="showModal"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordDetail;

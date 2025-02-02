import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../apis/api";
import pawImg from "../../assets/pata.png";
import BottomPink from "../../components/bottom/BottomPink";

function AnimalDetail() {
  const { id } = useParams();

  const [animalDetail, setAnimalDetail] = useState({
    name: "",
    age: "",
    breed: "",
    weight: "",
    gender: "",
    imageUrl: "",
    type: "",
    medicalAppointmentHistory: "",
  });

  const [medicalAppointmentHistory, setmedicalAppointmentHistory] = useState(
    []
  );

  useEffect(() => {
    async function fetchAnimalId() {
      try {
        const response = await api.get(`/animal/search/${id}`);
        setAnimalDetail({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchAnimalId();
  }, [id]);

  useEffect(() => {
    async function fetchMedicalAppointment() {
      try {
        const response = await api.get(`/medical-appointment/list`);

        const appointmentFiltered = response.data.filter(
          (currentAppointment) => {
            return currentAppointment.animalId === animalDetail._id;
          }
        );

        setmedicalAppointmentHistory([...appointmentFiltered]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMedicalAppointment();
  }, [animalDetail.medicalAppointmentHistory]);

  return (
    <>
      <div className="flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mt-5 ">
          <div className="flex items-center justify-center card-container mb-4">
            <div className="pt-3 pb-3 card-content">
              <div className="media">
                <div className="media-right">
                  <div className="flex-shrink-0">
                    <img
                      className="mb-4 h-20 w-20 rounded-full object-cover"
                      src={animalDetail.imageUrl}
                      alt={animalDetail.name}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p>
                  <span className="noto-bold">Nome: </span> {animalDetail.name}
                </p>
                <p>
                  <span className="noto-bold">Idade: </span> {animalDetail.age}{" "}
                
                </p>
                <p>
                  <span className="noto-bold">Peso: </span>{" "}
                  {animalDetail.weight}
                </p>
                <p>
                  <span className="noto-bold">Raça: </span> {animalDetail.breed}
                </p>
                <p>
                  <span className="noto-bold">Sexo: </span>{" "}
                  {animalDetail.gender}
                </p>
                <p>
                  <span className="noto-bold">Tipo: </span> {animalDetail.type}
                </p>
                <hr />
              </div>
              {medicalAppointmentHistory
                ? medicalAppointmentHistory.map((currentAppointment) => {
                    return (
                      <Link to={`/prontuario/record-detail/${currentAppointment._id}`} >
                      <div className="card-container mb-4">
                        <div className="p-5 card-content">
                          <div className="media pl-0">
                            <div className="media-content">
                              <p><strong>Consulta dia:</strong> {currentAppointment.date}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      </Link>
                    );
                  })
                : null}
            </div>
          </div>
          <BottomPink />
        </div>
      </div>
    </>
  );
}

export default AnimalDetail;

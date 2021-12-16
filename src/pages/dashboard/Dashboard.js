import { Link, useLocation } from "react-router-dom";
import api from "../../apis/api";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import addIcon from "../../assets/add-icon.png";
import telaBegeAzul from "../../assets/tela-bege-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";
import Loading from "../../components/Loading";
import AnimalCard from "../animal/AnimalCard";
import AppointmentCard from "../appointment/AppointmentCard";

function Dashboard() {
  const params = useLocation();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [animalData, setAnimalData] = useState([]);
  const [appointment, setAppointment] = useState();

  const [userData, setUserData] = useState({
    name: "",
    role: "",
    avatarUrl: "",
  });

  function handleChange(animal) {
    setSearch(animal);
  }

  let listaFiltrada = [];
  if (search) {
    const re = new RegExp(`${search}`, "gi");
    animalData.forEach((currentAnimal) => {
      if (currentAnimal.name.common.match(re) !== null) {
        listaFiltrada.push(currentAnimal);
      }
    });
  } else {
    listaFiltrada = animalData;
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/profile`);

        setUserData({ ...response.data });
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await api.get(`/animal/list`);

        const animalFilter = await response.data.filter((currentAnimal) => {
          return currentAnimal.userId === userData._id;
        });

        setAnimalData(animalFilter);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnimal();
  }, [userData._id, params]);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const response = await api.get(`/appointment/list`);
        let appointmentFilter;

        if (userData.role === "user") {
          appointmentFilter = response.data.filter((currentAppointment) => {
            return currentAppointment.userId === userData._id;
          });
        } else {
          appointmentFilter = response.data.filter((currentAppointment) => {
            return currentAppointment.vetId === userData._id;
          });
        }

        await appointmentFilter.sort((a, b) => {
          return (a.date + a.hour).localeCompare(b.date + b.hour);
        });

        setAppointment({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchAppointment();
  }, [userData._id]);

  return (
    <div className="flex items-center justify-center pt-0 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <Loading />
      ) : (
        <div className="pb-20">
          <section className="mt-4 flex items-center justify-between mr-8 ml-8">
            <h2 className="noto-bold">Olá, {userData.name.split(" ")[0]}</h2>
            <div className="flex-shrink-0">
              <img
                className="h-20 w-20 rounded-full"
                src={userData.avatarUrl}
                alt="Avatar usuario"
              />
            </div>
          </section>

          <hr />
          <Link to="/vet/prontuario/61bb8f32d1222082035ac3d9">dasfafd</Link>
          {userData.role === "user" ? (
            <>
              <h1 className="mt-8 ml-8">Meus Pets</h1>

              <div className="ml-12 paw-container-right">
                <img alt="pata" className="paw-medium" src={pawImg} />
              </div>

              <Link to="/animal-create">
                <div className="h-16 mb-4 flex items-center card-container">
                  <div className="card-content flex items-center">
                    <div className="media items-center">
                      <div className="media-left">
                        <div className="img-radio">
                          <img src={addIcon} />
                        </div>
                      </div>
                      <div className="media-content">
                        <p className="noto-bold">Adicionar Pet</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {animalData.map((currentAnimal) => {
                return <AnimalCard key={currentAnimal.id} {...currentAnimal} />;
              })}

              <div className="ml-5 pt-1 paw-container-left">
                <img alt="pata" className="paw-medium" src={pawImg} />
              </div>

              <div className="mb-4 max-w-md w-full is-flex is-justify-content-center">
                <Link to="/vets-specialties">
                  <button className="btn salmon-btn">Agendar</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="mt-8 ml-8">Meus Agendamentos</h1>
              <div className="ml-12 paw-container-right">
                <img alt="pata" className="paw-small" src={pawImg} />
              </div>
              [Card com Foto, nome e dia da consulta marcada]
              {/*<AppointmentCard />*/}
              {/* {animalData.map((currentAnimal) => {
                return <AnimalCard key={currentAnimal.id} {...currentAnimal} />;
              })} */}
              <h1 className="mb-4 mt-8 ml-8">Meus Pacientes</h1>
              <div className="flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8 ">
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                  onChange={(event) => {
                    clearTimeout(timer);
                    let timer = setTimeout(
                      () => handleChange(event.target.value),
                      700
                    );
                  }}
                  type="text"
                  placeholder="Buscar paciente"
                />
                {listaFiltrada.map((currentAnimal) => {
                  return (
                    <Link
                      key={`filtered-${currentAnimal.id}`}
                      to={`/animal/detail/${currentAnimal.id}`}
                    >
                      <AnimalCard {...currentAnimal} />
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          <div className="flex items-center justify-center">
            <img
              alt="imagem inferior"
              className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
              src={telaBegeAzul}
            />
          </div>
        </div>
      )}
      <Navbar />
    </div>
  );
}

export default Dashboard;

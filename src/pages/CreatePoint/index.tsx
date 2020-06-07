import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  name: string;
  image_icon_url: string;
}

interface IBGE_FederalUnitData {
  sigla: string;
  nome: string;
}

interface City {
  id: number;
  name: string;
}

interface IBGE_CityData {
  id: number;
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [federalStates, setFederalStates] = useState<string[]>([]);
  const [selectedFederalUnit, setSelectedFederalUnit] = useState('0');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>();
  const [initialPosition, setInitialPosition] = useState<[number, number] | null>();

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get<IBGE_FederalUnitData[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(({ data: ibgeFederalUnits }) => {
        const federalUnitInitials = ibgeFederalUnits.map((unit) => unit.sigla);

        setFederalStates(federalUnitInitials.sort((unit_one, unit_two) => unit_one.localeCompare(unit_two)));
      });
  }, []);

  useEffect(() => {
    if (selectedFederalUnit === '0') return;
    axios.get<IBGE_CityData[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedFederalUnit}/municipios`)
      .then(({ data: ibgeCities }) => {
        setCities(ibgeCities.map((city) => ({
          id: city.id,
          name: city.nome,
        })));
      });
  }, [selectedFederalUnit]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  });

  const handleSelectedFederalUnit = (event: ChangeEvent<HTMLSelectElement>) => {
    const unit = event.target.value;
    setSelectedFederalUnit(unit);
  }

  const handleSelectedCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  }

  const handleMapClick = (event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  return (
    <div id="page-create-point">
      <header>
        <img alt="Ecoleta" src={logo} />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <fieldset>
          <legend><h2>Dados</h2></legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              id="name"
              name="name"
              type="text"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="text"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map
            center={initialPosition ? initialPosition : [-13.662969, -69.6444204]}
            zoom={initialPosition ? 15 : 3.2}
            onClick={handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition ? selectedPosition : [0, 0]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedFederalUnit} onChange={handleSelectedFederalUnit}>
                <option value="0">Selecione uma UF</option>
                {federalStates.map((federalState) => (
                  <option key={federalState} value={federalState}>{federalState}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de Coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item: Item) => (
              <li key={item.id}>
                <img alt={item.name} src={item.image_icon_url} />
                <span className="capitalize">{item.name}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastra ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;

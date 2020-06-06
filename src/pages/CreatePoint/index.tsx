import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logo from '../../assets/logo.svg';

const CreatePoint: React.FC = () => {
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

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
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
            <li>
              <img alt="Oil" src="http://localhost:3333/assets/oil.svg"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img alt="Oil" src="http://localhost:3333/assets/oil.svg"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img alt="Oil" src="http://localhost:3333/assets/oil.svg"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img alt="Oil" src="http://localhost:3333/assets/oil.svg"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img alt="Oil" src="http://localhost:3333/assets/oil.svg"/>
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img alt="Oil" src="http://localhost:3333/assets/oil.svg"/>
              <span>Óleo de Cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">Cadastra ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;

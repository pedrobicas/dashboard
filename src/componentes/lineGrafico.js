import React, { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Grafico = () => {

  const [chart, setChart] = useState([]);
  const [moeda, setMoeda] = useState('USD-BRL');
  const [dias, setDias] = useState('7');

  const botoes = [
    { name: '7 dias', value: '7' },
    { name: '15 dias', value: '15' },
    { name: '30 dias', value: '30' },
    { name: '1 ano', value: '365' },
  ];

  useEffect(() => {
    fetch(`https://economia.awesomeapi.com.br/json/daily/${moeda}/${dias}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setChart(json)
      })
  }, [dias, moeda])

  console.log(chart)

  const data = {
    labels: chart.slice(0).reverse().map(x => new Date(x.timestamp * 1000).toLocaleDateString("pt-BR")),
    datasets: [{
      label: moeda,
      data: chart.slice(0).reverse().map(x => x.ask),
      fill: true,
      tension: 0.3,
      backgroundColor: '#eaeaea',
      borderColor: '#FF0000',
    }]
  }

  const options = {
    plugins: {
      responsive: true,
      legend: { display: false },
    }
  }

  return (
    <div className="shadow rounded bg-white p-4" style={{ height: 700 }}>
      <div className="d-flex justify-content-between flex-wrap mb-5">
        <select defaultValue={moeda} onChange={(e) => { setMoeda(e.target.value) }}>
          <option value="USD-BRL">USD-BRL</option>
          <option value="EUR-BRL">EUR-BRL</option>
          <option value="USD-BRLT">USD-BRLT</option>
          <option value="CAD-BRL">CAD-BRL</option>
          <option value="ARS-BRL">ARS-BRL</option>
        </select>
        <ButtonGroup>
          {botoes.map((botao, idx) => (
            <ToggleButton
              size="sm"
              key={idx}
              id={`botao-${idx}`}
              type="radio"
              variant="outline-secondary"
              name="botao"
              value={botao.value}
              checked={dias === botao.value}
              onChange={(e) => setDias(e.currentTarget.value)}
              onClick={() => { setDias(botao.value) }}
            >
              {botao.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default Grafico;




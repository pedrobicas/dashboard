import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Grafico2 = () => {

  const [xv, setXV] = useState([]);
  const [yv, setVY] = useState([]);

  useEffect(() => {
    const fetchMoedas = () => {
      let xValues = []
      let yValues = []
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          let dados = json;
          var size = Object.keys(dados).length;
          console.log(size);
          for (let x in dados) {
            if (
              dados[x].code === "BTC" ||
              dados[x].code === "LTC" ||
              dados[x].code === "ETH" ||
              dados[x].code === "XRP" ||
              dados[x].code === "DOGE"
            ) {
              console.log(`!${dados[x].code}!`);
            } else {
              xValues.push(dados[x].name);
              yValues.push(dados[x].ask);
            }
          }
          setXV(xValues)
          setVY(yValues)
          console.log(xValues, yValues)
        })
    }
    fetchMoedas()
  }, [])

  const data = {
    labels: xv,
    datasets: [
      {
        backgroundColor: [
          "#b91d47",
          "#00aba9",
          "#2b5797",
          "#e8c3b9",
          "#1e7145",
          "#1ee145",
          "#000",
          "#dee2e6",
          "#8AE2F1",
          "#F7FB05",
          "#FBB912",
          "#FB0EEF",
          "#B8B8B8",
          "#2601FC",
          "#D399EC",
          "#FA0004",
        ],
        data: yv,
      },
    ],
  }

  const options = {
    aspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        // display: true,
        // text: "Grafico todas as moedas (não digitais)",
        responsive: true,
        legend: { display: false },
      }
    }
  }

  return (
    <div className="shadow rounded bg-white p-4" style={{height:700}} >
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Grafico2;




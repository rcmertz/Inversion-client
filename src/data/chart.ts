export const chartData = {
  labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  datasets: [
    {
      label: 'Semana atual',
      data: [20, 40, 10, 45, 60, 83, 78],
      backgroundColor: '#1C1C1C'
    },
    {
      label: 'Semana anterior',
      data: [30, 50, 4, 32, 40, 53, 72],
      backgroundColor: '#A8C5DA'
    },
  ],
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

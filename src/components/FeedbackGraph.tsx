import React from 'react';
import
  {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Feed
{
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  rate6: number;
  rate7: number;
  rate8: number;
  rate9: number;
  rate10: number;
  name: string;
  thoughts?: string;
}

interface FeedbackGraphProps
{
  onClose: () => void;
  teacher: Feed;
  questions: string[];
}

// function FeedbackGraph({ onClose, teacher, questions }: FeedbackGraphProps) 
const FeedbackGraph: React.FC<FeedbackGraphProps> = ({ onClose, teacher, questions }) =>
{
  const labels = questions;

  const data = {
    labels,
    datasets: [
      {
        label: 'Rating',
        data: labels.map((_, index) => teacher[`rate${index + 1}` as keyof Feed] as number),
        backgroundColor: 'rgba(54, 235, 72, 0.6)',
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Feedback Analysis - ${teacher.name}`,
        font: { size: 18 },
        color: '#333',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          font: { size: 12 },
        },
      },
      x: {
        ticks: {
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div className="graph-overlay">
      <div className="graph-modal">
        <button className="graph-close" onClick={onClose}>x</button>
        <div className="graph-content">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackGraph;

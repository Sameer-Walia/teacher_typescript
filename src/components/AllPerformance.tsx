import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Adminpanel from './admin/Adminpanel';

import
{
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ✅ Feed interface
interface Feed
{
  name: string;
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
  thoughts?: string;
}

function AllPerformance()
{
  const [allfeedbacks, setAllFeedbacks] = useState<Feed[]>([]);

  useEffect(() =>
  {
    getAllFeedbacks();
  }, []);

  useEffect(() =>
  {
    document.title = "All Performances";
  }, []);

  async function getAllFeedbacks()
  {
    try
    {
      const resp = await axios.get<{ statuscode: number; feedbacks?: Feed[] }>(`${process.env.REACT_APP_APIURL}/api/getallfeedbacks`);

      if (resp.data.statuscode === 1 && resp.data.feedbacks)
      {
        setAllFeedbacks(resp.data.feedbacks);
      }
      else if (resp.data.statuscode === 0)
      {
        setAllFeedbacks([]);
      }
      else
      {
        toast.error("Some Problem Occurred");
      }
    }
    catch (e: any)
    {
      toast.error("Error Occurred: " + e.message);
    }
  }

  // Group feedbacks by teacher name
  const grouped = allfeedbacks.reduce((acc: Record<string, Feed[]>, fb: Feed) =>
  {
    if (!acc[fb.name]) acc[fb.name] = [];
    acc[fb.name].push(fb);
    return acc;
  }, {} as Record<string, Feed[]>);

  // Calculate average for each teacher
  const labels = Object.keys(grouped);
  const averageRatings = labels.map(name =>
  {
    const feedbacks = grouped[name];
    let total = 0;
    let count = 0;

    feedbacks.forEach(fb =>
    {
      (Object.keys(fb) as (keyof Feed)[]).forEach(key =>
      {
        if (key.startsWith('rate'))
        {
          total += fb[key] as number;
          count++;
        }
      });
    });

    const avg = total / count;
    return parseFloat(avg.toFixed(2));
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Average Rating',
        data: averageRatings,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' as const },
      title: {
        display: true,
        text: 'Admin Performance Analysis Panel',
        font: { size: 22 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        title: { display: true, text: 'Rating', font: { size: 14 } },
        ticks: { stepSize: 0.5 }
      },
      x: {
        ticks: {
          maxRotation: 60,
          minRotation: 45,
          font: { size: 10 },
        },
        title: { display: true, text: 'Teachers', font: { size: 14 } },
      },
    },
  };

  return (
    <div>
      <Adminpanel />
      <div className='content1 pad'>
        <div className="chart-container" style={{ padding: '20px' }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AllPerformance;

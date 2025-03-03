
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const KMeansResults = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  
  // Cluster definitions with characteristic species and colors
  const clusterInfo = [
    {
      id: 0,
      color: "#FF5733",
      name: "Microcystis-Aphanocapsa Cluster",
      species: ["Aphanocapsa holsatica", "Microcystis aeruginosa", "Dolichospermum flos-aquae", 
                "Chroococcus limneticus", "Aphanocapsa planctonica"],
      description: "Late-summer dominant assemblage characterized by potentially toxic Microcystis species"
    },
    {
      id: 1,
      color: "#33FF57",
      name: "Dolichospermum-Spirulina Cluster", 
      species: ["Dolichospermum circinale", "Spirulina", "Aphanocapsa conferta", 
                "Chroococcus minutus", "Snowella lacustris"],
      description: "Nitrogen-fixing filamentous assemblage typically occurring in early-mid summer"
    },
    {
      id: 2,
      color: "#3357FF",
      name: "Microcystis-Cyanodictyon Cluster",
      species: ["Cyanophyte sp. & spp. & colony", "Microcystis wesenbergi", "Microcystis sp. & spp.",
                "Cyanodictyon imperfectum", "Cyanodictyon planctonica"],
      description: "Mid-season bloom assemblage dominated by colonial forms"
    },
    {
      id: 3,
      color: "#FF33A8",
      name: "Coelosphaerium-Planktothrix Cluster",
      species: ["Coelosphaerium subarcticum", "Unidentified Coccoids", "Chroococcus minutus",
                "Planktothrix agardhii", "Pseudanabaena sp."],
      description: "Rare assemblage with potential toxin producers (Planktothrix)"
    },
    {
      id: 4,
      color: "#FFD700",
      name: "Dolichospermum Complex Cluster",
      species: ["Dolichospermum lemmermannii", "Dolichospermum crassum", "Microcystis vindis",
                "Dolichospermum mendotae", "Aphanocapsa sp."],
      description: "Early-season nitrogen-fixing assemblage dominated by Dolichospermum species"
    },
    {
      id: 5,
      color: "#8A2BE2",
      name: "Merismopedia-Aphanizomenon Cluster",
      species: ["Merismopedia minima", "Coelosphaerium Kuetzingianum", "Chroococcus dispersus",
                "Microcystis flos aquae", "Aphanizomenon issatschenkoi"],
      description: "Common background assemblage with mixed morphological types"
    }
  ];

  // Prepare data for timeline visualization
  const timelineData = [
    { date: "2009-08-23", cluster: 5, year: 2009 },
    { date: "2011-06-26", cluster: 5, year: 2011 },
    { date: "2012-06-11", cluster: 5, year: 2012 },
    { date: "2012-08-05", cluster: 2, year: 2012 },
    { date: "2012-08-27", cluster: 2, year: 2012 },
    { date: "2012-10-28", cluster: 2, year: 2012 },
    { date: "2013-05-05", cluster: 2, year: 2013 },
    { date: "2013-06-16", cluster: 4, year: 2013 },
    { date: "2013-08-11", cluster: 2, year: 2013 },
    { date: "2013-09-22", cluster: 2, year: 2013 },
    { date: "2013-10-27", cluster: 2, year: 2013 },
    { date: "2014-05-18", cluster: 2, year: 2014 },
    { date: "2014-06-15", cluster: 2, year: 2014 },
    { date: "2014-07-13", cluster: 2, year: 2014 },
    { date: "2014-08-17", cluster: 2, year: 2014 },
    { date: "2014-09-14", cluster: 2, year: 2014 },
    { date: "2014-10-12", cluster: 2, year: 2014 },
    { date: "2015-05-17", cluster: 2, year: 2015 },
    { date: "2015-06-14", cluster: 2, year: 2015 },
    { date: "2015-07-13", cluster: 1, year: 2015 },
    { date: "2015-08-16", cluster: 2, year: 2015 },
    { date: "2015-09-13", cluster: 5, year: 2015 },
    { date: "2015-10-12", cluster: 5, year: 2015 },
    { date: "2016-05-15", cluster: 5, year: 2016 },
    { date: "2016-06-12", cluster: 5, year: 2016 },
    { date: "2016-07-17", cluster: 5, year: 2016 },
    { date: "2016-08-14", cluster: 5, year: 2016 },
    { date: "2016-09-18", cluster: 3, year: 2016 },
    { date: "2016-10-16", cluster: 5, year: 2016 },
    { date: "2017-05-15", cluster: 5, year: 2017 },
    { date: "2017-06-12", cluster: 5, year: 2017 },
    { date: "2017-07-10", cluster: 5, year: 2017 },
    { date: "2017-08-14", cluster: 0, year: 2017 },
    { date: "2017-09-11", cluster: 5, year: 2017 },
    { date: "2017-10-16", cluster: 5, year: 2017 },
    { date: "2018-05-15", cluster: 5, year: 2018 },
    { date: "2018-06-12", cluster: 5, year: 2018 },
    { date: "2018-07-17", cluster: 5, year: 2018 },
    { date: "2018-08-14", cluster: 0, year: 2018 },
    { date: "2018-09-11", cluster: 5, year: 2018 },
    { date: "2018-10-16", cluster: 5, year: 2018 },
    { date: "2019-05-14", cluster: 5, year: 2019 },
    { date: "2019-06-11", cluster: 5, year: 2019 },
    { date: "2019-07-16", cluster: 5, year: 2019 },
    { date: "2019-08-13", cluster: 0, year: 2019 },
    { date: "2019-09-17", cluster: 0, year: 2019 },
    { date: "2019-10-15", cluster: 0, year: 2019 },
    { date: "2020-05-12", cluster: 1, year: 2020 },
    { date: "2020-06-16", cluster: 4, year: 2020 },
    { date: "2020-07-14", cluster: 5, year: 2020 },
    { date: "2020-08-11", cluster: 5, year: 2020 },
    { date: "2020-09-15", cluster: 5, year: 2020 }
  ];

  // Data for yearly distribution of clusters
  const yearlyDistributionData = [
    { year: 2009, cluster0: 0, cluster1: 0, cluster2: 0, cluster3: 0, cluster4: 0, cluster5: 1 },
    { year: 2011, cluster0: 0, cluster1: 0, cluster2: 0, cluster3: 0, cluster4: 0, cluster5: 1 },
    { year: 2012, cluster0: 0, cluster1: 0, cluster2: 3, cluster3: 0, cluster4: 0, cluster5: 1 },
    { year: 2013, cluster0: 0, cluster1: 0, cluster2: 4, cluster3: 0, cluster4: 1, cluster5: 0 },
    { year: 2014, cluster0: 0, cluster1: 0, cluster2: 6, cluster3: 0, cluster4: 0, cluster5: 0 },
    { year: 2015, cluster0: 0, cluster1: 1, cluster2: 3, cluster3: 0, cluster4: 0, cluster5: 2 },
    { year: 2016, cluster0: 0, cluster1: 0, cluster2: 0, cluster3: 1, cluster4: 0, cluster5: 5 },
    { year: 2017, cluster0: 1, cluster1: 0, cluster2: 0, cluster3: 0, cluster4: 0, cluster5: 5 },
    { year: 2018, cluster0: 1, cluster1: 0, cluster2: 0, cluster3: 0, cluster4: 0, cluster5: 5 },
    { year: 2019, cluster0: 3, cluster1: 0, cluster2: 0, cluster3: 0, cluster4: 0, cluster5: 3 },
    { year: 2020, cluster0: 0, cluster1: 1, cluster2: 0, cluster3: 0, cluster4: 1, cluster5: 3 }
  ];

  // Data for monthly distribution of clusters
  const monthlyDistributionData = [
    { month: "May", cluster0: 0, cluster1: 1, cluster2: 3, cluster3: 0, cluster4: 0, cluster5: 4 },
    { month: "Jun", cluster0: 0, cluster1: 0, cluster2: 2, cluster3: 0, cluster4: 2, cluster5: 6 },
    { month: "Jul", cluster0: 0, cluster1: 1, cluster2: 1, cluster3: 0, cluster4: 0, cluster5: 5 },
    { month: "Aug", cluster0: 3, cluster1: 0, cluster2: 5, cluster3: 0, cluster4: 0, cluster5: 3 },
    { month: "Sep", cluster0: 1, cluster1: 0, cluster2: 2, cluster3: 1, cluster4: 0, cluster5: 4 },
    { month: "Oct", cluster0: 1, cluster1: 0, cluster2: 3, cluster3: 0, cluster4: 0, cluster5: 4 }
  ];

  // Helper function to format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  // Calculate cluster counts for the summary
  const clusterCounts = {
    0: timelineData.filter(d => d.cluster === 0).length,
    1: timelineData.filter(d => d.cluster === 1).length,
    2: timelineData.filter(d => d.cluster === 2).length,
    3: timelineData.filter(d => d.cluster === 3).length,
    4: timelineData.filter(d => d.cluster === 4).length,
    5: timelineData.filter(d => d.cluster === 5).length,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">K-means Clustering Analysis of Cyanobacteria Communities</h1>
      <p className="mb-4">
        Analysis of summer cyanobacteria biovolume data from 2009-2020 reveals 6 distinct community clusters
        with characteristic temporal patterns and dominant species.
      </p>
      
      {/* Tab navigation */}
      <div className="flex mb-6 border-b">
        <button 
          className={`px-4 py-2 ${activeTab === 'timeline' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          Temporal Pattern
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'yearly' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
          onClick={() => setActiveTab('yearly')}
        >
          Yearly Distribution
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'monthly' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly Distribution
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'clusters' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
          onClick={() => setActiveTab('clusters')}
        >
          Cluster Profiles
        </button>
      </div>
      
      {/* Timeline visualization */}
      {activeTab === 'timeline' && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Temporal Pattern of Cyanobacteria Community Clusters (2009-2020)</h2>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 65 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45} 
                  textAnchor="end"
                  height={80}
                  tickFormatter={formatDate}
                />
                <YAxis 
                  label={{ value: 'Cluster', angle: -90, position: 'insideLeft' }}
                  domain={[-0.5, 5.5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                />
                <Tooltip 
                  formatter={(value) => {
                    const cluster = clusterInfo.find(c => c.id === value);
                    return [cluster.name, 'Cluster'];
                  }}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="cluster" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  isAnimationActive={false}
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={6} 
                        fill={clusterInfo.find(c => c.id === payload.cluster).color} 
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Yearly distribution visualization */}
      {activeTab === 'yearly' && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Yearly Distribution of Cyanobacteria Community Clusters</h2>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={yearlyDistributionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                stackOffset="expand"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                <Tooltip 
                  formatter={(value, name) => {
                    const clusterId = parseInt(name.replace('cluster', ''));
                    return [`${value} samples (${clusterInfo.find(c => c.id === clusterId).name})`, 'Count'];
                  }}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Legend 
                  formatter={(value) => {
                    const clusterId = parseInt(value.replace('cluster', ''));
                    return `Cluster ${clusterId}: ${clusterInfo.find(c => c.id === clusterId).name}`;
                  }}
                />
                {clusterInfo.map(cluster => (
                  <Bar 
                    key={`cluster${cluster.id}`}
                    dataKey={`cluster${cluster.id}`} 
                    stackId="a" 
                    fill={cluster.color}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Monthly distribution visualization */}
      {activeTab === 'monthly' && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Monthly Distribution of Cyanobacteria Community Clusters</h2>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyDistributionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Number of Samples', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value, name) => {
                    const clusterId = parseInt(name.replace('cluster', ''));
                    return [`${value} samples (${clusterInfo.find(c => c.id === clusterId).name})`, 'Count'];
                  }}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend 
                  formatter={(value) => {
                    const clusterId = parseInt(value.replace('cluster', ''));
                    return `Cluster ${clusterId}: ${clusterInfo.find(c => c.id === clusterId).name}`;
                  }}
                />
                {clusterInfo.map(cluster => (
                  <Bar 
                    key={`cluster${cluster.id}`}
                    dataKey={`cluster${cluster.id}`}
                    fill={cluster.color}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Cluster profiles */}
      {activeTab === 'clusters' && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Cyanobacteria Community Cluster Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clusterInfo.map(cluster => (
              <div 
                key={cluster.id}
                className="border rounded-lg p-4 shadow-sm"
                style={{ borderLeftWidth: '4px', borderLeftColor: cluster.color }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Cluster {cluster.id}: {cluster.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {clusterCounts[cluster.id]} samples ({((clusterCounts[cluster.id] / timelineData.length) * 100).toFixed(1)}% of total)
                </p>
                <p className="mb-2">{cluster.description}</p>
                <h4 className="font-medium mb-1">Characteristic Species:</h4>
                <ul className="text-sm list-disc pl-5">
                  {cluster.species.map((species, index) => (
                    <li key={index}>{species}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Analysis Summary:</h3>
        <p>
          K-means clustering (k=6) identified distinct cyanobacterial community structures with clear temporal patterns.
          Cluster 5 (Merismopedia-Aphanizomenon) was the most common assemblage (50% of samples), 
          while Cluster 2 (Microcystis-Cyanodictyon) dominated during 2012-2015.
          Late summer periods (August-September) showed greater diversity in community types,
          including potentially harmful bloom-forming clusters (0 and 3).
        </p>
      </div>
    </div>
  );
};

export default KMeansResults;

import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Visualization = ({ data }) => {
  const [chartType, setChartType] = useState('line');
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (data && chartType === 'line') {
      createLineChart(data);
    }
  }, [data, chartType]);

  useEffect(() => {
    if (data && chartType === 'heatmap') {
      createHeatmap(data);
    }
  }, [data, chartType]);

  const createLineChart = (data) => {
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#line-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, width]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    const line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  };

  const createHeatmap = (data) => {
    if (!map) {
      const leafletMap = L.map('heatmap').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);
      setMap(leafletMap);
    } else {
      map.eachLayer((layer) => {
        if (layer instanceof L.HeatMap) {
          map.removeLayer(layer);
        }
      });
    }

    const heatmapLayer = L.heatMap(
      data.map(d => [parseFloat(d.lat), parseFloat(d.lon), parseFloat(d.value)])
    ).addTo(map);
  };

  return (
    <div>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="line">Line Chart</option>
        <option value="heatmap">Heatmap</option>
      </select>
      <svg id="line-chart"></svg>
      <div id="heatmap" style={{ height: '400px' }}></div>
    </div>
  );
};

export default Visualization;
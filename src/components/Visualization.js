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
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3.select('#line-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, width]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.temperature)])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.temperature));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  };

  const createHeatmap = (data) => {
    if (!map) {
      const newMap = L.map('heatmap').setView([34.0522, -118.2437], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(newMap);
      setMap(newMap);
    } else {
      map.eachLayer(layer => {
        if (layer instanceof L.HeatMap) {
          map.removeLayer(layer);
        }
      });
    }

    const heatmapLayer = new L.HeatMap(
      data.map(d => [d.latitude, d.longitude, d.temperature]),
      { radius: 25, blur: 15, maxZoom: 18 }
    ).addTo(map);
  };

  return (
    <div>
      <select value={chartType} onChange={e => setChartType(e.target.value)}>
        <option value="line">Line Chart</option>
        <option value="heatmap">Heatmap</option>
      </select>
      <svg id="line-chart"></svg>
      <div id="heatmap" style={{ height: '400px' }}></div>
    </div>
  );
};

export default Visualization;
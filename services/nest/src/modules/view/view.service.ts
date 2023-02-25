import { Injectable } from '@nestjs/common';
import d3 from 'd3';

@Injectable()
export class AdminService {

  async #fetchData(url: string) {
    const data = await fetch(url);
    return await data.json();
  }
/*
  async chartUsers() {
    const data = await this.#fetchData('/api/v1/users');

    const svgWidth = 500;
    const svgHeight = 500;
    const barPadding = 5;
    const barWidth = svgWidth / data.data.length;

    const svg = d3.select('svg');
    const width = svg.attr('width', svgWidth).attr('height', svgHeight);

    svg
      .selectAll('rect')
      .data(data.data)
      .enter()
      .append('rect')
      .attr('y', (d) => svgHeight - d)
      //.attr('height', (d) => d)
      .attr('width', () => barWidth - barPadding)
      .attr('transform', (d, i) => {
        const translate = [barWidth * i, 0];
        return `translate(${translate})`;
      })
      .style('fill', 'steelblue');
  }*/
}

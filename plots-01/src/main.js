// Simple JS file for figures.html

// We need the A-frame library.
// We asign the d3 object to a window property because
// aframe-scatterplot expects it as a global object.
import 'aframe';
import * as d3 from 'd3';
window.d3 = d3;
import 'aframe-scatterplot';

const cities = require('./cities.json');

// Require font files to have them included in dist
// const roboto_json = require ("./Roboto-msdf.json")
// const roboto_png = require ("./Roboto-msdf.png")

// Actual code for the application

function main() {
};

document.addEventListener('DOMContentLoaded', main);

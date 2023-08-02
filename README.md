# v-lock User Interface

What is v-lock ? v-lock is a belgian cooperative that provides services to municipalities for bicycle parkings. We deliver an application able to communicate with real, physical bicycle parkings and assure security and maintenance.

## User interface technicalities

This user interface was made with Qwik, a new framework based on resumability. The goal is to provide a fast user interface

## What else does this project include

This project implements two things that can be reused :

1. A form generator that takes a JSON object as input. The form generator can take instruction from an API for what data to ask from the user, and properties around the data (type, length, regex pattern, etc. ). The form generator includes validator.

2. A Map viewer with customizable layers, built on top of Leaflet. Leaflet is rendered client-side using useVisibleTask and is optimized to render as fast as possible. The map viewer can take objects of markers then display them on the map.

## To-do

1.  coalesce objects nearby when unzooming

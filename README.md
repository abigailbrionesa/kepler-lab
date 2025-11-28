![Screenshot](/public/hero.png)

<samp>

# KeplerLab - Asteroid Creator

<p>
An interactive, GPU-accelerated <strong>3D web application</strong> that lets users explore the orbits of over <strong>32,000 asteroids and planets</strong> in real-time.
Built with <a href="https://threejs.org/" target="_blank">Three.js</a>, this tool leverages orbital data from
<strong>NASA's Jet Propulsion Laboratory Small-Body Database</strong> to provide a physics-accurate space simulation.
</p>
˚　　　　✦　　　.　　. 🪐　 ˚　.　　　　 　　.　　　　　　 ✦　　　.　　˚　🌒　　　　. ✦ 　🌍
　　.  　 　　　˚　　　　　*　　 　　✦　　　.　　.　　　✦　　˚ 　　　 　　˚　.　*　　. 　˚　　.

## Topic Rationale

We chose this topic to make complex orbital mechanics accessible and engaging for a non-technical audience. Our goal is to answer the question: "How do small changes in an asteroid's orbit affect its path through the solar system, and what is the potential impact on Earth?" By visualizing these concepts, we hope to foster a greater understanding of planetary defense and the importance of tracking Near-Earth Objects (NEOs).

## 𝙵𝚎𝚊𝚝𝚞𝚛𝚎𝚜

<ul>
  <li>
    <strong>Real-time 3D Visualization</strong><br>
    Explore thousands of asteroid orbits rendered in WebGL with sub-60ms frame updates.
  </li>
  <li>
    <strong>Keplerian Control</strong><br>
    Manipulate six Keplerian parameters (<code>a</code>, <code>e</code>, <code>i</code>, <code>Ω</code>, <code>ω</code>, <code>M</code>) and observe how orbits change dynamically.
  </li>
  <li>
    <strong>Scalable Performance</strong><br>
    Handles tens of thousands of orbiting bodies with GPU acceleration using efficient rendering pipelines.
  </li>
</ul>

## 𝙻𝚒𝚟𝚎 D𝚎𝚖𝚘

<p>
🔗 <a href="https://keplerlab.vercel.app/" target="_blank">Deployed on Vercel</a>
</p>

## Data Sourcing and Openness

This project uses data from the **NASA JPL Small-Body Database Query**, which is a publicly available and open-source dataset. We are committed to using open data to ensure transparency and reproducibility.

## 𝚃𝚎𝚌𝚑 𝚂𝚝𝚊𝚌𝚔

<ul>
  <li><strong>Frontend:</strong> Three.js, React, JavaScript (ES6+), WebGL. We chose this stack for its high-performance 3D rendering capabilities. Three.js/WebGL allows for GPU-accelerated rendering, which is essential for visualizing tens of thousands of bodies in real-time. React provides a robust framework for building a dynamic and interactive user interface.</li>
  <li><strong>Database:</strong> NASA JPL Small-Body Database Query.</li>
</ul>

</samp>
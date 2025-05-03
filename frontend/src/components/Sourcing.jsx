import React from 'react';
import './Sourcing.css';

const suppliers = [
  { name: 'TamilNadu', percent: 85 },
  { name: 'China', percent: 50 },
  { name: 'Taiwan', percent: 45 },
  { name: 'Sri Lanka', percent: 70 }
];

const Sourcing = () => {
  return (
    <div className="sourcing-container">
      <div className="left-section">
        <div className="title">
          <p>OUR SUPPLIERS</p>
          <h1>Sourcing</h1>
        </div>
        <div className="bars">
          {suppliers.map((supplier, index) => (
            <div key={index} className="bar-row">
              <span className="label">{supplier.name}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ animation: `fillBar ${supplier.percent / 100 + 1}s ease-out forwards`, width: `${supplier.percent}%` }}
                ></div>
              </div>
              <span className="percent">{supplier.percent}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="right-section">
        <img src="/img/sourcing.jpg" alt="Sourcing Visual" />
      </div>
    </div>
  );
};

export default Sourcing;

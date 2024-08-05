import { useState } from 'react';

function About() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-4xl font-bold">About</h1>
      <div className="my-5 p-5 flex gap-4">
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <div className="text-lg">Count : {count}</div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-grow flex-col gap-3">
          <div className="text-4xl font-bold">Text Size 1</div>
          <div className="text-3xl font-bold">Text Size 2</div>
          <div className="text-2xl font-bold">Text Size 3</div>
          <div className="text-xl font-bold">Text Size 4</div>
          <div className="text-lg font-bold">Text Size 5</div>
          <div className="text-sm font-bold">Text Size 6</div>
          <div className="text-xs font-bold">Text Size 7</div>
        </div>
        <ul className="steps steps-vertical">
          <li className="step step-primary">Step 1</li>
          <li className="step step-primary">Step 2</li>
          <li className="step">Step 3</li> <li className="step">Step 4</li>
        </ul>
      </div>

      <div className="my-4 flex gap-2">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-warning">Warning</button>
        <button className="btn btn-error">Error</button>
        <button className="btn btn-success">Success</button>
        <button className="btn btn-info">Info</button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="md:w-1/2">
            <div className="tabs tabs-lifted">
              <button className="tab">Tab</button>
              <button className="tab tab-active">Tab</button>
              <button className="tab">Tab</button>
            </div>
            <div className="flex flex-col">
              <span className="link">I'm a simple link</span>
              <span className="link link-primary">I'm a simple link</span>
              <span className="link link-secondary">I'm a simple link</span>
              <span className="link link-accent">I'm a simple link</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:w-1/2">
            <progress value="20" max="100" className="progress">
              Default
            </progress>
            <progress
              value="25"
              max="100"
              className="progress progress-primary"
            >
              Primary
            </progress>
            <progress
              value="30"
              max="100"
              className="progress progress-secondary"
            >
              Secondary
            </progress>
            <progress value="40" max="100" className="progress progress-accent">
              Accent
            </progress>
            <progress value="45" max="100" className="progress progress-info">
              Info
            </progress>
            <progress
              value="55"
              max="100"
              className="progress progress-success"
            >
              Success
            </progress>
            <progress
              value="70"
              max="100"
              className="progress progress-warning"
            >
              Warning
            </progress>
            <progress value="90" max="100" className="progress progress-error">
              Error
            </progress>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="stats bg-base-300 border-base-300 border md:w-1/2">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:w-1/2">
            <div className="radial-progress">60%</div>
            <div className="radial-progress">75%</div>
            <div className="radial-progress">90%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

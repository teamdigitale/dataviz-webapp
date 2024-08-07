import { useState } from 'react';

function About() {
  const [count, setCount] = useState(0);

  const faqs = [
    {
      id: 1,
      question: 'What is skishu?',
      answer: 'Skishu is you divinity...',
    },
    {
      id: 2,
      question: 'Shamalaya?',
      answer: 'Yes we can ....',
    },

    {
      id: 3,
      question: 'Who am I?',
      answer: 'Roots of creation...',
    },
  ];

  return (
    <div className="">
      <h1 className="text-4xl font-bold">About</h1>
      <div className="my-5 p-5 flex gap-4">
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <div className="text-lg">Count : {count}</div>
      </div>

      <div className="space-y-2 mb-10 container max-w-xl">
        <h2 className="text-4xl font-bold">FAQS</h2>
        {faqs.map((faq) => (
          <details
            className="group [&_summary::-webkit-details-marker]:hidden"
            key={faq.id}
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg  p-4  bg-accent text-accent-content">
              <h2 className="font-medium">{faq.question}</h2>

              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <p className="mt-4 px-4 leading-relaxed text-content">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="flex flex-grow flex-col gap-3">
        <div className="text-4xl font-bold">Text Size 1</div>
        <div className="text-3xl font-bold">Text Size 2</div>
        <div className="text-2xl font-bold">Text Size 3</div>
        <div className="text-xl font-bold">Text Size 4</div>
        <div className="text-lg font-bold">Text Size 5</div>
        <div className="text-sm font-bold">Text Size 6</div>
        <div className="text-xs font-bold">Text Size 7</div>
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

      <div className="flex flex-col my-5">
        <span className="link">I'm a simple link</span>
        <span className="link link-primary">I'm a simple link</span>
        <span className="link link-secondary">I'm a simple link</span>
        <span className="link link-accent">I'm a simple link</span>
      </div>

      <div className="my-5">
        <ul className="steps steps-vertical">
          <li className="step step-primary">Step 1</li>
          <li className="step step-primary">Step 2</li>
          <li className="step">Step 3</li>
          <li className="step">Step 4</li>
        </ul>
      </div>

      <div className="my-5">
        <div className="stats bg-base-300 border-base-300 border shadow">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="stats shadow my-10">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-primary">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

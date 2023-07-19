import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function PaddingRight({}){
  return (<div className={clsx('col col--2')}>

  </div>);
}

function IntroBody({}){
  return (
    <div className={clsx('col col--8')}>
      <div className='text--left padding-horiz--md'>
      Immerse yourself in a groundbreaking project that merges the captivating beauty of ferrofluids with the power of your mind. Explore the mesmerizing world of ferrofluids, where magnetic particles create fluidic patterns that dance in vibrant colors.
<br></br>
<br></br>
With the OpenBCI EEG headset, we tap into your brain's electrical signals, translating them into commands for an Arduino-controlled electromagnet. As your thoughts and mental states change, the magnetic field responds in real-time, allowing you to shape and manipulate the ferrofluids with astonishing precision.
<br></br>
<br></br>
Unleash your creative potential and witness the convergence of science, technology, and art. Sculpt mesmerizing patterns, guide fluid movements, and bring your mental landscape to life like never before. Join us on this mind-bending adventure as we share tutorials, insights, and mind-controlled ferrofluid demonstrations.
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div> */}
        <h1 className='text--center'> Control Ferrofluids with Your Mind</h1>
        <div className='row'>
          <PaddingRight/>
            <IntroBody />
        </div>
      </div>
    </section>
  );
}

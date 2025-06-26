import React from 'react';
// import Header from '../components/header/header';
// import LeftNav from '../components/LeftNav/leftnav';
import './dashboardmain.scss';
// import Footer from '../components/footer/footer';

const DashboardMain = ({ children }) => {
  return (
    <>
      <main className={`mainSection fullPage`}>
        <div className='mainLayout'>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { customprop: '' })
          )}
          <div className="innerPadding pt-0 pb-4">
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardMain;
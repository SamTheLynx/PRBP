import React, { useState } from "react";
import Logo from "./assets/Pakistan Gov Logo2.png"

const Footer = () => {
    return(
        <footer className="bg-custom-blue pt-10">
  <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-center items-center text-white">
    <div className="mb-8 lg:mb-0 lg:w-1/2 flex justify-center">
      <img src={Logo} className="h-32" alt="Government Emblem" />
    </div>
    
    <div className="lg:w-1/3 flex flex-col lg:flex-row text-center lg:text-left">
      <div className="mb-8 lg:mb-0 lg:px-4">
        <h2 className="mb-4 text-lg font-semibold text-white">Important Links</h2>
        <ul className="space-y-2">
          <li><a href="https://punjabpolice.gov.pk/" target="_blank" rel="noopener noreferrer" className="hover:underline text-white">Police Clearance</a></li>
          <li><a href="https://pfa.gop.pk/" target="_blank" rel="noopener noreferrer"className="hover:underline text-white">Punjab Food Authority</a></li>
          <li><a href="https://lahore-mc.punjab.gov.pk/" target="_blank" rel="noopener noreferrer"className="hover:underline text-white">Municipal Corporation Lahore</a></li>
          <li><a href="https://lda.gop.pk/website/" target="_blank" rel="noopener noreferrer"className="hover:underline text-white">Lahore Development Authority</a></li>
          <li><a href="https://www.punjab.gov.pk/provincialdepartments_labour" target="_blank" rel="noopener noreferrer"className="hover:underline text-white">Department of Labour</a></li>
          <li><a href="https://pessi.punjab.gov.pk/" target="_blank" rel="noopener noreferrer"className="hover:underline text-white">Punjab Employees Social Security Institution</a></li>
          <li><a href="https://dhalahore.org/" target="_blank" rel="noopener noreferrer"className="hover:underline text-white">DHA & Cantonment Board</a></li>
          <li><a href="https://lahore.cantonment.gov.pk/en" target="_blank" rel="noopener noreferrer"className="hover:underline text-white">Cantonment Board</a></li>
        </ul>
      </div>

      <div className="lg:px-4">
        <h2 className="mb-4 text-lg font-semibold text-white">Support</h2>
        <ul className="space-y-2">
          <li><a href="/procedure" className="hover:underline text-white">Application Procedure</a></li>
          <li><a href="/contact" className="hover:underline text-white">Contact us</a></li>
          <li><a href="/about" className="hover:underline text-white">About us</a></li>
          
        </ul>
      </div>
    </div>
  </div>

            <div className="bg-super-dark-blue mt-5">
                <div className="max-w-screen-xl mx-auto py-1 text-center">
                <span className="text-slate-200">Copyright © 2023 Pakistan Restaurant Business Portal, Government of Pakistan.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
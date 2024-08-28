import React, { useState } from "react";
import Logo from "./assets/Pakistan Gov Logo2.png"

const Footer = () => {
    return(
        <footer class="bg-custom-blue pt-10 mt-100">
            <div class="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-center items-center text-white">
                <div class="mb-8 lg:mb-0 lg:w-1/2 flex justify-center">
                <img src={Logo} class="h-32" alt="Government Emblem" />
                </div>
                
                <div class="lg:w-1/3 flex flex-col lg:flex-row text-center lg:text-left">
                <div class="mb-8 lg:mb-0 lg:px-4">
                    <h2 class="mb-4 text-lg font-semibold text-white">Important Links</h2>
                    <ul class="space-y-2">
                    <li><a href="#" class="hover:underline text-white">Police Khidmat Markaz</a></li>
                    <li><a href="#" class="hover:underline text-white">Punjab Food Authority</a></li>
                    <li><a href="#" class="hover:underline text-white">Lahore Development Authority</a></li>
                    <li><a href="#" class="hover:underline text-white">Pakistan Environmental Protection Agency</a></li>
                    <li><a href="#" class="hover:underline text-white">Municipal Corporation Lahore</a></li>
                    <li><a href="#" class="hover:underline text-white">Department of Labour</a></li>
                    <li><a href="#" class="hover:underline text-white">Punjab Employees Social Security Institution</a></li>
                    <li><a href="#" class="hover:underline text-white">Defence Housing Authority</a></li>
                    <li><a href="#" class="hover:underline text-white">Cantonment Board</a></li>
                    </ul>
                </div>

                <div class="lg:px-4">
                    <h2 class="mb-4 text-lg font-semibold text-white">Support</h2>
                    <ul class="space-y-2">
                    <li><a href="#" class="hover:underline text-white">Application Procedure</a></li>
                    <li><a href="#" class="hover:underline text-white">Contact us</a></li>
                    <li><a href="#" class="hover:underline text-white">About us</a></li>
                    <li><a href="#" class="hover:underline text-white">FAQs</a></li>
                    </ul>
                </div>
                </div>
            </div>

            <div class="bg-super-dark-blue mt-5">
                <div class="max-w-screen-xl mx-auto py-1 text-center">
                <span class="text-slate-200">Copyright © 2023 Pakistan Restaurant Business Portal, Government of Pakistan.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
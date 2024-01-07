"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { CustomButton } from ".";
import Link from "next/link";
import { City } from "country-state-city";

const Hero = () => {
  const [isCityDialogVisible, setCityDialogVisibility] = React.useState(false);
  const [isSalaryDialogVisible, setSalaryDialogVisibility] =
    React.useState(false);
  const [dialogWidth, setDialogWidth] = React.useState(0);
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedSalary, setSelectedSalary] = React.useState("");
  const [isOverlayVisible, setOverlayVisibility] = React.useState(false);
  const [filteredCities, setFilteredCities] = React.useState<string[]>([]);
  const [filteredSalaries, setFilteredSalaries] = React.useState<string[]>([]);
  const initialCities = ["All", "Da Nang", "Ha Noi", "Ho Chi Minh"];
  const initialSalaries = [
    "All",
    "1 - 10 million VND",
    "10 - 20 million VND",
    "More than 20 million VND",
  ];

  const handleScroll = () => {};

  const handleCityClick = () => {
    setCityDialogVisibility(true);
    setOverlayVisibility(true); // Toggle overlay visibility

    // Get the width of the input field for cities
    const inputCityElement = document.getElementById("inputCity");
    if (inputCityElement) {
      const inputCityWidth = inputCityElement.offsetWidth;

      // Set the width of the city dialog
      setDialogWidth(inputCityWidth);

      // Set the initial list of cities when the dialog is opened
      setFilteredCities(initialCities);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityDialogVisibility(false);
    setOverlayVisibility(false); // Hide overlay on city select
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;

    // Filter the cities based on the input value
    const filtered = initialCities.filter((city) =>
      city.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredCities(filtered);
    setSelectedCity(inputValue);
  };

  const handleOverlayClick = () => {
    setCityDialogVisibility(false);
    setSalaryDialogVisibility(false);
    setOverlayVisibility(false);
  };

  const handleSalaryClick = () => {
    setSalaryDialogVisibility(true);
    setOverlayVisibility(true); // Toggle overlay visibility

    // Get the width of the input field for salary
    const inputSalaryElement = document.getElementById("inputSalary");
    if (inputSalaryElement) {
      const inputSalaryWidth = inputSalaryElement.offsetWidth;

      // Set the width of the salary dialog
      setDialogWidth(inputSalaryWidth);

      // Set the initial list of salary options when the dialog is opened
      setFilteredSalaries(initialSalaries);
    }
  };

  const handleSalarySelect = (salary: string) => {
    setSelectedSalary(salary);
    setSalaryDialogVisibility(false);
    setOverlayVisibility(false);
  };

  const handleSalaryInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;

    // Filter the salary options based on the input value
    const filtered = initialSalaries.filter((salary) =>
      salary.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredSalaries(filtered);
    setSelectedSalary(inputValue);
  };

  return (
    <div className="Hero">
      <div className="mt-28 padding-x">
        <div
          className="hero__container-0 flex flex-col justify-between items-center pt-4 pb-10 padding-x -mb-8 bg-green rounded-t-3xl"
          style={{ height: "200px" }}
        >
          <h1 className="text-[2.5vw] font-normal text-white mt-3">
            Find newest jobs, best location, and the most suitable salary
          </h1>

          <div className="search__container flex flex-row justify-between items-center mb-3">
            <div className="py-3 pl-7 pr-14 bg-gray-300 rounded-xl mr-2">
              <input
                className="search__keyword bg-gray-300 focus:outline-none"
                placeholder="Keyword"
                type="text"
              />
            </div>

            <div className="flex flex-col rounded-xl mx-2 z-10">
              <div className="position-relative">
                <input
                  id="inputCity"
                  className="search__keyword py-3 px-7 bg-gray-300 rounded-xl focus:outline-none"
                  placeholder="Cities"
                  type="text"
                  value={selectedCity}
                  onClick={handleCityClick}
                  onChange={handleInputChange}
                />
                {isCityDialogVisible && (
                  <div
                    className="city-dialog fixed bg-white p-2 border rounded-xl mt-2"
                    style={{ width: `${dialogWidth}px` }}
                  >
                    {filteredCities.map((city) => (
                      <p key={city} onClick={() => handleCitySelect(city)}>
                        {city}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col rounded-xl mx-2 z-10">
              <div className="position-relative">
                <input
                  id="inputSalary"
                  className="search__keyword py-3 px-7 bg-gray-300 rounded-xl focus:outline-none"
                  placeholder="Salary"
                  type="text"
                  value={selectedSalary}
                  onClick={handleSalaryClick}
                  onChange={handleSalaryInputChange}
                />
                {isSalaryDialogVisible && (
                  <div
                    className="salary-dialog fixed bg-white p-2 border rounded-xl mt-2"
                    style={{ width: `${dialogWidth}px` }}
                  >
                    {filteredSalaries.map((salary) => (
                      <p
                        key={salary}
                        onClick={() => handleSalarySelect(salary)}
                      >
                        {salary}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Link
              href={{
                pathname: "./joblist",
                query: {
                  city: selectedCity ? selectedCity : "All",
                  salary: selectedSalary ? selectedSalary : "%",
                },
              }}
            >
              <div
                className="py-3 px-7 flex flex-row justify-between items-center bg-red rounded-xl ml-2 cursor-pointer"
                style={{ width: "135px" }}
              >
                <img src="/iconSearch.svg" />
                <b className="text-white">Search</b>
              </div>
            </Link>
          </div>
        </div>
        <div className="hero__container-1 flex flex-row justify-between items-center padding-y  padding-x mt-2 bg-light-green rounded-3xl">
          <div className="flex-1">
            <h1 className="hero__title text-red">Expand network</h1>
            <h1 className="hero__title text-green">Explore your potential</h1>
            <p className="hero__subtitle">
              Where to find your career prospect? How to communicate between
              employee and employer
            </p>
            <div className="flex flex-row space-x-3 mt-2">
              <Link href="./auth/login">
                <CustomButton
                  title="Login"
                  containerStyles="bg-green text-white min-w-[153px] mt-10"
                />
              </Link>
              <CustomButton
                title="About us"
                containerStyles="bg-red text-white min-w-[153px] mt-10"
                handleClick={handleScroll}
              />
            </div>
          </div>

          <div
            className="hero__image"
            style={{
              width: "35vw",
              height: "20vw",
              borderRadius: "25px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/hero.png"
              alt="hero"
              layout="fill"
              objectFit="cover"
              className="object-contain"
            />
          </div>
        </div>

        {isOverlayVisible && (
          <div
            className="overlay"
            onClick={handleOverlayClick}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Grey color with 50% opacity
              zIndex: 8, // Ensure the overlay is behind the dialog (z-index: 10)
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;

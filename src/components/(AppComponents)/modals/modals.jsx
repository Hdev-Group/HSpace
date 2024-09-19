"use client"
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Label } from "../../ui/label";
import { api } from "../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react"

export function EditProfileModal({ closeModal, useridentify, user }) {
  const getuserdata = useQuery(api.users.user, { id: useridentify });
  const saveapi = useMutation(api.users.update);
  console.log(getuserdata);
  const User = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    title: "",
    country: "",
    postcode: "",
    city: "",
    countryLabel: "",
    username: "",
  });

  const options = countryList().getData().map(country => ({
    label: country.label,
    value: country.value,
  }));

  useEffect(() => {
    if (getuserdata) {
      setFormData({
        firstName: getuserdata.name?.split(' ')[0] || "",
        surname: getuserdata.name?.split(' ')[1] || "",
        title: getuserdata.title || "",
        country: getuserdata.country || "",
        postcode: getuserdata.postcode || "",
        city: getuserdata.city || "",
        countryLabel: getuserdata.countryLabel || "",
        username: user?.userdetails.username || "",
      });
    }
  }, [getuserdata, user]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (e) => {
      if (e.target.id === 'outerclickclose') {
        closeModal();
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [closeModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name && value !== undefined) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, country: selectedOption.label, countryLabel: selectedOption.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const titlemax = document.getElementById('titlemax');
    if (formData.title.length > 210) {
      titlemax.classList.add('text-red-500');
      titlemax.classList.remove('text-gray-300');
      titlemax.innerText = 'Max 210 characters';
      setIsLoading(false);
      return;
    } else if (formData.title.length < 210) {
      titlemax.classList.remove('text-red-500');
      titlemax.classList.add('text-gray-300');
      titlemax.innerText = '';
    }

    if (User.user.id === useridentify) {
      try {
        const firstnameuser = formData.firstName;
        const surnameuser = formData.surname;
        const parameters = {firstName: firstnameuser, lastName: surnameuser, userId: useridentify, username: formData.username};
        fetch('/api/updateuser', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parameters),
        });
        await saveapi({
          id: getuserdata._id,
          data: {
            name: `${formData.firstName} ${formData.surname}`,
            title: formData.title,
            country: formData.country,
            postcode: formData.postcode,
            city: formData.city,
            countryLabel: formData.countryLabel,
          },
        });
        closeModal();
    } catch (error) {
      console.error('Failed to save data:', error);
    } finally {
      setIsLoading(false);
    }
  } else {
    return alert('You are not authorized to edit this profile');
  }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center" id='outerclickclose'>
      <div className="bg-gray-800 border-gray-50/10 border w-full md:w-1/2 h-full md:max-h-[60vh] md:mt-[60px] rounded-md flex flex-col" id='innercloser'>
        <div className=" flex justify-start flex-col h-full w-full ">
          <div className="flex flex-col justify-between items-start ">
            <div className="flex flex-row justify-between w-full items-center px-4 py-3">
              <div>
                <h2 className="text-xl font-medium text-white">Edit Profile</h2>
              </div>
              <button
                className="bg-primary-500 text-white px-3.5 py-1.5 rounded-md hover:bg-red-500/20 hover:border-red-500 border transition-all"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <div className="w-full border-t border-gray-50/20" />
          </div>
          <div className="flex flex-col px-4 gap-4 pb-9 mt-4 overflow-y-auto h-full">
            <h1 className="font-semibold text-lg">Information</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300" 
                    onChange={handleInputChange} 
                    value={formData.firstName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <input 
                    id="surname" 
                    name="surname" 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300" 
                    onChange={handleInputChange} 
                    value={formData.surname}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col space-y-2 relative holderatter">
                <Label htmlFor="username">Username</Label>
                <span class="input-prefix">@</span>
                <Input 
                  id="usernamer" 
                  name="username" 
                  className="border border-neutral-300 pl-7 input-field flex items-center justify-center" 
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Textarea 
                  id="title" 
                  name="title" 
                  className="border border-neutral-300" 
                  onChange={handleInputChange}
                  value={formData.title}
                />
                <p id="titlemax" className="text-sm text-gray-300"></p>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg mt-5">Location</h1>
                <div className="flex flex-col gap-0.5">
                  <label className="text-sm text-gray-300">Country/Region</label>
                  <Select
                    options={options}
                    value={options.find(option => option.value === formData.countryLabel)}
                    onChange={handleSelectChange}
                    placeholder="Select a country..."
                    isSearchable
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: 'transparent',
                        borderColor: '#D1D5DB',
                        color: 'white',
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: 'white',
                      }),
                      input: (provided) => ({
                        ...provided,
                        color: 'white',
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: '#333',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#666' : '#333',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#555',
                        },
                      }),
                    }}
                  />
                </div>
              </div>
          </div>
          <div className="flex flex-row justify-end w-full items-center px-4 py-3 border-t border-gray-50/20">
            <button
              className="bg-blue-500 text-white px-4 py-1 text-[17px] rounded-md hover:bg-blue-600/20 hover:border-blue-600 border transition-all"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

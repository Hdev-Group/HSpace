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
import {
  Accordion,
  AccordionHeader,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
    linkedin: "",
    twitter: "",
    github: "",
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
        linkedin: getuserdata.linkedin || "",
        twitter: getuserdata.twitter || "",
        github: getuserdata.github || "",
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
            linkedin: formData.linkedin,
            twitter: formData.twitter,
            github: formData.github,
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
    <div className="fixed inset-0 z-50 bg-[#181D27] bg-opacity-50 flex justify-center" id='outerclickclose'>
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
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-lg mt-5">Socials</h1>
                <div className="flex flex-col gap-0.5 holdatter relative">
                  <label className="text-sm text-gray-300">Linkedin</label>                
                  <span class="input-prefix mt-2">linkedin.com/in/</span>
                  <Input 
                    id="linkedin" 
                    name="linkedin" 
                    className="border border-neutral-300 pl-[125px] input-fielder flex items-center justify-center" 
                    onChange={handleInputChange} 
                    value={formData.linkedin}
                  />
                </div>
                <div className="flex flex-col gap-0.5 holdatter relative">
                  <label className="text-sm text-gray-300">Twitter</label>
                  <span class="input-prefix mt-2">x.com/</span>
                  <Input 
                    id="twitter" 
                    name="twitter" 
                    className="border border-neutral-300  pl-[60px] input-fielder flex items-center justify-center" 
                    onChange={handleInputChange} 
                    value={formData.twitter}
                  />
                </div>
                <div className="flex flex-col gap-0.5 holdatter relative">
                  <label className="text-sm text-gray-300">Github</label>
                  <span class="input-prefix mt-2">github.com/</span>
                  <Input 
                    id="github" 
                    name="github" 
                    className="border border-neutral-300 pl-[97px] input-fielder flex items-center justify-center" 
                    onChange={handleInputChange} 
                    value={formData.github}
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


export function EditProfileSectionsModal({ closeModal }) {
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

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#181D27] bg-opacity-50 flex justify-center transition-opacity ease-in-out duration-300" 
      id="outerclickclose" 
      aria-modal="true" 
      role="dialog"
    >
      <div 
        className="bg-gray-800 border-gray-50/10 border w-full md:w-1/3 md:min-w-[40rem] mt-10 h-min rounded-md flex flex-col overflow-hidden animate-fadeIn" 
        id="innercloser"
        role="document"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-50/20">
          <h2 className="text-xl font-medium text-white">Edit Sections</h2>
          <button
            className="bg-primary-500 text-white px-3.5 py-1.5 rounded-md hover:bg-red-500/20 hover:border-red-500 border transition-all focus:outline-none"
            onClick={closeModal}
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-4  overflow-y-auto h-full">
          <Accordion type="single" className="border-b 0" collapsible>
            <AccordionItem value="main" className="border-b border-gray-50/20">
              <AccordionTrigger className="font-semibold text-lg px-4">Main</AccordionTrigger>
              <AccordionContent className="pb-[8px] px-4">
                <p className="mb-3 text-neutral-300 text-md ">Start with the basics. These sections will help you get discovered.</p>
                <ul className="flex flex-col gap-4">
                  <li className="border-b text-neutral-400 border-gray-50/20 pb-2 font-semibold text-[15px]">
                    Add About
                  </li>
                  <li className="border-b text-neutral-400 border-gray-50/20 pb-2 font-semibold text-[15px]">
                    Add Work
                  </li>
                  <li className="font-semibold text-[15px] text-neutral-400">
                    Add Skills
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="recommended">
              <AccordionTrigger className="font-semibold text-lg px-4">Recommended</AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <p className="mb-3 text-neutral-300 text-md ">Add these sections to showcase your work and interests.</p>
                <ul className="flex flex-col gap-4">
                  <li className="border-b border-gray-50/20 pb-2 font-semibold text-[15px]">
                    Add Projects
                  </li>
                  <li className="border-b border-gray-50/20 pb-2 font-semibold text-[15px]">
                    Add Education
                  </li>
                  <li className="font-semibold text-[15px]">
                    Add Certifications
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}  

export function EditAboutSection({ closeModal }) {
  const [skillinput, setSkillInputter] = useState('');
  const [skills, setSkills] = useState([]);
  console.log(skills);


  useEffect(() => {
    const skillinputter = document.getElementById('skillinputter');
  
    const handleKeyDown = (e) => {
      const inputValue = skillinputter.value.trim();
      if (e.key === 'Enter' || e.key === ',') {
        if (inputValue === '') return;
        setSkills(prevSkills => [...prevSkills, inputValue]);
        skillinputter.value = '';
      }
    };
  
    skillinputter.addEventListener('keydown', handleKeyDown);
  
    return () => {
      skillinputter.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSkills]);


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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Skills:', skills);
    console.log("About:", document.getElementById('about').value);

    // Save data to the database

  };


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center" id='outerclickclose'>
      <div className="bg-[#181D27] border-gray-50/10 border w-full md:w-1/2 h-full md:max-h-[60vh] md:mt-[60px] rounded-md flex flex-col" id='innercloser'>
        <div className=" flex justify-start flex-col h-full w-full ">
          <div className="flex flex-col justify-between items-start ">
            <div className="flex flex-row justify-between w-full items-center px-4 py-3">
              <div>
                <h2 className="text-xl font-medium text-white">Edit Section</h2>
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
          <div className="flex flex-col gap-6 h-full justify-start">
            <div className="flex flex-col px-4 gap-4 mt-4 h-auto">
              <h1 className="font-semibold text-lg">About</h1>
              <div className="flex flex-col gap-4">
                  <div className="w-full">
                    <Textarea
                      id="about"
                      name="about"
                      className="border w-full border-neutral-300"
                      placeholder="Write a short bio about yourself..."
                    />
                  </div>
                </div>
            </div>
            <div className="flex flex-col px-4 gap-4  h-full">
              <h1 className="font-semibold text-lg">Skills</h1>
              <div className="flex flex-col gap-4">
                  <div className="space-y-4 w-full">
                    <div className="flex flex-row flex-wrap justify-start gap-2 items-center">
                      {skills.map((skill, index) => (
                        <div key={index} onClick={() => setSkills(skills.filter((_, i) => i !== index))} className="flex hover:bg-red-800 border px-2 border-white py-0.5 rounded-lg cursor-pointer transition-all flex-row justify-between items-center w-auto">
                          <p className="text-sm text-gray-300">{skill}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <Input
                        type="text"
                        id="skillinputter"
                        className="w-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-neutral-300"
                        placeholder="Add a skill..."
                      />
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="flex flex-row justify-end w-full items-center px-4 py-3 border-t border-gray-50/20">
            <button
              className="dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-1.5 text-[17px] rounded-md  transition-all"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
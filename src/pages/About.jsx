import React from 'react'
import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar/NavBar';

const About = () => {
     const { profile } = useSelector((state) => state?.userData);
  return (
    <div className=" bg-primary min-h-screen flex flex-col text-text ">
      <NavBar profile={profile} />
      <div className="p-4 tracking-wider leading-8 space-y-10">
        <div>
          <h1 className=" text-lg md:text-xl font-bold duration-200 hover:blur-[1px] cursor-pointer">
            About the project
          </h1>
          <p className="mt-2 font-medium">
            OutLast - Crowdsourced Travel Itinerary Planner is a web platform
            revolutionizing travel planning. Users create, customize, and share
            itineraries with suggestions from a community of travelers.
            Personalized recommendations, collaborative editing, and user
            ratings enhance the planning process. The platform offers a
            user-friendly interface, responsive design, and social engagement
            features. It simplifies travel planning, provides authentic local
            insights, and fosters a vibrant community for sharing experiences
            and discovering new destinations.
          </p>
        </div>
        <div className="mt-4 space-y-3 border-t border-border pt-10">
          <h1 className=" text-lg md:text-xl font-bold duration-200 hover:blur-[1px] cursor-pointer">
            Meet the team
          </h1>
          <div className="space-y-3 ">
            <p className="font-semibold">
              UI/UX: <span className="font-medium">Himanshu Suthar & Mittal Suthar</span>
            </p>
            <p className="font-semibold">
              Full Stack: <span className="font-medium">Himanshu Suthar , Aadarsh Jha & Rohit Singh</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
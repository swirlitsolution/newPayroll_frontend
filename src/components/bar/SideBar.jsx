import { NavLink } from "react-router-dom";
import { useEffect } from 'react';
import { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { AuthContext } from '../../AuthContext';
import TopBar from "./TopBar";
import { CopyPlus, FileStack, FileSymlink, House, KeyIcon, Menu, Settings, UserSearch } from "lucide-react";

const adminroutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <House />,
  },
  {
    path: "/master-file",
    name: "Master",
    icon: <KeyIcon />,
    subRoutes: [
        {
          path: "/employeelist",
          name: "Employee",
          icon: <UserSearch />,
        },  
       
      ],
  },
  {
    path: "/trasaction-file",
    name: "Transaction",
    icon: <CopyPlus />,
    subRoutes: [
        {
          path: "/attendance",
          name: "Attendance",
          icon: <UserSearch />,
        },   
        {
          path: "/transfer",
          name: "Transfer",
          icon: <UserSearch />,
        },
       
        {
          path: "/adminprocessattendance",
          name: "Process Attend",
          icon: <FileSymlink />,
        },
        {
          path: "/recal",
          name: "Recal Payroll",
          icon: <FileSymlink />,
        },
        {
          path: "/newleave",
          name: "leave",
          icon: <FileSymlink />,
        },
      ],
  },
  {
    path: "/trasaction-file",
    name: "Report",
    icon: <FileStack />,
    subRoutes: [
        {
          path: "/attendancereport",
          name: "Attendance",
          icon: <FileSymlink />,
        }, 
        
        {
          path: "/payroll",
          name: "Payroll",
          icon: <UserSearch />,
        },   
        {
          path: "/leave",
          name: "Leave",
          icon: <UserSearch />,
        }, 
        {
          path: "/bonus",
          name: "Bonus",
          icon: <UserSearch />,
        }, 
        {
          path: "/permitreport",
          name: "Permit Report",
          icon: <FileSymlink />,
        }, 
        {
          path: "/transferlog",
          name: "Transfer Logs",
          icon: <UserSearch />,
        },
      ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <Settings />
    ,
  },
  // {
  //   path: "/file-manager",
  //   name: "File Manager",
  //   icon: <AiTwotoneFileExclamation />,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  // {
  //   path: "/order",
  //   name: "Order",
  //   icon: <BsCartCheck />,
  // },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  // {
  //   path: "/saved",
  //   name: "Saved",
  //   icon: <AiFillHeart />,
  // },
];

const users = [
  {
    path: "/",
    name: "Dashboard",
    icon: <House />,
  },
  {
    path: "/trasaction-file",
    name: "Transaction",
    icon: <CopyPlus />,
    subRoutes: [
        {
          path: "/attendance",
          name: "Attendance",
          icon: <UserSearch />,
        },  
        {
          path: "/transfer",
          name: "Transfer",
          icon: <UserSearch />,
        },
       
        {
          path: "/processattendance",
          name: "Process Attend",
          icon: <FileSymlink />,
        },
        {
          path: "/recal",
          name: "Recal Payroll",
          icon: <FileSymlink />,
        },
        {
          path: "/newleave",
          name: "leave",
          icon: <FileSymlink />,
        },
      ],
  },
  {
    path: "/trasaction-file",
    name: "Report",
    icon: <FileStack />,
    subRoutes: [
        {
          path: "/attendancereport",
          name: "Attendance",
          icon: <FileSymlink />,
        },   
        {
          path: "/permitreport",
          name: "Permit Report",
          icon: <FileSymlink />,
        }, 
        {
          path: "/transferlog",
          name: "Transfer Logs",
          icon: <UserSearch />,
        },
      ],
  },
]

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {user } = useContext(AuthContext);
  const [routes,setRoutes] = useState([])
 
//   const inputAnimation = {
//     hidden: {
//       width: 0,
//       padding: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     show: {
//       width: "140px",
//       padding: "5px 15px",
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  useEffect(() => {

    const renderroute = ()=>{
      if(user){

        if(user.is_superuser){
          setRoutes(adminroutes)
        }
        else{
          setRoutes(users)
        }
        }
       
      }
    

    // Check if the window width is less than a certain value to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600); // You can adjust the threshold value
    };

    // Initial check on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);
    renderroute()
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [user]);



  return (
    <>
      <div className="main-container " key="main-container">
    {/* isMobile?(isOpen?30%:10%):isOpen?20%:5% */}
        <motion.div
          animate={{
            width: isOpen ?(isMobile? "40%":"20%") : (isMobile?"10%":"5%"),

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          key="sidebar"
          className={`sidebar w-full h-screen`}
        >
          <div key="top_section" className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1 
                key="esolution"
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo xsm:hidden md:block"
                >
                  E Solution
                </motion.h1>
              )}
            </AnimatePresence>

            <div key="bar" className="bars">
              <Menu  onClick={toggle} />
            </div>
          </div>
         
          <section className="routes" key="routes">
         
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index + "0"}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <motion.main 
        animate={{
            width: isOpen ?(isMobile? "60%":"80%") : (isMobile?"90%":"95%"),

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
        className="h-screen">
        <TopBar />
        <div className="h-[90%] md:h-[90%] xsm:h-[80%] overflow-auto">
        {children}
        </div>
        </motion.main>
      </div>
    </>
  );
};

export default SideBar;
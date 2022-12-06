import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import styles from "./projects.module.css";

export default function Projetcs({ AuthContext }) {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuth = async () => {
    try {
      const allCookies = document.cookie.split(";");
      for (let item of allCookies) {
        if (item.startsWith("token=")) {
          localStorage.setItem("token", item.slice(6));
          break;
        }
      }
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": localStorage.getItem("token"),
        },
      });
      const result = await res.json();
      result === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteHandler = async (project_id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/dashboard/image-processing/${project_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);
      const projects = await getProjects();
      setProjects(projects);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { "Content-Type": "application/json", "jwt-token": token },
      });
      const user = await res.json();
      console.log(user);
      return user;
    } catch (error) {
      console.error(error.message);
    }
  };

  const getProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/dashboard/image-processing",
        {
          method: "GET",
          headers: { "Content-Type": "application/json", "jwt-token": token },
        }
      );
      const projects = await res.json();
      console.log(projects);
      return projects;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getData = async (e) => {
    const result = await isAuth();
    if (!result) {
      router.push("/auth/login");
    } else {
      const user = await getUser();
      setUser(user);
      const projects = await getProjects();
      setProjects(projects);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   isAuth();
  // }, []);

  useEffect(() => {
    getData();
  }, [isAuthenticated]);

  if (loading || !projects) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{`${user.username}'s Projects`}</h1>
        <a
          className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white py-2 px-4 border border-[#0050f3] -500 hover:border-transparent rounded m-4"
          href={`/image-processing/new-project`}
        >
          New Project
        </a>
        <div className={styles.grid}>
          {projects.length !== 0 &&
            projects.map((project) => {
              const { project_name, id } = project;
              return (
                <button
                  onClick={() =>
                    router.push(`/image-processing/project-detail/${id}`)
                  }
                  className={styles.card}
                  key={project_name}
                >
                  <div className="flex justify-between items-center">
                    <p>{project_name} &rarr;</p>
                    <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHandler(id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </button>
              );
            })}
        </div>
      </main>
    </div>
  );
}

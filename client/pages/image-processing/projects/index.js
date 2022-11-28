import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import styles from "./projects.module.css";

export default function Projetcs({ AuthContext }) {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  const isAuth = async () => {
    const res = await fetch("http://localhost:5000/auth/is-verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": localStorage.getItem("token"),
      },
    });
    const result = await res.json();
    result === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  };

  useEffect(() => {
    isAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated]);



  const projectData = [
    {
      name: "Project 1",
      link: "project_id",
    },
    {
      name: "Project 2",
      link: "/project_id",
    },
    {
      name: "Project 3",
      link: "/project_id",
    },
    {
      name: "Project 4",
      link: "/project_id",
    },
  ];

  const router = useRouter();

  const [projects, setProjects] = useState(projectData);
  const [totalProjects, setTotalProjects] = useState(projectData.length + 1);

  const addProjectHandler = () => {
    setTotalProjects(totalProjects + 1);
    setProjects((projects) => [
      ...projects,
      {
        name: `Project ${totalProjects}`,
        link: "/project_id",
      },
    ]);
    router.push("/image-processing/project-detail/project");
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{name} Projects</h1>
        <button
          className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white py-2 px-4 border border-[#0050f3] -500 hover:border-transparent rounded m-4"
          onClick={addProjectHandler}
        >
          New Project
        </button>
        <div className={styles.grid}>
          {projects.map((item, index) => {
            return (
              <Link
                href={`/image-processing/project-detail/${index + 1}`}
                className={styles.card}
                key={item.name}
              >
                <p>{item.name} &rarr;</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

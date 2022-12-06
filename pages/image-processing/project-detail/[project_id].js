import e from "cors";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import styles from "./project-detail.module.css";

export default function Projects({ AuthContext }) {
  const router = useRouter();

  console.log(router);
  const {
    query: { project_id },
  } = router;
  console.log(project_id);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [inputs, setInputs] = useState(null);
  // const [inputs, setInputs] = useState({
  //   inputLayer: {
  //     image_size: "",
  //     examples: "",
  //   },
  //   convoLayers: {
  //     convo2D: {
  //       in_channel: "",
  //       out_channel: "",
  //       kernel_size: "",
  //       stride: "",
  //       padding: "",
  //     },
  //     convoT2D: {
  //       in_channel: "",
  //       out_channel: "",
  //       kernel_size: "",
  //       stride: "",
  //       padding: "",
  //     },
  //   },
  //   activationLayer: {
  //     relu: "",
  //     leaky_relu: "",
  //     signoid: "",
  //     tanh: "",
  //     sofmax: "",
  //   },
  //   poolingLayer: {
  //     maxPool: {
  //       kernel_size: "",
  //       stride: "",
  //       padding: "",
  //     },
  //     averagePool: {
  //       kernel_size: "",
  //       stride: "",
  //       padding: "",
  //     },
  //   },
  // });

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
      console.log("result", result);
      result === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/dashboard/image-processing/project-details/${project_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "jwt-token": token,
            project_id,
          },
        }
      );
      const data = await res.json();
      console.log("Fetching Project info");
      console.log(data);
      setInputs(data);
      console.log("Fetched project info");
    } catch (err) {
      console.error(err.message);
    }
  };

  // const getUser = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch("http://localhost:5000/dashboard", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json", "jwt-token": token },
  //     });
  //     const user = await res.json();
  //     console.log(user);
  //     setUser(user);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const checkAuth = async () => {
    const result = await isAuth();
    if (result) {
      if (router.isReady) {
        getProject();
      } else {
        return;
      }
    } else {
      router.push("/auth/login");
    }
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(inputs);
      const body = inputs;
      console.log(project_id);
      body.project_id = project_id;
      console.log("About to send a patch request");
      const res = await fetch(
        `http://localhost:5000/dashboard/image-processing/project-details/${project_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      console.log(data);
      router.push("/image-processing/projects");
    } catch (err) {
      console.log("Error occurred while sending data to backend");
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [router.isReady]);

  const [showInput, setShowInput] = useState(false);
  const [showConvL, setShowConvL] = useState(false);
  const [showConvL2D, setShowConvL2D] = useState(false);
  const [showConvLT2D, setShowConvLT2D] = useState(false);
  const [showActL, setShowActL] = useState(false);
  const [showPadL, setShowPadL] = useState(false);
  const [showPoolMax, setShowPoolMax] = useState(false);
  const [showPoolAvT2D, setShowPoolAvT2D] = useState(false);

  const [layers, setLayers] = useState([
    {
      name: "Input",
      value: "value",
    },
  ]);

  const title = "";

  const addHandler = (title) => {
    setLayers((layers) => [...layers, { name: `${title}`, value: "value" }]);
  };

  if (!inputs) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{`${
          inputs.username && inputs.username.username
        }'s ${inputs.username && inputs.projectName.project_name}`}</h1>
        <div className={`${styles.grid} + mb-9`}>
          <div className={styles.card}>
            <h2 onClick={() => setShowInput(!showInput)}>
              Input Layer <span className={"text-sm"}>&#9698;</span>
            </h2>
            {showInput && (
              <div>
                <div>
                  <label
                    htmlFor="image_size"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Image Size
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    id="image_size"
                    name="image_size"
                    value={inputs.inputLayer.image_size}
                    onChange={(e) => {
                      const { inputLayer } = inputs;
                      setInputs({
                        ...inputs,
                        inputLayer: {
                          ...inputLayer,
                          [e.target.name]: parseInt(e.target.value),
                        },
                      });
                      console.log(inputs);
                    }}
                    className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor="examples"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No. of Examples
                  </label>
                  <input
                    type="number"
                    value={inputs.inputLayer.examples}
                    name="examples"
                    id="examples"
                    onChange={(e) => {
                      const { inputLayer } = inputs;
                      setInputs({
                        ...inputs,
                        inputLayer: {
                          ...inputLayer,
                          [e.target.name]: parseInt(e.target.value),
                        },
                      });
                      console.log(inputs);
                    }}
                    min={"0"}
                    className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
                  />
                </div>
                <button
                  className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white py-2 px-4 border border-[#0050f3] -500 hover:border-transparent rounded my-2 px-7 mb-4 ml-40"
                  onClick={() => addHandler("Input")}
                >
                  Add
                </button>
              </div>
            )}
          </div>
          <div className={styles.card}>
            <h2 onClick={() => setShowConvL(!showConvL)}>
              Convolution Layers <span className={"text-sm"}>&#9698;</span>
            </h2>
            {showConvL && (
              <>
                <div className={styles.card3}>
                  <h3
                    onClick={() => {
                      setShowConvLT2D(true);
                      setShowConvL2D(true);
                    }}
                  >
                    Convolution 2D <span className={"text-sm"}>&#9698;</span>
                  </h3>
                  {showConvL2D && (
                    <div className="grid gap-x-4 md:grid-cols-2">
                      <div className="my-3">
                        <label
                          htmlFor="in_channel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          In Channel
                        </label>
                        <input
                          type="number"
                          id="in_channel"
                          min={"0"}
                          name="in_channel"
                          value={inputs.convoLayers.convo2D.in_channel}
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convo2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convo2D: {
                                  ...convo2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                        />
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="out_channel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Out Channel
                        </label>
                        <input
                          min={"0"}
                          type="number"
                          id="out_channel"
                          name="out_channel"
                          value={inputs.convoLayers.convo2D.out_channel}
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convo2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convo2D: {
                                  ...convo2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="kernel_size"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Kernel Size
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          id="kernel_size"
                          name="kernel_size"
                          value={inputs.convoLayers.convo2D.kernel_size}
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convo2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convo2D: {
                                  ...convo2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="stride"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Stride
                        </label>
                        <input
                          type="number"
                          id="stride"
                          min={"0"}
                          name="stride"
                          value={inputs.convoLayers.convo2D.stride}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convo2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convo2D: {
                                  ...convo2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="small-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Padding
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          name="padding"
                          value={inputs.convoLayers.convo2D.padding}
                          id="small-input"
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convo2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convo2D: {
                                  ...convo2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <button
                        className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4"
                        onClick={() => addHandler("2D Convolution")}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.card3}>
                  <h3
                    onClick={() => {
                      setShowConvLT2D(true);
                      setShowConvL2D(false);
                    }}
                  >
                    Convolution Transpose 2D{" "}
                    <span className={"text-sm"}>&#9698;</span>
                  </h3>
                  {showConvLT2D && (
                    <div className="grid gap-x-4 md:grid-cols-2">
                      <div className="my-3">
                        <label
                          htmlFor="input-channel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          In Channel
                        </label>
                        <input
                          min={"0"}
                          type="number"
                          id="input-channel"
                          name="in_channel"
                          value={inputs.convoLayers.convoT2D.in_channel}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convoT2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convoT2D: {
                                  ...convoT2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="output-channel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Out Channel
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          id="output-channel"
                          name="out_channel"
                          value={inputs.convoLayers.convoT2D.out_channel}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convoT2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convoT2D: {
                                  ...convoT2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="kernel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Kernel Size
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          id="kernel"
                          name="kernel_size"
                          value={inputs.convoLayers.convoT2D.kernel_size}
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convoT2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convoT2D: {
                                  ...convoT2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="stride"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Stride
                        </label>
                        <input
                          type="number"
                          name="stride"
                          value={inputs.convoLayers.convoT2D.stride}
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convoT2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convoT2D: {
                                  ...convoT2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          min={"0"}
                          id="stride"
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="small-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Padding
                        </label>
                        <input
                          type="number"
                          id="small-input"
                          value={inputs.convoLayers.convoT2D.padding}
                          name="padding"
                          onChange={(e) => {
                            const {
                              convoLayers,
                              convoLayers: { convoT2D },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              convoLayers: {
                                ...convoLayers,
                                convoT2D: {
                                  ...convoT2D,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          min={"0"}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                        />
                      </div>
                      <button
                        className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4"
                        onClick={() => addHandler("2D Convolution Transpose")}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className={styles.card}>
            <h2 onClick={() => setShowActL(!showActL)}>
              Activation Layer <span className={"text-sm"}>&#9698;</span>
            </h2>
            {showActL && (
              <div className="grid gap-x-4 md:grid-cols-2">
                <div className="my-3">
                  <label
                    htmlFor="relu"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ReLU
                  </label>
                  <input
                    type="number"
                    min={"0"}
                    name="relu"
                    id="relu"
                    value={inputs.activationLayer.relu}
                    onChange={(e) => {
                      const { activationLayer } = inputs;
                      setInputs({
                        ...inputs,
                        activationLayer: {
                          ...activationLayer,
                          [e.target.name]: parseInt(e.target.value),
                        },
                      });
                    }}
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                  />
                </div>
                <div className="my-3">
                  <label
                    htmlFor="leaky_relu"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Leaky ReLU
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    id="leaky_relu"
                    name="leaky_relu"
                    value={inputs.activationLayer.leaky_relu}
                    onChange={(e) => {
                      const { activationLayer } = inputs;
                      setInputs({
                        ...inputs,
                        activationLayer: {
                          ...activationLayer,
                          [e.target.name]: parseInt(e.target.value),
                        },
                      });
                    }}
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                  />
                </div>
                <div className="my-0">
                  <label
                    htmlFor="signoid"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Signoid
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    name="signoid"
                    id="signoid"
                    value={inputs.activationLayer.signoid}
                    onChange={(e) => {
                      const { activationLayer } = inputs;
                      setInputs({
                        ...inputs,
                        activationLayer: {
                          ...activationLayer,
                          [e.target.name]: parseInt(e.target.value),
                        },
                      });
                    }}
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                  />
                </div>
                <div className="my-0">
                  <label
                    htmlFor="tanh"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    TanH
                  </label>
                  <input
                    type="number"
                    min={"0"}
                    id="tanh"
                    name="tanh"
                    value={inputs.activationLayer.tanh}
                    onChange={(e) => {
                      const { activationLayer } = inputs;
                      setInputs({
                        ...inputs,
                        activationLayer: {
                          ...activationLayer,
                          [e.target.name]: parseInt(e.target.value),
                        },
                      });
                    }}
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                  />
                </div>
                <div className="my-0">
                  <label
                    htmlFor="sofmax"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sofmax
                  </label>
                  <input
                    type="number"
                    name="sofmax"
                    min={"0"}
                    id="sofmax"
                    value={inputs.activationLayer.sofmax}
                    onChange={(e) => {
                      const { activationLayer } = inputs;
                      setInputs({
                        ...inputs,
                        activationLayer: {
                          ...activationLayer,
                          [e.target.name]: parseInt(e.target.value),
                        },
                      });
                    }}
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                  />
                </div>
                <button
                  className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4"
                  onClick={() => addHandler("Active")}
                >
                  Add
                </button>
              </div>
            )}
          </div>
          <div className={styles.card}>
            <h2 onClick={() => setShowPadL(!showPadL)}>
              Pooling Layer <span className={"text-sm"}>&#9698;</span>
            </h2>
            {showPadL && (
              <>
                <div className={styles.card3}>
                  <h3
                    onClick={() => {
                      setShowPoolAvT2D(true);
                      setShowPoolMax(true);
                    }}
                  >
                    Maxpool 2D <span className={"text-sm"}>&#9698;</span>
                  </h3>
                  {showPoolMax && (
                    <div className="grid gap-x-4 md:grid-cols-2">
                      <div className="my-0">
                        <label
                          htmlFor="kernel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Kernel Size
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          id="kernel"
                          value={inputs.poolingLayer.maxPool.kernel_size}
                          name="kernel_size"
                          onChange={(e) => {
                            const {
                              poolingLayer,
                              poolingLayer: { maxPool },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              poolingLayer: {
                                ...poolingLayer,
                                maxPool: {
                                  ...maxPool,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="stride"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Stride
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          id="stride"
                          value={inputs.poolingLayer.maxPool.stride}
                          name="stride"
                          onChange={(e) => {
                            const {
                              poolingLayer,
                              poolingLayer: { maxPool },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              poolingLayer: {
                                ...poolingLayer,
                                maxPool: {
                                  ...maxPool,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="small-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Padding
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          id="small-input"
                          value={inputs.poolingLayer.maxPool.padding}
                          name="padding"
                          onChange={(e) => {
                            const {
                              poolingLayer,
                              poolingLayer: { maxPool },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              poolingLayer: {
                                ...poolingLayer,
                                maxPool: {
                                  ...maxPool,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                        />
                      </div>
                      <button
                        className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4"
                        onClick={() => addHandler("MaxPool")}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
                <div className={styles.card3}>
                  <h3
                    onClick={() => {
                      setShowPoolAvT2D(true);
                      setShowPoolMax(true);
                    }}
                  >
                    AveragePool 2D <span className={"text-sm"}>&#9698;</span>
                  </h3>
                  {showPoolAvT2D && (
                    <div className="grid gap-x-4 md:grid-cols-2">
                      <div className="my-0">
                        <label
                          htmlFor="kernel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Kernel Size
                        </label>
                        <input
                          value={inputs.poolingLayer.averagePool.kernel_size}
                          type="number"
                          min={"0"}
                          id="kernel"
                          name="kernel_size"
                          onChange={(e) => {
                            const {
                              poolingLayer,
                              poolingLayer: { averagePool },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              poolingLayer: {
                                ...poolingLayer,
                                averagePool: {
                                  ...averagePool,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="stride"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Stride
                        </label>
                        <input
                          value={inputs.poolingLayer.averagePool.stride}
                          type="number"
                          min={"0"}
                          id="stride"
                          name="stride"
                          onChange={(e) => {
                            const {
                              poolingLayer,
                              poolingLayer: { averagePool },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              poolingLayer: {
                                ...poolingLayer,
                                averagePool: {
                                  ...averagePool,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                        />
                      </div>
                      <div className="my-0">
                        <label
                          htmlFor="small-input"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Padding
                        </label>
                        <input
                          value={inputs.poolingLayer.averagePool.padding}
                          min={"0"}
                          type="number"
                          id="small-input"
                          name="padding"
                          onChange={(e) => {
                            const {
                              poolingLayer,
                              poolingLayer: { averagePool },
                            } = inputs;
                            setInputs({
                              ...inputs,
                              poolingLayer: {
                                ...poolingLayer,
                                averagePool: {
                                  ...averagePool,
                                  [e.target.name]: parseInt(e.target.value),
                                },
                              },
                            });
                          }}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                        />
                      </div>
                      <button
                        className="bg-transparent hover:bg-[#0050f3] -500 text-[#0050f3] -700 font-semibold hover:text-white border border-[#0050f3] -500 hover:border-transparent rounded mt-7 p-2 mb-4"
                        onClick={() => addHandler("AveragePool")}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* <div className="absolute bottom-10">
          <div className={styles.card2}>
            <h1 className="text-xl font-bold my-4">Layer Architecture</h1>
            {layers.slice(1).map((item) => {
              return (
                <span>
                  <button className="bg-[#0050f3] hover:bg-[#0050f3] -500 text-white -700 font-semibold hover:text-[#0050f3] py-2 px-6 border border-[#0050f3] -500 hover:bg-transparent rounded my-2">
                    {item.name}
                  </button>
                  <span className="text-3xl">&#8212;</span>
                </span>
              );
            })}
          </div>
        </div> */}
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <div class="form-group mb-6">
            <label
              for="exampleInputEmail1"
              class="form-label inline-block mb-2 text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              value={inputs.projectName && inputs.projectName.project_name}
              onChange={(e) => setProjectName(e.target.value)}
              class="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Project Name"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              class="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
              onClick={submitHandler}
            >
              Update
            </button>
            <button
              type="submit"
              class="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
              onClick={() => router.push("/image-processing/projects")}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

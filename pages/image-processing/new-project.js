import e from "cors";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import styles from "./project-detail/project-detail.module.css";

export default function Projects({ AuthContext }) {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [projectName, setProjectName] = useState("");
  const [inputs, setInputs] = useState({
    inputLayer: {
      imageSize: 1,
      examples: 2,
    },
    convoLayers: {
      convo2D: {
        inChannel: 3,
        outChannel: 4,
        kernelSize: 5,
        stride: 6,
        padding: 7,
      },
      convoT2D: {
        inChannel: 8,
        outChannel: 9,
        kernelSize: 10,
        stride: 11,
        padding: 12,
      },
    },
    activationLayer: {
      reLU: 13,
      leakyReLU: 14,
      signoid: 15,
      tanH: 16,
      sofmax: 17,
    },
    poolingLayer: {
      maxPool: {
        kernelSize: 18,
        stride: 19,
        padding: 20,
      },
      averagePool: {
        kernelSize: 21,
        stride: 22,
        padding: 23,
      },
    },
  });
  const router = useRouter();

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

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { "Content-Type": "application/json", "jwt-token": token },
      });
      const user = await res.json();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkAuth = async () => {
    const result = await isAuth();
    if (result) {
      getUser();
    } else {
      router.push("/auth/login");
    }
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(inputs);
      console.log(projectName);
      const body = inputs;
      body.projectName = projectName;
      body.user = user;
      const res = await fetch("http://localhost:5000/submit/image-processing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
      router.push("/image-processing/projects");
    } catch (err) {
      console.log("Error occurred while sending data to backend");
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>New Project</h1>
        <div className={`${styles.grid} + mb-9`}>
          <div className={styles.card}>
            <h2 onClick={() => setShowInput(!showInput)}>
              Input Layer <span className={"text-sm"}>&#9698;</span>
            </h2>
            {showInput && (
              <div>
                <div>
                  <label
                    htmlFor="imageSize"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Image Size
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    id="imageSize"
                    name="imageSize"
                    value={inputs.inputLayer.imageSize}
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
                          htmlFor="inChannel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          In Channel
                        </label>
                        <input
                          type="number"
                          id="inChannel"
                          min={"0"}
                          name="inChannel"
                          value={inputs.convoLayers.convo2D.inChannel}
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
                          htmlFor="outChannel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Out Channel
                        </label>
                        <input
                          min={"0"}
                          type="number"
                          id="outChannel"
                          name="outChannel"
                          value={inputs.convoLayers.convo2D.outChannel}
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
                          htmlFor="kernelSize"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Kernel Size
                        </label>
                        <input
                          type="number"
                          min={"0"}
                          id="kernelSize"
                          name="kernelSize"
                          value={inputs.convoLayers.convo2D.kernelSize}
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
                          name="inChannel"
                          value={inputs.convoLayers.convoT2D.inChannel}
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
                          name="outChannel"
                          value={inputs.convoLayers.convoT2D.outChannel}
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
                          name="kernelSize"
                          value={inputs.convoLayers.convoT2D.kernelSize}
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
                    htmlFor="reLU"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ReLU
                  </label>
                  <input
                    type="number"
                    min={"0"}
                    name="reLU"
                    id="reLU"
                    value={inputs.activationLayer.reLU}
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
                    htmlFor="leakyReLU"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Leaky ReLU
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    id="leakyReLU"
                    name="leakyReLU"
                    value={inputs.activationLayer.leakyReLU}
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
                    htmlFor="tanH"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    TanH
                  </label>
                  <input
                    type="number"
                    min={"0"}
                    id="tanH"
                    name="tanH"
                    value={inputs.activationLayer.tanH}
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
                          value={inputs.poolingLayer.maxPool.kernelSize}
                          name="kernelSize"
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
                          value={inputs.poolingLayer.averagePool.kernelSize}
                          type="number"
                          min={"0"}
                          id="kernel"
                          name="kernelSize"
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
              value={projectName}
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
            Save Project
          </button>
        </div>
      </main>
    </div>  
  );
}

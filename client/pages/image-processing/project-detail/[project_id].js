import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import styles from "./project-detail.module.css";
import sampleData from "./data";
import { isJsxFragment, setTextRange } from "typescript";

export default function Projects({ AuthContext }) {
  const router = useRouter();

  console.log(router.query.project_id);
  const [id, setId] = useState(null);
  console.log(id + "front");
  const [foundProject, setFoundProject] = useState(
    sampleData.find((data) => data.id === Number(id))
  );

  console.log(foundProject);
  //   useEffect(() => {
  //     // setId(router.query.project_id);
  //     if (!router.isReady) return;
  //     console.log("bye")
  //     setFoundProject(sampleData.find(data => data.id === parseInt(id)));
  //   }, [router.isReady]);
  // const id = project_id;
  // console.log(id);

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
      const project_id = router.query.project_id;
      setFoundProject(
        sampleData.find((data) => data.id === parseInt(project_id))
      );
    }
  }, [router.isReady]);

  const [showInput, setShowInput] = useState(false);
  const [showConvL, setShowConvL] = useState(false);
  const [showConvL2D, setShowConvL2D] = useState(false);
  const [showConvLT2D, setShowConvLT2D] = useState(false);
  const [showActL, setShowActL] = useState(false);
  const [showPadL, setShowPadL] = useState(false);
  const [showPoolMax, setShowPoolMax] = useState(false);
  const [showPoolAvT2D, setShowPoolAvT2D] = useState(false);

  //Input Layer
  const [imageSize, setImageSize] = useState(null);
  const [examples, setExamples] = useState(
    (foundProject && foundProject.image.examples) || ""
  );

  //Convolution Layer -> Convolution 2D
  const [inChannel2D, setInChannel2D] = useState(
    (foundProject?.convoLayers && foundProject.convoLayers.convo2D.inChannel) ||
      ""
  );
  const [outChannel2D, setOutChannel2D] = useState(
    (foundProject && foundProject.convoLayers.convo2D.outChannel) || ""
  );
  const [kernelSize2D, setKernelSize2D] = useState(
    (foundProject && foundProject.convoLayers.convo2D.kernelSize) || ""
  );
  const [stride2D, setStride2D] = useState(
    (foundProject && foundProject.convoLayers.convo2D.stride) || ""
  );
  const [padding2D, setPadding2D] = useState(
    (foundProject && foundProject.convoLayers.convo2D.padding) || ""
  );

  //Convolution Layer -> Convolution T2D
  const [inChannelT2D, setInChannelT2D] = useState(
    (foundProject && foundProject.convoLayers.convoT2D.inChannel) || ""
  );
  const [outChannelT2D, setOutChannelT2D] = useState(
    (foundProject && foundProject.convoLayers.convoT2D.outChannel) || ""
  );
  const [kernelSizeT2D, setKernelSizeT2D] = useState(
    (foundProject && foundProject.convoLayers.convo2D.kernelSize) || ""
  );
  const [strideT2D, setStrideT2D] = useState(
    (foundProject && foundProject.convoLayers.convoT2D.stride) || ""
  );
  const [paddingT2D, setPaddingT2D] = useState(
    (foundProject && foundProject.convoLayers.convoT2D.padding) || ""
  );

  //Activation Layer
  const [reLU, setReLU] = useState(
    (foundProject && foundProject.activationLayer.reLU) || ""
  );
  const [leakyReLU, setLeakyReLU] = useState(
    (foundProject && foundProject.activationLayer.leakyReLU) || ""
  );
  const [signoid, setSignoid] = useState(
    (foundProject && foundProject.activationLayer.signoid) || ""
  );
  const [sofmax, setSofmax] = useState(
    (foundProject && foundProject.activationLayer.sofmax) || ""
  );
  const [tanH, setTanH] = useState(
    (foundProject && foundProject.activationLayer.tanH) || ""
  );

  //Pooling Layer -> MaxPool 2D
  const [kernelSizeM2D, setKernelSizeM2D] = useState(
    (foundProject && foundProject.poolingLayer.maxPool.kernelSize) || ""
  );
  const [strideM2D, setStrideM2D] = useState(
    (foundProject && foundProject.poolingLayer.maxPool.stride) || ""
  );
  const [paddingM2D, setPaddingM2D] = useState(
    (foundProject && foundProject.poolingLayer.maxPool.padding) || ""
  );

  //Pooling Layer -> Average 2D
  const [kernelSizeA2D, setKernelSizeA2D] = useState(
    (foundProject && foundProject.poolingLayer.averagePool.kernelSize) || ""
  );
  const [strideA2D, setStrideA2D] = useState(
    (foundProject && foundProject.poolingLayer.averagePool.stride) || ""
  );
  const [paddingA2D, setPaddingA2D] = useState(
    (foundProject && foundProject.poolingLayer.averagePool.padding) || ""
  );

  if (!imageSize) {
    if (foundProject) {
      setImageSize(foundProject.image.imageSize);
      setExamples(foundProject.image.examples);
      setInChannel2D(foundProject.convoLayers.convo2D.inChannel);
      setInChannelT2D(foundProject.convoLayers.convoT2D.inChannel);
      setOutChannel2D(foundProject.convoLayers.convo2D.outChannel);
      setOutChannelT2D(foundProject.convoLayers.convoT2D.outChannel);
      setKernelSize2D(foundProject.convoLayers.convo2D.kernelSize);
      setStride2D(foundProject.convoLayers.convo2D.stride);
      setPadding2D(foundProject.convoLayers.convo2D.padding);
      setKernelSizeT2D(foundProject.convoLayers.convoT2D.kernelSize);
      setStrideT2D(foundProject.convoLayers.convoT2D.stride);
      setPaddingT2D(foundProject.convoLayers.convoT2D.padding);
      setReLU(foundProject.activationLayer.reLU);
      setLeakyReLU(foundProject.activationLayer.leakyReLU);
      setSignoid(foundProject.activationLayer.signoid);
      setTanH(foundProject.activationLayer.tanH);
      setSofmax(foundProject.activationLayer.sofmax);
      setKernelSizeA2D(foundProject.poolingLayer.averagePool.kernelSize);
      setStrideA2D(foundProject.poolingLayer.averagePool.stride);
      setPaddingA2D(foundProject.poolingLayer.averagePool.padding);
      setKernelSizeM2D(foundProject.poolingLayer.maxPool.kernelSize);
      setStrideM2D(foundProject.poolingLayer.maxPool.stride);
      setPaddingM2D(foundProject.poolingLayer.maxPool.padding);
    }
  }

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
        <h1 className={styles.title}>Project Name</h1>
        <div className={`${styles.grid} + mb-9`}>
          <div className={styles.card}>
            <h2 onClick={() => setShowInput(!showInput)}>
              Input Layer <span className={"text-sm"}>&#9698;</span>
            </h2>
            {showInput && (
              <div>
                <div>
                  <label
                    htmlFor="image-size"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Image Size
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    id="image-size"
                    className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
                    value={imageSize}
                    onChange={(evt) => {
                      setImageSize(evt.target.value);
                      foundProject.image.imageSize = parseInt(evt.target.value);
                    }}
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
                    value={examples}
                    id="examples"
                    min={"0"}
                    className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3"
                    onChange={(evt) => {
                      setExamples(evt.target.value);
                      foundProject.image.examples = parseInt(evt.target.value);
                    }}
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
                          htmlFor="input-channel"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          In Channel
                        </label>
                        <input
                          type="number"
                          id="input-channel"
                          min={"0"}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                          value={inChannel2D}
                          onChange={(e) => {
                            setInChannel2D(e.target.value);
                            foundProject.convoLayers.convo2D.inChannel =
                              parseInt(e.target.value);
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
                          min={"0"}
                          type="number"
                          id="output-channel"
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                          value={outChannel2D}
                          onChange={(e) => {
                            setOutChannel2D(e.target.value);
                            foundProject.convoLayers.convo2D.outChannel =
                              parseInt(e.target.value);
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={kernelSize2D}
                          onChange={(e) => {
                            setKernelSize2D(e.target.value);
                            foundProject.convoLayers.convo2D.kernelSize =
                              parseInt(e.target.value);
                          }}
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={stride2D}
                          onChange={(e) => {
                            setStride2D(e.target.value);
                            foundProject.convoLayers.convo2D.stride = parseInt(
                              e.target.value
                            );
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
                          id="small-input"
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                          value={padding2D}
                          onChange={(e) => {
                            setPadding2D(e.target.value);
                            foundProject.convoLayers.convo2D.padding = parseInt(
                              e.target.value
                            );
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={inChannelT2D}
                          onChange={(e) => {
                            setInChannelT2D(e.target.value);
                            foundProject.convoLayers.convoT2D.inChannel =
                              parseInt(e.target.value);
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                          value={outChannelT2D}
                          onChange={(e) => {
                            setOutChannelT2D(e.target.value);
                            foundProject.convoLayers.convoT2D.outChannel =
                              parseInt(e.target.value);
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={kernelSizeT2D}
                          onChange={(e) => {
                            setKernelSizeT2D(e.target.value);
                            foundProject.convoLayers.convoT2D.kernelSize =
                              parseInt(e.target.value);
                          }}
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={strideT2D}
                          onChange={(e) => {
                            setStrideT2D(e.target.value);
                            foundProject.convoLayers.convoT2D.stride = parseInt(
                              e.target.value
                            );
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
                          id="small-input"
                          min={"0"}
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                          value={paddingT2D}
                          onChange={(e) => {
                            setPaddingT2D(e.target.value);
                            foundProject.convoLayers.convoT2D.padding =
                              parseInt(e.target.value);
                          }}
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
                    htmlFor="input-channel"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ReLU
                  </label>
                  <input
                    type="number"
                    min={"0"}
                    id="input-channel"
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                    value={reLU}
                    onChange={(e) => {
                      setReLU(e.target.value);
                      foundProject.activationLayers.reLU = e.target.value;
                    }}
                  />
                </div>
                <div className="my-3">
                  <label
                    htmlFor="output-channel"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Leaky ReLU
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    id="output-channel"
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1 "
                    value={leakyReLU}
                    onChange={(e) => {
                      setLeakyReLU(e.target.value);
                      foundProject.activationLayers.leakyReLU = e.target.value;
                    }}
                  />
                </div>
                <div className="my-0">
                  <label
                    htmlFor="kernel"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Signoid
                  </label>
                  <input
                    min={"0"}
                    type="number"
                    id="kernel"
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                    value={signoid}
                    onChange={(e) => {
                      setSignoid(e.target.value);
                      foundProject.activationLayers.kernelSize = e.target.value;
                    }}
                  />
                </div>
                <div className="my-0">
                  <label
                    htmlFor="stride"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    TanH
                  </label>
                  <input
                    type="number"
                    min={"0"}
                    id="stride"
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                    value={tanH}
                    onChange={(e) => {
                      setTanH(e.target.value);
                      foundProject.activationLayers.tanH = e.target.value;
                    }}
                  />
                </div>
                <div className="my-0">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Sofmax
                  </label>
                  <input
                    type="number"
                    min={"0"}
                    id="small-input"
                    className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                    value={sofmax}
                    onChange={(e) => {
                      setSofmax(e.target.value);
                      foundProject.activationLayers.sofmax = e.target.value;
                    }}
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={kernelSizeM2D}
                          onChange={(e) => {
                            setKernelSizeM2D(e.target.value);
                            foundProject.poolingLayer.maxPool.kernelSize =
                              parseInt(e.target.value);
                          }}
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={strideM2D}
                          onChange={(e) => {
                            setStrideM2D(e.target.value);
                            foundProject.poolingLayer.maxPool.stride = parseInt(
                              e.target.value
                            );
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
                          id="small-input"
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                          value={paddingM2D}
                          onChange={(e) => {
                            setPaddingM2D(e.target.value);
                            foundProject.poolingLayer.maxPool.padding =
                              parseInt(e.target.value);
                          }}
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
                          type="number"
                          min={"0"}
                          id="kernel"
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={kernelSizeA2D}
                          onChange={(e) => {
                            setKernelSizeA2D(e.target.value);
                            foundProject.poolingLayer.averagePool.kernelSize =
                              parseInt(e.target.value);
                          }}
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
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
                          value={strideA2D}
                          onChange={(e) => {
                            setStrideA2D(e.target.value);
                            foundProject.poolingLayer.averagePool.stride =
                              parseInt(e.target.value);
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
                          min={"0"}
                          type="number"
                          id="small-input"
                          className="inline p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-0"
                          value={paddingM2D}
                          onChange={(e) => {
                            setPaddingA2D(e.target.value);
                            foundProject.poolingLayer.averagePool.padding =
                              parseInt(e.target.value);
                          }}
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
        <div className="my-4  p-28"></div>

        <div className="absolute bottom-10">
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
        </div>
      </main>
    </div>
  );

  // //Input Layer
  // const [imageSize, setImageSize] = useState('');
  // const [examples, setExamples] = useState('');

  // //Convolution Layer -> Convolution 2D
  // const [inChannel2D, setInChannel2D] = useState('');
  // const [outChannel2D, setOutChannel2D] = useState('');
  // const [kernelSize2D, setKernelSize2D] = useState('')
  // const [stride2D, setStride2D] = useState('')
  // const [padding2D, setPadding2D] = useState('')

  // //Convolution Layer -> Convolution T2D
  // const [inChannelT2D, setInChannelT2D] = useState('');
  // const [outChannelT2D, setOutChannelT2D] = useState('')
  // const [kernelSizeT2D, setKernelSizeT2D] = useState('')
  // const [strideT2D, setStrideT2D] = useState('')
  // const [paddingT2D, setPaddingT2D] = useState('')

  // //Activation Layer
  // const [reLU, setReLU] = useState('');
  // const [leakyReLU, setLeakyReLU] = useState('');
  // const [signoid, setSignoid] = useState('');
  // const [sofmax, setSofmax] = useState('');
  // const [tanH, setTanH] = useState('');

  // //Pooling Layer -> MaxPool 2D
  // const [kernelSizeM2D, setKernelSizeM2D] = useState('')
  // const [strideM2D, setStrideM2D] = useState('')
  // const [paddingM2D, setPaddingM2D] = useState('')

  // //Pooling Layer -> Average 2D
  // const [kernelSizeA2D, setKernelSizeA2D] = useState('')
  // const [strideA2D, setStrideA2D] = useState('')
  // const [paddingA2D, setPaddingA2D] = useState('')
}
